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

registerMicroApps([
  {
    name: 'chat',
    entry: isProd ? `//${location.host}/chat/` : 'http://localhost:3001',
    container: '#app',
    activeRule: '/chat',
  },
  {
    name: 'doc',
    entry: isProd ? `//${location.host}/doc/` : 'http://localhost:3002',
    container: '#app',
    activeRule: '/document',
  },
]);
// 启动 qiankun
start();
