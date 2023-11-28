import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import CaptchaButton from '../../components/CaptchaButton'
import ImgUpload from '../../components/ImgUpload'
import { captcha, updateCurrentUserInfo } from '../../lib/interface'
import './infoChangeButton.scss'
import { useStore } from '../../store'

export default function InfoChangeButton() {
  const [form] = useForm()
  const [open, setOpen] = useState(false)
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
    await updateCurrentUserInfo(form.getFieldsValue())
    message.success('修改成功')
    hideModal()
    dispatch({
      type: 'updateUserInfo',
      payload: {
        loginData: {
          userInfo: form.getFieldsValue(),
        },
      },
    })
  }

  const onUploadSuccess = (fileName: string) => {
    form.setFieldsValue({ headPic: fileName })
  }

  return (
    <>
      <Button type="link" onClick={openModal}>信息修改</Button>
      {
        open && (
          <Modal cancelText="取消" okText="修改" open={open} onOk={onOk} onCancel={hideModal}>
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
                <Form.Item
                  label="头像"
                  name="headPic"
                  className="avatar-item"
                  rules={[{ required: true, message: '用户名不能为空' }]}
                >
                  <ImgUpload onSuccess={onUploadSuccess} />
                </Form.Item>

                <Form.Item label="昵称" name="nickName" rules={[{ required: true, message: '昵称不能为空' }]}>
                  <Input />
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
        )
      }

    </>
  )
}
