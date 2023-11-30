import { Button, Form, Image, Input, Modal, Table, message } from 'antd'
import Column from 'antd/es/table/Column'
import './style.scss'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { PlusOutlined } from '@ant-design/icons'
import { roomApi } from '../../api/roomApi'

export default function Users() {
  const [form] = useForm()
  const [roomList, setRoomList] = useState<RoomVO[]>()
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [random, setRandom] = useState({})

  const findRooms = async (pageNo: number, pageSize: number) => {
    const { rooms, totalCount } = await roomApi.findRooms({ pageNo, pageSize, ...form.getFieldsValue() })
    setRoomList(rooms)
    setTotal(totalCount)
  }

  const onSearch = async () => {
    if (pageNo === 1) {
      return findRooms(pageNo, pageSize)
    }
    setPageNo(1)
  }
  const onPaginationChange = (page: number, pageSize: number) => {
    setPageNo(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    findRooms(pageNo, pageSize)
  }, [pageNo, pageSize, random])

  const onDisableUser = async (roomId: number) => {
    await roomApi.deleteRoom(roomId)
    message.success('删除成功')
    setRandom({})
  }

  return (
    <div>
      <Form
        form={form}
        className="table-search-form"
        labelAlign="right"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="inline"
        colon={false}
        onFinish={onSearch}
        autoComplete="off"
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="容纳人数" name="capacity">
          <Input />
        </Form.Item>
        <Form.Item label="设备" name="equipment">
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="rooms-table-action">
            <Button type="primary" htmlType="submit"> 搜索 </Button>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}> 新增会议室 </Button>
          </div>
        </Form.Item>
      </Form>
      <Table dataSource={roomList} rowKey={record => record.id} pagination={{ total, pageSize, current: pageNo, onChange: onPaginationChange }}>
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="容纳人数" dataIndex="capacity" key="capacity" />
        <Column title="位置" dataIndex="location" key="location" />
        <Column title="设备" dataIndex="equipment" key="equipment" />
        <Column title="描述" dataIndex="description" key="description" />
        <Column title="预定状态" dataIndex="isBooked" key="isBooked" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" />
        <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
        <Column
          title="操作"
          key="action"
          render={(_, record: UserDetailVo) => (
            <>
              <Button type="link" onClick={() => { }}>更新</Button>
              <Button type="link" onClick={() => onDisableUser(record.id)}>删除</Button>
            </>
          )}
        />
      </Table>
    </div>
  )
}
