import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    picked = '1';
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    //按钮改变监听事件
    @Watch('picked')
    onChildChanged1(val: string) {
        if (val === '1') {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.catalyzeEvent1();
        } else if (val === '2') {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.catalyzeEvent2();
        }
    }
    // 重置
    reset() {
        this.picked = '1';
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.catalyzeEvent1();
    }
}

