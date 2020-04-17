var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var leftButtons = document.getElementsByClassName('result_Class');
var rightButtons = document.getElementsByClassName('result_Class2');
var axis_class = document.getElementsByClassName('axis_class');
var randomPointButton = document.getElementsByClassName('random_point_button')[0];
var randomPointValue = document.getElementsByClassName('random_point_value')[0];
var widget_title = document.getElementsByClassName('titleText')[0];
var buttonContainer = document.getElementsByClassName('buttonContainer_1')[0];

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
    showGrid: true,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    xAxisNumbers: true,
    yAxisNumbers: true,
    xAxisLabel: "x",
    yAxisLabel: "y",
    projectorMode: false
  });

  document.title = window.lang.title;
  widget_title.innerHTML = window.lang.title;
  leftButtons[0].innerHTML = window.lang.buttonLeftText[0];
  leftButtons[1].innerHTML = window.lang.buttonLeftText[1];
  leftButtons[2].innerHTML = window.lang.buttonLeftText[2];
  leftButtons[3].innerHTML = window.lang.buttonLeftText[3];
  rightButtons[0].innerHTML = window.lang.buttonRightText[0];
  axis_class[0].innerHTML = window.lang.buttonRightText[1];
  axis_class[1].innerHTML = window.lang.buttonRightText[1];
  rightButtons[3].innerHTML = window.lang.buttonRightText[2];
  randomPointButton.innerHTML = window.lang.buttonRightText[3];
}

//创建默认函数线
function createDefaultFormulaLine() {
  loadFormulaJson('./formula/formula.json');
}

//读取公式json
function loadFormulaJson(jsonUrl) {
  var url = jsonUrl;/*json文件url*/
  var request = new XMLHttpRequest();
  request.open('get', url);/*设置请求方法与路径*/
  request.send(null);/*不发送数据到服务器*/
  request.onload = function () {/*XHR对象获取到返回信息后执行*/
    if (request.status == 200 || request.status == 0) {/*返回状态为200，即为数据获取成功*/
      var formulaObject = JSON.parse(request.responseText);
      for (let i = 0; i < formulaObject.formulaList.length; i++) {
        calculator.setExpression(formulaObject.formulaList[i]);
      }
    }
  }
}

//原点
function oPoint() {
  changeAllButtonsStyle();
  rightButtons[0].style.backgroundColor = '#179DF5';
  rightButtons[0].style.color = '#FFFFFF';
  buttonContainer.style.display = 'none';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[0].hidden = false;
  calculator.setState(state);
}

//x轴
function xAxis() {
  changeAllButtonsStyle();
  rightButtons[1].style.backgroundColor = '#179DF5';
  rightButtons[1].style.color = '#FFFFFF';
  buttonContainer.style.display = 'none';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[1].hidden = false;
  calculator.setState(state);
}

//y轴
function yAxis() {
  changeAllButtonsStyle();
  rightButtons[2].style.backgroundColor = '#179DF5';
  rightButtons[2].style.color = '#FFFFFF';
  buttonContainer.style.display = 'none';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[2].hidden = false;
  calculator.setState(state);
}

//象限
function quadrant() {
  changeAllButtonsStyle();
  rightButtons[3].style.backgroundColor = '#179DF5';
  rightButtons[3].style.color = '#FFFFFF';
  buttonContainer.style.display = 'flex';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  calculator.setState(state);
}

//随机点
function randomPoint() {
  changeAllButtonsStyle();
  buttonContainer.style.display = 'none';
  randomPointValue.style.display = 'block';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  calculator.setState(state);
  var xMin = Math.round(state.graph.viewport.xmin);
  var yMin = Math.round(state.graph.viewport.ymin)
  var xMax = Math.round(state.graph.viewport.xmax)
  var yMax = Math.round(state.graph.viewport.ymax)
  var randomX = Random(xMin, xMax);
  var randomY = Random(yMin, yMax);
  calculator.setExpression({
    id: "formulaLine7",
    latex: "\\left(" + randomX + "," + randomY + "\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    dragMode: "AUTO",
    type: "expression",
    hidden: false,
    pointStyle: "POINT",
    showLabel: true
  });

  if (randomY >= 0) {
    calculator.setExpression({
      id: "formulaLine8",
      latex: "x=" + randomX + "\\left\\{0\\le y\\le" + randomY + "\\right\\}",
      color: "#179DF5",
      lineStyle: "DASHED",
      type: "expression",
      hidden: false
    });
  } else {
    calculator.setExpression({
      id: "formulaLine8",
      latex: "x=" + randomX + "\\left\\{" + randomY + "\\le y\\le0\\right\\}",
      color: "#179DF5",
      lineStyle: "DASHED",
      type: "expression",
      hidden: false
    });
  }

  if (randomX >= 0) {
    calculator.setExpression({
      id: "formulaLine9",
      latex: "y=" + randomY + "\\left\\{0\\le x\\le" + randomX + "\\right\\}",
      color: "#179DF5",
      lineStyle: "DASHED",
      type: "expression",
      hidden: false
    });
  } else {
    calculator.setExpression({
      id: "formulaLine9",
      latex: "y=" + randomY + "\\left\\{" + randomX + "\\le x\\le0\\right\\}",
      color: "#179DF5",
      lineStyle: "DASHED",
      type: "expression",
      hidden: false
    });
  }
  randomPointValue.innerHTML = '（' + randomX + '，' + randomY + '）';
}

//生成范围内随机整数
function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

//第一象限
function first_quadrant() {
  changeLeftButtonsStyle();
  leftButtons[0].style.backgroundColor = '#179DF5';
  leftButtons[0].style.color = '#FFFFFF';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[3].hidden = false;
  calculator.setState(state);
}

//第二象限
function second_quadrant() {
  changeLeftButtonsStyle();
  leftButtons[1].style.backgroundColor = '#179DF5';
  leftButtons[1].style.color = '#FFFFFF';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[4].hidden = false;
  calculator.setState(state);
}

//第三象限
function third_quadrant() {
  changeLeftButtonsStyle();
  leftButtons[2].style.backgroundColor = '#179DF5';
  leftButtons[2].style.color = '#FFFFFF';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[5].hidden = false;
  calculator.setState(state);
}

//第四象限
function fourth_quadrant() {
  changeLeftButtonsStyle();
  leftButtons[3].style.backgroundColor = '#179DF5';
  leftButtons[3].style.color = '#FFFFFF';
  const state = calculator.getState();
  for (var i = 0; i < 7; i++) {
    state.expressions.list[i].hidden = true;
  }
  state.expressions.list[6].hidden = false;
  calculator.setState(state);
}

/*切换所有按钮*/
function changeAllButtonsStyle() {
  for (var i = 0; i < 4; i++) {
    rightButtons[i].style.backgroundColor = '#EBEBEB';
    rightButtons[i].style.color = '#000000';
    leftButtons[i].style.backgroundColor = '#EBEBEB';
    leftButtons[i].style.color = '#000000';
  }
}

/*切换左侧按钮*/
function changeLeftButtonsStyle() {
  for (var i = 0; i < 4; i++) {
    leftButtons[i].style.backgroundColor = '#EBEBEB';
    leftButtons[i].style.color = '#000000';
  }
}

function adaptMiMobile() {
  if (window.navigator.userAgent.search('MI 5X') !== -1) {
    for (var i = 0; i < 4; i++) {
      leftButtons[i].style.paddingTop = '6px';
      rightButtons[i].style.paddingTop = '6px';
    }
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

initTip();
setCalcuState();
createDefaultFormulaLine();
adaptMiMobile();


