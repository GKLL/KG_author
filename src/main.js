/**
*  @description： 作者端入口文件
*  @author： zhangchenle
*  @data:  2018.6.1
*/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/style/reset.css'

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'
// 全局引入封装后得axios方法
import myaxios from './assets/js/request'
import common from './assets/js/common'

// 开发环境使用默认方式引入，线上环境使用cdn
if (process.env.NODE_ENV === 'development') {
  require('element-ui/lib/theme-chalk/index.css')
}

Vue.use(ELEMENT).use(myaxios).use(common)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
