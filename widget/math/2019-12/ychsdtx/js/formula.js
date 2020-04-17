let elt = document.getElementById('calculator');
let calculator = Desmos.GraphingCalculator(elt);
let width = window.innerWidth;
let height = window.innerHeight;
let vue;
let sliderNumOne = 1;
let sliderNumTwo = 2;

let sliderNumOneText = 1;
let sliderNumTwoText = 2;

let elem = document.getElementsByClassName('formula_Class')[0];
let widget_title = document.getElementsByClassName('titleText')[0];
let exception = document.getElementById('exception');

//设置初始状态
function setCalcuState() {
    calculator.updateSettings({
        language: 'zh-CN',
        expressions: false,
        keypad: false,
        lockViewport: false,
        pointsOfInterest: false,
        settingsMenu: false,
        trace: false,
        zoomButtons: false,

    });
    calculator.updateSettings({
        showGrid: true,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        xAxisNumbers: true,
        yAxisNumbers: true,
        xAxisLabel: 'x',
        yAxisLabel: 'y',
        projectorMode: true,
        color: '#ffffff'
    });

    document.title = window.lang.title;
    widget_title.innerHTML = window.lang.title;
    exception.innerHTML = window.lang.notice[0];
}

// 初始化滑动条
function initSlider() {
    vue = new Vue({
        el: '#app',
        data() {
            return {
                sliderOneNumber: 1,
                sliderTwoNumber: 2,
                sliderOneOptions: {
                    width: 6,
                    height: 180,
                    contained: false,
                    direction: 'btt',
                    data: null,
                    min: -15,
                    max: 15,
                    reverse: false,
                    tooltip: 'always',
                    tooltipSize: [18, 18],
                    tooltipStyle: {
                        backgroundColor: '#0091FF',
                    },
                    piecewise: false,
                    dotSize: [24, 24],
                    process: false,
                    railStyle: {
                        backgroundColor: '#cfcfcf',
                    }
                },
                sliderTwoOptions: {
                    width: 6,
                    height: 180,
                    contained: false,
                    direction: 'btt',
                    data: null,
                    min: -20,
                    max: 20,
                    reverse: false,
                    tooltip: 'always',
                    piecewise: false,
                    dotSize: [24, 24],
                    process: false,
                    railStyle: {
                        backgroundColor: '#cfcfcf',
                    },
                    tooltipStyle: {
                        backgroundColor: '#0091FF',
                    },
                },

            }
        },
        methods: {},
        mounted() {

        },
        components: {
            'vueSlider': window['vue-slider-component'],
        },
        watch: {
            sliderOneNumber: () => {
                sliderNumOne = vue.sliderOneNumber;
                updateFunctionLine();

                if (sliderNumOne > -1) {
                    sliderNumOneText = sliderNumOne;
                } else {
                    sliderNumOneText = '(' + sliderNumOne + ')';
                }

            },
            sliderTwoNumber: () => {
                sliderNumTwo = vue.sliderTwoNumber;
                updateFunctionLine();

                if (sliderNumTwo > -1) {
                    sliderNumTwoText = sliderNumTwo;
                } else {
                    sliderNumTwoText = '(' + sliderNumTwo + ')';
                }
            }
        }
    })
}

// 拖动滑条更新函数线
function updateFunctionLine() {

    // k为0
    if (sliderNumOne == 0) {
        drawNonLinear(false);
        drawLinear(true);
        drawProportional(true);
        exception.style.display = 'none';
    }

    // k不为0，b为0
    if (sliderNumOne != 0 && sliderNumTwo == 0) {
        drawProportional(false);
        drawLinear(true);
        drawNonLinear(true);
        exception.style.display = 'inline-block';
    }

    // k不为0，b不为0
    if (sliderNumOne != 0 && sliderNumTwo != 0) {
        drawLinear(false);
        drawNonLinear(true);
        drawProportional(true);
        exception.style.display = 'none';
    }

    // 函数图像与y轴的交点
    calculator.setExpression({
        id: 'formulaLine4',
        latex: '\\left(0,\\ ' + sliderNumTwo + '\\right)',
        color: '#FF5A5A ',
        dragMode: 'NONE',
        hidden: sliderNumOne == 0,
        label: '(0,' + sliderNumTwo + ')',
        labelOrientation: 'right',
        labelSize: 'medium',
        pointStyle: 'POINT',
        showLabel: true,
        secret: false,
        showLabel: false,
        verticalLabel: false
    });

    // 交点坐标
    calculator.setExpression({
        id: 'formulaLine5',
        latex: '\\left(0.3,\\ ' + (sliderNumTwo - 0.1) + '\\right)',
        color: '#000000',
        dragMode: 'NONE',
        hidden: true,
        label: katex.renderToString('A(0,' + sliderNumTwo + ')'),
        labelOrientation: 'right',
        labelSize: 'medium',
        pointStyle: 'POINT',
        showLabel: true,
        secret: false,
        showLabel: sliderNumOne !== 0,
        verticalLabel: false
    });

    // 非一次函数异常文字
    calculator.setExpression({
        id: 'formulaLine6',
        labelSize: 'medium',
        latex: '\\left(-0.6,\\ ' + (sliderNumTwo - 0.5) + '\\right)',
        color: 'rgb(255, 90, 90)',
        dragMode: 'NONE',
        hidden: true,
        label: window.lang.notice[1],
        labelOrientation: 'right',
        showLabel: true,
        secret: false,
        showLabel: sliderNumOne === 0,
        verticalLabel: false
    });
}

// 一次函数图像
function drawLinear(hidden) {
    calculator.setExpression({
        id: 'formulaLine3',
        latex: 'y=' + sliderNumOne + '*x+' + sliderNumTwo,
        color: '#0091FF',
        hidden: hidden,
    });
}

// 正比例函数图像
function drawProportional(hidden) {
    calculator.setExpression({
        id: 'formulaLine2',
        latex: 'y=' + sliderNumOne + '*x',
        color: '#0091FF',
        hidden: hidden
    });
}

// 非一次函数
function drawNonLinear(hidden) {
    calculator.setExpression({
        id: 'formulaLine1',
        latex: 'y=' + sliderNumTwo,
        color: '#FF5A5A',
        hidden: hidden
    });
}

// 默认函数线
function createDefaultFormulaLine() {
    updateFunctionLine();
}

// 图片适配手机
function adapterMobile() {
    if (height <= 320) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
    }

    if ((height <= 500 && height > 320)) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
    }

    if ((height <= 768 && height > 500)) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
    }

    if (window.innerWidth <= 1100 && window.innerWidth > 800) {

        vue.sliderOneOptions.height = 126;
        vue.sliderTwoOptions.height = 126;
        vue.sliderOneOptions.tooltipPlacement = 'bottom';
        vue.sliderTwoOptions.tooltipPlacement = 'bottom';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderOneOptions.dotSize = [24, 24];
        vue.sliderTwoOptions.dotSize = [24, 24];

    } else if (window.innerWidth <= 800) {

        vue.sliderOneOptions.height = 105;
        vue.sliderTwoOptions.height = 105;
        vue.sliderOneOptions.tooltipPlacement = 'bottom';
        vue.sliderTwoOptions.tooltipPlacement = 'bottom';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderOneOptions.dotSize = [16, 16];
        vue.sliderTwoOptions.dotSize = [16, 16];

    } else {

        vue.sliderOneOptions.height = 180;
        vue.sliderTwoOptions.height = 180;
        vue.sliderOneOptions.tooltipPlacement = 'left';
        vue.sliderTwoOptions.tooltipPlacement = 'left';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(1, 1)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(1, 1)';
        vue.sliderOneOptions.dotSize = [24, 24];
        vue.sliderTwoOptions.dotSize = [24, 24];

    }
}

window.onresize = () => {
    adapterMobile();
}

// 当用户第一次横屏时显示提示信息
function showAdvice() {
    const adviceEle = document.getElementById('browserAdvice');
    if (adviceEle) {
        return;
    }
    const adviceDiv = document.createElement('div');
    adviceDiv.classList.add('advice_div_tip');
    adviceDiv.id = 'browserAdvice';
    adviceDiv.innerHTML = '建议您在电脑或平板上打开，以获取最佳的演示效果';
    document.body.appendChild(adviceDiv);
    setTimeout(() => {
        adviceDiv.style.display = 'none';
    }, 3000);
}

function initTip() {
    forceMobildLandscape();
}

//是否是火花播放器
function isHuohuaPlayer() {
    return navigator.userAgent.indexOf('huohua_app') > -1;
}

// 判断横竖屏
function getOrientation() {
    let orientation = '';
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (window.hasOwnProperty('orientation') === false) {
        if (width > height) {
            orientation = 'landscape';
        } else {
            orientation = 'portrait';
        }
    } else {
        const orientationNum = Number.parseInt(window.orientation);
        if (orientationNum === 0 || orientationNum === 180) {
            //竖屏
            orientation = 'portrait';
        } else if (orientationNum === 90 || orientationNum === -90) {
            //横屏
            orientation = 'landscape';
        }
    }

    return orientation;
}

// 创建手机端竖屏提示
function initOrientationTip() {
    if (document.getElementById('orientationTip')) {
        return;
    }

    //提示图片
    const tipImg = new Image();
    tipImg.src = 'images/orientation.png';

    const orientatioDiv = document.createElement('div');
    orientatioDiv.classList.add('orientation_div_tip');
    orientatioDiv.appendChild(tipImg);
    orientatioDiv.id = 'orientationTip';

    const tipTxt = document.createElement('div');
    tipTxt.innerHTML = '请将屏幕自动旋转功能打开<p></p>并横屏使用';
    orientatioDiv.appendChild(tipTxt);

    //遮罩
    const maskDiv = document.createElement('div');
    maskDiv.classList.add('mask_div');
    maskDiv.id = 'maskContent';
    document.body.appendChild(maskDiv);
    document.body.appendChild(orientatioDiv);
    document.getElementById('control_panel').style.display = 'none';
}

function showOrientationTip() {
    if (document.getElementById('orientationTip')) {
        document.getElementById('orientationTip').style.display = 'block';
        document.getElementById('maskContent').style.display = 'block';
    } else {
        initOrientationTip();
    }
}

function hideOrientationTip() {
    if (document.getElementById('orientationTip')) {
        document.getElementById('orientationTip').style.display = 'none';
        document.getElementById('maskContent').style.display = 'none';
    }
}

function forceMobildLandscape() {
    if (!navigator.userAgent.match(/.*Mobile.*/) || isHuohuaPlayer()) {
        return;
    }

    const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(evt, () => {
        if (window.orientation === 90 || window.orientation === -90) {
            hideOrientationTip();
            //如果是通过竖屏旋转到横屏则显示提示
            showAdvice();
            location.reload();
        } else {
            showOrientationTip();
        }
    }, false);
    changeOrientationEvt();
}

function changeOrientationEvt() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (width > height) { // 横屏
        window.direction = 0;
        //如果第一次进来是横屏则直接显示横屏提示
        showAdvice();
    } else {
        initOrientationTip();
        window.direction = 1;
    }
}

initTip();
setCalcuState();
createDefaultFormulaLine();
initSlider();
adapterMobile();


