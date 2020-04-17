import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as blue from './sub_static/image/blue.png';
import * as gray from './sub_static/image/gray.png';
import * as visibility from './sub_static/image/visibility.png';
import * as unvisibility from './sub_static/image/unvisibility.png';
import * as dot from './sub_static/image/dots.png';
import * as WarpAndLatitude from './sub_static/image/WarpAndLatitude.jpg';
import * as locat from './sub_static/image/dots.png';

@Component
export class ViewModel extends Vue {
    assemble: any;
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    text = this.lang.text;
    table = gray;
    location = visibility;
    dot = dot;
    bg = WarpAndLatitude;
    btn = [{
        text: '',
        img:locat
    }, {
        text: '',
        img:locat
    }];
    showtable = false;
    showlocation = true;
    widthPer = '100px';
    leftPer = '0';
    Container: HTMLElement;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
        this.Container = <HTMLElement>document.getElementById('Container3d');
        this.resize();
    }

    check() {
        this.showtable = !this.showtable;
        this.table = this.showtable ? blue : gray;
        this.resize();
        this.assemble.mapCheck(this.showtable);
    }

    check2() {
        this.showlocation = !this.showlocation;
        this.location = this.showlocation ? visibility : unvisibility;
        this.assemble.locationCheck(this.showlocation);
    }
    resize() {
        this.widthPer = `${this.Container.clientHeight}px`;
        this.leftPer = this.showtable ? `${window.innerWidth * 0.8 - this.Container.clientHeight / 2}px`
            : `${(window.innerWidth - this.Container.clientHeight) / 2}px`;
    }
    resetEvent() {
        this.showlocation = true;
        this.showtable = false;
        this.table = gray;
        this.location = visibility;
        this.resize();
    }
}

