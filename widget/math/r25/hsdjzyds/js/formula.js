var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.screen.width;
var height = window.screen.height;
var numberA = -0.5;
var num =0;
var buttonFlag = false;
var derivative_function = document.getElementsByClassName('derivative_function')[0];
var max_value = document.getElementsByClassName('max_value')[0];
var min_value = document.getElementsByClassName('min_value')[0];
var white_formula = document.getElementsByClassName('whiteFormula_class')[0];

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
    zoomButtons: true
  });
  calculator.updateSettings({
    showGrid: false,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    xAxisNumbers: true,
    yAxisNumbers: true,
    xAxisLabel: "x",
    yAxisLabel: "y",
    projectorMode: true
  });
}

//按钮导函数点击事件
function derivativeEvent() {
  num++;
  var state = calculator.getState();
  if (buttonFlag) {
    buttonFlag = false;
    derivative_function.style.background = '#EBEBEB';
    derivative_function.style.color = '#525252';
    white_formula.style.display = 'none';
    state.expressions.list[1].hidden = true;
    state.expressions.list[2].hidden = true;
    state.expressions.list[3].hidden = true;
    state.expressions.list[7].hidden = true;
    state.expressions.list[8].hidden = true;
    state.expressions.list[9].hidden = true;
    state.expressions.list[10].hidden = true;
    state.expressions.list[11].hidden = true;
    if (state.expressions.list[15]) {
      state.expressions.list[15].showLabel = false;
    }
  } else {
    buttonFlag = true;
    derivative_function.style.background = '#0091FF';
    derivative_function.style.color = '#FFFFFF';
    white_formula.style.display = 'block';
    state.expressions.list[1].hidden = false;
    state.expressions.list[2].hidden = false;
    state.expressions.list[3].hidden = false;
    state.expressions.list[7].hidden = false;
    state.expressions.list[8].hidden = false;
    state.expressions.list[9].hidden = false;
    state.expressions.list[10].hidden = false;
    state.expressions.list[11].hidden = false;
    if (state.expressions.list[15]) {
      state.expressions.list[15].showLabel = true;
    }
  }
  calculator.setState(state);
  checkValueA();
}

//按钮极大值点击事件
function maxEvent() {
  var state = calculator.getState();
    max_value.style.background = '#0091FF';
    max_value.style.color = '#FFFFFF';
    min_value.style.background = '#EBEBEB';
    min_value.style.color = '#525252';
    var aValue = (2 - Math.sqrt(7)) / 3;
    state.expressions.list[5].latex = 'a = ' + aValue;
    if (state.expressions.list[15]) {
      state.expressions.list[15].showLabel = true;
    }
  calculator.setState(state);
  checkValueA();
}

//按钮极小值点击事件
function minEvent() {
  var state = calculator.getState();
    min_value.style.background = '#0091FF';
    min_value.style.color = '#FFFFFF';
    max_value.style.background = '#EBEBEB';
    max_value.style.color = '#525252';
    var aValue = (2 + Math.sqrt(7)) / 3;
    state.expressions.list[5].latex = 'a = ' + aValue;
    if (state.expressions.list[15]) {
      state.expressions.list[15].showLabel = true;
    }
  calculator.setState(state);
  checkValueA();
}

//检测滑条A的值
function checkValueA() {
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    numberA = a.numericValue;
    var xNumbers = Number.parseFloat(numberA.toFixed(2));
    var slopeValues = Number.parseFloat((3 * Math.pow(numberA, 2) - 4 * numberA - 1).toFixed(2));
    if (slopeValues != 0) {
      max_value.style.background = '#EBEBEB';
      max_value.style.color = '#525252';
      min_value.style.background = '#EBEBEB';
      min_value.style.color = '#525252';
    }
    document.getElementById('slopeValue').innerHTML = slopeValues.toString();
    if ((Math.pow(numberA, 3) - 2 * Math.pow(numberA, 2) - numberA + 1) >= 0) {
      calculator.setExpression({
        id: "formulaLine14",
        latex: "\\left(a,0\\right)",
        color: "#FFFFFF",
        hidden: true,
        lineStyle: "DASHED",
        label: xNumbers,
        labelOrientation: "below",
        showLabel: true,
      });
    } else {
      calculator.setExpression({
        id: "formulaLine14",
        latex: "\\left(a,0\\right)",
        color: "#FFFFFF",
        hidden: true,
        lineStyle: "DASHED",
        label: xNumbers,
        labelOrientation: "above",
        showLabel: true,
      });
    }

    if (numberA >= 0) {
      if (buttonFlag) {
        calculator.setExpression({
          id: "formulaLine15",
          latex: "\\left(0,3a^2-4a-1\\right)",
          color: "#FFFFFF",
          hidden: true,
          lineStyle: "DASHED",
          label: slopeValues,
          labelOrientation: "left",
          showLabel: true,
        });
      } else {
        calculator.setExpression({
          id: "formulaLine15",
          latex: "\\left(0,3a^2-4a-1\\right)",
          color: "#FFFFFF",
          hidden: true,
          lineStyle: "DASHED",
          label: slopeValues,
          labelOrientation: "left",
          showLabel: false,
        });
      }
    } else {
      if (buttonFlag) {
        calculator.setExpression({
          id: "formulaLine15",
          latex: "\\left(0,3a^2-4a-1\\right)",
          color: "#FFFFFF",
          hidden: true,
          lineStyle: "DASHED",
          label: slopeValues,
          labelOrientation: "right",
          showLabel: true,
        });
      } else {
        calculator.setExpression({
          id: "formulaLine15",
          latex: "\\left(0,3a^2-4a-1\\right)",
          color: "#FFFFFF",
          hidden: true,
          lineStyle: "DASHED",
          label: slopeValues,
          labelOrientation: "right",
          showLabel: false,
        });
      }
    }
  });
}

//默认函数线
function createDefaultFormulaLine() {
  calculator.setExpression({
    id: "formulaLine0",
    latex: "y=x^3-2x^2-x+1",
    color: "#18A2FF",
  });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "y=3x^2-4x-1\\left\\{x\\le-0.215\\right\\}",
    color: "#FFD621",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "y=3x^2-4x-1\\left\\{-0.215<x<1.549\\right\\}",
    color: "#AC84FF",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine3",
    latex: "y=3x^2-4x-1\\left\\{x\\ge1.549\\right\\}",
    color: "#FFD621",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine4",
    latex: "\\left(a,\\ a^3-2a^2-a+1\\right)",
    color: "#FFFFFF",
    dragMode: "AUTO",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine5",
    latex: "a=-0.5",
    color: "#FFFFFF",
    sliderBounds: { min: "-100000", max: "100000", step: "0.00001" },
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine6",
    latex: "y-\\left(a^3-2a^2-a+1\\right)\\ =\\ \\left(3a^2-4a-1\\right)\\left(x-a\\right)",
    color: "#FF5A5A",
    lineStyle: "DASHED",
  });

  calculator.setExpression({
    id: "formulaLine7",
    latex: "x=a\\left\\{a^3-2a^2-a+1\\le y\\le3a^2-4a-1\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine8",
    latex: "\\left(a,3a^2-4a-1\\right)",
    color: "#FFFFFF",
    dragMode: "NONE",
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine9",
    latex: "x=a\\left\\{3a^2-4a-1\\le y\\le a^3-2a^2-a+1\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine10",
    latex: "y=3a^2-4a-1\\left\\{a\\le x\\le0\\right\\}",
    color: "#9BF23B",
    hidden: true,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine11",
    latex: "y=3a^2-4a-1\\left\\{0\\le x\\le a\\right\\}",
    color: "#9BF23B",
    hidden: true,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine12",
    latex: "x=a\\left\\{0\\le y\\le a^3-2a^2-a+1\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine13",
    latex: "x=a\\left\\{a^3-2a^2-a+1\\le y\\le 0\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });
}

//图片适配
function adapterMobile() {
    if (width <= 610 || height <= 610) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
        document.getElementsByClassName('three_buttons')[0].style.transform = 'scale(0.7)';
        document.getElementsByClassName('three_buttons')[0].style.right = 0 + 'px';
        document.getElementsByClassName('three_buttons')[0].style.top = '25%';
        document.getElementsByClassName('blueFormula_class')[0].style.transform = 'scale(0.7)';
        document.getElementsByClassName('blueFormula_class')[0].style.left = '15%';
        document.getElementsByClassName('slopeText')[0].style.fontSize = '18px';
        document.getElementsByClassName('slopeText')[0].style.marginLeft = '50px';
    }
}

// 当用户第一次横屏时显示提示信息
function showAdvice(){
  const adviceEle = document.getElementById('browserAdvice');
  if ( adviceEle ) {
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

function initTip(){
  forceMobildLandscape();
}

//是否是火花播放器
function isHuohuaPlayer(){
  return navigator.userAgent.indexOf('huohua_app') > -1;
}

//判断横竖屏
function getOrientation(){
  let orientation = '';
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  if ( window.hasOwnProperty('orientation') === false) {
    if (width > height) {
      orientation = 'landscape';
    } else {
      orientation = 'portrait';
    }
  } else {
    const orientationNum = Number.parseInt( window.orientation);
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
  tipImg.src = 'images/orientation.png' ;

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
  if ( !navigator.userAgent.match(/.*Mobile.*/) || isHuohuaPlayer()) {
    return;
  }

  const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
  window.addEventListener(evt, (event) => {
    if ( window.orientation === 90 || window.orientation === -90) {
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

//重置
function reset() {
  numberA = -0.5;
  buttonOneFlag = false;
  derivative_function.style.background = '#EBEBEB';
  derivative_function.style.color = '#525252';
  max_value.style.background = '#EBEBEB';
  max_value.style.color = '#525252';
  min_value.style.background = '#EBEBEB';
  min_value.style.color = '#525252';
  white_formula.style.display = 'none';
  if (num != 0) {
    derivativeEvent();
  }
  num = 0;
  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
  checkValueA();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
checkValueA();
adapterMobile();
