import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error, calDiff } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const axios = require("axios");
addStyles();
let data = [];
let api
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];

export default function Newton() {
  const [latex, setLatex] = useState("");
  const [showtable, setshowtable] = useState(false);
  const [xzero, setXzero] = useState(0);
  const [xone, setXone] = useState(0)
  const [maxiteration, setmaxiteration] = useState(0);
  const clearState = () => {
    setLatex("");
    setshowtable(false);
    setXzero(0);
    setmaxiteration(0);
    data = [];
  };
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/secant",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await setLatex(api.latex)
    await setXzero(api.x0)
    await setXone(api.x1)
    await setmaxiteration(api.iteration)
  }

  function Secant(x0,x1) {
    let x = []
    let epsilon = 0.000001
    x.push(x0)
    x.push(x1)
    let y = 0
    let errornow = Infinity
    let n = 1 , i = 1 
    data[0] = {
      key:n-1,
      iteration:n,
      y:x0,
      error:"---"
    }
    while(errornow > epsilon){
      y = x[i] - (calfx(latex,x[i]) * ((x[i] - x[i-1]))) / (calfx(latex,x[i]) - calfx(latex,x[i-1]))
      x.push(y)
      errornow = Error(y,x[i])
      data[n]={
        key:n-1,
        iteration:n+1,
        y: y.toFixed(6),
        error: Math.abs(errornow).toFixed(6)
      }
      n++
      i++
      if (n >= maxiteration) {
        break;
      }
    }
    setshowtable(true);
  }
  return (
    <div>
      <p>Secant raphon</p>
      <Card style={{ justifyContent: "right" }}>
        <Button type="primary" onClick={() => clearState()}>
          Clear
        </Button>
        <Button type="primary" style={{marginLeft:"5px"}} onClick={() => example()}>
          Example
        </Button>
      </Card>
      <div>
        <Row gutter={10}>
          <Col span={12}>
            <Card>
              <GraphDesmos latex={latex} />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ justifyContent: "left" }}>
            <p style={{ fontSize: "20px" }}>Equation</p>
              <EditableMathField
                style={{ width: 200 }}
                latex={latex}
                onChange={(mathField) => {
                  setLatex(mathField.latex());
                }}
              />
              <div>
              <p style={{ fontSize: "20px" }}>X0</p>
                <Input
                  placeholder="Basic usage"
                  value={xzero}
                  style={{ width: "50vh" }}
                  onChange={(e) => {
                    setXzero(e.target.value);
                  }}
                />
              </div>
              <div>
              <p style={{ fontSize: "20px" }}>X1</p>
                <Input
                  placeholder="Basic usage"
                  value={xone}
                  style={{ width: "50vh" }}
                  onChange={(e) => {
                    setXone(e.target.value);
                  }}
                />
              </div>
              <p style={{ fontSize: "20px" }}>Iteration</p>
              <div>
                <Input
                  placeholder="Basic usage"
                  value={maxiteration}
                  style={{ width: "50vh" }}
                  onChange={(e) => {
                    setmaxiteration(e.target.value);
                  }}
                />
              </div>
              <p style={{ marginTop: "10px" }}></p>
              <Button type="primary" onClick={() => Secant(xzero,xone)}>
                Submit button
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      {showtable && <Table columns={columns} dataSource={data} />}
    </div>
  );
}
