
    var resetBtn            = document.querySelector(".resetBtn_div");
    var titleText           = document.querySelector('.titleText');
    var sliderGroup         = document.querySelector('.sliderGroup');
    var container           = document.querySelector('.container');
    var rightContolGroup    = document.querySelector('.rightContolGroup');
    var leftContainer       = document.querySelector('.leftContainer');
    var sequenceImage       = document.querySelector('.sequence_img');
    var formulaDetail       = document.querySelector('.formulaDetail');
    var formulaBtn          = document.getElementById('formulaBtn');
    var formualInput        = document.querySelector('.formualInput');

	  var height = window.innerHeight * 0.98;
    
    var isClick = false;
    var calculator = null;
    var sliderNumOne = 1;
    var sliderNumTwo = 2;
    var sliderNumThree = 1;
    var sliderOne;
    var sliderTwo;
    var sliderThree;
	  initTip();
	  initDesmos();
    createFormulaLine();
    initSlider();
    initEvent();
    //初始化滑动条
    function initSlider(){
        var preValue = 1;

        sliderOne = new slider({
            container:"#slider_one",
            start : -10,
            end:10,
            step:0.1,
            value:1,
            showValue:true,
            ondrag:(obj)=>{
                sliderNumOne = obj.values[0];
                if(sliderNumOne === 0){
                    setPointDisable(0);
                    resetFormulaBtn();
                }else{
                    setPointDisable(sliderNumThree);
                }
                var string = 'a=' + obj.values[0];
                calculator.setExpression({id:'formula2', latex: string});
                setFormula();
            },
            fixValue:true,
        });

        sliderTwo = new slider({
            container:"#slider_two",
            start : -5,
            end:5,
            step:0.1,
            value:2,
            showValue:true,
            ondrag:(obj)=>{
                sliderNumTwo = obj.values[0];
                if(sliderNumTwo <= 0){
                    resetFormulaBtn();
                    if(sliderNumTwo = 0){
                        setPointDisable(0);
                    }else{
                        setPointDisable(sliderNumThree);
                    }     
                }else{
                    setPointDisable(sliderNumThree);
                    setFormula();
                }
                
                var string = 'q=' + obj.values[0];
                calculator.setExpression({id:'formula3', latex: string});
            },
            fixValue:true,
        });

        sliderThree = new slider({
            container:"#slider_three",
            start : 0,
            end:10,
            step:1,
            value:1,
            showValue:true,
            ondrag:(obj)=>{
                sliderNumThree = obj.values[0];
                if(obj.values[0]!= preValue){
                    preValue = obj.values[0];
                    self.setPointDisable(obj.values[0]); 
                } 
            },
            fixValue:true,
        });

        setFormula();
    }
    //设置公式
    function setFormula(){ 
        var value = (sliderNumOne / sliderNumTwo);
        var param = Math.round(value * 10) / 10;

        var formulaString = param + '\\times'+ sliderNumTwo +'^x';

        if(sliderNumTwo === 1){
            formulaString = param+'';
        }
        var html = katex.renderToString(formulaString, {
            throwOnError: false
        });
        formualInput.innerHTML = html;
    }
    
	  function initDesmos(){
        var scale = window.innerWidth / 1200;
        var rightWidth = 282;
		    var desmosElement = document.getElementById('calculator');
        calculator = Desmos.GraphingCalculator(desmosElement);
        
        container.style.height = height + 'px';
        container.style.width  = (window.innerWidth - 48) + 'px';
        container.style.left   = '24px';
        container.style.top    = 'calc(50% - '+ (height / 2) + 'px)';  

        //适配小屏设备
        if(window.innerHeight < 610 || window.innerWidth <610){
            rightWidth = 282 * scale;
            var sliderOffsetX = -sliderGroup.clientWidth * (1- scale) / 2 + (12 * scale);
            var titleOffsetX  = - titleText.clientWidth * (1- scale) / 2 + (24 * scale);
            var titleOffsetY  = - titleText.clientHeight * (1- scale) / 2 + (24 * scale);

            titleText.style.transform   = 'scale('+ scale + ')';
            titleText.style.left        = titleOffsetX + 'px';
            titleText.style.top         = titleOffsetY + 'px';

            rightContolGroup.style.width = parseInt(rightWidth) + 'px';
            leftContainer.style.width    = 'calc(100% - '+rightWidth+'px)';

            resetBtn.style.width        = 58 * scale + 'px';
            resetBtn.style.height       = 50 * scale + 'px';

            sliderGroup.style.transform = 'scale('+ scale + ')';
            sliderGroup.style.right     = parseInt(sliderOffsetX) + 'px';
            sliderGroup.style.top       = parseInt(sliderGroup.offsetTop * scale) + 'px';

            sequenceImage.style.height  = parseInt(rightWidth * (79 / 282)) + 'px';
            sequenceImage.style.bottom  = parseInt(100 * scale) + 'px';
            formulaDetail.style.width   = parseInt(160 * scale) + 'px';
            formulaDetail.style.height  = parseInt(160 * scale * (21 / 40))  + 'px';
            formulaDetail.style.left    = parseInt(80 * scale)  + 'px';
            formulaDetail.children[0].style.width = parseInt(160 * scale * (21 / 40) *(10 / 7))  + 'px';
            
            formulaBtn.style.transform  = 'scale('+ scale + ')';
            formulaBtn.style.bottom     = parseInt(-formulaBtn.clientHeight * (1- scale) / 2 + (160 * scale * (21 / 80)))  + 'px';
            formulaBtn.style.left       = parseInt(-formulaBtn.clientWidth * (1- scale) / 2 ) + 'px';

            formualInput.style.fontSize = parseInt(18 * scale) + 'px';
            
        } else {
            leftContainer.style.width = 'calc(100% - 282px)';
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
        calculator.setExpression({id: "formula1",latex: "y=\\frac{a}{q}\\cdot q^x",color: "#9BF23B",hidden:true});
        //滑条a
		    calculator.setExpression({id: "formula2",latex: "a=1",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
		    //滑条q
		    calculator.setExpression({id: "formula3",latex: "q=2",sliderBounds: { min: "-5", max: "5", step: "0.1" }});
            //函数1的点1'
		    calculator.setExpression({id: "point1",color: "#fff",latex: "\\left(1,\\frac{a}{q}\\cdot q^1\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: false,showLabel: false});
		    //函数1的点2'
		    calculator.setExpression({id: "point2",color: "#fff",latex: "\\left(2,\\frac{a}{q}\\cdot q^2\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点3'
		    calculator.setExpression({id: "point3",color: "#fff",latex: "\\left(3,\\frac{a}{q}\\cdot q^3\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点4'
		    calculator.setExpression({id: "point4",color: "#fff",latex: "\\left(4,\\frac{a}{q}\\cdot q^4\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点5'
		    calculator.setExpression({id: "point5",color: "#fff",latex: "\\left(5,\\frac{a}{q}\\cdot q^5\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点6'
		    calculator.setExpression({id: "point6",color: "#fff",latex: "\\left(6,\\frac{a}{q}\\cdot q^6\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点7'
		    calculator.setExpression({id: "point7",color: "#fff",latex: "\\left(7,\\frac{a}{q}\\cdot q^7\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点8'
		    calculator.setExpression({id: "point8",color: "#fff",latex: "\\left(8,\\frac{a}{q}\\cdot q^8\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点9'
		    calculator.setExpression({id: "point9",color: "#fff",latex: "\\left(9,\\frac{a}{q}\\cdot q^9\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
		    //函数1的点10'
		    calculator.setExpression({id: "point10",color: "#fff",latex: "\\left(10,\\frac{a}{q}\\cdot q^10\\right)",pointStyle: "POINT",dragMode: "NONE",hidden: true,showLabel: false});
    }

    //设置初始状态
    function setCalcuState() {
        calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: false, settingsMenu: false, trace: false});
        calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y"});
    }
    
    //初始化函数点击事件
    function initEvent(){
        formulaBtn.addEventListener("click",(event)=>{ 
            if(sliderNumOne !=0 && sliderNumTwo >0){
                isClick = !isClick;
            }     
            if(isClick && sliderNumTwo >0 && sliderNumOne !=0 ){
                    formulaBtn.classList.add("active");
                    formulaDetail.style.display = 'block';
                    sequenceImage.setAttribute('src','image/sequence_active.png');
                    calculator.setExpression({id:'formula1', hidden: false});
            }else{
                    formulaBtn.classList.remove("active");
                    formulaDetail.style.display = 'none';
                    sequenceImage.setAttribute('src','image/sequence_inital.png');
                    calculator.setExpression({id:'formula1', hidden: true});
            }
        });
        
        resetBtn.addEventListener('click', ()=>{
            calculator.setBlank();
            setCalcuState();
            createFormulaLine();
            resetFormulaBtn();
            sliderNumOne = 1;
            sliderNumTwo = 2;
            sliderNumThree = 1;
            sliderOne.setValue(sliderNumOne);
            sliderTwo.setValue(sliderNumTwo);
            sliderThree.setValue(sliderNumThree);
            setFormula();
        });
    }
    //重置函数图像
    function resetFormulaBtn(){
        isClick = false;
        formulaBtn.classList.remove("active");
        formulaDetail.style.display = 'none';
        sequenceImage.setAttribute('src','image/sequence_inital.png');
        calculator.setExpression({id:'formula1', hidden: true});
    }
    //函数图像上点的显示与隐藏
    function setPointDisable(value){
        var expressions = calculator.getExpressions();
        for(var index=1; index < (expressions.length - 2); index++){
            var id = 'point' + index;
            if(index <= value){
                calculator.setExpression({id:id, hidden: false});
            }else{
                calculator.setExpression({id:id, hidden: true});
            }
        }
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