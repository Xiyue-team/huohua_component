/**
 * 设备监测类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/6 15:27
 */
import {BrowserUtil} from './BrowserUtil';
import * as tipImgSrc from '../../static/images/orientation.png';
import {SystemTip} from '../core/SystemTip';

export class Detector  {
 /*   canvas =  !! window.CanvasRenderingContext2D,*/
    static webgl() {

        try {

            const canvas = document.createElement( 'canvas' );
            return !! ( (window as any).WebGLRenderingContext && ( canvas.getContext( 'webgl' ) ||
                canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }

    }


    /**
     * 强制横屏
     */
    static forceMobildLandscape() {
        if (!BrowserUtil.getBrowserInfo().isMobile || BrowserUtil.getBrowserInfo().isHuohuaPlayer) {
            return;
        }
        //document.querySelector('.aspectration').classList.add("mobile")
        //移动端适配方案1：全屏下可以强制横屏，但是qq和weixin不支持
        /*(document as any).documentElement.webkitRequestFullscreen()
        (window as any).screen.orientation.lock('landscape-primary').then((result: any) => {
            console.log(result);
        }).catch((error: any) => {
            console.log(error);
        });*/

        const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(evt, () => {
            //console.info('屏幕改变' , event , window.orientation );
            if ( window.orientation === 90 || window.orientation === -90) {
                SystemTip.hideOrientationTip();
                //如果是通过竖屏旋转到横屏则显示提示
                SystemTip.showAdvice();

                /*去除无用的resize方法*/
              /*  setTimeout(() => {
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

    /**
     * 强制横屏
     */
    static changeOrientationEvt() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        const contentDOM = document.querySelector('.root_div_container') as HTMLDivElement;
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
            /* contentDOM.style.width = height + 'px';
              contentDOM.style.height = width + 'px';
              contentDOM.style.top = (height - width) / 2 + 'px';
              contentDOM.style.left = 0 - (height - width) / 2 + 'px';
              contentDOM.style.transform = 'rotate(90deg)';*/
        }
    }


}

