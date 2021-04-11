import React from "react";
import { Menu, Layout, Button } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import  Graphical  from "../calculator/RootofEquation/Graphical";
import  Bisection  from "../calculator/RootofEquation/Bisection";
import  Falseposition  from "../calculator/RootofEquation/Falseposition";
import  Newtonraphson  from "../calculator/RootofEquation/Newtonraphson";
import  Onepoint  from "../calculator/RootofEquation/Onepoint";
import  Secant  from "../calculator/RootofEquation/Secant";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
export default function Home() {
  return (
      <Layout>
         {/* Sidebar */}
        <Sider width={250}>
          <Menu
            mode="inline"
            style={{
              height: "100vh",
              borderRight: 0,
              overflowX: "hidden",
            }}
          >
            <SubMenu key="root_submenu" title={<span>Root of Equation</span>}>
              <Menu.Item key="menu_graphical">
                <Link to="/graphical">Graphical</Link>
              </Menu.Item>
              <Menu.Item key="menu_bisection">
                <Link to="/bisection">Bisection</Link>
              </Menu.Item>
              <Menu.Item key="menu_false">
                <Link to="/false-position">False Position</Link>
              </Menu.Item>
              <Menu.Item key="menu_onepoint">
                <Link to="/one-point">One-Point Iteration</Link>
              </Menu.Item>
              <Menu.Item key="menu_newton">
                <Link to="/newton-raphson">Newton-Raphson</Link>
              </Menu.Item>
              <Menu.Item key="menu_secant">
                <Link to="/secant">Secant Method</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="algebra_submenu" title={<span>Linear Algebra</span>}>
              <Menu.Item key="menu_cramer">
                <Link to="/cramer">Cramer's Rule</Link>
              </Menu.Item>
              <Menu.Item key="menu_gauss">
                <Link to="/gauss">Gauss's Elimination</Link>
              </Menu.Item>
              <Menu.Item key="menu_jordan">
                <Link to="/jordan">Gauss Jordan Method</Link>
              </Menu.Item>
              <Menu.Item key="menu_lu">
                <Link to="/lu">LU Decomposition</Link>
              </Menu.Item>
              <Menu.Item key="menu_cholesky">
                <Link to="/cholesky">Cholesky Decomposition</Link>
              </Menu.Item>
              <Menu.Item key="menu_jacobi">
                <Link to="/jacobi">Jacobi Iteration Method</Link>
              </Menu.Item>
              <Menu.Item key="menu_seidel">
                <Link to="/seidel">Gauss Seidel Iteration</Link>
              </Menu.Item>
              <Menu.Item key="menu_gradient">
                <Link to="/conjugate-gradient">Conjugate Gradient Method</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="interpolate_submenu"
              title={<span>Interpolation</span>}
            >
              <Menu.Item key="menu_divide">
                <Link to="/newton">Newton Divide Difference</Link>
              </Menu.Item>
              <Menu.Item key="menu_lagrange">
                <Link to="/lagrange">Lagrange</Link>
              </Menu.Item>
              <Menu.Item key="menu_spline">
                <Link to="/spline">Spline</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="regression_submenu"
              title={<span>Least Squares Regression</span>}
            >
              <Menu.Item key="menu_linear">
                <Link to="/linear">Linear Regression</Link>
              </Menu.Item>
              <Menu.Item key="menu_poly">
                <Link to="/polynomial">Polynomial Regression</Link>
              </Menu.Item>
              <Menu.Item key="menu_multiple">
                <Link to="/multiple-linear">Multiple Linear Regression</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "#1890ff" }}>
            <Link to="/home">
              <Button type="primary">Numer</Button>
            </Link>
          </Header>

          {/* Content */}

          <Content>
            <Route exact path="/graphical">
              <Graphical/>
            </Route>
            <Route exact path="/bisection">
              <Bisection/>
            </Route>
            <Route exact path="/false-position">
              <Falseposition/>
            </Route>
            <Route exact path="/one-point">
              <Onepoint/>
            </Route>
            <Route exact path="/newton-raphson">
              <Newtonraphson/>
            </Route>
            <Route exact path="/secant">
              <Secant/>
            </Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
  );
}
