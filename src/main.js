// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VueLazyload from 'vue-lazyload'
import {Button} from 'mint-ui'

import loading from './common/image/loading.gif'
import './mock/mockServer'  //加载mockServer就行
import './filters'  //加载过滤器

//注册成标签（全局注册）
Vue.component(Button.name, Button);
Vue.config.productionTip = false

Vue.use(VueLazyload, {//自定义了一个指令：lazy
  preLoad: 1.3,   //预加载的宽高比
  error: 'dist/error.png',//图片加载失败时使用的图片源
  loading: loading,//图片加载的路径
  attempt: 1//尝试加载次数
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
