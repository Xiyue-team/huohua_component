var resetBtn            = document.querySelector(".resetBtn_div");
var titleText           = document.querySelector('.titleText');
var sliderGroup         = document.querySelector('.sliderGroup');
var container           = document.querySelector('.container');
var rightContolGroup    = document.querySelector('.rightContolGroup');
var leftContainer       = document.querySelector('.leftContainer');
var formulaBtn_one      = document.getElementById('formulaBtn_one');
var formulaBtn_two      = document.getElementById('formulaBtn_two');
var formulaBtn_three      = document.getElementById('formulaBtn_three');
var height = window.innerHeight * 0.98;

//按钮一是否点中
var buttonActive1 = false;
//按钮一是否点中
var buttonActive2 = false;
//按钮一是否点中
var buttonActive3 = false;
//是否是滑动滑条状态
var isSliderDrag = false;
var calculator = null;
//初始滑条值
var sliderNumOne = 0.4;
var sliderNumTwo = 0.4;
//滑条
var sliderOne;
var sliderTwo;
//初始化滑动条
function initSlider(){
    sliderOne = new slider({
      container:"#slider_one",
      start : 0,
      end:4,
      step:0.01,
      value:0.4,
      showValue:true,
      ondrag:(obj)=>{
          isSliderDrag = true;
          sliderNumOne = obj.values[0];
          var string = 'a=' + obj.values[0];
          calculator.setExpression({id:'formula2', latex: string});
          var value = obj.values[0];
          if(buttonActive2){
              value = obj.values[0] * 2;
          } else if(buttonActive3){
              value = obj.values[0] * 3;
          }
          var string = 'c=' + value;
          calculator.setExpression({id:'formula4', latex: string});
      },
      onchange: () =>{
          isSliderDrag = false;
      },
      fixValue:true,
    });

    sliderTwo = new slider({
      container:"#slider_two",
      start : -5,
      end:5,
      step:0.1,
      value:0.4,
      showValue:true,
      ondrag:(obj)=>{
          sliderNumTwo = obj.values[0];
          var string = 'b=' + obj.values[0];
          calculator.setExpression({id:'formula3', latex: string});
      },
      fixValue:true,
    });
}

function initDesmos(){
    var scale = window.innerWidth / 1200;
    var rightWidth = 220;
    var desmosElement = document.getElementById('calculator');
    calculator = Desmos.GraphingCalculator(desmosElement);

    container.style.height = height + 'px';
    container.style.width  = (window.innerWidth - 48) + 'px';
    container.style.left   = '24px';
    container.style.top    = 'calc(50% - '+ (height / 2) + 'px)';
    //适配小屏设备
    if(window.innerHeight < 610 || window.innerWidth <610){
        rightWidth = 220 * scale;
        var sliderOffsetX = -sliderGroup.clientWidth * (1- scale) / 2;
        var titleOffsetX  = - titleText.clientWidth * (1- scale) / 2 + (24 * scale);
        var titleOffsetY  = - titleText.clientHeight * (1- scale) / 2 + (24 * scale);
        titleText.style.transform       = 'scale('+ scale + ')';
        titleText.style.left            = titleOffsetX + 'px';
        titleText.style.top             = titleOffsetY + 'px';

        rightContolGroup.style.width    = parseInt(rightWidth + '') + 'px';
        leftContainer.style.width       = 'calc(100% - '+ rightWidth +'px)';

        resetBtn.style.width            = 58 * scale + 'px';
        resetBtn.style.height           = 50 * scale + 'px';

        sliderGroup.style.transform     = 'scale('+ scale + ')';
        sliderGroup.style.right         = parseInt(sliderOffsetX + '') + 'px';

        formulaBtn_one.children[0].style.width      = formulaBtn_one.clientWidth * scale + 'px';
        formulaBtn_two.children[0].style.width      = formulaBtn_two.clientWidth * scale + 'px';
        formulaBtn_three.children[0].style.width    = formulaBtn_three.clientWidth * scale + 'px';

        formulaBtn_one.style.height = formulaBtn_two.style.height = formulaBtn_three.style.height = formulaBtn_one.clientHeight * scale + 'px';
        formulaBtn_one.style.bottom     = 132 * scale + 'px';
        formulaBtn_two.style.bottom     = 78 * scale + 'px';
        formulaBtn_three.style.bottom   = 24 * scale + 'px';
      } else {
        leftContainer.style.width = 'calc(100% - 220px)';
    }
    if(window.innerHeight > (window.innerWidth - rightWidth)) {
        desmosElement.style.width   = '100%';
        desmosElement.style.height  = window.innerWidth - 48 - rightWidth +'px';
        desmosElement.style.right   = '0px';
        desmosElement.style.top     = 'calc(50% - '+ ((window.innerWidth - 48 - rightWidth) / 2) + 'px)';
    } else {
        desmosElement.style.width   = height + 'px';
        desmosElement.style.height  = height + 'px';
        desmosElement.style.right   = 'calc(50% - '+ (height / 2) + 'px)';
    }
    setCalcuState();
}
//创建函数线
function createFormulaLine() {
    //函数1
    calculator.setExpression({id: "formula1",latex: "y=\\frac{1}{\\sqrt{2\\pi}\\cdot a}\\cdot e^{-\\frac{\\left(x-b\\right)^2}{2a^2}}",color: "#FF5A5A",hidden:false});
    //滑条a
    calculator.setExpression({id: "formula2",latex: "a=1",sliderBounds: { min: "0.01", max: "5", step: "0.01" }});
		//滑条b
    calculator.setExpression({id: "formula3",latex: "b=0.4",sliderBounds: { min: "-5", max: "5", step: "0.1" }});
    //滑条c
    calculator.setExpression({id: "formula4",latex: "c=1",sliderBounds: { min: "0"}});
    //颜色区域
    calculator.setExpression({id: "formula5",latex: "0<y\\ <\\frac{1}{\\sqrt{2\\pi}\\cdot a}\\cdot e^{-\\frac{\\left(x-b\\right)^2}{2a^2}}\\left\\{b-c<x<b+c\\right\\}",color: "#0091FF",hidden:false});
    //最高线
		calculator.setExpression({id: "formula6",latex: "x=\\ b\\left\\{0<y<\\frac{1}{\\sqrt{2\\pi}\\cdot a}\\cdot e^0\\right\\}",color: "#ffd621",lineStyle: "DASHED",hidden: false});		 
		//函数点1'
		calculator.setExpression({id: "point1",color: "#fff",latex: "\\left(b-c,\\frac{1}{\\sqrt{2\\pi}\\cdot a}\\cdot e^{-\\frac{\\left(b-c-b\\right)^2}{2a^2}}\\right)",pointStyle: "POINT",dragMode: "AUTO",hidden: false,showLabel: false});
		//函数点2'
		calculator.setExpression({id: "point2",color: "#fff",latex: "\\left(b+c,\\frac{1}{\\sqrt{2\\pi}\\cdot a}\\cdot e^{-\\frac{\\left(b+c-b\\right)^2}{2a^2}}\\right)",pointStyle: "POINT",dragMode: "AUTO",hidden: false,showLabel: false});		 
		//函数点3'
    calculator.setExpression({id: "point3",color: "#fff",latex: "\\left(b,\\ \\frac{1}{3\\sqrt{2\\pi}\\cdot a}\\cdot e^0\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,label: "68.3%",labelSize: "small",showLabel: false});
    //函数点4'
    calculator.setExpression({id: "point4",color: "#fff",latex: "\\left(b,-0.05\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,label: "μ",labelSize: "small",showLabel: true});
}
//设置初始状态
function setCalcuState() {
    calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: false, settingsMenu: false, trace: false});
    calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y"});
}
//初始化函数点击事件
function initEvent(){
    formulaBtn_one.addEventListener("click",(event)=>{
        changeBtnImage(1, sliderNumOne);
    });
    formulaBtn_two.addEventListener("click",(event)=>{
        changeBtnImage(2, sliderNumOne * 2);
    });
    formulaBtn_three.addEventListener("click",(event)=>{
        changeBtnImage(3, sliderNumOne * 3);
    });
    resetBtn.addEventListener('click', ()=>{
        sliderNumOne = 0.4;
        sliderNumTwo = 0.4;
        isSliderDrag = false;
        sliderOne.setValue(sliderNumOne);
        sliderTwo.setValue(sliderNumTwo);
        resetBtnStyle();
        calculator.setBlank();
        setCalcuState();
        createFormulaLine();
        observePoint();
    });
    observePoint();
}

function resetBtnStyle(){
    buttonActive1 = buttonActive2 = buttonActive3 = false;
    formulaBtn_one.classList.remove("active");
    formulaBtn_one.children[0].setAttribute('src', 'image/button1.png');
    formulaBtn_two.classList.remove("active");
    formulaBtn_two.children[0].setAttribute('src', 'image/button2.png');
    formulaBtn_three.classList.remove("active");
    formulaBtn_three.children[0].setAttribute('src', 'image/button3.png');
}

function changeBtnImage(index, value){
    resetBtnStyle();
    var string = 'c=' + value;
    calculator.setExpression({id:'formula4', latex: string});
    if(index === 1){
        buttonActive1 = true;
        calculator.setExpression({id:'point3', label: "68.3%", showLabel: true});
        formulaBtn_one.classList.add("active");
        formulaBtn_one.children[0].setAttribute('src', 'image/button1_active.png');
    } else if(index === 2){
        buttonActive2 = true;
        calculator.setExpression({id:'point3', label: "95.4%", showLabel: true});
        formulaBtn_two.classList.add("active");
        formulaBtn_two.children[0].setAttribute('src', 'image/button2_active.png');
    } else if(index === 3){
        buttonActive3 = true;
        calculator.setExpression({id:'point3', label: "99.7%", showLabel: true});
        formulaBtn_three.classList.add("active");
        formulaBtn_three.children[0].setAttribute('src', 'image/button3_active.png');
    }
}
//监听滑动点
function observePoint(){
    var c = calculator.HelperExpression({latex:'c'});
    c.observe("numericValue", function() {
        //此时是滑动滑条改变值，不做判断
        if(isSliderDrag){
            return;
        }
        if(c.numericValue === sliderNumOne){
            //符合按钮一的情况
            calculator.setExpression({id:'point3', label: "68.3%",showLabel: true});
            changeBtnImage(1, sliderNumOne);
        } else if(c.numericValue === sliderNumOne * 2){
            //符合按钮二的情况
            calculator.setExpression({id:'point3', label: "95.4%", showLabel: true});
            changeBtnImage(2, sliderNumOne * 2);
        } else if(c.numericValue === sliderNumOne * 3){
            //符合按钮三的情况
            calculator.setExpression({id:'point3', label: "99.7%", showLabel: true});
            changeBtnImage(3, sliderNumOne * 3);
        } else {
            resetBtnStyle();
            calculator.setExpression({id:'point3', showLabel: false});
        }
    });
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
    tipImg.src = 'image/orientation.png' ;

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
//显示横屏提示
function showOrientationTip() {
    if (document.getElementById('orientationTip')) {
        document.getElementById('orientationTip').style.display = 'block';
        document.getElementById('maskContent').style.display = 'block';
    } else {
        initOrientationTip();
    }
}
//隐藏横屏提示
function hideOrientationTip() {
    if (document.getElementById('orientationTip')) {
        document.getElementById('orientationTip').style.display = 'none';
        document.getElementById('maskContent').style.display = 'none';
    }
}
//手机端适配方法
function forceMobildLandscape() {
    if ( !navigator.userAgent.match(/.*Mobile.*/) || isHuohuaPlayer()) {
        return;
    }
    const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(evt, () => {
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
//修改横屏的方法
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
initSlider();
initDesmos();
createFormulaLine();
initEvent();