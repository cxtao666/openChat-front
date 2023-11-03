import React from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "pages/Register";
import { ErrorPage } from 'components/error';
import "antd/dist/antd.css";

// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function App() {
  return (
    <div style={{ height: "100%" }}>
      {
        <Index></Index>
      }
      {/*   <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/chatApp' : '/'}>
        <Route path="/index" component={Index} />
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/404" component={ErrorPage} />
      </BrowserRouter> */}
    </div>
  );
}
export default App;
