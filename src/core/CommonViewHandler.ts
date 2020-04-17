/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 16:57
 */
import {ViewHandler} from './CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../util/Detector';

export class CommonViewHandler implements ViewHandler {
    viewModel: Vue;

    constructor(vm: Vue ) {
        this.viewModel = vm;
    }

    beforeRenderElement(): void {
        //TODO check browVersion support
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        Detector.forceMobildLandscape();
        this.setLayout();
    }

    resize(): void {
        //throw new Error('Method not implemented.');
       // Detector.forceMobildLandscape();
        this.setLayout();
    }

    reset(): void {
        //throw new Error('Method not implemented.');
    }

    runTest(): void {
        //throw new Error('Method not implemented.');
    }

    pause(): void {

    }

    resume(): void {

    }

    destory(): void {

    }

    /**
     * 设置布局
     * 1.主内容区固定宽高，只在指定像素屏幕上放大1倍或者缩小一倍
     * 2.设置控制面板在移动端的隐藏，以及点击显示
     *
     */
    setLayout(): void {
        /*let mainViewContent:HTMLDivElement = (document.getElementsByClassName('view_div_content')[0] as HTMLDivElement);
        if(!mainViewContent){
            console.warn('view_div_content doesn't exist !');
            return;
        }
        let ratio = mainViewContent.getAttribute('data-ratio');
        if(!ratio){
            console.warn('view_div_content doesn't exist attribute data-ratio !');
            return;
        }
        let ratioW:number = Number.parseInt(ratio.split(':')[0]);
        let ratioH:number = Number.parseInt(ratio.split(':')[1]);

        let clientWidth = mainViewContent.clientWidth;
        let clientHeight = mainViewContent.clientHeight;
        console.log('clientWidth:'+clientWidth+' --  clientHeight:'+clientHeight);
        //if(clientWidth > clientHeight){
            let styleWith = ratioW/ratioH *clientHeight;
            mainViewContent.style.width = styleWith + 'px';
            console.log('width:'+styleWith);*/
        /*}else{
            let styleHeight = clientWidth*ratioH/ratioW;
            mainViewContent.style.height = styleHeight + 'px';
            console.log('height:'+styleHeight);
        }*/

    }

    hideControlElement() {

    }

    showControlElement() {

    }

}
