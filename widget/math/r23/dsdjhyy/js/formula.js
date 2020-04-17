var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);

var width = window.screen.width;
var height = window.screen.height;

//设置初始状态
function setCalcuState() {
  calculator.updateSettings({
    language: "zh-CN",
    expressions: false,
    keypad: false,
    lockViewport: true,
    pointsOfInterest: false,
    settingsMenu: false,
    trace: false,
    zoomButtons: false
  });
  calculator.updateSettings({
    showGrid: false,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    xAxisNumbers: false,
    yAxisNumbers: false,
    xAxisLabel: "x",
    yAxisLabel: "y",
    projectorMode: false
  });
}

//检测滑条A和B的值
function checkValueAOrB() {
  var numberA = 2;
  var numberB = 4;
  var numberAy;
  var numberBy;
  var slopeAB;

  //右侧fx1
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    numberA = a.numericValue;
    numberAy = Math.pow(numberA, 2) * 1 / 2;
    slopeAB = (numberBy - numberAy) / (numberB - numberA);
    if (numberA === -numberB) {
      calculator.setExpression({
        id: "formula8",
        latex: "y=\\frac{1}{2}a^2",
        color: "#FFD621",
        hidden: false,
        pointStyle: "POINT",
        showLabel: true
      });
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = 0;
    } else {
      calculator.removeExpression({ id: "formula8" });
      calculator.removeExpression({ id: "formula9" });
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = slopeAB.toFixed(2);
    }

    if (numberA === numberB && numberAy === numberBy) {
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = '不存在';
    }

    document.getElementsByClassName('topTextClass')[0].innerHTML = (numberA - numberB).toFixed(2);
    document.getElementsByClassName('centerTextClass')[0].innerHTML = numberA;

  });

  //右侧fx2
  var b = calculator.HelperExpression({latex: "b"});
  b.observe("numericValue", function() {
    numberB = b.numericValue;
    numberBy = Math.pow(numberB, 2) * 1 / 2
    slopeAB = (numberBy - numberAy) / (numberB - numberA);
    if (numberB === -numberA) {
      calculator.setExpression({
        id: "formula9",
        latex: "y=\\frac{1}{2}b^2",
        color: "#FFD621",
        hidden: false,
        pointStyle: "POINT",
        showLabel: true
      });
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = 0;
    } else {
      calculator.removeExpression({ id: "formula8" });
      calculator.removeExpression({ id: "formula9" });
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = slopeAB.toFixed(2);
    }

    if (numberA === numberB && numberAy === numberBy) {
      document.getElementsByClassName('bottomTextClass')[0].innerHTML = '不存在';
    }
    document.getElementsByClassName('topTextClass')[0].innerHTML = (numberA - numberB).toFixed(2);
  });
}

function createFormulaLine() {
//二次函数线
  calculator.setExpression({
    id: "formula1",
    latex: "y=\\frac{1}{2}x^2",
    color: "#18A2FF"
  });

  //A点
  calculator.setExpression({
    id: "formula2",
    label: "A",
    latex: "\\left(a,\\ \\frac{1}{2}a^2\\right)",
    color: "#ffffff",
    hidden: false,
    pointStyle: "POINT",
    showLabel: true
  });

  //滑条a
  calculator.setExpression({
    id: "formula3",
    latex: "a=2",
    sliderBounds: { min: "-4", max: "4", step: "0.01" }
  });

  //B点
  calculator.setExpression({
    id: "formula4",
    label: "B",
    latex: "\\left(b,\\ \\frac{1}{2}b^2\\right)",
    color: "#ffffff",
    hidden: false,
    pointStyle: "POINT",
    showLabel: true
  });

  //滑条b
  calculator.setExpression({
    id: "formula5",
    latex: "b=4",
    sliderBounds: { min: "-4", max: "4", step: "0.01" }
  });

  //过A点与二次函数的切线
  calculator.setExpression({
    id: "formula6",
    latex: "y-\\frac{1}{2}a^2=a\\left(x-a\\right)",
    color: "#9BF23B",
    hidden: false,
  });

  //过A和B点的直线
  calculator.setExpression({
    id: "formula7",
    latex: "\\frac{\\left(x-a\\right)}{\\left(b-a\\right)}=\\frac{\\left(y-\\frac{1}{2}a^2\\right)}{\\frac{1}{2}\\left(b^2-a^2\\right)}",
    color: "#FFD621",
    hidden: false,
  });
}

//图片适配
function adapterMobile() {
    //适配手机
    if (width <= 610 || height <= 610) {
      document.getElementsByClassName('topTextClass')[0].style.fontSize = '12px';
      document.getElementsByClassName('centerTextClass')[0].style.fontSize = '12px';
      document.getElementsByClassName('bottomTextClass')[0].style.fontSize = '12px';

      document.getElementsByClassName('topTextClass')[0].style.width = '40px';
      document.getElementsByClassName('centerTextClass')[0].style.width = '40px';
      document.getElementsByClassName('bottomTextClass')[0].style.width = '40px';

      document.getElementsByClassName('topTextClass')[0].style.right = '3%';
      document.getElementsByClassName('centerTextClass')[0].style.right = '3%';
      document.getElementsByClassName('bottomTextClass')[0].style.right = '3%';
    }

    //适配ipad
    if (!!navigator.userAgent.match(/.*iPad.*/)) {
      document.getElementsByClassName('topTextClass')[0].style.right = '2%';
      document.getElementsByClassName('centerTextClass')[0].style.right = '2%';
      document.getElementsByClassName('bottomTextClass')[0].style.right = '2%';
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
  calculator.setBlank();
  setCalcuState();
  createFormulaLine();
  checkValueAOrB();
}

initTip();
setCalcuState();
createFormulaLine();
checkValueAOrB();
adapterMobile();
