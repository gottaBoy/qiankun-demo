import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Progress, message } from 'antd';
import { EyeOutlined, StopOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

interface WorkflowInstance {
  id: string;
  name: string;
  workflowName: string;
  status: string;
  progress: number;
  creator: string;
  startTime: string;
  endTime?: string;
  duration: string;
  currentNode: string;
}

const WorkflowInstances: React.FC = () => {
  // 模拟数据
  const mockData: WorkflowInstance[] = [
    {
      id: 'instance-1',
      name: '订单审批-20240115001',
      workflowName: '订单审批流程',
      status: 'running',
      progress: 65,
      creator: '张三',
      startTime: '2024-01-15 10:30:00',
      duration: '2小时30分钟',
      currentNode: '部门经理审批',
    },
    {
      id: 'instance-2',
      name: '用户入职-20240114001',
      workflowName: '用户入职流程',
      status: 'completed',
      progress: 100,
      creator: '李四',
      startTime: '2024-01-14 15:20:00',
      endTime: '2024-01-15 09:15:00',
      duration: '17小时55分钟',
      currentNode: '已完成',
    },
    {
      id: 'instance-3',
      name: '费用报销-20240113001',
      workflowName: '费用报销流程',
      status: 'suspended',
      progress: 30,
      creator: '王五',
      startTime: '2024-01-13 09:15:00',
      duration: '1小时20分钟',
      currentNode: '财务审核',
    },
  ];

  const columns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkflowInstance) => (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 'bold' }}>{text}</span>
          <span style={{ color: '#666', fontSize: '12px' }}>{record.workflowName}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          running: { color: 'processing', text: '运行中' },
          completed: { color: 'success', text: '已完成' },
          suspended: { color: 'warning', text: '已暂停' },
          failed: { color: 'error', text: '执行失败' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: '当前节点',
      dataIndex: 'currentNode',
      key: 'currentNode',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: WorkflowInstance) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>
            查看
          </Button>
          {record.status === 'running' && (
            <Button type="link" icon={<StopOutlined />}>
              暂停
            </Button>
          )}
          {record.status === 'suspended' && (
            <Button type="link" icon={<ReloadOutlined />}>
              恢复
            </Button>
          )}
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="流程实例管理"
      extra={
        <Button type="primary">
          启动新实例
        </Button>
      }
    >
      <Card>
        <ProTable<WorkflowInstance>
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

export default WorkflowInstances; 