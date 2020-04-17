	var desmosElement = document.getElementById("calculator");
    var calculator = Desmos.GraphingCalculator(desmosElement);

    var mathSelect = document.querySelector('.select_math_div');
	var mathOption = document.querySelector('.option_math_div');

	var option_one_img = document.querySelector(".option_one_img");
	var option_two_img = document.querySelector(".option_two_img");
	var option_three_img = document.querySelector(".option_three_img");
	var option_four_img = document.querySelector(".option_four_img");
	var select_one_img = document.querySelector(".select_one_img");
	
	var formulaElement = document.querySelectorAll(".formula_div");

	var resetBtn = document.querySelectorAll(".resetBtn_div");
    
	var isTangent = false;
	var isDerivative = false;
	var formulaNum = 1;

	var height = window.innerHeight * 0.9;
	
	desmosElement.style.width = height + 'px';
	desmosElement.style.height = height + 'px';
	desmosElement.style.top = 'calc(50% - '+(height / 2) + 'px)';
	desmosElement.style.left = 'calc(50% - '+(height / 2) + 'px)';

	formulaElement[0].style.right = 'calc(50% - '+(height / 2) + 'px)';
	formulaElement[0].style.top = 'calc(50% - 100px)';

	formulaElement[1].style.right = 'calc(50% - '+(height / 2) + 'px)';
	formulaElement[1].style.top = 'calc(50% - 100px)';

	formulaElement[2].style.left = 'calc(50% - '+(height / 2.3) + 'px)';
	formulaElement[2].style.top = 'calc(50% - 100px)';

	formulaElement[3].style.right = 'calc(50% - '+(height / 2) + 'px)';
	formulaElement[3].style.top = 'calc(50% + 100px)';

    
	calculator.updateSettings({
		language: "zh-CN",
		expressions: false,
		keypad: false,
		lockViewport: true,
		pointsOfInterest: false,
		settingsMenu: false,
		trace: false,
		zoomButtons: false,
		projectorMode: false
	});

	calculator.updateSettings({
		showGrid: false,
		xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
		yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
		xAxisNumbers: false,
		yAxisNumbers: false,
		xAxisLabel: "x",
		yAxisLabel: "y"
    });
    
     //设置坐标轴边界
	calculator.setMathBounds({
		left: -10,
		right: 10,
		bottom: -10,
		top: 10
    });
    createFormulaLine();

	//创建函数线
	function createFormulaLine() {
		//函数1
		calculator.setExpression({
		  id: "formula0",
		  latex: "y=x",
		  color: "#9BF23B",
		  hidden:false
		});

		//函数1上的点A
		calculator.setExpression({
		  id: "formula1",
		  label: "A",
		  labelSize: 'large',
		  latex: "\\left(a,a\\right)",
		  color: "#fff",
		  hidden: true,
		  pointStyle: "POINT",
		  showLabel: false
		});

		//滑条a
		calculator.setExpression({
		  id: "formula2",
		  latex: "a=2",
		  sliderBounds: { min: "-9.75", max: "9.75", step: "0.01" },
		  hidden: false
		});

		//函数1的切线
		calculator.setExpression({
		  id: "formula3",
		  latex: "y\\ =x\\ \\left\\{-\\ 5+\\ a<x<\\ 5+a\\right\\}",
		  color: "#FF5A5A",
		  hidden: true
		});

		//函数1的导数
		calculator.setExpression({
		  id: "formula4",
		  color: "#18A2FF",
		  latex: "y=1",
		  hidden: true
		});

		//函数1的导数上的点A'
		calculator.setExpression({
		  id: "formula5",
		  color: "#ffffff",
		  label: "A'",
		  labelSize: 'large',
		  latex: "\\left(a,1\\right)",
		  pointStyle: "POINT",
		  dragMode: "NONE",
		  hidden: true,
		  showLabel: false
		});
		/*****************************************函数1************************************************/
		//函数2
		calculator.setExpression({
		  id: "formula6",
		  latex: "y=x^2",
		  color: "#9BF23B",
		  hidden:true
		});

		//滑条b
		calculator.setExpression({
			id: "formula7",
			latex: "b=1",
			sliderBounds: { min: "-3.12", max: "3.12", step: "0.01" },
			hidden: false
		});

		//函数2上的点A
		calculator.setExpression({
		  id: "formula8",
		  label: "A",
		  labelSize: 'large',
		  latex: "\\left(b,b^2\\right)",
		  color: "#ffffff",
		  hidden: true,
		  pointStyle: "POINT",
		  showLabel: false
		});

		//函数2的切线
		calculator.setExpression({
		  id: "formula9",
		  latex: "y-b^2\\ =2b\\left(x-b\\right)",
		  color: "#FF5A5A",
		  hidden: true
		});

		//函数2的导数
		calculator.setExpression({
		  id: "formula10",
		  color: "#18A2FF",
		  latex: "y=2x\\left\\{y\\ge0\\right\\}",
		  hidden: true
		});

		//函数2的导数
		calculator.setExpression({
		  id: "formula11",
		  color: "#AC84FF",
		  latex: "y=2x\\left\\{y\\le0\\right\\}",
		  hidden: true
		});

		//函数1的导数上的点A'
		calculator.setExpression({
		  id: "formula12",
		  color: "#ffffff",
		  label: "A'",
		  labelSize: 'large',
		  latex: "\\left(b,2b\\right)",
		  pointStyle: "POINT",
		  dragMode: "NONE",
		  hidden: true,
		  showLabel: false
		});

		/*****************************************函数2************************************************/

		//函数3
		calculator.setExpression({
		  id: "formula13",
		  latex: "y=x^3",
		  color: "#9BF23B",
		  hidden:true
		});

		//滑条c
		calculator.setExpression({
			id: "formula14",
			latex: "c=1",
			sliderBounds: { min: "-2.13", max: "2.13", step: "0.01" },
			hidden: false
		});

		//函数3上的点A
		calculator.setExpression({
		  id: "formula15",
		  label: "A",
		  labelSize: 'large',
		  latex: "\\left(c,c^3\\right)",
		  color: "#ffffff",
		  hidden: true,
		  pointStyle: "POINT",
		  showLabel: false
		});

		//函数3的切线
		calculator.setExpression({
		  id: "formula16",
		  latex: "y-c^3=2c^2\\left(x-c\\right)",
		  color: "#FF5A5A",
		  hidden: true
		});

		//函数3的导数
		calculator.setExpression({
		  id: "formula17",
		  color: "#18A2FF",
		  latex: "y=2x^2",
		  hidden: true
		});

		//函数3的导数上的点A'
		calculator.setExpression({
		  id: "formula18",
		  color: "#ffffff",
		  label: "A'",
		  labelSize: 'large',
		  latex: "\\left(c,2c^2\\right)",
		  pointStyle: "POINT",
		  dragMode: "NONE",
		  hidden: true,
		  showLabel: false
		});
		/*****************************************函数3************************************************/

		//函数4
		calculator.setExpression({
		  id: "formula19",
		  latex: "y=\\frac{1}{x}",
		  color: "#9BF23B",
		  hidden:true
		});

		//滑条d
		calculator.setExpression({
			id: "formula20",
			latex: "d=1",
			sliderBounds: { min: "-9.7", max: "9.7", step: "0.01" },
			hidden: false
		});

		//函数4上的点A
		calculator.setExpression({
		  id: "formula21",
		  label: "A",
		  labelSize: 'large',
		  latex: "\\left(d,\\ \\frac{1}{d}\\right)",
		  color: "#ffffff",
		  hidden: true,
		  pointStyle: "POINT",
		  showLabel: false
		});

		//函数4的切线
		calculator.setExpression({
		  id: "formula22",
		  latex: "y-\\frac{1}{d}=-\\frac{1}{d^2}\\left(x-d\\right)",
		  color: "#c74440",
		  hidden: true
		});

		//函数4的导数
		calculator.setExpression({
		  id: "formula23",
		  color: "#AC84FF",
		  latex: "y=-\\frac{1}{x^2}",
		  hidden: true
		});

		//函数4的导数上的点A'
		calculator.setExpression({
		  id: "formula24",
		  color: "#ffffff",
		  label: "A'",
		  labelSize: 'large',
		  latex:"\\left(d,-\\frac{1}{d^2}\\right)",
		  pointStyle: "POINT",
		  dragMode: "NONE",
		  hidden: true,
		  showLabel: false
		});
	}
    /*****************************************函数4************************************************/
    
    function initButtonEvent(){
		createFormulaLine();
		var tangentBtn		= document.getElementById("tangentBtn");
		var derivativeBtn	= document.getElementById("derivativeBtn");
		var resetBtn		= document.querySelector(".resetBtn_div");

		tangentBtn.addEventListener("click",(event)=>{
			isTangent = !isTangent;
			if(isTangent){
				event.target.classList.add("active");
				tangentEnabled(false);
			}else{
				event.target.classList.remove("active");
				tangentEnabled(true);
			}
			
		},);

		derivativeBtn.addEventListener("click",(event)=>{
			isDerivative = !isDerivative;
			if(isDerivative){
				event.target.classList.add("active");
				derivativeEnabled(false);
			}else{
				event.target.classList.remove("active");
				derivativeEnabled(true);
			}
		},);

		resetBtn.addEventListener("click",(event)=>{

			//按钮样式还原
			resetImage();
			select_one_img.setAttribute('src', 'image/one.png');
			option_one_img.setAttribute('src', 'image/one_actived.png');
			mathSelect.style.display = 'block';
			mathOption.style.display = 'none';
			
			document.getElementById("tangentBtn").classList.remove("active");
			document.getElementById("derivativeBtn").classList.remove("active");
			
			isTangent = false;
			isDerivative = false;
			formulaNum = 1;

			var state = calculator.getState();
			calculator.setState(state);

			formulaDisable(state);
			tangentDisable(state);
			derivativeDisable(state);
			state.expressions.list[0].hidden = false;
			tipsEnabled(false,0);
			calculator.setState(state);


		});
	}

	//切线按钮
	function tangentEnabled(disable){
		var state = calculator.getState();
		calculator.setState(state);
		tangentDisable(state);
		
		if(formulaNum === 1){			
			expressionsDisable(state,3,1,disable);
		}else if(formulaNum === 2){
			expressionsDisable(state,9,8,disable);
		} else if(formulaNum === 3){
			expressionsDisable(state,16,15,disable);	
		}else if(formulaNum === 4){
			expressionsDisable(state,22,21,disable);
		}
		calculator.setState(state);	
	}

	//导数图像按钮
	function derivativeEnabled(disable){
		var state = calculator.getState();
		calculator.setState(state);
		derivativeDisable(state);

		if(formulaNum === 1){			
			expressionsDisable(state,4,5,disable);
			tipsEnabled(!disable,0);
		}else if(formulaNum === 2){
			expressionsDisable(state,10,12,disable);
			expressionsDisable(state,11,12,disable);
			tipsEnabled(!disable,1);
		} else if(formulaNum === 3){
			expressionsDisable(state,17,18,disable);
			tipsEnabled(!disable,2);
		}else if(formulaNum === 4){
			expressionsDisable(state,23,24,disable);
			tipsEnabled(!disable,3);
		}		
		calculator.setState(state);		
	}

	var expressionsDisable = function(state,index,pointIndex,disable){
		//切线的显示与隐藏
		state.expressions.list[index].hidden = disable;
		//切线上的点A的显示与隐藏
		state.expressions.list[pointIndex].hidden = disable;
		state.expressions.list[pointIndex].showLabel = !disable;		
	} 

	

	//下拉框初始化事件
	function initSelectEvent() {
		mathSelect.addEventListener("click",(event)=>{
			
			mathSelect.style.display = 'none';
			mathOption.style.display = 'block';
		});

		option_one_img.addEventListener("click",(event)=>{
				
				mathSelect.style.display = 'block';
				mathOption.style.display = 'none';
				select_one_img.setAttribute('src', 'image/one.png');
				setActived(1);
				formulaNum = 1;
				setExpression();
		});

		option_two_img.addEventListener("click",(event)=>{
			
				mathSelect.style.display = 'block';
				mathOption.style.display = 'none';
				select_one_img.setAttribute('src', 'image/two.png');
				setActived(2);
				formulaNum = 2;
				setExpression();
		});

		option_three_img.addEventListener("click",(event)=>{
			
				mathSelect.style.display = 'block';
				mathOption.style.display = 'none';
				select_one_img.setAttribute('src', 'image/three.png');
				setActived(3);
				formulaNum = 3;
				setExpression();
		});

		option_four_img.addEventListener("click",(event)=>{
				
				mathSelect.style.display = 'block';
				mathOption.style.display = 'none';
				select_one_img.setAttribute('src', 'image/four.png');
				setActived(4);
				formulaNum = 4;
				setExpression();
		});
	}

	//下拉框当前状态选中功能
	function setActived(index) {
		resetImage();

		if(index === 1){
			option_one_img.setAttribute('src', 'image/one_actived.png');

		}else if(index === 2) {
			option_two_img.setAttribute('src', 'image/two_actived.png');
	
		}else if(index === 3){
			option_three_img.setAttribute('src', 'image/three_actived.png');
			
		}else if(index === 4){
			option_four_img.setAttribute('src', 'image/four_actived.png');		
		}
	}

	function resetImage(){
		option_one_img.setAttribute('src', 'image/one.png');
		option_two_img.setAttribute('src', 'image/two.png');
		option_three_img.setAttribute('src', 'image/three.png');
		option_four_img.setAttribute('src', 'image/four.png');
	}

	function setExpression(){
		var state = calculator.getState();
		calculator.setState(state);
		formulaDisable(state);
		tangentDisable(state);
		derivativeDisable(state);
		
		if(formulaNum === 1) {
			state.expressions.list[0].hidden = false;
			if(isTangent) {				
				expressionsDisable(state,3,1,false);
			} 
			if(isDerivative){
				expressionsDisable(state,4,5,false);
				tipsEnabled(true,0);
			}
			
		}else if(formulaNum === 2) {
			state.expressions.list[6].hidden = false;
			if(isTangent) {				
				expressionsDisable(state,9,8,false);
			}
			if(isDerivative){
				expressionsDisable(state,10,12,false);
				expressionsDisable(state,11,12,false);
				tipsEnabled(true,1);
			}

		}else if(formulaNum === 3){
			state.expressions.list[13].hidden = false;	
			if(isTangent) {				
				expressionsDisable(state,16,15,false);
			}
			if(isDerivative){
				expressionsDisable(state,17,18,false);
				tipsEnabled(true,2);
			}

		}else if(formulaNum === 4){
			state.expressions.list[19].hidden = false;	
			if(isTangent) {				
				expressionsDisable(state,22,21,false);
			}
			if(isDerivative){
				expressionsDisable(state,23,24,false);
				tipsEnabled(true,3);
			}

		}
		calculator.setState(state);	
	}

	function formulaDisable(state){
		state.expressions.list[0].hidden = true;
		state.expressions.list[6].hidden = true;
		state.expressions.list[13].hidden = true;
		state.expressions.list[19].hidden = true;
	}

	function tangentDisable(state){
		expressionsDisable(state,3,1,true);
		expressionsDisable(state,9,8,true);
		expressionsDisable(state,16,15,true);
		expressionsDisable(state,22,21,true);
	}

	function derivativeDisable(state){
		expressionsDisable(state,4,5,true);
		expressionsDisable(state,10,12,true);
		expressionsDisable(state,11,12,true);
		expressionsDisable(state,17,18,true);
		expressionsDisable(state,23,24,true);
	}

	function tipsEnabled(disable, index){
		
		formulaElement[0].style.display ="none";
		formulaElement[1].style.display ="none";
		formulaElement[2].style.display ="none";
		formulaElement[3].style.display ="none";

		if(disable){
			formulaElement[index].style.display = 'block';
		}
	}

	initButtonEvent();
	initSelectEvent();