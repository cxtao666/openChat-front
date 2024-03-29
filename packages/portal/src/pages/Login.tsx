import React, { useState } from 'react'
import { login } from 'api/login'
import { useHistory } from 'react-router-dom'
import { List, Input, Button, Form } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Name = ({ name }: { name: string }) => {
  return <div style={{ color: 'rgba(255,255,255,0.9)' }}>{name}</div>
};

/* interface LoginProps {
    connectionToWs(data: User): void;
} */

const Login = () => {
  // const { connectionToWs } = props;
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const loginIn = async () => {
    let data = await login({ username, password })
    if (data !== null) {
      //    connectionToWs(data as any);
      history.push('/index')
    }
  }

  return (
    <div>
      <video style={{ width: '100%', height: '100%' }} poster="/background.png" loop muted autoPlay>
        <source src="/background.mp4" />
      </video>
      <div
        style={{
          position: 'absolute',
          left: '0px',
          right: '0px',
          top: '0px',
          bottom: '0px',
          margin: 'auto',
          width: '500px',
          height: '300px',
          zIndex: 100,
          opacity: 1
        }}
      >
        <Form
          labelAlign="left"
          layout="vertical"
          style={{
            width: 400,
            margin: 'auto',
            paddingBottom: 20,
            paddingTop: 20
          }}
        >
          <h2 style={{ color: 'white', textAlign: 'center' }}>欢迎登录袂信!</h2>
          <Form.Item
            label={<Name name="用户名"></Name>}
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
            style={{ width: '100%', color: 'white' }}
          >
            <Input
              placeholder="请输入用户名"
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              style={{ padding: '8px 8px', borderRadius: '10px' }}
            />
          </Form.Item>
          <Form.Item
            style={{ width: '100%', color: 'white' }}
            label={<Name name="密码"></Name>}
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
              type="password"
              value={password}
              onChange={(e: { target: { value: any } }) => {
                setPassword(e.target.value)
              }}
              style={{ padding: '8px 8px', borderRadius: '10px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="middle"
              onClick={loginIn}
              className="login-form-button"
              style={{ width: '100%', borderRadius: '10px' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
