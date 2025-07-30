import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: boolean;
  version: string;
  creator: string;
  createTime: string;
  updateTime: string;
  instanceCount: number;
}

const WorkflowManage: React.FC = () => {
  // 模拟数据
  const mockData: Workflow[] = [
    {
      id: 'workflow-1',
      name: '订单审批流程',
      description: '处理订单审批的完整工作流程',
      status: true,
      version: '1.0.0',
      creator: '张三',
      createTime: '2024-01-15 10:30:00',
      updateTime: '2024-01-15 10:30:00',
      instanceCount: 25,
    },
    {
      id: 'workflow-2',
      name: '用户入职流程',
      description: '新员工入职相关的工作流程',
      status: true,
      version: '2.1.0',
      creator: '李四',
      createTime: '2024-01-14 15:20:00',
      updateTime: '2024-01-14 15:20:00',
      instanceCount: 8,
    },
    {
      id: 'workflow-3',
      name: '费用报销流程',
      description: '员工费用报销审批流程',
      status: false,
      version: '1.5.0',
      creator: '王五',
      createTime: '2024-01-13 09:15:00',
      updateTime: '2024-01-13 09:15:00',
      instanceCount: 12,
    },
  ];

  const columns = [
    {
      title: '工作流名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workflow) => (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 'bold' }}>{text}</span>
          <span style={{ color: '#666', fontSize: '12px' }}>{record.description}</span>
        </Space>
      ),
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
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (text: string) => <Tag color="blue">v{text}</Tag>,
    },
    {
      title: '实例数',
      dataIndex: 'instanceCount',
      key: 'instanceCount',
      render: (count: number) => <Tag color="green">{count}</Tag>,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Workflow) => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" icon={<PlayCircleOutlined />}>
            启动
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (checked: boolean) => {
    message.success(`工作流状态已${checked ? '启用' : '禁用'}`);
  };

  return (
    <PageContainer
      title="工作流管理"
      extra={
        <Button icon={<PlusOutlined />} type="primary">
          创建工作流
        </Button>
      }
    >
      <Card>
        <ProTable<Workflow>
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

export default WorkflowManage; 