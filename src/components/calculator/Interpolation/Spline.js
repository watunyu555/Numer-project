import { React, useState } from "react";
import { Input, Table, Button } from "antd";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const Spline = require("cubic-spline");
addStyles();
const math = require("mathjs");
const initialState = {
  Numberofpoint: 0,
  xtrue: 0,
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
  fx;
export default function SplineMethod() {
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
  function inputvalue() {
    for (let i = 1; i <= variable.Numberofpoint; i++) {
      valueX[i-1] = parseFloat(document.getElementById("x" + i).value);
      valueY[i-1] = parseFloat(document.getElementById("y" + i).value);
    }
  }

  function Splinesolve(xtrue) {
    inputvalue();
    console.log(valueX);
    console.log(valueY);
    const spline = new Spline(valueX, valueY);
    fx = spline.at(xtrue);
    setshowans(true);
  }

  return (
    <div>
      <p>Lagrange</p>
      <Card style={{ justifyContent: "right" }}>
        <Button type="primary" onClick={() => clearState()}>
          Clear
        </Button>
      </Card>
      <div>
        <Row gutter={10}>
          <Col span={4}>
            <Card>
              <p style={{ fontSize: "20px" }}>Number of points</p>
              <Input
                placeholder="Numberofpoint"
                name="Numberofpoint"
                value={variable.Numberofpoint}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>X to find</p>
              <Input
                placeholder="X to find"
                name="xtrue"
                value={variable.xtrue}
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
                  <h2>{tempTag}</h2>
                  <Button
                    onClick={() => {
                      Splinesolve(parseFloat(variable.xtrue));
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
