var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.innerWidth;
var height = window.innerHeight;
var vue;
var sliderNumOne = 1;
var sliderNumTwo = 2;
var sliderNumThree = 0;

var sliderNumOneText = 1;
var sliderNumTwoText = 2;
var sliderNumThreeText = 0;

var symmetry_axis = document.getElementById('symmetry_axis');
var elem = document.getElementsByClassName('formula_Class')[0];
var widget_title = document.getElementsByClassName('titleText')[0];
var formulaText_Class = document.getElementsByClassName('formulaText_Class')[0];
var symmetry_axis_text = document.getElementsByClassName('symmetry_axis_text')[0];
var grid_background_text = document.getElementsByClassName('grid_background_text')[0];
var symmetry_axis_image  = document.getElementsByClassName('symmetry_axis_image')[0];

//设置初始状态
function setCalcuState() {
    calculator.updateSettings({
        language: "zh-CN",
        expressions: false,
        keypad: false,
        lockViewport: false,
        pointsOfInterest: false,
        settingsMenu: false,
        trace: false,
        zoomButtons: true,

    });
    calculator.updateSettings({
        showGrid: false,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        xAxisNumbers: true,
        yAxisNumbers: true,
        xAxisLabel: "x",
        yAxisLabel: "y",
        showGrid: false,
        projectorMode: true,
        color: '#ffffff'
    });

    document.title = window.lang.title;
    widget_title.innerHTML = window.lang.title;
    formulaText_Class.innerHTML = window.lang.buttonText[0];
    symmetry_axis_text.innerHTML = window.lang.buttonText[1];
    grid_background_text.innerHTML = window.lang.buttonText[2];
}

//初始化滑动条
function initSlider() {
    vue = new Vue({
        el: '#app',
        data() {
            return {
                sliderOneNumber: 1,
                sliderTwoNumber: 2,
                sliderThreeNumber: 0,
                sliderOneOptions: {
                    width: 6,
                    height: 180,
                    contained: false,
                    direction: 'btt',
                    data: null,
                    min: -5,
                    max: 5,
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
                sliderThreeOptions: {
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
                }
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

                if (sliderNumOne >= 0) {
                    sliderNumOneText = sliderNumOne;
                } else {
                    sliderNumOneText = "(" + sliderNumOne + ")";
                }

            },
            sliderTwoNumber: () => {
                sliderNumTwo = vue.sliderTwoNumber;
                updateFunctionLine();

                if (sliderNumTwo >= 0) {
                    sliderNumTwoText = sliderNumTwo;
                } else {
                    sliderNumTwoText = "(" + sliderNumTwo + ")";
                }
            },
            sliderThreeNumber: () => {
                sliderNumThree = vue.sliderThreeNumber;
                updateFunctionLine();

                if (sliderNumThree >= 0) {
                    sliderNumThreeText = sliderNumThree;
                } else {
                    sliderNumThreeText = "(" + sliderNumThree + ")";
                }
            },
        }
    });

    adapterMobile();
}

// 拖动滑条更新函数线
function updateFunctionLine() {
    calculator.setExpression({
        id: "formulaLine0",
        latex: "a=" + sliderNumOne,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: {min: "-5", max: "5", step: "1"},
    });

    calculator.setExpression({
        id: "formulaLine1",
        latex: "b=" + sliderNumTwo,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: {min: "-20", max: "20", step: "1"},
    });

    calculator.setExpression({
        id: "formulaLine2",
        latex: "c=" + sliderNumThree,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: {min: "-20", max: "20", step: "1"},
    });

    if (sliderNumOne == 0) {
        calculator.setExpression({
            id: "formulaLine3",
            latex: "y\\ =\\ a\\left(x\\ -\\ b\\right)\\left(x\\ -\\ c\\right)",
            color: "#FF5A5A",
            hidden: false
        });
        formulaText_Class.style.display = 'inline-block';
        symmetry_axis.style.opacity = 0.3;
        symmetry_axis.style.pointerEvents = 'none';
        calculator.setExpression({
            id: "formulaLine4",
            latex: "x\\ =\\ \\frac{\\left(b\\ +\\ c\\right)}{2}",
            color: "#FF5A5A",
            hidden: true,
            lineStyle: "DASHED",
        });

        calculator.setExpression({
            id: "formulaLine5",
            labelSize: 'large',
            latex: "\\left(\\frac{\\left(b\\ +\\ c\\right)}{2},\\ \\ -3\\right)",
            color: "#FF5A5A",
            dragMode: "NONE",
            hidden: true,
            label: katex.renderToString("x = " + ((sliderNumTwo + sliderNumThree) / 2).toFixed(2)),
            labelOrientation: "right",
            labelSize: "medium",
            pointStyle: "POINT",
            showLabel: false,
        });
    } else {
        calculator.setExpression({
            id: "formulaLine3",
            latex: "y\\ =\\ a\\left(x\\ -\\ b\\right)\\left(x\\ -\\ c\\right)",
            color: "#00AAFF",
            hidden: false
        });
        formulaText_Class.style.display = 'none';
        symmetry_axis.style.opacity = 1;
        symmetry_axis.style.pointerEvents = 'auto';

        calculator.setExpression({
            id: "formulaLine4",
            latex: "x\\ =\\ \\frac{\\left(b\\ +\\ c\\right)}{2}",
            color: "#FF5A5A",
            hidden: !document.getElementById('symmetry_axis_label').checked,
            lineStyle: "DASHED",
        });

        calculator.setExpression({
            id: "formulaLine5",
            labelSize: 'large',
            latex: "\\left(\\frac{\\left(b\\ +\\ c\\right)}{2},\\ \\ -3\\right)",
            color: "#FF5A5A",
            dragMode: "NONE",
            hidden: true,
            label: katex.renderToString("x = " + ((sliderNumTwo + sliderNumThree) / 2).toFixed(2)),
            labelOrientation: "right",
            labelSize: "medium",
            pointStyle: "POINT",
            showLabel: document.getElementById('symmetry_axis_label').checked,
        });
    }

    if (sliderNumOne !== 0 && document.getElementById('symmetry_axis_label').checked) {
        symmetry_axis_image.style.display = 'inline-block';
    } else {
        symmetry_axis_image.style.display = 'none';
    }


    calculator.setExpression({
        id: "formulaLine6",
        labelSize: 'large',
        latex: "\\left(b,\\ 0\\right)",
        color: "#FF5A5A",
        dragMode: "NONE",
        hidden: sliderNumOne == 0,
        label: "",
        labelOrientation: "right",
        labelSize: "medium",
        pointStyle: "POINT",
        showLabel: true,
        secret: false,
        showLabel: false,
        verticalLabel: false
    });

    calculator.setExpression({
        id: "formulaLine7",
        labelSize: 'large',
        latex: "\\left(b + 0.1,\\ 0.5\\right)",
        color: "#000000",
        dragMode: "NONE",
        hidden: true,
        label: "(" + sliderNumTwo + ", 0)",
        labelOrientation: "right",
        labelSize: "medium",
        pointStyle: "POINT",
        showLabel: true,
        secret: false,
        showLabel: sliderNumOne !== 0,
        verticalLabel: false
    });

    calculator.setExpression({
        id: "formulaLine8",
        labelSize: 'large',
        latex: "\\left(c,\\ 0\\right)",
        color: "#FF5A5A",
        dragMode: "NONE",
        hidden: sliderNumOne == 0,
        label: "",
        labelOrientation: "right",
        labelSize: "medium",
        pointStyle: "POINT",
        showLabel: true,
        secret: false,
        showLabel: false,
        verticalLabel: false
    });

    calculator.setExpression({
        id: "formulaLine9",
        labelSize: 'large',
        latex: "\\left(c-0.1,\\ 0.5\\right)",
        color: "#000000",
        dragMode: "NONE",
        hidden: true,
        label: "(" + sliderNumThree + ", 0)",
        labelOrientation: "left",
        labelSize: "medium",
        pointStyle: "POINT",
        showLabel: true,
        secret: false,
        showLabel: sliderNumOne !== 0,
        verticalLabel: false
    });
}

//默认函数线
function createDefaultFormulaLine() {
    updateFunctionLine();
}

//图片适配手机
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
        vue.sliderThreeOptions.height = 126;

        vue.sliderOneOptions.tooltipPlacement = 'bottom';
        vue.sliderTwoOptions.tooltipPlacement = 'bottom';
        vue.sliderThreeOptions.tooltipPlacement = 'bottom';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderThreeOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';

        vue.sliderOneOptions.dotSize = [24, 24];
        vue.sliderTwoOptions.dotSize = [24, 24];
        vue.sliderThreeOptions.dotSize = [24, 24];
    } else if (window.innerWidth <= 800) {
        vue.sliderOneOptions.height = 90;
        vue.sliderTwoOptions.height = 90;
        vue.sliderThreeOptions.height = 90;

        vue.sliderOneOptions.tooltipPlacement = 'bottom';
        vue.sliderTwoOptions.tooltipPlacement = 'bottom';
        vue.sliderThreeOptions.tooltipPlacement = 'bottom';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderThreeOptions.tooltipStyle.transform = 'scale(0.7, 0.7)';
        vue.sliderOneOptions.dotSize = [16, 16];
        vue.sliderTwoOptions.dotSize = [16, 16];
        vue.sliderThreeOptions.dotSize = [16, 16];
    } else {
        vue.sliderOneOptions.height = 180;
        vue.sliderTwoOptions.height = 180;
        vue.sliderThreeOptions.height = 180;

        vue.sliderOneOptions.tooltipPlacement = 'left';
        vue.sliderTwoOptions.tooltipPlacement = 'left';
        vue.sliderThreeOptions.tooltipPlacement = 'left';
        vue.sliderOneOptions.tooltipStyle.transform = 'scale(1, 1)';
        vue.sliderTwoOptions.tooltipStyle.transform = 'scale(1, 1)';
        vue.sliderThreeOptions.tooltipStyle.transform = 'scale(1, 1)';

        vue.sliderOneOptions.dotSize = [24, 24];
        vue.sliderTwoOptions.dotSize = [24, 24];
        vue.sliderThreeOptions.dotSize = [24, 24];
    }
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

//判断横竖屏
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

/**
 * 创建手机端竖屏提示
 */
function initOrientationTip() {
    if (document.getElementById('orientationTip')) {
        return;
    }

    //提示图片
    const tipImg = new Image();
    tipImg.src = 'images/orientation.png';

    const orienttatioDiv = document.createElement('div');
    orienttatioDiv.classList.add('orientation_div_tip');
    orienttatioDiv.appendChild(tipImg);
    orienttatioDiv.id = 'orientationTip';

    const tipTxt = document.createElement('div');
    tipTxt.innerHTML = '请将屏幕自动旋转功能打开<p></p>并横屏使用';
    orienttatioDiv.appendChild(tipTxt);

    //遮罩
    const maskDiv = document.createElement('div');
    maskDiv.classList.add('mask_div');
    maskDiv.id = 'maskContent';
    document.body.appendChild(maskDiv);
    document.body.appendChild(orienttatioDiv);
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
    window.addEventListener(evt, (event) => {
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

// 显示对称轴
function showSymmetryAxis() {
    calculator.setExpression({
        id: "formulaLine4",
        latex: "x\\ =\\ \\frac{\\left(b\\ +\\ c\\right)}{2}",
        color: "#FF5A5A",
        hidden: !document.getElementById('symmetry_axis_label').checked,
        lineStyle: "DASHED",
    });

    calculator.setExpression({
        id: "formulaLine5",
        labelSize: 'large',
        latex: "\\left(\\frac{\\left(b\\ +\\ c\\right)}{2},\\ \\ -3\\right)",
        color: "#FF5A5A",
        dragMode: "NONE",
        hidden: true,
        label: katex.renderToString("x = " + ((sliderNumTwo + sliderNumThree) / 2).toFixed(2)),
        labelOrientation: "right",
        labelSize: "medium",
        pointStyle: "POINT",
        showLabel: document.getElementById('symmetry_axis_label').checked,
    });

    if (document.getElementById('symmetry_axis_label').checked) {
        symmetry_axis_image.style.display = 'inline-block';
    } else {
        symmetry_axis_image.style.display = 'none';
    }
}

// 显示网格背景
function showGridBackground() {
    calculator.updateSettings({
        showGrid: false,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        xAxisNumbers: true,
        yAxisNumbers: true,
        xAxisLabel: "x",
        yAxisLabel: "y",
        showGrid: document.getElementById('grid_background_label').checked,
        projectorMode: true,
    });
}

initTip();
setCalcuState();
createDefaultFormulaLine();
setTimeout(() =>{
    initSlider();
    window.onresize = () => {
        console.log('onresize');
        adapterMobile();
    }
}, 800)


