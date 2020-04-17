import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as textImg from './sub_static/UI/textImg.png';
import * as tipImg from './sub_static/UI/tipImg.png';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    //创建按钮是否激活的变量
    active1 = false;
    // 控制反应结束状态图片的显示
    show = false;
    //遮罩的宽度
    widthNumber = 530;
    // 提示图片变量
    textImg = textImg;
    tipImg = tipImg;
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
    getEvent(index: number) {
        if (index === 1) {
            if (this.active1 === true) {
                return;
            }
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        }
    }
}

