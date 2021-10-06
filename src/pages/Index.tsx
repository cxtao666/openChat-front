/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import { css } from "@emotion/react";
import { Chat } from "./Chat";
import { Me } from "./Me";
import { UpLoad } from "./UpLoad";
import { Home } from "./Home";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UploadOutline,
  UserOutline,
} from "antd-mobile-icons";

// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function Index() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "upload",
      title: "动态",
      icon: <UploadOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "消息中心",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "personalCenter",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState("index");
  const changeActiveKey = (key: string) => {
    setActiveKey(key);
    switch (key) {
      case "personalCenter":
        history.push(`${path}/me`);
        break;
      case "message":
        history.push(`${path}/chat`);
        break;
      case "upload":
        history.push(`${path}/upload`);
        break;
      case "home":
        history.push(`${path}/home`);
        break;
    }
  };

  return (
    <>
      {activeKey.search("index") === -1 ? <div></div> : <Home></Home>}
      <Switch>
        <Route path={`${path}/me`} component={Me}></Route>
        <Route path={`${path}/chat`} component={Chat}></Route>
        <Route path={`${path}/upload`} component={UpLoad}></Route>
        <Route path={`${path}/home`} component={Home}></Route>
      </Switch>
      <div
        css={css`
          position: fixed;
          bottom: 0px;
          width: 100%;
          background-color: #fbfbfd;
        `}
      >
        <TabBar
          activeKey={activeKey === "index" ? "home" : activeKey}
          onChange={changeActiveKey}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </>
  );
}

export default Index;
