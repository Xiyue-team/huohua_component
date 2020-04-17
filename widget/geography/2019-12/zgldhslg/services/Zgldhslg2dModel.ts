import { fabric } from 'fabric';

const mapPng = require('../sub_static/map@2x.png');

export class Zgldhslg2dModel {
    private mapCanvas: fabric.Canvas;                                                               // 地图场景
    private panelCanvas: fabric.Canvas;                                                             // 控制面板
    private nameFontScale = 0.02;                                                                   //地图国名字体高度比例 16/1200

    private windowHeight = window.innerHeight;
    private windowWidth = window.innerWidth;
    private mapScale = 0.65;                                                                        //地图面板宽度比例
    private mapWidth = this.windowWidth * this.mapScale;                                            //地图面板宽度

    private baseLeftSpaceScale = 0.01;                                                             //基础按钮与控制面板之间左边的留白。
    private ctrlOnsitePanelTop = 60;                                                                //邻国控制面板顶端

    private firstButtonLeft = this.windowWidth * this.mapScale + this.baseLeftSpaceScale + 10;      //第一个国家按钮的位置
    private firstButtonTop = this.ctrlOnsitePanelTop + 50;                                          //第一个国家按钮的位置
    private lastButtonLeft = this.firstButtonLeft;                                                  //上一个按钮的左点；
    private lastButtonTop = this.firstButtonTop;                                                    //上一个按钮的高点；
    private lastButtonWidth = 0;                                                                    //上一个按钮的长度；
    private lastButtonHeight = 0;                                                                   //上一个按钮的高度；

    private nationFontScale = 0.013;                                                                //按钮字体高度比例 16/1200
    private baseSpaceInWidthScale = 0.015;                                                          //按钮之间的空白比例
    private baseSpaceInHeightScale = 0.01;                                                          //按钮之间的空白比例

    private curButtonOnMap: fabric.Group;                                                           //被选中的button在地图canvas
    private curButtonOnPanel: fabric.Group;                                                         //被选中的button在面板canvas
    private aim: fabric.Object;                                                                     //目标框；
    private isGetMoveBtn = false;                                                                   //是否选中国家按钮

    private mouseDownOnMap: { x: number, y: number };                                               // 鼠标在地图上按下的位置
    private panning = false;                                                                        // 是否拖动地图
    private mapImg: fabric.Image;                                                                   //地图
    private onsiteBtn: fabric.Group;
    private offshoreBtn: fabric.Group;

    /**
 * 场景缩放比例
 */
    private scaleValue = new ScaleValue();
    private resizeZoom = 0;


    private baseInfos: { text: string, type: string, kind: string }[];
    private onsiteInfos: { text: string, type: string, index: string, left: number, top: number, kind: string }[];
    private offshoreInfos: { text: string, type: string, index: string, left: number, top: number, kind: string }[];


    /**
     * 构造函数
     * @param {string} container 载体 html容器id
     */
    constructor(container: string, can: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container, can);
        this.initMap();
        this.initPanel();
    }

    private initStage(container: string, can: string) {
        this.mapCanvas = new fabric.Canvas(container, { selection: false, preserveObjectStacking: true });
        this.panelCanvas = new fabric.Canvas(can, { selection: false, preserveObjectStacking: true });

        this.mapCanvas.setHeight(window.innerHeight);
        this.mapCanvas.setWidth(this.mapWidth);

        this.panelCanvas.setHeight(window.innerHeight);
        this.panelCanvas.setWidth(window.innerWidth - this.mapWidth);

        this.baseInfos = [{ text: window.env.browserInfo.lang.onsite, type: '01', kind: 'base' },
        { text: window.env.browserInfo.lang.offshore, type: '02', kind: 'base' }];

        this.onsiteInfos = [
            { text: window.env.browserInfo.lang.northkorea, type: '01', index: '01', left: 0.86, top: 0.28, kind: 'btn' },
            { text: window.env.browserInfo.lang.mongolia, type: '01', index: '02', left: 0.5, top: 0.2, kind: 'btn' },
            { text: window.env.browserInfo.lang.india, type: '01', index: '03', left: 0.05, top: 0.6, kind: 'btn' },
            { text: window.env.browserInfo.lang.bhutan, type: '01', index: '04', left: 0.25, top: 0.5, kind: 'btn' },
            { text: window.env.browserInfo.lang.burma, type: '01', index: '05', left: 0.35, top: 0.6, kind: 'btn' },
            { text: window.env.browserInfo.lang.vietnam, type: '01', index: '06', left: 0.54, top: 0.63, kind: 'btn' },
            { text: window.env.browserInfo.lang.russia, type: '01', index: '07', left: 0.51, top: 0.06, kind: 'btn' },
            { text: window.env.browserInfo.lang.laos, type: '01', index: '08', left: 0.49, top: 0.65, kind: 'btn' },
            { text: window.env.browserInfo.lang.afghanistan, type: '01', index: '09', left: 0, top: 0.27, kind: 'btn' },
            { text: window.env.browserInfo.lang.nepal, type: '01', index: '10', left: 0.17, top: 0.49, kind: 'btn' },
            { text: window.env.browserInfo.lang.kyrgyzstan, type: '01', index: '11', left: 0.03, top: 0.24, kind: 'btn' },
            { text: window.env.browserInfo.lang.pakistan, type: '01', index: '12', left: 0.01, top: 0.35, kind: 'btn' },
            { text: window.env.browserInfo.lang.tajikistan, type: '01', index: '13', left: 0.05, top: 0.2, kind: 'btn' },
            { text: window.env.browserInfo.lang.kazakhstan, type: '01', index: '14', left: 0.1, top: 0.1, kind: 'btn' }];
        this.offshoreInfos = [
            { text: window.env.browserInfo.lang.southkorea, type: '02', index: '01', left: 0.9, top: 0.33, kind: 'btn' },
            { text: window.env.browserInfo.lang.japan, type: '02', index: '02', left: 0.94, top: 0.38, kind: 'btn' },
            { text: window.env.browserInfo.lang.brunei, type: '02', index: '03', left: 0.72, top: 0.91, kind: 'btn' },
            { text: window.env.browserInfo.lang.philippine, type: '02', index: '04', left: 0.92, top: 0.82, kind: 'btn' },
            { text: window.env.browserInfo.lang.malaysia, type: '02', index: '05', left: 0.47, top: 0.92, kind: 'btn' },
            { text: window.env.browserInfo.lang.indonesia, type: '02', index: '06', left: 0.76, top: 0.96, kind: 'btn' }];
    }

    private initPanel() {
        this.initBaseButton();
    }

    /**
     * 初始化基础按钮
     */
    private initBaseButton(): fabric.Group {
        const parent = this;
        let button: fabric.Group;
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
                text.top = this.panelCanvas.getHeight() * 0.445;
                rect.top = this.panelCanvas.getHeight() * 0.426;
                parent.ctrlOnsitePanelTop = rect.top;
            } else if (item.type === '02') {
                text.top = this.panelCanvas.getHeight() * 0.545;
                rect.top = this.panelCanvas.getHeight() * 0.525;
            }

            button = new fabric.Group([rect, text]);

            if (item.type === '01') {
                this.onsiteBtn = button;
            } else {
                this.offshoreBtn = button;
            }


            button.on('mousedown', () => {
                this.mouseDownBaseButton(item.type);
            }).selectable = false;
            button.hasControls = false;
            button.data = item;
            this.panelCanvas.add(button);
        });
        return button;

    }

    /**
     * 初始化按钮面板
     * @param content 
     */
    private initNationButton(content: string, type: string): fabric.Group {

        let panelHeight = 0;
        let panelTop1 = 0;
        let panelTop2 = 0;
        let panelTop = 0;
        this.resizeZoom = this.mapCanvas.getWidth() / this.mapImg.width;
        if (type === '01') {
            panelHeight = window.innerHeight * 0.43;
            panelTop1 = window.innerHeight * 0.22;
            panelTop2 = window.innerHeight * 0.717;
            panelTop = panelTop1;
        } else if (type === '02') {
            panelHeight = window.innerHeight * 0.26;
            panelTop2 = window.innerHeight * 0.436;
            panelTop1 = window.innerHeight * 0.307;
            panelTop = panelTop2;
        }

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
            left: window.innerWidth * 0.02,
            top: panelTop
        });
        // 文字
        const text = new fabric.Text(
            content, {
            fontFamily: '微软雅黑',
            fontSize: this.panelCanvas.getHeight() * 0.03,
            left: window.innerWidth * 0.12,
            top: panelTop + window.innerHeight * 0.03,
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
            top: panelTop + window.innerHeight * 0.04
        });

        // ’X'关闭按钮中的x号
        const x = new fabric.Text(
            'X', {
            fontFamily: '微软雅黑',
            fontSize: 15,
            left: close.left - 5,
            fill: 'rgba(0,0,0,0.20)'
        });

        x.top = close.top - 8;
        const closeButton = new fabric.Group([close, x]);
        closeButton.data = { type: type, kind: 'close' };
        closeButton.on('mousedown', () => {
            this.resize();
        });
        closeButton.hasControls = false;
        closeButton.lockRotation = true;
        closeButton.lockScalingFlip = true;
        closeButton.selectable = false;
        const groupPanel = new fabric.Group([panel, text]);
        groupPanel.selectable = false;
        groupPanel.data = { type: type, kind: 'panel' };

        this.panelCanvas.add(groupPanel);
        this.panelCanvas.add(closeButton);

        // // 初始化按钮的背景图案
        this.initButton(true, type);
        this.initButton(false, type);

        // 移动其他框的位置
        const objs = this.panelCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            if (typeof (obj.data) !== 'undefined' && obj.data.kind === 'base') {
                if (obj.data.type === '01') {
                    obj.top = panelTop1;
                } else if (obj.data.type === '02') {
                    obj.top = panelTop2;
                }
                obj.setCoords();
            }
        }
        return groupPanel;
    }

    private closePanel() {
        const objs = this.panelCanvas.getObjects();
        for (let idx = 0; idx < objs.length; idx++) {
            const obj = objs[idx];
            if (typeof (obj.data) !== 'undefined' && typeof (obj.data.kind) !== 'undefined') {
                if (obj.data.kind !== 'base') {
                    this.panelCanvas.remove(obj);
                }
            }
        }
        this.onsiteBtn.top = window.innerHeight * 0.45;
        this.onsiteBtn.visible = true;
        this.onsiteBtn.setCoords();
        this.offshoreBtn.top = window.innerHeight * 0.55;
        this.offshoreBtn.visible = true;
        this.offshoreBtn.setCoords();

    }
    /**
    * 初始化面板上的国家按钮
    */
    private initButton(isBg: boolean, type: string) {
        let infors: {
            text: string, type: string, index: string, left: number, top: number, kind: string
        }[];
        this.firstButtonLeft = this.onsiteBtn.left + window.innerWidth * 0.01;  //第一个国家按钮的位置
        if (type === '01') {
            this.firstButtonTop = window.innerHeight * 0.31;    //第一个国家按钮的位置
            infors = this.onsiteInfos;
        } else if (type === '02') {
            this.firstButtonTop = window.innerHeight * 0.52;    //第一个国家按钮的位置
            infors = this.offshoreInfos;
        }

        this.lastButtonLeft = this.firstButtonLeft;
        this.lastButtonTop = this.firstButtonTop;
        this.lastButtonHeight = 0;
        this.lastButtonWidth = 0;
        let left = this.lastButtonLeft;
        let top = this.lastButtonTop;
        let i = 0;
        const parent = this;


        infors.forEach(item => {
            if (i === 0 || i === 4 || i === 8 || i === 11) {
                left = parent.firstButtonLeft;
                top = parent.lastButtonTop + parent.lastButtonHeight + window.innerHeight * 0.03;
            } else {
                left = parent.lastButtonLeft + parent.lastButtonWidth + window.innerWidth * 0.008;
            }
            const profile = new Profile();
            profile.index = item.index;
            profile.text = item.text;
            profile.type = item.type;
            profile.kind = item.kind;
            parent.initPanelButton(left, top, profile, isBg);
            i++;
        });
    }

    /**
     * 初始化国家按钮
     */
    private initPanelButton(left: number, top: number, profile: Profile, isBg: boolean): fabric.Group {
        const text = new fabric.Text(
            profile.text, {
            fontFamily: '微软雅黑',
            fontSize: window.innerHeight * 0.02,
            left: left + window.innerWidth * 0.015,
            top: top + window.innerHeight * 0.01
        });

        const button = new fabric.Rect({
            width: window.innerWidth * 0.015 * 2 + text.width,
            height: window.innerHeight * 0.01 * 2 + text.height,
            fill: '#FFFFFF',
            rx: 8,
            ry: 8,
            shadow: 'rgba(0,0,0,0.10) -2px 2px 5px',
            stroke: 'rgba(0,0,0,0.10)',
            strokeWidth: 0.5,
            left: left,
            top: top
        });
        // button.data = profile;
        const groupButton = new fabric.Group([button, text]);
        groupButton.data = profile;

        groupButton.hasControls = false;
        groupButton.lockRotation = true;
        groupButton.lockScalingFlip = true;
        if (isBg) {
            text.fill = 'rgba(0,0,0,0.20)';
            groupButton.selectable = false;
        } else {
            groupButton.on('mousedown', () => {
                this.isGetMoveBtn = false;
                this.mouseDownNationButton(groupButton);
            }).on('mouseup', () => {
                this.mouseUpNationButton(groupButton);
            }).on('mousemove', (event) => {
                const mapPoint = this.mapCanvas.getPointer(event.e);
                const panelPoint = this.panelCanvas.getPointer(event.e);
                this.mouseMoveNationButton(groupButton, mapPoint, panelPoint);
            });
        }
        this.panelCanvas.add(groupButton);
        groupButton.setCoords();
        this.lastButtonHeight = groupButton.height;
        this.lastButtonWidth = groupButton.width;
        this.lastButtonLeft = groupButton.left;
        this.lastButtonTop = groupButton.top;

        return groupButton;
    }

    /**
     * 初始化在地图上的国家按钮
     */
    private initMapButton(left: number, top: number, profile: Profile): fabric.Group {
        const text = new fabric.Text(
            profile.text, {
            fontFamily: '微软雅黑',
            fontSize: this.windowWidth * this.nationFontScale,
            left: left + this.baseSpaceInWidthScale * this.windowWidth,
            top: top + this.baseSpaceInHeightScale * this.windowHeight
        });
        const bWidth = text.width + this.baseSpaceInWidthScale * this.windowWidth * 2;
        const bHeight = text.height + this.baseSpaceInHeightScale * this.windowHeight * 2;

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
        groupButton.data = profile;

        groupButton.hasControls = false;
        groupButton.lockRotation = true;
        groupButton.lockScalingFlip = true;
        groupButton.visible = false;
        return groupButton;
    }

    // 国家按钮是否移动到对应国家的空白框
    private mouseUpNationButton(nationButton: fabric.Group) {
        if (!this.isGetMoveBtn) {
            return;
        }
        this.isGetMoveBtn = false;
        this.panning = false;
        nationButton.visible = false;
        if (typeof (this.curButtonOnMap) === 'undefined') {
            return;
        }
        this.aim.setCoords();
        this.curButtonOnMap.setCoords();

        const objects = this.mapCanvas.getObjects();

        // 初始化所有space
        for (let idx = objects.length - 1; idx >= 0; idx--) {
            const object = objects[idx];
            if (typeof (object.data) !== 'undefined' && object.visible === true && object.data.kind === 'space') {
                object.set({ fill: '#FFFFFF' });
            }
        }

        // 判断目标框是否与国家按钮接触
        if (this.aim.intersectsWithObject(this.curButtonOnMap) || this.curButtonOnMap.intersectsWithObject(this.aim)) {
            this.curButtonOnMap.left = this.aim.left;
            this.curButtonOnMap.top = this.aim.top;
            this.aim.visible = false;
            this.mapCanvas.remove(this.aim);
            this.curButtonOnMap.selectable = false;
            this.curButtonOnMap.data = this.aim.data;
            this.curButtonOnMap.data.kind = 'in';

            this.panelCanvas.remove(this.curButtonOnPanel);
            this.curButtonOnPanel.visible = false;
        } else {
            this.mapCanvas.remove(this.curButtonOnMap);
            this.curButtonOnMap = null;
            this.curButtonOnPanel.visible = true;
            this.panelCanvas.add(this.curButtonOnPanel);
            this.panelCanvas.remove(nationButton);


        }

        this.mapCanvas.renderAll();
    }

    // 鼠标选中某个国家的按钮
    private mouseDownNationButton(panelButton: fabric.Group) {

        // 在map上添加当前button
        this.curButtonOnMap = this.initMapButton(panelButton.left, panelButton.top, panelButton.data);
        this.mapCanvas.add(this.curButtonOnMap);
        this.curButtonOnPanel = this.initPanelButton(panelButton.left, panelButton.top, panelButton.data, false);
        const zoom = this.mapCanvas.getZoom();
        this.curButtonOnPanel.visible = false;

        const btns = panelButton.getObjects();
        for (let idx = 0; idx < btns.length; idx++) {
            const btn = btns[idx];
            const rectSize = { width: 0, height: 0, top: 0, left: 0 };
            if (btn.type === 'text') {
                const text = btn as fabric.Text;
                text.set({
                    width: text.width * zoom,
                    height: text.height * zoom,
                    fontSize: text.fontSize * zoom,
                    left: rectSize.left + (rectSize.width - text.width * zoom) / 2,
                    top: rectSize.top + (rectSize.height - text.height * zoom) / 2
                });
                text.setCoords();
                text.selectable = false;
                text.hasControls = false;
            }
            if (btn.type === 'rect') {
                const rect = btn as fabric.Rect;
                rect.set({
                    width: rect.width * zoom,
                    height: rect.height * zoom,
                    left: rectSize.left + (rectSize.width - rect.width * zoom) / 2,
                    top: rectSize.top + (rectSize.height - rect.height * zoom) / 2
                });
                rect.selectable = false;
                rect.hasControls = false;
                rect.setCoords();
                rectSize.height = rect.height;
                rectSize.width = rect.width;
                rectSize.top = rect.top;
                rectSize.left = rect.left;
            }
        }
        panelButton.set({
            width: panelButton.width * zoom,
            height: panelButton.height * zoom,
            selectable: false
        });
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
    private mouseMoveNationButton(panelButton: fabric.Group, mapPoint: { x: number, y: number }, panelPoint: { x: number, y: number }) {
        if (this.isGetMoveBtn === false) {
            return;
        }
        panelButton.left = panelPoint.x;
        panelButton.top = panelPoint.y;
        this.curButtonOnMap.left = mapPoint.x;
        this.curButtonOnMap.top = mapPoint.y;
        this.curButtonOnMap.visible = true;
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


        this.mapCanvas.renderAll();
    }

    // 初始化地图上的国名
    private initName() {
        const spaceInfos = this.onsiteInfos.concat(this.offshoreInfos);
        spaceInfos.forEach(item => {
            const name = new fabric.Text(
                item.text, {
                fontFamily: '微软雅黑',
                fontSize: window.innerWidth * this.nameFontScale,
                selectable: false,
                left: item.left * this.mapImg.width,
                top: item.top * this.mapImg.height,
            });
            item.kind = 'name';
            name.data = item;
            this.mapCanvas.add(name);
        });
    }

    // 初始化地图上的空框
    private initSpace(type: string) {
        let spaceInfos: { text: string, type: string, index: string, left: number, top: number, kind: string }[];

        this.removeSpace();
        if (type === '01') {
            spaceInfos = this.onsiteInfos;
        } else if (type === '02') {
            spaceInfos = this.offshoreInfos;
        }
        spaceInfos.forEach(item => {
            const space = new fabric.Rect({
                width: 0.06 * this.mapCanvas.getWidth(),
                height: 0.033 * this.mapCanvas.getHeight(),
                fill: '#FFFFFF',
                rx: 8,
                ry: 8,
                shadow: 'rgba(0,0,0,0.10) 0px 2px 4px',
                stroke: 'rgba(0,0,0,0.10)',
                strokeWidth: 0.5,
                left: Math.floor(item.left * this.mapImg.width),
                top: Math.floor(item.top * this.mapImg.height),
                selectable: false
            });

            const profile = new Profile();
            profile.index = item.index;
            profile.text = item.text;
            profile.type = item.type;
            profile.kind = 'space';

            space.data = profile;
            this.mapCanvas.add(space);
        });
    }

    private removeSpace() {
        const mapObjects = this.mapCanvas.getObjects();
        for (let idx = mapObjects.length - 1; idx >= 0; idx--) {
            const object = mapObjects[idx];
            if (typeof (object) !== 'undefined' && typeof (object.data) !== 'undefined') {
                // 移除地图上的type类型以外的国名框
                if (object.data.kind === 'name' || object.data.kind === 'space' || object.data.kind === 'in' ||
                    object.data.kind === 'space' || object.data.kind === 'in') {
                    this.mapCanvas.remove(object);
                }
            }
        }
    }

    // 初始化地图
    private initMap() {
        const parent = this;
        this.mapCanvas.setZoom(this.scaleValue.mScale);
        fabric.Image.fromURL(mapPng, function (img) {
            parent.mapCanvas.add(img);
            parent.mapImg = img;
            img.selectable = false;
            parent.resizeZoom = parent.mapCanvas.getWidth() / img.width;
            parent.mapCanvas.setZoom(parent.resizeZoom);
            parent.initName();
            parent.mapCanvas.renderAll();
        });

        // 缩放地图
        this.mapCanvas.on('mouse:wheel', (e) => {
            this.panning = false;
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
            this.panning = true;
            const mouse: any = e.e;
            this.mouseDownOnMap = {
                x: mouse.pageX,
                y: mouse.pageY
            };
        });
        this.mapCanvas.on('mouse:up', (e) => {
            this.panning = false;
        });
        this.mapCanvas.on('mouse:move', (e) => {
            if (this.panning && e && e.e) {
                const mouse: any = e.e;
                const mousePoint = {
                    x: mouse.pageX,
                    y: mouse.pageY
                };
                const dX = mousePoint.x - this.mouseDownOnMap.x;
                const dY = mousePoint.y - this.mouseDownOnMap.y;
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
        this.mapCanvas.preserveObjectStacking = true;
    }



    /**
* 点击基础按钮
*/
    private mouseDownBaseButton(type: string) {
        this.panning = false;
        this.isGetMoveBtn = false;
        this.closePanel();
        if (type === '01') {
            this.onsiteBtn.visible = false;
            this.offshoreBtn.visible = true;

            this.initNationButton(this.baseInfos[0].text, this.baseInfos[0].type);
        } else if (type === '02') {
            this.offshoreBtn.visible = false;
            this.onsiteBtn.visible = true;
            this.initNationButton(this.baseInfos[1].text, this.baseInfos[1].type);
        }

        this.initSpace(type);
        if (window.innerHeight > this.mapImg.width) {


            if (type === '01') {
                const viewportTransform = [this.mapCanvas.getZoom(), 0, 0, this.mapCanvas.getZoom(), 0, 0];
                this.mapCanvas.setViewportTransform(viewportTransform);
            } else if (type === '02') {
                const viewportTransform = [this.mapCanvas.getZoom(), 0, 0, this.mapCanvas.getZoom(), 0,
                this.mapCanvas.getHeight() - this.mapImg.getScaledHeight() * this.mapCanvas.getZoom()];
                this.mapCanvas.setViewportTransform(viewportTransform);
            }
        }
        this.panelCanvas.renderAll();
        this.mapCanvas.renderAll();
    }

    /**
     * 重置场景
     */
    reset() {
        this.removeSpace();
        this.initName();
        this.closePanel();
        this.onsiteBtn.visible = true;
        this.offshoreBtn.visible = true;

        const viewportTransform = [this.mapCanvas.getWidth() / this.mapImg.width, 0, 0,
        this.mapCanvas.getWidth() / this.mapImg.width, 0, 0];
        this.mapCanvas.setViewportTransform(viewportTransform);
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
 * 国家基本信息描述
 */
export class Profile {
    public text: string;
    public type: string;
    public index: string;
    public kind: string;
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
