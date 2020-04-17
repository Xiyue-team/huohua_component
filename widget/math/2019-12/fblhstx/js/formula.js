var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.innerWidth;
var height = window.innerHeight;
var sliderNum = 2;
var buttonFlag1 = false;
var buttonFlag2 = false;
var result_Button = document.getElementsByClassName('result_Class');
var widget_title = document.getElementsByClassName('titleText')[0];
var fenzi = document.getElementById('formulaK');

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
  result_Button[0].innerHTML = window.lang.buttonText[0];
  result_Button[1].innerHTML = window.lang.buttonText[1];
  document.getElementsByClassName('redTips')[0].innerHTML = window.lang.redTip;
}

//初始化滑动条
function initSlider() {
  sliderOne = new slider({
    container: "#slider_one",
    start :-10,
    end: 10,
    step: 1,
    value: 2,
    showValue: true,
    ondrag:(obj)=>{
      sliderNum = obj.values[0];
      fenzi.innerText = sliderNum;
      if (sliderNum === 0) {
        calculator.setExpression({
          id: "formulaLine0",
          latex: "y=\\frac{k}{x}",
          color: "#ff5a5a",
          hidden: false
        });

        calculator.setExpression({
          id: "formulaLine1",
          latex: "k=0",
          color: "#FFFFFF",
          dragMode: 'NONE',
          hidden: true,
          sliderBounds: { min: "-10", max: "10", step: "1" },
        });
        document.getElementsByClassName('redTips')[0].style.display = 'block';
        calculator.removeExpression({id: 'formulaLine5'});
      } else {
        document.getElementsByClassName('redTips')[0].style.display = 'none';

        calculator.setExpression({
          id: "formulaLine0",
          latex: "y=\\frac{k}{x}",
          color: "#6ECFFF",
          hidden: false
        });

        calculator.setExpression({
          id: "formulaLine1",
          latex: "k=" + sliderNum,
          color: "#FFFFFF",
          dragMode: 'NONE',
          hidden: true,
          sliderBounds: { min: "-10", max: "10", step: "1" },
        });
        const state = calculator.getState();
        for(let i = 0; i < state.expressions.list.length; i++) {
          if(state.expressions.list[4].id === 'formulaLine5'){
            return;
          }
        }
        calculator.setExpression({
          id: "formulaLine5",
          latex: "\\left(a,\\frac{k}{a}\\right)",
          color: "#ff5a5a",
          lineStyle: "SOLID",
          type: "expression",
          dragMode: "AUTO",
          fillOpacity: 0,
          hidden: false,
          label: "P(x,y)",
          labelOrientation: "default",
          labelSize: "medium",
          pointStyle: "POINT",
          secret: false,
          showLabel: true,
          verticalLabel: false
        });
      }


    },
    fixValue:true,
  });

}

function triangle() {
  const state = calculator.getState();
    buttonFlag2 = false;
    if (buttonFlag1) {
      buttonFlag1 = false;
      document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#EBEBEB';
      document.getElementsByClassName('result_Class')[0].style.color = '#000000';
      document.getElementsByClassName('tipsContainer')[0].style.display = 'none';
    } else {
      buttonFlag1 = true;
      document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#0091FF';
      document.getElementsByClassName('result_Class')[0].style.color = '#FFFFFF';
      document.getElementsByClassName('result_Class')[1].style.backgroundColor = '#EBEBEB';
      document.getElementsByClassName('result_Class')[1].style.color = '#000000';
      document.getElementsByClassName('tipsContainer')[0].style.display = 'flex';
      document.getElementById('tips').innerText = window.lang.tipsText[0];
      document.getElementById('formulaTips').src = './images/triangle.png';
      document.getElementsByClassName('tipsImageContainer')[0].classList.remove('smallTipsContainer');
    }
    state.expressions.list[3].hidden = !buttonFlag1;
    state.expressions.list[4].hidden = !buttonFlag2;
    calculator.setState(state);
}

function rectangle() {
  buttonFlag1 = false;
  const state = calculator.getState();
  if (buttonFlag2) {
    buttonFlag2 = false;
    document.getElementsByClassName('result_Class')[1].style.backgroundColor = '#EBEBEB';
    document.getElementsByClassName('result_Class')[1].style.color = '#000000';
    document.getElementsByClassName('tipsContainer')[0].style.display = 'none';
  } else {
    buttonFlag2 = true;
    document.getElementsByClassName('result_Class')[1].style.backgroundColor = '#0091FF';
    document.getElementsByClassName('result_Class')[1].style.color = '#FFFFFF';
    document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#EBEBEB';
    document.getElementsByClassName('result_Class')[0].style.color = '#000000';
    document.getElementsByClassName('tipsContainer')[0].style.display = 'flex';
    document.getElementById('tips').innerText = window.lang.tipsText[1];
    document.getElementById('formulaTips').src = './images/rectangle.png';
    document.getElementsByClassName('tipsImageContainer')[0].classList.add('smallTipsContainer');
  }
  state.expressions.list[3].hidden = !buttonFlag1;
  state.expressions.list[4].hidden = !buttonFlag2;
  calculator.setState(state);
}

//默认函数线
function createDefaultFormulaLine() {
  calculator.setExpression({
    id: "formulaLine0",
    latex: "y=\\frac{k}{x}",
    color: "#6ECFFF",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "k=2",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: false,
    sliderBounds: { min: "-10", max: "10", step: "1" },
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "a=1",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: false,
  });

  calculator.setExpression({
    id: "formulaLine3",
    latex: "\\operatorname{polygon}\\left(\\left(a,\\ \\frac{k}{a}\\right),\\left(a,\\ 0\\right),\\left(0,0\\right)\\right)",
    color: "#FFB07E",
    lineStyle: "DASHED",
    type: "expression",
    dragMode: "AUTO",
    fillOpacity: 0.4,
    hidden: true,
    label: "",
    labelOrientation: "default",
    labelSize: "medium",
    pointStyle: "POINT",
    secret: false,
    showLabel: false,
    verticalLabel: false
  });

  calculator.setExpression({
    id: "formulaLine4",
    latex: "\\operatorname{polygon}\\left(\\left(0,0\\right),\\left(a,0\\right),\\left(a,\\frac{k}{a}\\right),\\left(0,\\frac{k}{a}\\right)\\right)",
    color: "#FFB07E",
    lineStyle: "DASHED",
    type: "expression",
    dragMode: "AUTO",
    fillOpacity: 0.4,
    hidden: true,
    label: "",
    labelOrientation: "default",
    labelSize: "medium",
    pointStyle: "POINT",
    secret: false,
    showLabel: false,
    verticalLabel: false
  });


  calculator.setExpression({
    id: "formulaLine5",
    latex: "\\left(a,\\frac{k}{a}\\right)",
    color: "#ff5a5a",
    lineStyle: "SOLID",
    type: "expression",
    dragMode: "AUTO",
    fillOpacity: 0,
    hidden: false,
    label: "P(x,y)",
    labelOrientation: "default",
    labelSize: "medium",
    pointStyle: "POINT",
    secret: false,
    showLabel: true,
    verticalLabel: false
  });

}


//分数显示及约分 sliderNumOne 分子  sliderNumTwo 分母
function reduce(sliderNumOne, sliderNumTwo) {
  if (sliderNumTwo === 0) {
      return ;
  }
  if (sliderNumOne % sliderNumTwo === 0) {
    katex.render("y=x^{" + (sliderNumOne / sliderNumTwo) + "}", el, {
      throwOnError: false
    });
  } else {
    if (sliderNumOne <0 && sliderNumTwo < 0) {

      if (sliderNumTwo % sliderNumOne === 0) {
        katex.render("y=x^{\\frac{" + 1 +"}{" + sliderNumTwo / sliderNumOne + "}}", el, {
          throwOnError: false
        });

      } else {

        katex.render("y=x^{\\frac{" + Math.abs(sliderNumOne) +"}{" + Math.abs(sliderNumTwo) + "}}", el, {
          throwOnError: false
        });
      }

    } else {

      if (sliderNumTwo % sliderNumOne === 0) {
        katex.render("y=x^{\\frac{" + 1 +"}{" + sliderNumTwo / sliderNumOne + "}}", el, {
          throwOnError: false
        });
      } else {
        katex.render("y=x^{\\frac{" + sliderNumOne +"}{" + sliderNumTwo + "}}", el, {
          throwOnError: false
        });
      }
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

//重置
function reset() {
  sliderNumOne = 2;
  fenzi.innerText = '2';
  sliderOne.setValue(sliderNumOne);
  buttonFlag1 = false;
  buttonFlag2 = false;
  document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#EBEBEB';
  document.getElementsByClassName('result_Class')[0].style.color = '#000000';
  document.getElementsByClassName('result_Class')[1].style.backgroundColor = '#EBEBEB';
  document.getElementsByClassName('result_Class')[1].style.color = '#000000';
  document.getElementsByClassName('tipsContainer')[0].style.display = 'none';

  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
initSlider();


