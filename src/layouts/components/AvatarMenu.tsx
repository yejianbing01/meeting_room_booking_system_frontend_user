import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import MyImage from '../../components/MyImage'
import PasswordChangeButton from './PasswordChangeButton'
import InfoChangeButton from './InfoChangeButton'
import LogoutButton from './LogoutButton'

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
    {
      key: '3',
      label: <LogoutButton />,
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
