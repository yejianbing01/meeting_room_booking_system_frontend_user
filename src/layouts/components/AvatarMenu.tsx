import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import avatar from 'antd/es/avatar'
import React, { useState } from 'react'
import MyImage from '../../components/MyImage'
import PasswordChangeButton from './PasswordChangeButton'
import InfoChangeButton from './InfoChangeButton'

interface Props {
  avatar: string
}

export default function AvatarMenu(props: Props) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <InfoChangeButton />,
    },
    {
      key: '2',
      label: <PasswordChangeButton />,
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <Avatar className="avatar" src={<MyImage src={props.avatar} />} />
      </Dropdown>
    </>
  )
}
