/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/26 10:47
 */

import {CommonViewHandler} from "../../../../../src/core/CommonViewHandler";
import {ViewHandler} from "../../../../../src/core/CoreInterface";
import {Vue} from "vue/types/vue";
import {ViewController} from "../../../../../src/core/ViewController";



const jxg = require("../../../../../src/libs/jsxgraphcore.js");
/*
* 1.创建坐标轴
* 2.创建tan函数线
* 3.创建渐进线
* 4.创建对称中心
* 5.实现按钮功能
* */

export class JsxViewHandler extends CommonViewHandler implements ViewHandler{
    private board:any;



    pointc:any;
    private pointr:any;
    private pointro:any;
    private pointl:any;
    private pointlo:any;
    private point1: any;
    private point2: any;
    private point3: any;
    private point4: any;


    parityo:any;
    private parityt:any;
    private parityth:any;
    private parityf:any;
    private parityfi:any;

    private times:number;

    private rotateo:any;
    private rotatet:any;
    private rotateth:any;
    private rotatef:any;
    private rotatefi:any;

    constructor(vm:Vue){
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading();
    }


    init(){
        this.createAxis();
        this.createTanFunction();
        this.createTextGroup();
        this.createYAxisScale();
        this.createXAxisScale();

        let angle = 10;
        this.rotateo  = this.board.create('transform', [-Math.PI / angle, Math.PI * 2, 0], {type: 'rotate'});
        this.rotatet  = this.board.create('transform', [-Math.PI / angle, Math.PI, 0], {type: 'rotate'});
        this.rotateth = this.board.create('transform', [-Math.PI / angle, 0, 0], {type: 'rotate'});
        this.rotatef  = this.board.create('transform', [-Math.PI / angle, -Math.PI, 0], {type: 'rotate'});
        this.rotatefi = this.board.create('transform', [-Math.PI / angle, -Math.PI * 2, 0], {type: 'rotate'});

    }

    //创建坐标轴
    createAxis(){
        jxg.Options.axis.ticks.majorHeight = 20;
        jxg.Options.axis.ticks.insertTicks = false;
        this.board = JXG.JSXGraph.initBoard('box',
        {
            boundingbox: [-Math.PI*3, 5,Math.PI*3, -5],
            axis:false,
            renderer: 'svg',
            showcopyright:false,
            showNavigation:false,
            grid:false,
            strokeWidth:8,
            ticks:{minorTicks:0},
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 10,
                max: 0,
                wheel: true,
                needShift: true
            },
            pan:{enabled:false}});
        let strokecolor = "#000000";
        this.board.create('arrow',[[-Math.PI*2-2,0],[Math.PI*2+2,0]],{strokeWidth:4,strokeColor:strokecolor,fixed:true,highlight:false});
          this.board.create('arrow',[[0,-5],[0,5]],{strokeWidth:4,strokeColor:strokecolor,fixed:true,highlight:false})

    }


    //创建坐标轴上坐标
    createTextGroup(){
        let array = [];
        array[0]  = this.board.create('text',[Math.PI/2-0.4,-0.6,"0.5π"],{fixed:true,fontsize:20,highlight:false});
        array[1] = this.board.create('text',[-Math.PI/2-0.1-0.5,-0.6,"-0.5π"],{fixed:true,fontsize:20,highlight:false});
        array[2] = this.board.create('text',[-Math.PI/2-Math.PI-0.6,-0.6,"-1.5π"],{fixed:true,fontsize:20,highlight:false});
        array[3]  = this.board.create('text',[Math.PI/2+Math.PI-0.4,-0.6,"1.5π"],{fixed:true,fontsize:20,highlight:false});
        array[4]  = this.board.create('text',[-Math.PI/2-Math.PI*2-0.6,-0.6,"-2.5π"],{fixed:true,fontsize:20,highlight:false});
        array[5]  = this.board.create('text',[Math.PI/2+Math.PI*2-0.4,-0.6,"2.5π"],{fixed:true,fontsize:20,highlight:false});
        array[6] = this.board.create('text',[Math.PI*2-0.3,-0.6,"2π"],{fixed:true,fontsize:20,highlight:false});
        array[7] = this.board.create('text',[Math.PI-0.2,-0.6,"π"],{fixed:true,fontsize:20,highlight:false});
        array[8] = this.board.create('text',[-Math.PI-0.4,-0.6,"-π"],{fixed:true,fontsize:20,highlight:false});
        array[9] = this.board.create('text',[-Math.PI*2-0.4,-0.6,"-2π"],{fixed:true,fontsize:20,highlight:false});
        array[10] = this.board.create('text',[-0.65, 0.8 * 1,"1"],{fixed:true,fontsize:20,highlight:false});
        array[11] = this.board.create('text',[-0.65, 0.8 * 2,"2"],{fixed:true,fontsize:20,highlight:false});
        array[12] = this.board.create('text',[-0.65, 0.8 * 3,"3"],{fixed:true,fontsize:20,highlight:false});
        array[13] = this.board.create('text',[-0.65, 0.8 * 4,"4"],{fixed:true,fontsize:20,highlight:false});
        array[14] = this.board.create('text',[-0.83, 0.8 * -1,"-1"],{fixed:true,fontsize:20,highlight:false});
        array[15] = this.board.create('text',[-0.83, 0.8 * -2,"-2"],{fixed:true,fontsize:20,highlight:false});
        array[16] = this.board.create('text',[-0.83, 0.8 * -3,"-3"],{fixed:true,fontsize:20,highlight:false});
        array[17] = this.board.create('text',[-0.83, 0.8 * -4,"-4"],{fixed:true,fontsize:20,highlight:false});
        array[18] = this.board.create('text',[Math.PI*2+2.5,0,"x"],{fixed:true,fontsize:24,highlight:false, cssClass: 'text_style'});
        array[19] = this.board.create('text',[-0.7,4.8,"y"],{fixed:true,fontsize:24,highlight:false, cssClass: 'text_style'});
        array[20] = this.board.create('text',[-0.55,-0.25,"o"],{fontsize: 32, fixed: true, highlight: false, cssClass: 'text_style'});
        array[21] = this.board.create('text',[-0.65, 0.8 * 5,"5"],{fixed:true,fontsize:20,highlight:false});
        array[22] = this.board.create('text',[-0.83, 0.8 * -5,"-5"],{fixed:true,fontsize:20,highlight:false});
        this.board.create('group',array,{fixed:true});

    }

    //创建Y轴坐标轴刻度
    createYAxisScale(){
        let strokeColor = "#000000";
        let array = [];
        let i;
        let j=0;
        for(i=0;i<12;i++){
            array[i] = this.board.create('line',[[0,j],[Math.PI*0.07,j]],{strokeWidth:2,strokeColor:strokeColor,fixed:true,straightFirst:false,straightLast:false,layer:5,highlightStrokeColor:"#000000",});
            j+=0.40;
        }
        this.board.create('group',array,{fixed:true});
        let array1 = [];
        let a;
        let b=0;
        for(a=0;a<12;a++){
            array1[a] = this.board.create('line',[[0,b],[Math.PI*0.07,b]],{strokeWidth:2,strokeColor:strokeColor,fixed:true,straightFirst:false,straightLast:false,layer:5,highlightStrokeColor:"#000000",});
            b-=0.40;
        }
        this.board.create('group',array1,{fixed:true});
    }

    //创建X轴坐标轴刻度
    createXAxisScale(){
        let strokeColor = "#000000";
        let array = [];
        let i;
        let j=-Math.PI*2-Math.PI/2;
        for(i=0;i<21;i++){
            array[i]  = this.board.create('line',[[j,0],[j,0.2]],{strokeWidth:2,strokeColor:strokeColor,fixed:true,straightFirst:false,straightLast:false,layer:5,highlightStrokeColor:"#000000"});
            j+=Math.PI/4;
        }
        this.board.create('group',array,{fixed:true});
    }

    //创建tan函数线
    createTanFunction(){
        let strokeColor = '#ef732c';
        this.board.create('curve',
            [function(t:number){
                if(t < Math.PI * 2 + Math.PI / 2 -Math.PI/12 && t > Math.PI * +Math.PI / 2+Math.PI/80 ){
                    return t;
                }
            },
                function(t:number){
                    return Math.tan(t);
                }],
            {strokeWidth:4 ,strokeColor: strokeColor,fixed:true,layer:7,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
        this.board.create('curve',
            [function(t:number){
                if(t < Math.PI + Math.PI / 2 -Math.PI/12 && t > Math.PI / 2 +Math.PI/12){
                    return t
                }
            },
                function(t:number){
                    return Math.tan(t);
                }],
            {strokeWidth:4 ,strokeColor:strokeColor,fixed:true,layer:7,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
        this.board.create('curve',
            [function(t:number){
                if(t < Math.PI / 2 -Math.PI/12&& t > -Math.PI / 2 + Math.PI/12){
                    return t
                }
            },
                function(t:number){
                    return Math.tan(t);
                }],
            {strokeWidth:4 ,strokeColor:strokeColor,fixed:true,layer:7,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
        this.board.create('curve',
            [function(t:number){
                if(t < -Math.PI / 2-Math.PI/12&& t > -Math.PI / 2 -Math.PI+Math.PI/12){
                    return t
                }
            },
                function(t:number){
                    return Math.tan(t);
                }],
            {strokeWidth:4 ,strokeColor:strokeColor,fixed:true,layer:7,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
        this.board.create('curve',
            [function(t:number){
                if(t < -Math.PI / 2-Math.PI-Math.PI/12&& t > -Math.PI / 2 -Math.PI*2+Math.PI/12){
                    return t
                }
            },
                function(t:number){
                    return Math.tan(t);
                }],
            {strokeWidth:4 ,strokeColor:strokeColor,fixed:true,layer:7,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
    }


    //创建奇偶数虚线
    async ParityEvent() {
        //创建奇偶性函数线
        if(this.parityo == null) {
            console.log('正在执行单击事件');
            let strokeColor = '#000000';
            this.parityo = this.board.create('curve',
                [  function (t: number) {
                    if (t < Math.PI * 2 + Math.PI / 2 -Math.PI/12 && t > Math.PI * +Math.PI / 2+Math.PI/80 ) {
                        return t
                    }
                },
                    function (t: number) {
                        return Math.tan(t);
                    }],
                {strokeWidth: 4, strokeColor: strokeColor, dash: 3,layer:8,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
            this.parityt = this.board.create('curve',
                [function (t: number) {
                    if (t < Math.PI + Math.PI / 2 -Math.PI/12 && t > Math.PI / 2 +Math.PI/12) {
                        return t
                    }
                },
                    function (t: number) {
                        return Math.tan(t);
                    }],
                {strokeWidth: 4, strokeColor: strokeColor, dash: 3,layer:8,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
            this.parityth = this.board.create('curve',
                [function (t: number) {
                    if (t < Math.PI / 2 -Math.PI/12&& t > -Math.PI / 2 + Math.PI/12) {
                        return t
                    }
                },
                    function (t: number) {
                        return Math.tan(t);
                    }],
                {strokeWidth: 4, strokeColor: strokeColor, dash: 3,layer:8,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
            this.parityf = this.board.create('curve',
                [function (t: number) {
                    if (t < -Math.PI / 2-Math.PI/12&& t > -Math.PI / 2 -Math.PI+Math.PI/12) {
                        return t
                    }
                },
                    function (t: number) {
                        return Math.tan(t);
                    }],
                {strokeWidth: 4, strokeColor: strokeColor, dash: 3,layer:8,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
            this.parityfi = this.board.create('curve',
                [function (t: number) {
                    if (t < -Math.PI / 2-Math.PI-Math.PI/12&& t > -Math.PI / 2 -Math.PI*2+Math.PI/12) {
                        return t
                    }
                },
                    function (t: number) {
                        return Math.tan(t);
                    }],
                {strokeWidth: 4, strokeColor: strokeColor, dash: 3,layer:8,highlightStrokeColor:strokeColor,highlightStrokeWidth:4});
                this.hideTanfunction();

        }

    }

    //让函数隐藏
    hideTanfunction(){
        this.parityo.hideElement();
        this.parityt.hideElement();
        this.parityth.hideElement();
        this.parityf.hideElement();
        this.parityfi.hideElement();
    }

    //显示tan函数
    showTanFunction(){
    this.parityo.showElement();
    this.parityt.showElement();
    this.parityth.showElement();
    this.parityf.showElement();
    this.parityfi.showElement();
    }


    //让函数旋转
    rotatebind(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            //旋转的角度
            let angle = 10;

            this.times = angle;
            let intervalId = setInterval(()=> {
                this.times -= 1;
                if(this.times < 0){
                    clearInterval(intervalId);
                }

                this.rotateo.bindTo(this.parityo);
                this.rotatet.bindTo(this.parityt);
                this.rotateth.bindTo(this.parityth);
                this.rotatef.bindTo(this.parityf);
                this.rotatefi.bindTo(this.parityfi);

                this.board.update();

                if (this.times == 0) {
                    resolve(true);
                    clearInterval(intervalId);
                }
            },80);
        });

    }

    //删除奇偶性虚线
    removeParity() {
        this.parityo.remove();
        this.parityt.remove();
        this.parityth.remove();
        this.parityf.remove();
        this.parityfi.remove();
          /*  this.parityo.setAttribute({visible: false});
            this.parityt.setAttribute({visible: false});
            this.parityth.setAttribute({visible: false});
            this.parityf.setAttribute({visible: false});
            this.parityfi.setAttribute({visible: false});*/
    }

    //创建对称中心点
    createPoint(){
        let fillColor = '#1782ff';
        let strokeColor = '#000000';
        const size = 4;
        this.pointc  = this.board.create('point',[0,0],{name:'',fixed:true,strokeWidth:1,fillColor: fillColor,strokeColor: strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false,size:size});
        this.pointr  = this.board.create('point',[Math.PI,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.pointro = this.board.create('point',[Math.PI*2,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.pointl  = this.board.create('point',[-Math.PI,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.pointlo = this.board.create('point',[-Math.PI*2,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.point1 = this.board.create('point',[-Math.PI*0.5,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.point2 = this.board.create('point',[-Math.PI*1.5,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.point3 = this.board.create('point',[Math.PI*1.5,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
        this.point4 = this.board.create('point',[Math.PI*0.5,0],{name:'',fixed:true,strokeWidth:1,fillColor:fillColor,strokeColor:strokeColor,
            highlightStrokeColor:strokeColor,highlightFillColor:fillColor,highlightStrokeWidth:1,showInfobox:false, size:size});
    }




    //删除对称中心点
    removePoint() {
      this.pointc.remove();
        this.pointr.remove();
        this.pointro.remove();
        this.pointl.remove();
        this.pointlo.remove();
        this.point1.remove();
        this.point2.remove();
        this.point3.remove();
        this.point4.remove();

    }


    resize(): void {
        super.resize();
        this.board.setBoundingBox([-Math.PI * 2 - Math.PI / 2 - 1, 5, Math.PI * 2+Math.PI / 2+1, -5], true);
    }


    reset(): void {
        this.viewModel.$data.disabled = false;
        this.viewModel.$data.dash     = false;
        this.viewModel.$data.center   = false;
        this.times = 0;
        this.removeParity();
        this.parityo  = null;
        this.parityt  = null;
        this.parityth = null;
        this.parityf  = null;
        this.parityfi = null;
       /* this.hideTanfunction();*/

    }

}