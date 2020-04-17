import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewHandler} from './services/ViewHandler';
import { Watch } from 'vue-property-decorator';


@Component
export class ViewModel extends Vue {
    title = ''; //标题
    active = 2;
    /**
     * 渲染页面
     */
    created() {
        this.title = (window as any).env.browserInfo.lang.title;

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

    
    @Watch('active')
    watchData(data: number) {
        (ViewController.getInstance().viewHandler as ViewHandler).hideCategory(data);
    }


}

