import { Route, Switch } from "react-router-dom";
import React from "react";
import Graphical from "../calculator/RootofEquation/Graphical";
import Bisection from "../calculator/RootofEquation/Bisection";
import Falseposition from "../calculator/RootofEquation/Falseposition";
import Newtonraphson from "../calculator/RootofEquation/Newtonraphson";
import Onepoint from "../calculator/RootofEquation/Onepoint";
import Secant from "../calculator/RootofEquation/Secant";
import Cramer from "../calculator/Linearalgebra/Cramer";
import Gauss from "../calculator/Linearalgebra/Gauss";
import Jordan from "../calculator/Linearalgebra/Gaussjordan";
import LU from "../calculator/Linearalgebra/LU";
import Jacobi from "../calculator/Linearalgebra/Jacobi";
import Seidel from "../calculator/Linearalgebra/GaussSeidel";
import Gradient from "../calculator/Linearalgebra/Gradient";
import Newtondivide from "../calculator/Interpolation/Newtondivide"
import Lagrange from "../calculator/Interpolation/Lagrange"
import Spline from "../calculator/Interpolation/Spline"
import Linear from "../calculator/Regression/Linear"
import MultipleLinear from "../calculator/Regression/MultipleLinear"
import Polynomial from "../calculator/Regression/Polynomial"
export default function Content() {
  return (
    <Switch>
      {/* Root of Equation */}
      <Route exact path="/graphical" component={Graphical} />
      <Route exact path="/bisection" component={Bisection} />
      <Route exact path="/false-position" component={Falseposition} />
      <Route exact path="/one-point" component={Onepoint} />
      <Route exact path="/newton-raphson" component={Newtonraphson} />
      <Route exact path="/secant" component={Secant} />
      {/* Linear Algebra */}
      <Route exact path="/cramer" component={Cramer} />
      <Route exact path="/gauss" component={Gauss} />
      <Route exact path="/jordan" component={Jordan} />
      <Route exact path="/lu" component={LU} />
      <Route exact path="/jacobi" component={Jacobi} />
      <Route exact path="/seidel" component={Seidel} />
      <Route exact path="/conjugate-gradient" component={Gradient} />
      {/* Interpolation */}
      <Route exact path="/newton" component={Newtondivide} />
      <Route exact path="/lagrange" component={Lagrange} />
      <Route exact path="/spline" component={Spline} />
      {/* Regression */}
      <Route exact path="/linear" component={Linear} />
      <Route exact path="/polynomial" component={Polynomial} />
      <Route exact path="/multiple-linear" component={MultipleLinear} />
    </Switch>
  );
}
