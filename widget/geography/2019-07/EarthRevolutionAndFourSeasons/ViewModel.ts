import Vue from 'vue';
import Component from 'vue-class-component';
import $ from 'jquery-ts';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import bgSrc1 from './sub_static/image/bg1.png';
import bgSrc2 from './sub_static/image/bg2.png';
import bgSrc3 from './sub_static/image/bg3.png';
import bgSrc4 from './sub_static/image/bg4.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    assemble: any;
    title_text = window.env.browserInfo.lang.title;
    buttonActived = 0;
    buttonTitle1 = window.env.browserInfo.lang.text[0].title;
    buttonTitle2 = window.env.browserInfo.lang.text[1].title;
    buttonTitle3 = window.env.browserInfo.lang.text[2].title;
    buttonTitle4 = window.env.browserInfo.lang.text[3].title;
    buttonBackTitle = window.env.browserInfo.lang.buttonBackTitle;
    buttonDetailsTitle = window.env.browserInfo.lang.buttonDetailsTitle;
    DetailsActived = false;
    showPlan = 0;

    weatherList = [
        {
            bgSrc: bgSrc1,
            title: window.env.browserInfo.lang.text[0].title, desc: window.env.browserInfo.lang.text[0].desc
        },
        {
            bgSrc: bgSrc2,
            title: window.env.browserInfo.lang.text[1].title, desc: window.env.browserInfo.lang.text[1].desc
        },
        {
            bgSrc: bgSrc3,
            title: window.env.browserInfo.lang.text[2].title, desc: window.env.browserInfo.lang.text[2].desc
        },
        {
            bgSrc: bgSrc4,
            title: window.env.browserInfo.lang.text[3].title, desc: window.env.browserInfo.lang.text[3].desc
        }
    ];
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    seasons(i: number) {
        this.buttonActived = i;
        this.assemble.seasons(i);
    }
    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }
    showDetails() {
        this.DetailsActived = !this.DetailsActived;
        if (this.DetailsActived) {
            $('.left_half').show();
        } else {
            $('.left_half').hide();
        }
    }
    back() {
        this.DetailsActived = false;
        $('.left_half').hide();
        this.showPlan = 0;
    }
    resetEvent() {
        this.showPlan = 0;
    }
}

