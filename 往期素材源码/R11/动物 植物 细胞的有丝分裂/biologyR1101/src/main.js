// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import babylonjs from 'babylonjs'
import $ from 'jquery'
import handjs from 'handjs'
window.$ = $;
window.BABYLON = babylonjs;
window.HANDJS = handjs;
Vue.config.productionTip = false;
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
