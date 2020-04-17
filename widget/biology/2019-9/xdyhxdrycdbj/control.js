var ModelControl = function (option) {
    let modelPosition = {};

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
        loadCssCode(' .rightControl-div-modelBtnGroup {  user-select: none;position: absolute; bottom: 40px; right:20px;z-index:11; } ');
        loadCssCode('.button-primary {  display:list-item;width: 88px;background: #EBEBEB;border: 1px solid #EBEBEB;padding-left: 20px;padding-right: 20px;font-size: 14px;text-align: center;height: 42px;'+
            'line-height: 40px;margin: 12px 0;box-sizing: border-box;transition: background-color 0.3s,border-color 0.3s,color 0.3s; user-select:none;outline: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}');
        loadCssCode('.button-primary span{display: block;line-height: 40px;}');
        loadCssCode('.button-ellipse {border-radius: 21px;color: #525252;}');
        loadCssCode('.button-ellipse:hover {background-color: #FAFAFA;cursor: pointer;}');
        loadCssCode('.button-ellipse.active {color: #FFFFFF;border-color: #EBEBEB;}');

        loadCssCode(' canvas { position:absolute ;z-index:10 }');
        loadCssCode('.show_btn { display:none;}');
        loadCssCode('.hide_btn { display:none;}');
        loadCssCode('.loading { width: 100%;height: 100%;object-fit: fill;position:absolute;z-index:1;display:block;background:#FFFFFF;}');
        loadCssCode('.event_disabled { pointer-events: none;cursor: default;opacity: 0.5;}');
  
        /*横屏提示语*/
        /** 提示用户使用pad或者pc查看 **/
        loadCssCode('.advice_div_tip { position: absolute; top: 16px; width: 416px; height: 48px; background: rgba(250,250,250,0.92);' + 
            ' border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09); border-radius: 100px; font-size: 16px; color: #525252; text-align: center; line-height: 48px;' + 
            ' left: calc( 50% - 208px); transition: opacity 0.3s; opacity: 1; z-index: 10;}');
        loadCssCode('.title_text { position: absolute; left: 24px; top: 24px;color: #ffffff; font-size: 24px; z-index:11}');
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
            btnHtml += '<button class="button-primary button-ellipse ' + active + '"><span>' + modelBtnObj.title + '</span></button>';
        }

        loadHtml('<div class="rightControl-div-modelBtnGroup">' + btnHtml + '</div>');
        loadHtml('<div class="title_text">'+ window.lang.title + '</div>');
        loadHtml('<div class="resetBtn"><img src="./reset.png" ondragstart="return false;"></div>');
        document.title = window.lang.title;
    };
    //阻止事件冒泡
    var stopEvent = function (element,call) {
        element.addEventListener("click", (event) => {
            call(event);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    var initCommonButton = function(element){
        for(var index=0; index < element.children.length; index++){
            element.children[index].classList.remove('active');
            element.children[index].style.background = '#EBEBEB';
        }
    };

    //初始化按钮事件
    var initEvent = function () {
        const changeModelBtns   = document.querySelector('.rightControl-div-modelBtnGroup');
        const resetBtn          = document.querySelector('.resetBtn');
        var isMolar             = false;
        var isPremolar          = false;
        var isCanine            = false;
        var isIncisors          = false;
        changeModelBtns.style.bottom = 'calc(50% - '+ (changeModelBtns.clientHeight / 2) + 'px)';

        stopEvent(changeModelBtns.children[0],() => {   
            isMolar = !isMolar; 
            isPremolar = isCanine = isIncisors = false;
            initCommonButton(changeModelBtns);
            changeModelBtns.children[0].classList.add('active');
            changeModelBtns.children[0].style.background = '#4CC7F7';
            window.changeMaterial.setMaterial(0);
        }); 

        stopEvent(changeModelBtns.children[1],() => {   
            isPremolar = !isPremolar;
            isMolar = isCanine = isIncisors = false;
            initCommonButton(changeModelBtns);
            changeModelBtns.children[1].classList.add('active');
            changeModelBtns.children[1].style.background = '#E5D12E';
            window.changeMaterial.setMaterial(1);
        }); 


        stopEvent(changeModelBtns.children[2],() => {   
            isCanine = !isCanine;
            isPremolar = isMolar = isIncisors = false;
            initCommonButton(changeModelBtns);
            changeModelBtns.children[2].classList.add('active');
            changeModelBtns.children[2].style.background = '#FD3D64';
            window.changeMaterial.setMaterial(2);
        }); 

        stopEvent(changeModelBtns.children[3],() => {              
            isIncisors = !isIncisors;
            isPremolar = isCanine = isMolar = false;
            initCommonButton(changeModelBtns);
            changeModelBtns.children[3].classList.add('active');
            changeModelBtns.children[3].style.background = '#34B71C';
            window.changeMaterial.setMaterial(3);
        }); 

        stopEvent(resetBtn, () => {
            initCommonButton(changeModelBtns);
            isMolar     = false;
            isPremolar  = false;
            isCanine    = false;
            isIncisors  = false;
            window.changeMaterial.setMaterial(4);
            window.changeMaterial.reset();
        });

        if ( !navigator.userAgent.match(/.*Mobile.*/) || isHuohuaPlayer()) {
            return;
        }
        resetBtn.style.transform = 'scale(0.7)';
        resetBtn.style.right = resetBtn.style.top = '12px';
        changeModelBtns.style.transform = 'scale(0.7)';
        changeModelBtns.style.right = '0px';
        document.querySelector('.title_text').style.fontSize = '18px';
    };

    var initTip = function(){
        forceMobildLandscape();
    }
    //是否是火花播放器
	  var isHuohuaPlayer = function(){
        return navigator.userAgent.indexOf('huohua_app') > -1;
    }
    //创建手机端竖屏提示
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
        getModelMap: () => {
            return modelPosition;
        }
    };
};