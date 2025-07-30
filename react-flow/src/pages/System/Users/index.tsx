import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Avatar, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

interface User {
  id: string;
  username: string;
  realName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: boolean;
  lastLoginTime: string;
  createTime: string;
}

const Users: React.FC = () => {
  // 模拟数据
  const mockData: User[] = [
    {
      id: 'user-1',
      username: 'zhangsan',
      realName: '张三',
      email: 'zhangsan@company.com',
      phone: '13800138001',
      department: '技术部',
      role: 'admin',
      status: true,
      lastLoginTime: '2024-01-15 10:30:00',
      createTime: '2024-01-01 09:00:00',
    },
    {
      id: 'user-2',
      username: 'lisi',
      realName: '李四',
      email: 'lisi@company.com',
      phone: '13800138002',
      department: '人事部',
      role: 'manager',
      status: true,
      lastLoginTime: '2024-01-15 09:15:00',
      createTime: '2024-01-02 10:00:00',
    },
    {
      id: 'user-3',
      username: 'wangwu',
      realName: '王五',
      email: 'wangwu@company.com',
      phone: '13800138003',
      department: '财务部',
      role: 'user',
      status: false,
      lastLoginTime: '2024-01-14 16:45:00',
      createTime: '2024-01-03 14:30:00',
    },
  ];

  const columns = [
    {
      title: '用户信息',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.realName}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{text}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_, record: User) => (
        <div>
          <div>{record.email}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => {
        const colorMap = {
          admin: 'red',
          manager: 'orange',
          user: 'green',
        };
        return <Tag color={colorMap[text as keyof typeof colorMap]}>{text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Switch 
          checked={status} 
          onChange={(checked) => handleStatusChange(checked)}
        />
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: User) => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (checked: boolean) => {
    message.success(`用户状态已${checked ? '启用' : '禁用'}`);
  };

  return (
    <PageContainer
      title="用户管理"
      extra={
        <Button icon={<PlusOutlined />} type="primary">
          添加用户
        </Button>
      }
    >
      <Card>
        <ProTable<User>
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          toolBarRender={false}
        />
      </Card>
    </PageContainer>
  );
};

export default Users; 