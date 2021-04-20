import { Layout, Dropdown, Col, Row, Card } from "antd";
import React from "react";
import Routecontent from "./Routecontent";
import { DownOutlined , AreaChartOutlined , BarChartOutlined , LineChartOutlined , DotChartOutlined} from "@ant-design/icons";
import {
  Rootequation,
  Linearalgebra,
  Interpolation,
  LeastSquaresRegression,
} from "./Menuheader";
const { Header, Content } = Layout;
export default function home() {
  return (
    <Layout>
      <Header style={{ backgroundColor: "#e6f7ff" }}>
        <Row style={{ textAlign: "center" }}>
          <Col span={6}>
            <Dropdown overlay={Rootequation}>
              <p
                onClick={(e) => e.preventDefault()}
              >
                <AreaChartOutlined />
                <span> Root of Equation </span>
                <DownOutlined />
              </p>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Linearalgebra}>
              <p 
                onClick={(e) => e.preventDefault()}
              >
                <LineChartOutlined />
                <span> Linear Algebra </span>
                <DownOutlined />
              </p>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Interpolation}>
              <p 
                onClick={(e) => e.preventDefault()}
              >
                <BarChartOutlined />
                <span> Interpolation </span>
                <DownOutlined />
              </p>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={LeastSquaresRegression}>
              <p
                onClick={(e) => e.preventDefault()}
              >
                <DotChartOutlined />
                <span> Least Squares Regression </span>
                <DownOutlined />
              </p>
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
