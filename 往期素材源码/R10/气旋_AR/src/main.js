// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import FastClick from 'fastclick'
import handjs from 'handjs'
window.$ = $;
FastClick.attach(document.body);
window.HANDJS = handjs;
Vue.config.productionTip = false;

import JSONData from '../static/js/json.js';
window.strData1=JSONData[0];
window.strData2=JSONData[1];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

