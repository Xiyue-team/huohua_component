import {ViewController} from '../ViewController';
import PerfectScrollbar from 'perfect-scrollbar';
import * as expandOpenImg from './../../../static/images/expand_on@3x.png';
import * as expandCloseImg from './../../../static/images/expand_off@3x.png';
import * as resetImg from './../../../static/images/reset_new@3x.png';
import Hammer from 'hammerjs';
import {SystemTip} from '../SystemTip';
import {BrowserUtil} from '../../util/BrowserUtil';
const _ = require('lodash');

/**
 *
 * 手机端适配类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/25 14:15
 *
 */

export class MobileAdapter {

    constructor() {

    }

    /**
     * 手机端打开时触发操作
     * 1.右侧的控件区域改为漂浮
     * 2.由于手机端高度有限控件区域按钮过多可能会出现滚动条，所以需要初始化滚动条组件
     * 3.当右侧空间区域改为漂浮时默认先收起
     * 4.创建操作右侧控件区的悬浮按钮
     */
    public changeDeviceToMobile() {
        console.log('adaptation mobile');


        /*1.右侧控件面板改为全局漂浮*/
        if (document.getElementsByClassName('control-panel_div_rt').length === 1) {
            const controlPanel = document.getElementsByClassName('control-panel_div_rt')[0];
            controlPanel.classList.remove('control-panel_div_rt');
            controlPanel.classList.add('control-panel_div_floatRight');
        }

        //2.动态添加滚动条
        const container = document.querySelector('.control-panel_div_floatRight') as HTMLElement;
        if (container ) {
            ViewController.perfectScrollbar = new PerfectScrollbar(container);
        }


        //4.插入展开按钮
        if ( (window as any).viewOption.showMobileExpandIco === true ) {
            this.createExpandElement();
        }

        //创建重置按钮
        if ( (window as any).viewOption.showMobileResetIco === true) {
            this.createResetElement();
        }

        //3.隐藏右侧工具栏
        const controlRightPanel = (document.getElementsByClassName('control-panel_div_floatRight')[0] as HTMLDivElement);

        if ( controlRightPanel  ) {
            controlRightPanel.classList.add('mobile_right_control');

            if ( (window as any).viewOption.mobilePanelAlpha === false) {
                controlRightPanel.classList.add('mobile_blur');
                //controlRightPanel.classList.add('off');
            }
            setTimeout( () => {
                this.hidePanel();
            }, (window as any).viewOption.controlPanelAnimationDelay);

        }




        //5.设置内容区域为全屏样式
        const contentDiv = document.getElementsByClassName('control-panel_div_content')[0] as HTMLDivElement;
        if (!contentDiv.classList.contains('fill_parent')) {
            contentDiv.classList.add('fill_parent');
        }



    }


    /**
     * 绑定移动端
     */
    createExpandElement() {
        const expandOpenBtn = '<img id="expandOpenBtn" class="control_div_expandBtn" src="' + expandCloseImg + '"/>';
        document.body.insertAdjacentHTML('beforeend', expandOpenBtn);

        const expandCloseBtn = '<img id="expandCloseBtn" class="control_div_expandBtn hide" src="' + expandOpenImg + '"/>';
        document.body.insertAdjacentHTML('beforeend', expandCloseBtn);

        const expandElement = document.getElementById('expandOpenBtn');
        const expandCloseElement = document.getElementById('expandCloseBtn');

        //7.绑定展开/关闭按钮事件
        expandElement.addEventListener('click', () => {
            this.showPanel();
        });

        expandCloseElement.addEventListener('click', () => {
            this.hidePanel();
        });
    }

    /**
     * 创建收起和展开按钮
     */
    createResetElement() {


        const resetBtn = '<img id="resetBtn" class="control_div_mobileResetBtn" src="' + resetImg + '"/>';
        document.body.insertAdjacentHTML('beforeend', resetBtn);

        this.hidePcResetImg();

        const resetElement = document.getElementById('resetBtn');


        //8.绑定重置事件
        resetElement.addEventListener('click', () => {
            ViewController.getInstance().viewHandler.reset();
        });
    }

    /**
     * 隐藏pc版重置图片
     */
    hidePcResetImg() {
        const imgs = document.getElementsByTagName('img');
        const index = _.findIndex(imgs, function(img: HTMLImageElement) { return img.src.indexOf('chongzhi.png') > -1; });
        //隐藏pc上的重置图片
        if (index > -1 ) {
            imgs[index].classList.add('hide');
        }

        //隐藏重置图片的容器
        const resetDiv = document.getElementById('reset');
        if ( resetDiv) {
            resetDiv.classList.add('hide');
        }
    }

    /**
     * 显示面板
     */
    showPanel() {
        ViewController.getInstance().viewHandler.showControlElement();

        /*console.log('show');*/

        const expandElement = document.getElementById('expandOpenBtn');
        const expandCloseElement = document.getElementById('expandCloseBtn');
        const controlRightPanel = (document.getElementsByClassName('control-panel_div_floatRight')[0] as HTMLDivElement);

        if (controlRightPanel) {

            if ( (window as any).viewOption.mobilePanelAlpha === true) {
                controlRightPanel.classList.remove('hide');
            } else {
                controlRightPanel.classList.remove('off');
            }
        }



        expandElement.classList.add('hide');
        expandCloseElement.classList.remove('hide');

    }

    /**
     * 隐藏面板
     */
    hidePanel() {
        /*console.log('hide');
*/
        ViewController.getInstance().viewHandler.hideControlElement();

        const expandElement = document.getElementById('expandOpenBtn');
        const expandCloseElement = document.getElementById('expandCloseBtn');
        const controlRightPanel = (document.getElementsByClassName('control-panel_div_floatRight')[0] as HTMLDivElement);

        if (controlRightPanel) {

            if ( (window as any).viewOption.mobilePanelAlpha === true) {
                controlRightPanel.classList.add('hide');
            } else {
                controlRightPanel.classList.add('off');
            }

        }

        if ( expandCloseElement ) {
            expandCloseElement.classList.add('hide');
        }
        if ( expandCloseElement ) {
            expandElement.classList.remove('hide');
        }

    }

    /** 手指缩放视图区域 **/
    scaleViewContent(element?: HTMLElement) {
        if (!element) {
            element = document.getElementsByClassName('view_div_content')[0] as HTMLDivElement;
        }
        console.log('绑定事件');
        const options = {};
        const hammertime = new Hammer(element);
        console.log(hammertime);
        hammertime.get('pinch').set({ enable: true });

        hammertime.on('pinch', (ev) => {
            const orgScale = element.style.transform.split('(')[1].split(')')[0];
            console.log(ev);
            console.log('orgScale:' + orgScale);
            console.log('触控点数 :' + ev.pointers.length + ' scale： ' + ev.scale);
            const scale = 0.5 *  ev.scale  ;
            console.log('scale:' + scale);
            element.style.transform = 'scale(' + ev.scale + ')';
            //document.dispatchEvent(ev.srcEvent);
        });
    }

    /**
     * 初始化视图内容区的点击事件
     */
    initViewContentClickEvent() {


    }

    forceMobildLandscape() {
        if (!BrowserUtil.getBrowserInfo().isMobile || BrowserUtil.getBrowserInfo().isHuohuaPlayer) {
            return;
        }

        const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(evt, () => {
            //console.info('屏幕改变' , event , window.orientation );
            if ( window.orientation === 90 || window.orientation === -90) {
                SystemTip.hideOrientationTip();
                //如果是通过竖屏旋转到横屏则显示提示
                SystemTip.showAdvice();
                /*去除无用的resize方法*/
             /*   setTimeout(() => {
                    (window as any).viewHandler.resize();
                } , 30);*/

            } else {
                SystemTip.showOrientationTip();
            }
            //console.log(window.orientation)
            //this.changeOrientationEvt();
        }, false);
        this.changeOrientationEvt();
    }

    changeOrientationEvt() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        const contentDOM = document.querySelector('.root_div_container') as HTMLDivElement;

        if (!contentDOM) {
            console.error('root_div_container 不存在');
            return;
        }
        //const contentDOM = document.body as HTMLDivElement;

        //alert('width: ' + width + ' height: ' + height)
        if (width > height) { // 横屏
            (window as any)['direction'] = 0;
            contentDOM.style.width = width + 'px';
            contentDOM.style.height = height + 'px';
            contentDOM.style.top = '0px';
            contentDOM.style.left = '0px';
            contentDOM.style.transform = 'none';
            console.log('横屏');
            //如果第一次进来是横屏则直接显示横屏提示
            SystemTip.showAdvice();

        } else {
            SystemTip.initOrientationTip();
            (window as any)['direction'] = 1;
        }
    }




}
