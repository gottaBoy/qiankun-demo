# 规则引擎前端项目

一个基于 React、TypeScript、Ant Design、UmiJS 和 Pro Components 的完整规则引擎前端项目，支持工作流和 Flowable 流程管理。

## 🚀 技术栈

- **React 18** - 现代化的 React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design 5** - 企业级 UI 设计语言
- **UmiJS 4** - 可插拔的企业级 React 应用框架
- **Pro Components** - 高级组件库
- **React Flow** - 工作流设计器
- **Zustand** - 轻量级状态管理

## 📁 项目结构

```
react-flow/
├── src/
│   ├── pages/                    # 页面组件
│   │   ├── Dashboard/            # 仪表盘
│   │   ├── RuleEngine/          # 规则引擎
│   │   │   ├── Rules/           # 规则管理
│   │   │   ├── Editor/          # 规则编辑器
│   │   │   └── Test/            # 规则测试
│   │   ├── Workflow/            # 工作流
│   │   │   ├── Designer/        # 工作流设计器
│   │   │   ├── Manage/          # 工作流管理
│   │   │   └── Instances/       # 流程实例
│   │   ├── Flowable/            # Flowable 流程
│   │   │   ├── Definitions/     # 流程定义
│   │   │   ├── Tasks/           # 任务管理
│   │   │   └── Monitor/         # 流程监控
│   │   └── System/              # 系统管理
│   │       ├── Users/           # 用户管理
│   │       ├── Roles/           # 角色管理
│   │       └── Permissions/     # 权限管理
│   ├── app.tsx                  # 应用配置
│   └── ...
├── .umirc.ts                    # UmiJS 配置
├── package.json                 # 项目依赖
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目说明
```

## 🎯 核心功能

### 1. 规则引擎
- **规则管理**: 创建、编辑、删除业务规则
- **规则编辑器**: 可视化规则配置界面
- **规则测试**: 在线测试规则执行结果

### 2. 工作流管理
- **工作流设计器**: 基于 React Flow 的可视化流程设计
- **工作流管理**: 流程模板的增删改查
- **流程实例**: 实时监控流程执行状态

### 3. Flowable 集成
- **流程定义**: 管理 BPMN 流程定义
- **任务管理**: 处理待办任务和流程实例
- **流程监控**: 实时监控流程执行情况

### 4. 系统管理
- **用户管理**: 用户信息的增删改查
- **角色管理**: 角色权限配置
- **权限管理**: 细粒度权限控制

## 🛠️ 开发环境

### 环境要求
- Node.js >= 16
- npm >= 8

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📋 功能特性

### 仪表盘
- 系统概览统计
- 实时活动监控
- 快速操作入口

### 规则引擎
- 可视化规则编辑器
- 条件配置和动作设置
- 规则测试和调试
- 规则版本管理

### 工作流设计器
- 拖拽式流程设计
- 节点类型自定义
- 流程验证和部署
- 实时预览

### Flowable 集成
- BPMN 流程定义管理
- 任务分配和处理
- 流程实例监控
- 性能指标统计

### 系统管理
- 用户角色权限管理
- 权限树形结构
- 操作日志记录

## 🎨 UI 特性

- **响应式设计**: 支持桌面端和移动端
- **主题定制**: 可配置的主题色彩
- **国际化**: 支持多语言切换
- **无障碍**: 符合 WCAG 标准

## 🔧 配置说明

### UmiJS 配置
项目使用 UmiJS 4 作为开发框架，配置文件为 `.umirc.ts`：

```typescript
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '规则引擎管理系统',
  },
  // ... 更多配置
});
```

### 路由配置
所有页面路由在 `.umirc.ts` 中配置，支持嵌套路由和权限控制。

## 📦 依赖说明

### 核心依赖
- `@umijs/max`: UmiJS 企业级框架
- `antd`: Ant Design 组件库
- `@ant-design/pro-components`: Pro 组件库
- `@xyflow/react`: React Flow 工作流组件
- `zustand`: 状态管理

### 开发依赖
- `typescript`: TypeScript 支持
- `prettier`: 代码格式化
- `husky`: Git hooks

## 🚀 部署

### 构建
```bash
npm run build
```

### 部署到服务器
构建完成后，将 `dist` 目录部署到 Web 服务器即可。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 在线讨论

---

**注意**: 这是一个演示项目，实际使用时需要配置后端 API 接口和数据库连接。 