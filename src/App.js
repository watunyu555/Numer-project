import React from 'react'
import Homepage from "./components/webpages/Homepage"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Homepage/>
    </Router>
  )
}
