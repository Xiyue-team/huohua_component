// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import $ from 'jquery'
import FastClick from 'fastclick'
import handjs from 'handjs'
window.$ = $;
FastClick.attach(document.body);
window.HANDJS = handjs;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

