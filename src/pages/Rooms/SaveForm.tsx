import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { roomApi } from '../../api/roomApi'

interface Props {
  children: ReactNode
  onSuccess?: () => void
  initValue?: RoomVO
}

export default function SaveForm(props: Props) {
  const [form] = useForm()
  const [modelDisplay, setModelDisplay] = useState(false)
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    form.resetFields()
    setOpen(false)
  }
  const openModal = () => {
    setModelDisplay(true)
    setOpen(true)
  }

  const onSubmit = async () => {
    await form.validateFields()
    if (props.initValue?.id) {
      await roomApi.updateRoom(form.getFieldsValue())
    }
    else {
      await roomApi.createRoom(form.getFieldsValue())
    }
    message.success('会议室新增成功')
    hideModal()
    props.onSuccess?.()
  }

  const onCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    hideModal()
    setTimeout(() => setModelDisplay(false), 200)
  }

  return (
    <span onClick={openModal}>
      {props.children}
      {
        modelDisplay && (
          <Modal
            title={props.initValue ? '修改会议室' : '新增会议室'}
            cancelText="取消"
            okText="保存"
            open={open}
            onOk={onSubmit}
            onCancel={onCancel}
          >
            <div className="update-info">
              <Form
                form={form}
                initialValues={props.initValue}
                labelAlign="right"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                colon={false}
                autoComplete="off"
              >
                { props.initValue?.id && <Form.Item name="id" hidden />}
                <Form.Item label="会议室名称" name="name" rules={[{ required: true, message: '会议室名称不能为空' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="容纳人数" name="capacity" rules={[{ required: true, message: '容纳人数不允许为空' }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="位置" name="location" rules={[{ required: true, message: '位置不允许为空' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="设备" name="equipment" rules={[{ required: true, message: '设备不允许为空' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="描述" name="description" rules={[{ required: true, message: '描述不允许为空' }]}>
                  <Input.TextArea />
                </Form.Item>
              </Form>
            </div>
          </Modal>
        )
      }
    </span>
  )
}
