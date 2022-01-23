import React from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { Route } from "react-router-dom";
import Register from "pages/Register";
import "antd/dist/antd.css";

// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function App() {
  return (
    <div style={{ height: "100%" }}>
      <Route path="/index" component={Index} />
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </div>
  );
}

export default App;
