import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import Hilo from 'hilojs';

import * as fb2ImgPath from '../sub_static/f_b_2@2x.png';
import * as fb3ImgPath from '../sub_static/f_b_3@2x.png';
import * as fb4ImgPath from '../sub_static/f_b_4@2x.png';

import * as fh2ImgPath from '../sub_static/f_h_2@2x.png';
import * as fh3ImgPath from '../sub_static/f_h_3@2x.png';
import * as fh4ImgPath from '../sub_static/f_h_4@2x.png';

import * as yb2ImgPath from '../sub_static/y_b_2@2x.png';
import * as yb3ImgPath from '../sub_static/y_b_3@2x.png';
import * as yb4ImgPath from '../sub_static/y_b_4@2x.png';

import * as yh2ImgPath from '../sub_static/y_h_2@2x.png';
import * as yh3ImgPath from '../sub_static/y_h_3@2x.png';
import * as yh4ImgPath from '../sub_static/y_h_4@2x.png';

import * as bigBoxPath from '../sub_static/big_box@2x.png';
import * as smallBoxPath from '../sub_static/small_box@2x.png';
import { ViewModel } from '../ViewModel';

export class ViewHandler extends CommonViewHandler implements ViewHandler {

    gameWidth = 1200;
    gameHeight = 675;
    stageScaleX: number;
    stageScaleY: number;
    stage: Hilo.Stage;
    status = false;
    activeObj: CustomView;
    radito = 2　;
    orginX = 0;
    orginY = 0;

    POINTER_END = (Hilo.event as Hilo.EventType).POINTER_END;
    POINTER_START = (Hilo.event as Hilo.EventType).POINTER_START;
    POINTER_MOVE = (Hilo.event as Hilo.EventType).POINTER_MOVE;

    // 碰撞区域
    region = [
        { x: (692 + 31) * this.radito, y: 175 * this.radito , width: 80, height: 80},
        { x: (692 + 80   + 31 * 2) * this.radito, y: 175 * this.radito , width: 80, height: 80},
        { x: (692 + 80 * 2   + 31 * 3) * this.radito, y: 175 * this.radito , width: 80, height: 80},

        { x: (692 + 31) * this.radito, y: 270 * this.radito , width: 80, height: 80},
        { x: (692 + 80 + 31 * 2) * this.radito, y: 270 * this.radito , width: 80, height: 80},
        { x: (692 + 80 * 2   + 31 * 3) * this.radito, y: 270 * this.radito , width: 80, height: 80},

        { x: (692 + 31) * this.radito, y: 410 * this.radito , width: 80, height: 80},
        { x: (692 + 80   + 31 * 2) * this.radito, y: 410  * this.radito , width: 80, height: 80},
        { x: (692 + 80 * 2   + 31 * 3) * this.radito, y: 410 * this.radito , width: 80, height: 80},

        { x: (692 + 31) * this.radito, y: 510 * this.radito , width: 80, height: 80},
        { x: (692 + 80 + 31 * 2) * this.radito, y: 510 * this.radito , width: 80, height: 80},
        { x: (692 + 80 * 2   + 31 * 3) * this.radito, y: 510 * this.radito , width: 80, height: 80},
    ];


    region2 = [
        { x: (705) * this.radito, y: 175 * this.radito , width: 80, height: 80},
        { x: (705 + 80   + 5 * 1) * this.radito, y: 175 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 2   + 5 * 2) * this.radito, y: 175 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 3   + 5 * 3) * this.radito, y: 175 * this.radito , width: 80, height: 80},


        { x: (705) * this.radito, y: 340 * this.radito , width: 80, height: 80},
        { x: (705 + 80   + 5 * 1) * this.radito, y: 340 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 2   + 5 * 2) * this.radito, y: 340 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 3   + 5 * 3) * this.radito, y: 340 * this.radito , width: 80, height: 80},

        { x: (705) * this.radito, y: 505 * this.radito , width: 80, height: 80},
        { x: (705 + 80   + 5 * 1) * this.radito, y: 505 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 2   + 5 * 2) * this.radito, y: 505 * this.radito , width: 80, height: 80},
        { x: (705 + 80 * 3   + 5 * 3) * this.radito, y: 505 * this.radito , width: 80, height: 80},


    ];

    

    constructor(vm: Vue) {
        super(vm);
        if (navigator.maxTouchPoints > 0) {
            this.POINTER_START = 'touchstart';
            this.POINTER_END = 'touchend';
            this.POINTER_MOVE = 'touchmove';
        } else if (this.POINTER_START === 'touchstart') {
            this.POINTER_START = 'mousedown';
            this.POINTER_END = 'mouseup';
            this.POINTER_MOVE = 'mousemove';
        }


    }

    domReady():  void {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading();
    }



    /**
     * 响应界面大小变化
     */
    resize():  void {
        Detector.forceMobildLandscape();


        const widthToHeight = this.gameWidth / this.gameHeight;
    
        let newWidth = window.innerWidth,
            newHeight = window.innerHeight;

        const newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        this.stage.scaleX = newWidth / this.gameWidth / this.radito;
        this.stage.scaleY = newHeight / this.gameHeight / this.radito;
    }

    /**
     * 重置界面
     */
    reset():  void {
        (window as any).viewHandler.viewModel.active = 2;
        this.resetNiukou();
    }




    init() {
        // 初始化比例
        this.stageScaleX = document.getElementById('2dContainer').clientWidth / this.gameWidth;
        this.stageScaleY = document.getElementById('2dContainer').clientHeight / this.gameHeight;

        // 初始化舞台
        this.stage = new Hilo.Stage({
            renderType: 'canvas',
            container: document.getElementById('2dContainer'),
            width:  this.gameWidth * this.radito,
            height: this.gameHeight * this.radito　
        });

        this.resize();

        //设置刷新率
        const ticker = new Hilo.Ticker(60);
        ticker.addTick(this.stage);
        ticker.start();

        //加载静态资源

        this.stage.enableDOMEvent(this.POINTER_START, true);
        this.stage.enableDOMEvent(this.POINTER_MOVE, true);
        this.stage.enableDOMEvent(this.POINTER_END, true);
        this.initRes();
    }

    drawRect(region: Array<Region>, name: string, visable: boolean) {
        region.forEach((item , index) => {
            const rect = new Hilo.Graphics({x: item.x, y: item.y , width: 160 , height: 160 , id: name + index });
            (rect as any).setLineDash([5, 7]).lineStyle(1, 'rgba(255,255,255, 0.9)')
              .beginFill('rgba(255,255,255, 0)').drawRect(0, 0, 80 * 2, 80 * 2).endFill();

            this.stage.addChild(rect);
            rect.visible = visable;
        });
    }

    initRes() {
        /*容器边框*/
        new Hilo.Bitmap({
            id: 'bigBox1',
            image: bigBoxPath,
            x: 692 * this.radito,
            y: 153  * this.radito
        } as Hilo.IBitmapProperties).addTo(this.stage);

        new Hilo.Bitmap({
            id: 'bigBox2',
            image: bigBoxPath,
            x: 692 * this.radito,
            y: 391  * this.radito
        } as Hilo.IBitmapProperties).addTo(this.stage);

        /*容器边框*/
        new Hilo.Bitmap({
            id: 'smallBox1',
            image: smallBoxPath,
            x: 680 * this.radito,
            y: 135  * this.radito,
            visible: false
        } as Hilo.IBitmapProperties).addTo(this.stage);

        new Hilo.Bitmap({
            id: 'smallBox2',
            image: smallBoxPath,
            x: 680 * this.radito,
            y: 306  * this.radito,
            visible: false
        } as Hilo.IBitmapProperties).addTo(this.stage);

        new Hilo.Bitmap({
            id: 'smallBox2',
            image: smallBoxPath,
            x: 680 * this.radito,
            y: 466  * this.radito,
            visible: false
        } as Hilo.IBitmapProperties).addTo(this.stage);



         this.drawRect(this.region, 'reginA', true);
         this.drawRect(this.region2, 'reginB', false);


        const config = [
            { x: 156 * this.radito, y: 185 * this.radito, src: yb2ImgPath},
            { x: 420 * this.radito, y: 185 * this.radito, src: yh2ImgPath},
            { x: 288 * this.radito, y: 185 * this.radito, src: yb4ImgPath},

            { x: 156 * this.radito, y: 287 * this.radito, src: yh3ImgPath},
            { x: 288 * this.radito, y: 287 * this.radito, src: yb3ImgPath},
            { x: 420 * this.radito, y: 287 * this.radito, src: fb4ImgPath},

            { x: 156 * this.radito, y: 389 * this.radito, src: fh4ImgPath},
            { x: 288 * this.radito, y: 389 * this.radito, src: fh2ImgPath},
            { x: 420 * this.radito, y: 389 * this.radito, src: fh3ImgPath},

            { x: 288 * this.radito, y: 491 * this.radito, src: fb2ImgPath},
            { x: 156 * this.radito, y: 491 * this.radito, src: yh4ImgPath},
            { x: 420 * this.radito, y: 491 * this.radito, src: fb3ImgPath}
        ];
        let diffX = 0;
        let diffY = 0;

        //　循环创建 纽扣
        config.forEach(item => {
            const niukou = new Hilo.Bitmap({
                image: item.src,
                x: item.x,
                y: item.y

            } as Hilo.IBitmapProperties).addTo(this.stage);
            (niukou as CustomView) ['orginX'] = item.x;
            (niukou as CustomView) ['orginY'] = item.y;
            (niukou as CustomView) ['startX'] = item.x;
            (niukou as CustomView) ['startY'] = item.y;
            (niukou as CustomView) ['type'] = 'niukou';

            niukou.on(this.POINTER_START, (e: any) => {
                this.status = true;
                this.activeObj = niukou as CustomView;

                diffX = e.stageX - niukou.x;
                diffY = e.stageY - niukou.y;
            });
        });

        this.stage.on(this.POINTER_MOVE, (e: any) => {
            // console.log(e.eventTarget);
            if (this.status === true && this.activeObj) {
                this.activeObj.x = e.stageX - diffX;
                this.activeObj.y = e.stageY - diffY;
            }
        });

        this.stage.on(this.POINTER_END, (e: MouseEvent) => {
            if ( this.status === true) {
                //this.adsorb();
                this.hitRect((e as any).stageX, (e as any).stageY);
            }
            this.status = false;
            this.activeObj = null;
        });
    }

    hitRect(x: number, y: number) {
        const active = (ViewController.getInstance().viewHandler.viewModel as ViewModel).active;
        const namePrefix = active === 2 ? 'reginA' : 'reginB';
        let correctRect = null;

        let result = false;
        for ( let i = 0 ; i < 12 ; i++) {
            const rect = this.stage.getChildById(namePrefix + i );
            result = rect.hitTestPoint(x , y );
            if ( result ) {
                correctRect = rect;
                break;
            }
        }

        if (result === false || this.checkExist({x: correctRect.x, y: correctRect.y})) {
            // 复位坐标
            this.activeObj.x = this.activeObj.orginX;
            this.activeObj.y = this.activeObj.orginY;
            return;
        }

        // 吸附到新坐标
        this.activeObj.x = correctRect.x;
        this.activeObj.y = correctRect.y;

        // 设置新的复位坐标
        this.activeObj.orginX = this.activeObj.x;
        this.activeObj.orginY = this.activeObj.y;

    }

    //吸附
    adsorb() {
        const rect = {
            x: this.activeObj.x,
            y: this.activeObj.y,
            height: 80,
            width: 80
        };
        let maxArea = 0;
        let rightRegion = { x : 0 , y : 0};
        const active = (ViewController.getInstance().viewHandler.viewModel as ViewModel).active;
        const currentData = active === 2 ? this.region : this.region2;

        // 和各个区域进行相交检测
        for ( const item of currentData) {
            const interArea = this.intersectArea(rect, item);
            if ( interArea > maxArea ) {
                maxArea = interArea;
                rightRegion = item;
            }
        }
        if ( maxArea > 0 && this.checkExist(rightRegion) === false) {
            // 吸附到新坐标
            this.activeObj.x = rightRegion.x;
            this.activeObj.y = rightRegion.y;

            // 设置新的复位坐标
            this.activeObj.orginX = this.activeObj.x;
            this.activeObj.orginY = this.activeObj.y;
        } else {
            // 复位坐标
            this.activeObj.x = this.activeObj.orginX;
            this.activeObj.y = this.activeObj.orginY;
        }

    }

    //判断是否已经做过吸附
    checkExist(rightRegion: Region) {
        for ( const item of this.stage.children) {
           if ( (item as CustomView).orginX === rightRegion.x && (item as CustomView).orginY === rightRegion.y) {
                return true;
           }
        }

        return false;
    }

    /**
     * 检测两个矩形相交面积
     * @param rect1
     * @param rect2
     */
    intersectArea(rect1: Region, rect2: Region) {
        const l1 = { x: rect1.x, y: rect1.y };
        const r1 = { x: rect1.x + rect1.width, y: rect1.y + rect1.height };
        const l2 = { x: rect2.x, y: rect2.y };
        const r2 = { x: rect2.x + rect2.width, y: rect2.y + rect2.height };
        if ( l1.x > r2.x || l2.x > r1.x || l1.y > r2.y || l2.y > r1.y) {
            return 0;
        }

        const w = Math.min(r1.x, r2.x) - Math.max(l1.x, l2.x);
        const h = Math.min(r1.y, r2.y) - Math.max(l1.y, l2.y);
        return w * h;

    }


    resetNiukou() {
        this.stage.children.forEach(item => {
            if ( (item as CustomView).type === 'niukou') {
                (item as CustomView).x = (item as CustomView).startX;
                (item as CustomView).y = (item as CustomView).startY;
                (item as CustomView).orginX = (item as CustomView).startX;
                (item as CustomView).orginY = (item as CustomView).startY;
            }

        });
    }

    showRect(name: string, hideName: string) {
        for (let i = 0; i < 12; i++) {
            const rect = this.stage.getChildById(name + i);
            rect.visible = true;
        }
       for (let i = 0; i < 12; i++) {
            const rect = this.stage.getChildById(hideName + i);
            rect.visible = false;

        }
    }



    hideCategory(type: number) {
        this.resetNiukou();
        let showBoxIds: string[] = [];
        let hideBoxIds: string[] = [];

        if ( type === 2) {
            // 识别矩形
            this.showRect('reginA', 'reginB');
            //this.drawRect(this.region, 'reginA');

            showBoxIds = ['bigBox1', 'bigBox2'];
            hideBoxIds = ['smallBox1', 'smallBox2', 'smallBox3'];

        } else {
            // 识别矩形
            this.showRect('reginB', 'reginA');
            //this.drawRect(this.region2, 'reginB');

            hideBoxIds = ['bigBox1', 'bigBox2'];
            showBoxIds = ['smallBox1', 'smallBox2', 'smallBox3'];
        }

        this.stage.children.forEach(item => {

            if ( hideBoxIds.indexOf((item as CustomView).id) >= 0 ) {
                (item as CustomView).visible = false;
            }

            if ( showBoxIds.indexOf((item as CustomView).id) >= 0) {
                (item as CustomView).visible = true;
            }

        });
    }



    
}

interface CustomView extends Hilo.View {
    type: string;
    startX: number;
    startY: number;
    orginX: number;
    orginY: number;
}


interface Region {
    x: number;
    y: number;
    width?: number;
    height?: number;
}

