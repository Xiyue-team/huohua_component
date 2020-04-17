import Hammer from 'hammerjs';
import { ViewModel } from './../ViewModel';
import {fabric} from 'fabric';
import Swiper from 'swiper';

const mapPng = require('../sub_static/map.png');
const centerLinePng = require('../sub_static/centerLine.png');
const westLinePng = require('../sub_static/westLine.png');
const eastLinePng = require('../sub_static/eastLine.png');
const jdslsnPng = require('../sub_static/jdslsn.jpg');
const dphskPng = require('../sub_static/dphsk.jpg');
const tjbdgsdPng = require('../sub_static/tjbdgsd.jpg');
const djksk1Png = require('../sub_static/djksk1.jpg');
const djksk2Png = require('../sub_static/djksk2.jpg');
const btchtjcPng = require('../sub_static/btchtjc.jpg');
const ghdxbdqPng = require('../sub_static/ghdxbdq.jpg');


export class Nsbdgc2dModel {
    private canvas: fabric.Canvas;                      // 场景
    private eastLine: fabric.Image;                     // 东线
    private centerLine: fabric.Image;                   // 中线
    private westLine: fabric.Image;                     // 西线
    private centerLineHotsport: fabric.Circle[];        // 中线热点
    private eastLineHotsport: fabric.Circle[];          // 东线热点
    private westLineHotsport: fabric.Circle[];          // 西线热点
    private centerLineHotsportBtns: fabric.Circle[];    // 中线热点点击的按钮
    private eastLineHotsportBtns: fabric.Circle[];      // 东线热点点击的按钮
    private westLineHotsportBtns: fabric.Circle[];      // 西线热点点击的按钮
    private swiper: Swiper;                             // 轮播图控件
    private panning = false;                            // 是否拖动
    private mouseDownPostion: {x: number, y: number};   // 鼠标按下的位置
    private map: fabric.Image;                          // 地图
    private hotspotConfig: fabric.ICircleOptions = {
        selectable: false,
        hoverCursor: 'pointer',
        shadow: 'rgba(0,0,0,0.5) 0px 2px 6px',
        radius: 10,
        fill: '#0086E0',
        stroke: '#FFFFFF',
        strokeWidth: 2,
        visible: false
    };
    private hotspotBtnConfig: fabric.ICircleOptions = {
        selectable: false,
        hoverCursor: 'pointer',
        radius: 15,
        fill: 'rgba(0,0,0,0)',
        visible: false
    };
    private hotsportSwiperContent: {[propName: string]: any[]} = {
        jdslsn: [{
            tip: {
                title: window.env.browserInfo.lang.pictureDesciript.east[0][0].title,
                description: window.env.browserInfo.lang.pictureDesciript.east[0][0].description,
                width: 392,
                align: 'tl' // tr：右上角 tl：左上角 bl：左下角 br：右下角
            },
            image: jdslsnPng
        }],  // 江都水利枢纽
        dphsk: [{
            tip: {
                title: window.env.browserInfo.lang.pictureDesciript.east[1][0].title,
                description: window.env.browserInfo.lang.pictureDesciript.east[1][0].description,
                width: 330,
                align: 'br'
            },
            image: dphskPng
        }], // 大平湖水库
        tjbdgsd: [{
            tip: {
                title: window.env.browserInfo.lang.pictureDesciript.east[2][0].title,
                description: window.env.browserInfo.lang.pictureDesciript.east[2][0].description,
                width: 488,
                align: 'br'
            },
            image: tjbdgsdPng
        }], // 北大港湿地公园
        djksk: [
            {
                tip: {
                    title: window.env.browserInfo.lang.pictureDesciript.center[0][0].title,
                    description: window.env.browserInfo.lang.pictureDesciript.center[0][0].description,
                    width: 448,
                    align: 'tl'
                },
                image: djksk1Png
            },
            {
                tip: {
                    title: window.env.browserInfo.lang.pictureDesciript.center[0][1].title,
                    description: window.env.browserInfo.lang.pictureDesciript.center[0][1].description,
                    width: 448,
                    align: 'tl'
                },
                image: djksk2Png
            }
        ], // 丹江口书库
        bjtchtjc: [{
            tip: {
                title: window.env.browserInfo.lang.pictureDesciript.center[1][0].title,
                description: window.env.browserInfo.lang.pictureDesciript.center[1][0].description,
                width: 428,
                align: 'tl'
            },
            image: btchtjcPng
        }], // 北京团城湖调节池
        ghdxbdq: [{
            tip: {
                title: window.env.browserInfo.lang.pictureDesciript.west[0][0].title,
                description: window.env.browserInfo.lang.pictureDesciript.west[0][0].description,
                width: 428,
                align: 'br'
            },
            image: ghdxbdqPng
        }] //干旱的西北地区
    };                                                  // 热点轮播图内容信息  

    /**
     * 场景缩放比例
     */
    private scaleValue = new ScaleValue();

    // 是否手机端
    private isMobile = (window.viewHandler.viewModel as ViewModel).isMobile;

    /**
     * 场景缩放比例
     */
    /**
     * 构造函数
     * @param {string} container 载体 html容器id
     */
    constructor(container: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container);
    }

    /**
     * 初始化场景
     */
    private async initStage(container: string) {
        this.canvas = new fabric.Canvas(container, {selection: false, preserveObjectStacking: true});
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);

        this.map = await this.loadImage(mapPng, {
            left: 0, 
            top: 0,
            scaleX:  0.5,
            scaleY:  0.5,
            selectable: false
        });
        this.canvas.add(this.map);
        //鼠标按下
        this.canvas.on('mouse:down', (e) => {
            this.panning = true;
            this.mouseDownPostion = this.canvas.getPointer(e.e);
        });
    
        //鼠标抬起
        this.canvas.on('mouse:up', (e) => {
            this.panning = false;
        });

        const hammer = new Hammer(document.body);
        hammer.get('pinch').set({
            enable: true
        });
        hammer.on('pinchout', ev => {
            this.pinch(ev);
        });
        hammer.on('pinchin', ev => {
            this.pinch(ev);
        });
    
        // 鼠标滚轮事件
        this.canvas.on('mouse:wheel', (e) => {
            if (e && e.e) {
                const mouse: any = e.e;
                const minScale = this.scaleValue.scale;
                let zoom = (mouse.deltaY > 0 ? 0.1 : -0.1) + this.canvas.getZoom();
                zoom = Math.max(minScale, zoom);  //最小为原来的1/10
                zoom = Math.min(5, zoom);    //最大是原来的5倍
                const zoomPoint = new fabric.Point(mouse.pageX, mouse.pageY);
                this.canvas.zoomToPoint(zoomPoint, zoom);
                // 缩小操作，控制地图出现白边
                if (mouse.deltaY < 0) {
                    const vp = this.canvas.viewportTransform;
                    let tx = vp[4];
                    let ty = vp[5];
                    let flag = false;
                    // 超出左上角边界处理
                    if (tx > 0) {
                        tx = 0;
                        flag = true;
                    }
                    if (ty > 0) {
                        ty = 0;
                        flag = true;
                    }
                    // 超出右下角边界处理
                    const scale = this.canvas.getZoom();
                    const maxWidth = this.map.getScaledWidth() * scale;  // 地图最大宽度
                    const maxHeight = this.map.getScaledHeight() * scale; // 地图最大高度
                    if (tx < window.innerWidth - maxWidth) {
                        tx = window.innerWidth - maxWidth;
                        flag = true;
                    }
                    if (ty < window.innerHeight - maxHeight) {
                        ty = window.innerHeight - maxHeight;
                        flag = true;
                    }
                    if (flag) {
                        const viewportTransform = [scale, 0, 0, scale, tx, ty];
                        this.canvas.setViewportTransform(viewportTransform);
                    }
                }
            }
        });

        //鼠标移动
        this.canvas.on('mouse:move', (e) => {
            if (this.panning && e && e.e) {
                const mousePoint = this.canvas.getPointer(e.e);
                const dX = (mousePoint.x - this.mouseDownPostion.x) * 0.4;
                const dY = (mousePoint.y - this.mouseDownPostion.y) * 0.4;
                if (Math.abs(dX) < 5 && Math.abs(dY) < 5) {
                    return;
                }
                const vp = this.canvas.viewportTransform;
                const scale = this.canvas.getZoom();
                const maxWidth = this.map.getScaledWidth() * scale;  // 地图最大宽度
                const maxHeight = this.map.getScaledHeight() * scale; // 地图最大高度
                let tx = dX + vp[4];
                let ty = dY + vp[5];
                 // 超出左上角边界处理
                if (tx > 0) {
                    tx = 0;
                }
                if (ty > 0) {
                    ty = 0;
                }
                // 超出右下角边界处理
                if (tx < window.innerWidth - maxWidth) {
                    tx = window.innerWidth - maxWidth;
                }
                if (ty < window.innerHeight - maxHeight) {
                    ty = window.innerHeight - maxHeight;
                }
                const viewportTransform = [scale, 0, 0, scale, tx, ty];
                this.canvas.setViewportTransform(viewportTransform);
                this.mouseDownPostion = mousePoint;
            }
        });

        this.initLine();
        this.initSwiper();
    }

    private pinch(ev: HammerInput) {
        if (ev) {
            const minScale = this.scaleValue.scale;
            let zoom = (ev.type === 'pinchout' ? 0.05 : -0.05) + this.canvas.getZoom();
            zoom = Math.max(minScale, zoom);  //最小为原来的1/10
            zoom = Math.min(5, zoom);    //最大是原来的5倍
            const zoomPoint = new fabric.Point(ev.center.x, ev.center.y);
            this.canvas.zoomToPoint(zoomPoint, zoom);
            // 缩小操作，控制地图出现白边
            if (ev.type === 'pinchin') {
                const vp = this.canvas.viewportTransform;
                let tx = vp[4];
                let ty = vp[5];
                let flag = false;
                // 超出左上角边界处理
                if (tx > 0) {
                    tx = 0;
                    flag = true;
                }
                if (ty > 0) {
                    ty = 0;
                    flag = true;
                }
                // 超出右下角边界处理
                const scale = this.canvas.getZoom();
                const maxWidth = this.map.getScaledWidth() * scale;  // 地图最大宽度
                const maxHeight = this.map.getScaledHeight() * scale; // 地图最大高度
                if (tx < window.innerWidth - maxWidth) {
                    tx = window.innerWidth - maxWidth;
                    flag = true;
                }
                if (ty < window.innerHeight - maxHeight) {
                    ty = window.innerHeight - maxHeight;
                    flag = true;
                }
                if (flag) {
                    const viewportTransform = [scale, 0, 0, scale, tx, ty];
                    this.canvas.setViewportTransform(viewportTransform);
                }
            }
        }
    }

    /**
     * 初始化线
     */
    private async initLine() {
        const lineConfig = {
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            visible: false
        };
        // 东线
        this.eastLine = await this.loadImage(eastLinePng, Object.assign({
            left: 846, 
            top: 131,
        }, lineConfig));
        // 中线
        this.centerLine = await this.loadImage(centerLinePng, Object.assign({
            left: 686, 
            top: 86,
        }, lineConfig));
        // 西线
        this.westLine = await this.loadImage(westLinePng, Object.assign({
            left: 41, 
            top: 449,
        }, lineConfig));
        this.canvas.add(this.eastLine, this.centerLine, this.westLine);

        this.initHotspot();
    }

    /**
     * 初始化热点
     */
    private initHotspot() {
        // 东线
        const jdslsn = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 1036,
            top: 449
        }));
        const jdslsnBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 1031,
            top: 444
        }));
        jdslsnBtn.on('mousedown', () => {
            this.showHotsportContent('jdslsn');
        });
        const dphsk = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 874,
            top: 266
        }));
        const dphskBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 869,
            top: 261
        }));
        dphskBtn.on('mousedown', () => {
            this.showHotsportContent('dphsk');
        });
        const tjbdgsd = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 888,
            top: 98
        }));
        const tjbdgsdBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 883,
            top: 93
        }));
        tjbdgsdBtn.on('mousedown', () => {
            this.showHotsportContent('tjbdgsd');
        });
        this.eastLineHotsport = [jdslsn, dphsk, tjbdgsd];
        this.eastLineHotsportBtns = [jdslsnBtn, dphskBtn, tjbdgsdBtn];
        this.canvas.add(jdslsn, dphsk, tjbdgsd, jdslsnBtn, dphskBtn, tjbdgsdBtn);


        // 中线按钮
        const djksk = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 668, top: 466
        }));
        const djkskBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 663, top: 461
        }));
        djkskBtn.on('mousedown', () => {
            this.showHotsportContent('djksk');
        });
        const bjtchtjc = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 814, top: 65
        }));
        const bjtchtjcBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 809, top: 60
        }));
        bjtchtjcBtn.on('mousedown', () => {
            this.showHotsportContent('bjtchtjc');
        });
        this.centerLineHotsport = [djksk, bjtchtjc];
        this.centerLineHotsportBtns = [djkskBtn, bjtchtjcBtn];
        this.canvas.add(djksk, bjtchtjc, djkskBtn, bjtchtjcBtn);


        // 西线按钮
        const ghdxbdq = new fabric.Circle(Object.assign({} , this.hotspotConfig, {
            left: 230,
            top: 418
        }));
        const ghdxbdqBtn = new fabric.Circle(Object.assign({} , this.hotspotBtnConfig, {
            left: 225,
            top: 413
        }));
        ghdxbdqBtn.on('mousedown', () => {
            this.showHotsportContent('ghdxbdq');
        });
        this.westLineHotsport = [ghdxbdq];
        this.westLineHotsportBtns = [ghdxbdqBtn];
        this.canvas.add(ghdxbdq, ghdxbdqBtn);
    }

    /**
     * 初始化轮播图
     */
    private initSwiper() {
        this.swiper = new Swiper('.swiper-container', {
            loop: false,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            navigation: {
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            },
        });
    }

    /**
     * 显示热点内容
     * @param type 同hotsportSwiperContent对象Key
     */
    private showHotsportContent(type: string) {
        const content = this.hotsportSwiperContent[type];
        let html = '';
        content.forEach(obj => {
            const position = this.getHotSportContentTipPosition(obj.tip.align);
            html += `<div class="swiper-slide">
                        <div style="width: 100%; height: 100%;">
                            <div style="width: 100%; height: 100%; display: flex;">
                                <img src="${obj.image}" width="100%" height="100%">
                            </div>
                            <div style="${position}" class="swiper-desc ${this.isMobile ? 'swiper-desc-m' : ''}">
                                <div class="swiper-desc-title ${this.isMobile ? 'swiper-desc-title-m' : ''}">
                                    ${obj.tip.title}
                                </div>
                                <div class="swiper-desc-content ${this.isMobile ? 'swiper-desc-content-m' : ''}">
                                    ${obj.tip.description}
                                </div>
                            </div>
                        </div>
                    </div>`;
        });
        const sw = document.getElementById('swiper-wrapper');
        document.getElementById('swiper').style.display = 'block';
        document.getElementById('btnCloseSwiper').style.display = 'block';
        sw.innerHTML = html;

        const next = document.querySelector('.swiper-button-next-custom') as HTMLElement;
        const prev = document.querySelector('.swiper-button-prev-custom') as HTMLElement;
        const pagination = document.querySelector('.swiper-pagination') as HTMLElement;
        if (content && content.length > 1) {
           next.style.display = 'block';
           prev.style.display = 'block';
           pagination.style.display = 'block';
        } else {
            next.style.display = 'none';
            prev.style.display = 'none';
            pagination.style.display = 'none';
        }
        this.swiper.slideTo(0, 0);
    }
    /**
     * 获取热点提示内容显示位置 
     * @param type  tr：右上角 tl：左上角 bl：左下角 br：右下角
     */
    private getHotSportContentTipPosition(type: string) {
        let disc = 45;
        if (this.isMobile) {
            disc = 24;
        }
        switch (type) {
            case 'tl':
                return `top: ${disc}px; left: ${disc}px`;
            case 'tr':
                return `top: ${disc}px; right: ${disc}px`;
            case 'bl':
                return `bottom: ${disc}px; left: ${disc}px`;
            case 'br':
                return `bottom: ${disc}px; right: ${disc}px`;
            default:
                return `left: ${disc}px; top: ${disc}px`;
        }
    }

    /**
     * 隐藏线和热点
     */
    private hideLineAndHotsport() {
        this.eastLine.visible = false;
        this.visibleHotsport('east', false);
        this.centerLine.visible = false;
        this.visibleHotsport('center', false);
        this.westLine.visible = false;
        this.visibleHotsport('west', false);
    }

    /**
     * 显示或隐藏热点
     * @param type  east：东线 center：中线 west：西线
     * @param visible true: 显示 false：隐藏
     */
    private visibleHotsport(type: string, visible: boolean) {
        if (type === 'east') {
            this.eastLineHotsport.forEach(hotsport => {
                hotsport.visible = visible;
            });
            this.eastLineHotsportBtns.forEach(hotsport => {
                hotsport.visible = visible;
            });
        } else if (type === 'center') {
            this.centerLineHotsport.forEach(hotsport => {
                hotsport.visible = visible;
            });
            this.centerLineHotsportBtns.forEach(hotsport => {
                hotsport.visible = visible;
            });
        } else if (type === 'west') {
            this.westLineHotsport.forEach(hotsport => {
                hotsport.visible = visible;
            });
            this.westLineHotsportBtns.forEach(hotsport => {
                hotsport.visible = visible;
            });
        }
    }

    /**
     * 显示线路描述文字
     * @param text 描述文字
     */
    private visibleLineDescription(text: string) {
       const lineDesc = document.getElementById('lineDescription');
       lineDesc.style.display = 'block';
       lineDesc.innerHTML = text;
    }

    /**
     * 线按钮点击事件
     * @param type east：东线 center：中线 west：西线
     */
    showLine(type: string) {
        this.hideLineAndHotsport();
        let description = ''; //线路描述文字
        this.visibleHotsport(type, true);
        const scale = this.canvas.getZoom();
        const maxWidth = this.map.getScaledWidth() * scale;  // 地图最大宽度
        const maxHeight = this.map.getScaledHeight() * scale; // 地图最大高度
        if (type === 'east') {
            this.eastLine.visible = true;
            description = window.env.browserInfo.lang.lineDescription.east;
            this.moveMap(window.innerWidth - maxWidth, window.innerHeight - maxHeight);
        } else if (type === 'center') {
            this.centerLine.visible = true;
            description = window.env.browserInfo.lang.lineDescription.center;
            this.moveMap((window.innerWidth - maxWidth) / 2, (window.innerHeight - maxHeight) / 2);
        } else if (type === 'west') {
            this.westLine.visible = true;
            description = window.env.browserInfo.lang.lineDescription.west;
            this.moveMap(0, (window.innerHeight - maxHeight) / 2);
        }
        this.visibleLineDescription(description);
        this.canvas.renderAll();
    }

    private moveMap(tx: number, ty: number) {
        const scale = this.canvas.getZoom();
        const viewportTransform = [scale, 0, 0, scale, tx, ty];
        this.canvas.setViewportTransform(viewportTransform);
    }

    /**
     * 关闭内容滑动插件
     */
    closeSwiper() {
        document.getElementById('swiper').style.display = 'none';
        document.getElementById('btnCloseSwiper').style.display = 'none';
    }

    /**
     * 重置场景
     */
    reset() {
        document.getElementById('lineDescription').style.display = 'none';
        this.hideLineAndHotsport();
        this.canvas.absolutePan(new fabric.Point(0, 0));
        this.canvas.setZoom(this.scaleValue.scale);
        this.canvas.renderAll();
        document.getElementById('swiper').style.display = 'none';
        document.getElementById('btnCloseSwiper').style.display = 'none';
    }

    /**
     * 重置窗口大小
     */
    resize() {
        const oscale = this.scaleValue.scale;
        this.scaleValue = new ScaleValue();
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setHeight(window.innerHeight);
        const zoom = this.canvas.getZoom();
        this.canvas.setZoom(this.scaleValue.scale * zoom / oscale);
    }

    /**
     * 加载图片
     * @param src 图片路径
     * @param imageConfig 图片配置属性
     */
    loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }
    
}



/**
 * 计算缩放比例
 */
export class ScaleValue {
    public scale: number;
    constructor() {
        const ratio = window.innerWidth / window.innerHeight;
        if (ratio > (16 / 9)) {
            this.scale = window.innerWidth / 1200;
        } else {
            this.scale = window.innerHeight / 675;
        }
    }
}
