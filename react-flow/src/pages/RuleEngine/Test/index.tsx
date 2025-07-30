import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Divider, Result } from 'antd';
import { PlayCircleOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const RuleTest: React.FC = () => {
  const [form] = Form.useForm();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 测试规则
  const testRule = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      
      // 模拟API调用
      setTimeout(() => {
        const mockResult = {
          success: true,
          ruleName: '用户权限验证规则',
          inputData: values.inputData,
          outputData: {
            hasPermission: true,
            role: 'admin',
            permissions: ['read', 'write', 'delete']
          },
          executionTime: '15ms',
          matchedRules: ['rule-1', 'rule-2'],
          executionPath: [
            { step: 1, rule: '权限检查', result: '通过' },
            { step: 2, rule: '角色验证', result: '通过' },
            { step: 3, rule: '资源访问', result: '允许' }
          ]
        };
        
        setTestResult(mockResult);
        setLoading(false);
        message.success('规则测试完成');
      }, 2000);
    });
  };

  // 清空结果
  const clearResult = () => {
    setTestResult(null);
    form.resetFields();
  };

  return (
    <PageContainer
      title="规则测试"
      extra={
        <Space>
          <Button icon={<ClearOutlined />} onClick={clearResult}>
            清空
          </Button>
          <Button 
            icon={<PlayCircleOutlined />} 
            type="primary" 
            onClick={testRule}
            loading={loading}
          >
            执行测试
          </Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="测试输入">
            <Form form={form} layout="vertical">
              <Form.Item
                name="ruleName"
                label="选择规则"
                rules={[{ required: true, message: '请选择要测试的规则' }]}
              >
                <Select placeholder="请选择规则">
                  <Option value="user-permission">用户权限验证规则</Option>
                  <Option value="order-calculation">订单金额计算规则</Option>
                  <Option value="inventory-check">库存检查规则</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="inputData"
                label="输入数据 (JSON格式)"
                rules={[{ required: true, message: '请输入测试数据' }]}
              >
                <TextArea 
                  rows={10} 
                  placeholder={`请输入JSON格式的测试数据，例如：
{
  "userId": "user123",
  "resource": "order:read",
  "context": {
    "ip": "192.168.1.1",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="测试结果">
            {testResult ? (
              <div>
                <Result
                  status={testResult.success ? 'success' : 'error'}
                  title={testResult.success ? '测试通过' : '测试失败'}
                  subTitle={`规则: ${testResult.ruleName}`}
                />
                
                <Divider />
                
                <div style={{ marginBottom: 16 }}>
                  <h4>输入数据:</h4>
                  <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: 12, 
                    borderRadius: 4,
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(testResult.inputData, null, 2)}
                  </pre>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <h4>输出结果:</h4>
                  <pre style={{ 
                    backgroundColor: '#f0f9ff', 
                    padding: 12, 
                    borderRadius: 4,
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(testResult.outputData, null, 2)}
                  </pre>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <h4>执行信息:</h4>
                  <p><strong>执行时间:</strong> {testResult.executionTime}</p>
                  <p><strong>匹配规则:</strong> {testResult.matchedRules.join(', ')}</p>
                </div>

                <div>
                  <h4>执行路径:</h4>
                  {testResult.executionPath.map((step: any, index: number) => (
                    <div key={index} style={{ 
                      marginBottom: 8, 
                      padding: 8, 
                      backgroundColor: '#f9f9f9',
                      borderRadius: 4
                    }}>
                      <span style={{ fontWeight: 'bold' }}>步骤 {step.step}:</span> {step.rule} - {step.result}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                padding: '40px 20px' 
              }}>
                <PlayCircleOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <p>请选择规则并输入测试数据，然后点击"执行测试"</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default RuleTest; 