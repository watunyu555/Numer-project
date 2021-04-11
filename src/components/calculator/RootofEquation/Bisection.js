import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";

addStyles();
let data = [];
const initialState = {
  xl: 0,
  xr: 0,
};

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "XL",
    dataIndex: "xl",
    key: "xl",
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "xr",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Error",
    key: "error",
    dataIndex: "error",
  },
];
export default function Bisection() {
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
  function bisec(xl, xr) {
    let xm = 0;
    let n = 0;
    let errornow = Infinity;
    let epslion = 0.0000001;
    let increase = false;

    if (calfx(latex, xl) < calfx(latex, xr)) {
      increase = true;
    }
    while (errornow > epslion) {
      xm = (xl + xr) / 2;
      // console.log("xl :" + xl + "xr :" + xr + "xm :" + xm);
      if (calfx(latex, xm) * calfx(latex, xr) < 0) {
        errornow = Error(xm, xr);
        if (increase) {
          xl = xm;
        } else {
          xr = xm;
        }
      } else {
        errornow = Error(xm, xl);
        if (increase) {
          xr = xm;
        } else {
          xl = xm;
        }
      }
      data[n] = {
        key: n,
        iteration: n + 1,
        xl: xl,
        xr: xr,
        x: xm.toFixed(6),
        error: Math.abs(errornow).toFixed(6),
      };
      n++;
    }
    // console.log(data);
    setshowtable(true);
  }
  return (
    <div>
      <p>Bisection</p>
      <Card style={{justifyContent:"right"}}>
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
                <p style={{ fontSize: "20px" }}>XL</p>
                <Input
                  placeholder="Basic usage"
                  name="xl"
                  value={variable.xl}
                  style={{ width: "50vh" }}
                  onChange={handlechange}
                />
              </div>
              <div>
                <p style={{ fontSize: "20px" }}>XR</p>
                <Input
                  placeholder="Basic usage"
                  name="xr"
                  value={variable.xr}
                  style={{ width: "50vh" }}
                  onChange={handlechange}
                />
              </div>
              <p style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  onClick={() =>
                    bisec(parseFloat(variable.xl), parseFloat(variable.xr))
                  }
                >
                  Submit button
                </Button>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      {showtable && <Table columns={columns} dataSource={data} />}
    </div>
  );
}
