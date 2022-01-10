import React, { useState } from "react";
import { login } from "api/login";
import { useHistory } from "react-router-dom";
import { connection } from "store/actions/singleChat";
import { connect } from "react-redux";
import { User, State } from "store/state/singleChat";
import { List , Input ,Button} from 'antd';


interface LoginProps {
  connectionToWs(data: User): void;
}

const Login = (props: LoginProps & State) => {
  const { connectionToWs } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const loginIn = async () => {
    let data = await login({ username, password });
    if (data !== null) {
      connectionToWs(JSON.parse(data as string));
      history.push("/index");
    }
  };

  return (
    <div
      style={{
        position:'absolute',
        left:'0px',
        right:'0px',
        top:'0px',
        bottom:'0px',
        margin:'auto',
        width:'500px',
        height:'400px'
      }}
    >
      <List >
        <h2>欢迎登录袂信</h2>
        <List.Item prefix="用户名">
          <Input
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </List.Item>
        <List.Item prefix="密码">
          <Input
            placeholder="请输入密码"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </List.Item>
      </List>
      <Button block color="primary" size="middle" onClick={loginIn}>
        登录
      </Button>
    </div>
  );
};

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state: State) => {
  return {
    ...state,
  };
};

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any) => {
  return {
    connectionToWs(data: User) {
      dispatch(connection(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
