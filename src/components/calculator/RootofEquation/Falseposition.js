import { React, useState } from "react";
import GraphDesmos from "../Calmath/GraphDesmos";
import { Input, Table, Button } from "antd";
import { calfx, Error } from "../ConvertFx/Mathcal";
import { addStyles, EditableMathField } from "react-mathquill";
import { Card, Col, Row } from "antd";
const axios = require("axios");
addStyles();
let data = [];
let api
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
  function falseposition(xl, xr) {
    let n = 0;
    let xi = 0;
    let errornow = Infinity;
    let epslion = 0.0000001;
    let increase = false;

    if (calfx(latex, xl) < calfx(latex, xr)) {
      increase = true;
    }
    while (errornow > epslion) {
      xi = (xl * calfx(latex, xr) - xr * calfx(latex, xl)) /(calfx(latex, xr) - calfx(latex, xl));
      if (calfx(latex, xi) * calfx(latex, xr) < 0) {
        errornow = Error(xi, xr);
        if (increase) {
          xl = xi;
        } else {
          xr = xi;
        }
      } else {
        errornow = Error(xi, xl);
        if (increase) {
          xr = xi;
        } else {
          xl = xi;
        }
      }
      data[n] = {
        key: n,
        iteration: n + 1,
        xl: xl,
        xr: xr,
        x: xi.toFixed(6),
        error: Math.abs(errornow).toFixed(6),
      };
      n++;
    }
    setshowtable(true);
  }
  async function example() {
    await axios({
      method: "get",
      url: "http://localhost:5000/database/falseposition",
    }).then((response) => {
      console.log("response: ", response.data);
      api = response.data;
    });
    await setLatex(api.latex)
    await setVariable({
      xl:api.xl,
      xr:api.xr
    })
  }
  return (
    <div>
      <p>Falseposition</p>
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
              <p style={{ marginTop: "10px" }}></p>
              <Button
                type="primary"
                onClick={() =>
                  falseposition(
                    parseFloat(variable.xl),
                    parseFloat(variable.xr)
                  )
                }
              >
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
