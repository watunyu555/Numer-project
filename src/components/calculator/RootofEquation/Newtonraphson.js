import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error, calDiff } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
addStyles();
let data = [];
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
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

export default function Newton() {
  const [latex, setLatex] = useState("");
  const [showtable, setshowtable] = useState(false);
  const [xzero, setXzero] = useState(0);
  const [maxiteration, setmaxiteration] = useState(0);
  const clearState = () => {
    setLatex("");
    setshowtable(false);
    setXzero(0);
    setmaxiteration(0);
    data = [];
  };
  function Newtonraphon(xold) {
    let n = 0;
    let xnew = 0;
    let errornow = Infinity;
    let epsilon = 0.000001;
    calDiff(latex, parseFloat(xold));
    while (errornow > epsilon) {
      xnew = xold - calfx(latex, xold) / calDiff(latex, xold);
      errornow = Error(xnew, xold);
      data[n] = {
        key: n,
        iteration: n + 1,
        x: xnew.toFixed(6),
        error: Math.abs(errornow).toFixed(6),
      };
      n++;
      xold = xnew;
      if (n >= maxiteration) {
        break;
      }
    }
    setshowtable(true);
  }
  return (
    <div>
      <p>Newton raphon</p>
      <Card style={{ justifyContent: "right" }}>
        <Button type="primary" onClick={() => clearState()}>
          Clear
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
              <p style={{ fontSize: "20px" }}>Guess</p>
                <Input
                  placeholder="Basic usage"
                  value={xzero}
                  style={{ width: "50vh" }}
                  onChange={(e) => {
                    setXzero(e.target.value);
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
              <Button type="primary" onClick={() => Newtonraphon(xzero)}>
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
