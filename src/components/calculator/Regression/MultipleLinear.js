import { React, useState } from "react";
import { Input, Table, Button } from "antd";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const { regression } = require("multiregress");
addStyles();
const axios = require("axios");
let api;
const initialState = {
  Numberofpoint: 0,
  numberx: 0,
};
let data = [];
var columns2 = [
  {
    title: "A author",
    dataIndex: "a",
    key: "a",
  },
  {
    title: "Value A",
    dataIndex: "value",
    key: "value",
  },
];
var columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
];
let x = [],
  y = [],
  tableTag = [],
  valueans = [];
export default function Multiple() {
  const [variable, setVariable] = useState(initialState);
  const [showtable, setshowtable] = useState(false);
  const [showans, setshowans] = useState(false);
  const handlechange = (e) => {
    setVariable({ ...variable, [e.target.name]: e.target.value });
  };
  const clearState = () => {
    setshowans(false);
    setshowtable(false);
    setVariable({ ...initialState });
    valueans = [];
    x = [];
    y = [];
    tableTag = [];
  };

  function createTable(n, X) {
    for (var i = 1; i <= n; i++) {
      x[i] = [];
      for (var j = 1; j <= X; j++) {
        x[i].push(
          <Input
            style={{
              width: "50%",
              height: "30%",
              marginInlineEnd: "2%",
              marginBlockEnd: "2%",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            id={"x" + i + "" + j}
            key={"x" + i + "" + j}
            placeholder={"x" + i + "" + j}
          />
        );
      }
      y.push(
        <Input
          style={{
            width: "50%",
            height: "30%",
            marginInlineEnd: "2%",
            marginBlockEnd: "2%",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          id={"y" + i}
          key={"y" + i}
          placeholder={"y" + i}
        />
      );
      tableTag.push({
        no: i,
        x: x[i],
        y: y[i - 1],
      });
    }
    setshowtable(true);
  }
  function inputvalue(n, X) {
    for (var i = 1; i <= n; i++) {
      valueans[i - 1] = [];
      for (var j = 1; j <= X; j++) {
        valueans[i - 1][j - 1] = parseInt(
          document.getElementById("x" + i + "" + j).value
        );
      }
      valueans[i - 1].push(parseFloat(document.getElementById("y" + i).value));
    }
  }

  function multiplelinear(n, X) {
    inputvalue(n, X);
    let answer = regression(valueans);
    console.log(valueans);
    console.log(answer);
    for (let i = 0; i <= variable.numberx; i++) {
      data[i] = {
        key: i,
        a: "a" + i,
        value: answer[i],
      };
      // console.log(answer[i]);
    }
    setshowans(true);
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/multiple",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await setVariable({
      Numberofpoint:api.numberpoint,
      numberx:api.numberx
    })
    await createTable(api.numberpoint,api.numberx)
    for (let i = 1; i <= api.numberpoint; i++) {
      for (let j = 1; j <= api.numberx; j++) {
        document.getElementById("x" + i + "" + j).value = api.arrayX[i-1][j-1]
      }
      document.getElementById("y" + i).value = api.arrayY[i-1]
    }
  }
  return (
    <div>
      <p>MultipleLinear</p>
      <Card style={{ justifyContent: "right" }}>
        <Button type="primary" onClick={() => clearState()}>
          Clear
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "5px" }}
          onClick={() => example()}
        >
          Example
        </Button>
      </Card>
      <div>
        <Row gutter={10}>
          <Col span={6}>
            <Card>
              <p style={{ fontSize: "20px" }}>Number of point</p>
              <Input
                placeholder="Numberofpoint"
                name="Numberofpoint"
                value={variable.Numberofpoint}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>Number of X</p>
              <Input
                placeholder="number of x"
                name="numberx"
                value={variable.numberx}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <div style={{ marginTop: "1vh" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    createTable(
                      parseFloat(variable.Numberofpoint),
                      parseFloat(variable.numberx)
                    );
                  }}
                >
                  Submit button
                </Button>
              </div>
              <br />
              {showans && (
                <Card>
                  <Table
                    columns={columns2}
                    dataSource={data}
                    pagination={false}
                  />
                </Card>
              )}
            </Card>
          </Col>
          <Col span={18}>
            <Card style={{ justifyContent: "left" }}>
              <p style={{ fontSize: "20px" }}>Table</p>

              {showtable && (
                <Card>
                  <Table
                    columns={columns}
                    dataSource={tableTag}
                    pagination={false}
                  />
                  <br />
                  <p></p>
                  <Button
                    onClick={() => {
                      multiplelinear(
                        parseFloat(variable.Numberofpoint),
                        parseFloat(variable.numberx)
                      );
                    }}
                  >
                    Submit
                  </Button>
                </Card>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
