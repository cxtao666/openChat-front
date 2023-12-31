import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import { Provider } from "react-redux";
import { createSocket } from "./util/chat/index";
import { connection } from "store/actions/singleChat";

declare global {
  interface Window {
    CHAT_BASIC: any; // websocket 方法
    TATGET_USER: any; // 当前聊天窗口的目标用户
    TARGET_ROOM: any; // 当前聊天窗口德目标房间
    USERID: any; // 当前用户的id
    __POWERED_BY_QIANKUN__: any;
  }
}

const render = (props: any) => {
  const CHAT_BASIC = createSocket(store);
  window.CHAT_BASIC = CHAT_BASIC;
  store.dispatch(connection(props.user as any));
  console.log(props.user.id)
  ReactDOM.render(<Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}


if (!window.__POWERED_BY_QIANKUN__) {
  render({ user: {} });
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log(props.container.querySelector('#root'))
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log('update props', props);
}