import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import './public-path.js';

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

// 独立运行时渲染
const render = (props: any) => {
  const { container } = props;
  const root = createRoot(
    container ? container.querySelector('#root')! : document.getElementById('root')!
  );
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode> 
    );
};
 
// 独立运行（非 qiankun 环境）
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

renderWithQiankun({
  async bootstrap() {
    console.log('[React18SubApp] Bootstraped');
  },
  async mount(props) {
    console.log('[React18SubApp] Props from main framework', props);
    // props.onGlobalStateChange((state, prev) => {
    //   // state: 变更后的状态; prev 变更前的状态
    //   console.log(state, prev);
    // });
    // props.setGlobalState(state);
    render(props);
  },
  async update(props) {
    console.log('[React18SubApp] Props update', props);
  },
  async unmount(props) {
    console.log('[React18SubApp] Unmount');
    const { container } = props;
    const root = container ? container.querySelector('#root') : document.getElementById('root');
    if (root) {
      // React 18 需手动销毁根节点
      const rootInstance = createRoot(root as HTMLElement);
      rootInstance.unmount();
      (root as HTMLElement).innerHTML = ''; // 清理 DOM
    }
  }
});