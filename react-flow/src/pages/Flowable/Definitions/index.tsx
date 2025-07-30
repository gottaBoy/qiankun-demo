import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Button, Space, Tag, Modal, message, Upload, Form, Input } from 'antd';
import { 
  PlusOutlined, 
  UploadOutlined, 
  PlayCircleOutlined, 
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';

interface ProcessDefinition {
  id: string;
  key: string;
  name: string;
  version: string;
  category: string;
  deploymentId: string;
  resourceName: string;
  diagramResourceName: string;
  suspended: boolean;
  tenantId: string;
  deploymentTime: string;
}

const FlowableDefinitions: React.FC = () => {
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 模拟数据
  const mockData: ProcessDefinition[] = [
    {
      id: 'process-1',
      key: 'order-approval',
      name: '订单审批流程',
      version: '1.0.0',
      category: 'business',
      deploymentId: 'deploy-1',
      resourceName: 'order-approval.bpmn20.xml',
      diagramResourceName: 'order-approval.png',
      suspended: false,
      tenantId: 'tenant-1',
      deploymentTime: '2024-01-15 10:30:00',
    },
    {
      id: 'process-2',
      key: 'user-onboarding',
      name: '用户入职流程',
      version: '2.1.0',
      category: 'hr',
      deploymentId: 'deploy-2',
      resourceName: 'user-onboarding.bpmn20.xml',
      diagramResourceName: 'user-onboarding.png',
      suspended: false,
      tenantId: 'tenant-1',
      deploymentTime: '2024-01-14 15:20:00',
    },
    {
      id: 'process-3',
      key: 'expense-claim',
      name: '费用报销流程',
      version: '1.5.0',
      category: 'finance',
      deploymentId: 'deploy-3',
      resourceName: 'expense-claim.bpmn20.xml',
      diagramResourceName: 'expense-claim.png',
      suspended: true,
      tenantId: 'tenant-1',
      deploymentTime: '2024-01-13 09:15:00',
    },
  ];

  const columns = [
    {
      title: '流程名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ProcessDefinition) => (
        <Space>
          <span>{text}</span>
          <Tag color="blue">{record.key}</Tag>
        </Space>
      ),
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (text: string) => <Tag color="green">v{text}</Tag>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => {
        const colorMap: { [key: string]: string } = {
          business: 'blue',
          hr: 'purple',
          finance: 'orange',
        };
        return <Tag color={colorMap[text] || 'default'}>{text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'suspended',
      key: 'suspended',
      render: (suspended: boolean) => (
        <Tag color={suspended ? 'red' : 'green'}>
          {suspended ? '已挂起' : '运行中'}
        </Tag>
      ),
    },
    {
      title: '部署时间',
      dataIndex: 'deploymentTime',
      key: 'deploymentTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: ProcessDefinition) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => viewProcess(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            icon={<PlayCircleOutlined />}
            onClick={() => startProcess(record)}
            disabled={record.suspended}
          >
            启动
          </Button>
          <Button 
            type="link" 
            icon={<DownloadOutlined />}
            onClick={() => downloadProcess(record)}
          >
            下载
          </Button>
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteProcess(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 查看流程
  const viewProcess = (record: ProcessDefinition) => {
    Modal.info({
      title: '流程详情',
      width: 600,
      content: (
        <div>
          <p><strong>流程ID:</strong> {record.id}</p>
          <p><strong>流程Key:</strong> {record.key}</p>
          <p><strong>流程名称:</strong> {record.name}</p>
          <p><strong>版本:</strong> {record.version}</p>
          <p><strong>分类:</strong> {record.category}</p>
          <p><strong>部署ID:</strong> {record.deploymentId}</p>
          <p><strong>资源文件:</strong> {record.resourceName}</p>
          <p><strong>流程图:</strong> {record.diagramResourceName}</p>
          <p><strong>状态:</strong> {record.suspended ? '已挂起' : '运行中'}</p>
          <p><strong>部署时间:</strong> {record.deploymentTime}</p>
        </div>
      ),
    });
  };

  // 启动流程
  const startProcess = (record: ProcessDefinition) => {
    Modal.confirm({
      title: '启动流程',
      content: `确定要启动流程 "${record.name}" 吗？`,
      onOk: () => {
        message.success(`流程 "${record.name}" 启动成功`);
      },
    });
  };

  // 下载流程
  const downloadProcess = (record: ProcessDefinition) => {
    message.success(`开始下载流程文件: ${record.resourceName}`);
  };

  // 删除流程
  const deleteProcess = (record: ProcessDefinition) => {
    Modal.confirm({
      title: '删除流程',
      content: `确定要删除流程 "${record.name}" 吗？此操作不可恢复！`,
      okText: '确定删除',
      okType: 'danger',
      onOk: () => {
        message.success(`流程 "${record.name}" 删除成功`);
      },
    });
  };

  // 上传流程文件
  const uploadProcess = () => {
    form.validateFields().then((values) => {
      console.log('上传流程文件:', values);
      message.success('流程文件上传成功');
      setUploadModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <PageContainer
      title="流程定义管理"
      extra={
        <Space>
          <Button 
            icon={<UploadOutlined />} 
            onClick={() => setUploadModalVisible(true)}
          >
            上传流程
          </Button>
          <Button 
            icon={<PlusOutlined />} 
            type="primary"
          >
            创建流程
          </Button>
        </Space>
      }
    >
      <Card>
        <ProTable<ProcessDefinition>
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          search={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          toolBarRender={false}
        />
      </Card>

      {/* 上传流程文件模态框 */}
      <Modal
        title="上传流程文件"
        open={uploadModalVisible}
        onOk={uploadProcess}
        onCancel={() => {
          setUploadModalVisible(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="流程名称"
            rules={[{ required: true, message: '请输入流程名称' }]}
          >
            <Input placeholder="请输入流程名称" />
          </Form.Item>
          <Form.Item
            name="category"
            label="流程分类"
            rules={[{ required: true, message: '请选择流程分类' }]}
          >
            <Input placeholder="请输入流程分类" />
          </Form.Item>
          <Form.Item
            name="file"
            label="流程文件"
            rules={[{ required: true, message: '请选择流程文件' }]}
          >
            <Upload
              beforeUpload={() => false}
              accept=".bpmn,.xml"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default FlowableDefinitions; 