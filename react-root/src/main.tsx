import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { initGlobalState, registerMicroApps, start } from "qiankun";

// 初始化 state
// const actions: MicroAppStateActions = initGlobalState(state);
// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log(state, prev);
// });
// actions.setGlobalState(state);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// 注册子应用
registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3001',
    container: '#subapp-root',
    activeRule: '/react', // 精确匹配
    // props: {
    //   // 告诉 Qiankun 这个子应用是 ES Module
    //   isModule: true,
    // },
  },
  {
    name: 'vue-app',
    entry: '//localhost:3002',
    container: '#subapp-root',
    activeRule: '/vue',
  },
  {
    name: 'html-app',
    entry: '//localhost:3003',
    container: '#subapp-root',
    activeRule: '/phtml',
  },
], {
  beforeLoad: [async app => console.log('before load', app.name)],
  beforeMount: [async app => console.log('before mount', app.name)],
  afterMount: [async app => console.log('after mount', app.name)],
  beforeUnmount: [async app => console.log('before unmount', app.name)],
  afterUnmount: [async app => console.log('after unmount', app.name)]
})

// 启动 qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true, // 开启实验性样式隔离
  },
});