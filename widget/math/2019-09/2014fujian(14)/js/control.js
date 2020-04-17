
    (function() {
        'use strict';
        var resetBtn            = document.querySelector(".resetBtn_div");
        var leftContainer       = document.querySelector('.leftContainer');
        var topicContent        = document.querySelector(".topicContent");
        var rightButtonLayout   = document.querySelector(".rightButtonLayout");
        var desmosElement       = document.getElementById('calculator');
        var calculator          = Desmos.GraphingCalculator(desmosElement);
        var sliderNumOne = -3.5;
        var sliderNumTwo = 1;
        var isShow = false;
        var sliderOne;
        var sliderTwo;
        var vueElement;
        var switchDataText;

        function domReady(callback){
            if ( !window.innerHeight || document.innerHeight === 0) {
                requestAnimationFrame(() => {
                    domReady(callback);
                });
                return;
            }
            setTimeout(() => {
                callback();
            }, 10);
        };
        
        function initStyle(){
            //初始化题目的高度
            var height = window.innerWidth * (275 / 1200 );
            topicContent.children[0].style.height = height + 'px';   
            topicContent.children[0].style.marginTop = window.innerHeight * 0.27 + 'px'; 
            //初始化解析模板每张图片的高度
            for(var index=0; index < leftContainer.children.length - 1; index++){
                leftContainer.children[index].style.height = window.innerWidth * 0.38 * (301 / 460) + 'px';
                leftContainer.children[index].style.marginTop = window.innerHeight * 0.2 + 'px';
            } 
            adapterDesmos();
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
                        switch (value) {
                            case switchDataText[1]:
                                leftContainer.children[1].style.display = 'block';
                                leftContainer.children[0].style.display = 'none';
                                break;
                            default: 
                                leftContainer.children[0].style.display = 'block';
                                leftContainer.children[1].style.display = 'none';
                                break;
                        }
                    }
                }
            })
        }

        function adapterDesmos(){
            //desmos文字适配小屏尺寸
            if(window.innerHeight < 610 || window.innerWidth < 610){   
                var state = calculator.getState();
                for(var index=9; index< calculator.getExpressions().length; index++){     
                    state.expressions.list[index].labelSize = 'small';               
                }
                calculator.setState(state);
            }
        }

        //初始化滑动条
        function initSlider(){
            sliderOne = new slider({
                container:"#slider_one",
                start : -10,
                end:10,
                step:0.1,
                value:-3.5,
                showValue:true,
                ondrag:(obj)=>{
                    sliderNumOne = obj.values[0];
                    var string = 'a=' + obj.values[0];
                    calculator.setExpression({id:'slider1', latex: string});
                    setCirclePoint();
                },
                fixValue:true,
            });

            sliderTwo = new slider({
                container:"#slider_two",
                start : -10,
                end:10,
                step:0.1,
                value:1,
                showValue:true,
                ondrag:(obj)=>{
                    sliderNumTwo = obj.values[0];
                    var string = 'b=' + obj.values[0];
                    calculator.setExpression({id:'slider2', latex: string});
                    setCirclePoint();
                },
                fixValue:true,
            });
        }

        //初始化按钮的文字（为国际化做准备，动态修改文字）
        function initButtonText(){ 
            document.title = window.lang.title;
            topicContent.children[1].innerHTML = window.lang.startButton;
            switchDataText = window.lang.stepText;
            rightButtonLayout.children[0].innerHTML = window.lang.areaButton;
        }
        
        function initDesmos(){
            setCalcuState();
            createFormulaLine();
        }

        //创建函数线
        function createFormulaLine() {  
            //滑条
            calculator.setExpression({id: "slider1",latex: "a=-3.5",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
            //滑条
            calculator.setExpression({id: "slider2",latex: "b=1",sliderBounds: { min: "-10", max: "10", step: "0.1" }});
        
            //函数区域1
            calculator.setExpression({id: "area1",color: "#00AAFF",latex: "x+y-7\\le0",hidden: false,});
            //函数区域2
            calculator.setExpression({id: "area2",color: "#8BC052",latex: "x-y+7\\ge0",hidden: false,});
            //函数区域3
            calculator.setExpression({id: "area3",color: "#FFD621",latex: "y\\ge0",hidden: false,});
            //函数区域4
            calculator.setExpression({id: "area4",color: "#ffffff",latex: "\\operatorname{polygon}\\left(\\left(-7,0\\right),\\left(0,7\\right),\\left(7,0\\right)\\right)",});
        
            //函数1
            calculator.setExpression({id: "function1",color: "#00AAFF",latex: "x+y-7=0",lineStyle: "SOLID", hidden:false});
            //函数2
            calculator.setExpression({id: "function2",color: "#8BC052",latex: "x-y+7=0",lineStyle: "SOLID", hidden:false});
            //函数3
            calculator.setExpression({id: "function3",color: "#FFD621",latex: "y=0",lineStyle: "SOLID", hidden:false});
            //函数4
            calculator.setExpression({id: "function4",color: "#FF5A5A",latex: "\\left(a-x\\right)^2+\\left(b-y\\right)^2=b^2",lineStyle: "SOLID", hidden:false});

            //公式点1
            calculator.setExpression({id: "functionPoint1",color: "#00AAFF",latex: "\\left(5,4\\right)",label:katex.renderToString('x+y=7', {throwOnError: false}),hidden:true,showLabel: true});
            //公式点2
            calculator.setExpression({id: "functionPoint2",color: "#8BC052",latex: "\\left(-5,4\\right)",label:katex.renderToString('x-y=-7', {throwOnError: false}),hidden:true,showLabel: true});
            //公式点3
            calculator.setExpression({id: "functionPoint3",color: "#FFD621",latex: "\\left(-2,-0.6\\right)",label:katex.renderToString('y=0', {throwOnError: false}),hidden:true,showLabel: true});
        
            //圆点1
            calculator.setExpression({id: "point1",color: "#fff",latex: "\\left(-7,0\\right)",label:katex.renderToString('M(-7,0)', {throwOnError: false}),hidden:false,showLabel: true});
            //圆点2
            calculator.setExpression({id: "point2",color: "#fff",latex: "\\left(0,7\\right)",label:katex.renderToString('D(0,7)', {throwOnError: false}),hidden:false,showLabel: true});
            //圆点3
            calculator.setExpression({id: "point3",color: "#fff",latex: "\\left(7,0\\right)",label:katex.renderToString('N(7,0)', {throwOnError: false}),hidden:false,showLabel: true});
            //圆心
            calculator.setExpression({id: "point4",color: "#fff",latex: "\\left(-3.5,1\\right)",label:katex.renderToString('C(-3.5,1)', {throwOnError: false}),hidden:false,showLabel: true});
        }

        function setCirclePoint() {
            var latexString = "\\left(" + sliderNumOne+"," + sliderNumTwo +"\\right)";
            var labelString = katex.renderToString('C('+ sliderNumOne+ ',' + sliderNumTwo + ')', {throwOnError: false});
             //圆心
             calculator.setExpression({id: "point4",latex: latexString,label:labelString});
        }

        //设置初始状态
        function setCalcuState() {
            calculator.updateSettings({ language: 'zh-CN', expressions:false, keypad: false, lockViewport: false, pointsOfInterest: false, settingsMenu: false, trace: false});
            calculator.updateSettings({ showGrid: false, xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE, yAxisArrowMode : Desmos.AxisArrowModes.POSITIVE, xAxisNumbers: true, yAxisNumbers: true, xAxisLabel: "x",yAxisLabel: "y"});
        }
    
        //初始化按钮点击事件
        function initEvent(){
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
                sliderNumOne = -3.5;
                sliderNumTwo = 1;
                isShow = false;
                sliderOne.setValue(sliderNumOne);
                sliderTwo.setValue(sliderNumTwo);
                rightButtonLayout.children[0].classList.remove('active');
                vueElement.switchModel = switchDataText[0];   
                calculator.setBlank();
                setCalcuState();
                createFormulaLine();
                adapterDesmos();
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
        initDesmos();
        initButtonText();
        domReady(initStyle);
        initSlider();
        initEvent();
})();