import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Divider } from 'antd';
import { SaveOutlined, PlayCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface RuleCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface RuleAction {
  id: string;
  type: string;
  target: string;
  value: string;
}

const RuleEditor: React.FC = () => {
  const [form] = Form.useForm();
  const [conditions, setConditions] = useState<RuleCondition[]>([]);
  const [actions, setActions] = useState<RuleAction[]>([]);

  // 添加条件
  const addCondition = () => {
    const newCondition: RuleCondition = {
      id: `condition-${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
    };
    setConditions([...conditions, newCondition]);
  };

  // 删除条件
  const removeCondition = (id: string) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };

  // 更新条件
  const updateCondition = (id: string, field: string, value: string) => {
    setConditions(conditions.map(condition => 
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  // 添加动作
  const addAction = () => {
    const newAction: RuleAction = {
      id: `action-${Date.now()}`,
      type: 'set_field',
      target: '',
      value: '',
    };
    setActions([...actions, newAction]);
  };

  // 删除动作
  const removeAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  // 更新动作
  const updateAction = (id: string, field: string, value: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, [field]: value } : action
    ));
  };

  // 保存规则
  const saveRule = () => {
    form.validateFields().then((values) => {
      const ruleData = {
        ...values,
        conditions,
        actions,
        createdAt: new Date().toISOString(),
      };
      
      console.log('保存规则数据:', ruleData);
      message.success('规则保存成功');
    });
  };

  // 测试规则
  const testRule = () => {
    message.info('规则测试功能开发中...');
  };

  return (
    <PageContainer
      title="规则编辑器"
      extra={
        <Space>
          <Button icon={<PlayCircleOutlined />} onClick={testRule}>
            测试规则
          </Button>
          <Button icon={<SaveOutlined />} type="primary" onClick={saveRule}>
            保存规则
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="基本信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="规则名称"
                    rules={[{ required: true, message: '请输入规则名称' }]}
                  >
                    <Input placeholder="请输入规则名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="规则分类"
                    rules={[{ required: true, message: '请选择规则分类' }]}
                  >
                    <Select placeholder="请选择规则分类">
                      <Option value="business">业务规则</Option>
                      <Option value="validation">验证规则</Option>
                      <Option value="calculation">计算规则</Option>
                      <Option value="decision">决策规则</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="description"
                label="规则描述"
              >
                <TextArea rows={3} placeholder="请输入规则描述" />
              </Form.Item>
            </Card>
          </Col>

          <Col span={24}>
            <Card 
              title="规则条件" 
              extra={
                <Button icon={<PlusOutlined />} onClick={addCondition}>
                  添加条件
                </Button>
              }
            >
              {conditions.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  暂无条件，请点击"添加条件"按钮
                </div>
              ) : (
                conditions.map((condition, index) => (
                  <div key={condition.id} style={{ marginBottom: 16, padding: 16, border: '1px solid #d9d9d9', borderRadius: 6 }}>
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Input
                          placeholder="字段名"
                          value={condition.field}
                          onChange={(e) => updateCondition(condition.id, 'field', e.target.value)}
                        />
                      </Col>
                      <Col span={4}>
                        <Select
                          value={condition.operator}
                          onChange={(value) => updateCondition(condition.id, 'operator', value)}
                          style={{ width: '100%' }}
                        >
                          <Option value="equals">等于</Option>
                          <Option value="not_equals">不等于</Option>
                          <Option value="greater_than">大于</Option>
                          <Option value="less_than">小于</Option>
                          <Option value="contains">包含</Option>
                          <Option value="not_contains">不包含</Option>
                        </Select>
                      </Col>
                      <Col span={8}>
                        <Input
                          placeholder="值"
                          value={condition.value}
                          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                        />
                      </Col>
                      <Col span={4}>
                        <Button 
                          icon={<DeleteOutlined />} 
                          danger 
                          onClick={() => removeCondition(condition.id)}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))
              )}
            </Card>
          </Col>

          <Col span={24}>
            <Card 
              title="规则动作" 
              extra={
                <Button icon={<PlusOutlined />} onClick={addAction}>
                  添加动作
                </Button>
              }
            >
              {actions.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  暂无动作，请点击"添加动作"按钮
                </div>
              ) : (
                actions.map((action, index) => (
                  <div key={action.id} style={{ marginBottom: 16, padding: 16, border: '1px solid #d9d9d9', borderRadius: 6 }}>
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Select
                          value={action.type}
                          onChange={(value) => updateAction(action.id, 'type', value)}
                          style={{ width: '100%' }}
                        >
                          <Option value="set_field">设置字段</Option>
                          <Option value="call_function">调用函数</Option>
                          <Option value="send_notification">发送通知</Option>
                          <Option value="trigger_workflow">触发工作流</Option>
                        </Select>
                      </Col>
                      <Col span={8}>
                        <Input
                          placeholder="目标字段/函数名"
                          value={action.target}
                          onChange={(e) => updateAction(action.id, 'target', e.target.value)}
                        />
                      </Col>
                      <Col span={6}>
                        <Input
                          placeholder="值"
                          value={action.value}
                          onChange={(e) => updateAction(action.id, 'value', e.target.value)}
                        />
                      </Col>
                      <Col span={4}>
                        <Button 
                          icon={<DeleteOutlined />} 
                          danger 
                          onClick={() => removeAction(action.id)}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))
              )}
            </Card>
          </Col>

          <Col span={24}>
            <Card title="高级设置">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="priority" label="优先级">
                    <Select placeholder="请选择优先级">
                      <Option value="high">高</Option>
                      <Option value="medium">中</Option>
                      <Option value="low">低</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="status" label="状态">
                    <Select placeholder="请选择状态">
                      <Option value="active">启用</Option>
                      <Option value="inactive">禁用</Option>
                      <Option value="draft">草稿</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="version" label="版本">
                    <Input placeholder="版本号" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </PageContainer>
  );
};

export default RuleEditor; 