export class D3Control {
    isShowCamera = false;
    option: any;
    deviceId: string;

    constructor(option: any) {
        this.option = option;
        if (location.hash.indexOf('camera=true') > -1) {
            this.initCamera();
            this.initCss();
            this.initElement();
            this.initEvent();
        } else {
            this.option.noCameraCall();
        }
    }

    //插入css 样式
    loadCssCode(code: string) {
        const style = document.createElement('style');
        style.type = 'text/css';
        (style as any).rel = 'stylesheet';
        style.appendChild(document.createTextNode(code));
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
        const leftControlHeight = 124;
        this.loadCssCode(' .leftControl-div-bgGroup {position: absolute;z-index:99; top: calc(50% - ' + leftControlHeight / 2 + 'px);' +
            'left:20px;} ');
        this.loadCssCode(' .leftControl-div-bgBtn { width: 50px; height: 50px; cursor: pointer;  border-radius: 50%; ' +
            'box-shadow: 0 0 3px rgba(0,0,0,.5); margin-top: 12px; } ');
        this.loadCssCode(' .leftControl-div-bgBtn img{ width: 100%; height: 100%;} ');
    }

    //初始化按钮
    initElement() {
        //切换背景按钮
        this.loadHtml('<div class="leftControl-div-bgGroup">' +
            '<div class="leftControl-div-bgBtn camera" id="cameraBtn"><img src="' + this.option.tran + '" /></div>' +
            '<div class="leftControl-div-bgBtn black"><img src="' + this.option.black + '" /></div></div>');
    }

    //初始化按钮事件
    initEvent() {
        const showCameraBtn = document.querySelector('.leftControl-div-bgBtn.camera');
        const changeBlackBtn = document.querySelector('.leftControl-div-bgBtn.black');
        //绑定切换背景按钮
        changeBlackBtn.addEventListener('click', this.option.changeToBlackCall);
        //调用摄像头
        showCameraBtn.addEventListener('click', () => {
            this.option.showCamera();
        });
    }

    handleError(error: any) {
        this.option.noCameraCall();
        console.error('navigator.getUserMedia error: ', error);
    }

    initCamera() {
        let index = 0;
        navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
            for (let i = 0; i < deviceInfos.length; i++) {
                const deviceInfo = deviceInfos[i];
                if (deviceInfo.kind !== 'videoinput' ||
                    deviceInfo.kind !== 'videoinput' ||
                    (deviceInfo.label && deviceInfo.label.indexOf('capture') > -1)) {
                    continue;
                }
                index++;
                this.deviceId = deviceInfo.deviceId;
                if (deviceInfo.label.indexOf('back') >= 0 || index === 2) {
                    this.deviceId = deviceInfo.deviceId;
                }
                this.isShowCamera = true;
            }
            if (this.isShowCamera) {
                this.option.getUserMediaCameraCall(this.deviceId);
            } else {
                this.option.noCameraCall();
            }
        }).catch(this.handleError);
    }
}
