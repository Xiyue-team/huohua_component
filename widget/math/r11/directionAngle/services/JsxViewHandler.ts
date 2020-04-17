import {CommonViewHandler} from "../../../../../src/core/CommonViewHandler";
import {ViewHandler} from "../../../../../src/core/CoreInterface";
import {Vue} from "vue/types/vue";
import {ViewController} from '../../../../../src/core/ViewController';
var jxg = require("../../../../../src/libs/jsxgraphcore.js");

/**
 * 1、写标题
 * 2、画指北方向线
 * 3、画目标线上的选择点
 * 4、画目标方向线
 * 5、画可变角度
 */

export class JsxViewHandler extends CommonViewHandler implements ViewHandler{
    public board:any;

    //目标线
    private arrow:any;
    //目标线终点
    private arrowEndPoint:any
    //可移动点
    private glider:any;
    //原点
    private startPoint:any;
    //角度
    private angle:any;

    //轴上的文字
    private axisText:any;

    //可移动线
    private gliderLine:any;

    //扇形角
    private sector1:any;
    private sector2:any;
    private sector3:any;
    private sector4:any;
    //扇形角起点
    private startSector:any;
    //扇形角终点
    private endSector:any;

    constructor(vm:Vue){
        super(vm);
    }

    domReady(){
        super.domReady();
        this.init();

        ViewController.getInstance().hideLoading(1000);
    }


    init(){
        this.initBoard();
        this.createLine();
        this.createArrow();
        this.drawSector();
        this.createText();
    }


    //创建坐标系用于将所有元素放在坐标系上,坐标系隐藏
    private initBoard():void{
        jxg.Options.axis.ticks.majorHeight = 10;
        jxg.Options.axis.ticks.insertTicks = false;

        //1、创建坐标系
        this.board = JXG.JSXGraph.initBoard(
            'box',
            {axis:false,
                keepAspectRatio: true,
                boundingbox:[-15, 15, 15, -15],
                showcopyright:false,
                showNavigation:false,
                grid:false,
                pan:{enabled: false, needTwoFingers: true, needShift: false},
                zoom: {
                    pinchHorizontal: false,
                    pinchVertical: false,
                    pinchSensitivity: 1,
                    min: 2,
                    max: 0,
                    wheel: true,
                    needShift: true
                },
            });

        console.log(document.getElementById("box").style.width);
        console.log(document.getElementById("box").style.height);
    }


    //画指北方向线和水平线
    createLine(){
        //指北方向线
        this.board.create('line', [[0,-13],[0,13]],
            {straightFirst:false, straightLast:false, strokeWidth:4,strokeColor:'#000000',fixed:true,highlight:false,});
        //水平线
        this.board.create('line', [[-13,0],[13,0]],
            {straightFirst:false, straightLast:false, strokeWidth:4,strokeColor:'#000000',fixed:true,highlight:false,});
    }


    //纵轴上的文字
    createText(){
        this.axisText = this.board.create('text',[-0.5,14,"北"],{fontSize:18,strokeColor:'#000000',fixed:true,highlight:false});
        this.axisText = this.board.create('text',[-0.5,-14,"南"],{fontSize:18,strokeColor:'#000000',fixed:true,highlight:false});
        this.axisText = this.board.create('text',[-14.6,0,"西"],{fontSize:18,strokeColor:'#000000',fixed:true,highlight:false});
        this.axisText = this.board.create('text',[13.5,0,"东"],{fontSize:18,strokeColor:'#000000',fixed:true,highlight:false});
    }


    //画目标方向线
    createArrow(){
        //原点
        this.startPoint = this.board.create('point', [0, 0],{fixed:true,visible:false,highlight:false});
        //画目标线上的选择点
        //创建点移动轨迹圆
        //画轨迹圆
        let circle = this.board.create('circle', [this.startPoint,[5,5]],{fixed:true,visible:false,highlight:false});
        this.glider = this.board.create('glider',[5,5,circle],
            {name:'', size:9, showInfobox:false, face:"o", strokeColor:"#C0C0C0", fillColor:'#FFFFFF',highlight:false});


        // 画目标线
        this.arrowEndPoint = this.board.create('point', [7, 7],{fixed:true,visible:false,highlight:false});
        this.arrow = this.board.create('arrow',[this.startPoint,this.arrowEndPoint],{strokeWidth:4,fixed:true,strokeColor:'#EF5E65',highlight:false});

        // //写角度文字
        // this.angleText = this.board.create('text',[0.3,2,"45°"],{fontSize:16,strokeColor:'#BD00D4',fixed:true});
        //将可移动点和原点的连线用于和扇形角绑定旋转
        this.gliderLine = this.board.create('line', [this.startPoint,this.glider],
            {straightFirst:false, straightLast:false, fixed:true,visible:false,highlight:false});

        //给移动点绑定事件鼠标移上样式变成小手
        this.glider.on('mouseover', () =>{
            document.body.style.cursor = 'pointer';
        });

        //给移动点绑定事件鼠标离开样式还原
        this.glider.on('mouseout', () =>{
            document.body.style.cursor = 'default';
        });


        //给滑点绑定事件
        this.glider.on('drag', () => {

            this.angle = this.getAngle();

            //重画目标线
            this.arrowEndPoint.moveTo([this.getArrowEndPointX(),this.getArrowEndPointY()]);

            //重写状态栏文字
            if (this.angle < 90 && this.angle > 0){
                document.getElementById("statusBar").innerText = "北偏东" + this.angle + "度";
                if (this.sector1 == null){

                    if(this.sector4 != null){
                        this.sector4.remove();
                        this.sector4 = null;
                    }
                    if(this.sector2 != null){
                        this.sector2.remove();
                        this.sector2 = null;
                    }
                    if(this.sector3 != null){
                        this.sector3.remove();
                        this.sector3 = null;
                    }
                    //4、画出两条线段的夹角，扇形角
                    let startSector = this.board.create('point',  [0,2],{fixed:true,visible:false});
                    // 画扇形角在可移动线上的点  终点
                    let endSector   = this.board.create('glider', [2, 2,this.gliderLine],{fixed:true,visible:false});
                    //画扇形角
                    this.sector1     = this.board.create('sector', [this.startPoint, endSector , startSector],
                        { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});
                }

            } else if(this.angle > 90 && this.angle < 180 ){
                document.getElementById("statusBar").innerText = "南偏东" + (180 - this.angle) + "度";
                if (this.sector2 == null){
                    if(this.sector4 != null){
                        this.sector4.remove();
                        this.sector4 = null;
                    }
                    if(this.sector1 != null){
                        this.sector1.remove();
                        this.sector1 = null;
                    }
                    if(this.sector3 != null){
                        this.sector3.remove();
                        this.sector3 = null;
                    }
                    //4、画出两条线段的夹角，扇形角
                    let startSector = this.board.create('point',  [0,-2],{fixed:true,visible:false});
                    // 画扇形角在可移动线上的点  终点
                    let endSector   = this.board.create('glider', [1.2, -1.2,this.gliderLine],{fixed:true,visible:false});
                    //画扇形角
                    this.sector2     = this.board.create('sector', [this.startPoint , startSector , endSector],
                        { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});
                }
            } else if(this.angle > 180 && this.angle < 270 ){
                document.getElementById("statusBar").innerText = "南偏西" + (this.angle - 180) + "度";

                if (this.sector3 == null){

                    if(this.sector4 != null){
                        this.sector4.remove();
                        this.sector4 = null;
                    }
                    if(this.sector1 != null){
                        this.sector1.remove();
                        this.sector1 = null;
                    }
                    if(this.sector2 != null){
                        this.sector2.remove();
                        this.sector2 = null;
                    }
                    //4、画出两条线段的夹角，扇形角
                    let startSector = this.board.create('point',  [0,-2],{fixed:true,visible:false});
                    // 画扇形角在可移动线上的点  终点
                    let endSector   = this.board.create('glider', [-2, -2,this.gliderLine],{fixed:true,visible:false});
                    //画扇形角
                    this.sector3     = this.board.create('sector', [this.startPoint, endSector , startSector],
                        { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});
                }

            } else if(this.angle > 270 && this.angle < 360 ){
                document.getElementById("statusBar").innerText = "北偏西" + (360 - this.angle) + "度";

                if (this.sector4 == null){
                    if(this.sector1 != null){
                        this.sector1.remove();
                        this.sector1 = null;
                    }
                    if(this.sector2 != null){
                        this.sector2.remove();
                        this.sector2 = null;
                    }
                    if(this.sector3 != null){
                        this.sector3.remove();
                        this.sector3 = null;
                    }

                    //4、画出两条线段的夹角，扇形角
                    let startSector = this.board.create('point',  [0,2],{fixed:true,visible:false});
                    // 画扇形角在可移动线上的点  终点
                    let endSector   = this.board.create('glider', [-1.2, 1.2,this.gliderLine],{fixed:true,visible:false});
                    //画扇形角
                    this.sector4     = this.board.create('sector', [this.startPoint , startSector , endSector],
                        { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});
                }
            } else if (this.angle == 0 || this.angle == 360){
                document.getElementById("statusBar").innerText = "正北";
                if(this.sector4 != null){
                    this.sector4.remove();
                    this.sector4 = null;
                }
                if(this.sector1 != null){
                    this.sector1.remove();
                    this.sector1 = null;
                }
                if(this.sector2 != null){
                    this.sector2.remove();
                    this.sector2 = null;
                }
                if(this.sector3 != null){
                    this.sector3.remove();
                    this.sector3 = null;
                }
            } else if (this.angle == 90){
                document.getElementById("statusBar").innerText = "正东";
                if(this.sector4 != null){
                    this.sector4.remove();
                    this.sector4 = null;
                }
                if(this.sector1 != null){
                    this.sector1.remove();
                    this.sector1 = null;
                }
                if(this.sector2 != null){
                    this.sector2.remove();
                    this.sector2 = null;
                }
                if(this.sector3 != null){
                    this.sector3.remove();
                    this.sector3 = null;
                }
            } else if (this.angle == 180){
                document.getElementById("statusBar").innerText = "正南";
                if(this.sector4 != null){
                    this.sector4.remove();
                    this.sector4 = null;
                }
                if(this.sector1 != null){
                    this.sector1.remove();
                    this.sector1 = null;
                }
                if(this.sector2 != null){
                    this.sector2.remove();
                    this.sector2 = null;
                }
                if(this.sector3 != null){
                    this.sector3.remove();
                    this.sector3 = null;
                }
            } else if (this.angle == 270){
                document.getElementById("statusBar").innerText = "正西";
                if(this.sector4 != null){
                    this.sector4.remove();
                    this.sector4 = null;
                }
                if(this.sector1 != null){
                    this.sector1.remove();
                    this.sector1 = null;
                }
                if(this.sector2 != null){
                    this.sector2.remove();
                    this.sector2 = null;
                }
                if(this.sector3 != null){
                    this.sector3.remove();
                    this.sector3 = null;
                }
            }
        });
    }


    //获取目标线终点横坐标
    getArrowEndPointX(){
        let x = this.glider.X();
        let y = this.glider.Y();
        let arrowEndPointX = Math.sin(this.angle * Math.PI / 180) * (Math.sqrt(x * x + y * y) + Math.sqrt(8));

        return arrowEndPointX;
    }


    //获取目标线终点纵坐标
    getArrowEndPointY(){
        let x = this.glider.X();
        let y = this.glider.Y();
        let arrowEndPointY = Math.cos(this.angle * Math.PI / 180) * (Math.sqrt(x * x + y * y) + Math.sqrt(8));

        return arrowEndPointY;
    }


    //画扇形角
    private drawSector(){
        //4、画出两条线段的夹角，扇形角
        let startSector = this.board.create('point',  [0,2],{fixed:true,visible:false});
        // 画扇形角在可移动线上的点  终点
        let endSector   = this.board.create('glider', [1.4, 1.4,this.gliderLine],{fixed:true,visible:false});
        //画扇形角
        this.sector1     = this.board.create('sector', [this.startPoint, endSector , startSector],
            { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});

    }


    //获取角度
    getAngle(){
        let start = {
            x:0,
            y:0
        };
        let end = {
            x: this.glider.Y(),
            y: this.glider.X()
        };
        let angle = this.getRotate(start,end);
        return angle;
    }


    //计算旋转角度
    getRotate(start:any,end:any):number{
        var x = Math.abs(end.x-start.x);
        var y = Math.abs(end.y-start.y);
        var z = Math.sqrt(x*x+y*y);
        if (z != 0) {
            var rotat = Math.round((Math.asin(y/z)*180/Math.PI));
        } else {
            rotat = 0;
        }

        if(end.x<0 && end.y > 0){
            rotat = 180 -rotat;
        } else if (end.x < 0 && end.y < 0){
            rotat = 180 + rotat;
        } else if (end.x > 0 && end.y < 0){
            rotat = 360 -rotat;
        }
        return rotat;
    }


    resize(){

        console.log("resize")
        super.resize();
        let width = document.getElementById("box").style.width;
        let height = document.getElementById("box").style.height;

        this.board.setBoundingBox([-15, 15, 15, -15],true);
    }


    reset() {
        document.getElementById("statusBar").innerText = "北偏东45度";

        this.glider.moveTo([5, 5]);

        this.arrowEndPoint.moveTo([7,7]);

        if (this.sector1 == null){

            if(this.sector4 != null){
                this.sector4.remove();
                this.sector4 = null;
            }
            if(this.sector2 != null){
                this.sector2.remove();
                this.sector2 = null;
            }
            if(this.sector3 != null){
                this.sector3.remove();
                this.sector3 = null;
            }
            //4、画出两条线段的夹角，扇形角
            let startSector = this.board.create('point',  [0,2],{fixed:true,visible:false});
            // 画扇形角在可移动线上的点  终点
            let endSector   = this.board.create('glider', [1.4, 1.4,this.gliderLine],{fixed:true,visible:false});
            //画扇形角
            this.sector1     = this.board.create('sector', [this.startPoint, endSector , startSector],
                { strokeWidth:2, strokeColor:'#1B8b72',fillColor:'#75B9AA',fillOpacity:0.6,highlight:false});
        }
    }
}