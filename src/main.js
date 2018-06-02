// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
// components
import cover from './components/cover/index';
import home from './components/home/index';
// js
import util from './assets/js/util';
import wxconf from './assets/js/wxconfig';
// css
import 'animate.css';
Vue.use(VueRouter);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  beforeCreate(){
    util.asyncRootPx();
    document.body.addEventListener('touchstart', e => {
      e.preventDefault();
    });
  },
  router: new VueRouter({
    routes: [
      { path: '/', redirect: '/cover' },
      { path: '/cover', name: 'cover', component: cover, meta: { keepAlive: true } },
      { path: '/home', name: 'home', component: home, meta: { keepAlive: true } }
    ]
  }),
  created(){
    const self = this;
    wxconf.respWxConfig(resp => {
      const SUCCESS = 0, FAIL = 1;
      let extendApi = [];
      resp.status == FAIL ? 
      console.error('wx config fail') : 
      wxconf.wxConfig(resp.data, extendApi);

      wxconf.share();
    });
  },
  render: fn => fn(App)
}).$mount('#app');
