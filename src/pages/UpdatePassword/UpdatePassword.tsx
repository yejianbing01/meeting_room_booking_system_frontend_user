import { Button, Form, Input, message } from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { captcha, updatePassword } from '../../lib/interface'
import CaptchaButton from '../../components/CaptchaButton'

export default function UpdatePassword() {
  const nav = useNavigate()
  const [form] = useForm()

  const onCaptcha = async () => {
    return form.validateFields(['email'])
      .then(() => {
        captcha(form.getFieldValue('email'))
          .then(() => message.success('发送成功'))
          .catch(() => { })
      })
  }

  const onFinish = async (updatePasswordDto: UpdatePasswordDto) => {
    if (updatePasswordDto.password !== updatePasswordDto.password2) {
      return message.error('两次密码不一致，请重新输入')
    }
    try {
      await updatePassword(updatePasswordDto)
      message.success('密码修改成功')
      nav('/login', { replace: true })
    }
    catch (error) { }
  }

  return (
    <div className="update-password-card-container">
      <div className="update-password-card">
        <h1 className="update-password-card-title">会议室预定系统</h1>
        <Form
          form={form}
          className="update-password-card-form"
          labelAlign="right"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          colon={false}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入合法邮箱地址!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="验证码" name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
            <div className="captcha-wrapper">
              <Input />
              <CaptchaButton onClick={onCaptcha} />
            </div>
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="password2" rules={[{ required: true, message: '确认密码不能为空' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button className="update-password-card-submit" type="primary" htmlType="submit">
              重置密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
