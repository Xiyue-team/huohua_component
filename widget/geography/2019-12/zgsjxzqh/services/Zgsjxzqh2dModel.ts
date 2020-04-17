import { fabric } from 'fabric';
import { ViewModel } from '../../../2019-11/zgsjxzqh/ViewModel';

const chinaMap = require('../sub_static/china@2x.png');
const eastMap = require('../sub_static/east@2x.png');
const midMap = require('../sub_static/mid@2x.png');
const westMap = require('../sub_static/west@2x.png');
const eastNorthMap = require('../sub_static/eastNorth@2x.png');

const beijingMap = require('../sub_static/beijing.png');
const tianjinMap = require('../sub_static/tianjin.png');
const anhuiMap = require('../sub_static/anhui.png');
const aomenMap = require('../sub_static/aomen.gif');
const chongqingMap = require('../sub_static/chongqing.png');
const fujianMap = require('../sub_static/fujian.png');
const guangdongMap = require('../sub_static/guangdong.png');
const guangxiMap = require('../sub_static/guangxi.png');
const guizhouMap = require('../sub_static/guizhou.png');
const hainanMap = require('../sub_static/hainan.png');
const hebeiMap = require('../sub_static/hebei.png');
const henanMap = require('../sub_static/henan.png');
const heilongjiangMap = require('../sub_static/heilongjiang.png');
const hubeiMap = require('../sub_static/hubei.png');
const hunanMap = require('../sub_static/hunan.png');
const jiangsuMap = require('../sub_static/jiangsu.png');
const jiangxiMap = require('../sub_static/jiangxi.png');
const xizangMap = require('../sub_static/xizang.png');
const gansuMap = require('../sub_static/gansu.png');
const liaoningMap = require('../sub_static/liaoning.png');
const neimengguMap = require('../sub_static/neimenggu.png');
const ningxiaMap = require('../sub_static/ningxia.png');
const qinghaiMap = require('../sub_static/qinghai.png');
const shandongMap = require('../sub_static/shandong.png');
const shanghaiMap = require('../sub_static/shanghai.png');
const sichuanMap = require('../sub_static/sichuan.png');
const shanxi1Map = require('../sub_static/shanxi.png');
const shanxi2Map = require('../sub_static/shanxi.png');

const taiwanMap = require('../sub_static/taiwan.png');
const xianggangMap = require('../sub_static/xianggang.png');
const xinjiangMap = require('../sub_static/xinjiang.png');
const yunnanMap = require('../sub_static/yunnan.png');
const zhejiangMap = require('../sub_static/zhejiang.png');
const jilinMap = require('../sub_static/jilin.png');


export class Zgsjxzqh2dModel {
    private viewModel = (window.viewHandler.viewModel as ViewModel);
    private mapCanvas: fabric.Canvas;                      // 地图场景
    private panelCanvas: fabric.Canvas;                      // 控制面板

    private mapScale = 0.65;                      //地图面板宽度比例

    private firstButtonLeft = 0;  //第一个国家按钮的位置
    private firstButtonTop = 0;    //第一个国家按钮的位置
    private lastButtonLeft = 0;    //上一个按钮的左点；
    private lastButtonTop = 0;   //上一个按钮的高点；
    private lastButtonWidth = 0;    //上一个按钮的长度；

    private curButtonOnMap: fabric.Group; //被选中的button在地图canvas
    private curButtonOnPanel: fabric.Group; //被选中的button在面板canvas
    private aim: fabric.Object; //目标框；
    private isGetMoveBtn = false;   //是否选中国家按钮

    private mouseDownOnMap: { x: number, y: number };   // 鼠标在地图上按下的位置
    private panning = false;                            // 是否拖动地图
    private lockMap = false;                        //锁定地图位置
    private downProvince = false;                    //不许点击省份按钮
    private mapImg: fabric.Image;                        //地图


    private baseTops = new Array();
    private baseInfos: { text: string, type: string, kind: string, index: number }[];
    private eastInfos: {
        text: string, type: string, index: string, left: number, top: number,
        kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }[];

    private midInfos: {
        text: string, type: string, index: string, left: number, top: number,
        kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }[];

    private westInfos: {
        text: string, type: string, index: string, left: number, top: number,
        kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }[];

    private eastNorthInfos: {
        text: string, type: string, index: string, left: number, top: number,
        kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }[];

    /**
     * 场景缩放比例
     */
    private scaleValue = new ScaleValue();

    private resizeZoom = 0;
    private commentText1: fabric.Text;
    private commentText2: fabric.Text;


    /**
    * 构造函数
    * @param {string} container 载体 html容器id
    */
    constructor(container: string, can: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container, can);
        this.initInfo();
        this.initMap();
        this.initBaseButton();
    }

    private initStage(container: string, can: string) {
        this.mapCanvas = new fabric.Canvas(container, { selection: false, preserveObjectStacking: true });
        this.panelCanvas = new fabric.Canvas(can, { selection: false, preserveObjectStacking: true });

        this.mapCanvas.setHeight(window.innerHeight);
        this.mapCanvas.setWidth(window.innerWidth * this.mapScale);
        this.panelCanvas.setHeight(window.innerHeight);
        this.panelCanvas.setWidth(window.innerWidth * (1 - this.mapScale));
        this.viewModel.display = 'none';
    }


    private initInfo() {
        this.baseInfos = [{ text: window.env.browserInfo.lang.east, type: '01', kind: 'base', index: 1 },
        { text: window.env.browserInfo.lang.mid, type: '02', kind: 'base', index: 2 },
        { text: window.env.browserInfo.lang.west, type: '03', kind: 'base', index: 3 },
        { text: window.env.browserInfo.lang.eastNorth, type: '04', kind: 'base', index: 4 }];

        this.eastInfos = [{
            text: window.env.browserInfo.lang.beijing.text, type: '01', index: '00', left: 1310, top: 605, kind: 'btn',
            nickname: window.env.browserInfo.lang.beijing.nickname,
            intro: window.env.browserInfo.lang.beijing.intro,
            provinceCapital: window.env.browserInfo.lang.beijing.provinceCapital, direction: 'left',
            pic: beijingMap, level: window.env.browserInfo.lang.beijing.level
        },
        {
            text: window.env.browserInfo.lang.tianjin.text, type: '01', index: '01', left: 1352, top: 628, kind: 'btn',
            nickname: window.env.browserInfo.lang.tianjin.nickname,
            intro: window.env.browserInfo.lang.tianjin.intro, provinceCapital: '', direction: 'right',
            pic: tianjinMap, level: window.env.browserInfo.lang.tianjin.level
        },
        {
            text: window.env.browserInfo.lang.hebei.text, type: '01', index: '02', left: 1280, top: 683, kind: 'btn',
            nickname: window.env.browserInfo.lang.hebei.nickname,
            intro: window.env.browserInfo.lang.hebei.intro,
            provinceCapital: window.env.browserInfo.lang.hebei.provinceCapital, direction: 'left',
            pic: hebeiMap, level: window.env.browserInfo.lang.hebei.level
        },
        {
            text: window.env.browserInfo.lang.shanghai.text, type: '01', index: '03', left: 1523, top: 905, kind: 'btn',
            nickname: window.env.browserInfo.lang.shanghai.nickname,
            intro: window.env.browserInfo.lang.shanghai.intro,
            provinceCapital: window.env.browserInfo.lang.shanghai.provinceCapital, direction: 'right',
            pic: shanghaiMap, level: window.env.browserInfo.lang.shanghai.level
        },
        {
            text: window.env.browserInfo.lang.jiangsu.text, type: '01', index: '04', left: 1440, top: 885, kind: 'btn',
            nickname: window.env.browserInfo.lang.jiangsu.nickname,
            intro: window.env.browserInfo.lang.jiangsu.intro,
            provinceCapital: window.env.browserInfo.lang.jiangsu.provinceCapital, direction: 'left',
            pic: jiangsuMap, level: window.env.browserInfo.lang.jiangsu.level
        },
        {
            text: window.env.browserInfo.lang.zhejiang.text, type: '01', index: '05', left: 1470, top: 940, kind: 'btn',
            nickname: window.env.browserInfo.lang.zhejiang.nickname,
            intro: window.env.browserInfo.lang.zhejiang.intro,
            provinceCapital: window.env.browserInfo.lang.zhejiang.provinceCapital, direction: 'left',
            pic: zhejiangMap, level: window.env.browserInfo.lang.zhejiang.level
        },
        {
            text: window.env.browserInfo.lang.fujian.text, type: '01', index: '06', left: 1473, top: 1100, kind: 'btn',
            nickname: window.env.browserInfo.lang.fujian.nickname,
            intro: window.env.browserInfo.lang.fujian.intro,
            provinceCapital: window.env.browserInfo.lang.fujian.provinceCapital, direction: 'left',
            pic: fujianMap, level: window.env.browserInfo.lang.fujian.level
        },
        {
            text: window.env.browserInfo.lang.shandong.text, type: '01', index: '07', left: 1360, top: 725, kind: 'btn',
            nickname: window.env.browserInfo.lang.shandong.nickname,
            intro: window.env.browserInfo.lang.shandong.intro,
            provinceCapital: window.env.browserInfo.lang.shandong.provinceCapital, direction: 'right',
            pic: shandongMap, level: window.env.browserInfo.lang.shandong.level
        },
        {
            text: window.env.browserInfo.lang.guangdong.text, type: '01', index: '08', left: 1280, top: 1223, kind: 'btn',
            nickname: window.env.browserInfo.lang.guangdong.nickname,
            intro: window.env.browserInfo.lang.guangdong.intro,
            provinceCapital: window.env.browserInfo.lang.guangdong.provinceCapital, direction: 'left',
            pic: guangdongMap, level: window.env.browserInfo.lang.guangdong.level
        },
        {
            text: window.env.browserInfo.lang.hainan.text, type: '01', index: '09', left: 1190, top: 1350, kind: 'btn',
            nickname: window.env.browserInfo.lang.hainan.nickname,
            intro: window.env.browserInfo.lang.hainan.intro,
            provinceCapital: window.env.browserInfo.lang.hainan.provinceCapital, direction: 'right',
            pic: hainanMap, level: window.env.browserInfo.lang.hainan.level
        },
        {
            text: window.env.browserInfo.lang.taiwan.text, type: '01', index: '10', left: 1550, top: 1130, kind: 'btn',
            nickname: window.env.browserInfo.lang.taiwan.nickname,
            intro: window.env.browserInfo.lang.taiwan.intro,
            provinceCapital: window.env.browserInfo.lang.taiwan.provinceCapital, direction: 'right',
            pic: taiwanMap, level: window.env.browserInfo.lang.taiwan.level
        },
        {
            text: window.env.browserInfo.lang.xianggang.text, type: '01', index: '11', left: 1314, top: 1260, kind: 'btn',
            nickname: window.env.browserInfo.lang.xianggang.nickname,
            intro: window.env.browserInfo.lang.xianggang.intro,
            provinceCapital: window.env.browserInfo.lang.xianggang.provinceCapital, direction: 'right',
            pic: xianggangMap, level: window.env.browserInfo.lang.xianggang.level
        },
        {
            text: window.env.browserInfo.lang.aomen.text, type: '01', index: '12', left: 1294, top: 1263, kind: 'btn',
            nickname: window.env.browserInfo.lang.aomen.nickname,
            intro: window.env.browserInfo.lang.aomen.intro,
            provinceCapital: window.env.browserInfo.lang.aomen.provinceCapital, direction: 'left',
            pic: aomenMap, level: window.env.browserInfo.lang.aomen.level
        }
        ];

        this.midInfos = [{
            text: window.env.browserInfo.lang.shanxi1.text, type: '02', index: '00', left: 1235, top: 685, kind: 'btn',
            nickname: window.env.browserInfo.lang.shanxi1.nickname,
            intro: window.env.browserInfo.lang.shanxi1.intro,
            provinceCapital: window.env.browserInfo.lang.shanxi1.provinceCapital, direction: 'right',
            pic: shanxi1Map, level: window.env.browserInfo.lang.shanxi1.level
        },
        {
            text: window.env.browserInfo.lang.anhui.text, type: '02', index: '01', left: 1380, top: 890, kind: 'btn',
            nickname: window.env.browserInfo.lang.anhui.nickname,
            intro: window.env.browserInfo.lang.anhui.intro,
            provinceCapital: window.env.browserInfo.lang.anhui.provinceCapital, direction: 'right',
            pic: anhuiMap, level: window.env.browserInfo.lang.anhui.level
        },
        {
            text: window.env.browserInfo.lang.jiangxi.text, type: '02', index: '02', left: 1363, top: 1015, kind: 'btn',
            nickname: window.env.browserInfo.lang.jiangxi.nickname,
            intro: window.env.browserInfo.lang.jiangxi.intro,
            provinceCapital: window.env.browserInfo.lang.jiangxi.provinceCapital, direction: 'right',
            pic: jiangxiMap, level: window.env.browserInfo.lang.jiangxi.level
        },
        {
            text: window.env.browserInfo.lang.henan.text, type: '02', index: '03', left: 1258, top: 800, kind: 'btn',
            nickname: window.env.browserInfo.lang.henan.nickname,
            intro: window.env.browserInfo.lang.henan.intro,
            provinceCapital: window.env.browserInfo.lang.henan.provinceCapital, direction: 'left',
            pic: henanMap, level: window.env.browserInfo.lang.henan.level
        },
        {
            text: window.env.browserInfo.lang.hunan.text, type: '02', index: '04', left: 1258, top: 1035, kind: 'btn',
            nickname: window.env.browserInfo.lang.hunan.nickname,
            intro: window.env.browserInfo.lang.hunan.intro,
            provinceCapital: window.env.browserInfo.lang.hunan.provinceCapital, direction: 'left',
            pic: hunanMap, level: window.env.browserInfo.lang.hunan.level
        },
        {
            text: window.env.browserInfo.lang.hubei.text, type: '02', index: '05', left: 1300, top: 965, kind: 'btn',
            nickname: window.env.browserInfo.lang.hunan.nickname,
            intro: window.env.browserInfo.lang.hunan.intro,
            provinceCapital: window.env.browserInfo.lang.hunan.provinceCapital, direction: 'left',
            pic: hubeiMap, level: window.env.browserInfo.lang.hunan.level
        }
        ];

        this.westInfos = [{
            text: window.env.browserInfo.lang.shanxi2.text, type: '03', index: '00', left: 1050, top: 995, kind: 'btn',
            nickname: window.env.browserInfo.lang.shanxi2.nickname,
            intro: window.env.browserInfo.lang.shanxi2.intro,
            provinceCapital: window.env.browserInfo.lang.shanxi2.provinceCapital, direction: 'right',
            pic: shanxi2Map, level: window.env.browserInfo.lang.shanxi2.level
        },
        {
            text: window.env.browserInfo.lang.sichuan.text, type: '03', index: '01', left: 975, top: 970, kind: 'btn',
            nickname: window.env.browserInfo.lang.sichuan.nickname,
            intro: window.env.browserInfo.lang.sichuan.intro,
            provinceCapital: window.env.browserInfo.lang.sichuan.provinceCapital, direction: 'left',
            pic: sichuanMap, level: window.env.browserInfo.lang.sichuan.pic
        },
        {
            text: window.env.browserInfo.lang.guizhou.text, type: '03', index: '02', left: 1055, top: 1108, kind: 'btn',
            nickname: window.env.browserInfo.lang.guizhou.nickname,
            intro: window.env.browserInfo.lang.guizhou.intro,
            provinceCapital: window.env.browserInfo.lang.guizhou.provinceCapital, direction: 'right',
            pic: guizhouMap, level: window.env.browserInfo.lang.guizhou.level
        },
        {
            text: window.env.browserInfo.lang.chongqing.text, type: '03', index: '00', left: 1120, top: 823, kind: 'btn',
            nickname: window.env.browserInfo.lang.chongqing.nickname,
            intro: window.env.browserInfo.lang.chongqing.intro,
            provinceCapital: window.env.browserInfo.lang.chongqing.provinceCapital, direction: 'right',
            pic: chongqingMap, level: window.env.browserInfo.lang.chongqing.level
        },
        {
            text: window.env.browserInfo.lang.yunnan.text, type: '03', index: '04', left: 912, top: 1160, kind: 'btn',
            nickname: window.env.browserInfo.lang.yunnan.nickname,
            intro: window.env.browserInfo.lang.yunnan.intro,
            provinceCapital: window.env.browserInfo.lang.yunnan.provinceCapital, direction: 'left',
            pic: yunnanMap, level: window.env.browserInfo.lang.yunnan.level
        },
        {
            text: window.env.browserInfo.lang.gansu.text, type: '03', index: '05', left: 965, top: 770, kind: 'btn',
            nickname: window.env.browserInfo.lang.gansu.nickname,
            intro: window.env.browserInfo.lang.gansu.intro,
            provinceCapital: window.env.browserInfo.lang.gansu.provinceCapital, direction: 'right',
            pic: gansuMap, level: window.env.browserInfo.lang.gansu.level
        },
        {
            text: window.env.browserInfo.lang.guangxi.text, type: '03', index: '06', left: 1120, top: 1235, kind: 'btn',
            nickname: window.env.browserInfo.lang.guangxi.nickname,
            intro: window.env.browserInfo.lang.guangxi.intro,
            provinceCapital: window.env.browserInfo.lang.guangxi.provinceCapital, direction: 'right',
            pic: guangxiMap, level: window.env.browserInfo.lang.guangxi.level
        },
        {
            text: window.env.browserInfo.lang.qinghai.text, type: '03', index: '07', left: 905, top: 745, kind: 'btn',
            nickname: window.env.browserInfo.lang.qinghai.nickname,
            intro: window.env.browserInfo.lang.qinghai.intro,
            provinceCapital: window.env.browserInfo.lang.qinghai.provinceCapital, direction: 'left',
            pic: qinghaiMap, level: window.env.browserInfo.lang.qinghai.level
        },
        {
            text: window.env.browserInfo.lang.xizang.text, type: '03', index: '08', left: 550, top: 965, kind: 'btn',
            nickname: window.env.browserInfo.lang.xizang.nickname,
            intro: window.env.browserInfo.lang.xizang.intro,
            provinceCapital: window.env.browserInfo.lang.xizang.provinceCapital, direction: 'left',
            pic: xizangMap, level: window.env.browserInfo.lang.xizang.level
        },
        {
            text: window.env.browserInfo.lang.neimenggu.text, type: '03', index: '09', left: 1200, top: 590, kind: 'btn',
            nickname: window.env.browserInfo.lang.neimenggu.nickname,
            intro: window.env.browserInfo.lang.neimenggu.intro,
            provinceCapital: window.env.browserInfo.lang.neimenggu.provinceCapital, direction: 'right',
            pic: neimengguMap, level: window.env.browserInfo.lang.neimenggu.level
        },
        {
            text: window.env.browserInfo.lang.ningxia.text, type: '03', index: '10', left: 1048, top: 670, kind: 'btn',
            nickname: window.env.browserInfo.lang.ningxia.nickname,
            intro: window.env.browserInfo.lang.ningxia.intro,
            provinceCapital: window.env.browserInfo.lang.ningxia.provinceCapital, direction: 'left',
            pic: ningxiaMap, level: window.env.browserInfo.lang.ningxia.level
        },
        {
            text: window.env.browserInfo.lang.xinjiang.text, type: '03', index: '11', left: 530, top: 440, kind: 'btn',
            nickname: window.env.browserInfo.lang.xinjiang.nickname,
            intro: window.env.browserInfo.lang.xinjiang.intro,
            provinceCapital: window.env.browserInfo.lang.xinjiang.provinceCapital, direction: 'right',
            pic: xinjiangMap, level: window.env.browserInfo.lang.xinjiang.level
        }
        ];

        this.eastNorthInfos = [{
            text: window.env.browserInfo.lang.liaoning.text, type: '04', index: '00', left: 1510, top: 510, kind: 'btn',
            nickname: window.env.browserInfo.lang.liaoning.nickname,
            intro: window.env.browserInfo.lang.liaoning.intro,
            provinceCapital: window.env.browserInfo.lang.liaoning.provinceCapital, direction: 'left',
            pic: liaoningMap, level: window.env.browserInfo.lang.liaoning.level
        },
        {
            text: window.env.browserInfo.lang.jilin.text, type: '04', index: '01', left: 1538, top: 430, kind: 'btn',
            nickname: window.env.browserInfo.lang.jilin.nickname,
            intro: window.env.browserInfo.lang.jilin.intro,
            provinceCapital: window.env.browserInfo.lang.jilin.provinceCapital, direction: 'right',
            pic: jilinMap, level: window.env.browserInfo.lang.jilin.level
        },
        {
            text: window.env.browserInfo.lang.heilongjiang.text, type: '04', index: '02', left: 1557, top: 358, kind: 'btn',
            nickname: window.env.browserInfo.lang.heilongjiang.nickname,
            intro: window.env.browserInfo.lang.heilongjiang.intro,
            provinceCapital: window.env.browserInfo.lang.heilongjiang.provinceCapital, direction: 'left',
            pic: heilongjiangMap, level: window.env.browserInfo.lang.heilongjiang.level
        }
        ];
    }

    /**
     * 初始化基础按钮
     */
    private initBaseButton() {

        this.baseInfos.forEach(item => {
            const text = new fabric.Text(
                item.text, {
                fontFamily: '微软雅黑',
                fontSize: this.panelCanvas.getHeight() * 0.02,
                left: window.innerWidth * 0.15
            });

            const rect = new fabric.Rect({
                width: window.innerWidth * (1 - this.mapScale - 0.04),
                height: window.innerHeight * 0.06,
                fill: '#FFFFFF',
                rx: 8,
                ry: 8,
                shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
                stroke: 'rgba(0,0,0,0.10)',
                strokeWidth: 0.5,
                left: window.innerWidth * 0.02
            });
            if (item.type === '01') {
                text.top = this.panelCanvas.getHeight() * 0.35;
                rect.top = this.panelCanvas.getHeight() * 0.33;
            } else if (item.type === '02') {
                text.top = this.panelCanvas.getHeight() * 0.44;
                rect.top = this.panelCanvas.getHeight() * 0.42;
            } else if (item.type === '03') {
                text.top = this.panelCanvas.getHeight() * 0.53;
                rect.top = this.panelCanvas.getHeight() * 0.51;
            } else {
                text.top = this.panelCanvas.getHeight() * 0.63;
                rect.top = this.panelCanvas.getHeight() * 0.61;
            }
            const button = new fabric.Group([rect, text]);
            this.baseTops.push(button.top);
            button.on('mousedown', () => {
                this.mouseDownBaseButton(item);
            }).selectable = false;
            button.hasControls = false;
            button.data = item;
            // this.panelCanvas.setZoom(this.scaleValue.pScale);
            this.panelCanvas.add(button);
        });

    }
    /**
     * 初始化按钮面板
     * @param content 
     */
    private initPanel(index: number, name: string) {
        let type = '00';
        let panelHeight = 0;
        let panelTop1 = 0;
        let panelTop2 = 0;
        let panelTop3 = 0;
        let panelTop4 = 0;
        this.resizeZoom = this.mapCanvas.getWidth() / this.mapImg.width;
        if (index === 1) {

            const scale = 0.78 * this.resizeZoom / 0.5;
            const viewportTransform = [scale, 0, 0, scale, -650 * scale, -450 * scale];
            this.mapCanvas.setViewportTransform(viewportTransform);
            type = '01';
            panelHeight = window.innerHeight * 0.43;
            panelTop1 = window.innerHeight * 0.15;
            panelTop2 = window.innerHeight * 0.60;
            panelTop3 = window.innerHeight * 0.70;
            panelTop4 = window.innerHeight * 0.80;
        } else if (index === 2) {
            const scale = 0.78 * this.resizeZoom / 0.5;
            const viewportTransform = [scale, 0, 0, scale, -550 * scale, -360 * scale];
            this.mapCanvas.setViewportTransform(viewportTransform);
            type = '02';
            panelHeight = window.innerHeight * 0.26;
            panelTop2 = window.innerHeight * 0.33;
            panelTop1 = window.innerHeight * 0.23;
            panelTop3 = window.innerHeight * 0.61;
            panelTop4 = window.innerHeight * 0.70;

        } else if (index === 3) {
            const scale = 0.65 * this.resizeZoom / 0.5;
            const viewportTransform = [scale, 0, 0, scale, -130 * scale, -250 * scale];
            this.mapCanvas.setViewportTransform(viewportTransform);
            type = '03';
            panelHeight = window.innerHeight * 0.43;
            panelTop3 = window.innerHeight * 0.33;
            panelTop1 = window.innerHeight * 0.15;
            panelTop2 = window.innerHeight * 0.24;
            panelTop4 = window.innerHeight * 0.80;

        } else if (index === 4) {
            const scale = this.resizeZoom / 0.5;
            const viewportTransform = [scale, 0, 0, scale, -860 * scale, -72 * scale];
            this.mapCanvas.setViewportTransform(viewportTransform);
            type = '04';
            panelHeight = window.innerHeight * 0.17;
            panelTop4 = window.innerHeight * 0.55;
            panelTop1 = window.innerHeight * 0.28;
            panelTop2 = window.innerHeight * 0.37;
            panelTop3 = window.innerHeight * 0.46;
        }
        this.removePanel();

        // 文字
        const text = new fabric.Text(
            name, {
            fontFamily: '微软雅黑',
            fontSize: this.panelCanvas.getWidth() * 0.07,
            left: window.innerWidth * 0.13
        });

        // 面板图形
        const panel = new fabric.Rect({
            width: window.innerWidth * (1 - this.mapScale - 0.04),
            height: panelHeight,
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) 2px 2px 4px',
            stroke: 'rgba(0,0,0,0.10)',
            strokeWidth: 0.5,
            left: window.innerWidth * 0.02
        });

        // 关闭按钮
        const close = new fabric.Circle({
            radius: 12,
            originX: 'center',
            originY: 'center',
            fill: '#FFFFFF',
            shadow: 'rgba(0,0,0,0.10) 2px 2px 4px',
            stroke: 'rgba(0,0,0,0.10)',
            strokeWidth: 0.5,
            left: window.innerWidth * 0.3,
        });

        // ’X'关闭按钮中的x号
        const x = new fabric.Text(
            'X', {
            fontFamily: '微软雅黑',
            fontSize: 15,
            left: close.left - 5,
            fill: 'rgba(0,0,0,0.20)'
        });

        if (type === '01') {
            panel.top = panelTop1;
        } else if (type === '02') {
            panel.top = panelTop2;
        } else if (type === '03') {
            panel.top = panelTop3;
        } else if (type === '04') {
            panel.top = panelTop4;
        }

        text.top = panel.top + window.innerHeight * 0.03;
        close.top = panel.top + window.innerHeight * 0.04;

        x.top = close.top - 8;
        const closeButton = new fabric.Group([close, x]);
        closeButton.data = { type: type, kind: 'close' };
        closeButton.on('mousedown', () => {
            this.resize();
        });
        closeButton.hasControls = false;
        closeButton.selectable = false;
        closeButton.lockRotation = true;
        closeButton.lockScalingFlip = true;

        const groupPanel = new fabric.Group([panel, text]);
        groupPanel.selectable = false;
        groupPanel.data = { type: type, kind: 'panel' };

        this.panelCanvas.add(groupPanel);
        this.panelCanvas.add(closeButton);

        // 移动其他框的位置
        const objs = this.panelCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            if (typeof (obj.data) !== 'undefined' && obj.data.kind === 'base') {
                if (obj.data.type === '01') {
                    obj.top = panelTop1;
                } else if (obj.data.type === '02') {
                    obj.top = panelTop2;
                } else if (obj.data.type === '03') {
                    obj.top = panelTop3;
                } else if (obj.data.type === '04') {
                    obj.top = panelTop4;
                }
                obj.setCoords();
            }
        }

        this.commentText1 = new fabric.Text(
            window.env.browserInfo.lang.comment1, {
            fontFamily: '微软雅黑',
            fontSize: this.panelCanvas.getHeight() * 0.02,
            left: window.innerWidth * 0.02,
            top: window.innerHeight * 0.08,
            visible: false
        });
        this.commentText2 = new fabric.Text(
            window.env.browserInfo.lang.comment2, {
            fontFamily: '微软雅黑',
            fontSize: this.panelCanvas.getHeight() * 0.02,
            left: window.innerWidth * 0.02,
            top: window.innerHeight * 0.08,
            visible: false
        });
        this.panelCanvas.add(this.commentText1);
        this.panelCanvas.add(this.commentText2);


        this.initButton(type, groupPanel.top);
    }


    private removePanel() {
        const objs = this.panelCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            // 移除已加载的panel
            if (typeof (obj.data) !== 'undefined') {
                if (obj.data.kind === 'base') {
                    obj.top = this.baseTops[obj.data.index - 1];
                    obj.setCoords();
                } else {
                    this.panelCanvas.remove(obj);
                }
            }
        }
        this.panelCanvas.remove(this.commentText1);
        this.panelCanvas.remove(this.commentText2);
    }

    /**
     * 重置场景
     * 
     */
    public reset() {
        this.removePanel();
        this.closeComment();
        this.lockMap = false;
        const viewportTransform = [this.mapCanvas.getWidth() / this.mapImg.width, 0,
            0, this.mapCanvas.getWidth() / this.mapImg.width, 0, 0];
        this.mapCanvas.setViewportTransform(viewportTransform);

        //      移除已显示的省份地图
        const os = this.mapCanvas.getObjects();
        for (let idx = 0; idx < os.length; idx++) {
            const obj = os[idx];
            if (typeof (obj.data) !== 'undefined' 
                && (obj.data.kind === 'shadow' || obj.data.kind === 'map' || obj.data.kind === 'space'
                    || obj.data.kind === 'line' || obj.data.kind === 'in')) {
                this.mapCanvas.remove(obj);
            }
        }
        this.closeProvinceDetail();
    }

    private getInfos(type: string): {
        text: string, type: string, index: string, left: number, top: number,
        kind: string, nickname: string, intro: string, provinceCapital: string, direction: string, pic: string, level: string,
    }[] {
        let infos: {
            text: string, type: string, index: string, left: number, top: number, kind: string, nickname: string,
            intro: string, provinceCapital: string, direction: string, pic: any, level: string
        }[];
        if (type === '01') {
            infos = this.eastInfos;
        } else if (type === '02') {
            infos = this.midInfos;
        } else if (type === '03') {
            infos = this.westInfos;
        } else if (type === '04') {
            infos = this.eastNorthInfos;
        }
        return infos;
    }

    /**
 * 初始化panel上的省份按钮
 */
    private initButton(type: string, panelTop: number) {
        this.firstButtonLeft = window.innerWidth * 0.035;  //第一个国家按钮的位置
        this.firstButtonTop = panelTop + window.innerHeight * 0.07;    //第一个国家按钮的位置
        this.lastButtonLeft = this.firstButtonLeft;
        this.lastButtonTop = this.firstButtonTop;
        this.lastButtonWidth = 0;
        let left = this.lastButtonLeft;
        let top = this.lastButtonTop;
        let i = 0;
        const parent = this;
        const infos = this.getInfos(type);

        infos.forEach(item => {
            if (type === '03') {
                if (i === 0 || i === 4 || i === 7 || i === 10) {
                    left = parent.firstButtonLeft;
                    top = parent.lastButtonTop + window.innerHeight * 0.03;
                } else {
                    left = parent.lastButtonLeft + parent.lastButtonWidth + window.innerHeight * 0.008;
                }
            } else {
                if (i === 0 || i === 4 || i === 8 || i === 11) {
                    left = parent.firstButtonLeft;
                    top = parent.lastButtonTop + window.innerHeight * 0.03;
                } else {
                    left = parent.lastButtonLeft + parent.lastButtonWidth + window.innerHeight * 0.008;
                }
            }
            parent.initPanelButton(left, top, item, true);
            parent.initPanelButton(left, top, item, false);
            i++;
        });
    }

    /**
     * 初始化国家按钮
     */
    private initPanelButton(left: number, top: number, item: {
        text: string, type: string, index: string, left: number, top: number, kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }, isBg: boolean): fabric.Group {
        const text = new fabric.Text(
            item.text, {
            fontFamily: '微软雅黑',
            fontSize: window.innerHeight * 0.024,
            left: left + window.innerWidth * 0.013,
            top: top + window.innerHeight * 0.01
        });
        const bWidth = text.width + window.innerWidth * 0.013 * 2;
        const bHeight = text.height + window.innerHeight * 0.01 * 2;

        const button = new fabric.Rect({
            width: bWidth,
            height: bHeight,
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) -2px 2px 5px',
            stroke: 'rgba(0,0,0,0.10)',
            strokeWidth: 0.5,
            left: left,
            top: top
        });
        const groupButton = new fabric.Group([button, text]);
        groupButton.data = item;

        groupButton.hasControls = false;
        groupButton.lockRotation = true;
        groupButton.lockScalingFlip = true;
        if (isBg) {
            text.fill = 'rgba(0,0,0,0.20)';
            groupButton.selectable = false;
        } else {
            groupButton.on('mousedown', () => {
                this.mouseDowProvinceButton(groupButton);
            }).on('mouseup', () => {
                this.mouseUpProvinceButton(groupButton);
            }).on('mousemove', (event) => {
                const mapPoint = this.mapCanvas.getPointer(event.e);
                const panelPoint = this.panelCanvas.getPointer(event.e);
                this.mouseMoveProvinceButton(groupButton, mapPoint, panelPoint);
            });
        }
        this.panelCanvas.add(groupButton);
        this.lastButtonWidth = groupButton.width;
        this.lastButtonLeft = groupButton.left;
        this.lastButtonTop = groupButton.top + groupButton.height;

        return groupButton;
    }

    /**
     * 初始化在地图上的国家按钮
     */
    private initMapButton(left: number, top: number, item: {
        text: string, type: string, index: string, left: number, top: number, kind: string, nickname: string,
        intro: string, provinceCapital: string, direction: string,
        pic: string, level: string
    }): fabric.Group {
        const text = new fabric.Text(
            item.text, {
            fontFamily: '微软雅黑',
            fontSize: 16,
            left: left + 16,
            top: top + 11
        });
        const bWidth = text.width + 16 * 2;
        const bHeight = text.height + 11 * 2;

        const button = new fabric.Rect({
            width: bWidth,
            height: bHeight,
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) -2px 2px 5px',
            stroke: 'rgba(0,0,0,0.10)',
            strokeWidth: 0.5,
            left: left,
            top: top
        });
        const groupButton = new fabric.Group([button, text]);
        groupButton.data = item;

        groupButton.hasControls = false;
        groupButton.lockRotation = true;
        groupButton.lockScalingFlip = true;
        this.mapCanvas.add(groupButton);
        return groupButton;
    }

    // 国家按钮是否移动到对应国家的空白框
    private mouseUpProvinceButton(groupButton: fabric.Group) {
        if (!this.downProvince) {
            return;
        }
        this.isGetMoveBtn = false;
        this.panning = true;

        if (typeof (this.curButtonOnMap) === 'undefined' || typeof (this.curButtonOnPanel) === 'undefined') {
            return;
        }

        // 判断目标框是否与国家按钮接触
        if (this.aim.intersectsWithObject(this.curButtonOnMap) || this.curButtonOnMap.intersectsWithObject(this.aim)) {
            this.curButtonOnMap.left = this.aim.left;
            this.curButtonOnMap.top = this.aim.top;
            this.aim.visible = false;
            this.mapCanvas.remove(this.aim);
            this.curButtonOnMap.selectable = false;
            this.curButtonOnMap.data.kind = 'in';
            const btnInMap = this.initMapButton(this.curButtonOnMap.left, this.curButtonOnMap.top, this.curButtonOnMap.data);
            this.mapCanvas.add(btnInMap);

            btnInMap.on('mousedown', () => {
                this.showProvinceDetail(btnInMap.data.pic, btnInMap.data.text,
                    btnInMap.data.nickname, btnInMap.data.provinceCapital,
                    btnInMap.data.intro, btnInMap.data.level);
            });

            this.panelCanvas.remove(this.curButtonOnPanel);
            this.mapCanvas.remove(this.curButtonOnMap);
            this.curButtonOnPanel = null;
            this.curButtonOnMap = null;
            this.showComment2();
        } else {
            this.mapCanvas.remove(this.curButtonOnMap);
            this.curButtonOnMap = null;
            // this.panelCanvas.add(this.curButtonOnPanel);
            this.curButtonOnPanel.visible = true;
            this.panelCanvas.remove(groupButton);
        }


        const objects = this.mapCanvas.getObjects();
        for (let idx = objects.length - 1; idx >= 0; idx--) {
            const object = objects[idx];
            if (typeof (object.data) !== 'undefined' && object.visible === true && object.data.kind === 'space') {
                object.set({ fill: '#FFFFFF' });

            }
        }

        this.mapCanvas.renderAll();
    }

    // 鼠标选中某个国家的按钮
    private mouseDowProvinceButton(panelButton: fabric.Group) {
        this.downProvince = true;

        this.curButtonOnMap = this.initMapButton(panelButton.left, panelButton.top, panelButton.data);

        this.curButtonOnPanel = this.initPanelButton(panelButton.left, panelButton.top, panelButton.data, false);
        this.curButtonOnPanel.visible = false;
        this.curButtonOnMap.visible = false;
        const zoom = this.mapCanvas.getZoom();
        panelButton.set({
            width: panelButton.width * zoom,
            height: panelButton.height * zoom
        });

        const btns = panelButton.getObjects();
        for (let idx = 0; idx < btns.length; idx++) {
            const btn = btns[idx];
            const rectSize = { width: 0, height: 0, top: 0, left: 0 };
            if (btn.type === 'rect') {
                const rect = btn as fabric.Rect;
                rect.visible = false;
                rectSize.height = rect.height;
                rectSize.width = rect.width;
                rectSize.top = rect.top;
                rectSize.left = rect.left;

                rect.set({
                    width: rect.width * zoom,
                    height: rect.height * zoom,
                    left: rectSize.left * zoom,
                    top: rectSize.top * zoom
                });
                rect.setCoords();
            }
            if (btn.type === 'text') {
                const text = btn as fabric.Text;
                text.set({
                    width: text.width * zoom,
                    height: text.height * zoom,
                    fontSize: text.fontSize * zoom,
                    left: rectSize.left * zoom + (rectSize.width * zoom - text.width * zoom) / 2,
                    top: rectSize.top * zoom + (rectSize.height * zoom - text.height * zoom) / 2
                });
                text.setCoords();
            }

        }
        panelButton.bringToFront();
        panelButton.setCoords();
        this.panelCanvas.renderAll();


        this.isGetMoveBtn = true;

        const objects = this.mapCanvas.getObjects();

        for (let idx = objects.length - 1; idx >= 0; idx--) {
            const object = objects[idx];
            if (typeof (object.data) !== 'undefined' && object.data.kind === 'space'
                && object.data.index === panelButton.data.index
                && object.data.type === panelButton.data.type) {
                this.aim = object;
            }
        }
        this.mapCanvas.renderAll();

    }
    // 鼠标移动某个国家的按钮
    private mouseMoveProvinceButton(panelButton: fabric.Group, mapPoint: { x: number, y: number }, panelPoint: { x: number, y: number }) {
        if (this.isGetMoveBtn === false) {
            return;
        }
        panelButton.left = panelPoint.x;
        panelButton.top = panelPoint.y;
        this.curButtonOnMap.left = mapPoint.x;
        this.curButtonOnMap.top = mapPoint.y;
        this.curButtonOnMap.visible = true;
        this.curButtonOnMap.bringForward();
        this.curButtonOnMap.setCoords();

        const objects = this.mapCanvas.getObjects();
        for (let idx = objects.length - 1; idx >= 0; idx--) {
            const object = objects[idx];
            // 判断目标框是否与国家按钮接触
            if (typeof (object.data) !== 'undefined' && object.visible === true && object.data.kind === 'space'
                && object.data.text !== this.aim.data.text) {
                if (object.intersectsWithObject(this.curButtonOnMap) || this.curButtonOnMap.intersectsWithObject(object)) {
                    object.set({ fill: '#FF3030' });
                } else {
                    object.set({ fill: '#FFFFFF' });
                }
            }
        }
    }

    private removeAreaFromMap(type: string) {
        //      移除已显示的省份地图
        const objs = this.mapCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            if (typeof (obj.data) !== 'undefined' && obj.data.type !== type
                && (obj.data.kind === 'shadow' || obj.data.kind === 'map' || obj.data.kind === 'space'
                    || obj.data.kind === 'line' || obj.data.kind === 'in')) {
                this.mapCanvas.remove(obj);
            }
        }
    }

    // 初始化省地图
    private initAreaMap(type: string) {
        const parent = this;

        this.removeAreaFromMap(type);
        let AreaMap = '';
        if (type === '01') {
            AreaMap = eastMap;
        } else if (type === '02') {
            AreaMap = midMap;
        } else if (type === '03') {
            AreaMap = westMap;
        } else if (type === '04') {
            AreaMap = eastNorthMap;
        }
        const rect = new fabric.Rect({
            width: this.mapImg.width,
            height: this.mapImg.height,
            fill: 'rgba(0,0,0,0.50)',
            rx: 8,
            ry: 8,
            left: 0,
            top: 0,
            selectable: false
        });
        rect.data = { type: type, kind: 'shadow' };
        this.mapCanvas.add(rect);

        fabric.Image.fromURL(AreaMap, function (img) {
            parent.mapCanvas.add(img);
            const data = { type: type, kind: 'map' };
            img.data = data;
            img.selectable = false;
            parent.initProvinceSpace(type);
            parent.mapCanvas.renderAll();
        });
    }
    /**
     * 初始化省份框
     * @param type 类型
     */
    private initProvinceSpace(type: string) {
        //      移除已显示的省份框
        const objs = this.mapCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            // 移除已省份框
            if (typeof (obj.data) !== 'undefined' && obj.data.type !== type && obj.data.kind === 'space') {
                this.mapCanvas.remove(obj);
            }
        }
        const infos = this.getInfos(type);
        infos.forEach(item => {
            let rectLeft = 0;
            let lineEndLeft = 0;
            if (item.direction === 'left') {
                rectLeft = item.left - 100 - 80;
                lineEndLeft = item.left - 100;
            } else if (item.direction === 'right') {
                rectLeft = item.left + 100;
                lineEndLeft = item.left + 100;
            }

            const line = new fabric.Line([lineEndLeft, item.top, item.left, item.top], {
                fill: '#FFFFFF',
                stroke: '#FFFFFF',
                strokeWidth: 5,
                shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
                selectable: false,
                evented: false,
            });

            const rect = new fabric.Rect({
                width: 80,
                height: 38,
                fill: '#FFFFFF',
                rx: 8,
                ry: 8,
                shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
                stroke: 'rgba(0,0,0,0.10)',
                strokeWidth: 0.5,
                left: rectLeft,
                top: item.top - 38 / 2,
                selectable: false
            });
            rect.on('mousedown', () => {
                this.showProvinceDetail(item.pic, item.text, item.nickname, item.provinceCapital, item.intro, item.level);

            });
            rect.data = {
                text: item.text,
                type: item.type, index: item.index,
                kind: 'space', nickname: item.nickname,
                intro: item.intro,
                provinceCapital: item.provinceCapital
            };
            rect.setCoords();
            line.data = {
                type: item.type,
                index: item.index,
                kind: 'line',
            };
            this.mapCanvas.add(rect);
            this.mapCanvas.add(line);
        });

    }
    // 初始化地图
    private initMap() {
        const parent = this;
        fabric.Image.fromURL(chinaMap, function (img) {
            parent.mapCanvas.add(img);
            img.sendToBack();
            parent.mapImg = img;
            img.selectable = false;
            parent.resizeZoom = parent.mapCanvas.getWidth() / img.width;
            parent.mapCanvas.setZoom(parent.resizeZoom);
            parent.mapCanvas.renderAll();
        });
        // 缩放地图
        this.mapCanvas.on('mouse:wheel', (e) => {
            if (this.lockMap) {
                return;
            }
            parent.panning = false;
            if (e && e.e) {
                const mouse: any = e.e;
                const minScale = parent.mapCanvas.getWidth() / parent.mapImg.width;
                let zoom = (mouse.deltaY > 0 ? 0.1 : -0.1) + this.mapCanvas.getZoom();
                zoom = Math.max(minScale, zoom);
                zoom = Math.min(5, zoom);

                const zoomPoint = new fabric.Point(mouse.pageX, mouse.pageY);
                this.mapCanvas.zoomToPoint(zoomPoint, zoom);

                // 缩小操作，控制地图出现白边
                if (mouse.deltaY < 0) {
                    const vp = this.mapCanvas.viewportTransform;
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
                    const scale = this.mapCanvas.getZoom();
                    const maxWidth = this.mapImg.getScaledWidth() * scale;  // 地图最大宽度
                    const maxHeight = this.mapImg.getScaledHeight() * scale; // 地图最大高度
                    if (tx < this.mapCanvas.getWidth() - maxWidth) {
                        tx = this.mapCanvas.getWidth() - maxWidth;
                        flag = true;
                    }
                    if (ty < this.mapCanvas.getHeight() - maxHeight) {
                        ty = this.mapCanvas.getHeight() - maxHeight;
                        flag = true;
                    }
                    if (flag) {
                        const viewportTransform = [scale, 0, 0, scale, tx, ty];
                        this.mapCanvas.setViewportTransform(viewportTransform);
                    }
                }

            }
        });
        this.mapCanvas.on('mouse:down', (e) => {
            if (parent.lockMap) {
                parent.panning = false;
            } else {
                parent.panning = true;
            }
            const mouse: any = e.e;
            parent.mouseDownOnMap = {
                x: mouse.pageX,
                y: mouse.pageY
            };
        });
        this.mapCanvas.on('mouse:up', (e) => {
            parent.panning = false;
        });
        this.mapCanvas.on('mouse:move', (e) => {
            if (parent.lockMap) {
                return;
            }
            if (parent.panning && !parent.lockMap && e && e.e) {
                const mouse: any = e.e;
                const mousePoint = {
                    x: mouse.pageX,
                    y: mouse.pageY
                };
                const dX = mousePoint.x - parent.mouseDownOnMap.x;
                const dY = mousePoint.y - parent.mouseDownOnMap.y;
                const vp = this.mapCanvas.viewportTransform;
                const scale = this.mapCanvas.getZoom();
                const maxWidth = this.mapImg.getScaledWidth() * scale;  // 地图最大宽度
                const maxHeight = this.mapImg.getScaledHeight() * scale; // 地图最大高度
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
                if (tx < this.mapCanvas.getWidth() - maxWidth) {
                    tx = this.mapCanvas.getWidth() - maxWidth;
                }
                if (ty < this.mapCanvas.getHeight() - maxHeight) {
                    ty = this.mapCanvas.getHeight() - maxHeight;
                }
                const viewportTransform = [scale, 0, 0, scale, tx, ty];
                this.mapCanvas.setViewportTransform(viewportTransform);
                this.mouseDownOnMap = mousePoint;
            }
        });


    }



    /**
     * 点击基础按钮
     */
    private mouseDownBaseButton(item: { text: string, type: string, kind: string, index: number }) {
        this.panning = false;
        this.lockMap = true;
        this.downProvince = false;
        this.initPanel(item.index, item.text);
        this.initAreaMap(item.type);

        this.showComment1();
        document.getElementById('title').style.color = '#FFFFFF';
    }

    /**
     * 显示注释
     */
    private showComment1() {
        // 请将省份名称拖至对应白框处
        this.commentText1.visible = true;
        this.commentText2.visible = false;
    }

    /**
     * 显示注释2
     */
    private showComment2() {
        // 请点击左图中文字框查看对应详情
        this.commentText1.visible = false;
        this.commentText2.visible = true;
    }

    /**
     * 关闭注释
     */
    private closeComment() {
        // 请点击左图中文字框查看对应详情
        if (typeof(this.commentText2) !== 'undefined' || typeof(this.commentText1) !== 'undefined' ) {
            this.commentText1.visible = false;
            this.commentText2.visible = false;
        }

        document.getElementById('title').style.color = '#000000';
    }

    /**
     * 显示省份简介
     * @param provinceMap 地图路径
     * @param province 名称
     * @param nickname 简称
     * @param provincialCapital 省会
     * @param introduction 简介
     */
    private showProvinceDetail(provinceMap: string, province: string,
        nickname: string, provincialCapital: string, introduction: string, level: string) {
        this.viewModel.provinceMap = provinceMap;
        if (level === window.env.browserInfo.lang.level.province) {
            this.viewModel.province = window.env.browserInfo.lang.levelName.province + province;
            this.viewModel.provincialCapital = window.env.browserInfo.lang.levelName.province + provincialCapital;
        } else if (level === window.env.browserInfo.lang.level.area1) {
            this.viewModel.province = window.env.browserInfo.lang.levelName.area1 + province;
            this.viewModel.provincialCapital = '首府：' + provincialCapital;
        } else if (level === window.env.browserInfo.lang.level.city) {
            this.viewModel.province = window.env.browserInfo.lang.levelName.city + province;
            this.viewModel.provincialCapital = '';
        } else if (level === window.env.browserInfo.lang.level.area2) {
            this.viewModel.province = window.env.browserInfo.lang.levelName.area2 + province;
            this.viewModel.provincialCapital = '';
        }
        this.viewModel.nickname = window.env.browserInfo.lang.levelName.short + nickname;
        this.viewModel.introduction = window.env.browserInfo.lang.levelName.intro + introduction;
        this.viewModel.display = 'block';
        document.getElementById('reset').style.display = 'none';

    }
    /**
     * 关闭省份简介
     */
    public closeProvinceDetail() {
        this.viewModel.display = 'none';
        document.getElementById('reset').style.display = 'block';
    }

     

    /**
 * 重置窗口大小
 */
    resize() {

        this.reset();
        this.scaleValue = new ScaleValue();
        this.mapCanvas.setHeight(window.innerHeight);
        this.mapCanvas.setWidth(window.innerWidth * this.mapScale);
        this.resizeZoom = this.mapCanvas.getWidth() / this.mapImg.width;
        this.mapCanvas.setZoom(this.resizeZoom);

        this.panelCanvas.setHeight(window.innerHeight);
        this.panelCanvas.setWidth(window.innerWidth * (1 - this.mapScale));

        // 重置基础按钮的尺寸和位置
        const objs = this.panelCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            if (typeof (obj.data) !== 'undefined' && obj.data.kind === 'base') {
                this.panelCanvas.remove(obj);
            }
        }
        this.initBaseButton();

    }

}

/**
 * 计算缩放比例
 */
export class ScaleValue {
    public mScale: number;
    public pScale: number;
    constructor() {
        const mapRatio = window.innerWidth / window.innerHeight;
        if (mapRatio > (16 / 9)) {
            this.mScale = window.innerWidth / 1200;
            this.pScale = window.innerWidth / 1200;
        } else {
            this.mScale = window.innerHeight / 675;
            this.pScale = window.innerHeight / 675;
        }
        this.mScale = this.mScale * 0.5 / 1.2;

    }
}
