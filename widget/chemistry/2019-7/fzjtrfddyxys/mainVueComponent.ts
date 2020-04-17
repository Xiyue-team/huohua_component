import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    lang = window.env.browserInfo.lang;
    reactionImg = require('./sub_static/UI/imgsArr1/1.png');
    // 5个点击按钮
    active1 = false;
    active2 = true;
    active3 = false;
    show1 = true;
    show2 = false;
    //控制下方提示汉字的而现实隐藏
    textShow = false;
    //温度计温度高度
    heightNum = 1;
    // 升温和降温按钮的透明度
    opaNum1 = 1;
    opaNum2 = 1;
    // 升温和降温按钮的dom
    riseDom: any;
    reduceDom: any;
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
        setTimeout(() => {
            this.riseDom = document.getElementById('btn3');
            this.reduceDom = document.getElementById('btn5');
            this.controlOpc(2, 0.5, 'none');
        }, 100);

    }
    getEvent(index: number) {
        if (index === 0) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(0);
        } else if (index === 1) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        }
    }
    changeMatter(index: number) {
        this.reset();
        if (index === 0) {
            this.changeEvt(this.show1);
            (ViewController.getInstance().viewHandler as ModelViewHandler).changeThing(1);
            this.show1 = true;
        } else if (index === 1) {
            this.changeEvt(this.show2);
            (ViewController.getInstance().viewHandler as ModelViewHandler).changeThing(2);
            this.show2 = true;
        }
    }
    //点击切换物质
    changeEvt (show: any) {
        if (show === true) {
            return;
        }
        this.show1 = false;
        this.show2 = false;
    }
    @Watch('heightNum')
    onChildChanged1(val: number, oldVal: number) {
        if (this.show1) {
            this.showBtnEvt(val, oldVal, 67, 158, 205, 17);
        } else {
            this.showBtnEvt(val, oldVal, 132, 223, 252, 75);
        }
    }
    // 两种不同物质下按钮禁止点击状态事件
    showBtnEvt (val: number, oldVal: number, temNum1: number, temNum2: number, temNum3: number, temNum4: number) {
        if (val > oldVal) {
            if (val === 1) {
                this.controlOpc(2, 0.5, 'none');
            } else if (val > 1 && val < temNum1) {
                this.controlOpc(2, 1, 'auto');
            } else if (val === temNum1 ) {
                this.textShow = true;
                this.controlOpc(2, 1, 'auto');
                (ViewController.getInstance().viewHandler as ModelViewHandler).playPassEvent(21, 52, 77);
            } else if (val > temNum1 && val < temNum2) {
                this.controlOpc(2, 0.5, 'none');
            } else if (val === temNum2 ) {
                this.controlOpc(2, 0.5, 'none');
                (ViewController.getInstance().viewHandler as ModelViewHandler).playPassEvent(79, 114, 151);
            } else if (val > temNum2 && val <= temNum3) {
                this.controlOpc(2, 0.5, 'none');
            } else if (val > temNum3 && val < 254) {
                this.controlOpc(2, 1, 'auto');
            } else if (val === 254) {
                this.controlOpc(1, 0.5, 'none');
                this.active1 = false;
                this.active2 = true;
            }
        } else if (val < oldVal) {
            if (val === 254) {
                this.controlOpc(1, 0.5, 'none');
            }  else if (val > temNum2 && val < 254) {
                this.controlOpc(1, 1, 'auto');
            }  else if (val === temNum2) {
                this.controlOpc(1, 1, 'auto');
                (ViewController.getInstance().viewHandler as ModelViewHandler).playPassFEvent(114, 77, 53);
            }  else if (val > temNum1 && val < temNum2 ) {
                this.controlOpc(1, 0.5, 'none');
            }  else if (val === temNum1) {
                this.controlOpc(1, 0.5, 'none');
                (ViewController.getInstance().viewHandler as ModelViewHandler).playPassFEvent(52, 19, 1);
            }  else if (val >= temNum4 && val < temNum1) {
                this.controlOpc(1, 0.5, 'none');
            }  else if (val > 1 && val < temNum4) {
                this.controlOpc(1, 1, 'auto');
            }  else if (val === 1) {
                this.controlOpc(2, 0.5, 'none');
                this.active3 = false;
                this.active2 = true;
            }  
        }
    }
    // 升温和降温按钮透明度及点击事件控制
    controlOpc (val: number, opacity: number, haveClick: any) {
        if (val === 1) {
            this.opaNum1 = opacity;
            this.riseDom.style.pointerEvents = haveClick;
        } else {
            this.opaNum2 = opacity;
            this.reduceDom.style.pointerEvents = haveClick;
        }
    }
    // 重置
    reset() {
        this.opaNum1 = 1;
        this.opaNum2 = 1;
        this.heightNum = 1;
        this.riseDom.style.pointerEvents = 'auto';
        this.textShow = false;
        this.controlOpc(2, 0.5, 'none');
    }
}

