import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import CaptchaButton from '../../components/CaptchaButton'
import { captcha, getCurrentUserInfo, updateCurrentUserInfo } from '../../lib/interface'
import './infoChangeButton.scss'

export default function InfoChangeButton() {
  const [form] = useForm()
  const [open, setOpen] = useState(false)

  const onCaptcha = async () => {
    captcha(form.getFieldValue('email'))
      .then(() => message.success('发送成功'))
      .catch(() => { })
  }

  const hideModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  const onOk = async () => {
    await updateCurrentUserInfo(form.getFieldsValue())
    message.success('修改成功')
    hideModal()
  }

  useEffect(() => {
    async function initData() {
      const userInfo = await getCurrentUserInfo()
      form.setFieldsValue(userInfo)
    }
    initData()
  }, [])

  // const onUploadSuccess = (fileName: string) => {
  //   form.setFieldsValue({ headPic: fileName })
  // }

  return (
    <>
      <Button type="link" onClick={openModal}>密码修改</Button>
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
    </>
  )
}
