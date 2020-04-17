var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.screen.width;
var height = window.screen.height;
var buttonFlag = false;
var equalButtonFlag = false;
var sliderNumOne = 0;
var derivative_function = document.getElementsByClassName('derivative_function')[0];
var max_value = document.getElementsByClassName('max_value')[0];
var equal_formula = document.getElementsByClassName('equal_formula')[0];

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

//初始化滑动条
function initSlider() {
  sliderOne = new slider({
    container: "#slider_one",
    start :-10,
    end: 10,
    step: 0.1,
    value: 0,
    showValue: true,
    ondrag:(obj)=>{
      sliderNumOne = obj.values[0];
      var string = 'a=' + sliderNumOne;
      calculator.setExpression({
        id: "formulaLine3",
        latex: string,
        hidden: true
      });
      document.getElementById('sliderValue').innerHTML = sliderNumOne.toString();
      if (sliderNumOne === 0) {
        document.getElementById('devrivative_text').innerHTML = '不可导';
      } else {
        document.getElementById('devrivative_text').innerHTML = '可导';
      }
    },
    fixValue:true,
  });
}

//按钮定义域点击事件
function derivativeEvent() {
    sliderNumOne = 0;
    sliderOne.setValue(sliderNumOne);
    calculator.setExpression({
      id: "formulaLine3",
      latex: "a=0",
      hidden: true
    });
    document.getElementById('sliderValue').innerHTML = '0';
    document.getElementById('devrivative_text').innerHTML = '不可导';
    buttonFlag = false;
    equalButtonFlag = false;
    var state = calculator.getState();
    derivative_function.style.background = '#0091FF';
    derivative_function.style.color = '#FFFFFF';
    max_value.style.background = '#EBEBEB';
    max_value.style.color = '#525252';
    equal_formula.style.background = '#EBEBEB';
    equal_formula.style.color = '#525252';
    state.expressions.list[0].hidden = false;
    state.expressions.list[1].hidden = false;
    state.expressions.list[2].hidden = false;
    calculator.setState(state);
    for (let i = 4; i < 13; i++) {
      calculator.removeExpression({id: 'formulaLine' + i});
    }
    document.getElementsByClassName('formulaOne_class')[0].style.display = 'block';
    document.getElementsByClassName('formulaTwo_class')[0].style.display = 'none';
    document.getElementsByClassName('formulaThree_class')[0].style.display = 'none';
}

//按钮连续性点击事件
function maxEvent() {
  sliderNumOne = 0;
  sliderOne.setValue(sliderNumOne);
  calculator.setExpression({
    id: "formulaLine3",
    latex: "a=0",
    hidden: true
  });
  document.getElementById('sliderValue').innerHTML = '0';
  document.getElementById('devrivative_text').innerHTML = '不可导';
  buttonFlag = true;
  equalButtonFlag = false;
  var state = calculator.getState();
  max_value.style.background = '#0091FF';
  max_value.style.color = '#FFFFFF';
  derivative_function.style.background = '#EBEBEB';
  derivative_function.style.color = '#525252';
  equal_formula.style.background = '#EBEBEB';
  equal_formula.style.color = '#525252';
  state.expressions.list[0].hidden = true;
  state.expressions.list[1].hidden = true;
  state.expressions.list[2].hidden = true;
  calculator.setState(state);
  calculator.setExpression({
    id: "formulaLine4",
    latex: "y=5^x-1\\left\\{x\\le0\\right\\}",
    color: "#18A2FF",
    lineStyle: "SOLID",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine7",
    latex: "y=2^x\\left\\{x\\ge0\\right\\}",
    color: "#18A2FF",
    lineStyle: "SOLID",
    hidden: false,
  });
  calculator.removeExpression({id: 'formulaLine10'});
  calculator.removeExpression({id: 'formulaLine11'});
  calculator.removeExpression({id: 'formulaLine12'});
  checkValueA();
  document.getElementsByClassName('formulaOne_class')[0].style.display = 'none';
  document.getElementsByClassName('formulaTwo_class')[0].style.display = 'block';
  document.getElementsByClassName('formulaThree_class')[0].style.display = 'none';
}

//按钮左右导数相等点击事件
function equalEvent() {
  sliderNumOne = 0;
  sliderOne.setValue(sliderNumOne);
  calculator.setExpression({
    id: "formulaLine3",
    latex: "a=0",
    hidden: true
  });
  document.getElementById('sliderValue').innerHTML = '0';
  document.getElementById('devrivative_text').innerHTML = '不可导';
  buttonFlag = false;
  equalButtonFlag = true;
  var state = calculator.getState();
  state.expressions.list[0].hidden = true;
  state.expressions.list[1].hidden = true;
  state.expressions.list[2].hidden = true;
  calculator.setState(state);
  derivative_function.style.background = '#EBEBEB';
  derivative_function.style.color = '#525252';
  max_value.style.background = '#EBEBEB';
  max_value.style.color = '#525252';
  equal_formula.style.background = '#0091FF';
  equal_formula.style.color = '#FFFFFF';

  for (let i = 4; i < 10; i++) {
    calculator.removeExpression({id: 'formulaLine' + i});
  }
  calculator.setExpression({
    id: "formulaLine7",
    latex: "y=2^x\\left\\{x\\ge0\\right\\}",
    color: "#18A2FF",
    lineStyle: "SOLID",
    hidden: false,
  });

  calculator.setExpression({
    id: "formulaLine10",
    latex: "y=5^x\\left\\{x\\le0\\right\\}",
    color: "#18A2FF",
    lineStyle: "SOLID",
    hidden: false,
  });
  checkValueA();
  document.getElementsByClassName('formulaOne_class')[0].style.display = 'none';
  document.getElementsByClassName('formulaTwo_class')[0].style.display = 'none';
  document.getElementsByClassName('formulaThree_class')[0].style.display = 'block';
}

//检测滑条A的值
function checkValueA() {
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
      if (buttonFlag) {
        if (a.numericValue > 0) {
          calculator.setExpression({
            id: "formulaLine8",
            latex: "\\left(a,2^a\\right)",
            color: "#FFFFFF",
            dragMode: 'NONE',
            hidden: false,
          });
          calculator.setExpression({
            id: "formulaLine9",
            latex: "y=2^a\\ln\\left(2\\right)\\left(x-a\\right)+2^a",
            color: "#FF5A5A",
            hidden: false,
            lineStyle: "DASHED",
          });
          calculator.removeExpression({id: 'formulaLine5'});
          calculator.removeExpression({id: 'formulaLine6'});

        } else if (a.numericValue < 0) {

          calculator.setExpression({
            id: "formulaLine5",
            latex: "\\left(a,5^a-1\\right)",
            color: "#FFFFFF",
            lineStyle: "SOLID",
            dragMode: 'NONE',
            hidden: false
          });
          calculator.setExpression({
            id: "formulaLine6",
            latex: "y-\\left(5^a-1\\right)=5^a\\ln\\left(5\\right)\\left(x-a\\right)",
            color: "#FF5A5A",
            lineStyle: "DASHED",
            hidden: false,
          });
          calculator.removeExpression({id: 'formulaLine8'});
          calculator.removeExpression({id: 'formulaLine9'});

        } else {

          calculator.setExpression({
            id: "formulaLine5",
            latex: "\\left(a,5^a-1\\right)",
            color: "#FFFFFF",
            lineStyle: "SOLID",
            dragMode: 'NONE',
            hidden: false
          });
          calculator.setExpression({
            id: "formulaLine6",
            latex: "y-\\left(5^a-1\\right)=5^a\\ln\\left(5\\right)\\left(x-a\\right)",
            color: "#FF5A5A",
            lineStyle: "DASHED",
            hidden: false,
          });
          calculator.setExpression({
            id: "formulaLine8",
            latex: "\\left(a,2^a\\right)",
            color: "#FFFFFF",
            dragMode: 'NONE',
            hidden: false,
          });
          calculator.setExpression({
            id: "formulaLine9",
            latex: "y=2^a\\ln\\left(2\\right)\\left(x-a\\right)+2^a",
            color: "#9BF23B",
            hidden: false,
            lineStyle: "DASHED",
          });
        }
      }

      if (equalButtonFlag) {
          if (a.numericValue > 0) {
            calculator.setExpression({
              id: "formulaLine8",
              latex: "\\left(a,2^a\\right)",
              color: "#FFFFFF",
              dragMode: 'NONE',
              hidden: false,
            });
            calculator.setExpression({
              id: "formulaLine9",
              latex: "y=2^a\\ln\\left(2\\right)\\left(x-a\\right)+2^a",
              color: "#FF5A5A",
              hidden: false,
              lineStyle: "DASHED",
            });
            calculator.removeExpression({id: 'formulaLine11'});
            calculator.removeExpression({id: 'formulaLine12'});

          } else if (a.numericValue < 0) {
            calculator.setExpression({
              id: "formulaLine11",
              latex: "\\left(a,5^a\\right)",
              color: "#FFFFFF",
              lineStyle: "SOLID",
              dragMode: 'NONE',
              hidden: false,
            });

            calculator.setExpression({
              id: "formulaLine12",
              latex: "y-5^a=5^a\\ln\\left(5\\right)\\left(x-a\\right)",
              color: "#FF5A5A",
              lineStyle: "DASHED",
              hidden: false,
            });
            calculator.removeExpression({id: 'formulaLine8'});
            calculator.removeExpression({id: 'formulaLine9'});

          } else {
            calculator.setExpression({
              id: "formulaLine8",
              latex: "\\left(a,2^a\\right)",
              color: "#FFFFFF",
              dragMode: 'NONE',
              hidden: false,
            });
            calculator.setExpression({
              id: "formulaLine9",
              latex: "y=2^a\\ln\\left(2\\right)\\left(x-a\\right)+2^a",
              color: "#9BF23B",
              hidden: false,
              lineStyle: "DASHED",
            });
            calculator.setExpression({
              id: "formulaLine11",
              latex: "\\left(a,5^a\\right)",
              color: "#FFFFFF",
              lineStyle: "SOLID",
              dragMode: 'NONE',
              hidden: false,
            });

            calculator.setExpression({
              id: "formulaLine12",
              latex: "y-5^a=5^a\\ln\\left(5\\right)\\left(x-a\\right)",
              color: "#FF5A5A",
              lineStyle: "DASHED",
              hidden: false,
            });
          }
      }
  });
}

//默认函数线
function createDefaultFormulaLine() {
  calculator.setExpression({
    id: "formulaLine0",
    latex: "y=\\frac{1}{x}",
    color: "#18A2FF",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "\\left(a,\\frac{1}{a}\\right)",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "y=-\\frac{1}{a^2}\\left(x-a\\right)+\\frac{1}{a}",
    color: "#FF5A5A",
    lineStyle: "DASHED",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine3",
    latex: "a=0",
    color: "#FFFFFF",
    sliderBounds: { min: "-10", max: "10", step: "0.1" },
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine8",
    latex: "\\left(a,2^a\\right)",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine9",
    latex: "y=2^a\\ln\\left(2\\right)\\left(x-a\\right)+2^a",
    color: "#9BF23B",
    hidden: true,
    lineStyle: "DASHED",
  });

  calculator.setExpression({
    id: "formulaLine11",
    latex: "\\left(a,5^a\\right)",
    color: "#FFFFFF",
    lineStyle: "SOLID",
    dragMode: 'NONE',
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine12",
    latex: "y-5^a=5^a\\ln\\left(5\\right)\\left(x-a\\right)",
    color: "#FF5A5A",
    lineStyle: "DASHED",
    hidden: true,
  });
}

//图片适配手机
function adapterMobile() {
    if (width <= 610 || height <= 610) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
        document.getElementsByClassName('three_buttons')[0].style.transform = 'scale(0.7)';
        document.getElementsByClassName('three_buttons')[0].style.right = 0 + 'px';
        document.getElementsByClassName('three_buttons')[0].style.top = '25%';
        document.getElementsByClassName('formulaTwo_class')[0].style.transform = 'scale(0.7)';
        document.getElementsByClassName('formulaTwo_class')[0].style.left = '52%';
        document.getElementsByClassName('formulaThree_class')[0].style.transform = 'scale(0.7)';
        document.getElementsByClassName('formulaThree_class')[0].style.left = '20%';
        document.getElementsByClassName('formulaThree_class')[0].style.bottom = '25%';
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
  buttonOneFlag = false;
  equalButtonFlag = false;
  derivative_function.style.background = '#18A2FF';
  derivative_function.style.color = '#FFFFFF';
  max_value.style.background = '#EBEBEB';
  max_value.style.color = '#525252';
  equal_formula.style.background = '#EBEBEB';
  equal_formula.style.color = '#525252';
  sliderNumOne = 0;
  sliderOne.setValue(sliderNumOne);
  document.getElementById('sliderValue').innerHTML = '0';
  document.getElementById('devrivative_text').innerHTML = '不可导';
  document.getElementsByClassName('formulaOne_class')[0].style.display = 'block';
  document.getElementsByClassName('formulaTwo_class')[0].style.display = 'none';
  document.getElementsByClassName('formulaThree_class')[0].style.display = 'none';
  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
adapterMobile();
initSlider();
new window.SS();
