/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/4/25 11:07
 */
export class D3Control {

    isShowCamera = false;
    option: any;
    deviceId: string;

    constructor(option: any) {
        this.option = option;
        if (location.hash.indexOf('camera=true') > -1) {
            this.isShowCamera = true;
            this.initCamera();
        }
        this.initCss();
        this.initElement();
        this.initEvent();
    }

    //插入css 样式
    loadCssCode(code: string) {
        const style = document.createElement('style');
        style.type = 'text/css';
        (style as any).rel = 'stylesheet';
        //for Chrome Firefox Opera Safari
        style.appendChild(document.createTextNode(code));
        //for IE
        //style.styleSheet.cssText = code;
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }

    //插入html代码
    loadHtml(html: string) {
        document.body.insertAdjacentHTML('beforeend', html);
    }


    //初始化按钮样式
    initCss() {
        /* 左侧切换背景样式 */
        let leftControlHeight;
        if (this.isShowCamera == true) {
            leftControlHeight = 186;
        } else {
            leftControlHeight = 124;
            this.loadCssCode(' .leftControl-div-bgBtn.camera{ display:none;} ');
        }

        this.loadCssCode(' .leftControl-div-bgGroup {position: absolute;z-index:99; top: calc(50% - ' + leftControlHeight / 2 + 'px);' +
            'left:20px;} ');
        this.loadCssCode(' .leftControl-div-bgBtn { width: 50px; height: 50px; cursor: pointer;  border-radius: 50%; ' +
            'box-shadow: 0 0 3px rgba(0,0,0,.5); margin-top: 12px; } ');
        this.loadCssCode(' .leftControl-div-bgBtn img{ width: 100%; height: 100%;} ');

        /*  loadCssCode(' .leftControl-div-bgBtn.white { background:rgba(255,255,255,0.3)} ');
         loadCssCode(' .leftControl-div-bgBtn.black { background:rgba(52,52,52,0.4) } '); */

        /* 右侧切换模型按钮 */
        this.loadCssCode(' .rightControl-div-modelBtnGroup {  position: absolute; right: 0; bottom: 40px; right:20px;z-index:99; } ');
        this.loadCssCode(' .rightControl-div-modelBtn { font-size: 16px; color: #fff; width: 80px; height: 34px; font-weight: 500; ' +
            'line-height: 33px; text-align: center; background: #a9a9a9; border: 2px solid #c5c5c5;' +
            'border-radius: 6px; cursor: pointer; margin: 12px 0; box-shadow: 0 0 1px rgba(0,0,0,.8); }');

        this.loadCssCode(' .rightControl-div-modelBtn.active { background: #6a6a6a; }');
        this.loadCssCode(' canvas { position:absolute ;z-index:1 }');
        this.loadCssCode('.cameraVideo { width: 100%;height: 100%;object-fit: fill;position:absolute;z-index:0}');

        this.loadCssCode('.event_disabled { pointer-events: none;cursor: default;opacity: 0.5;}');
    }

    //初始化按钮
    initElement() {
        //切换背景按钮
        this.loadHtml('<div class="leftControl-div-bgGroup">' +
            '<div class="leftControl-div-bgBtn camera" id="cameraBtn"><img src="' + this.option.tran + '" /></div>' +
            '<div class="leftControl-div-bgBtn white"><img src="' + this.option.white + '" /></div>' +
            '<div class="leftControl-div-bgBtn black"><img src="' + this.option.black + '" /></div></div>');

        if (this.isShowCamera == true) {
            document.getElementById('cameraBtn').style.display = 'block';
        }

        //切换模型按钮
        let btnHtml = '';
        for (let i = 0; i < this.option.modelBtnArry.length; i++) {
            const modelBtnObj = this.option.modelBtnArry[i];
            const active = modelBtnObj.hasOwnProperty('active') && modelBtnObj.active == true ? 'active' : '';
            btnHtml += '<div class="rightControl-div-modelBtn ' + active + '">' + modelBtnObj.title + '</div>';
        }

        this.loadHtml('<div class="rightControl-div-modelBtnGroup">' + btnHtml + '</div>');
        this.loadHtml('<video id="cameraVideo" autoplay="" class="cameraVideo" ></video>');
    }

    //移除选中样式
    removeModelActiveClass() {
        const changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');
        for (let i = 0; i < changeModelBtns.length; i++) {
            changeModelBtns[i].classList.remove('active');
        }
    }

    //增加模型按钮禁用样式
    addModelDisabledClass() {
        const changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');
        for (let i = 0; i < changeModelBtns.length; i++) {
            changeModelBtns[i].classList.add('event_disabled');
        }
    }

    //移除选中样式
    removeModelDisableClass() {
        const changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');
        for (let i = 0; i < changeModelBtns.length; i++) {
            changeModelBtns[i].classList.remove('event_disabled');
        }
    }


    //初始化按钮事件
    initEvent() {
        const showCameraBtn = document.querySelector('.leftControl-div-bgBtn.camera');
        const changeWhiteBtn = document.querySelector('.leftControl-div-bgBtn.white');
        const changeBlackBtn = document.querySelector('.leftControl-div-bgBtn.black');
        const changeModelBtns = document.querySelectorAll('.rightControl-div-modelBtn');

        //绑定切换背景按钮
        changeWhiteBtn.addEventListener('click', this.option.changeToWhiteCall);
        changeBlackBtn.addEventListener('click', this.option.changeToBlackCall);

        //绑定切换模型事件
        for (let i = 0; i < changeModelBtns.length; i++) {
            const modeBtnCall = this.option.modelBtnArry[i].changeModelCall;
            changeModelBtns[i].addEventListener('click', this.option.modelBtnArry[i].changeModelCall, false);
            changeModelBtns[i].addEventListener('click', (event) => {
                //先禁用点击
                this.removeModelActiveClass();
                this.addModelDisabledClass();
                //1.5秒后移除禁用
                setTimeout(() => {
                    this.removeModelDisableClass();
                }, 1500);
                (event.target as Element).classList.add('active');
            }, false);
        }

        //调用摄像头
        showCameraBtn.addEventListener('click', () => {
            //this.cameraController.setTransparent();
            this.option.showCamera();
            this.getUserMediaCamera();
        });
    }


    /* 调用摄像机方法 */


    getUserMediaCamera() {
        const constraints = {
            audio: false
        };

        if (this.deviceId) {
            (constraints as any).video = {deviceId: {exact: this.deviceId}};
        } else {
            (constraints as any).video = false;
        }
        //navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
        navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess).catch(this.handleError);
    }

    handleSuccess(stream: any) {
        (window as any).stream = stream;
        (document.getElementById('cameraVideo') as HTMLVideoElement).srcObject = stream;
    }

    handleError(error: any) {
        console.error('navigator.getUserMedia error: ', error);
    }

    initCamera() {
        /* if (!window.hasOwnProperty('cameraController')) {
             requestAnimationFrame(this.initCamera);
         } else {*/
        let index = 0;
        navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {

            for (let i = 0; i < deviceInfos.length; i++) {
                const deviceInfo = deviceInfos[i];
                //console.log(deviceInfo.kind)
                //screen-capture-recorder
                if (deviceInfo.kind != 'videoinput' || (deviceInfo.label && deviceInfo.label.indexOf('capture') > -1)) {
                    //console.log("continue")
                    continue;
                }

                //console.log(i + "--" + deviceInfo.kind + "--" + 'kind' in deviceInfo);
                //console.log (deviceInfo)
                index++;
                this.deviceId = deviceInfo.deviceId;
                if (deviceInfo.label.indexOf('back') >= 0 || index == 2) {
                    this.deviceId = deviceInfo.deviceId;

                }
            }
            this.getUserMediaCamera();
        }).catch(this.handleError);


        //}
        // document.getElementById('cameraBtn').style.display = 'block';
    }


}