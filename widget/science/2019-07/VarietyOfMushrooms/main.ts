import Vue from 'vue';
import App from './main.vue';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
BrowserUtil.domReady(() => {
    new Vue({
        el: '#app',
        template: '<App/>',
        components: { App }
    });

});
