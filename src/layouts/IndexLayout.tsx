import { UserOutlined } from '@ant-design/icons'
import { Avatar, Layout } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import './indexLayout.scss';
import { Link, Outlet } from 'react-router-dom';
import form from 'antd/es/form';
import { useEffect, useState } from 'react';
import { getCurrentUserInfo } from '../lib/interface';

export default function IndexLayout() {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        getCurrentUserInfo()
            .then(res => setAvatar(res.headPic))
    }, [])
    return (
        <Layout className='index-layout'>
            <Header className='index-layout-header'>
                <h1>会议室预定系统</h1>
                <div className="right-area">
                    <Link to={'/update_info'}>
                        <Avatar src={<img src={'http://localhost:3001/' + avatar} alt="avatar" />} />
                    </Link>
                </div>
            </Header>
            <Layout>
                <Sider theme='light'>left sidebar</Sider>
                <Content className='index-layout-content'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}