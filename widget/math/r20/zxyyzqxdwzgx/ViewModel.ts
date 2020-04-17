import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZxysqxViewHandler} from './services/ZxysqxViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
@Component
export class ViewModel extends Vue {
    buttonControl = false;
    disableControl = true;
    newTitle1 = '双曲线';
    newTitle2 = '抛物线';
    newTitle3 = '椭圆';
    newTitle4 = '圆';
    color1 = true;
    color2 = false;
    color3 = false;
    color4 = false;
    delta = 'Δ > 0';
    position = '相交';
    intersection = '两个';
    slope = '存在';
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    created() {
        ViewController.getInstance(new ZxysqxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    button1() {
        this.color1 = true;
        this.color2 = false;
        this.color3 = false;
        this.color4 = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.resetPointPosition();
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowGraphics(this.color1, this.color2, this.color3, this.color4);
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f1.visible = true;
        (ViewController.getInstance().viewHandler as any).zxypwx.f2.visible = true;
        (ViewController.getInstance().viewHandler as any).zxypwx.f.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowPoint(false, true, true);
    }

    button2() {
        this.color2 = true;
        this.color1 = false;
        this.color3 = false;
        this.color4 = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.resetPointPosition();
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowGraphics(this.color1, this.color2, this.color3, this.color4);
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f.visible = true;
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowPoint(true, false, false);
    }

    button3() {
        this.color3 = true;
        this.color2 = false;
        this.color1 = false;
        this.color4 = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.resetPointPosition();
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowGraphics(this.color1, this.color2, this.color3, this.color4);
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f1.visible = true;
        (ViewController.getInstance().viewHandler as any).zxypwx.f2.visible = true;
        (ViewController.getInstance().viewHandler as any).zxypwx.f.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowPoint(false, true, true);
    }

    button4() {
        this.color4 = true;
        this.color2 = false;
        this.color1 = false;
        this.color3 = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.resetPointPosition();
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowGraphics(this.color1, this.color2, this.color3, this.color4);
        (ViewController.getInstance().viewHandler as any).zxypwx.f1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.f.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote1.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.asymptote2.visible = false;
        (ViewController.getInstance().viewHandler as any).zxypwx.isShowPoint(false, false, false);
    }

}

