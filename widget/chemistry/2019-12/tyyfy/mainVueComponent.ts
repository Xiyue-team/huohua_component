import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as firstPoster from './sub_static/video/adequate.jpg';
import * as secondPoster from './sub_static/video/shortage.jpg';

@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    active2 = false;
    active1 = true;
    active = true;
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
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    getEvent(index: number) {
        (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(index);
    }
    playEvent() {
        this.active = false;
        (ViewController.getInstance().viewHandler as ModelViewHandler).playEvent();
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = width / height > 16 / 9 ? height / 576 : width / 1024;
        (document.querySelector('.reactionBox') as any).style.transform = 'scale(' + scale + ')';

    }
    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as ModelViewHandler).reset();
    }
}

