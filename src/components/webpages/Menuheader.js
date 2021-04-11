import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {  Menu } from "antd";
const Rootequation = (
  <Menu>
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
  </Menu>
);
const Linearalgebra = (
  <Menu>
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
  </Menu>
);
const Interpolation = (
  <Menu>
    <Menu.Item key="menu_divide">
      <Link to="/newton">Newton Divide Difference</Link>
    </Menu.Item>
    <Menu.Item key="menu_lagrange">
      <Link to="/lagrange">Lagrange</Link>
    </Menu.Item>
    <Menu.Item key="menu_spline">
      <Link to="/spline">Spline</Link>
    </Menu.Item>
  </Menu>
);
const LeastSquaresRegression = (
  <Menu>
    <Menu.Item key="menu_linear">
      <Link to="/linear">Linear Regression</Link>
    </Menu.Item>
    <Menu.Item key="menu_poly">
      <Link to="/polynomial">Polynomial Regression</Link>
    </Menu.Item>
    <Menu.Item key="menu_multiple">
      <Link to="/multiple-linear">Multiple Linear Regression</Link>
    </Menu.Item>
  </Menu>
);
export { Rootequation, Linearalgebra, Interpolation, LeastSquaresRegression };
