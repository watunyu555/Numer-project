import { React, useState } from "react";
import { Input, Table, Button } from "antd";
import { Card, Col, Row } from "antd";
import { add, subtract, multiply, transpose } from "mathjs";
const axios = require("axios");
let data = [];
let api;
const initialState = {
  row: 0,
  column: 0,
};
var columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "Lambda",
    dataIndex: "lambda",
    key: "lambda",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];

let A = [],
  B = [],
  X = [],
  matrixA = [],
  matrixB = [],
  matrixX = [];
export default function Gradient() {
  const [showMatrix, setshowMatrix] = useState(false);
  const [variable, setVariable] = useState(initialState);
  const [showtable, setshowtable] = useState(false);
  const handlechange = (e) => {
    setVariable({ ...variable, [e.target.name]: e.target.value });
  };
  const clearState = () => {
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

  function Gradientsolve() {
    getMatrix();
    let count = 0;
    let errornow = Infinity;
    let epsilon = 0.000001;
    let R = subtract(multiply(A, X), B);
    let D = multiply(R, -1);
    let Lambda, Alpha;
    while (errornow > epsilon) {
      Lambda =
        multiply(multiply(transpose(D), R), -1) /
        multiply(multiply(transpose(D), A), D);
      X = add(X, multiply(Lambda, D));
      R = subtract(multiply(A, X), B);
      errornow = Math.sqrt(multiply(transpose(R), R));
      Alpha =
        multiply(multiply(transpose(R), A), D) /
        multiply(transpose(D), multiply(A, D));
      D = add(multiply(R, -1), multiply(Alpha, D));
      data[count] = {
        key: count,
        iteration: count + 1,
        lambda: Lambda,
        x: X.join(",\n"),
        error: errornow,
      };
      count++;
    }
    setshowtable(true);
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/conjugate",
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
  return (
    <div>
      <p>Conjigate Gradient Method</p>
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
                      Gradientsolve();
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
