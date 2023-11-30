import { Button, Form, Input, message } from 'antd'
import './login.scss'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import { login } from '../../api/user'

interface FieldType {
  username?: string
  password?: string
}

export default function Login() {
  const nav = useNavigate()
  const { dispatch } = useStore()

  const onRegister = () => nav('/register')
  const onUpdatePassword = () => nav('/find_password')
  const onFinish = async (loginUser: LoginUserDto) => {
    const res = await login(loginUser)
    nav('/', { replace: true })
    message.success('登录成功')
    dispatch({
      type: 'login',
      payload: {
        loginData: {
          userInfo: res.userInfo,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        },
      },
    })
  }

  return (
    <div className="login-card-container">
      <div className="login-card">
        <h1 className="login-card-title">会议室预定系统</h1>
        <Form
          className="login-card-form"
          labelAlign="right"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          colon={false}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <div className="login-card-actions">
              <Button type="link" onClick={onRegister}>创建账号</Button>
              <Button type="link" onClick={onUpdatePassword}>忘记密码</Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
            <Button className="login-card-submit" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
