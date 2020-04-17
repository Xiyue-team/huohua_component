var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var sliderNum = 1;
var numberA = 0;
var numberB = 0;
var widget_title = document.getElementsByClassName('titleText')[0];
var firstVariable = document.getElementById('firstVariable');
var secondVariable = document.getElementById('secondVariable');
var thirdVariable = document.getElementById('thirdVariable');
var left_or_right_text = document.getElementsByClassName('left_or_right_text_class')[0];
var left_or_right_offset = document.getElementsByClassName('left_or_right_offset_class')[0];
var top_or_bottom_text = document.getElementsByClassName('top_or_bottom_text_class')[0];
var top_or_bottom_offset = document.getElementsByClassName('top_or_bottom_offset_class')[0];
var dirction_left = document.getElementsByClassName('dirction_class')[0];
var dirction_top = document.getElementsByClassName('dirction_class')[1];
var move_left = document.getElementsByClassName('move_class')[0];
var move_top = document.getElementsByClassName('move_class')[1];
var unit_left = document.getElementsByClassName('unit_class')[0];
var unit_top = document.getElementsByClassName('unit_class')[1];
var blueTips = document.getElementsByClassName('blueTips')[0];
var unTwiceFormulaTips = document.getElementsByClassName('un_twiceFormulaTips')[0];

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
  widget_title.innerText = window.lang.title;
  left_or_right_text.innerText = window.lang.left_or_right_titles[1];
  top_or_bottom_text.innerText = window.lang.top_or_bottom_titles[0];
  dirction_left.innerText = window.lang.directionTitle;
  dirction_top.innerText = window.lang.directionTitle;
  move_left.innerText = window.lang.moveTitle;
  move_top.innerText = window.lang.moveTitle;
  unit_left.innerText = window.lang.unitTitle;
  unit_top.innerText = window.lang.unitTitle;
  blueTips.innerText = window.lang.blueTipsTitle[0];
  unTwiceFormulaTips.innerText = window.lang.blueTipsTitle[1];


}

//初始化滑动条
function initSlider() {
  sliderOne = new slider({
    container: "#slider_one",
    start :-10,
    end: 10,
    step: 1,
    value: 1,
    showValue: true,
    ondrag:(obj)=>{
      sliderNum = obj.values[0];
      if (sliderNum !== 1) {
        blueTips.style.display = 'none';
      }
      firstVariable.innerText = sliderNum;
      if(sliderNum === 0) {
        calculator.removeExpression({"id": "formulaLine0" });
        calculator.removeExpression({"id": "formulaLine4" });
        calculator.setExpression({
          "id": "formulaLine5",
          "latex": "y=0",
          "color": "#FF5A5A",
          "lineStyle": "SOLID",
          "type": "expression",
          "dragMode": "AUTO",
          "fillOpacity": 0.4,
          "hidden": false,
          "label": "",
          "labelOrientation": "default",
          "labelSize": "medium",
          "pointStyle": "POINT",
          "secret": false,
          "showLabel": false,
          "verticalLabel": false
        });
      } else {
        calculator.setExpression({
          "id": "formulaLine0",
          "latex": "y-b\\ =\\ " + sliderNum + "\\left(x-a\\right)",
          "color": "#0091FF",
          "lineStyle": "SOLID",
          "type": "expression",
          "dragMode": "AUTO",
          "fillOpacity": 0.4,
          "hidden": false,
          "label": "",
          "labelOrientation": "default",
          "labelSize": "medium",
          "pointStyle": "POINT",
          "secret": false,
          "showLabel": false,
          "verticalLabel": false
        });
        calculator.setExpression({
          "id": "formulaLine5",
          "latex": "y=" + sliderNum + "x",
          "color": "#0091FF",
          "lineStyle": "SOLID",
          "type": "expression",
          "dragMode": "AUTO",
          "fillOpacity": 0.4,
          "hidden": false,
          "label": "",
          "labelOrientation": "default",
          "labelSize": "medium",
          "pointStyle": "POINT",
          "secret": false,
          "showLabel": false,
          "verticalLabel": false
        });
        calculator.setExpression({
          "id": "formulaLine4",
          "latex": "\\left(a,b\\right)",
          "color": "#FF5A5A",
          "lineStyle": "SOLID",
          "type": "expression",
          "dragMode": "XY",
          "fillOpacity": 0.4,
          "hidden": false,
          "label": "",
          "labelOrientation": "default",
          "labelSize": "medium",
          "pointStyle": "POINT",
          "secret": false,
          "showLabel": true,
          "verticalLabel": false
        });
      }

    },
    fixValue:true,
  });
}

//创建默认函数线
function createDefaultFormulaLine() {
  loadFormulaJson('./formula/formula.json');
  calculator.setExpression({
    id: "formulaLine6",
    latex: "\\left(0,0\\right)",
    color: "#FF5A5A",
    lineStyle: "SOLID",
    type: "expression",
    dragMode: "AUTO",
    fillOpacity: 0.4,
    hidden: false,
    label: katex.renderToString('A(0,0)', {throwOnError: false}),
    labelOrientation: "default",
    labelSize: "medium",
    pointStyle: "POINT",
    secret: false,
    showLabel: true,
    verticalLabel: false
  });
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

function checkValueAB() {
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    numberA = a.numericValue;
    if (numberA >= 0) {``
      secondVariable.innerText = numberA;
      left_or_right_text.innerText = window.lang.left_or_right_titles[1];
    } else {
      secondVariable.innerText = "(" + numberA + ")";
      left_or_right_text.innerText = window.lang.left_or_right_titles[0];
    }
    left_or_right_offset.innerText = Math.abs(numberA);
    if (numberA !== 0) {
      blueTips.style.display = 'none';
    }
  });

  var b = calculator.HelperExpression({latex: "b"});
  b.observe("numericValue", function() {
    numberB = b.numericValue;
    if (numberB !== 0) {
      blueTips.style.display = 'none';
    }
    if (numberB >= 0) {
      thirdVariable.innerText = numberB;
      top_or_bottom_text.innerText = window.lang.top_or_bottom_titles[0];
    } else {
      thirdVariable.innerText = "(" + numberB + ")";
      top_or_bottom_text.innerText = window.lang.top_or_bottom_titles[1];
    }
    top_or_bottom_offset.innerText = Math.abs(numberB);
  });
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
initSlider();
checkValueAB();

