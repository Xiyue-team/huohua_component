var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.screen.width;
var height = window.screen.height;
var numberA = 2;
var buttonOneFlag = false;
var buttonTwoFlag = false;
var buttonThreeFlag = false;

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

//按钮1点击事件
function formulaOne() {
  buttonOneFlag = true;
  buttonTwoFlag = false;
  buttonThreeFlag = false;
  changeBUttonStatus('none', 'block', 'block', 'none', 'block', 'none');
  changeFormulaImage('block', 'none', 'none');
  createFormulaLineForButtonOne();
  removeFormulaLineTwo();
  removeFormulaLineThree();
  removeDefaultFormulaLine();
  createDefaultFormulaLine();
}

//按钮2点击事件
function formulaTwo() {
  buttonOneFlag = false;
  buttonTwoFlag = true;
  buttonThreeFlag = false;
  changeBUttonStatus('block', 'none', 'none', 'block', 'block', 'none');
  changeFormulaImage('none', 'block', 'none');
  createFormulaLineForButtonTwo();
  removeFormulaLineOne();
  removeFormulaLineThree();
  removeDefaultFormulaLine();
  createDefaultFormulaLine();
}

//按钮3点击事件
function formulaThree() {
  buttonOneFlag = false;
  buttonTwoFlag = false;
  buttonThreeFlag = true;
  changeBUttonStatus('block', 'none', 'block', 'none', 'none', 'block');
  changeFormulaImage('none', 'none', 'block');
  createFormulaLineForButtonThree();
  removeFormulaLineOne();
  removeFormulaLineTwo();
  removeDefaultFormulaLine();
  createDefaultFormulaLine();
}

//切换按钮状态
function changeBUttonStatus(str1, str2, str3, str4, str5, str6) {
  document.getElementsByClassName('formulaOneA')[0].style.display = str1;
  document.getElementsByClassName('formulaOneB')[0].style.display = str2;
  document.getElementsByClassName('formulaTwoA')[0].style.display = str3;
  document.getElementsByClassName('formulaTwoB')[0].style.display = str4;
  document.getElementsByClassName('formulaThreeA')[0].style.display = str5;
  document.getElementsByClassName('formulaThreeB')[0].style.display = str6;
}

//切换各构造函数公式
function changeFormulaImage(str1, str2, str3) {
  document.getElementsByClassName('formulaOneClass')[0].style.display = str3;
  document.getElementsByClassName('formulaFourClass')[0].style.display = str2;
  document.getElementsByClassName('formulaFiveClass')[0].style.display = str1;
}

//检测滑条A和B的值
function checkValueAOrB() {
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    numberA = a.numericValue;
    if (numberA >= 0) {
      calculator.removeExpression({id: 'formulaLine14'});
      calculator.removeExpression({id: 'formulaLine15'});
      calculator.removeExpression({id: 'formulaLine23'});
      calculator.removeExpression({id: 'formulaLine33'});
      calculator.removeExpression({id: 'formulaLine41'});

      calculator.setExpression({
        id: "formulaLine6",
        latex: "\\left(0,a\\right)",
        color: "#FFD621",
        hidden: true,
        dragMode: "NONE",
        label: numberA.toFixed(1),
        labelOrientation: "left",
        showLabel: true
      });

      calculator.setExpression({
        id: "formulaLine7",
        latex: "\\left(0,\\frac{1}{a}\\right)",
        color: "#18A2FF",
        hidden: true,
        dragMode: "NONE",
        label: (1 / numberA).toFixed(1),
        labelOrientation: "left",
        showLabel: true
      });

      if (buttonOneFlag) {
        calculator.setExpression({
          id: "formulaLine22",
          latex: "\\left(0,a-\\frac{1}{a}\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "NONE",
          label: (numberA - (1 / numberA)).toFixed(1),
          labelOrientation: "left",
          showLabel: true
        });
      }

      if (buttonTwoFlag) {
        calculator.setExpression({
          id: "formulaLine30",
          latex: "\\left(0,\\frac{1}{a}-a\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "NONE",
          label: (1 / numberA - numberA).toFixed(1),
          labelOrientation: "left",
          showLabel: true
        });
      }

      if (buttonThreeFlag) {
        calculator.setExpression({
          id: "formulaLine38",
          latex: "\\left(0,\\frac{1}{a}+a\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "NONE",
          label: (1 / numberA + numberA).toFixed(1),
          labelOrientation: "left",
          showLabel: true
        });
      }


    } else {

      calculator.removeExpression({id: 'formulaLine6'});
      calculator.removeExpression({id: 'formulaLine7'});
      calculator.removeExpression({id: 'formulaLine22'});
      calculator.removeExpression({id: 'formulaLine30'});
      calculator.removeExpression({id: 'formulaLine38'});

      calculator.setExpression({
        id: "formulaLine14",
        latex: "\\left(0,a\\right)",
        color: "#FFD621",
        hidden: true,
        dragMode: "NONE",
        label: numberA.toFixed(1),
        labelOrientation: "right",
        showLabel: true
      });

      calculator.setExpression({
        id: "formulaLine15",
        latex: "\\left(0,\\frac{1}{a}\\right)",
        color: "#18A2FF",
        hidden: true,
        dragMode: "NONE",
        label: (1 / numberA).toFixed(1),
        labelOrientation: "right",
        showLabel: true
      });

      if (buttonOneFlag) {
        calculator.setExpression({
          id: "formulaLine23",
          latex: "\\left(0,a-\\frac{1}{a}\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "NONE",
          label: (numberA - (1 / numberA)).toFixed(1),
          labelOrientation: "right",
          showLabel: true
        });
      }

      if (buttonTwoFlag) {
        calculator.setExpression({
          id: "formulaLine33",
          latex: "\\left(0,\\frac{1}{a}-a\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "NONE",
          label: -(numberA - (1 / numberA)).toFixed(1),
          labelOrientation: "right",
          showLabel: true
        });
      }

      if (buttonThreeFlag) {
        calculator.setExpression({
          id: "formulaLine41",
          latex: "\\left(0,\\frac{1}{a}+a\\right)",
          color: "#AC84FF",
          hidden: true,
          dragMode: "AUTO",
          label: (1 / numberA + numberA).toFixed(1),
          labelOrientation: "right",
          showLabel: true
        });
      }

    }

  });

}

//默认存在函数线
function createDefaultFormulaLine() {
  //y=1/x
  calculator.setExpression({
    id: "formulaLine0",
    latex: "y=\\frac{1}{x}",
    color: "#18A2FF"
  });

  //y=x
  calculator.setExpression({
    id: "formulaLine1",
    latex: "y=x",
    color: "#FFD621",
  });

  //x=a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine2",
    latex: "x=a\\left\\{0\\le y\\le a\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: false
  });

  //y=a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine3",
    latex: "y=a\\left\\{0\\le x\\le a\\right\\}",
    color: "#FFD621",
    lineStyle: "DASHED",
    hidden: false
  });

  //黄线上的点
  calculator.setExpression({
    id: "formulaLine4",
    latex: "\\left(a,a\\right)",
    color: "#FFFFFF",
    dragMode: "NONE",
    hidden: false
  });

  //拖动点
  calculator.setExpression({
    id: "formulaLine5",
    latex: "a=2",
    color: "#FFFFFF",
    sliderBounds: { min: "-100000", max: "100000", step: "0.1" },
    hidden: true,
  });

  //(0,a)点(左侧)
  calculator.setExpression({
    id: "formulaLine6",
    latex: "\\left(0,a\\right)",
    color: "#FFD621",
    hidden: true,
    dragMode: "NONE",
    label: "2",
    labelOrientation: "left",
    showLabel: true
  });

  //(0,1/a)点(左侧)
  calculator.setExpression({
    id: "formulaLine7",
    latex: "\\left(0,\\frac{1}{a}\\right)",
    color: "#18A2FF",
    hidden: true,
    dragMode: "NONE",
    label: "0.5",
    labelOrientation: "left",
    showLabel: true
  });

  //蓝线上的点
  calculator.setExpression({
    id: "formulaLine8",
    latex: "\\left(a,\\frac{1}{a}\\right)",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "NONE",
  });

  //x=a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine9",
    latex: "x=a\\left\\{0\\le y\\le\\frac{1}{a}\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: false,
    dragMode: "AUTO",
  });

  //y=1/a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine10",
    latex: "y=\\frac{1}{a}\\left\\{0\\le x\\le a\\right\\}",
    color: "#18A2FF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  //(a,0)点
  calculator.setExpression({
    id: "formulaLine11",
    latex: "\\left(a,0\\right)",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "AUTO",
    label: "2",
    showLabel: true
  });

  //x=a虚线(左侧)
  calculator.setExpression({
    id: "formulaLine12",
    latex: "x=a\\left\\{a\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  //y=a虚线(左侧)
  calculator.setExpression({
    id: "formulaLine13",
    latex: "y=a\\left\\{a\\le x\\le0\\right\\}",
    color: "#FFD621",
    hidden: false,
    dragMode: "AUTO",
    lineStyle: "DASHED",
  });

  //(0,a)(右侧)
  calculator.setExpression({
    id: "formulaLine14",
    latex: "\\left(0,a\\right)",
    color: "#FFD621",
    hidden: true,
    dragMode: "NONE",
    label: "-2",
    labelOrientation: "right",
    showLabel: false
  });

  //(0,1/a)(右侧)
  calculator.setExpression({
    id: "formulaLine15",
    latex: "\\left(0,\\frac{1}{a}\\right)",
    color: "#18A2FF",
    hidden: true,
    dragMode: "NONE",
    label: "-0.5",
    labelOrientation: "right",
    showLabel: false
  });

  //x=a虚线(左侧)
  calculator.setExpression({
    id: "formulaLine16",
    latex: "x=a\\left\\{\\frac{1}{a}\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "AUTO",
    lineStyle: "DASHED",
  });

  //y=1/a虚线(左侧)
  calculator.setExpression({
    id: "formulaLine17",
    latex: "y=\\frac{1}{a}\\left\\{a\\le x\\le0\\right\\}",
    color: "#18A2FF",
    hidden: false,
    dragMode: "AUTO",
    lineStyle: "DASHED",
  });
}

//按钮1函数线
function createFormulaLineForButtonOne() {
  //构造函数y=x-1/x
  calculator.setExpression({
    id: "formulaLine18",
    latex: "y=x-\\frac{1}{x}",
    color: "#AC84FF",
    hidden: false,
    dragMode: "AUTO",
  });

  //x=a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine19",
    latex: "x=a\\left\\{0\\le y\\le a-\\frac{1}{a}\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "AUTO",
    lineStyle: "DASHED",
  });

  //y=a-1/a虚线(右侧)
  calculator.setExpression({
    id: "formulaLine20",
    latex: "y=a-\\frac{1}{a}\\left\\{0\\le x\\le a\\right\\}",
    color: "#AC84FF",
    hidden: false,
    dragMode: "AUTO",
    lineStyle: "DASHED",
  });

  calculator.setExpression({
    id: "formulaLine21",
    latex: "\\left(a,a-\\frac{1}{a}\\right)",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "NONE",
  });

  calculator.setExpression({
    id: "formulaLine22",
    latex: "\\left(0,a-\\frac{1}{a}\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "NONE",
    label: "1.5",
    labelOrientation: "left",
    showLabel: true
  });

  calculator.setExpression({
    id: "formulaLine23",
    latex: "\\left(0,a-\\frac{1}{a}\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "NONE",
    label: "-1.5",
    labelOrientation: "right",
    showLabel: false
  });

  calculator.setExpression({
    id: "formulaLine24",
    latex: "x=a\\left\\{a-\\frac{1}{a}\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: false,
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine25",
    latex: "y=a-\\frac{1}{a}\\left\\{a\\le x\\le0\\right\\}",
    color: "#AC84FF",
    lineStyle: "DASHED",
    hidden: false,
    dragMode: "AUTO",
  });
}

//按钮2函数线
function createFormulaLineForButtonTwo() {
  calculator.setExpression({
    id: "formulaLine26",
    latex: "y=\\frac{1}{x}-x",
    color: "#AC84FF",
    hidden: false,
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine27",
    latex: "x=a\\left\\{\\frac{1}{a}-a\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine28",
    latex: "y=\\frac{1}{a}-a\\left\\{0\\le x\\le a\\right\\}",
    color: "#AC84FF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine29",
    latex: "\\left(a,\\frac{1}{a}-a\\right)",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "NONE",
  });

  calculator.setExpression({
    id: "formulaLine30",
    latex: "\\left(0,\\frac{1}{a}-a\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "NONE",
    label: "-1.5",
    labelOrientation: "left",
    showLabel: true
  });

  calculator.setExpression({
    id: "formulaLine31",
    latex: "x=a\\left\\{0\\le y\\le\\frac{1}{a}-a\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine32",
    latex: "y=\\frac{1}{a}-a\\left\\{a\\le x\\le0\\right\\}",
    color: "#AC84FF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine33",
    latex: "\\left(0,\\frac{1}{a}-a\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "NONE",
    label: "1.5",
    labelOrientation: "right",
    showLabel: false
  });

}

//按钮3函数线
function createFormulaLineForButtonThree() {
  calculator.setExpression({
    id: "formulaLine34",
    latex: "y=x+\\frac{1}{x}",
    color: "#AC84FF",
    hidden: false,
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine35",
    latex: "x=a\\left\\{\\frac{1}{a}+a\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine36",
    latex: "y=\\frac{1}{a}+a\\left\\{a\\le x\\le0\\right\\}",
    color: "#AC84FF",
    hidden: false,
    lineStyle: "DASHED",
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine37",
    latex: "\\left(a,\\frac{1}{a}+a\\right)",
    color: "#FFFFFF",
    hidden: false,
    dragMode: "NONE",
  });

  calculator.setExpression({
    id: "formulaLine38",
    latex: "\\left(0,\\frac{1}{a}+a\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "NONE",
    label: "2.5",
    labelOrientation: "left",
    showLabel: true
  });

  calculator.setExpression({
    id: "formulaLine39",
    latex: "x=a\\left\\{0\\le y\\le\\frac{1}{a}+a\\right\\}",
    color: "#FFFFFF",
    lineStyle: "DASHED",
    hidden: false,
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine40",
    latex: "y=\\frac{1}{a}+a\\left\\{0\\le x\\le a\\right\\}",
    color: "#AC84FF",
    lineStyle: "DASHED",
    hidden: false,
    dragMode: "AUTO",
  });

  calculator.setExpression({
    id: "formulaLine41",
    latex: "\\left(0,\\frac{1}{a}+a\\right)",
    color: "#AC84FF",
    hidden: true,
    dragMode: "AUTO",
    label: "-2.5",
    labelOrientation: "right",
    showLabel: false
  });
}

//删除函数线1
function removeFormulaLineOne() {
    for (var i = 18; i < 26; i++) {
      calculator.removeExpression({id: 'formulaLine' + i});
    }
}

//删除函数线2
function removeFormulaLineTwo() {
  for (var i = 26; i < 34; i++) {
    calculator.removeExpression({id: 'formulaLine' + i});
  }
}

//删除函数线3
function removeFormulaLineThree() {
  for (var i = 34; i < 42; i++) {
    calculator.removeExpression({id: 'formulaLine' + i});
  }
}

//删除初始函数线
function removeDefaultFormulaLine() {
  for (var i = 0; i < 18; i++) {
    calculator.removeExpression({id: 'formulaLine' + i});
  }
}

//图片适配
function adapterMobile() {
    if (width <= 610 || height <= 610) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '16px';
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
  //maskDiv.appendChild(orienttatioDiv);

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
  numberA = 2;
  buttonOneFlag = false;
  buttonTwoFlag = false;
  buttonThreeFlag = false;
  changeBUttonStatus('block', 'none', 'block', 'none', 'block', 'none');
  changeFormulaImage('none', 'none', 'none');
  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
  checkValueAOrB();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
checkValueAOrB();
adapterMobile();
