
    var resetBtn            = document.querySelector(".resetBtn_div");
    var titleText           = document.querySelector('.titleText');
    var container           = document.querySelector('.container');
    var rightContolGroup    = document.querySelector('.rightContolGroup');
    var leftContainer       = document.querySelector('.leftContainer');
    var formulaOriginBtn    = document.getElementById('formulaOriginBtn');
    var formulaXaxisBtn     = document.getElementById('formulaXaxisBtn');
    var formulaYaxisBtn     = document.getElementById('formulaYaxisBtn');
    var desmosElement       = document.getElementById('calculator');

    var symbolSelect = document.querySelector('.select_symbol_div');
    var symbolOption = document.querySelector('.option_symbol_div');

	var height = window.innerHeight * 0.98;
    
    var calculator = Desmos.GraphingCalculator(desmosElement);
    var sliderNumOne = 1;
    var sliderNumTwo = -1.2;
    var sliderNumThree = 1;
    var symbolSign = '>';
    var sliderOne;
    var sliderTwo;
    var sliderThree;

    var isOrigin    = false;
    var isXaxis     = false;
    var isYaxis     = false;

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
                var string = 'a=' + obj.values[0];
                calculator.setExpression({id:'formula2', latex: string});
                setFormula();
                setPointerLine();
                originDisable();
            },
            fixValue:true,
        });
        //b点滑条
        sliderTwo = new slider({
            container:"#slider_two",
            start : -10,
            end:10,
            step:0.1,
            value:-1.2,
            showValue:true,
            ondrag:(obj)=>{
                sliderNumTwo = obj.values[0];
                var string = 'b=' + obj.values[0];
                calculator.setExpression({id:'formula3', latex: string});
                setFormula();
                setPointerLine();
                originDisable();
            },
            fixValue:true,
        });
        //C点滑条
        sliderThree = new slider({
            container:"#slider_three",
            start : -10,
            end:10,
            step:0.1,
            value:1,
            showValue:true,
            ondrag:(obj)=>{
                sliderNumThree = obj.values[0];
                var string = 'c=' + obj.values[0];
                calculator.setExpression({id:'formula4', latex: string}); 
                setFormula();
                originDisable();
            },
            fixValue:true,
        });
    }

    //初始化按钮的文字（为国际化做准备，动态修改文字）
    function initButtonText(){
        titleText.children[0].innerHTML         = window.lang.title;
        formulaOriginBtn.children[0].innerHTML  = window.lang.originBtnText;
        formulaXaxisBtn.children[0].innerHTML   = window.lang.xAxisBtnText;
        formulaYaxisBtn.children[0].innerHTML   = window.lang.yAxisBtnText;
    }
    
	function initDesmos(){
        var scale = window.innerWidth/ 1200;
        var rightWidth = 282;
        
        var contentLayout = document.querySelector('.contentLayout');
        
        container.style.height = height + 'px';
        container.style.width  = (window.innerWidth - 48) + 'px';
        container.style.left   = '24px';
        container.style.top    = 'calc(50% - '+ (height / 2) + 'px)';  

        //适配小屏设备
        if(window.innerHeight < 610 || window.innerWidth <610){
            rightWidth = 282 * scale;
            var sliderOffsetX = -contentLayout.clientWidth * (1- scale) / 2;
            var titleOffsetX  = - titleText.clientWidth * (1- scale) / 2 + (24 * scale);
            var titleOffsetY  = - titleText.clientHeight * (1- scale) / 2 + (24 * scale);

            rightContolGroup.style.width = parseInt(rightWidth) + 'px';
            leftContainer.style.width    = 'calc(100% - '+rightWidth+'px)';

            titleText.style.transform   = 'scale('+ scale + ')';
            titleText.style.left        = titleOffsetX + 'px';
            titleText.style.top         = titleOffsetY + 'px';

            resetBtn.style.width        = 58 * scale + 'px';
            resetBtn.style.height       = 50 * scale + 'px';

            contentLayout.style.transform = 'scale('+ scale + ')';
            contentLayout.style.left = sliderOffsetX + 'px';    
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
        setFormula();
    }
    
    //设置公式
    function setFormula(){ 
        var relationSlect  = document.querySelector('.slect_formula');
        var firstSign = '';
        var lastSign  = '';
        if(sliderNumTwo >= 0 ){
            firstSign = '+';
        }

        if(sliderNumThree >= 0){
            lastSign = "+";
        }
       
        var latexString = sliderNumOne + 'x' + firstSign + sliderNumTwo + 'y' + lastSign + sliderNumThree;

        var latexString = katex.renderToString(latexString, {
            throwOnError: false
        });
        
        relationSlect.children[0].innerHTML = latexString;
        relationSlect.children[0].children[0].style.fontWeight = 'bold';
        setLatexString();   
    }

    function originDisable(){
        var isHidden = true;
        var isHiddenLine = true;
        //代原点情况下关于原点的显示/隐藏
        if(isOrigin){
           if(sliderNumThree === 0 || (sliderNumOne === 0 && sliderNumTwo === 0)){
                isHidden = true;
            } else{
                isHidden = false;
            } 
            isHiddenLine = true;              
        }
        //固定X情况下关于原点的显示/隐藏
        if(isXaxis){
            sliderNumTwo === 0 ? isHidden = isHiddenLine = true :  isHidden = isHiddenLine = false;
        }
        //固定y情况下关于原点的显示/隐藏
        if(isYaxis){
            sliderNumOne === 0 ? isHidden = isHiddenLine = true :  isHidden = isHiddenLine = false;    
        }
        calculator.setExpression({id: "point1",hidden:isHidden,showLabel: !isHidden});
        calculator.setExpression({id: "formula6",hidden:isHiddenLine});
    }

    //创建函数线
    function createFormulaLine() {  
        //滑条a
        calculator.setExpression({id: "formula2",latex: "a=1",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
        //滑条b
        calculator.setExpression({id: "formula3",latex: "b=-1.2",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
        //滑条c
		calculator.setExpression({id: "formula4",latex: "c=1",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
        //函数1
        calculator.setExpression({id: "formula6",color: "#9BF23B",latex: "y=0\\left\\{x>0\\right\\}",lineStyle: "SOLID", hidden:true});
        //圆点
        calculator.setExpression({id: "point1",color: "#9BF23B",latex: "\\left(0,0\\right)",labelSize: "medium", label: "x+1>0", pointStyle: "POINT", hidden:true,showLabel: false});
        //函数区域
        calculator.setExpression({id: "formula5",color: "#6ECFFF",latex: "ax+by+c>0",hidden: true});
        //函数1
        calculator.setExpression({id: "formula1",color: "#6ECFFF",latex: "ax+by+c=0",lineStyle: "DASHED", hidden:false});
    }

    //设置初始状态
    function setCalcuState() {
        calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: true, settingsMenu: false, trace: false});
        calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y"});
    }

    //设置原点处公式
    function setLatexString(){
        var formula = '';
        var lastSign = '';
        if(sliderNumThree >= 0){
            lastSign = "+";
        }
        
        if(this.isOrigin){        
            (sliderNumThree >= 0)? formula = '0+0'+lastSign + sliderNumThree + '>0' : formula = '0+0'+lastSign + sliderNumThree + '<0';       
        }

        if(this.isXaxis){
            formula = sliderNumTwo + 'y' + lastSign + sliderNumThree + symbolSign + '0';
        }
        if(this.isYaxis){           
            formula = sliderNumOne + 'x' + lastSign + sliderNumThree + symbolSign + '0';
        }
        var latexString = katex.renderToString(formula, {
            throwOnError: false
        });
        calculator.setExpression({id: "point1",label: latexString});
    }

    //设置过原点直线的表现形式
    function setPointerLine(){
        var latex = '';
        if(isXaxis) {
            if(sliderNumTwo < 0 ){
                (symbolSign === '>' || symbolSign === '≥' )? latex = 'x=0\\left\\{y<0\\right\\}' : latex = 'x=0\\left\\{y>0\\right\\}';              
            } else {
                (symbolSign === '>' || symbolSign === '≥' )? latex = 'x=0\\left\\{y>0\\right\\}' : latex = 'x=0\\left\\{y<0\\right\\}';
            }
            calculator.setExpression({id: "formula6",latex: latex});
        }
        if(isYaxis) {
            if(sliderNumOne > 0){
                (symbolSign === '>' || symbolSign === '≥' )? latex = 'y=0\\left\\{x>0\\right\\}' : latex = 'y=0\\left\\{x<0\\right\\}';    
            } else {
                (symbolSign === '>' || symbolSign === '≥' )? latex = 'y=0\\left\\{x<0\\right\\}' : latex = 'y=0\\left\\{x>0\\right\\}';    
            } 
            calculator.setExpression({id: "formula6",latex: latex});
        }
    }
    
    //初始化函数点击事件
    function initEvent(){
        //代原点按钮
        formulaOriginBtn.addEventListener("click",()=>{ 
            isXaxis = isYaxis = false;
            resetButton();
            isOrigin = !isOrigin;
            setLatexString();
            setPointerLine();
            originDisable();
            if(isOrigin){
                formulaOriginBtn.classList.add('active');
                setTimeout(()=>{
                    calculator.setExpression({id:'formula5', hidden:false}); 
                }, 300);
            } else {
                calculator.setExpression({id:'formula5', hidden:true});  
            }
        });
        //固定x按钮
        formulaXaxisBtn.addEventListener("click",()=>{ 
            isOrigin = isYaxis = false;
            resetButton();
            isXaxis = !isXaxis;
            setLatexString();
            setPointerLine();
            originDisable();
            if(isXaxis){
                formulaXaxisBtn.classList.add('active');
                setTimeout(()=>{
                    calculator.setExpression({id:'formula5', hidden:false}); 
                }, 300);
            }else {
                calculator.setExpression({id:'formula5', hidden:true});  
            }
        });
        //固定y按钮
        formulaYaxisBtn.addEventListener("click",()=>{ 
            isOrigin = isXaxis = false;
            resetButton();
            isYaxis = !isYaxis;
            setLatexString();
            setPointerLine();
            originDisable();
            if(isYaxis){
                formulaYaxisBtn.classList.add('active');
                setTimeout(()=>{
                    calculator.setExpression({id:'formula5', hidden:false}); 
                }, 300);
            }else {
                calculator.setExpression({id:'formula5', hidden:true});  
            }
        });  
        //重置按钮
        resetBtn.addEventListener('click', ()=>{          
            sliderNumOne = 1;
            sliderNumTwo = -1.2;
            sliderNumThree = 1;
            isOrigin = isXaxis = isYaxis = false;
            sliderOne.setValue(sliderNumOne);
            sliderTwo.setValue(sliderNumTwo);
            sliderThree.setValue(sliderNumThree);
            setFormula();
            resetOptionImage();
            resetButton();
            symbolSelect.style.display = 'block';
            symbolOption.style.display = 'none';
            symbolSelect.children[0].setAttribute('src', 'image/relationOne.png');
            symbolOption.children[0].setAttribute('src', 'image/relationOneActive.png');
            
            calculator.setBlank();
            setCalcuState();
            createFormulaLine();
        });
        initSlectEvent();
    }
    //初始化下拉框按钮
    function initSlectEvent(){
        symbolSelect.addEventListener("click",()=>{
			symbolSelect.style.display = 'none';
			symbolOption.style.display = 'block';
		});
		symbolOption.children[0].addEventListener("click",()=>{	
            symbolSign = '>';
			symbolSelect.style.display = 'block';
            symbolOption.style.display = 'none';
            resetOptionImage();
            symbolSelect.children[0].setAttribute('src', 'image/relationOne.png');
            symbolOption.children[0].setAttribute('src', 'image/relationOneActive.png');
            calculator.setExpression({id:'formula5', latex: 'ax+by+c>0'}); 
            calculator.setExpression({id: "formula1",lineStyle: "DASHED"});	
            setLatexString();
            setPointerLine();           
		});
		symbolOption.children[1].addEventListener("click",()=>{
            symbolSign = '<';
			symbolSelect.style.display = 'block';
            symbolOption.style.display = 'none';
            resetOptionImage();
            symbolSelect.children[0].setAttribute('src', 'image/relationTwo.png');
            symbolOption.children[1].setAttribute('src', 'image/relationTwoActive.png');
            calculator.setExpression({id:'formula5', latex: 'ax+by+c<0'}); 
            calculator.setExpression({id: "formula1",lineStyle: "DASHED"});	
            setLatexString();
            setPointerLine();
		});
		symbolOption.children[2].addEventListener("click",()=>{
            symbolSign = '≥';
			symbolSelect.style.display = 'block';
            symbolOption.style.display = 'none';
            resetOptionImage();
            symbolSelect.children[0].setAttribute('src', 'image/relationThree.png');
            symbolOption.children[2].setAttribute('src', 'image/relationThreeActive.png');
            calculator.setExpression({id:'formula5', latex: 'ax+by+c\\ge0'}); 
            calculator.setExpression({id: "formula1",lineStyle: "SOLID"});	
            setLatexString();	
            setPointerLine();	
		});
		symbolOption.children[3].addEventListener("click",()=>{
            symbolSign = '≤';
            symbolSelect.style.display = 'block';
            symbolOption.style.display = 'none';
            resetOptionImage();
            symbolSelect.children[0].setAttribute('src', 'image/relationFour.png');
            symbolOption.children[3].setAttribute('src', 'image/relationFourActive.png');	
            calculator.setExpression({id:'formula5', latex: 'ax+by+c\\le0'}); 
            calculator.setExpression({id: "formula1",lineStyle: "SOLID"});
            setLatexString();
            setPointerLine();	
		});
    }

    function resetOptionImage(){
        symbolOption.children[0].setAttribute('src', 'image/relationOne.png');
        symbolOption.children[1].setAttribute('src', 'image/relationTwo.png');
        symbolOption.children[2].setAttribute('src', 'image/relationThree.png');
        symbolOption.children[3].setAttribute('src', 'image/relationFour.png');
    }

    function resetButton(){
        formulaOriginBtn.classList.remove('active');
        formulaXaxisBtn.classList.remove('active');
        formulaYaxisBtn.classList.remove('active');
        calculator.setExpression({id:'formula5', hidden:true}); 
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

    initTip();
    initButtonText();
    domReady(initDesmos);
    createFormulaLine();
    initSlider();
    initEvent();