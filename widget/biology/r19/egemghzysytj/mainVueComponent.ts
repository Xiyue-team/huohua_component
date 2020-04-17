import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {EgemViewHandler} from './services/EgemViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as img1 from './sub_static/UI/bg1.png';
import * as img2 from './sub_static/UI/bg2.png';
import * as img3 from './sub_static/UI/tip1.png';
import * as img4 from './sub_static/UI/tip2.png';

@Component

export class MainVueComponent extends Vue {
    bg = '';
    tip = '';
    active1 = false;
    active2 = false;
    timer1: any;
    timer2: any;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new EgemViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        this.bg = img1 as any;
        this.tip = img3 as any;
        ViewController.getInstance().domReady();
    }

    changeEvent(val: any) {
        if (val === 0) {
            if (this.active1) {
                return;
            }
            const thiz = this;
            thiz.active1 = !thiz.active1;
            thiz.active2 = false;
            thiz.bg = img1 as any;
            thiz.tip = '';
            (ViewController.getInstance().viewHandler as EgemViewHandler).Photosynthesis.parallelLightEvent();
            document.getElementById('title').style.color = 'white';
        }
        if (val === 1) {
            if (this.active2) {
                return;
            }
            const thiz = this;
            thiz.active2 = !thiz.active2;
            thiz.active1 = false;
            thiz.bg = img2 as any;
            thiz.tip = img4 as any;
            (ViewController.getInstance().viewHandler as EgemViewHandler).Photosynthesis.normalLightEvent();
            document.getElementById('title').style.color = 'black';
        }
    }

    // 重置
    reset() {
        this.bg = img1 as any;
        this.tip = img3 as any;
        this.active1 = false;
        this.active2 = false;
        document.getElementById('title').style.color = 'white';
        (ViewController.getInstance().viewHandler as EgemViewHandler).Photosynthesis.reset();
    }
}

