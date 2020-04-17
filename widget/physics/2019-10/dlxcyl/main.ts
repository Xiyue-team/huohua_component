// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './view.vue';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
Vue.config.productionTip = false;
/* tslint:disable:no-unused-expression */
BrowserUtil.domReady(() => {
    new Vue({
        el: '#app',
        template: '<App/>',
        components: { App }
    });
});
/* tslint:enable:no-unused-expression */
