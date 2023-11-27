import { Avatar, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import './indexLayout.scss'
import type { RouteObject } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import { getCurrentUserInfo } from '../lib/interface'
import { indexRoute } from '..'

export default function IndexLayout() {
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    getCurrentUserInfo()
      .then(res => setAvatar(res.headPic))
  }, [])
  return (
    <Layout className="index-layout">
      <Header className="index-layout-header">
        <h1>会议室预定系统</h1>
        <div className="right-area">
          <Link to="/update_info">
            <Avatar src={<img src={`http://localhost:3001/${avatar}`} alt="avatar" />} />
          </Link>
        </div>
      </Header>
      <Layout>
        <Sider theme="light">
          <SideMenu />
        </Sider>
        <Content className="index-layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

function SideMenu() {
  const getMenuItems = (routes: RouteObject[]): ItemType<MenuItemType>[] => {
    return routes.filter(item => item.meta?.menu)
      ?.map(data => ({
        key: data.path as string,
        icon: data.meta?.icon,
        label: <Link to={data.path || '/'}>{data.meta?.title}</Link>,
        children: data.children ? getMenuItems(data.children) : undefined,
      }))
  }

  return (
    <Menu
      defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
      mode="inline"
        // inlineCollapsed={collapsed}
      items={getMenuItems(indexRoute.children!)}
    />
  )
}
