var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.screen.width;
var height = window.screen.height;
var isDefinite = false;
var isChange = false;
var innerTexts = document.getElementsByClassName('innerTextClass')[0];
var changeImgShowOrHide = document.getElementsByClassName('changeImgShowOrHide')[0];
var definiteImgShowOrHide = document.getElementsByClassName('definiteImgShowOrHide')[0];
var changeImgShowOrHide2 = document.getElementsByClassName('changeImgShowOrHide2')[0];
var definiteImgShowOrHide2 = document.getElementsByClassName('definiteImgShowOrHide2')[0];
var definitionA = document.getElementsByClassName('definitionA')[0];
var definitionB = document.getElementsByClassName('definitionB')[0];
var changeA = document.getElementsByClassName('changeA')[0];
var changeB = document.getElementsByClassName('changeB')[0];
var leftFormula = document.getElementsByClassName('leftFormulaClass')[0];
var rightFormula = document.getElementsByClassName('rightFormulaClass')[0];
var numberA = 2;
var numberB = 2.5;
var numberC = -2;
var numberD = -2.5;

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

//二次函数线
function createBasicFormulaLine() {
  calculator.setExpression({
    id: "formula1",
    latex: "y=\\frac{1}{2}x^2",
    color: "#9BF23B",
    hidden: false
  });
}

//创建右侧函数线
function createRightFormulaLine(){
  //A点
  calculator.setExpression({
    id: "formula2",
    latex: "\\left(a,\\frac{1}{2}a^2\\right)",
    color: "#fff",
    hidden: false,
    pointStyle: "POINT",
  });

  //滑条a
  calculator.setExpression({
    id: "formula3",
    latex: "a=2",
    sliderBounds: { min: "0", max: "100000", step: "0.1" },
    hidden: true,
    color: '#6042a6'
  });

  //B点
  calculator.setExpression({
    id: "formula4",
    latex: "\\left(b,\\frac{1}{2}b^2\\right)",
    color: "#fff",
    hidden: false,
    pointStyle: "POINT",
  });

  //滑条b
  calculator.setExpression({
    id: "formula5",
    latex: "b=2.5",
    sliderBounds: { min: "0", max: "100000", step: "0.1" },
    color: "#6042a6",
    hidden: true
  });

  //右侧虚线
  calculator.setExpression({
    id: "formula6",
    latex: "x=a\\left\\{0\\le y\\le\\frac{1}{2}a^2\\right\\}",
    color: "#fff",
    hidden: false,
    lineStyle: "DASHED"
  });

  //右侧虚线
  calculator.setExpression({
    id: "formula7",
    latex: "y=\\frac{1}{2}a^2\\left\\{0\\le x\\le a\\right\\}",
    color: "#fff",
    hidden: false,
    lineStyle: "DASHED"
  });

  //右侧虚线
  calculator.setExpression({
    id: "formula8",
    latex: "x=b\\left\\{0\\le y\\le\\frac{1}{2}b^2\\right\\}",
    color: "#fff",
    hidden: false,
    lineStyle: "DASHED"
  });

  //右侧虚线
  calculator.setExpression({
    id: "formula9",
    latex: "y=\\frac{1}{2}b^2\\left\\{0\\le x\\le b\\right\\}",
    color: "#fff",
    hidden: false,
    lineStyle: "DASHED"
  });

  //右侧fx1
  calculator.setExpression({
    id: "formula10",
    latex: "\\left(0,\\frac{1}{2}a^2\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "f(x₁)",
    labelOrientation: "left",
    labelSize: "large",
    showLabel: true
  });

  //右侧fx2
  calculator.setExpression({
    id: "formula11",
    latex: "\\left(0,\\frac{1}{2}b^2\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "f(x₂)",
    labelOrientation: "left",
    labelSize: "large",
    showLabel: true
  });

  //右侧x1
  calculator.setExpression({
    id: "formula12",
    latex: "\\left(a,0\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "x₁",
    labelOrientation: "below",
    labelSize: "large",
    showLabel: true
  });

  //右侧x1
  calculator.setExpression({
    id: "formula13",
    latex: "\\left(b,0\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "x₂",
    labelOrientation: "below",
    labelSize: "large",
    showLabel: true
  });
}

//创建左侧函数线
function createLeftFormulaLine() {
  //C点
  calculator.setExpression({
    id: "formula14",
    latex: "\\left(c,\\frac{1}{2}c^2\\right)",
    color: "#fff",
    hidden: true,
    pointStyle: "POINT",
  });

  //滑条C
  calculator.setExpression({
    id: "formula15",
    latex: "c=-2",
    color: "#6042a6",
    hidden: true,
    sliderBounds: { min: "-100000", max: "0", step: "0.1" }
  });

  //D点
  calculator.setExpression({
    id: "formula16",
    latex: "\\left(d,\\frac{1}{2}d^2\\right)",
    color: "#fff",
    hidden: true,
    pointStyle: "POINT",
  });

  //滑条D
  calculator.setExpression({
    id: "formula17",
    latex: "d=-2.5",
    color: "#6042a6",
    hidden: true,
    sliderBounds: { min: "-100000", max: "0", step: "0.1" }
  });

  //左侧虚线
  calculator.setExpression({
    id: "formula18",
    latex: "x=c\\left\\{0\\le y\\le\\frac{1}{2}c^2\\right\\}",
    color: "#fff",
    hidden: true,
    lineStyle: "DASHED"
  });

  //左侧虚线
  calculator.setExpression({
    id: "formula19",
    latex: "y=\\frac{1}{2}c^2\\left\\{c\\le x\\le0\\right\\}",
    color: "#fff",
    hidden: true,
    lineStyle: "DASHED"
  });

  //左侧虚线
  calculator.setExpression({
    id: "formula20",
    latex: "x=d\\left\\{0\\le y\\le\\frac{1}{2}d^2\\right\\}",
    color: "#fff",
    hidden: true,
    lineStyle: "DASHED"
  });

  //左侧虚线
  calculator.setExpression({
    id: "formula21",
    latex: "y=\\frac{1}{2}d^2\\left\\{d\\le x\\le0\\right\\}",
    color: "#fff",
    hidden: true,
    lineStyle: "DASHED"
  });

  //左侧fx1
  calculator.setExpression({
    id: "formula22",
    latex: "\\left(0,\\frac{1}{2}c^2\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "f(x₂)",
    labelOrientation: "right",
    labelSize: "large",
    showLabel: false
  });

  //左侧fx2
  calculator.setExpression({
    id: "formula23",
    latex: "\\left(0,\\frac{1}{2}d^2\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "f(x₁)",
    labelOrientation: "right",
    labelSize: "large",
    showLabel: false
  });

  //左侧x1
  calculator.setExpression({
    id: "formula24",
    latex: "\\left(c,0\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "x₂",
    labelOrientation: "below",
    labelSize: "large",
    showLabel: false
  });

  //左侧x2
  calculator.setExpression({
    id: "formula25",
    latex: "\\left(d,0\\right)",
    color: "#fff",
    hidden: true,
    lineStyle: "SOLID",
    label: "x₁",
    labelOrientation: "below",
    labelSize: "large",
    showLabel: false
  });
}

//隐藏右侧函数线
function hideRightFormulaLine() {
  const rightState = calculator.getState();
  for (let i = 1; i < 9; i++) {
    rightState.expressions.list[i].hidden = true;
  }
  rightState.expressions.list[9].showLabel = false;
  rightState.expressions.list[10].showLabel = false;
  rightState.expressions.list[11].showLabel = false;
  rightState.expressions.list[12].showLabel = false;
  calculator.setState(rightState);
}

//显示右侧函数线
function showRightFormulaLine() {
  const rightState = calculator.getState();
  for (let i = 1; i < 9; i++) {
    rightState.expressions.list[i].hidden = false;
  }
  rightState.expressions.list[9].showLabel = true;
  rightState.expressions.list[10].showLabel = true;
  rightState.expressions.list[11].showLabel = true;
  rightState.expressions.list[12].showLabel = true;
  calculator.setState(rightState);
}

//删除左侧函数线
function hideLeftFormulaLine() {
  const leftState = calculator.getState();
  for (let i = 13; i < 21; i++) {
    leftState.expressions.list[i].hidden = true;
  }
  leftState.expressions.list[21].showLabel = false;
  leftState.expressions.list[22].showLabel = false;
  leftState.expressions.list[23].showLabel = false;
  leftState.expressions.list[24].showLabel = false;
  calculator.setState(leftState);
}

//显示左侧函数线
function showleftFormulaLine() {
  const leftState = calculator.getState();
  for (let i = 13; i < 21; i++) {
    leftState.expressions.list[i].hidden = false;
  }
  leftState.expressions.list[21].showLabel = true;
  leftState.expressions.list[22].showLabel = true;
  leftState.expressions.list[23].showLabel = true;
  leftState.expressions.list[24].showLabel = true;
  calculator.setState(leftState);
}

//检测滑条A和B的值
function checkValueAOrB() {
  var fxA = Math.pow(numberA, 2) * 1 / 2;
  var fxB = Math.pow(numberB, 2) * 1 / 2;
  var ratio = ((fxA - fxB) / (numberA - numberB)).toFixed(2);
  innerTexts.innerHTML = ratio;
  //右侧fx1
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    numberA = a.numericValue;
    var fxA = Math.pow(numberA, 2) * 1 / 2;
    var fxB = Math.pow(numberB, 2) * 1 / 2;
    var ratio = ((fxA - fxB) / (numberA - numberB)).toFixed(2);
    innerTexts.innerHTML = ratio;
    if (isDefinite) {
      if (numberA < numberB) {
          changeImgShowOrHide.style.display = 'block';
          changeImgShowOrHide2.style.display = 'none';
      } else {
          changeImgShowOrHide.style.display = 'none';
          changeImgShowOrHide2.style.display = 'block';
      }
    }
  });

  //右侧fx2
  var b = calculator.HelperExpression({latex: "b"});
  b.observe("numericValue", function() {
    numberB = b.numericValue;
    var fxA = Math.pow(numberA, 2) * 1 / 2;
    var fxB = Math.pow(numberB, 2) * 1 / 2;
    var ratio = ((fxA - fxB) / (numberA - numberB)).toFixed(2);
    innerTexts.innerHTML = ratio;
    if (isDefinite) {
      if (numberA < numberB) {
        changeImgShowOrHide.style.display = 'block';
        changeImgShowOrHide2.style.display = 'none';
      } else {
        changeImgShowOrHide.style.display = 'none';
        changeImgShowOrHide2.style.display = 'block';
      }
    }
  });
}

//检测滑条C和D的值
function checkValueCOrD() {
  var fxC = Math.pow(numberC, 2) * 1 / 2;
  var fxD = Math.pow(numberD, 2) * 1 / 2;
  var ratio = ((fxC - fxD) / (numberC - numberD)).toFixed(2);
  innerTexts.innerHTML = ratio;

  //左侧fx1
  var c = calculator.HelperExpression({latex: "c"});
  c.observe("numericValue", function() {
    numberC = c.numericValue;
    var fxC = Math.pow(numberC, 2) * 1 / 2;
    var fxD = Math.pow(numberD, 2) * 1 / 2;
    var ratio = ((fxC - fxD) / (numberC - numberD)).toFixed(2);
    innerTexts.innerHTML = ratio;
    if (isChange) {
      if (isDefinite) {
        if (numberC < numberD) {
          definiteImgShowOrHide2.style.display = 'block';
          definiteImgShowOrHide.style.display = 'none';
        } else {
          definiteImgShowOrHide2.style.display = 'none';
          definiteImgShowOrHide.style.display = 'block';
        }
      }
    }
  });

  //左侧fx2
  var d = calculator.HelperExpression({latex: "d"});
  d.observe("numericValue", function() {
    numberD = d.numericValue;
    var fxC = Math.pow(numberC, 2) * 1 / 2;
    var fxD = Math.pow(numberD, 2) * 1 / 2;
    var ratio = ((fxC - fxD) / (numberC - numberD)).toFixed(2);
    innerTexts.innerHTML = ratio;
    if (isChange) {
      if (isDefinite) {
        if (numberC < numberD) {
          definiteImgShowOrHide2.style.display = 'block';
          definiteImgShowOrHide.style.display = 'none';
        } else {
          definiteImgShowOrHide2.style.display = 'none';
          definiteImgShowOrHide.style.display = 'block';
        }
      }
    }
  });
}

//图片适配
function adapterMobile() {
  if (width <= 610 || height <= 610) {
    innerTexts.style.fontSize = '12px';
    changeImgShowOrHide.style.right = '9%';
    changeImgShowOrHide.style.bottom = '13%';
    definiteImgShowOrHide.style.right = '9%';
    definiteImgShowOrHide.style.bottom = '13%';
    changeImgShowOrHide2.style.right = '9%';
    changeImgShowOrHide2.style.bottom = '13%';
    definiteImgShowOrHide2.style.right = '9%';
    definiteImgShowOrHide2.style.bottom = '13%';
  }

  //适配ipad
  if (!!navigator.userAgent.match(/.*iPad.*/)) {
    innerTexts.style.fontSize = '16px';
  }
}

function isEditor() {
  return navigator.userAgent.indexOf('Electron') > -1;
}

//初始化定义按钮
function definite() {
  changeImgShowOrHide.style.display = 'none';
  changeImgShowOrHide2.style.display = 'none';
  if (isChange) {
    if (isDefinite) {
      definitionA.style.display = 'block';
      definitionB.style.display = 'none';
      definiteImgShowOrHide.style.display = 'none';
      definiteImgShowOrHide2.style.display = 'none';
    } else {
      definitionA.style.display = 'none';
      definitionB.style.display = 'block';
      if (numberC > numberD) {
        definiteImgShowOrHide.style.display = 'block';
      } else {
        definiteImgShowOrHide2.style.display = 'block';
      }
    }
  } else {
    if (isDefinite) {
      definitionA.style.display = 'block';
      definitionB.style.display = 'none';
      changeImgShowOrHide.style.display = 'none';
      changeImgShowOrHide2.style.display = 'none';
    } else {
      definitionA.style.display = 'none';
      definitionB.style.display = 'block';
      if (numberA < numberB) {
        changeImgShowOrHide.style.display = 'block';
      } else {
        changeImgShowOrHide2.style.display = 'block';
      }
    }
  }
  isDefinite = !isDefinite;
}

//初始化切换按钮
function change() {
  isChange = !isChange;
  if (isChange) {
    changeA.style.display = 'none';
    changeB.style.display = 'block';
    hideRightFormulaLine();
    showleftFormulaLine();
    leftFormula.style.display = 'block';
    rightFormula.style.display = 'none';
    if (isDefinite) {
      changeImgShowOrHide.style.display = 'none';
      changeImgShowOrHide2.style.display = 'none';
      definiteImgShowOrHide.style.display = 'block';
      definiteImgShowOrHide2.style.display = 'none';
    }
    checkValueCOrD();
  } else {
    changeA.style.display = 'block';
    changeB.style.display = 'none';
    hideLeftFormulaLine();
    showRightFormulaLine();
    leftFormula.style.display = 'none';
    rightFormula.style.display = 'block';
    if (isDefinite) {
      changeImgShowOrHide.style.display = 'block';
      changeImgShowOrHide2.style.display = 'none';
      definiteImgShowOrHide.style.display = 'none';
      definiteImgShowOrHide2.style.display = 'none';
    }
    checkValueAOrB();
  }
}

//重置
function reset() {
  isDefinite = false;
  isChange = false;
  definitionA.style.display = 'block';
  definitionB.style.display = 'none';
  changeA.style.display = 'block';
  changeB.style.display = 'none';
  calculator.setBlank();
  setCalcuState();
  createBasicFormulaLine();
  createRightFormulaLine();
  createLeftFormulaLine();
  checkValueAOrB();
  innerTexts.innerHTML = '2.25';
  leftFormula.style.display = 'none';
  rightFormula.style.display = 'block';
  definiteImgShowOrHide.style.display = 'none';
  changeImgShowOrHide.style.display = 'none';
  definiteImgShowOrHide2.style.display = 'none';
  changeImgShowOrHide2.style.display = 'none';
}

setCalcuState();
createBasicFormulaLine();
createRightFormulaLine();
createLeftFormulaLine();
checkValueAOrB();
adapterMobile();
