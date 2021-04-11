import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
addStyles();
let data = [];
const initialState = {
  start: 0,
  finish: 0,
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
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
];
export default function Graphi() {
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
  function Graphical() {
    let count = 0;
    for (
      let i = parseFloat(variable.start);
      i <= parseFloat(variable.finish);
      i++
    ) {
      console.log(i);
      data[count] = {
        key: count,
        iteration: count + 1,
        x: i,
        y: calfx(latex, i),
      };
      count++;
    }
    console.log(data);
    setshowtable(true);
  }
  return (
    <div>
      <p>Graphical</p>
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
                <p style={{ fontSize: "20px" }}>Start</p>
                <Input
                  placeholder="Basic usage"
                  name="start"
                  value={variable.start}
                  style={{ width: 200 }}
                  onChange={handlechange}
                />
              </div>
              <div>
                <p style={{ fontSize: "20px" }}>Finish</p>
                <Input
                  placeholder="Basic usage"
                  name="finish"
                  value={variable.finish}
                  style={{ width: 200 }}
                  onChange={handlechange}
                />
              </div>
              <p style={{ marginTop: "10px" }}></p>
              <Button type="primary" onClick={() => Graphical()}>
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
