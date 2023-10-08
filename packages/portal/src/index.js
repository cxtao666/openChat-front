import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
const isProd = process.env.NODE_ENV === "production";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 微前端前端框架的路由代码由浏览器执行，nginx路由的配置是nginx服务器执行
registerMicroApps([
  {
    name: 'chat',
    entry: isProd ? `/chat/` : 'http://localhost:3001',
    container: '#app',
    activeRule: '/chatApp',
  },
  {
    name: 'doc',
    entry: isProd ? `/doc/` : 'http://localhost:3002',
    container: '#app',
    activeRule: '/cloudDoc',
  },
]);
// 启动 qiankun
start();
