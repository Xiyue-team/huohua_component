
import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DqgjViewHandler } from './services/DqgjViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const imgHtc = require('./sub_static/image/htc.png')
const imgHtl = require('./sub_static/image/htl.png')
const imgHty = require('./sub_static/image/hty.png')
const imgHtm = require('./sub_static/image/htm.png')
@Component
export class MainVueComponent extends Vue {

    ua: any = null;
    imgTitle: any = null;
    imgUrl: any = null;
    alertShow: boolean = false;
    imgList: any = [{ 'title': '黄土川', 'src': imgHtc },
    { 'title': '黄土梁', 'src': imgHtl },
    { 'title': '黄土塬', 'src': imgHty },
    { 'title': '黄土峁', 'src': imgHtm }];


    // created
    created() {
        const viewOption = new ViewOption();
        this.ua = navigator.userAgent

        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new DqgjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        const he = window.innerHeight;

        const e = this.ua.indexOf('MON-W19')
        const hx = this.ua.indexOf('HITV300C')
        ViewController.getInstance().domReady();


    }
    bigger(e: any) {
        let ele = window.event.srcElement;
        let classes = window.document.getElementsByClassName((ele as any).className);
        if ((ele as any).className.indexOf('h') >= 0) {
            (ele as any).style.height = 8 + 'vh';
            (ele as any).style.width = 'auto';
            if ((ele as any).className == 'htc') {
                (ele as any).style.top = 37 + '%';
                (ele as any).style.left = 31 + '%';
            } else if ((ele as any).className == 'htl') {
                (ele as any).style.top = 22 + '%';
                (ele as any).style.left = 49 + '%';
            } else if ((ele as any).className == 'htm') {
                (ele as any).style.top = 29 + '%';
                (ele as any).style.left = 68 + '%';
            }
            else if ((ele as any).className == 'hty') {
                (ele as any).style.top = 37 + '%';
                (ele as any).style.left = 58 + '%';
            }
        }


    }
    smaller(e: any) {
        let ele = window.event.srcElement;
        let classes = window.document.getElementsByClassName((ele as any).className);
        if ((ele as any).className.indexOf('h') >= 0) {
            (ele as any).style.height = 6 + 'vh';
            (ele as any).style.width = 'auto';
            if ((ele as any).className == 'htc') {
                (ele as any).style.top = 40 + '%';
                (ele as any).style.left = 33 + '%';
            } else if ((ele as any).className == 'htl') {
                (ele as any).style.top = 25 + '%';
                (ele as any).style.left = 51 + '%';
            } else if ((ele as any).className == 'htm') {
                (ele as any).style.top = 31 + '%';
                (ele as any).style.left = 70 + '%';
            }
            else if ((ele as any).className == 'hty') {
                (ele as any).style.top = 40 + '%';
                (ele as any).style.left = 60 + '%';
            }
        }
    }
    // 点击事件
    alerts(num: any) {
        this.alertShow = true
        this.imgTitle = this.imgList[num].title
        this.imgUrl = this.imgList[num].src
    }
    // 重置
    reset() {
        this.alertShow = false
    }
}