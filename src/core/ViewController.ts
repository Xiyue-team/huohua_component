
/**
 * 试图控制启动类
 * 在vue 初始化(created)时 实例化此类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/22 15:37
 */
import {ViewHandler, ViewOption} from './CoreInterface';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
const PerfectScrollbar = require('../libs/perfect-scrollbar.js');
import { BrowserUtil } from '../util/BrowserUtil';
import {MobileAdapter} from './adapter/MobileAdapter';
import {SystemTip} from './SystemTip';
import {UIAdapter} from './adapter/UIAdapter';



export class ViewController {


    private static classKeys: Function[] = [];
    private static classValues: any[] = [];

    private static instance: ViewController;

    static perfectScrollbar: any;


    viewHandler: ViewHandler;

    //ui适配类
    uiAdapter: UIAdapter;
    //手机适配器
    mobileAdapter: MobileAdapter;
    //系统提示类
    tip: SystemTip;

    constructor(viewHandler: ViewHandler, viewOption?: ViewOption) {
      // @ts-ignore
      const viewConfig = process.env.component.config as ViewOption;
        if ( viewConfig !== undefined) {
            viewOption = viewConfig;
        }
        const clazz: any = this['constructor'];
        //为空时，表示浏览器不支持这样读取构造函数
        if (!clazz) {
            return;
        }

        // 防止重复实例化
        if (ViewController.classKeys.indexOf(clazz) !== -1) {
            throw new Error(this + ' 只允许实例化一次！');
        } else {
            ViewController.classKeys.push(clazz);
            ViewController.classValues.push(this);
        }
        if ( !viewOption) {
            viewOption = new ViewOption();
        }

        //console.log('实例化');
        this.viewHandler    = viewHandler;
        //提示类
        this.tip            = new SystemTip();

        this.uiAdapter      = new UIAdapter();
        //手机适配器
        this.mobileAdapter  = new MobileAdapter();
        //环境信息类
        /*const env           = new Environment();
        (window as any)['env'] = env;*/
        (window as any)['viewOption'] = viewOption;

        this.showLoading();

        (window as any)['viewHandler'] = viewHandler;
    }



    public static getInstance(viewHandler?: ViewHandler, viewOption ?: ViewOption): ViewController {
        if ( !this.instance) {
            this.instance = new ViewController(viewHandler, viewOption);
        }
        return this.instance;
    }

    private initWindowResize() {
        //console.warn('初始化windowResize 事件');
        //console.warn('init width:' + document.documentElement.clientWidth);
        window.onresize = () => {
            //console.log('width:' + document.documentElement.clientWidth);
            //当浏览器调整大小时，重新更新滚动条
            this.scrollerUpdate();

            /*增加响应式方法*/
            this.viewHandler.resize();
        };
    }

    private scrollerUpdate() {
        if ( ViewController.perfectScrollbar) {
            ViewController.perfectScrollbar.update();
        }
    }

    domReady(): void {

        this.uiAdapter.createElement();

        //适配手机
        this.adaptationMobile();

        //增加缩放
        //this.scaleViewContent();

        //vconsole 调试日志组件
        const config = {
            reportUrl: '//a.qq.com',  //错误上报地址
            reportPrefix: 'qun',    //错误上报msg前缀，一般用于标识业务类型
            reportKey: 'msg',        //错误上报msg前缀的key，用户上报系统接收存储msg
            otherReport: {              //需要上报的其他信息
                uin: 491862102
            },
            entry: '#title'          //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
        };
        //AllogLever.config(config);



        //动态添加滚动条
        const container = document.querySelector('.control-panel_div_rt') as HTMLElement;
        if (container ) {
            ViewController.perfectScrollbar = new PerfectScrollbar(container);
        }

        if ( !document.documentElement.clientWidth || document.documentElement.clientWidth === 0) {
            requestAnimationFrame( ViewController.getInstance().domReady);
           // return;
        }
        ViewController.getInstance().initWindowResize();
        ViewController.getInstance().viewHandler.domReady();
        //ViewController.getInstance().hideLoading();

       /* const browserInfo = BrowserUtil.getBrowserInfo();
        (browserInfo as any)['hardware'] = {
            cpu: 'Intel(R)_Xeon(R)_CPU_E5-1620_v4_@_3.50GHz',
            cpuLevel: '95',
            discreteGpu: true,
            totalMem: 8192,
            freeMem: 4622
        };
        (browserInfo as any)['technology'] = ['threejs', 'webgl' , 'webgl2.0', 'gsap'];*/


    }


    /**
     * 初始化加载等待框
     */
    showLoading() {
       this.tip.showLoading();
    }

    /**
     * 隐藏等待框
     */
    hideLoading(time ?: number) {
        time = time ? time : 0;
        time += 1500;
        setTimeout( () => {
            this.tip.hideLoading();
        }, time );
    }


    /**
     * 适配手机端，
     * 当检查为手机端时增加手机端样式
     *
     */
    adaptationMobile() {
        if (((window as any).viewOption as ViewOption).adapterMobilePanel === false) {
            return;
        }
        const browserInfo = BrowserUtil.getBrowserInfo();
        console.log(browserInfo);
        //只有iphone下，或者android设备并且是小屏幕尺寸
        if ((browserInfo.isIphone === true &&  browserInfo.os.toLowerCase() !== 'android' && browserInfo.isSmallDevice === true) ||
            (browserInfo.os.toLowerCase() === 'android' && browserInfo.isSmallDevice === true)) {
            this.mobileAdapter.changeDeviceToMobile();
        }

    }









}
