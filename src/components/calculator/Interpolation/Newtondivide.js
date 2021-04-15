import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const axios = require("axios");
addStyles();
const math = require("mathjs");
let data = [];
let api
const initialState = {
  Numberofpoint: 0,
  xtrue: 0,
  interpolatepoint: 0,
};
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
  tempTag = [],
  valueX = [],
  valueY = [],
  interpolate = [],
  fx;
export default function Newtondivide() {
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
    x = [];
    y = [];
    tableTag = [];
    tempTag = [];
    valueX = [];
    valueY = [];
    interpolate = [];
    fx = undefined;
  };

  function createTable(n) {
    for (var i = 1; i <= n; i++) {
      x.push(
        <Input
          style={{
            width: "50%",
            height: "20%",
            marginInlineEnd: "1%",
            marginBlockEnd: "1%",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      y.push(
        <Input
          style={{
            width: "50%",
            height: "20%",
            marginInlineEnd: "1%",
            marginBlockEnd: "1%",
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
        x: x[i - 1],
        y: y[i - 1],
      });
    }
    setshowtable(true);
  }
  function createInterpolatePointInput(n) {
    for (var i = 1; i <= n; i++) {
      tempTag.push(
        <Input
          style={{
            width: "8%",
            height: "20%",
            marginInlineEnd: "1%",
            marginBlockEnd: "1%",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          id={"p" + i}
          key={"p" + i}
          placeholder={"p" + i}
        />
      );
    }
  }
  function inputvalue() {
    for (let i = 1; i <= variable.Numberofpoint; i++) {
      valueX[i] = parseFloat(document.getElementById("x" + i).value);
      valueY[i] = parseFloat(document.getElementById("y" + i).value);
    }
    for (let i = 1; i <= variable.interpolatepoint; i++) {
      interpolate[i] = parseInt(document.getElementById("p" + i).value);
    }
  }
  function C(n) {
    if (n == 1) {
      return 0;
    } else {
      return (
        (valueY[interpolate[n]] - valueY[interpolate[n - 1]]) / (valueX[interpolate[n]] - valueX[interpolate[n - 1]]) - C(n - 1)
      );
    }
  }
  function findX(n, xtrue) {
    if (n < 1) {
      return 1;
    } else {
      return (xtrue - valueX[interpolate[n]]) * findX(n - 1, xtrue);
    }
  }
  function Newton(n, xtrue) {
    inputvalue();
    fx = valueY[1];
    if (n == 2) {
      fx += ((valueY[interpolate[2]] - valueY[interpolate[1]]) / (valueX[interpolate[2]] - valueX[interpolate[1]])) * (xtrue - valueX[interpolate[1]]);
    } else {
      for (var i = 2; i <= n; i++) {
        fx += (C(i) / (valueX[interpolate[i]] - valueX[interpolate[1]])) * findX(i - 1, xtrue);
      }
    }

    setshowans(true);
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/newtondivide",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    setVariable({
      Numberofpoint: api.numberpoint,
      xtrue: api.xfind,
      interpolatepoint: api.interpolateinput,
    });
    x = [];
    y = [];
    tableTag = [];
    tempTag = [];
    await createInterpolatePointInput(api.interpolateinput);
    await createTable(api.numberpoint);
    for (let i = 1; i <= api.numberpoint; i++) {
      document.getElementById("x" + i).value = api.arrayX[i - 1];
      document.getElementById("y" + i).value = api.arrayY[i - 1];
    }
    for (let i = 1; i <= api.interpolateinput; i++) {
      document.getElementById("p" + i).value = api.interpolatePoint[i - 1];
    }
  }

  return (
    <div>
      <p>Newton Divide Difference</p>
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
          <Col span={4}>
            <Card>
              <p style={{ fontSize: "20px" }}>Number of points</p>
              <Input
                placeholder="row matrix"
                name="Numberofpoint"
                value={variable.Numberofpoint}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>X to find</p>
              <Input
                placeholder="column matrix"
                name="xtrue"
                value={variable.xtrue}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>InterpolatePoint</p>
              <Input
                placeholder="column matrix"
                name="interpolatepoint"
                value={variable.interpolatepoint}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <div style={{ marginTop: "1vh" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    createTable(parseFloat(variable.Numberofpoint));
                    createInterpolatePointInput(variable.interpolatepoint);
                  }}
                >
                  Submit button
                </Button>
              </div>
              <br />
              {showans && (
                <Card>
                  <p style={{ fontSize: "20px" }}>Answer</p>
                  <p style={{ fontSize: "20px" }}>{fx}</p>
                </Card>
              )}
            </Card>
          </Col>
          <Col span={20}>
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
                  <p style={{ fontSize: "20px" }}>Point</p>
                  <h2>{tempTag}</h2>
                  <Button
                    onClick={() => {
                      Newton(
                        parseFloat(variable.interpolatepoint),
                        parseFloat(variable.xtrue)
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
