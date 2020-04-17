var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var buttonFlag1 = false;
var buttonFlag2 = false;
var buttonFlag3 = false;
var buttonFlag4 = false;
var buttonFlag5 = false;
var buttonFlag6 = false;
var leftButtons = document.getElementsByClassName('result_Class');
var rightButtons = document.getElementsByClassName('result_Class2');
var widget_title = document.getElementsByClassName('titleText')[0];
var buttonContainer = document.getElementsByClassName('buttonContainer')[0];
var leftOneClass = document.getElementsByClassName('left_one_class')[0];
var leftOneClass2 = document.getElementsByClassName('left_one_class')[1];
var leftTwoClass = document.getElementsByClassName('left_two_class')[0];
var leftTwoClass2 = document.getElementsByClassName('left_two_class')[1];

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
  leftOneClass.innerText = window.lang.buttonLeftText[0];
  leftOneClass2.innerText = window.lang.buttonLeftText[0];
  leftTwoClass.innerText = window.lang.buttonLeftText[1];
  leftTwoClass2.innerText = window.lang.buttonLeftText[1];
  leftButtons[2].innerHTML = window.lang.buttonLeftText[2];

  rightButtons[0].innerHTML = window.lang.buttonRightText[0];
  rightButtons[1].innerHTML = window.lang.buttonRightText[1];
  rightButtons[2].innerHTML = window.lang.buttonRightText[2];
}

//点
function createFirstFormulaLine() {
  calculator.setExpression({
    id: "formulaLine0",
    latex: "\\left(2,3\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    dragMode: "AUTO",
    type: "expression",
    hidden: true,
    pointStyle: "POINT",
    showLabel: false
  });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "\\left(2,-3\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    dragMode: "AUTO",
    type: "expression",
    hidden: true,
    pointStyle: "POINT",
    showLabel: false
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "x=2\\left\\{-3\\le y\\le3\\right\\}",
    color: "#179DF5",
    lineStyle: "DASHED",
    type: "expression",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine3",
    latex: "\\left(-2,3\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    dragMode: "AUTO",
    type: "expression",
    hidden: true,
    pointStyle: "POINT",
    showLabel: false
  });

  calculator.setExpression({
    id: "formulaLine4",
    latex: "y=3\\left\\{-2\\le x\\le2\\right\\}",
    color: "#179DF5",
    lineStyle: "DASHED",
    type: "expression",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine5",
    latex: "\\left(-2,-3\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    dragMode: "AUTO",
    type: "expression",
    hidden: true,
    pointStyle: "POINT",
    showLabel: false
  });

  calculator.setExpression({
    id: "formulaLine6",
    latex: "y=\\frac{3}{2}x\\left\\{-2\\le x\\le2\\right\\}",
    color: "#179DF5",
    lineStyle: "DASHED",
    type: "expression",
    hidden: true
  });
}

//线段
function createSecondFormulaLine() {
  loadFormulaJson('./formula/formulaTwo.json');
}

//三角形
function createThirdFormulaLine() {
  loadFormulaJson('./formula/formulaThree.json');
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

//点
function point() {
  changeAllButtonsStyle();
  buttonFlag1 = true;
  rightButtons[0].style.backgroundColor = '#179DF5';
  rightButtons[0].style.color = '#FFFFFF';
  buttonContainer.style.display = 'flex';
  calculator.setBlank();
  setCalcuState();
  createFirstFormulaLine();
  const state = calculator.getState();
  state.expressions.list[0].hidden = false;
  state.expressions.list[0].showLabel = true;
  calculator.setState(state);
}

//线段
function segment() {
  changeAllButtonsStyle();
  buttonFlag2 = true;
  rightButtons[1].style.backgroundColor = '#179DF5';
  rightButtons[1].style.color = '#FFFFFF';
  buttonContainer.style.display = 'flex';
  calculator.setBlank();
  setCalcuState();
  createSecondFormulaLine();
}

//三角形
function traiangle() {
  changeAllButtonsStyle();
  buttonFlag3 = true;
  rightButtons[2].style.backgroundColor = '#179DF5';
  rightButtons[2].style.color = '#FFFFFF';
  buttonContainer.style.display = 'flex';
  calculator.setBlank();
  setCalcuState();
  createThirdFormulaLine();
}

//关于x轴对称
function xAxis() {
  changeLeftButtonsStyle();
  buttonFlag4 = true;
  leftButtons[0].style.backgroundColor = '#179DF5';
  leftButtons[0].style.color = '#FFFFFF';

  if (buttonFlag1) {
    const state = calculator.getState();
    for (var i = 1; i < 7; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[1].hidden = false;
    state.expressions.list[1].showLabel = true;
    state.expressions.list[2].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag2) {
    const state = calculator.getState();
    for (var i = 3; i < 18; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[3].hidden = false;
    state.expressions.list[3].showLabel = true;
    state.expressions.list[4].hidden = false;
    state.expressions.list[4].showLabel = true;
    state.expressions.list[5].hidden = false;
    state.expressions.list[6].hidden = false;
    state.expressions.list[7].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag3) {
    const state = calculator.getState();
    for (var i = 6; i < 33; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[6].hidden = false;
    state.expressions.list[6].showLabel = true;
    state.expressions.list[7].hidden = false;
    state.expressions.list[7].showLabel = true;
    state.expressions.list[8].hidden = false;
    state.expressions.list[8].showLabel = true;
    state.expressions.list[9].hidden = false;
    state.expressions.list[10].hidden = false;
    state.expressions.list[11].hidden = false;
    state.expressions.list[12].hidden = false;
    state.expressions.list[13].hidden = false;
    state.expressions.list[14].hidden = false;
    calculator.setState(state);
  }
}

//关于y轴对称
function yAxis() {
  changeLeftButtonsStyle();
  buttonFlag5 = true;
  leftButtons[1].style.backgroundColor = '#179DF5';
  leftButtons[1].style.color = '#FFFFFF';

  if (buttonFlag1) {
    const state = calculator.getState();
    for (var i = 1; i < 7; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[3].hidden = false;
    state.expressions.list[3].showLabel = true;
    state.expressions.list[4].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag2) {
    const state = calculator.getState();
    for (var i = 3; i < 18; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[8].hidden = false;
    state.expressions.list[8].showLabel = true;
    state.expressions.list[9].hidden = false;
    state.expressions.list[9].showLabel = true;
    state.expressions.list[10].hidden = false;
    state.expressions.list[11].hidden = false;
    state.expressions.list[12].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag3) {
    const state = calculator.getState();
    for (var i = 6; i < 33; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[15].hidden = false;
    state.expressions.list[15].showLabel = true;
    state.expressions.list[16].hidden = false;
    state.expressions.list[16].showLabel = true;
    state.expressions.list[17].hidden = false;
    state.expressions.list[17].showLabel = true;
    state.expressions.list[18].hidden = false;
    state.expressions.list[19].hidden = false;
    state.expressions.list[20].hidden = false;
    state.expressions.list[21].hidden = false;
    state.expressions.list[22].hidden = false;
    state.expressions.list[23].hidden = false;
    calculator.setState(state);
  }

}

//关于原点对称
function oPoint() {
  changeLeftButtonsStyle();
  buttonFlag6 = true;
  leftButtons[2].style.backgroundColor = '#179DF5';
  leftButtons[2].style.color = '#FFFFFF';

  if (buttonFlag1) {
    const state = calculator.getState();
    for (var i = 1; i < 7; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[5].hidden = false;
    state.expressions.list[5].showLabel = true;
    state.expressions.list[6].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag2) {
    const state = calculator.getState();
    for (var i = 3; i < 18; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[13].hidden = false;
    state.expressions.list[13].showLabel = true;
    state.expressions.list[14].hidden = false;
    state.expressions.list[14].showLabel = true;
    state.expressions.list[15].hidden = false;
    state.expressions.list[16].hidden = false;
    state.expressions.list[17].hidden = false;
    calculator.setState(state);
  }

  if (buttonFlag3) {
    const state = calculator.getState();
    for (var i = 6; i < 33; i++) {
      state.expressions.list[i].hidden = true;
      state.expressions.list[i].showLabel = false;
    }
    state.expressions.list[24].hidden = false;
    state.expressions.list[24].showLabel = true;
    state.expressions.list[25].hidden = false;
    state.expressions.list[25].showLabel = true;
    state.expressions.list[26].hidden = false;
    state.expressions.list[26].showLabel = true;
    state.expressions.list[27].hidden = false;
    state.expressions.list[28].hidden = false;
    state.expressions.list[29].hidden = false;
    state.expressions.list[30].hidden = false;
    state.expressions.list[31].hidden = false;
    state.expressions.list[32].hidden = false;
    calculator.setState(state);
  }
}

/*切换所有按钮*/
function changeAllButtonsStyle() {
  buttonFlag1 = false;
  buttonFlag2 = false;
  buttonFlag3 = false;
  buttonFlag4 = false;
  buttonFlag5 = false;
  buttonFlag6 = false;

  rightButtons[0].style.backgroundColor = '#EBEBEB';
  rightButtons[0].style.color = '#000000';
  rightButtons[1].style.backgroundColor = '#EBEBEB';
  rightButtons[1].style.color = '#000000';
  rightButtons[2].style.backgroundColor = '#EBEBEB';
  rightButtons[2].style.color = '#000000';

  leftButtons[0].style.backgroundColor = '#EBEBEB';
  leftButtons[0].style.color = '#000000';
  leftButtons[1].style.backgroundColor = '#EBEBEB';
  leftButtons[1].style.color = '#000000';
  leftButtons[2].style.backgroundColor = '#EBEBEB';
  leftButtons[2].style.color = '#000000';
}

/*切换左侧按钮*/
function changeLeftButtonsStyle() {
  buttonFlag4 = false;
  buttonFlag5 = false;
  buttonFlag6 = false;
  leftButtons[0].style.backgroundColor = '#EBEBEB';
  leftButtons[0].style.color = '#000000';
  leftButtons[1].style.backgroundColor = '#EBEBEB';
  leftButtons[1].style.color = '#000000';
  leftButtons[2].style.backgroundColor = '#EBEBEB';
  leftButtons[2].style.color = '#000000';
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

//小米手机
function adaptMobile() {
  if (window.navigator.userAgent.search('MI 5X') !== -1) {

  }
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
adaptMiMobile();

