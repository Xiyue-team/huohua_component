// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import handjs from 'handjs'
import $ from 'jquery'
window.$ = $;
window.HANDJS = handjs;
Vue.config.productionTip = false;
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
