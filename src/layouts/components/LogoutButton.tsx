import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { useStore } from '../../store'

export default function LogoutButton() {
  const [open, seOpen] = useState(false)
  const { dispatch } = useStore()
  const nav = useNavigate()

  const onLogout = () => {
    dispatch({ type: 'logout' })
    nav('/login', { replace: true })
  }

  return (
    <>
      <Button type="link" onClick={() => seOpen(true)}>退出登录</Button>
      {open && (
        <Modal
          open={open}
          closable={false}
          okText="退出"
          cancelText="取消"
          onCancel={() => seOpen(false)}
          onOk={onLogout}
        >
          确认退出登录？
        </Modal>
      )}
    </>
  )
}
