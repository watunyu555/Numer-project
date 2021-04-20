import { Layout, Menu, Dropdown, Col, Row, Card } from "antd";
import React from "react";
import Routecontent from "./Routecontent";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { DownOutlined , AreaChartOutlined , BarChartOutlined , LineChartOutlined , DotChartOutlined} from "@ant-design/icons";
import {
  Rootequation,
  Linearalgebra,
  Interpolation,
  LeastSquaresRegression,
} from "./Menuheader";
const { Header, Content, Footer } = Layout;
export default function home() {
  return (
    <Layout>
      <Header style={{ backgroundColor: "#e6f7ff" }}>
        <Row style={{ textAlign: "center" }}>
          <Col span={6}>
            <Dropdown overlay={Rootequation}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <AreaChartOutlined />
                <span> Root of Equation </span>
                <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Linearalgebra}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <LineChartOutlined />
                <span> Linear Algebra </span>
                <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Interpolation}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <BarChartOutlined />
                <span> Interpolation </span>
                <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={LeastSquaresRegression}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <DotChartOutlined />
                <span> Least Squares Regression </span>
                <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content>
        <Card>
          <Routecontent />
        </Card>
      </Content>
    </Layout>
  );
}
