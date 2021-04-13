import { React, useState } from "react";
import { Input, Table, Button } from "antd";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
import regression from "regression";
const Spline = require("cubic-spline");
addStyles();
const math = require("mathjs");
const initialState = {
  Numberofpoint: 0,
  order: 0,
  xfind: 0,
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
  tempTag = [],
  valueX = [],
  valueY = [],
  valueans = [],
  ans = 0;
export default function Regression() {
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
    data = [];
    valueans = [];
    ans = 0;
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
  function inputvalue() {
    for (let i = 1; i <= variable.Numberofpoint; i++) {
      valueX[i - 1] = parseFloat(document.getElementById("x" + i).value);
      valueY[i - 1] = parseFloat(document.getElementById("y" + i).value);
      valueans.push([valueX[i - 1], valueY[i - 1]]);
    }
  }

  function Repolynomial(ordernumber) {
    inputvalue();
    const result = regression.polynomial(valueans, {
      order: parseFloat(ordernumber),
    });
    for (let i = 0; i < result.equation.length; i++) {
      data[i] = {
        a: "a" + i,
        value: result.equation[i],
      };
    }
    for (let i = 0; i < result.equation.length; i++) {
      if (i == 0) {
        ans += result.equation[i];
      } else {
        ans += result.equation[i] * Math.pow(variable.xfind, i);
      }
    }
    setshowans(true);
  }
  return (
    <div>
      <p>Polynomial Regression</p>
      <Card style={{ justifyContent: "right" }}>
        <Button type="primary" onClick={() => clearState()}>
          Clear
        </Button>
      </Card>
      <div>
        <Row gutter={10}>
          <Col span={6}>
            <Card>
              <p style={{ fontSize: "20px" }}>Number of points</p>
              <Input
                placeholder="Numberofpoint"
                name="Numberofpoint"
                value={variable.Numberofpoint}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>Order</p>
              <Input
                placeholder="number order"
                name="order"
                value={variable.order}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <div style={{ marginTop: "1vh" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    createTable(parseFloat(variable.Numberofpoint));
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
                  <p style={{ fontSize: "18px" }}>Answer : {ans}</p>
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
                  <p style={{ fontSize: "20px" }}>input f(x) to find</p>
                  <Input
                    placeholder="x to find"
                    name="xfind"
                    value={variable.xfind}
                    style={{ width: "15%" }}
                    onChange={handlechange}
                  />
                  <p></p>
                  <Button
                    onClick={() => {
                      Repolynomial(variable.order);
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
