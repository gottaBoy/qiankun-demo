import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Avatar, message } from 'antd';
import { CheckOutlined, ClockCircleOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';

interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  processInstanceId: string;
  processDefinitionName: string;
  priority: number;
  dueDate: string;
  createTime: string;
  status: string;
}

const FlowableTasks: React.FC = () => {
  // 模拟数据
  const mockData: Task[] = [
    {
      id: 'task-1',
      name: '审批订单申请',
      description: '订单金额超过10000元需要审批',
      assignee: '张三',
      processInstanceId: 'instance-1',
      processDefinitionName: '订单审批流程',
      priority: 1,
      dueDate: '2024-01-16 18:00:00',
      createTime: '2024-01-15 10:30:00',
      status: 'pending',
    },
    {
      id: 'task-2',
      name: '审核费用报销',
      description: '审核员工提交的费用报销申请',
      assignee: '李四',
      processInstanceId: 'instance-2',
      processDefinitionName: '费用报销流程',
      priority: 2,
      dueDate: '2024-01-17 18:00:00',
      createTime: '2024-01-15 14:20:00',
      status: 'in_progress',
    },
    {
      id: 'task-3',
      name: '确认入职材料',
      description: '确认新员工入职所需材料',
      assignee: '王五',
      processInstanceId: 'instance-3',
      processDefinitionName: '用户入职流程',
      priority: 3,
      dueDate: '2024-01-18 18:00:00',
      createTime: '2024-01-15 16:15:00',
      status: 'completed',
    },
  ];

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Task) => (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 'bold' }}>{text}</span>
          <span style={{ color: '#666', fontSize: '12px' }}>{record.description}</span>
        </Space>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{assignee}</span>
        </Space>
      ),
    },
    {
      title: '流程名称',
      dataIndex: 'processDefinitionName',
      key: 'processDefinitionName',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: number) => {
        const colorMap = {
          1: 'red',
          2: 'orange',
          3: 'green',
        };
        return <Tag color={colorMap[priority as keyof typeof colorMap]}>P{priority}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          pending: { color: 'default', text: '待处理', icon: <ClockCircleOutlined /> },
          in_progress: { color: 'processing', text: '进行中', icon: <ClockCircleOutlined /> },
          completed: { color: 'success', text: '已完成', icon: <CheckOutlined /> },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '截止时间',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Task) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>
            查看
          </Button>
          {record.status === 'pending' && (
            <Button type="link">
              开始处理
            </Button>
          )}
          {record.status === 'in_progress' && (
            <Button type="link">
              完成任务
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="任务管理"
      extra={
        <Space>
          <Button>我的任务</Button>
          <Button>团队任务</Button>
          <Button type="primary">创建任务</Button>
        </Space>
      }
    >
      <Card>
        <ProTable<Task>
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

export default FlowableTasks; 