var titleText 		= document.querySelector(".titleText");
//侧边栏按钮
var tangentBtn		= document.getElementById("tangentBtn");
var derivativeBtn	= document.getElementById("derivativeBtn");
var resetBtn			= document.querySelector(".resetBtn_div");
//下拉框的三张公式图片
var mathSelect = document.querySelector('.select_math_div');
var mathOption = document.querySelector('.option_math_div');

var option_one_img      = document.querySelector(".option_one_img");
var option_two_img      = document.querySelector(".option_two_img");
var option_three_img    = document.querySelector(".option_three_img");
var select_one_img      = document.querySelector(".select_one_img");
//斜率和导数公式图片
var formulaElement      = document.querySelectorAll(".formula_div");
var slopeTips 					= document.querySelector('.slope_div');
var noSlope 						= document.querySelector('.noSlopeDiv');

var height = window.innerHeight * 0.9;

//确定导数公式的图片位置
formulaElement[0].style.right 	= 'calc(50% - '+ 240 + 'px)';
formulaElement[0].style.bottom 	= 'calc(50% - '+ (height / 2) + 'px)';

formulaElement[1].style.right 	= 'calc(50% - '+(height / 2 - 100) + 'px)';
formulaElement[1].style.top 		= 'calc(50% - '+(height / 2 - 100) + 'px)';

formulaElement[2].style.right 	= 'calc(50% + 100px)';
formulaElement[2].style.top 		= 'calc(50% - 200px)';
    
var isTangent = false;
var isDerivative = false;
var formulaNum = 1;
var calculator = null;
var pointValueA ,pointValueB, pointValueC;

function initDesmos(){
	var desmosElement = document.getElementById('calculator');
	calculator = Desmos.GraphingCalculator(desmosElement);
	desmosElement.style.width = height + 'px';
	desmosElement.style.height = height + 'px';
	desmosElement.style.top = 'calc(50% - '+ (height / 2) + 'px)';
	desmosElement.style.left = 'calc(50% - '+ (height / 2) + 'px)';
}
//应对小屏设备
function adaptationdevice() {
	var scale = window.innerWidth / 1200;

	if(window.innerHeight < 610 || window.innerWidth <610){
		titleText.style.left 			= '12px';
		titleText.style.top 			= '12px';
		titleText.style.fontSize 	= '18px';

		formulaElement[0].style.width 	= 240 * scale + 'px';
		formulaElement[0].style.height 	= (240 * scale * 17 / 40) + 'px';
		formulaElement[0].style.right 	= 'calc(50% - '+ (240 * scale) + 'px)';
		formulaElement[1].style.right 	= 'calc(50% - '+(height / 2)  + 'px)';
		formulaElement[1].style.top 		= '24px';
		formulaElement[2].style.right 	= 'calc(50% +'+ (100 * scale) +'px)';
		formulaElement[2].style.top 		= 'calc(50% - '+ (100 * scale) +'px)';

		noSlope.style.left 				= 'calc(50% - '+ (400 * scale) +'px)';
		noSlope.style.transform 	= 'scale('+ scale +')';
		slopeTips.style.left 			= 'calc(50% - '+ (400 * scale) +'px)';
		slopeTips.style.transform = 'scale('+ scale +')';
	}
}

//创建函数线
function createFormulaLine() {
	createFormulaOne();
	createFormulaTwo();
	createFormulaThree();
	observePoint();
}
	
function createFormulaOne(){
	//函数1
	calculator.setExpression({id: "formula0",latex: "y=\\left|x\\right|",color: "#00AAFF",hidden:false});
	//滑条a
	calculator.setExpression({id: "formula1",latex: "a=-2",sliderBounds: { min: "-9.2", max: "9.2", step: "0.01" },hidden: false});

	//函数1的导数图像
	calculator.setExpression({id: "formula2",latex: "y=1\\left\\{x>0\\right\\}",color: "#946CE6",hidden: true});
	//函数1的导数图像
	calculator.setExpression({id: "formula3",latex: "y=-1\\left\\{x<0\\right\\}",color: "#946CE6",hidden: true});
	//导数图像在y轴的交点
	calculator.setExpression({id: "formula4",latex: "\\left(0,\\ -1\\right)",color: "#946CE6",hidden: true,pointStyle: "OPEN"});
	//导数图像在y轴的交点
	calculator.setExpression({id: "formula5",latex: "\\left(0,1\\right)",color: "#946CE6",hidden: true,pointStyle: "OPEN",fillOpacity: 0});

	//AB两点距离虚线
	calculator.setExpression({id: "formula6",latex: "x=a\\left\\{-1<y\\ <\\left|a\\right|\\right\\}\\left\\{a<0\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//AB两点距离虚线
	calculator.setExpression({id: "formula7",latex: "x=a\\left\\{0<y<\\left|a\\right|\\right\\}\\left\\{a>1\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//AB两点距离虚线
	calculator.setExpression({id: "formula8",latex: "x=a\\left\\{0<y<1\\right\\}\\left\\{0<a<1\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});

	//函数1上的点A
	calculator.setExpression({id: "formula9",label: "A",labelSize: 'large',latex: "\\left(a,\\ \\left|a\\right|\\right)",color: "#fff",hidden: false,pointStyle: "POINT",showLabel: true});
	//函数1上的点B
	calculator.setExpression({id: "formula10",label: "B",labelSize: 'large',latex: "\\left(a,\\frac{a}{\\left|a\\right|}\\right)",color: "#fff",hidden: true,pointStyle: "POINT",dragMode: "NONE",showLabel: false});

	//函数1的切线
	calculator.setExpression({id: "formula11",latex: "y=-\\left(x-\\ a\\right)+\\left|a\\right|\\left\\{a\\le\\ 0\\right\\}\\left\\{-6+a<x<6+a\\right\\}",color: "#FF5A5A",hidden: true});
	//函数1的切线
	calculator.setExpression({id: "formula12",latex: "y=\\left(x-\\ a\\right)+\\left|a\\right|\\left\\{a\\ge\\ 0\\right\\}\\left\\{-6+a<y<6+a\\right\\}",color: "#FFD621",hidden: true});
}

function createFormulaTwo(){
	//函数2
	calculator.setExpression({id: "formula13",latex: "y=x^2",color: "#00AAFF",hidden:true});
	//滑条b
	calculator.setExpression({id: "formula14",latex: "b=-2",sliderBounds: { min: "-3", max: "3", step: "0.01" },hidden: true});
	//函数2的导数图像
	calculator.setExpression({id: "formula15",latex: "y=2x",color: "#946CE6",hidden: true});
	//AB两点距离虚线(b<0)
	calculator.setExpression({id: "formula16",latex: "x=b\\left\\{0<y\\ <2b\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//AB两点距离虚线（b>0）
	calculator.setExpression({id: "formula17",latex: "x=\\ b\\left\\{2b<y\\ <\\ b^2\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//函数2上的点A
	calculator.setExpression({id: "formula18",label: "A",labelSize: 'large',latex: "\\left(b,b^2\\right)",color: "#fff",hidden: true,pointStyle: "POINT",showLabel: false});
	//函数2上的点B
	calculator.setExpression({id: "formula19",label: "B",labelSize: 'large',latex: "\\left(b,\ 2b\\right)",color: "#fff",hidden: true,pointStyle: "POINT",dragMode: "NONE",showLabel: false});

	//函数2的切线
	calculator.setExpression({id: "formula20",latex: "y=2bx\\ -\\ b^2",color: "#FF5A5A",hidden: true});
}

function createFormulaThree(){
	//函数3
	calculator.setExpression({id: "formula21",latex: "y=x^3",color: "#00AAFF",hidden:true});
	//滑条c
	calculator.setExpression({id: "formula22",latex: "c=-1",sliderBounds: { min: "-2.1", max: "2.1", step: "0.01" },hidden: true});
	//函数3的导数图像
	calculator.setExpression({id: "formula23",latex: "y=3x^2",color: "#946CE6",hidden: true});
	//AB两点距离虚线(b<0)
	calculator.setExpression({id: "formula24",latex: "x=\\ c\\left\\{0<y<3c^2\\right\\}\\left\\{c>0\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//AB两点距离虚线（b>0）
	calculator.setExpression({id: "formula25",latex: "x=c\\left\\{c^3<y\\ <3c^2\\right\\}\\left\\{c<0\\right\\}",color: "#FF5A5A",hidden: true,lineStyle: "DASHED"});
	//函数3上的点A
	calculator.setExpression({id: "formula26",label: "A",labelSize: 'large',latex: "\\left(c,c^3\\right)",color: "#fff",hidden: true,pointStyle: "POINT",showLabel: false});
	//函数3上的点B
	calculator.setExpression({id: "formula27",label: "B",labelSize: 'large',latex: "\\left(c,\\ 3c^2\\right)",color: "#fff",hidden: true,pointStyle: "POINT",dragMode: "NONE",showLabel: false});

	//函数3的切线
	calculator.setExpression({id: "formula28",latex: "y=3c^2x\\ -2c^3",color: "#FF5A5A",hidden: true});
}
//监听滑动点的值
function observePoint(){
	var pointA = calculator.HelperExpression({latex:'a'});
      pointA.observe("numericValue", function() {
				pointValueA = pointA.numericValue;
				changeValue();
	});

	var pointB = calculator.HelperExpression({latex:'b'});
      pointB.observe("numericValue", function() {
				pointValueB = pointB.numericValue;
				changeValue();
	});

	var pointC = calculator.HelperExpression({latex:'c'});
      pointC.observe("numericValue", function() {
				pointValueC = pointC.numericValue;
				changeValue();
	});
}

//设置初始状态
function setCalcuState() {
	calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: true, pointsOfInterest: false, settingsMenu: false, trace: false});
	calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: false, yAxisNumbers: false, xAxisLabel: "x",yAxisLabel: "y"});
	//设置坐标轴边界
	calculator.setMathBounds({left: -10,right: 10,bottom: -10,top: 10});
}
//初始化按钮事件
function initButtonEvent(){
	tangentBtn.addEventListener("click",()=>{
		isTangent = !isTangent;
		if(isTangent){
			tangentBtn.classList.add("active");
			slopeTips.style.display = 'block';
			tangentEnabled(false);
		}else{
			tangentBtn.classList.remove("active");
			slopeTips.style.display = 'none';
			tangentEnabled(true);
		}
	});
	derivativeBtn.addEventListener("click",()=>{
		isDerivative = !isDerivative;
		if(isDerivative){
			derivativeBtn.classList.add("active");
			derivativeEnabled(false);
		}else{
			derivativeBtn.classList.remove("active");
			derivativeEnabled(true);
		}
	});

	resetBtn.addEventListener("click",()=>{
		resetImage();
		resetFormulaImage();
		select_one_img.setAttribute('src', 'image/one.png');
		option_one_img.setAttribute('src', 'image/one_actived.png');
		mathSelect.style.display = 'block';
		mathOption.style.display = 'none';
			
		document.getElementById("tangentBtn").classList.remove("active");
		document.getElementById("derivativeBtn").classList.remove("active");
			
		isTangent = false;
		isDerivative = false;
		formulaNum = 1;
		calculator.setBlank();
		setCalcuState();
		createFormulaLine();
	});
}
//初始化下拉框事件
function initSelectEvent() {
	mathSelect.addEventListener("click",()=>{
		mathSelect.style.display = 'none';
		mathOption.style.display = 'block';
	});

	option_one_img.addEventListener("click",()=>{
		mathSelect.style.display = 'block';
		mathOption.style.display = 'none';
		select_one_img.setAttribute('src', 'image/one.png');
		setActived(1);
		formulaNum = 1;
		setExpression();
		observePoint();
	});

	option_two_img.addEventListener("click",()=>{
		mathSelect.style.display = 'block';
		mathOption.style.display = 'none';
		select_one_img.setAttribute('src', 'image/two.png');
		setActived(2);
		formulaNum = 2;
		setExpression();
		observePoint();
	});

	option_three_img.addEventListener("click",()=>{
		mathSelect.style.display = 'block';
		mathOption.style.display = 'none';
		select_one_img.setAttribute('src', 'image/three.png');
		setActived(3);
		formulaNum = 3;
		setExpression();
		observePoint();
	});
}

//导数意义按钮
function tangentEnabled(disable){
	var state = calculator.getState();
	calculator.setState(state);
	tangentDisableOne(state,true);
	tangentDisableTwo(state,true);
	tangentDisableThree(state,true);
		
	if(formulaNum === 1){
		tangentDisableOne(state,disable);
	}else if(formulaNum === 2){
		tangentDisableTwo(state,disable);
	} else if(formulaNum === 3){
		tangentDisableThree(state,disable);
	}
	changeValue();
	calculator.setState(state);
	observePoint();
}
	
//导数图像按钮
function derivativeEnabled(disable){
	var state = calculator.getState();
	calculator.setState(state);
	derivativeDisableOne(state,true);
	derivativeDisableTwo(state,true);
	derivativeDisableThree(state,true);

	if(formulaNum === 1){
		derivativeDisableOne(state,disable);
		formulaTextEnabled(!disable,0);
	}else if(formulaNum === 2){
		derivativeDisableTwo(state,disable);
		formulaTextEnabled(!disable,1);
	} else if(formulaNum === 3){
		derivativeDisableThree(state,disable);
		formulaTextEnabled(!disable,2);
	}
	calculator.setState(state);
	observePoint();
}
    
//函数一的函数图像
function formulaDisableOne(state, disable){
	state.expressions.list[0].hidden = disable;
	state.expressions.list[9].hidden = disable;
	state.expressions.list[9].showLabel = !disable;
}
//函数二的函数图像
function formulaDisableTwo(state, disable){
	state.expressions.list[13].hidden = disable;
	state.expressions.list[18].hidden = disable;
	state.expressions.list[18].showLabel = !disable;
}
//函数三的函数图像
function formulaDisableThree(state, disable){
	state.expressions.list[21].hidden = disable;
	state.expressions.list[26].hidden = disable;
	state.expressions.list[26].showLabel = !disable;
}

//函数一的导数意义
function tangentDisableOne(state, disable){
	state.expressions.list[6].hidden = disable;
	state.expressions.list[7].hidden = disable;
	state.expressions.list[8].hidden = disable;

	state.expressions.list[10].hidden = disable;
	state.expressions.list[10].showLabel = !disable;
	state.expressions.list[11].hidden = disable;
	state.expressions.list[12].hidden = disable;
}
//函数二的导数意义
function tangentDisableTwo(state, disable){
	state.expressions.list[16].hidden = disable;
	state.expressions.list[17].hidden = disable;

	state.expressions.list[19].hidden = disable;
	state.expressions.list[19].showLabel = !disable;
	state.expressions.list[20].hidden = disable;
}
//函数三的导数意义
function tangentDisableThree(state, disable){
	state.expressions.list[24].hidden = disable;
	state.expressions.list[25].hidden = disable;

	state.expressions.list[27].hidden = disable;
	state.expressions.list[27].showLabel = !disable;
	state.expressions.list[28].hidden = disable;
}
   
//函数一的导数图像
function derivativeDisableOne(state, disable){
	state.expressions.list[2].hidden = disable;
	state.expressions.list[3].hidden = disable;
	state.expressions.list[4].hidden = disable;
	state.expressions.list[5].hidden = disable;
}
//函数二的导数图像
function derivativeDisableTwo(state, disable){
	state.expressions.list[15].hidden = disable;
}
//函数三的导数图像
function derivativeDisableThree(state, disable){
	state.expressions.list[23].hidden = disable;
}

//导数图像的公式图片的显示与隐藏
function formulaTextEnabled(disable, index){
	formulaElement[0].style.display ="none";
	formulaElement[1].style.display ="none";
	formulaElement[2].style.display ="none";
		
	if(disable){formulaElement[index].style.display = 'block';}
}
//重置下拉框选项图片样式
function resetImage(){
	option_one_img.setAttribute('src', 'image/one.png');
	option_two_img.setAttribute('src', 'image/two.png');
	option_three_img.setAttribute('src', 'image/three.png');
}
//重置斜率公式图片
function resetFormulaImage(){
	slopeTips.style.display = 'none';
	noSlope.style.display = 'none';

	for(var index=0; index< formulaElement.length; index++){
		formulaElement[index].style.display = 'none';
	}
}

//设置下拉框公式的选中状态
function setActived(index) {
	resetImage();
	if(index === 1){
		option_one_img.setAttribute('src', 'image/one_actived.png');
	}else if(index === 2) {
		option_two_img.setAttribute('src', 'image/two_actived.png');
	}else if(index === 3){
		option_three_img.setAttribute('src', 'image/three_actived.png');
	}
}

//设置公式显示状态
function setExpression(){
	var state = calculator.getState();
	calculator.setState(state);
	formulaDisableOne(state,true);
	formulaDisableTwo(state,true);
	formulaDisableThree(state,true);
	tangentDisableOne(state,true);
	tangentDisableTwo(state,true);
	tangentDisableThree(state,true);
	derivativeDisableOne(state,true);
	derivativeDisableTwo(state,true);
	derivativeDisableThree(state,true);
				
	if(formulaNum === 1) {
		formulaDisableOne(state,false);
		if(isTangent) {
			tangentDisableOne(state,false);
		}
		if(isDerivative){
			derivativeDisableOne(state,false);
			formulaTextEnabled(true, 0);
		}
	}else if(formulaNum === 2) {
		formulaDisableTwo(state,false);
		if(isTangent) {
			tangentDisableTwo(state,false);
		}
		if(isDerivative){
			derivativeDisableTwo(state,false);
			formulaTextEnabled(true, 1);
		}
	}else if(formulaNum === 3){
		formulaDisableThree(state,false);
		if(isTangent) {
			tangentDisableThree(state,false);
		}if(isDerivative){
			derivativeDisableThree(state,false);
			formulaTextEnabled(true, 2);
		}
	}
	calculator.setState(state);
}
//关于导数B点位置的坐标
function changeValue(){
	if(!isTangent){
		return;
	}
	noSlope.style.display = 'none';
	slopeTips.style.display = 'block';
	if(formulaNum === 1){
		if(pointValueA >0){
			slopeTips.children[1].innerHTML = '1';
		} else if(pointValueA === 0){
			noSlope.style.display = 'block';
			slopeTips.style.display = 'none';
		} else {
			slopeTips.children[1].innerHTML = '-1';
		}
	} else if (formulaNum === 2){
			slopeTips.children[1].innerHTML = pointValueB * 2 + '';
	} else {
		var value = 3 * Math.pow(pointValueC, 2);
		slopeTips.children[1].innerHTML = Math.round(value * 100) / 100 + '';
	}
	setTimeout(()=>{
		if(document.querySelectorAll('.dcg-label').length > 1){
			document.querySelectorAll('.dcg-label')[1].children[1].style.display = 'inline';
		}
	},100);
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
//对于手机设备横竖屏显示
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
//改变横屏
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
initDesmos();
setCalcuState();
createFormulaLine();
initButtonEvent();
initSelectEvent();
adaptationdevice();