import { createApp } from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './public-path';
// import routes from './router';
// import store from './store';

let app: any;
// let routes = {};
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App)
  // .use(routes)
  .mount('#app')
} else {
  renderWithQiankun({
    mount(props) {
      app = createApp(App);
      app.mount(props!.container!.querySelector('#app'))
    },
    bootstrap() {
      console.log('vue app bootstrap');
    },
    update() {
      console.log('vueappupdate');
    },
    unmount() {
      console.log('vue app unmount');
      app?.unmount();
    }
  })
}