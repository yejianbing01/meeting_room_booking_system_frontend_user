import { Button, Form, Input, Table, Image, message } from 'antd'
import Column from 'antd/es/table/Column'
import './style.scss';
import { useCallback, useEffect, useState } from 'react';
import { disableUser, findUserList } from '../../lib/interface';
import { useForm } from 'antd/es/form/Form';


export default function Users() {
    const [form] = useForm();
    const [userList, setUserList] = useState<UserDetailVo[]>();
    const [total, setTotal] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [random, setRandom] = useState({});

    const getUsers = useCallback(async function (pageNo: number, pageSize: number) {
        try {
            const { users, totalCount } = await findUserList({ pageNo, pageSize, ...form.getFieldsValue() })
            setUserList(users);
            setTotal(totalCount);
        } catch (error) { }
    }, [])

    const onSearch = async () => {
        if (pageNo === 1) {
            return getUsers(pageNo, pageSize)
        }
        setPageNo(1);
    }
    const onPaginationChange = (page: number, pageSize: number) => {
        setPageNo(page);
        setPageSize(pageSize);
    }

    useEffect(() => {
        getUsers(pageNo, pageSize).catch(error => { })
    }, [pageNo, pageSize, random])


    const renderAvatar = (value: string | undefined) => value ? <Image width={60} src={'http://localhost:3001/' + value} /> : ''

    const onDisableUser = async (userId: number) => {
        try {
            await disableUser(userId)
            message.success('停用成功')
            setRandom({});
        } catch (error) {

        }
    }

    return (
        <div>
            <Form
                form={form}
                className='table-search-form'
                labelAlign="right"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="inline"
                colon={false}
                onFinish={onSearch}
                autoComplete="off"
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="昵称" name="nickName">
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱" name="email">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"> 搜索 </Button>
                </Form.Item>
            </Form>
            <Table dataSource={userList} rowKey={(record) => record.id} pagination={{ total, pageSize, current: pageNo, onChange: onPaginationChange }} >
                <Column title="用户名" dataIndex="username" key="username" />
                <Column title="头像" dataIndex="headPic" key="headPic" render={renderAvatar} />
                <Column title="昵称" dataIndex="nickName" key="nickName" />
                <Column title="邮箱" dataIndex="email" key="email" />
                <Column title="状态" dataIndex="isFrozen" key="email" render={(value: number) => value && '已停用'} />
                <Column title="注册时间" dataIndex="createTime" key="createTime" />
                <Column
                    title="操作"
                    key="action"
                    render={(_, record: UserDetailVo) => {
                        return record.isFrozen ? <Button type="link" onClick={() => { }}>启用</Button>
                            : <Button type="link" onClick={() => onDisableUser(record.id)}>停用</Button>
                    }}
                />
            </Table>
        </div>
    )
}