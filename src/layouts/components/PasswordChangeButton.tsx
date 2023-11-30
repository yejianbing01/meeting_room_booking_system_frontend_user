import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import CaptchaButton from '../../components/CaptchaButton'
import './infoChangeButton.scss'
import { useStore } from '../../store'
import { captcha, updatePassword } from '../../api/user'

export default function InfoChangeButton() {
  const [form] = useForm()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  const { store, dispatch } = useStore()
  form.setFieldsValue(store.loginData.userInfo)

  const onCaptcha = async () => {
    captcha(form.getFieldValue('email'))
      .then(() => message.success('发送成功'))
      .catch(() => { })
  }

  const hideModal = () => {
    form.resetFields()
    setOpen(false)
  }
  const openModal = () => setOpen(true)

  const onOk = async () => {
    await updatePassword(form.getFieldsValue())
    message.success('修改成功')
    dispatch({ type: 'logout' })
    hideModal()
    nav('/login', { replace: true })
  }

  return (
    <>
      <Button type="link" onClick={openModal}>密码修改</Button>
      {open && (
        <Modal title="密码修改" cancelText="取消" okText="修改" open={open} onOk={onOk} onCancel={hideModal}>
          <div className="update-info">
            <Form
              form={form}
              className="update-info-form"
              labelAlign="right"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              colon={false}
              autoComplete="off"
            >
              <Form.Item label="用户名" name="username" hidden>
                <Input />
              </Form.Item>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: '昵称不能为空' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item label="确认密码" name="password2" rules={[{ required: true, message: '昵称不能为空' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '请输入合法邮箱地址!' },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item label="验证码" name="captcha" wrapperCol={{ span: 12 }} rules={[{ required: true, message: '请输入验证码!' }]}>
                <div className="captcha-wrapper">
                  <Input />
                  <CaptchaButton onClick={onCaptcha} />
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </>
  )
}
