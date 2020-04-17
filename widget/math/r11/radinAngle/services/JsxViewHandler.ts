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
* 2.创建圆
* 3.创建扇形
* 4.隐藏初始不可见的扇形以及圆
* 5.给滑块绑定事件，当滑块移动到对应位置时显示对应的圆和扇形
* */

export class JsxViewHandler extends CommonViewHandler implements ViewHandler{
    private board:any;
    private dynamicPointStart:any;
    private dynamicPointEnd:any;
    private center:any;
    private dynamicgraphA:any;
    private dynamicgraphB:any;
    constructor(vm:Vue){
        super(vm);
    }


    domReady(){
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading();
    }


    init(){
        this.createAxis();
        this.createPoint();
        this.createSector();
        this.createCircle();
        this.createText();
        this.createAxisText();
        this.createXAxisScale();
        this.createYAxisScale();
    }


    createAxis(){
        //创建坐标系
        jxg.Options.axis.ticks.majorHeight = 20;
        jxg.Options.axis.ticks.insertTicks = false;
        this.board = JXG.JSXGraph.initBoard('box',
            {axis:false, boundingbox:[-6, 6, 6, -6],
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
        this.board.create('arrow',[[-5,0],[5,0]],{strokeWidth:4,strokeColor:strokecolor,fixed:true,highlight:false});
        this.board.create('arrow',[[0,-5],[0,5]],{strokeWidth:4,strokeColor:strokecolor,fixed:true,highlight:false});
    }


    createAxisText(){
        let array = [];
        array[0]  = this.board.create('text',[0.8,-0.4,"1"],{fixed:true,fontsize:24,highlight:false});
        array[1]  = this.board.create('text',[1.8,-0.4,"2"],{fixed:true,fontsize:24,highlight:false});
        array[2]  = this.board.create('text',[2.8,-0.4,"3"],{fixed:true,fontsize:24,highlight:false});
        array[3]  = this.board.create('text',[3.75,-0.4,"4"],{fixed:true,fontsize:24,highlight:false});
        array[4]  = this.board.create('text',[-0.45,1,"1"],{fixed:true,fontsize:24,highlight:false});
        array[5]  = this.board.create('text',[-0.45,2,"2"],{fixed:true,fontsize:24,highlight:false});
        array[6]  = this.board.create('text',[-0.45,3,"3"],{fixed:true,fontsize:24,highlight:false});
        array[7]  = this.board.create('text',[-0.45,4,"4"],{fixed:true,fontsize:24,highlight:false});
        array[8]  = this.board.create('text',[-1.4,-0.4,"-1"],{fixed:true,fontsize:24,highlight:false});
        array[9] = this.board.create('text',[-2.4,-0.4,"-2"],{fixed:true,fontsize:24,highlight:false});
        array[10] = this.board.create('text',[-3.4,-0.4,"-3"],{fixed:true,fontsize:24,highlight:false});
        array[11] = this.board.create('text',[-4.45,-0.4,"-4"],{fixed:true,fontsize:24,highlight:false});
        array[12] = this.board.create('text',[-0.7,-1,"-1"],{fixed:true,fontsize:24,highlight:false});
        array[13] = this.board.create('text',[-0.7,-2,"-2"],{fixed:true,fontsize:24,highlight:false});
        array[14] = this.board.create('text',[-0.7,-3,"-3"],{fixed:true,fontsize:24,highlight:false});
        array[15] = this.board.create('text',[-0.7,-4,"-4"],{fixed:true,fontsize:24,highlight:false});
        array[16] = this.board.create('text',[5,0,"x"],{fixed:true,fontsize:24,highlight:false, cssClass: 'text_style'});
        array[17] = this.board.create('text',[0.2,5,"y"],{fixed:true,fontsize:24,highlight:false, cssClass: 'text_style'});
        this.board.create('group',array,{fixed:true});
    }


    createXAxisScale(){
        let strokeColor = "#000000";
        let array = [];
        let i;
        let j=-4;
        for(i=0;i<9;i++){
            array[i]  = this.board.create('line',[[j,0],[j,0.2]],{strokeWidth:2,strokeColor:strokeColor,fixed:true,straightFirst:false,straightLast:false,layer:5,highlight:false});
            j+=1;
        }
        this.board.create('group',array,{fixed:true});
    }


    createYAxisScale(){
        let strokeColor = "#000000";
        let array = [];
        let i;
        let j=-4;
        for(i=0;i<9;i++){
            array[i] = this.board.create('line',[[0,j],[0.2,j]],{strokeWidth:2,strokeColor:strokeColor,fixed:true,straightFirst:false,straightLast:false,layer:5,highlight:false});
            j+=1;
        }
        this.board.create('group',array,{fixed:true});
    }


    createText() {
        let strokeColor = "#000000";
        this.board.create('text',[-0.4,-0.3,"o"],{fontsize:24,strokeColor: strokeColor,fixed:true,highlight:false, cssClass: 'text_style'});
        this.board.create('text',[1.1,0.3,"A"],{fontsize:24,strokeColor:strokeColor,fixed:true,highlight:false, cssClass: 'text_style'});
        this.board.create('text',[0.6,1.1,"B"],{fontsize:24,strokeColor:strokeColor,fixed:true,highlight:false, cssClass: 'text_style'});
        this.board.create('text',[0.5,0.2,"1"],{fontsize:24,strokeColor:"#BD00D4",fixed:true,highlight:false,layer:13});
    }


    createPoint() {
        this.dynamicPointStart = this.board.create('point',[1,0],{fixed:true,visible:false});
        this.dynamicPointEnd   = this.board.create('point',[0.6,0.8],{fixed:true,visible:false});
        this.center            = this.board.create('point',[0,0],{fixed:true,visible:false});
        this.center            = this.board.create('point',[0,0],{fixed:true,visible:false});
    }


    createDynamicPoint() {
        this.dynamicgraphA = this.board.create('text',[2,0.3,"A\'"],{fontsize:24,strokeColor:"#000000",fixed:true,highlight:false, cssClass: 'text_style'});
        this.dynamicgraphB = this.board.create('text',[1.2,1.8,"B\'"],{fontsize:24,strokeColor:"#000000",fixed:true,highlight:false, cssClass: 'text_style'});
    }


    removeDynamicPoint() {
        this.dynamicgraphA.remove();
        this.dynamicgraphB.remove();
    }


//滑块拖动触发的事件
    event(value:number){
        if (value>0){
            this.dynamicPointStart.moveTo([1*value,0], 100);
            this.dynamicPointEnd.moveTo([0.6*value,0.8*value], 100);
        }
        if(value<=1){
            try{
                this.removeDynamicPoint();
                this.dynamicgraphA=null;
                this.dynamicPointStart.moveTo([1,0], 100);
                this.dynamicPointEnd.moveTo([0.6,0.8], 100);
            }catch (e){

            }
        }
        if(value>=2&&this.dynamicgraphA==null){
            this.createDynamicPoint();
        }
        if (value>=2){
            this.dynamicgraphA.moveTo([1.05*value,0.3],100);
            this.dynamicgraphB.moveTo([0.6*value,0.9*value],100);
        }
    }


    createSector(){
        //创建扇形中的第一个弧
        let arcStart = this.board.create('point',[0.4,0],{fixed:true,visible:false,highlight:false})
        let arcEnd   = this.board.create('point',[0.4,0.5],{fixed:true,visible:false,highlight:false})
        this.board.create('sector',[this.center,arcStart,arcEnd],{strokeColor:'#E30000',fillColor:'#FCE3D5',strokeWidth:2,layer:11,highlight:false,fillOpacity:1});
        //创建扇形
        this.board.create('sector',[this.center,[1,0],[0.6,0.8]],{ fillColor:'#C6E7FF',strokeWidth:0, strokeColor:'#0094FF',layer:10,highlight:false,fillOpacity:1})
        this.board.create('sector',[this.center,this.dynamicPointStart,this.dynamicPointEnd],{fillOpacity:0,strokeColor:'#ff5d00',strokeWidth:4,layer:12,highlight:false});
    }


    createCircle(){
        //创建圆
        //创建圆心坐标
        //fixed属性为true表示点不可移动，visible属性为false表示隐藏点
        this.board.create('circle',[this.center,[1,0]],{strokeColor:'#0094FF',strokeWidth:4,highlight:false,layer:11,fixed:true});
        this.board.create('circle',[this.center,this.dynamicPointStart],{strokeColor:'#0094FF',strokeWidth:4,highlight:false ,fixed: true});
    }


    resize(): void {
        super.resize();
        this.board.setBoundingBox([-5, 5, 5,-5],true);
    }


    reset(): void {
        this.viewModel.$data.sliderNum = 1;
    }


}