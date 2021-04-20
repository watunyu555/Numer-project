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
import { Button } from 'antd';
const { Header, Content } = Layout;
export default function home() {
  return (
    <Layout>
      <Header style={{ backgroundColor: "#e6f7ff" }}>
        <Row style={{ textAlign: "center" }}>
          <Col span={6}>
            <Dropdown overlay={Rootequation}>
              <Button type="dashed"
                onClick={(e) => e.preventDefault()}
              >
                <AreaChartOutlined />
                <span> Root of Equation </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Linearalgebra}>
              <Button type="dashed"
                onClick={(e) => e.preventDefault()}
              >
                <LineChartOutlined />
                <span> Linear Algebra </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={Interpolation}>
              <Button type="dashed"
                onClick={(e) => e.preventDefault()}
              >
                <BarChartOutlined />
                <span> Interpolation </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={6}>
            <Dropdown overlay={LeastSquaresRegression}>
              <Button type="dashed"
                onClick={(e) => e.preventDefault()}
              >
                <DotChartOutlined />
                <span> Least Squares Regression </span>
                <DownOutlined />
              </Button>
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
