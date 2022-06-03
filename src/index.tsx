import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import { Provider } from "react-redux";
import { createSocket } from "./util/chat/index";

const CHAT_BASIC = createSocket(store);
declare global {
  interface Window {
    CHAT_BASIC: any; // websocket 方法
    TATGET_USER: any; // 当前聊天窗口的目标用户
    TARGET_ROOM:any; // 当前聊天窗口德目标房间
    USERID: any ; // 当前用户的id
  }
}
window.CHAT_BASIC = CHAT_BASIC;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
