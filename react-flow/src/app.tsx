import { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// 请求配置
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    errorHandler: (error: any) => {
      message.error(error.message);
    },
    errorThrower: () => {},
  },
  requestInterceptors: [
    (url: string, options: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
};

// 运行时配置
export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    locale: false,
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    title: '规则引擎管理系统',
    pwa: false,
    token: {
      header: {
        colorBgContainer: '#292f33',
        colorText: '#fff',
      },
      sider: {
        colorMenuBackground: '#001529',
        colorMenuItemDivider: '#002140',
        colorTextMenu: '#fff',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemSelected: '#1890ff',
      },
    },
  };
}; 