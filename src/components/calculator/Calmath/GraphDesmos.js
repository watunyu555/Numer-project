import { React, useEffect } from "react";
import Desmos from "desmos";

export default function Bisection(props) {
  const { latex } = props;
  useEffect(() => {
    var elt = document.getElementById("calculator");
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      expressions: false,
    });
    calculator.setExpression({ id: "graph1", latex: `${latex}` });
    return () => {
      calculator.destroy();
    };
  }, [latex]);
  return (
    <div id="calculator" style={{ width:"100%", height:"500px" }}></div>
  );
}
