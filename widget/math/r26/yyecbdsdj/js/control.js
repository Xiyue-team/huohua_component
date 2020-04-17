var resetBtn            = document.querySelector(".resetBtn_div");
var titleText           = document.querySelector('.titleText');
var container           = document.querySelector('.container');
var rightContolGroup    = document.querySelector('.rightContolGroup');
var leftContainer       = document.querySelector('.leftContainer');
const buttonArray        = document.querySelectorAll('.button-primary');
const imageArray         = document.querySelectorAll('.formulaImage');
var desmosElement = document.getElementById('calculator');

var height = window.innerHeight * 0.98;
    
var  calculator = Desmos.GraphingCalculator(desmosElement);
var sliderNumOne = 1;
var sliderNumTwo = -4;
var sliderNumThree = 2;
var symbolSign = '>';
var sliderOne;
var sliderTwo;
var sliderThree;

var isOrigin    = false;
var isMore     = false;
var isLess     = false;

function domReady(callback){
    if ( !window.innerHeight || document.innerHeight === 0) {
        requestAnimationFrame(() => {
            domReady(callback);
        });
        return;
    }

    setTimeout(() => {
        callback();
    }, 100);
};

//初始化滑动条
function initSlider(){
  //a点滑条
  sliderOne = new slider({
    container:"#slider_one",
    start : -10,
    end:10,
    step:0.1,
    value:1,
    showValue:true,
    ondrag:(obj)=>{
        sliderNumOne = obj.values[0];
        clearExpression();
        var string = 'a=' + obj.values[0];
        calculator.setExpression({id:'formula2', latex: string});
        changeFormulaImage();
        changePointVlaue();
        setFormula();
    },
    fixValue:true,
  });
  //b点滑条
  sliderTwo = new slider({
    container:"#slider_two",
    start : -10,
    end:10,
    step:0.1,
    value:-4,
    showValue:true,
    ondrag:(obj)=>{
        sliderNumTwo = obj.values[0];
        var string = 'b=' + obj.values[0];
        calculator.setExpression({id:'formula3', latex: string});
        changeFormulaImage();
        changePointVlaue();
        setFormula();

    },
    fixValue:true,
  });
  //C点滑条
  sliderThree = new slider({
    container:"#slider_three",
    start : -10,
    end:10,
    step:0.1,
    value:2,
    showValue:true,
    ondrag:(obj)=>{
        sliderNumThree = obj.values[0];
        var string = 'c=' + obj.values[0];
        calculator.setExpression({id:'formula4', latex: string});
        changeFormulaImage();
        changePointVlaue();
        setFormula();
    },
    fixValue:true,
  });
  setFormula();
}

function changeFormulaImage(){
    const value = Math.pow(sliderNumTwo, 2) - 4 * sliderNumOne * sliderNumThree;

    if(value > 0){
        imageArray[0].children[0].setAttribute('src', 'image/image1.png');
        imageArray[0].children[0].style.display = 'block';
        imageArray[0].children[1].style.display = imageArray[0].children[2].style.display = 'none';
        imageArray[1].setAttribute('src', (sliderNumOne > 0 ? 'image/image4.png' : 'image/image6.png'));
        imageArray[2].setAttribute('src', (sliderNumOne > 0 ? 'image/image6.png' : 'image/image4.png'));

    } else if (value === 0) {
        imageArray[0].children[0].setAttribute('src', 'image/image2.png');
        imageArray[0].children[0].style.display = 'block';
        imageArray[0].children[1].style.display = imageArray[0].children[2].style.display = 'none';

        imageArray[1].setAttribute('src', (sliderNumOne > 0 ? 'image/image5.png' : 'image/image8.png'));
        imageArray[2].setAttribute('src', (sliderNumOne > 0 ? 'image/image8.png' : 'image/image5.png'));
    } else {
        imageArray[0].children[0].style.display = 'none';
        imageArray[0].children[1].style.display = imageArray[0].children[2].style.display = 'block';
        imageArray[1].setAttribute('src', (sliderNumOne > 0 ? 'image/image7.png' : 'image/image8.png'));
        imageArray[2].setAttribute('src', (sliderNumOne > 0 ? 'image/image8.png' : 'image/image7.png'));
    }
}

function changePointVlaue(){
    var labelOne = setPointLabel().labelOne;
    var labelTwo = setPointLabel().labelTwo;
    const value = Math.pow(sliderNumTwo, 2) - 4 * sliderNumOne * sliderNumThree;
    if(sliderNumOne < 0){
      labelOne = setPointLabel().labelTwo;
      labelTwo = setPointLabel().labelOne;
    }

    if(value === 0){
        labelOne = labelTwo = setPointLabel().labelZero;
        calculator.setExpression({id:'point1', showLabel: false});
    } else {
      calculator.setExpression({ id:'point1', showLabel: (isOrigin || isMore || isLess)});
    }
    calculator.setExpression({id:'point1', label: labelOne});
    calculator.setExpression({id:'point2', label: labelTwo});
}

//初始化按钮的文字（为国际化做准备，动态修改文字）
function initButtonText(){

    titleText.children[0].innerHTML = window.lang.title;
    buttonArray[0].children[0].innerHTML = window.lang.buttonText;
    imageArray[0].children[2].innerHTML = window.lang.formulaText;
      
    buttonArray[1].children[0].innerHTML = katex.renderToString('f(x) > 0', {
        throwOnError: false
    });
    buttonArray[1].children[0].children[0].style.fontWeight = 'bold';
    buttonArray[2].children[0].innerHTML = katex.renderToString('f(x) < 0', {
        throwOnError: false
    });
    buttonArray[2].children[0].children[0].style.fontWeight = 'bold';
}
    
function initDesmos(){
    var scale = window.innerWidth/ 1200;
    var rightWidth = 330;
    
    var contentLayout = document.querySelector('.contentLayout');
        
    container.style.height = height + 'px';
    container.style.width  = (window.innerWidth - 48) + 'px';
    container.style.left   = '24px';
    container.style.top    = 'calc(50% - '+ (height / 2) + 'px)';

    //适配小屏设备
    if(window.innerHeight < 610 || window.innerWidth <610){
        rightWidth = 330 * scale;
        var sliderOffsetX = -contentLayout.clientWidth * (1- scale) / 2;
        var titleOffsetX  = - titleText.clientWidth * (1- scale) / 2 + (24 * scale);
        var titleOffsetY  = - titleText.clientHeight * (1- scale) / 2 + (24 * scale);

        rightContolGroup.style.width = parseInt(rightWidth) + 'px';
        leftContainer.style.width    = 'calc(100% - '+rightWidth+'px)';

        titleText.style.left        = titleOffsetX + 'px';
        titleText.style.top         = titleOffsetY + 'px';
        titleText.style.fontSize    = '18px';

        resetBtn.style.width        = 58 * scale + 'px';
        resetBtn.style.height       = 50 * scale + 'px';

        contentLayout.style.transform = 'scale('+ scale + ')';
        contentLayout.style.left = sliderOffsetX + 'px';

        calculator.updateSettings({projectorMode: false});
        calculator.setExpression({id:"point1", labelSize: "small" });
        calculator.setExpression({id:"point2", labelSize: "small" });
        calculator.setExpression({id:"latexString", labelSize: "small" });
        
    } else {
        leftContainer.style.width = 'calc(100% - 330px)';
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
}

function clearExpression(){
    if(sliderNumOne === 0){
      calculator.setExpression({id: "formula1",hidden:true});
      calculator.setExpression({id: "formula6",hidden:true});
      calculator.setExpression({id: "formula7",hidden:true});
      calculator.setExpression({id: "point1",hidden:true, showLabel: false});
      calculator.setExpression({id: "point2",hidden:true, showLabel: false});
      calculator.setExpression({id: "latexString",showLabel: false});

      isLess = isMore = isOrigin = false;
      for(var index=0; index < buttonArray.length; index++){
        buttonArray[index].classList.remove('active');
        imageArray[index].style.display = 'none';
      }

    } else {
      calculator.setExpression({id: "formula1",hidden:false});
      calculator.setExpression({id: "latexString",showLabel: true});
    }
}

//初始化交点的坐标label
function setPointLabel(){
    var labelOne = katex.renderToString('x_1', {
        throwOnError: false
    });
    var labelTwo = katex.renderToString('x_2', {
        throwOnError: false
    });
    var labelZero = katex.renderToString('x_0', {
        throwOnError: false
    });

    return {
        labelZero: labelZero,
        labelOne: labelOne,
        labelTwo: labelTwo
    }
}

    
//设置公式(动态修改参数)
function setFormula(){
        
    var firstSign = '';
    var lastSign  = '';
    if(sliderNumTwo >= 0 ){
        firstSign = '+';
    }

    if(sliderNumThree >= 0){
        lastSign = "+";
    }
       
    const formulaStr = 'f(x)=' + sliderNumOne + 'x^2' + firstSign + sliderNumTwo + 'y' + lastSign + sliderNumThree;

    var latexString = katex.renderToString(formulaStr, {
        throwOnError: false
    });
    calculator.setExpression({id: "latexString",label: latexString});
}

//创建函数线
function createFormulaLine() {
  //滑条a
  calculator.setExpression({id: "formula2",latex: "a=1",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
  //滑条b
  calculator.setExpression({id: "formula3",latex: "b=-4",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
  //滑条c
  calculator.setExpression({id: "formula4",latex: "c=2",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
        
  //函数1
  calculator.setExpression({id: "formula1",color: "#6ECFFF",latex: "ax^2+bx+c",lineStyle: "SOLID", hidden:false,dragMode: "NONE"});
  //函数2
  calculator.setExpression({id: "formula6",color: "#FF5A5A",latex: "y=ax^2+bx+c\\left\\{y>0\\right\\}",lineStyle: "SOLID", hidden:true,dragMode: "NONE"});
  //函数3
  calculator.setExpression({id: "formula7",color: "#FF5A5A",latex: "y=ax^2+bx+c\\left\\{y<0\\right\\}",lineStyle: "SOLID", hidden:true,dragMode: "NONE"});
  //交点1
  calculator.setExpression({
      id: "point1",color: "#9BF23B",latex: "\\left(\\frac{-b-\\sqrt{b^2-4ac}}{2a},0\\right)",
    pointStyle: "OPEN", hidden:true, label: setPointLabel().labelOne, showLabel: false,});
  //交点2
  calculator.setExpression({
      id: "point2",color: "#9BF23B",latex: "\\left(\\frac{-b+\\sqrt{b^2-4ac}}{2a},0\\right)",
    pointStyle: "OPEN", hidden:true, label: setPointLabel().labelTwo, showLabel: false,});
  //函数方程式
  calculator.setExpression({id: "latexString",color: "#ffffff",latex: "\\left(-\\frac{b}{2a},1\\right)", hidden:true, showLabel: true});
}

//设置初始状态
function setCalcuState() {
    calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: true, settingsMenu: false, trace: false});
    calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, 
        xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y",projectorMode: true});
}

    //初始化函数点击事件
    function initEvent(){
        //零点按钮
        buttonArray[0].addEventListener("click",()=>{
            if(sliderNumOne === 0){
                return;
            }
            isOrigin = !isOrigin;
            if(isOrigin){
                buttonArray[0].classList.add('active');
                imageArray[0].style.display = 'block';
            } else {
                buttonArray[0].classList.remove('active');
                imageArray[0].style.display = 'none';
            }
            setPointColor();
        });
        //大于0按钮
        buttonArray[1].addEventListener("click",()=>{
            if(sliderNumOne === 0){
                return;
            }
            isLess = false;
            buttonArray[1].classList.remove('active');
            buttonArray[2].classList.remove('active');
            imageArray[1].style.display = 'none';
            imageArray[2].style.display = 'none';
            calculator.setExpression({id: 'formula6' , hidden: true});
            calculator.setExpression({id: 'formula7' , hidden: true});
            isMore = !isMore;
            if(isMore){
                buttonArray[1].classList.add('active');
                imageArray[1].style.display = 'block';
                calculator.setExpression({id: 'formula6' , hidden: false});
            }
            setPointColor();
        });
        //小于0按钮
        buttonArray[2].addEventListener("click",()=>{
            if(sliderNumOne === 0){
                return;
            }
            isMore = false;
            buttonArray[1].classList.remove('active');
            buttonArray[2].classList.remove('active');
            imageArray[1].style.display = 'none';
            imageArray[2].style.display = 'none';
            calculator.setExpression({id: 'formula6' , hidden: true});
            calculator.setExpression({id: 'formula7' , hidden: true});

            isLess = !isLess;
            if(isLess){
                buttonArray[2].classList.add('active');
                imageArray[2].style.display = 'block';
                calculator.setExpression({id: 'formula7' , hidden: false});
            }
            setPointColor();
        });  
        //重置按钮
        resetBtn.addEventListener('click', ()=>{          
            sliderNumOne = 1;
            sliderNumTwo = -4;
            sliderNumThree = 2;
            isOrigin = isMore = isLess = false;
            sliderOne.setValue(sliderNumOne);
            sliderTwo.setValue(sliderNumTwo);
            sliderThree.setValue(sliderNumThree);    
            calculator.setBlank();
            setCalcuState();
            createFormulaLine();
            resetButton();
            setFormula();
        });
    }

function resetButton(){

    for(var index=0; index < buttonArray.length; index++){
      buttonArray[index].classList.remove('active');
      imageArray[index].style.display = 'none';
    }
    imageArray[0].children[0].setAttribute('src', 'image/image1.png');
    imageArray[0].children[1].style.display = imageArray[0].children[2].style.display = 'none';
    imageArray[1].setAttribute('src', 'image/image4.png');
    imageArray[2].setAttribute('src', 'image/image6.png');

}
   
function initTip(){
    forceMobildLandscape();
}

	function setPointColor() {
    calculator.setExpression({
        id:'point1',
        hidden: (!isOrigin && !isMore && !isLess),
        showLabel: (isOrigin || isMore || isLess),
        pointStyle: (isMore || isLess) ?  'OPEN': 'POINT',
        color: (isMore || isLess) ?  '#6ECFFF': '#9BF23B'
    });
    calculator.setExpression({
        id:'point2',
        hidden:(!isOrigin && !isMore && !isLess),
        showLabel:(isOrigin || isMore || isLess),
        pointStyle: (isMore || isLess) ?  'OPEN': 'POINT',
        color: (isMore || isLess) ?  '#6ECFFF': '#9BF23B'
    });

    //特殊情况下只保留一个点
    if(Math.pow(sliderNumTwo, 2) - 4 * sliderNumOne * sliderNumThree === 0){
      calculator.setExpression({ id:'point1', showLabel: false, });
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
    initButtonText();
    domReady(initDesmos);
    setCalcuState();
    createFormulaLine();
    initSlider();
    initEvent();