/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Chat from "./Chat";
import GroupChat from "./GroupChat";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Menu } from 'antd';
import { MessageFilled, IdcardFilled } from '@ant-design/icons';
import { connect } from "react-redux";
import indexCss from './index.module.css'
import { State } from 'store/state/singleChat';


// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function Index(props: State) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const tabs = [
    {
      key: "message",
      title: "聊天",
      icon: <MessageFilled className={indexCss.icon} style={{ color: "white" }} />,
    },
    {
      key: "groupChat",
      title: "群聊",
      icon: <IdcardFilled className={indexCss.icon} style={{ color: "white" }} />,
    },
  ];

  const [activeKey, setActiveKey] = useState("index");
  const changeActiveKey = (key: string) => {
    setActiveKey(key);
    switch (key) {
      case "message":
        history.push(`${path}/chat`);
        break;
      case "groupChat":
        history.push(`${path}/groupChat`);
        break;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
      <div
        css={css`
          left: 0px;
          width: 200px;
          background-color: #000;
          text-align:center;
          padding-top:20px;
          height:100%;
        `}
      >
        <img src={props.user?.avatar}
          alt="" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
        <Menu
          style={{ padding: '0px' }}
          defaultSelectedKeys={[activeKey === "index" ? "message" : activeKey]}
        >
          {tabs.map((item) => (
            <div onClick={() => {
              changeActiveKey(item.key)
            }}
              style={{
                display: "flex", flexDirection: "row", alignItems: "center", height: "50px",
                justifyContent: "center",
              }}
              className={indexCss.item}
            >
              {item.icon}
              <div style={{ cursor: "pointer", marginLeft: '10px', color: 'white' }}>{item.title}</div>
            </div>
          ))}
        </Menu>
      </div>
      <div style={{ flex: "1", height: "100%" }}>
        {/index$/.test(window.location.href) ? <Chat></Chat> : <div></div>}
        <Switch>
          <Route path={`${path}/chat`} component={Chat}></Route>
          <Route path={`${path}/groupChat`} component={GroupChat}></Route>
        </Switch>
      </div>

    </div>
  );
}
const mapStateToProps = (state: State) => {
  return {
    ...state,
  };
};

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

