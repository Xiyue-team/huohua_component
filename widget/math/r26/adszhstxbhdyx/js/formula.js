var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.screen.width;
var height = window.screen.height;
var sliderNumOne = 2;
var numberB = 1.5;
var buttonOneFlag = false;
var buttonTwoFlag = false;
var buttonThreeFlag = false;
var formulaOne_A = document.getElementsByClassName('formulaOne_A')[0];
var formulaOne_B = document.getElementsByClassName('formulaOne_B')[0];
var formulaTwo_A = document.getElementsByClassName('formulaTwo_A')[0];
var formulaTwo_B = document.getElementsByClassName('formulaTwo_B')[0];
var formulaThree_A = document.getElementsByClassName('formulaThree_A')[0];
var formulaThree_B= document.getElementsByClassName('formulaThree_B')[0];

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
    start :0.1,
    end: 5,
    step: 0.1,
    value: 2,
    showValue: true,
    ondrag:(obj)=>{
      sliderNumOne = obj.values[0];
      var string = 'a=' + sliderNumOne;
      calculator.setExpression({
        id: "formulaLine0",
        latex: string,
        hidden: true
      });
      if (numberB >= 0) {
        if (buttonOneFlag) {
          calculator.setExpression({
                id: "formulaLine17",
                latex: "\\left(0,b^a\\right)",
                color: "#FF5A5A",
                hidden: true,
                label: Math.pow(numberB, sliderNumOne).toFixed(2),
                showLabel: true,
                labelOrientation: 'left'
          });
        }

        if (buttonTwoFlag) {
          calculator.setExpression({
            id: "formulaLine12",
            latex: "\\left(0,a^b\\right)",
            color: "#6ECFFF",
            hidden: true,
            label: Math.pow(sliderNumOne, numberB).toFixed(2),
            showLabel: true,
            labelOrientation: 'left'
          });
        }

        if (buttonThreeFlag) {
          calculator.setExpression({
            id: "formulaLine7",
            latex: "\\left(0,\\log_a\\left(b\\right)\\right)",
            color: "#9BF23B",
            hidden: true,
            label: (Math.log(numberB) / Math.log(sliderNumOne)).toFixed(2),
            showLabel: true,
            labelOrientation: 'left'
          });
        }

      } else {
        if (sliderNumOne % 2 === 0) {
          if (buttonOneFlag) {
            calculator.setExpression({
              id: "formulaLine17",
              latex: "\\left(0,b^a\\right)",
              color: "#FF5A5A",
              hidden: true,
              label: Math.pow(numberB, sliderNumOne).toFixed(2),
              showLabel: true,
              labelOrientation: 'right'
            });
          }
        } else {
          if (buttonOneFlag) {
            calculator.setExpression({
              id: "formulaLine17",
              latex: "\\left(0,b^a\\right)",
              color: "#FF5A5A",
              hidden: true,
              label: -Math.pow(Math.abs(numberB), sliderNumOne).toFixed(2),
              showLabel: true,
              labelOrientation: 'right'
            });
          }
        }
      }
    },
    fixValue:true,
  });
}

//按钮一
function formulaOneEvent() {
    var state = calculator.getState();
    if (buttonOneFlag) {
        buttonOneFlag = false;
        formulaOne_A.style.display = 'block';
        formulaOne_B.style.display = 'none';
        state.expressions.list[2].hidden = true;
        state.expressions.list[5].hidden = true;
        state.expressions.list[5].showLabel = false;
        state.expressions.list[15].hidden = true;
        state.expressions.list[16].hidden = true;
        state.expressions.list[17].hidden = true;
        state.expressions.list[18].hidden = true;
        state.expressions.list[21].hidden = true;

    } else {

        buttonOneFlag = true;
        formulaOne_A.style.display = 'none';
        formulaOne_B.style.display = 'block';
        state.expressions.list[2].hidden = false;
        state.expressions.list[5].hidden = false;
        state.expressions.list[5].showLabel = true;
        state.expressions.list[15].hidden = false;
        state.expressions.list[16].hidden = false;
        state.expressions.list[17].hidden = false;
        state.expressions.list[18].hidden = false;
        state.expressions.list[21].hidden = false;
    }

    calculator.setState(state);
    checkValueB();
}

//按钮二
function formulaTwoEvent() {
    var state = calculator.getState();
    if (buttonTwoFlag) {
      buttonTwoFlag = false;
      formulaTwo_A.style.display = 'block';
      formulaTwo_B.style.display = 'none';
      state.expressions.list[3].hidden = true;
      state.expressions.list[10].showLebel = false;
      state.expressions.list[11].hidden = true;
      state.expressions.list[12].hidden = true;
      state.expressions.list[13].hidden = true;
      state.expressions.list[20].hidden = true;

    } else {
      buttonTwoFlag = true;
      formulaTwo_A.style.display = 'none';
      formulaTwo_B.style.display = 'block';
      state.expressions.list[3].hidden = false;
      state.expressions.list[10].showLebel = true;
      state.expressions.list[11].hidden = false;
      state.expressions.list[12].hidden = false;
      state.expressions.list[13].hidden = false;
      state.expressions.list[20].hidden = false;
    }
    calculator.setState(state);
    checkValueB();
}

//按钮三
function formulaThreeEvent() {
    var state = calculator.getState();
    if (buttonThreeFlag) {
      buttonThreeFlag = false;
      formulaThree_A.style.display = 'block';
      formulaThree_B.style.display = 'none';
      state.expressions.list[4].hidden = true;
      state.expressions.list[6].showLabel = false;
      state.expressions.list[7].hidden = true;
      state.expressions.list[8].hidden = true;
      state.expressions.list[9].hidden = true;
      state.expressions.list[19].hidden = true;

    } else {
      buttonThreeFlag = true;
      formulaThree_A.style.display = 'none';
      formulaThree_B.style.display = 'block';
      state.expressions.list[4].hidden = false;
      state.expressions.list[6].showLabel = true;
      state.expressions.list[7].hidden = false;
      state.expressions.list[8].hidden = false;
      state.expressions.list[9].hidden = false;
      state.expressions.list[19].hidden = false;
    }
    calculator.setState(state);
    checkValueB();
}

function checkValueB() {
  var b = calculator.HelperExpression({latex: "b"});
  b.observe("numericValue", function() {
    numberB = b.numericValue;
    if (!buttonOneFlag && !buttonTwoFlag && !buttonThreeFlag) {
      calculator.setExpression({
        id: "formulaLine5",
        latex: "\\left(b,0\\right)",
        color: "#FFFFFF",
        hidden: true,
        label: numberB.toFixed(2),
        showLabel: false,
        labelOrientation: 'below'
      });
    } else {
      calculator.setExpression({
        id: "formulaLine5",
        latex: "\\left(b,0\\right)",
        color: "#FFFFFF",
        hidden: false,
        label: numberB.toFixed(2),
        showLabel: true,
        labelOrientation: 'below'
      });
    }

    if (numberB >= 0) {
      if (buttonOneFlag) {
        calculator.setExpression({
          id: "formulaLine17",
          latex: "\\left(0,b^a\\right)",
          color: "#FF5A5A",
          hidden: true,
          label: Math.pow(numberB, sliderNumOne).toFixed(2),
          showLabel: true,
          labelOrientation: 'left'
        });
      } else {
        calculator.setExpression({
          id: "formulaLine17",
          latex: "\\left(0,b^a\\right)",
          color: "#FF5A5A",
          hidden: true,
          label: Math.pow(numberB, sliderNumOne).toFixed(2),
          showLabel: false,
          labelOrientation: 'left'
        });
      }

      if (buttonTwoFlag) {
        calculator.setExpression({
          id: "formulaLine12",
          latex: "\\left(0,a^b\\right)",
          color: "#6ECFFF",
          hidden: true,
          label: Math.pow(sliderNumOne, numberB).toFixed(2),
          showLabel: true,
          labelOrientation: 'left'
        });
      } else {
        calculator.setExpression({
          id: "formulaLine12",
          latex: "\\left(0,a^b\\right)",
          color: "#6ECFFF",
          hidden: true,
          label: Math.pow(sliderNumOne, numberB).toFixed(2),
          showLabel: false,
          labelOrientation: 'left'
        });
      }

      if (buttonThreeFlag) {
        calculator.setExpression({
          id: "formulaLine7",
          latex: "\\left(0,\\log_a\\left(b\\right)\\right)",
          color: "#9BF23B",
          hidden: true,
          label: (Math.log(numberB) / Math.log(sliderNumOne)).toFixed(2),
          showLabel: true,
          labelOrientation: 'left'
        });
      } else {
        calculator.setExpression({
          id: "formulaLine7",
          latex: "\\left(0,\\log_a\\left(b\\right)\\right)",
          color: "#9BF23B",
          hidden: true,
          label: (Math.log(numberB) / Math.log(sliderNumOne)).toFixed(2),
          showLabel: false,
          labelOrientation: 'left'
        });
      }


    } else {

      if (sliderNumOne % 2 === 0) {
        if (buttonOneFlag) {
          calculator.setExpression({
            id: "formulaLine17",
            latex: "\\left(0,b^a\\right)",
            color: "#FF5A5A",
            hidden: true,
            label: Math.pow(numberB, sliderNumOne).toFixed(2),
            showLabel: true,
            labelOrientation: 'right'
          });
        } else {
          calculator.setExpression({
            id: "formulaLine17",
            latex: "\\left(0,b^a\\right)",
            color: "#FF5A5A",
            hidden: true,
            label: Math.pow(numberB, sliderNumOne).toFixed(2),
            showLabel: false,
            labelOrientation: 'right'
          });
        }

      } else {
        if (buttonOneFlag) {
          calculator.setExpression({
            id: "formulaLine17",
            latex: "\\left(0,b^a\\right)",
            color: "#FF5A5A",
            hidden: true,
            label: -Math.pow(Math.abs(numberB), sliderNumOne).toFixed(2),
            showLabel: true,
            labelOrientation: 'right'
          });
        } else {
          calculator.setExpression({
            id: "formulaLine17",
            latex: "\\left(0,b^a\\right)",
            color: "#FF5A5A",
            hidden: true,
            label: -Math.pow(Math.abs(numberB), sliderNumOne).toFixed(2),
            showLabel: false,
            labelOrientation: 'right'
          });
        }
      }

      if (buttonTwoFlag) {
        calculator.setExpression({
          id: "formulaLine12",
          latex: "\\left(0,a^b\\right)",
          color: "#6ECFFF",
          hidden: true,
          label: Math.pow(sliderNumOne, numberB).toFixed(2),
          showLabel: true,
          labelOrientation: 'right'
        });
      } else {
        calculator.setExpression({
          id: "formulaLine12",
          latex: "\\left(0,a^b\\right)",
          color: "#6ECFFF",
          hidden: true,
          label: Math.pow(sliderNumOne, numberB).toFixed(2),
          showLabel: false,
          labelOrientation: 'right'
        });
      }
    }
  });
}

//默认函数线
function createDefaultFormulaLine() {
    calculator.setExpression({
      id: "formulaLine0",
      latex: "a=2",
      color: "#FFFFFF",
      dragMode: 'NONE',
      hidden: true,
      sliderBounds: { min: "0.1", max: "5", step: "0.1" },
    });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "b=1.5",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: true,
    sliderBounds: { min: "-100", max: "100", step: "0.01" },
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "y=x^a",
    color: "#FF5A5A",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine3",
    latex: "y=a^x",
    color: "#6ECFFF",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine4",
    latex: "y=\\log_a\\left(x\\right)",
    color: "#9BF23B",
    hidden: true
  });

  calculator.setExpression({
    id: "formulaLine5",
    latex: "\\left(b,0\\right)",
    color: "#FFFFFF",
    hidden: true,
    label: '1.50',
    showLabel: false,
    labelOrientation: 'below'
  });

  calculator.setExpression({
    id: "formulaLine7",
    latex: "\\left(0,\\log_a\\left(b\\right)\\right)",
    color: "#9BF23B",
    hidden: true,
    label: '0.59',
    showLabel: false,
    labelOrientation: 'left'
  });

  calculator.setExpression({
    id: "formulaLine8",
    latex: "x=b\\left\\{0\\le y\\le\\log_a\\left(b\\right)\\right\\}",
    color: "#FFFFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine9",
    latex: "x=b\\left\\{\\log_a\\left(b\\right)\\le y\\le0\\right\\}",
    color: "#FFFFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine10",
    latex: "y=\\log_a\\left(b\\right)\\left\\{0<x\\le b\\right\\}",
    color: "#9BF23B",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine12",
    latex: "\\left(0,a^b\\right)",
    color: "#6ECFFF",
    hidden: true,
    label: '2.83',
    showLabel: false,
    labelOrientation: 'left'
  });

  calculator.setExpression({
    id: "formulaLine13",
    latex: "x=b\\left\\{0\\le y\\le a^b\\right\\}",
    color: "#FFFFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine14",
    latex: "y=a^b\\left\\{0\\le x\\le b\\right\\}",
    color: "#6ECFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine15",
    latex: "y=a^b\\left\\{b\\le x<0\\right\\}",
    color: "#6ECFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine17",
    latex: "\\left(0,b^a\\right)",
    color: "#FF5A5A",
    hidden: true,
    label: '2.25',
    showLabel: false,
    labelOrientation: 'left'
  });

  calculator.setExpression({
    id: "formulaLine18",
    latex: "x=b\\left\\{0\\le y\\le x^a\\right\\}",
    color: "#FFFFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine19",
    latex: "x=b\\left\\{x^a\\le y<0\\right\\}",
    color: "#FFFFFF",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine20",
    latex: "y=b^a\\left\\{0\\le x\\le b\\right\\}",
    color: "#FF5A5A",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine21",
    latex: "y=b^a\\left\\{b\\le x<0\\right\\}",
    color: "#FF5A5A",
    hidden: true,
    lineStyle: 'DASHED'
  });

  calculator.setExpression({
    id: "formulaLine6",
    latex: "\\left(b,\\log_a\\left(b\\right)\\right)",
    color: "#9BF23B",
    dragMode: 'NONE',
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine11",
    latex: "\\left(b,a^b\\right)",
    color: "#6ECFFF",
    dragMode: 'NONE',
    hidden: true,
  });

  calculator.setExpression({
    id: "formulaLine16",
    latex: "\\left(b,b^a\\right)",
    color: "#FF5A5A",
    dragMode: 'NONE',
    hidden: true
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

//重置
function reset() {
  buttonOneFlag = false;
  buttonTwoFlag = false;
  buttonThreeFlag = false;
  sliderNumOne = 2;
  numberB = 1.5;
  formulaOne_A.style.display = 'block';
  formulaOne_B.style.display = 'none';
  formulaTwo_A.style.display = 'block';
  formulaTwo_B.style.display = 'none';
  formulaThree_A.style.display = 'block';
  formulaThree_B.style.display = 'none';
  sliderOne.setValue(sliderNumOne);
  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
initSlider();
new window.SS();
