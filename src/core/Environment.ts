import {BrowserUtil} from '../util/BrowserUtil';
import {BrowserInfo} from '../model/BrowserInfo';
import {HardwareInfo, MobileHardwareInfo} from '../model/HardwareInfo';
import {BrowserApiUtil} from '../util/BrowserApiUtil';



/**
 *
 * 环境监测类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/26 12:52
 */

export class Environment {

    //浏览器信息
    browserInfo: BrowserInfo;

    //硬件信息
    hardware: HardwareInfo;

    //手机端硬件信息
    mobileHardware: MobileHardwareInfo;

    constructor() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        //mock data
        //(window as any).technology = ['threejs', 'webgl' , 'webgl2.0', 'gsap'];

        this.loadEditorInfo();
        this.loadMobileInfo();
    }

    /**
     * 加载编辑器硬件信息
     */
    loadEditorInfo() {

        // mock data
        /*(window as any).hardware = {
            cpu: 'Intel(R)_Xeon(R)_CPU_E5-1620_v4_@_3.50GHz',
            cpuLevel: '95',
            discreteGpu: true,
            totalMem: 8192,
            freeMem: 4622
        };*/

        const hardware = (window as any).hardware;
        if ( !hardware ) {
            console.warn('no hardwareinfo');
        }
        this.hardware = hardware;
    }

    /**
     * 加载移动端信息
     */
    loadMobileInfo() {
        if ( !this.browserInfo.isHuohuaPlayer && !this.browserInfo.isHuohuaApp) {
            return;
        }
        if ( !window.hasOwnProperty('api') || !(window as any).api.getDeviceInfo) {
            return;
        }
        this.mobileHardware = JSON.parse((window as any).api.getDeviceInfo());
    }


}
