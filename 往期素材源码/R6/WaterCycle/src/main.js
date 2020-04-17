import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import FastClick from 'fastclick'
import handjs from 'handjs'
window.$ = $;
FastClick.attach(document.body);
window.HANDJS = handjs;
Vue.config.productionTip = false;


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

