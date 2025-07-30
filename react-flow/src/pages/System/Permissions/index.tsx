import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Tree, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined } from '@ant-design/icons';

interface Permission {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string;
  status: boolean;
  createTime: string;
}

const Permissions: React.FC = () => {
  // 模拟数据
  const mockData: Permission[] = [
    {
      id: 'perm-1',
      name: '用户管理',
      code: 'user:manage',
      type: 'menu',
      description: '用户信息的增删改查权限',
      status: true,
      createTime: '2024-01-01 09:00:00',
    },
    {
      id: 'perm-2',
      name: '角色管理',
      code: 'role:manage',
      type: 'menu',
      description: '角色的增删改查权限',
      status: true,
      createTime: '2024-01-01 09:00:00',
    },
    {
      id: 'perm-3',
      name: '工作流管理',
      code: 'workflow:manage',
      type: 'menu',
      description: '工作流的增删改查权限',
      status: true,
      createTime: '2024-01-01 09:00:00',
    },
    {
      id: 'perm-4',
      name: '规则管理',
      code: 'rule:manage',
      type: 'menu',
      description: '规则引擎的增删改查权限',
      status: true,
      createTime: '2024-01-01 09:00:00',
    },
    {
      id: 'perm-5',
      name: '系统监控',
      code: 'monitor:view',
      type: 'function',
      description: '查看系统监控信息',
      status: true,
      createTime: '2024-01-01 09:00:00',
    },
  ];

  const columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Permission) => (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 'bold' }}>{text}</span>
          <span style={{ color: '#666', fontSize: '12px' }}>{record.code}</span>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        const colorMap = {
          menu: 'blue',
          function: 'green',
          data: 'orange',
        };
        return <Tag color={colorMap[text as keyof typeof colorMap]}>{text}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Permission) => (
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

  // 权限树数据
  const treeData = [
    {
      title: '系统管理',
      key: 'system',
      children: [
        {
          title: '用户管理',
          key: 'user',
          children: [
            { title: '用户查看', key: 'user:read' },
            { title: '用户创建', key: 'user:create' },
            { title: '用户编辑', key: 'user:update' },
            { title: '用户删除', key: 'user:delete' },
          ],
        },
        {
          title: '角色管理',
          key: 'role',
          children: [
            { title: '角色查看', key: 'role:read' },
            { title: '角色创建', key: 'role:create' },
            { title: '角色编辑', key: 'role:update' },
            { title: '角色删除', key: 'role:delete' },
          ],
        },
      ],
    },
    {
      title: '工作流管理',
      key: 'workflow',
      children: [
        {
          title: '流程设计',
          key: 'workflow:design',
          children: [
            { title: '流程查看', key: 'workflow:read' },
            { title: '流程创建', key: 'workflow:create' },
            { title: '流程编辑', key: 'workflow:update' },
            { title: '流程删除', key: 'workflow:delete' },
          ],
        },
        {
          title: '流程监控',
          key: 'workflow:monitor',
          children: [
            { title: '实例查看', key: 'instance:read' },
            { title: '实例操作', key: 'instance:operate' },
          ],
        },
      ],
    },
    {
      title: '规则引擎',
      key: 'rule',
      children: [
        {
          title: '规则管理',
          key: 'rule:manage',
          children: [
            { title: '规则查看', key: 'rule:read' },
            { title: '规则创建', key: 'rule:create' },
            { title: '规则编辑', key: 'rule:update' },
            { title: '规则删除', key: 'rule:delete' },
          ],
        },
        {
          title: '规则测试',
          key: 'rule:test',
          children: [
            { title: '测试执行', key: 'rule:execute' },
            { title: '测试查看', key: 'rule:view' },
          ],
        },
      ],
    },
  ];

  return (
    <PageContainer
      title="权限管理"
      extra={
        <Button icon={<PlusOutlined />} type="primary">
          添加权限
        </Button>
      }
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 300 }}>
          <Card title="权限树" extra={<KeyOutlined />}>
            <Tree
              treeData={treeData}
              defaultExpandAll
              showLine
              showIcon
            />
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card title="权限列表">
            <ProTable<Permission>
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
        </div>
      </div>
    </PageContainer>
  );
};

export default Permissions; 