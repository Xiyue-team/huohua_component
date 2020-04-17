import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    text = window.env.browserInfo.lang.text;
    // 多选框按钮组
    list: any = {'0': true, '1': false, '2': false};
    // 重置按钮点击一次后再次点击无效
    mark = false;
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
    //多选按钮组合事件
    btnEvent(v: any, ) {
        this.mark = false;
        this.list[v] = !this.list[v];
        let has = false;
        for (const i in this.list) {
            if (this.list.hasOwnProperty(i)) {
                has = has || this.list[i];
            }
        }
        if (!has) {
            this.$set(this.list, v, true);
            return;
        }
        if (this.list[0] === true && this.list[1] === false && this.list[2] === false) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(1);
        } else if (this.list[0] === false && this.list[1] === true && this.list[2] === false) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(2);
        } else if (this.list[0] === false && this.list[1] === false && this.list[2] === true) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(3);
        } else if (this.list[0] === true && this.list[1] === true && this.list[2] === false) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(4);
        } else if (this.list[0] === true && this.list[1] === false && this.list[2] === true) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(5);
        } else if (this.list[0] === false && this.list[1] === true && this.list[2] === true) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(6);
        } else if (this.list[0] === true && this.list[1] === true && this.list[2] === true) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(7);
        }
    }

    // 重置
    reset() {
        if (this.mark === true) {
            return;
        }
        this.list = {'0': true, '1': false, '2': false};
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.reset();
        this.mark = true;
    }
}

