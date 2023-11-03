import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Button
} from "antd";
import { register } from 'api/register';
import { login } from 'api/login';

/* 
interface RegisterProps{
  connection(data: User): void;
} */

const Register = () => {
//  const { connection } = props;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  const onFinish = async () => {
    const data = await register({username,password,nickname})
    if(data !== null){
      const user = await login({username,password})
    //  connection(user as any);
      history.push('/index')  
    }
  };

  return (
    <Form>
      <Form.Item
        name="username"
        label="账号"
        rules={[{ required: true, message: "账号不能为空" }]}
      >
        <Input placeholder="请输入账号" value={username} onChange={(e: { target: { value: any; }; })=>{setUsername(e.target.value)}} />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: "密码不能为空" }]} >
        <Input placeholder="请输入密码" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" />
      </Form.Item>
      <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: "昵称不能为空" }]}>
        <Input placeholder="请输入昵称" value={nickname} onChange={(e)=>{setNickname(e.target.value)}} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};



export default Register;