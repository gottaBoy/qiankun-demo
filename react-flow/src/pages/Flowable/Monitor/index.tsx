import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Button } from 'antd';
import { 
  PlayCircleOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  BarChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';

interface ProcessMetrics {
  totalInstances: number;
  runningInstances: number;
  completedInstances: number;
  failedInstances: number;
  avgExecutionTime: string;
  successRate: number;
}

interface ProcessActivity {
  id: string;
  processName: string;
  status: string;
  startTime: string;
  endTime?: string;
  duration: string;
  assignee: string;
  progress: number;
}

const FlowableMonitor: React.FC = () => {
  // 模拟统计数据
  const metrics: ProcessMetrics = {
    totalInstances: 156,
    runningInstances: 23,
    completedInstances: 120,
    failedInstances: 13,
    avgExecutionTime: '2小时30分钟',
    successRate: 92.3,
  };

  // 模拟活动数据
  const activities: ProcessActivity[] = [
    {
      id: '1',
      processName: '订单审批流程',
      status: 'running',
      startTime: '2024-01-15 10:30:00',
      duration: '1小时20分钟',
      assignee: '张三',
      progress: 65,
    },
    {
      id: '2',
      processName: '用户入职流程',
      status: 'completed',
      startTime: '2024-01-15 09:15:00',
      endTime: '2024-01-15 11:45:00',
      duration: '2小时30分钟',
      assignee: '李四',
      progress: 100,
    },
    {
      id: '3',
      processName: '费用报销流程',
      status: 'failed',
      startTime: '2024-01-15 08:00:00',
      endTime: '2024-01-15 09:30:00',
      duration: '1小时30分钟',
      assignee: '王五',
      progress: 45,
    },
  ];

  const columns = [
    {
      title: '流程名称',
      dataIndex: 'processName',
      key: 'processName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          running: { color: 'processing', text: '运行中', icon: <ClockCircleOutlined /> },
          completed: { color: 'success', text: '已完成', icon: <CheckCircleOutlined /> },
          failed: { color: 'error', text: '执行失败', icon: <ExclamationCircleOutlined /> },
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
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
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
      render: () => (
        <Space>
          <a>查看详情</a>
          <a>暂停</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="流程监控"
      extra={
        <Space>
          <Button icon={<BarChartOutlined />}>生成报告</Button>
          <Button icon={<LineChartOutlined />} type="primary">实时监控</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {/* 统计卡片 */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总实例数"
              value={metrics.totalInstances}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="运行中"
              value={metrics.runningInstances}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成"
              value={metrics.completedInstances}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="执行失败"
              value={metrics.failedInstances}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>

        {/* 性能指标 */}
        <Col xs={24} lg={12}>
          <Card title="性能指标">
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>成功率</span>
                    <span>{metrics.successRate}%</span>
                  </div>
                  <Progress percent={metrics.successRate} status="active" />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>平均执行时间</span>
                    <span>{metrics.avgExecutionTime}</span>
                  </div>
                  <Progress percent={75} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 实时活动 */}
        <Col xs={24} lg={12}>
          <Card title="实时活动" extra={<a href="#">查看全部</a>}>
            <Table
              columns={columns}
              dataSource={activities}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* 流程分布 */}
        <Col xs={24}>
          <Card title="流程分布">
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="订单审批"
                    value={45}
                    suffix="个实例"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="用户入职"
                    value={32}
                    suffix="个实例"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="费用报销"
                    value={28}
                    suffix="个实例"
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default FlowableMonitor; 