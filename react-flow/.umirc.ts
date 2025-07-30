import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '规则引擎管理系统',
    locale: true,
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '仪表盘',
      path: '/dashboard',
      component: './Dashboard',
      icon: 'DashboardOutlined',
    },
    {
      name: '规则引擎',
      path: '/rule-engine',
      icon: 'SettingOutlined',
      routes: [
        {
          name: '规则管理',
          path: '/rule-engine/rules',
          component: './RuleEngine/Rules',
        },
        {
          name: '规则编辑器',
          path: '/rule-engine/editor',
          component: './RuleEngine/Editor',
        },
        {
          name: '规则测试',
          path: '/rule-engine/test',
          component: './RuleEngine/Test',
        },
      ],
    },
    {
      name: '工作流',
      path: '/workflow',
      icon: 'DeploymentUnitOutlined',
      routes: [
        {
          name: '工作流设计器',
          path: '/workflow/designer',
          component: './Workflow/Designer',
        },
        {
          name: '工作流管理',
          path: '/workflow/manage',
          component: './Workflow/Manage',
        },
        {
          name: '流程实例',
          path: '/workflow/instances',
          component: './Workflow/Instances',
        },
      ],
    },
    {
      name: 'Flowable',
      path: '/flowable',
      icon: 'ApiOutlined',
      routes: [
        {
          name: '流程定义',
          path: '/flowable/definitions',
          component: './Flowable/Definitions',
        },
        {
          name: '任务管理',
          path: '/flowable/tasks',
          component: './Flowable/Tasks',
        },
        {
          name: '流程监控',
          path: '/flowable/monitor',
          component: './Flowable/Monitor',
        },
      ],
    },
    {
      name: '系统管理',
      path: '/system',
      icon: 'ToolOutlined',
      routes: [
        {
          name: '用户管理',
          path: '/system/users',
          component: './System/Users',
        },
        {
          name: '角色管理',
          path: '/system/roles',
          component: './System/Roles',
        },
        {
          name: '权限管理',
          path: '/system/permissions',
          component: './System/Permissions',
        },
      ],
    },
  ],
  npmClient: 'npm',
  tailwindcss: {},
  esbuildMinifyIIFE: true,
  hash: true,
  history: {
    type: 'browser',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseSeparator: '-',
  },
  theme: {
    '@primary-color': '#1890ff',
  },
}); 