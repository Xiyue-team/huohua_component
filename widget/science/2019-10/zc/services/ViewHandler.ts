import { Stage } from 'konva';

import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import Hilo from 'hilojs';
import * as rulerImgPath from '../sub_static/ruler.png';
import * as pointImgPath from '../sub_static/point.png';

export class ViewHandler extends CommonViewHandler implements ViewHandler {

    gameWidth = 1200;
    gameHeight = 675;
    stageScaleX: number;
    stageScaleY: number;
    stage: Hilo.Stage;

    POINTER_END = (Hilo.event as Hilo.EventType).POINTER_END;
    POINTER_START = (Hilo.event as Hilo.EventType).POINTER_START;
    POINTER_MOVE = (Hilo.event as Hilo.EventType).POINTER_MOVE;

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
        // scale the canvas
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        this.stage.scaleX = newWidth / this.gameWidth;
        this.stage.scaleY = newHeight / this.gameHeight;
    }

    /**
     * 重置界面
     */
    reset():  void {
    }


    init() {
         this.stageScaleX = document.getElementById('2dContainer').clientWidth / this.gameWidth;
        this.stageScaleY = document.getElementById('2dContainer').clientHeight / this.gameHeight;


        this.stage = new Hilo.Stage({
            renderType: 'canvas',
            container: document.getElementById('2dContainer'),
            width:  this.gameWidth,
            height: this.gameHeight,
        });
        this.resize();

        const ticker = new Hilo.Ticker(60);
        ticker.addTick(this.stage);
        ticker.start();


        //尺子
        const ruler = new Hilo.Bitmap({
            image: rulerImgPath
        }).addTo(this.stage);
        ruler.x = this.gameWidth / 2 - 510;
        ruler.y = 257 + 50;
        ruler.scaleX = 0.5;
        ruler.scaleY = 0.5;

        
        // 文字
        const tipText = new Hilo.Text({
            id: 'score',
            color: '#FFFFFF',
            text: '0cm',
            x: 82,
            y: 181 + 50 ,
            font : '18px arial'
        }).addTo(this.stage);
        //tipText.setFont('font-size:16px');

        // 点
        const point = new Hilo.Bitmap({
            image: pointImgPath
        }).addTo(this.stage);
        point.x = 80;
        point.y = 207 + 50;

        let status = false;
        let newX = 0;
        let newText = '0cm';
        point.on(this.POINTER_START, () => {
            status = true;
        });

        this.stage.on(this.POINTER_MOVE, (e: any) => {
            if (e.eventTarget.id === 'Bitmap3') {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
            if (status === true) {
                newX = Math.round(e.stageX) - 20;
                if (newX <= 80) {
                    newX = 80;
                } else if ( newX >= 1081) {
                    newX = 1081;
                }
                newText = ((newX - 80 ) / 50).toFixed(1);
                
                (tipText as Hilo.Text).text = newText + 'cm';
                tipText.x = newX;
                point.x = newX;
            }
            e.preventDefault();
            e.stopPropagation();
        });

        this.stage.on(this.POINTER_END, () => {
            status = false;
 
        });
        

        this.stage.enableDOMEvent(this.POINTER_START, true);
        this.stage.enableDOMEvent(this.POINTER_MOVE, true);
        this.stage.enableDOMEvent(this.POINTER_END, true);


        window.addEventListener('resize', () => {
            this.resize();
        });

    }


    
}
