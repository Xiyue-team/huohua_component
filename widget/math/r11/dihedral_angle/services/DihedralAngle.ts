
import {CommonViewHandler} from "../../../../../src/core/CommonViewHandler";
import {ViewHandler} from "../../../../../src/core/CoreInterface";
import {Vue} from "vue/types/vue";

var jxg = require("../../../../../src/libs/jsxgraphcore.js");
jxg.Options.axis.ticks.majorHeight = 20;
jxg.Options.axis.ticks.insertTicks = false;
jxg.autoHighlight('black');
export class DihedralAngle extends CommonViewHandler implements ViewHandler{
    /**
     * 二面角
     *1.创建坐标轴
     *2.画平面
     *3.添加控件组件
     *4.为相应的控件绑定事件
     */

    public board:any;
    private apol:any;
    private bpol:any;
    private paline:any;
    constructor(vm:Vue){
        super(vm);
    }

    domReay(){
        super.domReady();
        this.init();
    }

    init(){
        this.initBoard();
        this.createXYAxis();
        this.createPolygon();
    }
    //初始化board
    initBoard(){
        this.board = JXG.JSXGraph.initBoard('box', {
                boundingbox: [-10,10,10,-10],
                axis: false,
                showCopyright: false,
                showcopyright:false,showNavigation:false,grid:false,
                pan:{

                    enabled: false,
                    needTwoFingers: false,
                    needShift: true,

                },
                zoom: {
                    pinchHorizontal: false,
                    pinchVertical: false,
                    pinchSensitivity: 1,
                    min: 2,
                    max: 0,
                    wheel: true,
                    needShift: true
                },

            }
        );
    };

    //创建坐标轴
    createXYAxis(){
        //1.创建坐标轴
        // x轴
        let xaxis = this.board.create('axis', [[0,0], [1,0]],

            {name:'x',
                withLabel: true,
                label: {position: 'rt',
                    offset: [-10, -10]
                },
                drawZero:false,
                strokeWidth:1,
            },
        );
        xaxis.removeAllTicks();
        this.board.create('ticks', [xaxis, 1], {
                strokeColor:'#FFF',
                drawLabels:true,
                label: {offset: [-12, -10]},
                minorTicks:1,
                drawZero:false,
            }
        );
        //y轴
        let yaxis = this.board.create('axis', [[0, 0], [0, 5]],

            {
                name: 'y',
                withLabel: true,
                label: {
                    position: 'rt',
                    offset: [15, 5]
                },
                drawZero:false,
                strokeWidth:1,
            });
        yaxis.removeAllTicks();
        this.board.create('ticks', [yaxis, 1], {
                type:'line',
                strokeColor:'#FFF',
                drawLabels:true,
                label: {offset: [7, -2]},
                minorTicks:1,
                drawZero:false,

            }
        );
    }

    //画平面
    createPolygon(){
        let apoint = this.board.create('point', [-2.77, 2.75],{});
        let bpoint = this.board.create('point', [-2.77, -2.75],{});
        let cpoint = this.board.create('point', [2.77, 2.58],{});
        let dpoint = this.board.create('point', [2.77, 7.25],{});

        this.apol = this.board.create('polygon', [apoint, bpoint, cpoint, dpoint],{fillColor:'white'});

        let epoint = this.board.create('point', [7.25, 1.14],{});
        let fpoint = this.board.create('point', [1.42, -4.15],{});

        this.bpol = this.board.create('polygon', [bpoint, fpoint, epoint, cpoint],{fillColor:'white'});
    }

    //添加控件组件





    showFace(){
        // alert('123')
        this.apol.setAttribute({fillColor:'red'});
        this.bpol.setAttribute({fillColor:'yellow'});
    }

    showEdge(){
        this.paline = this.board.create('line',[[-2.77, -2.75],[2.77, 2.58]], {straightFirst:false, straightLast:false, strokeWidth:4 ,fixed:true,strokeColor:'green'});
    }


    //显示二面角
    showDihedralAngle(){
        let p3 = this.board.create('point',[0,2]);
        let p4 = this.board.create('point',[2.40,-0.46])
        let perp1 = this.board.create('PerpendicularSegment',[this.paline,p3]);
        let perp2 = this.board.create('PerpendicularSegment',[this.paline,p4]);
    }

    //窗口大小发生改变调用
    resize(){
        super.resize();
        this.board.setBoundingBox([-10,10,10,-10], true);
    }

    //重置页面
    reset():void{

        //插除内容
        jxg.JSXGraph.freeBoard;
        //初始化面板按钮
        this.viewModel.$data.sliderNum=1;
        //重绘
        this.domReay();

    }
}