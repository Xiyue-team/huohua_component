
     (function() {
        'use strict';   
        var resetBtn            = document.querySelector(".resetBtn_div");
        var leftContainer       = document.querySelector('.leftContainer');
        var topicContent        = document.querySelector(".topicContent");
        var rightButtonLayout   = document.querySelector(".rightButtonLayout");
        var desmosElement       = document.getElementById('calculator');
        var calculator          = Desmos.GraphingCalculator(desmosElement);
        var isShow = false;
        var vueElement;
        var switchDataText;

        function domReady(){
            if(!window.innerHeight || document.innerHeight === 0){           
                window.requestAnimationFrame(initStyle);  
            } else {
                document.querySelector('.loading').style.display = 'none';
                if(navigator.userAgent.match(/.*Mobile.*/)){
                    calculator.updateSettings({ fontSize: Desmos.FontSizes.SMALL });
                }   
                initStyle();
            }
        };

        
        function initStyle(){
            //初始化题目的高度
            var height = window.innerWidth * (161 / 1200 );
            topicContent.children[0].style.height = height + 'px';   
            topicContent.children[0].style.marginTop = window.innerHeight * 0.3 + 'px'; 
            //初始化解析模板每张图片的高度
            for(var index=0; index < leftContainer.children.length - 1; index++){
                leftContainer.children[index].style.height = window.innerWidth * 0.38 * (270 / 460) + 'px';
                leftContainer.children[index].style.marginTop = window.innerHeight * 0.25 + 'px';
            }            
        }

        function initSwitch(){
            vueElement = new Vue({
                el: '#app',
                data: {
                    switchOption:{
                        datas: [switchDataText[0], switchDataText[1]]
                    },
                    switchModel: switchDataText[0],
                    vertical:false
                },
                watch: {
                    switchModel : function(value){
                        for(var index=0; index<switchDataText.length; index++){
                            if(switchDataText[index] === value){
                                leftContainer.children[index].style.display = 'block';
                            } else {
                                leftContainer.children[index].style.display = 'none';
                            }
                        }
                        switch (value){
                            case switchDataText[0]:
                                calculator.setExpression({id: "function4",hidden:true});
                                calculator.setExpression({id: "functionPoint4",showLabel: false});
                                calculator.setExpression({id: "point1",hidden:true,showLabel: false});
                                calculator.setExpression({id: "point4",hidden:true});
                                dragContentEnable(false);
                                break;
                            case switchDataText[1]: 
                                calculator.setExpression({id: "function4",hidden:false});
                                calculator.setExpression({id: "functionPoint4",showLabel: true});
                                calculator.setExpression({id: "point1",hidden:false,showLabel: true});
                                calculator.setExpression({id: "point4",hidden:false});
                                window.requestAnimationFrame(positionLabels);
                                dragContentEnable(true);
                                break;
                        }
                    }
                }
            })
        }

        //初始化按钮的文字（为国际化做准备，动态修改文字）
        function initButtonText(){ 
            document.title = window.lang.title;
            topicContent.children[1].innerHTML = window.lang.startButton;
            switchDataText = window.lang.stepText;
            rightButtonLayout.children[0].innerHTML = window.lang.areaButton;
            rightButtonLayout.children[2].innerHTML = katex.renderToString('\\frac yx', {throwOnError: false});
        }

        //创建函数线
        function createFormulaLine() {  
            //滑条
            calculator.setExpression({id: "slider1",latex: "z = 0",sliderBounds: {step: "0.1" }});
        
            //函数区域1
            calculator.setExpression({id: "area1",color: "#FFD621",latex: "x-1\\ge0",hidden: false,});
            //函数区域2
            calculator.setExpression({id: "area2",color: "#00AAFF",latex: "x-y\\le0",hidden: false,});
            //函数区域3
            calculator.setExpression({id: "area3",color: "#9BF23B",latex: "x+y-4\\le0",hidden: false,});
            //函数区域4
            calculator.setExpression({id: "area4",color: "#ffffff",latex: "\\operatorname{polygon}\\left(\\left(1,3\\right),\\left(1,1\\right),\\left(2,2\\right)\\right)",});
        
            //函数1
            calculator.setExpression({id: "function1",color: "#FFD621",latex: "x-1=0",lineStyle: "SOLID", hidden:false});
            //函数2
            calculator.setExpression({id: "function2",color: "#00AAFF",latex: "x-y=0",lineStyle: "SOLID", hidden:false});
            //函数3
            calculator.setExpression({id: "function3",color: "#9BF23B",latex: "x+y-4=0",lineStyle: "SOLID", hidden:false});
            //函数4
            calculator.setExpression({id: "function4",color: "#FF5A5A",latex: "y=zx",lineStyle: "DASHED", hidden:true});

            //公式点1
            calculator.setExpression({id: "functionPoint1",color: "#FFD621",latex: "\\left(2,5\\right)",label:katex.renderToString('x-1=0', {throwOnError: false}),hidden:true,showLabel: true});
            //公式点2
            calculator.setExpression({id: "functionPoint2",color: "#00AAFF",latex: "\\left(5,6\\right)",label:katex.renderToString('x-y=0', {throwOnError: false}),hidden:true,showLabel: true});
            //公式点3
            calculator.setExpression({id: "functionPoint3",color: "#9BF23B",latex: "\\left(5,-2\\right)",label:katex.renderToString('x+y-4=0', {throwOnError: false}),hidden:true,showLabel: true});
           
            //圆点1
            calculator.setExpression({id: "point1",color: "#fff",latex: "\\left(1,3\\right)",label:katex.renderToString('A', {throwOnError: false}),hidden:true,showLabel: false});
            //圆点4
            calculator.setExpression({id: "point4",color: "#fff",latex: "\\left(0.5,0.5z\\right)",hidden:true,showLabel: false});
            
            window.requestAnimationFrame(positionLabels);
            checkSliderNumber();
            
        }

        function checkSliderNumber(){
            var sliderObject = calculator.HelperExpression({latex: "z"});
            sliderObject.observe("numericValue", function() {
                //为了突出答案，做吸附显示    
                if(sliderObject.numericValue > 2.5 && sliderObject.numericValue < 3.5){
                    calculator.setExpression({id: "slider1",latex: "z = 3"});
                }
                document.querySelector('.bottomcontrol').innerHTML = sliderObject.numericValue;
            });
        }

        //设置初始状态
        function setCalcuState() {
            calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: false, settingsMenu: false, trace: false});
            calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y"});
        }

        function positionLabels() {
            var movePoint = document.querySelector('.dcg-movable-point');
            if(movePoint){
                movePoint.innerHTML = `<div class="dcg-background" style="opacity:1"><img src='image/drag.png' style='width:100%;height:100%'/></div>`;
            } else {
                window.requestAnimationFrame(positionLabels);  
            }   
        }
        function dragContentEnable(enable) {
            rightButtonLayout.children[1].style.display = enable? 'block' : 'none';
            rightButtonLayout.children[2].style.display = enable? 'block' : 'none';
            rightButtonLayout.children[3].style.display = enable? 'block' : 'none';
        }


        //初始化按钮点击事件
        function initEvent(){
            initSwitch();
            //点击开始
            topicContent.children[1].addEventListener("click",()=>{ 
                topicContent.style.display = 'none';
            });
            //显示阴影
            rightButtonLayout.children[0].addEventListener('click', () =>{
                isShow = !isShow;
                isShow?  rightButtonLayout.children[0].classList.add('active') : rightButtonLayout.children[0].classList.remove('active');
                setShaderDisable(isShow);
            });
            //重置
            resetBtn.addEventListener('click', ()=>{ 
                topicContent.style.display = 'block';         
                isShow = false;
                rightButtonLayout.children[0].classList.remove('active');
                vueElement.switchModel = switchDataText[0];   
                calculator.setBlank();
                setCalcuState();
                createFormulaLine();
                dragContentEnable(false);
            });
            //监听drag按钮超出屏幕
            calculator.observe('graphpaperBounds', ()=>{
                if(!document.querySelector('.dcg-movable-point')){
                    positionLabels()
                };  
            });
        }
        function setShaderDisable(disable){
            //函数区域1
            calculator.setExpression({id: "area1",hidden: disable});
            //函数区域2
            calculator.setExpression({id: "area2",hidden: disable});
            //函数区域3
            calculator.setExpression({id: "area3",hidden: disable});
        }

        function initTip(){
            forceMobildLandscape();
            window.addEventListener('resize', ()=>{
                domReady();
            })
        }
        //是否是火花播放器
        function isHuohuaPlayer(){
            return navigator.userAgent.indexOf('huohua_app') > -1;
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
        createFormulaLine();
        initButtonText();
        domReady();
        initEvent();
    })();
