import React, { useState, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Button, Space, Tooltip, message, Modal, Form, Input, Select } from 'antd';
import { 
  PlusOutlined, 
  SaveOutlined, 
  PlayCircleOutlined, 
  SettingOutlined,
  DeleteOutlined
} from '@ant-design/icons';

// 简化的节点接口
interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description: string;
    type: string;
  };
}

// 简化的边接口
interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

const WorkflowDesigner: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 添加节点
  const addNode = () => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: 100, y: 100 },
      data: { 
        label: '新节点', 
        description: '点击编辑节点信息',
        type: 'task'
      },
    };
    setNodes([...nodes, newNode]);
    message.success('节点添加成功');
  };

  // 保存工作流
  const saveWorkflow = () => {
    const workflowData = {
      nodes,
      edges,
      metadata: {
        name: '工作流设计',
        description: '工作流描述',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
      }
    };
    
    console.log('保存工作流数据:', workflowData);
    message.success('工作流保存成功');
  };

  // 部署工作流
  const deployWorkflow = () => {
    Modal.confirm({
      title: '确认部署',
      content: '确定要部署这个工作流吗？',
      onOk: () => {
        message.success('工作流部署成功');
      },
    });
  };

  // 编辑节点
  const editNode = () => {
    if (selectedNode) {
      form.setFieldsValue({
        label: selectedNode.data.label,
        description: selectedNode.data.description,
        type: selectedNode.data.type,
      });
      setIsModalVisible(true);
    } else {
      message.warning('请先选择一个节点');
    }
  };

  // 删除节点
  const deleteNode = () => {
    if (selectedNode) {
      setNodes(nodes.filter((node) => node.id !== selectedNode.id));
      setEdges(edges.filter((edge) => 
        edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
      message.success('节点删除成功');
    } else {
      message.warning('请先选择一个节点');
    }
  };

  // 保存节点编辑
  const handleNodeEdit = () => {
    form.validateFields().then((values) => {
      if (selectedNode) {
        setNodes(nodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, ...values } }
            : node
        ));
        setIsModalVisible(false);
        setSelectedNode(null);
        message.success('节点更新成功');
      }
    });
  };

  // 选择节点
  const selectNode = (node: WorkflowNode) => {
    setSelectedNode(node);
  };

  return (
    <PageContainer
      title="工作流设计器"
      extra={
        <Space>
          <Tooltip title="添加节点">
            <Button icon={<PlusOutlined />} onClick={addNode}>
              添加节点
            </Button>
          </Tooltip>
          <Tooltip title="编辑节点">
            <Button 
              icon={<SettingOutlined />} 
              onClick={editNode}
              disabled={!selectedNode}
            >
              编辑节点
            </Button>
          </Tooltip>
          <Tooltip title="删除节点">
            <Button 
              icon={<DeleteOutlined />} 
              onClick={deleteNode}
              disabled={!selectedNode}
              danger
            >
              删除节点
            </Button>
          </Tooltip>
          <Tooltip title="保存工作流">
            <Button icon={<SaveOutlined />} onClick={saveWorkflow} type="primary">
              保存
            </Button>
          </Tooltip>
          <Tooltip title="部署工作流">
            <Button icon={<PlayCircleOutlined />} onClick={deployWorkflow} type="primary">
              部署
            </Button>
          </Tooltip>
        </Space>
      }
    >
      <Card style={{ height: 'calc(100vh - 200px)' }}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#f5f5f5',
          position: 'relative',
          overflow: 'auto'
        }}>
          {nodes.length === 0 ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: '#999',
              fontSize: '16px'
            }}>
              点击"添加节点"开始设计工作流
            </div>
          ) : (
            <div style={{ padding: '20px', minHeight: '100%' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3>工作流节点 ({nodes.length})</h3>
                <p style={{ color: '#666' }}>点击节点进行编辑，拖拽连接节点</p>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => selectNode(node)}
                    style={{
                      padding: '16px',
                      backgroundColor: selectedNode?.id === node.id ? '#e6f7ff' : '#fff',
                      border: selectedNode?.id === node.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      {node.data.label}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      {node.data.description}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      <span style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '2px 6px', 
                        borderRadius: '4px' 
                      }}>
                        {node.data.type}
                      </span>
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '8px', 
                      right: '8px', 
                      fontSize: '10px', 
                      color: '#999' 
                    }}>
                      ID: {node.id.slice(-4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 节点编辑模态框 */}
      <Modal
        title="编辑节点"
        open={isModalVisible}
        onOk={handleNodeEdit}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedNode(null);
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="label"
            label="节点名称"
            rules={[{ required: true, message: '请输入节点名称' }]}
          >
            <Input placeholder="请输入节点名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="节点描述"
          >
            <Input.TextArea placeholder="请输入节点描述" />
          </Form.Item>
          <Form.Item
            name="type"
            label="节点类型"
            rules={[{ required: true, message: '请选择节点类型' }]}
          >
            <Select placeholder="请选择节点类型">
              <Select.Option value="task">任务节点</Select.Option>
              <Select.Option value="decision">决策节点</Select.Option>
              <Select.Option value="start">开始节点</Select.Option>
              <Select.Option value="end">结束节点</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default WorkflowDesigner; 