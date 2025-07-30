import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: boolean;
  createTime: string;
  updateTime: string;
}

const Roles: React.FC = () => {
  // 模拟数据
  const mockData: Role[] = [
    {
      id: 'role-1',
      name: '系统管理员',
      code: 'ADMIN',
      description: '拥有系统所有权限',
      permissions: ['user:read', 'user:write', 'role:read', 'role:write', 'workflow:read', 'workflow:write'],
      userCount: 2,
      status: true,
      createTime: '2024-01-01 09:00:00',
      updateTime: '2024-01-15 10:30:00',
    },
    {
      id: 'role-2',
      name: '部门经理',
      code: 'MANAGER',
      description: '部门级别的管理权限',
      permissions: ['user:read', 'workflow:read', 'workflow:write'],
      userCount: 5,
      status: true,
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-14 15:20:00',
    },
    {
      id: 'role-3',
      name: '普通用户',
      code: 'USER',
      description: '基础操作权限',
      permissions: ['workflow:read'],
      userCount: 15,
      status: true,
      createTime: '2024-01-03 14:30:00',
      updateTime: '2024-01-13 09:15:00',
    },
  ];

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Role) => (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 'bold' }}>{text}</span>
          <span style={{ color: '#666', fontSize: '12px' }}>{record.code}</span>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.slice(0, 3).map((permission, index) => (
            <Tag key={index} color="blue" size="small">
              {permission}
            </Tag>
          ))}
          {permissions.length > 3 && (
            <Tag color="default" size="small">
              +{permissions.length - 3}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => <Tag color="green">{count}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'success' : 'default'}>
          {status ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Role) => (
        <Space>
          <Button type="link" icon={<SettingOutlined />}>
            权限
          </Button>
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

  return (
    <PageContainer
      title="角色管理"
      extra={
        <Button icon={<PlusOutlined />} type="primary">
          添加角色
        </Button>
      }
    >
      <Card>
        <ProTable<Role>
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

export default Roles; 