import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as arrow from './sub_static/left.png';
import * as top from './sub_static/top.png';
import * as right from './sub_static/right.png';
@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    btntext = window.env.browserInfo.lang.btntext;
    columnsOrRows = 1;
    pic = arrow;
    pictop = top;
    picright = right;

    orderList = []; //数对组
    numList = [];
    numbList = [];
    msgt: HTMLElement; //提示 

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        for (let i = 7; i > 0; i--) {
            this.numList.push({ no: i });
            for (let j = 1; j < 8; j++) {
                this.orderList.push({ textRows: `(${i},${j})`, textColumns: `(${j},${i})`, show: false });
            }
        }
        for (let i = 1; i < 8; i++) {
            this.numbList.push({ no: i });
        }
        this.msgt = <HTMLElement>document.getElementById('msg');
    }

    showItem(index: number) {
        this.orderList[index].show = !this.orderList[index].show;
        this.msgt.hidden = true;
    }

    columnsOrRowsEvent(i: number) {
        this.columnsOrRows = i;
    }

    resetEvent() {
        for (let i = 0; i < this.orderList.length; i++) {
            this.orderList[i].show = false;
        }
        this.columnsOrRows = 1;
        this.msgt.hidden = false;
    }
}

