import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
addStyles();
let data = [];
const initialState = {
  xzero: 0,
};

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
export default function Falsepos() {
  const [latex, setLatex] = useState("");
  const [showtable, setshowtable] = useState(false);
  const [variable, setVariable] = useState(initialState);

  const handlechange = (e) => {
    setVariable({ ...variable, [e.target.name]: e.target.value });
  };

  const clearState = () => {
    setLatex("");
    setshowtable(false);
    setVariable({ ...initialState });
    data = [];
  };
  function onepoint(xold) {
    let xnew = 0;
    let errornow = Infinity;
    let epslion = 0.0000001;
    let n = 0;
    while (errornow > epslion) {
      xnew = calfx(latex, xold);
      errornow = Error(xnew, xold);
      data[n] = {
        key: n,
        iteration: n + 1,
        x: xnew.toFixed(7),
        error: Math.abs(errornow).toFixed(7),
      };
      n++;
      xold = xnew;
    }
    setshowtable(true);
  }
  return (
    <div>
      <p>One point </p>
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
                <p style={{ fontSize: "20px" }}>x0</p>
                <Input
                  placeholder="Basic usage"
                  name="xzero"
                  value={variable.xzero}
                  style={{ width: "50vh" }}
                  onChange={handlechange}
                />
              </div>
              <p style={{ marginTop: "10px" }}></p>
              <Button type="primary" onClick={() => onepoint(variable.xzero)}>
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
