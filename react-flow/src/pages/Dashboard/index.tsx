import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import { 
  DashboardOutlined, 
  SettingOutlined, 
  DeploymentUnitOutlined, 
  ApiOutlined
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // 统计数据
  const statistics = [
    {
      title: '规则总数',
      value: 156,
      icon: <SettingOutlined />,
      color: '#1890ff',
    },
    {
      title: '工作流总数',
      value: 23,
      icon: <DeploymentUnitOutlined />,
      color: '#52c41a',
    },
    {
      title: '流程实例',
      value: 89,
      icon: <ApiOutlined />,
      color: '#faad14',
    },
    {
      title: '活跃任务',
      value: 12,
      icon: <DashboardOutlined />,
      color: '#f5222d',
    },
  ];

  return (
    <PageContainer
      title="仪表盘"
      extra={
        <Space>
          <Button type="primary">创建规则</Button>
          <Button>设计工作流</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {/* 统计卡片 */}
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}

        {/* 快速操作 */}
        <Col xs={24}>
          <Card title="快速操作">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card size="small" hoverable>
                  <div style={{ textAlign: 'center' }}>
                    <SettingOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                    <div style={{ marginTop: 8 }}>创建规则</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card size="small" hoverable>
                  <div style={{ textAlign: 'center' }}>
                    <DeploymentUnitOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                    <div style={{ marginTop: 8 }}>设计工作流</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card size="small" hoverable>
                  <div style={{ textAlign: 'center' }}>
                    <ApiOutlined style={{ fontSize: 24, color: '#faad14' }} />
                    <div style={{ marginTop: 8 }}>流程监控</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card size="small" hoverable>
                  <div style={{ textAlign: 'center' }}>
                    <DashboardOutlined style={{ fontSize: 24, color: '#f5222d' }} />
                    <div style={{ marginTop: 8 }}>任务管理</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard; 