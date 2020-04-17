import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {XhxViewHandler} from './services/XhxViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as img1 from './sub_static/UI/tyx.jpg';
import * as img2 from './sub_static/UI/2.png';
import * as img3 from './sub_static/UI/3.png';
import * as img4 from './sub_static/UI/4.png';
import * as img5 from './sub_static/UI/5.png';
@Component
export class MainVueComponent extends Vue {
    personImg = "";
    show = true;
    active = false;
    active1 = false;
    active2 = false;
    active3 = false;
    active4 = false;
    active5 = false;
    picture1 = img1;
    picture2 = img2;
    picture3 = img3;
    picture4 = img4;
    picture5 = img5;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new XhxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    getEvent(index: number) {
        if (index === 1) {
            (ViewController.getInstance().viewHandler as XhxViewHandler).getEvent1(1);
        } else if (index === 2) {
            (ViewController.getInstance().viewHandler as XhxViewHandler).getEvent1(2);
        } else if (index === 3) {
            (ViewController.getInstance().viewHandler as XhxViewHandler).getEvent1(3);
        } else if (index === 4) {
            (ViewController.getInstance().viewHandler as XhxViewHandler).getEvent1(4);
        } else if (index === 5) {
            (ViewController.getInstance().viewHandler as XhxViewHandler).getEvent1(5);
        }
    }
    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as XhxViewHandler).reset();
    }



}

