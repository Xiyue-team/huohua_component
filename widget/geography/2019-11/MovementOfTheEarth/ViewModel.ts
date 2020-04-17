import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    subtitle = this.lang.subtitle;
    btntext = this.lang.text;

    btn = [
        { title: this.lang.text[0], active: false, disabled: false },
        { title: this.lang.text[1], active: false, disabled: false },
        { title: this.lang.text[2], active: false, disabled: false },
        { title: this.lang.text[3], active: false, disabled: false }
    ]; // 设置按钮数据
    isSelfRotate = false; //是否自转
    isPuclicRotate = false; // 是否公转
    assemble: any;

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
    }

    selectModeEvent(type: number) {
        if (type === 2 || type === 3) {
            if (!this.btn[type].disabled) {
                this.btn[type].active = !this.btn[type].active;
                if (this.assemble) {
                    this.assemble.selectModeEvent(type, this.btn[type].active);
                }
            }
        } else {
            this.btn[type].active = !this.btn[type].active;
            if (this.assemble) {
                this.assemble.selectModeEvent(type, this.btn[type].active);
            }
        }

    }

    selfRotate() {
        this.isSelfRotate = !this.isSelfRotate;
        if (this.assemble) {
            this.assemble.selfRotate(this.isSelfRotate);
        }
    }

    puclicRotate() {
        this.isPuclicRotate = !this.isPuclicRotate;
        if (this.assemble) {
            this.assemble.puclicRotate(this.isPuclicRotate);
            this.btn[2].disabled = this.btn[3].disabled = this.isPuclicRotate;
            if (this.isPuclicRotate) {
                this.btn[2].active = this.btn[3].active = false;
                this.assemble.selectModeEvent(2, this.btn[2].active);
                this.assemble.selectModeEvent(3, this.btn[3].active);
            }
        }
    }

    resetEvent() {
        this.isPuclicRotate = this.isSelfRotate = false;
        for (let i = 0; i < this.btn.length; i++) {
            this.btn[i].active = false;
            this.btn[i].disabled = false;
        }
    }
}
