var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
var widget_title = document.getElementsByClassName('titleText')[0];
var left_or_right_text = document.querySelector('.left_or_right_text_class');
var top_or_bottom_text = document.querySelector('.top_or_bottom_text_class');
var dirction_left = document.getElementsByClassName('dirction_class')[0];
var dirction_top = document.getElementsByClassName('dirction_class')[1];
var move_left = document.getElementsByClassName('move_class')[0];
var move_top = document.getElementsByClassName('move_class')[1];
var unit_left = document.getElementsByClassName('unit_class')[0];
var unit_top = document.getElementsByClassName('unit_class')[1];
var blueTips = document.querySelector('.blueTips');
var unTwiceFormulaTips = document.querySelector('.un_twiceFormulaTips');
var leftText = document.querySelector('.left_or_right_offset_class');
var topText = document.querySelector('.top_or_bottom_offset_class');

var dragControl = document.querySelector('.dragControl');
var rightControl = document.querySelector('.rightControl');
var sliderA = -2,sliderB = 1, sliderC= 1, sliderD = 1, sliderE = -4, sliderF = 2;
var isPoint = true;
var isShowLine = false, isMove = false;

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
  unTwiceFormulaTips.innerText = window.lang.blueTipsTitle[2];

  //按钮文字
  rightControl.children[0].innerText = window.lang.buttonText[0];
  rightControl.children[1].innerText = window.lang.buttonText[1];
}
//创建默认函数线
function createDefaultFormulaLine() {
  loadFormulaJson('./formula/formula.json');
  positionLabels();
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
      setExpression();
      createPoint();
    }
  }
}
//确定提示文字位置
function positionLabels () {
  var xpos = calculator.mathToPixels({x:-2}).x;
  var ypos = calculator.mathToPixels({y:0}).y;

  var xlabelRect = blueTips.getBoundingClientRect();
  var ylabelRect = blueTips.getBoundingClientRect();

  blueTips.style.left = (xpos - xlabelRect.width/2) + 'px';
  blueTips.style.top = (ypos - ylabelRect.height/2) + 'px';
}
//创建公式
function setExpression() {
  calculator.setExpression({ id: "slider1", latex: "a=-2"});
  calculator.setExpression({ id: "slider2", latex: "b=1" });
  calculator.setExpression({ id: "slider3", latex: "c=0"});
  calculator.setExpression({ id: "slider4", latex: "d=0"});
  calculator.setExpression({ id: "slider5", latex: "E=-4"});
  calculator.setExpression({ id: "slider6", latex: "F=2"});
  //圆点1
  calculator.setExpression({ id: "point1", label:katex.renderToString('A(-2,1)', {throwOnError: false}) });
  //圆点2
  calculator.setExpression({ id: "point2", label:katex.renderToString('B(-4,2)', {throwOnError: false}) });
  //圆点3
  calculator.setExpression({ id: "point3", label:katex.renderToString('A′(-2,1)', {throwOnError: false}) });
  //圆点4
  calculator.setExpression({ id: "point4", label:katex.renderToString('B′(-4,2)', {throwOnError: false}) });

  calculator.observe('graphpaperBounds', positionLabels);
}
//创建点的公式
function createPoint() {
  calculator.setExpression({id: "lineAB", hidden: true});
  calculator.setExpression({id: "lineBb", hidden: true});
  calculator.setExpression({id: "lineab", hidden: true});
  calculator.setExpression({id: "point2", hidden: true, showLabel:false});
  calculator.setExpression({id: "point3", showLabel:false});
  calculator.setExpression({id: "point4", hidden: true, showLabel:false});
}
//创建线的公式
function createLine() {
  calculator.setExpression({id: "lineAB", hidden: false});
  calculator.setExpression({id: "lineBb", hidden: false});
  calculator.setExpression({id: "lineab", hidden: false});
  calculator.setExpression({id: "point2", hidden: false, showLabel:true});
  calculator.setExpression({id: "point3", showLabel:false});
  calculator.setExpression({id: "point4", hidden: false, showLabel:false});
}
//检测点坐标变化
function checkValueAB() {
  var a = calculator.HelperExpression({latex: "a"});
  a.observe("numericValue", function() {
    sliderA = a.numericValue;
    //可拖拽点A
    calculator.setExpression({ id: "point1", label: katex.renderToString('A('+ sliderA + ',' + sliderB + ')', {throwOnError: false})});
    //平移点A′
    const x = Math.round((sliderA + sliderC) * 10) / 10;
    const y = Math.round((sliderB + sliderD) * 10) / 10;
    calculator.setExpression({ id: "point3",
      label:katex.renderToString('A′('+ x + ',' + y + ')', {throwOnError: false})
    });
    if(isMove) return;
    isMove = (sliderA === -2)? false : (true, blueTips.style.display = 'none');
  });

  var b = calculator.HelperExpression({latex: "b"});
  b.observe("numericValue", function() {
    sliderB = b.numericValue;
    //可拖拽点A
    calculator.setExpression({ id: "point1", label: katex.renderToString('A('+ sliderA + ',' + sliderB + ')', {throwOnError: false})});
    //平移点A′
    const x = Math.round((sliderA + sliderC) * 10) / 10;
    const y = Math.round((sliderB + sliderD) * 10) / 10;
    calculator.setExpression({ id: "point3", label:katex.renderToString('A′('+ x + ',' + y + ')', {throwOnError: false}) });

    if(isMove) return;
    isMove = (sliderB === 1)? false : (true, blueTips.style.display = 'none');
  });

  var c = calculator.HelperExpression({latex: "c"});
  c.observe("numericValue", function() {
    sliderC = c.numericValue;
    setLineLatex(sliderD, sliderC);

    //平移点A′
    const x_A = Math.round((sliderA + sliderC) * 10) / 10;
    const y_A = Math.round((sliderB + sliderD) * 10) / 10;
    calculator.setExpression({
      id: "point3",
      label:katex.renderToString('A′('+ x_A + ',' + y_A + ')', {throwOnError: false}),
      showLabel: (sliderC !== 0 || sliderD !== 0)
    });
    if(isPoint){
      return;
    }
    //平移点B′
    const x_B = Math.round((sliderE + sliderC) * 10) / 10;
    const y_B = Math.round((sliderF + sliderD) * 10) / 10;
    calculator.setExpression({
      id: "point4",
      label:katex.renderToString('B′('+ x_B + ',' + y_B + ')', {throwOnError: false}),
      showLabel: (sliderC !== 0 || sliderD !== 0)
    });
  });

  var d = calculator.HelperExpression({latex: "d"});
  d.observe("numericValue", function() {
    sliderD = d.numericValue;
    setLineLatex(sliderD, sliderC);

    //平移点A′
    const x_A = Math.round((sliderA + sliderC) * 10) / 10;
    const y_A = Math.round((sliderB + sliderD) * 10) / 10;
    calculator.setExpression({
      id: "point3",
      label:katex.renderToString('A′('+ x_A + ',' + y_A + ')', {throwOnError: false}),
      showLabel: (sliderC !== 0 || sliderD !== 0)
    });
    if(isPoint){
      return;
    }
    //平移点B′
    const x_B = Math.round((sliderE + sliderC) * 10) / 10;
    const y_B = Math.round((sliderF + sliderD) * 10) / 10;
    calculator.setExpression({
      id: "point4",
      label:katex.renderToString('B′('+ x_B + ',' + y_B + ')', {throwOnError: false}),
      showLabel: (sliderC !== 0 || sliderD !== 0)
    });
  });

  var e = calculator.HelperExpression({latex: "E"});
  e.observe("numericValue", function() {
    sliderE = e.numericValue;
    //可拖拽点B
    calculator.setExpression({ id: "point2", label: katex.renderToString('B('+ sliderE + ',' + sliderF + ')', {throwOnError: false})});
    //平移点B′
    const x = Math.round((sliderE + sliderC) * 10) / 10;
    const y = Math.round((sliderF + sliderD) * 10) / 10;
    calculator.setExpression({ id: "point4", label:katex.renderToString('B′('+ x + ',' + y + ')', {throwOnError: false}) });
    if(isMove) return;
    isMove = (sliderE === -4)? false : (true, blueTips.style.display = 'none');
  });

  var f = calculator.HelperExpression({latex: "F"});
  f.observe("numericValue", function() {
    sliderF = f.numericValue;
    //可拖拽点B
    calculator.setExpression({ id: "point2", label: katex.renderToString('B('+ sliderE + ',' + sliderF + ')', {throwOnError: false})});
    //平移点B′
    const x = Math.round((sliderE + sliderC) * 10) / 10;
    const y = Math.round((sliderF + sliderD) * 10) / 10;
    calculator.setExpression({ id: "point4", label:katex.renderToString('B′('+ x + ',' + y + ')', {throwOnError: false}) });

    if(isMove) return;
    isMove = (sliderF === 2)? false : (true, blueTips.style.display = 'none');
  });
}
//动态修改线段公式
function setLineLatex(valueD, valueC){
  var latexStringAa;
  var latexStringBb;
  if(valueD > 0){
    latexStringAa = (valueC === 0)? "x=a\\left\\{b<y<b+d\\right\\}": "y=\\frac{d}{c}\\left(x-a\\right)+b\\left\\{b<y<b+d\\right\\}";
    calculator.setExpression({ id: "lineAa", latex: latexStringAa });

    latexStringBb = (valueC === 0)? "x=E\\left\\{F<y<F+d\\right\\}": "y=\\frac{d}{c}\\left(x-E\\right)+F\\left\\{F<y<F+d\\right\\}";
    calculator.setExpression({ id: "lineBb", latex: latexStringBb });

  } else if(valueD < 0){
    latexStringAa = (valueC === 0)? "x=a\\left\\{b+d<y<b\\right\\}": "y=\\frac{d}{c}\\left(x-a\\right)+b\\left\\{b+d<y<b\\right\\}";
    calculator.setExpression({ id: "lineAa", latex: latexStringAa });

    latexStringBb = (valueC === 0)? "x=E\\left\\{F+d<y<F\\right\\}": "y=\\frac{d}{c}\\left(x-E\\right)+F\\left\\{F+d<y<F\\right\\}";
    calculator.setExpression({ id: "lineBb", latex: latexStringBb });

  } else{
    latexStringAa = (valueC > 0)? "y=b\\left\\{a<x<a+c\\right\\}" : "y=b\\left\\{a+c<x<a\\right\\}";
    calculator.setExpression({ id: "lineAa", latex: latexStringAa });

    latexStringBb = (valueC > 0)? "y=F\\left\\{E<x<E+c\\right\\}" : "y=F\\left\\{E+c<x<E\\right\\}";
    calculator.setExpression({ id: "lineBb", latex: latexStringBb });
  }
}
//封装事件
function stopEvent(element, callBack){
  element.addEventListener("mousedown", (event) => {
    callBack();
    event.preventDefault();
    event.stopPropagation();
  });
  element.addEventListener("touchstart", (event) => {
    callBack();
    event.preventDefault();
    event.stopPropagation();
  });
}
//初始化点击事件
function initEvent(){
  //点按钮
  stopEvent(rightControl.children[0], ()=>{
    if(isPoint){
      return;
    }
    isPoint = true;
    rightControl.children[1].classList.remove('active');
    rightControl.children[0].classList.add('active');
    setExpression();
    createPoint();
    if(!isShowLine){
      blueTips.innerText = window.lang.blueTipsTitle[0];
    }
  });
  //直线按钮
  stopEvent(rightControl.children[1], ()=>{
    if(!isPoint){
      return;
    }
    isPoint = false;
    rightControl.children[0].classList.remove('active');
    rightControl.children[1].classList.add('active');
    setExpression();
    createLine();
    if(!isShowLine){
      blueTips.innerText = window.lang.blueTipsTitle[1];
    }
  });
  //向左移动
  stopEvent(dragControl.children[0], ()=>{
    sliderC -= 1;
    calculator.setExpression({ id: "slider3", latex: 'c=' + sliderC});
    leftText.innerText = Math.abs(sliderC);
    left_or_right_text.innerText = (sliderC< 0)? window.lang.left_or_right_titles[0] : window.lang.left_or_right_titles[1];
    unTwiceFormulaTips.style.display = 'none';
  });
  //向右移动
  stopEvent(dragControl.children[2], ()=>{
    sliderC += 1;
    calculator.setExpression({ id: "slider3", latex: 'c=' + sliderC});
    leftText.innerText = Math.abs(sliderC);
    left_or_right_text.innerText = (sliderC< 0)? window.lang.left_or_right_titles[0] : window.lang.left_or_right_titles[1];
    unTwiceFormulaTips.style.display = 'none';
  });
  //向上移动
  stopEvent(dragControl.children[1], ()=>{
    sliderD += 1;
    const latexString = 'd=' + sliderD;
    calculator.setExpression({ id: "slider4", latex: latexString});
    topText.innerText = Math.abs(sliderD);
    top_or_bottom_text.innerText = (sliderD > 0)? window.lang.top_or_bottom_titles[0] : window.lang.top_or_bottom_titles[1];
    unTwiceFormulaTips.style.display = 'none';
  });
  //向下移动
  stopEvent(dragControl.children[3], ()=>{
    sliderD -= 1;
    const latexString = 'd=' + sliderD;
    calculator.setExpression({ id: "slider4", latex: latexString});
    topText.innerText = Math.abs(sliderD);
    top_or_bottom_text.innerText = (sliderD >= 0)? window.lang.top_or_bottom_titles[0] : window.lang.top_or_bottom_titles[1];
    unTwiceFormulaTips.style.display = 'none';
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
checkValueAB();
initEvent();

