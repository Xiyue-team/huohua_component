// 当用户第一次横屏时显示提示信息
function showAdvice() {
    const adviceEle = document.getElementById('browserAdvice');
    if (adviceEle) {
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

function initTip() {
    forceMobildLandscape();
}

//是否是火花播放器
function isHuohuaPlayer() {
    return navigator.userAgent.indexOf('huohua_app') > -1;
}

//判断横竖屏
function getOrientation() {
    let orientation = '';
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (window.hasOwnProperty('orientation') === false) {
        if (width > height) {
            orientation = 'landscape';
        } else {
            orientation = 'portrait';
        }
    } else {
        const orientationNum = Number.parseInt(window.orientation);
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
    tipImg.src = 'images/orientation.png';

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
    if (!navigator.userAgent.match(/.*Mobile.*/) || isHuohuaPlayer()) {
        return;
    }

    const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(evt, (event) => {
        if (window.orientation === 90 || window.orientation === -90) {
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