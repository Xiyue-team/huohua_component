import {Vue} from 'vue/types/vue';

export interface ViewHandler {

    viewModel: Vue;

    beforeRenderElement(): void;

    domReady(): void;

    resize(): void;

    reset(): void;

    runTest(): void;

    pause(): void;

    resume(): void;

    destory(): void;

    /**
     * 隐藏页面控制元素
     */
    hideControlElement(): void;

    /**
     * 显示页面控制元素
     */
    showControlElement(): void;

}

export class ViewOption {

    //是否显示重置按钮
    showReset = true;

    /*以下属性为移动端参数*/
    //是否适配移动端
    adapterMobilePanel = true;

    //显示展开按钮
    showMobileExpandIco = true;
    //设置移动端面板透明
    mobilePanelAlpha = false;

    //显示重置按钮
    showMobileResetIco = true;

    //控制面板动画延迟时间
    controlPanelAnimationDelay = 0;

}
