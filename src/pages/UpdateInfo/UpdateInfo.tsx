import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { captcha, getCurrentUserInfo, updateCurrentUserInfo } from '../../lib/interface';
import CaptchaButton from '../../components/CaptchaButton';
import { useForm } from 'antd/es/form/Form';
import './style.scss';
import { useEffect } from 'react';
import ImgUpload from '../../components/ImgUpload';


export default function Register() {
  const nav = useNavigate();

  const onLogin = () => nav('/login', { replace: true })

  const onCaptcha = async () => {
    captcha(form.getFieldValue('email'))
      .then(() => message.success('发送成功'))
      .catch(() => { })
  }

  const onFinish = async (updateUserDto: UpdateUserDto) => {
    try {
      await updateCurrentUserInfo(updateUserDto);
      message.success('修改成功');
    } catch (error) { }
  }

  useEffect(() => {
    async function initData() {
      try {
        const userInfo = await getCurrentUserInfo();
        console.log(userInfo);
        form.setFieldsValue(userInfo);
      } catch (error) { }
    }
    initData();
  }, [])

  const onUploadSuccess = (fileName: string) => {
    form.setFieldsValue({ headPic: fileName })
  }

  const [form] = useForm();

  return (
    <div className='update-info'>
      <Form
        form={form}
        className='update-info-form'
        labelAlign="right"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        colon={false}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="headPic"
          className='avatar-item'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <ImgUpload onSuccess={onUploadSuccess} />
        </Form.Item>

        <Form.Item label="昵称" name="nickName" rules={[{ required: true, message: '昵称不能为空' }]} >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱!' },
            { type: "email", message: '请输入合法邮箱地址!' }
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="验证码" name="captcha" rules={[{ required: true, message: '请输入验证码!' }]} >
          <div className='captcha-wrapper'>
            <Input />
            <CaptchaButton onClick={onCaptcha} />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 15, span: 9 }} >
          <Button type="link" onClick={onLogin}>已有账号？去登录</Button>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button className='login-card-submit' type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}