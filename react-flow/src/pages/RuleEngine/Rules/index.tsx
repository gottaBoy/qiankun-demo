import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Rule {
  id: string;
  name: string;
  category: string;
  description: string;
  status: boolean;
  priority: string;
  version: string;
  creator: string;
  createTime: string;
  updateTime: string;
}

const Rules: React.FC = () => {
  // 模拟数据
  const mockData: Rule[] = [
    {
      id: 'rule-1',
      name: '用户权限验证规则',
      category: 'business',
      description: '验证用户是否有权限访问特定资源',
      status: true,
      priority: 'high',
      version: '1.0.0',
      creator: '张三',
      createTime: '2024-01-15 10:30:00',
      updateTime: '2024-01-15 10:30:00',
    },
    {
      id: 'rule-2',
      name: '订单金额计算规则',
      category: 'calculation',
      description: '根据商品数量和折扣计算订单总金额',
      status: true,
      priority: 'medium',
      version: '2.1.0',
      creator: '李四',
      createTime: '2024-01-14 15:20:00',
      updateTime: '2024-01-14 15:20:00',
    },
  ];

  const handleStatusChange = (checked: boolean) => {
    message.success(`规则状态已${checked ? '启用' : '禁用'}`);
  };

  const handleCreateRule = () => {
    message.info('创建规则功能');
  };

  const handleEditRule = (record: Rule) => {
    message.info(`编辑规则: ${record.name}`);
  };

  const handleDeleteRule = (record: Rule) => {
    message.info(`删除规则: ${record.name}`);
  };

  return (
    <PageContainer
      title="规则管理"
      extra={
        <Button icon={<PlusOutlined />} type="primary" onClick={handleCreateRule}>
          创建规则
        </Button>
      }
    >
      <Card>
        <div style={{ padding: '20px' }}>
          <h3>规则列表</h3>
          <div style={{ marginTop: '16px' }}>
            {mockData.map((rule) => (
              <div
                key={rule.id}
                style={{
                  padding: '16px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  backgroundColor: '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '8px' }}>{rule.name}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{rule.description}</p>
                    <div style={{ marginTop: '8px' }}>
                      <Tag color="blue">{rule.category}</Tag>
                      <Tag color="green">v{rule.version}</Tag>
                      <Tag color={rule.priority === 'high' ? 'red' : 'orange'}>{rule.priority}</Tag>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch 
                      checked={rule.status} 
                      onChange={handleStatusChange}
                    />
                    <Button 
                      type="link" 
                      icon={<EditOutlined />}
                      onClick={() => handleEditRule(rule)}
                    >
                      编辑
                    </Button>
                    <Button 
                      type="link" 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteRule(rule)}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Rules; 