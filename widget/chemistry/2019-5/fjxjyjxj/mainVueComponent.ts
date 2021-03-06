import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as firstPoster from './sub_static/UI/fjxj.png';
import * as secondPoster from './sub_static/UI/jxj.png';
@Component

export class MainVueComponent extends Vue {
    coverShow = true;
    active2 = false;
    active1 = false;
    active = false;
    picture1 = firstPoster;
    picture2 = secondPoster;
    tipImg = firstPoster;
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
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        }
    }
    playEvent() {
        this.active = false;
        (ViewController.getInstance().viewHandler as ModelViewHandler).playEvent();
    }
    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as ModelViewHandler).reset();
    }
}

