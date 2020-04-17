var ModelControl = function (option) {
    let modelPosition   = {};
    var warpEnable      = false; 
    var longitudeEnable = false;

    //插入css 样式
    var loadCssCode = function (code) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        //for Chrome Firefox Opera Safari
        style.appendChild(document.createTextNode(code));
        //for IE
        //style.styleSheet.cssText = code;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    };

    //插入html代码
    var loadHtml = function (html) {
        document.body.insertAdjacentHTML('beforeend', html);
    };

    //初始化按钮样式
    var initCss = function () {
        /* 右侧切换模型按钮 */
        loadCssCode(' .rightControl-div-modelBtnGroup {  user-select: none;position: absolute; right: 0; bottom: 40px; right:20px;z-index:11; } ');
        loadCssCode(' .rightControl-div-modelBtn {user-select: none; font-size: 16px; color: #525252;  width: 102px; height: 40px; font-weight: 500;text-align: center; background: #FFFFFF;' +
            'border-radius: 21px; cursor: pointer; margin: 12px 0; box-shadow: 0 0 1px rgba(0,0,0,.8); }');
        loadCssCode(' .rightControl-div-modelBtn span{display:block; padding-top: 9px}');
        loadCssCode(' .rightControl-div-modelBtn:hover { background: #FAFAFA; }');
        loadCssCode(' .rightControl-div-modelBtn.active { background: #0199FF; color:  #FFFFFF;}');
        loadCssCode(' canvas { position:absolute ;z-index:10 }');
        loadCssCode('.show_btn { display:none;}');
        loadCssCode('.hide_btn { display:none;}');
        loadCssCode('.loading { width: 100%;height: 100%;object-fit: fill;position:absolute;z-index:1;display:block;background:#FFFFFF;}');
        loadCssCode('.event_disabled { pointer-events: none;cursor: default;opacity: 0.5;}');
  
        /*横屏提示语 提示用户使用pad或者pc查看*/
        loadCssCode('.advice_div_tip { position: absolute; top: 16px; width: 416px; height: 48px; background: rgba(250,250,250,0.92);' + 
            ' border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09); border-radius: 100px; font-size: 16px; color: #525252; text-align: center; line-height: 48px;' + 
            ' left: calc( 50% - 208px); transition: opacity 0.3s; opacity: 1; z-index: 10;}');
        loadCssCode('.title_text { position: absolute; left: 24px; top: 24px;color: #000000; font-size: 24px; z-index:11}');
        loadCssCode('.resetBtn { user-select: none;position: absolute; right: 24px; top: 24px;width:48px;height:40px; z-index:11;background: #FFFFFF;'+
            'border: 0 solid rgba(0,0,0,0.06);box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);border-radius: 6px;}');
        loadCssCode('.resetBtn:hover {cursor: pointer;}');
        loadCssCode('.mask_div { position: absolute; width: 100%;height: 100%;background: #F5F5F5;z-index: 12;}');
        loadCssCode('.orientation_div_tip {  position: absolute;top: calc( 50% - 99px );left: calc( 50% - 130px );width: 260px;height: 198px;background: rgba(250,250,250,0.92);'+
        'border: 1px solid rgba(0,0,0,0.06);box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09); border-radius: 12px;z-index: 12;}');
        loadCssCode('.resetBtn img{ width: 24px; margin-top: 8px;margin-left: 12px; }');
    };

    //初始化按钮
    var initElement = function () {
        //切换模型按钮
        var btnHtml = '';
        for (var i = 0; i < option.modelBtnArry.length; i++) {
            var modelBtnObj = option.modelBtnArry[i];
            var active = modelBtnObj.hasOwnProperty('active') && modelBtnObj.active == true ? 'active' : '';
            btnHtml += '<div class="rightControl-div-modelBtn ' + active + '"><span>' + modelBtnObj.title + '</span></div>';
        }

        loadHtml('<div class="rightControl-div-modelBtnGroup">' + btnHtml + '</div>');
        loadHtml('<div class="title_text">地球上的纬线与纬度</div>');
        loadHtml('<div class="resetBtn"><img src="./reset.png" ondragstart="return false;"></div>');
    };

    //移除选中样式
    var removeModelActiveClass = function () {
        var changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');
        for (var i = 0; i < changeModelBtns.length; i++) {
            changeModelBtns[i].classList.remove('active');
        }
    }

    //阻止事件冒泡
    var stopEvent = function (element,call) {
        element.addEventListener("click", (event) => {
            call(event);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    //初始化按钮事件
    var initEvent = function () {
        const changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');
        const resetBtn        = document.querySelector('.resetBtn');

        //绑定切换模型事件
        for (let i = 0; i < changeModelBtns.length; i++) {
            if(i != 0) {
                changeModelBtns[i].style.display = 'none';
            }
            if(i >= 2){
                stopEvent(changeModelBtns[i],(event) => {
                    //前一个索引,记录位置
                    if(window.orbitCamera){
                        modelPosition = {
                        startDistance: window.orbitCamera.distance,
                        startYaw: window.orbitCamera.yaw,
                        startPitch: window.orbitCamera.pitch,
                        startPivotPosition: window.orbitCamera.pivotPoint.clone()
                        }
                    }
                    option.modelBtnArry[i].changeModelCall();
                    changeModelBtns[2].classList.remove("active");
                    changeModelBtns[3].classList.remove("active");
                    changeModelBtns[i].classList.add("active");      
                }); 
            }
        }
        stopEvent(changeModelBtns[0],(event) => {
            warpEnable = !warpEnable;
            //前一个索引,记录位置
            if(window.orbitCamera){
                modelPosition = {
                startDistance: window.orbitCamera.distance,
                startYaw: window.orbitCamera.yaw,
                startPitch: window.orbitCamera.pitch,
                startPivotPosition: window.orbitCamera.pivotPoint.clone()
                }
            }
            if(warpEnable){
                changeModelBtns[1].style.display = 'block';
                changeModelBtns[0].classList.add("active");
                if(window.changeMaterial){
                    window.changeMaterial.changeMaterial(0);
                }  
            }else {
                longitudeEnable = false;
                option.modelBtnArry[0].changeModelCall();
                changeModelBtns[1].style.display = 'none';
                changeModelBtns[2].style.display = 'none';
                changeModelBtns[3].style.display = 'none';
                changeModelBtns[0].classList.remove("active");
                changeModelBtns[1].classList.remove("active");
                changeModelBtns[2].classList.remove("active");
                changeModelBtns[3].classList.remove("active");
            }
        }); 
        stopEvent(changeModelBtns[1],(event) => {
            longitudeEnable = !longitudeEnable;
            //前一个索引,记录位置
            if(window.orbitCamera){
                modelPosition = {
                startDistance: window.orbitCamera.distance,
                startYaw: window.orbitCamera.yaw,
                startPitch: window.orbitCamera.pitch,
                startPivotPosition: window.orbitCamera.pivotPoint.clone()
                }
            }
            if(longitudeEnable){
                changeModelBtns[2].style.display = 'block';
                changeModelBtns[3].style.display = 'block';
                changeModelBtns[1].classList.add("active");
                if(window.changeMaterial){
                    window.changeMaterial.changeMaterial(1);
                }
            }else {
                option.modelBtnArry[1].changeModelCall();
                changeModelBtns[2].classList.remove("active");
                changeModelBtns[3].classList.remove("active");
                changeModelBtns[2].style.display = 'none';
                changeModelBtns[3].style.display = 'none';
                changeModelBtns[1].classList.remove("active");
            }
        });
        stopEvent(resetBtn, () => {
            warpEnable = longitudeEnable = false;
            if(window.scenceId === 753067){
                window.orbitCamera.reset(0,0, 17);
            }
            option.modelBtnArry[0].changeModelCall();
            changeModelBtns[1].style.display = changeModelBtns[2].style.display = changeModelBtns[3].style.display = 'none';
            removeModelActiveClass();
        });
    };
    var initTip = function(){
        forceMobildLandscape();
    }
    //是否是火花播放器
	  var isHuohuaPlayer = function(){
        return navigator.userAgent.indexOf('huohua_app') > -1;
    }
	  /**
     * 创建手机端竖屏提示
     */
    var initOrientationTip = function() {
        if (document.getElementById('orientationTip')) {
            return;
        }

        //提示图片
        const tipImg = new Image();
        tipImg.src = './orientation.png' ;

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
    var showAdvice = function(){
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
    showOrientationTip = function() {
        if (document.getElementById('orientationTip')) {
            document.getElementById('orientationTip').style.display = 'block';
            document.getElementById('maskContent').style.display = 'block';
        } else {
            initOrientationTip();
        }
    }
    var hideOrientationTip = function() {
        if (document.getElementById('orientationTip')) {
            document.getElementById('orientationTip').style.display = 'none';
            document.getElementById('maskContent').style.display = 'none';
        }
    }
    var forceMobildLandscape = function() {
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
    var changeOrientationEvt = function() {
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
    //模型切换事件
    var modelChangeEvent = function (scenceId) {
        if(window.scenceId == scenceId){
            checkMaterial();
            return;
        }
        window.scenceId = scenceId;
        sceneController.changeScene(scenceId, ()=>{
            if ((warpEnable || longitudeEnable) && modelPosition) {
                window.orbitCamera.distance = modelPosition.startDistance;
                window.orbitCamera.yaw = modelPosition.startYaw;
                window.orbitCamera.pitch = modelPosition.startPitch;
                window.orbitCamera.pivotPoint = modelPosition.startPivotPosition;
            }
            if(scenceId === 753067){
                checkMaterial();
            }
        });
    }
    //判断材质切换
    var checkMaterial = function(){
        if(!warpEnable){
            window.changeMaterial.changeMaterial(2);
        } else if(!longitudeEnable){
            window.changeMaterial.changeMaterial(0);
        }
    }

    //处理playcanvas 内置的一些事件
    var handlePlaycanvas = function () {
        pc.MOUSEBUTTON_RIGHT = null
    }
    
    var init = function () {
        initCss();
        initElement();
        initEvent();
        handlePlaycanvas();
        initTip();
    };

    init();

    return {
        modelChangeEvent,modelChangeEvent,
        getModelMap: () => {
            return modelPosition;
        }
    };
};