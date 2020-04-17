// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import $ from 'jquery'
window.$ = $;
Vue.config.productionTip = false;
fastclick.attach(document.body);
document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
