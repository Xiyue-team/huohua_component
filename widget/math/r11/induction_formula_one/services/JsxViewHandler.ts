
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from "../../../../../src/core/ViewController";

const jxg = require('../../../../../src/libs/jsxgraphcore.js');
// jxg.Options.text.cssDefaultStyle = '';
/**
 *
 *诱导公式一,思路步骤
 1.创建坐标轴
 2.画圆圈，
 3.画线段
 4.拖动线段 显示旋转过程角度
 5.点击按钮 线段逆时针或顺时针旋转360度
 6.填写数据
 7.画按钮 添加点击事件
 其他窗口大小发生改变，调整页面布局npm install --save-dev typings-for-css-modules-loader
 */
// jxg.Options.text.cssDefaultStyle = '';
export class JsxViewHandler extends CommonViewHandler implements ViewHandler {

    public board: any;
    private innercircle: any;
    private outercircle: any;
    private apoint: any;
    private ppoint: any;
    private angle: any;
    private curve: any;
    private currentAngle: any;
    private lastAngle: any;
    private apointAnimation: any;
    private falg: Boolean = false;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading(1000);
    }


    init() {
        this.initBorder();
        this.createXYAxis();
        this.drawCircle();
        this.drawLine();
        this.drawIncludedAngle();
        this.createText();
        this.creteTicks();
        this.dragEvent();
        // this.board.renderer.dumpToCanvas();
    }

    //初始化border
    initBorder() {

        jxg.Options.axis.ticks.majorHeight = 20;
        jxg.Options.axis.ticks.insertTicks = false;
        this.board = JXG.JSXGraph.initBoard('box', {
                // renderer: 'canvas',
                boundingbox:  [-2, 2, 2, -2],
                axis:  false,
                showCopyright:  false,
                showNavigation: false,
                grid: false,
                pan: {

                    enabled:  false,
                    // needTwoFingers:  false,
                    // needShift:  true,

                },
                zoom:  {
                    pinchHorizontal:  false,
                    pinchVertical:  false,
                    pinchSensitivity:  1,
                    min:  2,
                    max:  0,
                    wheel:  true,
                    needShift: true
                },
                highlighted: false,
            }
        );
    }

    //1.创建坐标轴
    createXYAxis() {
        //1.创建坐标轴
        // x轴
        const xaxis = this.board.create('axis', [[0, 0], [1, 0]],

            {name: 'x',
               withLabel:  true,
                label:  {position:  'rt',
                    offset:  [5, -15],
                    fontSize: 20,
                    strokeColor: '#000000',
                    fontFamily: 'STIXGeneral-Italic',
                    highlight: false,
                },
                drawZero: false,
                strokeWidth: 1.4,
                size: 2,
                strokeColor: '#000000',
                highlightStrokeColor: '#000000',
            },
            );
        xaxis.removeAllTicks();
        this.board.create('ticks', [xaxis, 0], {
                strokeColor: '#FFF',
                strokeWidth: 2,
                drawLabels: true,
                label:  {offset:  [-10, -20], fontSize: 18, },
                minorTicks: 0,
                drawZero: false,
                ticksDistance: 2,
                includeBoundaries: true,
            }
        );
        //y轴
        const yaxis = this.board.create('axis', [[0, 0], [0, 1]],

            {
                name:  'y',
                withLabel:  true,
                label:  {
                    position:  'rt',
                    fontSize: 20,
                    strokeColor: '#000000',
                    highlight: false,
                },
                stokeWidth: 4,
                drawZero: false,
                strokeWidth: 1.4,
                size: 2,
                strokeColor: '#000000',
                highlightStrokeColor: '#000000',
            });
        yaxis.removeAllTicks();
        this.board.create('ticks', [yaxis, 0], {
                strokeColor: '#FFF',
                drawLabels: true,
                label:  {offset:  [-20, 15], fontSize: 20, },
                strokeWidth: 2,
                minorTicks: 0,
                drawZero: false,
            }
        );
    }

    //2.画圆
    drawCircle() {
        this.outercircle = this.board.create('circle', [[0, 0], [1 , 1]],
            {fixed: true, strokeColor: '#299AED', visible: false});
        this.innercircle = this.board.create('circle', [[0, 0], [1, 0]],
            {fixed: true, strokeWidth: 4, highlightStrokeColor: '#299AED', strokeColor: '#299AED', highlight: false});

    }
    //3.画线段
    drawLine() {

        const opoint = this.board.create('point', [0, 0], {name: '', size: 4,
            fixed: true, fill: 'white', visible: false, highlight: false, });
        this.apoint = this.board.create('glider', [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), this.outercircle],
            {name: '', size: 8, highlight: false, showInfobox: false, fillColor: 'white',
                strokeColor: ' rgba(0,0,0,0.35)', shadowColor: 'box-shadow:  0 2px 6px 0 ', label: { fontSize: 20, highlight: false, }});
        const paline = this.board.create('line', [opoint, this.apoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4 , strokeColor: '#FF5D00', highlight: false, });
        this.ppoint = this.board.create('glider', [0.72, 0.73, paline] ,
            {name: 'P', size: 4, strokeColor: '#000000', fillColor: '#D0021B', showInfobox: false,
            fixed: true, highlight: false,  label:  {
            position:  'bot',
            offset:  [20, 0],
            fontSize: 20,
            highlight: false,
        }});

        //给移动点绑定事件鼠标移上样式变成小手
        this.apoint.on('mouseover', () => {document.body.style.cursor = 'pointer'; });
        //给移动点绑定事件鼠标离开样式还原
        this.apoint.on('mouseout', () => {document.body.style.cursor = 'default'; });

    }
    //4.画夹角
    drawIncludedAngle() {
        const mpoint = this.board.create('point', [Math.cos(Math.PI / 3), 0], {name: '',
            size: 4, fixed: true, fill: 'white', visible: false});
        const opoint = this.board.create('point', [0, 0], {name: '', size: 4, fixed: true,
            fill: 'white', visible: false, highlight: false, });
        this.angle = this.board.create('angle', [mpoint, opoint, this.apoint], {name: 'α', type: 'sector', fillOpacity: 1, strokeWidth: 2,
            highlight: false, strokeColor: '#1B8B72', orthoType: 'sector', fillColor: '#75B9AA',
            orthoSensitivity: 1, radius: 0.2, size: 2, label: {strokeColor: '#FF5D00', fontSize: 20, highlight: false, }});
        console.log(Math.round(this.angle.Value() * 180 / Math.PI));

    }


    //5点击加号 逆时针旋转动画一圈
    addRotateAnimation() {

        this.curve.setAttribute({visible: false});
        this.angle.setAttribute({strokeOpacity: 1, fillOpacity: 1});

        const x = this.ppoint.X();
        const y = this.ppoint.Y();
        const timeId: any = null;
        const triangle = this.angle.Value() * 180 / Math.PI;
      //  console.log(Math.round(triangle));
        let i = (Math.floor(triangle / 30) + 1);
        const z = (Math.floor((triangle + 360) / 30) + 1);
        let apointAnimation: any;
        apointAnimation = () => {
            if (this.falg) {
                this.falg = false;
                setTimeout(() => {
                    this.apoint.moveTo([Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)], 0);
                }, 20);
                return;
            }
          //  console.log('tesAt');
            if (i === z) {
                this.apoint.moveTo([x, y], 20);
            } else {
              //  console.log('i: ' + i);
              //  console.log('tesBt');
               // console.log(Math.round(this.angle.Value() * 180 / Math.PI));
                this.apoint.moveTo([Math.cos(i * Math.PI / 6), Math.sin(i * Math.PI / 6)], 100, {callback: apointAnimation});
            }
            i = i + 1;
        };
        apointAnimation();
    }


    //点击减号 顺时针旋转动画一圈
    subRotateAnimation() {

        this.curve.setAttribute({visible: false});
        this.angle.setAttribute({strokeOpacity: 1, fillOpacity: 1});
        const x = this.ppoint.X();
        const y = this.ppoint.Y();
        const triangle = this.angle.Value() * 180 / Math.PI;
        let i = (Math.floor((triangle + 360) / 30));
        const z = (Math.floor((triangle) / 30));
       // let apointAnimation: any;

        this.apointAnimation = () => {
            if (i === z) {
               this.apoint.moveTo([x, y], 20);
            } else {

              //  console.log(Math.round(this.angle.Value()*180/Math.PI));
                this.apoint.moveTo([Math.cos(i * Math.PI / 6), Math.sin(i * Math.PI / 6)], 100, {callback: this.apointAnimation});
            }
            i = i - 1;
        };
        this.apointAnimation();

    }

    creteTicks() {
        let p, col, g;
        col = '#000000';
        p = [];
        p.push(this.board.create('text', [-1.2, -0.1, '-1' ], {fontSize:  24,
            highlight: false, strokeColor: col, isLabel: true, fixed: true, }));
        p.push(this.board.create('line', [[-1.01, 0, ], [-1.01, 0.05]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false , highlightStrokeColor: col, strokeColor: col, fixed: true, }));
        p.push(this.board.create('text', [1.04, -0.1, '1' ], {fontSize:  24,
            highlight: false, strokeColor: col, fillColor: col, fixed: true, }));
        p.push(this.board.create('line', [[1.01, 0, ], [1.01, 0.05]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, highlightStrokeColor: col, strokeColor: col, fixed: true, }));
        p.push(this.board.create('text', [-0.2, -1.1, '-1' ], {fontSize:  24, highlight: false,
            strokeColor: col, fillColor: col, fixed: true, }));
        p.push(this.board.create('line', [[0, -1.01, ], [0.05, -1.01 ]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, highlightStrokeColor: col, strokeColor: col, fixed: true, }));
        p.push(this.board.create('text', [-0.12, 1.1, '1'], {fontSize:  24, highlight: false,
            strokeColor: col, fillColor: col, fixed: true, }));
        p.push(this.board.create('line', [[0, 1.01, ], [0.05, 1.01 ]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, highlightStrokeColor: col, strokeColor: col, fixed: true, }));
        g = this.board.create('group', p);

      //  this.board.suspendUpdate();
    }

    //6.添加内
    createText() {
        const otext = this.board.create('text', [-0.2, -0.15, 'O'], {anchor: this.apoint, fontSize: 24,
            cssClass : '',
            highlight: false, strokeColor: '#000000 ', lineHeight: 31, fixed: true  }, {});

    }


    //a绑定拖拽事件
    dragEvent() {





        this.lastAngle = 60;
        let n = 0; //旋转圈数
        const z = 0;

       // this.curve.remove();
         this.curve = this.board.create('curve', [[0], [0]], {strokecolor: '#1B8B72 ', strokeWidth: 2, highlight: false, });
        this.apoint.on('drag', () => {
           this.angle.setAttribute({strokeOpacity: 0, fillOpacity: 0});
            this.curve.setAttribute({visible: true});

            //获取当前角度
            this.currentAngle = this.angle.Value() * 180 / Math.PI + n * 360;


            //判断旋转圈数
            if (this.currentAngle - this.lastAngle < 0) {

                n += 1;

            }
            this.currentAngle = this.angle.Value() * 180 / Math.PI + n * 360;

            this.lastAngle   = this.currentAngle;

            const currAngle = this.currentAngle;

            const angle = this.angle.Value();
            this.curve.updateDataArray = function() {

                const x = [0];
                const y = [0];


                //let angle = currAngle * Math.PI/180;
                for (let t = 0; t < angle; t = t + 0.1) {
                    console.log(t);
                    x.push(Math.pow(t / 200, 1 / 3) * Math.cos(t));
                    y.push(Math.pow(t / 200, 1 / 3) * Math.sin(t));
                }

                this.dataX = x;
                this.dataY = y;
            };
            this.board.update();

        });
    }

    //窗口大小发生变化，重新布置页面
    resize(): void {
        super.resize();
        this.board.setBoundingBox([-2, 2 , 2, -2], true);
    }
    //重置页面
    reset(): void {
        //super.reset();
       this.falg = true;


     setTimeout(() => {
        console.log(this.falg + '+++');

        //重置滑块值
         this.viewModel.$data.sliderNum = 0;
        //画螺旋角
         this.curve.remove();
         this.curve = this.board.create('curve', [[0], [0]], {strokecolor: '#1B8b72', strokeWidth: 2, highlight: false, } );
         this.angle.setAttribute({strokeOpacity: 1, fillOpacity: 1});

        console.log('hello world');
        this.apoint.moveTo([Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)], 0);
        console.log(11);
    }, 50);
    }


}
