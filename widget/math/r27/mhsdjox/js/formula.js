var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var width = window.innerWidth;
var height = window.innerHeight;
var sliderNumOne = 2;
var sliderNumTwo = 1;
var buttonFlag = false;
var elem = document.getElementsByClassName('formula_Class')[0];
var el = document.getElementsByClassName('formulaText_Class')[0];
var tipFormula = document.getElementsByClassName('tipFormula')[0];
var result_Button = document.getElementsByClassName('result_Class')[0];
var widget_title = document.getElementsByClassName('titleText')[0];
var tipTextTitle = document.getElementsByClassName('tipTextContent')[0];
var table_row1_column2 = document.getElementsByClassName("table_text_column2")[0];
var table_row1_column3 = document.getElementsByClassName("table_text_column3")[0];
var table_row1_column4 = document.getElementsByClassName("table_text_column4")[0];
var table_row2_column2 = document.getElementsByClassName("table_text_column2")[1];
var table_row2_column3 = document.getElementsByClassName("table_text_column3")[1];
var table_row2_column4 = document.getElementsByClassName("table_text_column4")[1];
var table_row3_column1 = document.getElementsByClassName("table_text_column1")[2];
var table_row3_column2 = document.getElementsByClassName("table_text_column2")[2];
var table_row3_column3 = document.getElementsByClassName("table_text_column3")[2];
var table_row3_column4 = document.getElementsByClassName("table_text_column4")[2];

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


  katex.render("y=x^{\\frac{m}{n}}", elem, {
    throwOnError: false
  });

  katex.render("y=x^{2}", el, {
    throwOnError: false
  });

  katex.render("{\\frac{m}{n}}", tipFormula, {
    throwOnError: false
  });

  document.title = window.lang.title;
  widget_title.innerHTML = window.lang.title;
  result_Button.innerHTML = window.lang.buttonText;
  tipTextTitle.innerHTML = window.lang.tipText;
  table_row1_column2.innerHTML = window.lang.odd_number;
  table_row1_column3.innerHTML = window.lang.odd_number;
  table_row1_column4.innerHTML = window.lang.even_number;
  table_row2_column2.innerHTML = window.lang.odd_number;
  table_row2_column3.innerHTML = window.lang.even_number;
  table_row2_column4.innerHTML = window.lang.odd_number;
  table_row3_column1.innerHTML = window.lang.Parity;
  table_row3_column2.innerHTML = window.lang.Odd_function;
  table_row3_column3.innerHTML = window.lang.Non_singular_non_even_function;
  table_row3_column4.innerHTML = window.lang.Even_function;
}

//初始化滑动条
function initSlider() {
  sliderOne = new slider({
    container: "#slider_one",
    start :-5,
    end: 5,
    step: 1,
    value: 2,
    showValue: true,
    ondrag:(obj)=>{
      sliderNumOne = obj.values[0];
      calculator.setExpression({
        id: "formulaLine0",
        latex: "y=x^{\\frac{m}{n}}",
        color: "#6ECFFF",
        hidden: false
      });

      calculator.setExpression({
        id: "formulaLine1",
        latex: "m=" + sliderNumOne,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: { min: "-5", max: "5", step: "1" },
      });

      calculator.setExpression({
        id: "formulaLine2",
        latex: "n=" + sliderNumTwo,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: { min: "-5", max: "5", step: "1" },
      });

      if (sliderNumTwo === 0) {
        calculator.removeExpression({ id: "formulaLine0" });
        calculator.removeExpression({ id: "formulaLine1" });
        calculator.removeExpression({ id: "formulaLine2" });
        document.getElementsByClassName('formulaText_Class')[0].style.display = 'none';
      } else {
        document.getElementsByClassName('formulaText_Class')[0].style.display = 'block';
        reduce(sliderNumOne, sliderNumTwo);
      }
    },
    fixValue:true,
  });

  sliderTwo = new slider({
    container: "#slider_two",
    start :-5,
    end: 5,
    step: 1,
    value: 1,
    showValue: true,
    ondrag:(obj)=>{
      sliderNumTwo = obj.values[0];
      calculator.setExpression({
        id: "formulaLine0",
        latex: "y=x^{\\frac{m}{n}}",
        color: "#6ECFFF",
        hidden: false
      });

      calculator.setExpression({
        id: "formulaLine1",
        latex: "m=" + sliderNumOne,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: { min: "-5", max: "5", step: "1" },
      });

      calculator.setExpression({
        id: "formulaLine2",
        latex: "n=" + sliderNumTwo,
        color: "#FFFFFF",
        dragMode: 'NONE',
        hidden: true,
        sliderBounds: { min: "-5", max: "5", step: "1" },
      });
      if (sliderNumTwo === 0) {
        calculator.removeExpression({ id: "formulaLine0" });
        calculator.removeExpression({ id: "formulaLine1" });
        calculator.removeExpression({ id: "formulaLine2" });
        document.getElementsByClassName('formulaText_Class')[0].style.display = 'none';
      } else {
        document.getElementsByClassName('formulaText_Class')[0].style.display = 'block';
        reduce(sliderNumOne, sliderNumTwo);
      }
    },
    fixValue:true,
  });
}

function resultEvent() {
    if (buttonFlag) {
      buttonFlag = false;
      document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#EBEBEB';
      document.getElementsByClassName('result_Class')[0].style.color = '#000000';
      document.getElementsByClassName('table_Class')[0].style.display = 'none';
    } else {
      buttonFlag = true;
      document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#0091FF';
      document.getElementsByClassName('result_Class')[0].style.color = '#FFFFFF';
      document.getElementsByClassName('table_Class')[0].style.display = 'block';
    }
}

//默认函数线
function createDefaultFormulaLine() {
  calculator.setExpression({
    id: "formulaLine0",
    latex: "y=x^{\\frac{m}{n}}",
    color: "#6ECFFF",
    hidden: false
  });

  calculator.setExpression({
    id: "formulaLine1",
    latex: "m=2",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: true,
    sliderBounds: { min: "-5", max: "5", step: "1" },
  });

  calculator.setExpression({
    id: "formulaLine2",
    latex: "n=1",
    color: "#FFFFFF",
    dragMode: 'NONE',
    hidden: true,
    sliderBounds: { min: "-5", max: "5", step: "1" },
  });
}

//图片适配手机
function adapterMobile() {
    if (height <= 320) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
        document.getElementsByClassName('right_buttons')[0].style.transform = 'scale(0.4)';
        document.getElementsByClassName('right_buttons')[0].style.top = '-50%';
        document.getElementsByClassName('right_buttons')[0].style.right = '-120px';
        document.getElementsByClassName('formula_Class')[0].style.fontSize = '36px';
        document.getElementsByClassName('formulaText_Class')[0].style.fontSize = '20px';
        document.getElementsByClassName('tipText')[0].style.marginLeft = '110px';
    }

    if ((height <= 500 && height > 320)) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
        document.getElementsByClassName('right_buttons')[0].style.transform = 'scale(0.4)';
        document.getElementsByClassName('right_buttons')[0].style.top = '-25%';
        document.getElementsByClassName('right_buttons')[0].style.right = '-120px';
        document.getElementsByClassName('formula_Class')[0].style.fontSize = '36px';
        document.getElementsByClassName('formulaText_Class')[0].style.fontSize = '20px';
        document.getElementsByClassName('tipText')[0].style.marginLeft = '110px';
    }

    if ((height <= 768 && height > 500)) {
        document.getElementsByClassName('titleText')[0].style.fontSize = '18px';
        document.getElementsByClassName('right_buttons')[0].style.transform = 'scale(0.6)';
        document.getElementsByClassName('right_buttons')[0].style.top = '0';
        document.getElementsByClassName('right_buttons')[0].style.right = '-70px';
        document.getElementsByClassName('formula_Class')[0].style.fontSize = '36px';
        document.getElementsByClassName('formulaText_Class')[0].style.fontSize = '20px';
        document.getElementsByClassName('tipText')[0].style.marginLeft = '110px';
    }
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
  sliderNumTwo = 1;
  sliderOne.setValue(sliderNumOne);
  sliderTwo.setValue(sliderNumTwo);
  buttonFlag = false;
  document.getElementsByClassName('result_Class')[0].style.backgroundColor = '#EBEBEB';
  document.getElementsByClassName('result_Class')[0].style.color = '#000000';
  document.getElementsByClassName('table_Class')[0].style.display = 'none';
  calculator.setBlank();
  setCalcuState();
  createDefaultFormulaLine();
}

initTip();
setCalcuState();
createDefaultFormulaLine();
adapterMobile();
initSlider();


