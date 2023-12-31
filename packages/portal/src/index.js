import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as Sentry from "@sentry/react";
import actions from "./store"
import { chatName, docName } from "common"
const isProd = process.env.NODE_ENV === "production";


if (isProd) {
  Sentry.init({
    dsn: "https://111d6e12ede7b461289dd69a09014b6c@o4506071360405504.ingest.sentry.io/4506485237219333",
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// 设置全局状态
actions.setGlobalState({ user: { id: 123 } });

// 微前端前端框架的路由代码由浏览器执行，nginx路由的配置是nginx服务器执行
registerMicroApps([
  {
    name: 'chat',
    entry: isProd ? `/chat/` : 'http://localhost:3001',
    container: '#app',
    activeRule: `/${chatName}`,
    props: {
      user: {
        id: 123
      }
    }
  },
  {
    name: 'doc',
    entry: isProd ? `/doc/` : 'http://localhost:3002',
    container: '#app',
    activeRule: `/${docName}`,
  },
]);

// 启动 qiankun
start();
