import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewHandler} from './services/ViewHandler';
import { Watch } from 'vue-property-decorator';


@Component
export class ViewModel extends Vue {
    title = ''; //标题

    /**
     * 渲染页面
     */
    created() {
        this.title = window.env.browserInfo.lang.title;

        ViewController.getInstance(new ViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();

    }
    /**
     * 渲染页面完成
     */
    mounted() {

        ViewController.getInstance().domReady();
        ViewController.getInstance().hideLoading();
    }



}

