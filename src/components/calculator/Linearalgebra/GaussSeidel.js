import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const axios = require("axios");
addStyles();
const math = require("mathjs");
let api;
let data = [];
const initialState = {
  row: 0,
  column: 0,
};
const columns = [
  {
    title: "Iteration",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

let A = [],
  B = [],
  X = [],
  matrixA = [],
  matrixB = [],
  matrixX = [];
export default function GuassSeidel() {
  const [latex, setLatex] = useState("");
  const [showMatrix, setshowMatrix] = useState(false);
  const [variable, setVariable] = useState(initialState);
  const [showtable, setshowtable] = useState(false);
  const handlechange = (e) => {
    setVariable({ ...variable, [e.target.name]: e.target.value });
  };
  const clearState = () => {
    setLatex("");
    setshowMatrix(false);
    setshowtable(false);
    setVariable({ ...initialState });
    data = [];
    matrixA = [];
    matrixB = [];
    matrixX = [];
    A = [];
    B = [];
    X = [];
  };
  function createMatrix(row, column) {
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= column; j++) {
        matrixA.push(
          <Input
            style={{
              width: "8%",
              height: "20%",
              marginInlineEnd: "1%",
              marginBlockEnd: "1%",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"A" + i + "" + j}
          />
        );
      }
      matrixA.push(<br />);
      matrixB.push(
        <Input
          style={{
            width: "8%",
            height: "20%",
            marginInlineEnd: "1%",
            marginBlockEnd: "1%",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      matrixX.push(
        <Input
          style={{
            width: "8%",
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
    }
    setshowMatrix(true);
  }

  function getMatrix() {
    for (var i = 0; i < variable.row; i++) {
      A[i] = [];
      for (var j = 0; j < variable.column; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
      X.push(parseFloat(document.getElementById("x" + (i + 1)).value));
    }
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/seidel",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await setVariable({
      row: api.row,
      column: api.column,
    });
    matrixA = [];
    matrixB = [];
    matrixX = [];
    await createMatrix(api.row, api.column);
    for (let i = 1; i <= api.row; i++) {
      for (let j = 1; j <= api.column; j++) {
        document.getElementById("a" + i + "" + j).value =
          api.arrayA[i - 1][j - 1];
      }
      document.getElementById("b" + i).value = api.arrayB[i - 1];
      document.getElementById("x" + i).value = api.arrayX[i - 1];
    }
  }
  function seidel(n) {
    getMatrix();
    A = math.matrix(A);
    let errornow = Infinity;
    let epsilon = 0.000001;
    let check = [false, false, false];
    let count = 0;
    while (true) {
      let x = 0;
      for (let i = 0; i < n; i++) {
        let Divide = A.subset(math.index(i, i));
        let res = math.multiply(A.subset(math.index(i, math.range(0, n))), X);
        res = math.squeeze(res);
        x = (B[i] - res + Divide * X[i]) / Divide;
        errornow = Math.abs((x - X[i]) / x);
        if (errornow <= epsilon) {
          check[i] = true;
        }
        X[i] = x;
      }
      data[count] = {
        key: count,
        x: count + 1,
        value: X.join(",\n"),
      };
      console.log(X);
      if (!check.every((value) => value == false)) {
        break;
      }
      if (count > 100) {
        break;
      }
      count++;
      console.log(count);
    }
    setshowtable(true);
  }

  return (
    <div>
      <p>Gauss Seidel Method</p>
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
              <p style={{ fontSize: "20px" }}>Rows</p>
              <Input
                placeholder="row matrix"
                name="row"
                value={variable.row}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <p style={{ fontSize: "20px" }}>Columns</p>
              <Input
                placeholder="column matrix"
                name="column"
                value={variable.column}
                style={{ width: "90%" }}
                onChange={handlechange}
              />
              <div style={{ marginTop: "1vh" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    createMatrix(variable.row, variable.column);
                  }}
                >
                  Submit button
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={20}>
            <Card style={{ justifyContent: "left" }}>
              <p style={{ fontSize: "20px" }}>Table</p>

              {showMatrix && (
                <Card>
                  <p style={{ fontSize: "20px" }}>Matrix A</p>
                  <h1>{matrixA}</h1>
                  <p style={{ fontSize: "20px" }}>Matrix B</p>
                  <h1>{matrixB}</h1>
                  <p style={{ fontSize: "20px" }}>Initial X</p>
                  <h1>{matrixX}</h1>
                  <Button
                    onClick={() => {
                      seidel(parseFloat(variable.row));
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
      {showtable && <Table columns={columns} dataSource={data} />}
    </div>
  );
}
