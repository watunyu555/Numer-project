import { React, useState } from "react";
import { Input, Table, Button } from "antd";
import { Card, Col, Row } from "antd";
const axios = require("axios");
const math = require("mathjs");
let data = [];
let api;
const initialState = {
  row: 0,
  column: 0,
};
const columns = [
  {
    title: "Xauthor",
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
  matrixA = [],
  matrixB = [];
export default function CramerRule() {
  const [showMatrix, setshowMatrix] = useState(false);
  const [variable, setVariable] = useState(initialState);
  const [showtable, setshowtable] = useState(false);
  const [showsubmit, setshowsubmit] = useState(true);
  const [shownot, setshownot] = useState(false);
  const handlechange = (e) => {
    setVariable({ ...variable, [e.target.name]: e.target.value });
  };
  const clearState = () => {
    setshowsubmit(true)
    setshownot(false)
    setshowMatrix(false);
    setshowtable(false);
    setVariable({ ...initialState });
    data = [];
    matrixA = [];
    matrixB = [];
    A = [];
    B = [];
  };
  const haddlechange = (event) => {
    let a = parseInt(event.target.value);
    if (isNaN(a)) {
      setshownot(true);
      setshowsubmit(false);
    } else {
      setshownot(false);
      setshowsubmit(true);
    }
  };
  function createMatrix(row, column) {
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= column; j++) {
        matrixA.push(
          <Input
            onChange={haddlechange}
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
          onChange={haddlechange}
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
    }
  }

  function Cramer() {
    getMatrix();
    let DetA = math.det(A);
    for (let i = 0; i < variable.row; i++) {
      let MA = math.clone(A);
      MA = math.matrix(MA);
      MA.subset(math.index(math.range(0, B.length), i), B);
      let ans = (math.det(MA) / DetA).toFixed(6);
      data[i] = {
        key: i,
        x: "x" + i,
        value: ans,
      };
    }
    setshowtable(true);
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/cramer",
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
    await createMatrix(api.row, api.column);
    for (let i = 1; i <= api.row; i++) {
      for (let j = 1; j <= api.column; j++) {
        document.getElementById("a" + i + "" + j).value =
          api.arrayA[i - 1][j - 1];
      }
      document.getElementById("b" + i).value = api.arrayB[i - 1];
    }
  }
  return (
    <div>
      <p>Cramer's Rule</p>
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
              {shownot && (
                <span style={{ color: "red", fontSize: "20px" }}>
                  Matrix input not a number !!!
                </span>
              )}
              {showMatrix && (
                <Card>
                  <p style={{ fontSize: "20px" }}>Matrix A</p>
                  <h1>{matrixA}</h1>
                  <p style={{ fontSize: "20px" }}>Matrix B</p>
                  <h1>{matrixB}</h1>
                  {showsubmit && (
                    <Button
                      onClick={() => {
                        Cramer();
                      }}
                    >
                      Submit
                    </Button>
                  )}
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
