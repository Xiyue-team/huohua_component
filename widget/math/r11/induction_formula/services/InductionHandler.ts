
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from "../../../../../src/core/ViewController";


const jxg = require('../../../../../src/libs/jsxgraphcore.js');
jxg.Options.axis.ticks.majorHeight = 20;
jxg.Options.axis.ticks.insertTicks = false;
/**
 * 诱导公式
 * 1.创建坐标轴
 * 2.画圆
 * 3.画线段
 * 4.画角度
 * 5.在面板中添加滑动条，绑定滑动条事件
 * 6.绑定圆上p点鼠标拖动事件
 * 7.添加重置按钮并绑定重置事件
 */
export class InductionHandler  extends CommonViewHandler implements ViewHandler {

    public board: any;
    private circle: any;
    private ppoint: any;
    private mpoint: any;
    private qpoint: any;
    private npoint: any;
    private bpoint: any; //q反向延长线交点
    private cpoint: any;
    private fpoint: any;
    private angle: any;
    private text: any;
    private arry: Array<any> = [];
    private group: any;
    private curve: any;
    private pfline: any;
    private currentAngle: any;
    private lastAngle: any;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        ViewController.getInstance().hideLoading(1000);
    }

    //初始化board
    initBoard() {
        this.board = JXG.JSXGraph.initBoard('box', {
                boundingbox:  [-2, 2, 2, -2],
                axis:  false,
                showCopyright:  false,
                showcopyright: false, showNavigation: false, grid: false,
                pan: {

                    enabled:  false,
                    needTwoFingers:  false,
                    needShift:  true,

                },

                zoom:  {
                    pinchHorizontal:  false,
                    pinchVertical:  false,
                    pinchSensitivity:  1,
                    min:  2,
                    max:  0,
                    wheel:  true,
                    needShift:  true
                },
            }
        );
    }

    init() {
        //初始化画布内容
        this.initBoard();
        this.createXYAxis();
        this.drawCircle();
        this.drawLine();
        this.drawAngle();
        this.dragEvent();
        this.createText();
        this.createTicks();
    }

    //1.创建坐标轴
    createXYAxis() {

        //1.创建坐标轴
        // x轴
        const xaxis = this.board.create('axis', [[0, 0], [1, 0]],

            {name: 'x',
                withLabel:  true,
                label:  {position:  'rt',
                    offset:  [-10, -10],
                    fontSize: 24,
                    highlight: false,
                },
                drawZero: false,
                strokeWidth: 1.4,
                strokeColor: '#000000',
                highlight: false,
            },
        );
        xaxis.removeAllTicks();
        this.board.create('ticks', [xaxis, 0], {
                strokeColor: '#FFF',
                drawLabels: true,
                label:  {offset:  [-12, -10]},
                minorTicks: 0,
                drawZero: false,
            }
        );
        //y轴
        const yaxis = this.board.create('axis', [[0, 0], [0, 1]],

            {
                name:  'y',
                withLabel:  true,
                label:  {
                    position:  'rt',
                    offset:  [15, 5],
                    fontSize: 24,
                    highlight: false,
                },
                drawZero: false,
                strokeWidth: 1.4,
                strokeColor: '#000000',
                highlight: false,
            });
        yaxis.removeAllTicks();
        this.board.create('ticks', [yaxis, 0], {
                type: 'line',
                strokeColor: '#FFF',
                drawLabels: true,
                label:  {offset:  [7, -2]},
                minorTicks: 0,
                drawZero: false,
            }
        );
    }

    //2.画圆
    drawCircle() {
        this.circle = this.board.create('circle', [[0, 0], [1, 0]], {fixed: true, strokeColor: '#299AED',
            strokeWidth: 4, draft: false, highlight: false, });
    }


    //3.画线段
    drawLine() {

        //原点
        const opoint = this.board.create('point', [0, 0], {name: 'O', size: 2, fixed: true, fill: 'white',
            visible: false, highlight:  false, label:  {
            position:  'bot',
            offset:  [-20, -15],
            fontSize: 18,
            highlight: false,
        }});


        const outcircle = this.board.create('circle', [[0, 0], [1.2, 1]], {fixed: true, strokeColor: '#299AED',
            visible: false, strokeWidth: 4, draft: false, });

       // let odpoint = this.board.create('point',[0,0], {name: '',size: 2,fixed: true,fill: 'white',visible: true});
        this.fpoint = this.board.create('glider', [Math.cos(Math.PI / 3) + 0.17, Math.sin(Math.PI / 3) + 0.3, outcircle],
            {name: '', size: 8, fillColor: 'white', strokeColor: ' rgba(0,0,0,0.35)', showInfobox: false,
                shadowColor: 'box-shadow:  0 2px 6px 0 ', highlight: false, label: {fontSize: 24, highlight: false, }});

        this.pfline = this.board.create('line', [opoint, this.fpoint, ], {straightFirst: false, straightLast: false, visible: false,
            strokeWidth: 4, fillOpacity: 0.4, dash: 2, strokeColor: '#7000D3', highlight: false, });


        //给移动点绑定事件鼠标移上样式变成小手
        this.fpoint.on('mouseover', () => {document.body.style.cursor = 'pointer'; });
        //给移动点绑定事件鼠标离开样式还原
        this.fpoint.on('mouseout', () => {document.body.style.cursor = 'default'; });

        //p点
        this.ppoint = this.board.create('glider', [Math.cos(Math.PI / 3 ), Math.sin(Math.PI / 3), this.pfline],
            {name: 'P', size: 2, stokeWidth: 1, fixed: true, strokeColor: '#000000 ',
                showInfobox: false, fillColor: '#E30000', highlight: false, label: {fontSize: 24, highlight: false, }});

        //m点
        this.mpoint = this.board.create('point', [Math.cos(Math.PI / 3), 0], {name: 'M', size: 2, fill: 'white', fontSize: 24,
            fixed: true, showInfobox: false, highlight: false, label:  {
            position:  'bot',
            offset:  [-5, -15],
            fontSize: 24,
            highlight: false,
        }});

        //c点 p正切线交点
        this.cpoint =  this.board.create('point', [1, Math.sin(Math.PI / 3) / Math.cos(Math.PI / 3)], {name: 'C',
            size: 2, fill: 'white', visible: false, fixed: true, highlight: false, });



        //op线段
        const opline = this.board.create('line', [opoint, this.ppoint], {straightFirst: false,
            straightLast: false, strokeWidth: 4, strokeColor: '#7000D3 ', highlight: false, });


        //om线段
        const omline = this.board.create('line', [opoint, this.mpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#EF732C', highlight: false, });

        //pm线段
        const pmline =  this.board.create('line', [this.mpoint, this.ppoint],
            {straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#D0021B', highlight: false, });

        //p正切线
        const tptanline = this.board.create('line' , [[1, 0], this.cpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#1B8B72', highlight: false, });

        //p反向延长线
        const bpline =   this.board.create('line', [this.ppoint, this.cpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#7000D3', dash: 2, highlight: false, });




        //n点
        this.npoint = this.board.create('point', [Math.cos(Math.PI / 3 + Math.PI / 2), 0], {name: 'M′',
            size: 2, fontSize: 24, fill: 'white', showInfobox: false, fixed: true, highlight: false, label:  {
            position:  'bot',
            offset:  [-5, -15],
            fontSize: 24,
            highlight: false,
        }});
        //q点
        this.qpoint = this.board.create('point', [Math.cos(Math.PI / 3 + Math.PI / 2), Math.sin(Math.PI / 3 + Math.PI / 2)],
            {name: 'P′', size: 2, stokeWidth: 1, strokeColor: '#000000 ', showInfobox: false,
                fillColor: '#E30000', fixed: true, highlight: false, label:  {
            position:  '',
            offset:  [-15, 10],
            fontSize: 24,
            highlight: false,
        }});

        //b点

        this.bpoint = this.board.create('point', [1, Math.sin(Math.PI / 3 + Math.PI / 2) / Math.cos(Math.PI / 3 + Math.PI / 2)],
            {name: 'B', size: 2, fill: 'white', visible: false, fixed: true, highlight: false, label:  {
            position:  'bot',
            offset:  [-5, -15],
            highlight: false,
        }});


        //nq线段
        const nqline = this.board.create('line', [this.npoint, this.qpoint], {straightFirst: false,
            straightLast: false, strokeWidth: 4, strokeColor: '#D0021B', highlight: false, });

        //op′
        const qpline = this.board.create('line', [opoint, this.qpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#7000D3', highlight: false, });

        //on线段
        const online = this.board.create('line', [opoint, this.npoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#EF732C', highlight: false, });

        //q点反向延长线
        const reverseline =  this.board.create('line', [opoint, this.bpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#7000D3', dash: 2, highlight: false, });

        //q点正切线
        const qtanline = this.board.create('line', [[1, 0], this.bpoint], {straightFirst: false, straightLast: false,
            strokeWidth: 4, strokeColor: '#1B8B72', highlight: false, });



        this.arry.push(opoint);
        this.arry.push(this.ppoint);
        this.arry.push(this.mpoint);
        this.arry.push(this.qpoint);
        this.arry.push(this.npoint);
        this.arry.push(this.fpoint);
        this.arry.push(this.bpoint);
        this.arry.push(this.cpoint);

        this.arry.push(opline);
        this.arry.push(bpline);
        this.arry.push(omline);
        this.arry.push(online);
        this.arry.push(this.pfline);
        this.arry.push(pmline);
        this.arry.push(tptanline);


        this.arry.push(nqline);
        this.arry.push(qpline);
        this.arry.push(reverseline);
        this.arry.push(qtanline);

        this.group = this.board.create('group', this.arry);
    }


    //4.画角度
    drawAngle() {

            const cpoint = this.board.create('point', [0.3, 0], {name: 'C', size: 2, fill: 'white',
                fixed: true, visible: false});
            const opoint = this.board.create('point', [0, 0], {name: '', size: 2, fill: 'white',
                fixed: true, visible: false});
            this.angle = this.board.create('angle', [cpoint, opoint, this.fpoint], {name: 'α',
                type: 'sector', strokeWidth: 2, strokeColor: '#1B8B72', fillColor: '#75B9AA', fillOpacity: 1,
                orthoType: 'sector', orthoSensitivity: 2, radius: 0.2,
                highlight: false, label: { highlight: false, fontSize: 18}});

    }


    //5.绑定滑动条事件
    createSlidingEvent(k: any) {

        this.slidingEvent(k);

    }


    //绘制 q的cos,sin,tan三角函数线
    slidingEvent(k: any) {

        const angle = Math.round(this.angle.Value() * 180 / Math.PI);

        const sinx = Math.sin(this.angle.Value() + Math.PI * k / 2);

        const cosx = Math.cos(this.angle.Value() + Math.PI * k / 2);
        console.log('cosx=+' + cosx);
        let tanx;
        if (angle === 0 || angle === 90) {
            tanx = 0;
        } else {
            tanx = sinx / cosx;
        }


        this.qpoint.moveTo([cosx, sinx], 0);

        this.npoint.moveTo([cosx, 0], 0);
        this.bpoint.moveTo([1, tanx], 0);

        this.text.moveTo([cosx - 0.2, sinx + 0.2], 0);

    }

    //6.绑定f鼠标拖动事件
    dragEvent() {

        this.lastAngle = 60;
        const n = 0; //旋转圈数


        this.curve = this.board.create('curve', [[0], [0]], {strokecolor: '#1B8B72 ', strokeWidth: 2, highlight: false, });

        //绘制q sin,cos.tan三角函数线
        this.fpoint.on('drag', () => {
           this.pfline.visible(true);
            this.angle.setAttribute({strokeOpacity: 0, fillOpacity: 0});

            const k = this.viewModel.$data.sliderNum;

            const angle = Math.round(this.angle.Value() * 180 / Math.PI);
            console.log('angle+=' + angle);
            const sinx = Math.sin(this.angle.Value());

            const cosx = Math.cos(this.angle.Value());
            let tanx;
            if (angle === 0 || angle === 90) {
                tanx = 0;
            } else {
                tanx = sinx / cosx;
            }


            this.mpoint.moveTo([cosx, 0], 0);

            this.cpoint.moveTo([1, tanx], 0);

            this.createSlidingEvent(k);




            const angles = this.angle.Value();
            this.curve.updateDataArray = function() {

                const x = [0];
                const y = [0];


                // let angle = currAngle * Math.PI/180;
                for (let t = 0; t < angles;  t = t + 0.1) {
                    console.log(t);
                    x.push(Math.pow(t / 200, 1 / 3) * Math.cos(t));
                    y.push(Math.pow(t / 200, 1 / 3) * Math.sin(t));
                }
                this.dataX = x;
                this.dataY = y;
            };
            this.board.update();



            }
        );
    }

    createText() {
        this.text = this.board.create('text', [Math.cos(Math.PI * 5 / 6) - 0.2, Math.sin(Math.PI * 5 / 6) + 0.4, 'α+kπ/2的终边'],
            {fontSize: 18, fixed: true, strokeColor: '#000000', fillColor: '#000000', highlight: false, });
        // this.text = this.board.create('text',[-1.9,1,'α+kπ/2的终边'],{fontSize: 18,fixed: true,strokeColor:
        // '#000000',fillColor: '#000000', highlight: false,});
    }

    //创建刻度
    createTicks() {

        let p, col, g;
        col = '#000000';
        p = [];
        p.push(this.board.create('text', [-1.2, -0.1, '-1' ], {fontSize:  24, strokeColor: col,
            fillColor: col, isLabel: true, fixed: true, highlight: false, }));
        p.push(this.board.create('line', [[-1.01, 0, ], [-1.01, 0.05]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, strokeColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('text', [1.04, -0.1, '1' ], {fontSize:  24, strokeColor: col,
            fillColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('line', [[1.01, 0, ], [1.01, 0.05]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, strokeColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('text', [-0.2, -1.1, '-1' ], {fontSize:  24, strokeColor: col,
            fillColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('line', [[0, -1.01 , ], [0.05, -1.01 ]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, strokeColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('text', [-0.12, 1.1, '1'], {fontSize:  24, strokeColor: col,
            fillColor: col, fixed: true, highlight: false, }));
        p.push(this.board.create('line', [[0, 1.01, ], [0.05, 1.01 ]], {stokeWidth: 8,
            straightFirst: false,
            straightLast: false, strokeColor: col, fixed: true, highlight: false, }));
        g = this.board.create('group', p);

    }

    //窗口大小发生改变调用
    resize() {
        super.resize();
        this.board.setBoundingBox([-2, 2, 2 , -2], true);
    }

    //重置页面
    reset(): void {

        //插除内容
      // jxg.JSXGraph.freeBoard(this.board);

        //初始化面板按钮
        this.viewModel.$data.sliderNum = 1;
        //重绘
        // this.domReay();
        this.fpoint.moveTo([Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)], 0);
        this.qpoint.moveTo([Math.cos(Math.PI / 3 + Math.PI / 2), Math.sin(Math.PI / 3 + Math.PI / 2)], 0);
        this.ppoint.moveTo([Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)], 0);
        this.mpoint.moveTo([Math.cos(Math.PI / 3), 0], 0);
        this.npoint.moveTo([Math.cos(Math.PI / 3 + Math.PI / 2), 0], 0);
        this.bpoint.moveTo([1, Math.sin(Math.PI / 3 + Math.PI / 2) / Math.cos(Math.PI / 3 + Math.PI / 2)], 0);
        this.cpoint.moveTo([1, Math.sin(Math.PI / 3) / Math.cos(Math.PI / 3)], 0);
        this.text.moveTo([Math.cos(Math.PI * 5 / 6) - 0.2, Math.sin(Math.PI * 5 / 6) + 0.4], 0);
        // this.text.moveTo([-1.9,0.8],0);

        //画螺旋角
        this.curve.remove();
        this.curve = this.board.create('curve', [[0], [0]], {strokecolor: '#1B8b72', strokeWidth: 2, highlight: false, });

        this.angle.setAttribute({strokeOpacity: 1, fillOpacity: 1});


    }

}
