var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.innerWidth;
var height = window.innerHeight;
var vue;
var sliderNumber = 2;
var widget_title = document.getElementsByClassName('titleText')[0];
var grid_background_text = document.getElementsByClassName('grid_background_text')[0];
var formulaText_Class = document.getElementsByClassName('formulaText_Class')[0];

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
        zoomButtons: false,

    });
    calculator.updateSettings({
        showGrid: false,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        xAxisNumbers: true,
        yAxisNumbers: true,
        xAxisLabel: "x",
        yAxisLabel: "y",
        showGrid: true,
        projectorMode: true,
        color: '#ffffff'
    });

    document.title = window.lang.title;
    widget_title.innerHTML = window.lang.title;
    formulaText_Class.innerHTML = window.lang.buttonText[0];
}

//初始化滑动条
function initSlider() {
    vue = new Vue({
        el: '#app',
        data() {
            return {
                sliderOneNumber: 1,
                sliderOneOptions: {
                    width: 206,
                    height: 6,
                    contained: false,
                    data: null,
                    min: -10,
                    max: 10,
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
                sliderNumber = vue.sliderOneNumber;
                updateFunctionLine();
            },
        }
    })
}

// 拖动滑条更新函数线
function updateFunctionLine() {
    calculator.setExpression({
        id: "formulaLine0",
        latex: "k=" + sliderNumber,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: {min: "-10", max: "10", step: "1"},
    });

    calculator.setExpression({
        id: "formulaLine1",
        latex: "y\\ =\\ \\frac{k}{x}",
        color: sliderNumber == 0 ? "#FF5A5A" : "#00AAFF"  ,
        hidden: false,
    });

    if (sliderNumber == 0) {
        formulaText_Class.style.display = 'inline-block';
    } else {
        formulaText_Class.style.display = 'none';
    }
}

//默认函数线
function createDefaultFormulaLine() {
    updateFunctionLine();
}

//图片适配手机
function adapterMobile() {
    if (window.innerWidth <= 1100 && window.innerWidth > 800) {
        vue.sliderOneOptions.width = 126;
        vue.sliderOneOptions.dotSize = [24, 24];
    } else if (window.innerWidth <= 800) {
        vue.sliderOneOptions.width = 100;
        vue.sliderOneOptions.dotSize = [12, 12];
    } else {
        vue.sliderOneOptions.width = 206;
        vue.sliderOneOptions.dotSize = [24, 24];
    }
}

window.onresize = () => {
    adapterMobile();
}

setCalcuState();
createDefaultFormulaLine();
initSlider();
adapterMobile();


