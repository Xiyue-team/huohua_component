import {Loading} from './loading/Loading';
import {LoadingInterface} from './loading/LoadingInterface';
import * as tipImgSrc from '../../static/images/orientation.png';

/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/25 18:30
 */

export class SystemTip {

  /**
   * 依赖环境，由于客户端环境可能会自定义loading窗口，如果客户端环境中有loading实例则使用环境中加载框
   */
  private loading: LoadingInterface ;

    constructor() {
        if (window.hasOwnProperty('customLoading')) {
            this.loading = (window as any)['customLoading'];
            //(window as any)['customLoading'].show();
            //由于调用父窗口加载框时会有跨域问题，所以注释此代码
            /*} else if (window.top.hasOwnProperty('customLoading')) {
                (window.top as any)['customLoading'].show();*/
        } else {
            //显示框架内加载框
            this.loading = new Loading().initLoading();
            //(window as any)['customLoading'].show();
        }
    }



    /**
     * 当用户第一次横屏时显示提示信息
     */
    static showAdvice() {
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
            adviceDiv.style.opacity = '0';
            adviceDiv.style.display = 'none';

        }, 3000);

    }

    /**
     * 显示横屏提示，提示用户强制横屏
     */
    static showOrientationTip() {
        if (document.getElementById('orientationTip')) {
            document.getElementById('orientationTip').style.display = 'block';
            document.getElementById('maskContent').style.display = 'block';
        } else {
            this.initOrientationTip();
        }

    }

    /**
     * 创建手机端竖屏提示
     */
    static initOrientationTip() {
        if (document.getElementById('orientationTip')) {
            return;
        }

        //提示图片
        const tipImg = new Image();
        tipImg.src = tipImgSrc as any ;

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
        //maskDiv.appendChild(orienttatioDiv);

        document.body.appendChild(maskDiv);
        document.body.appendChild(orienttatioDiv);
    }


    /**
     * 隐藏横屏提示
     */
    static hideOrientationTip() {

        if (document.getElementById('orientationTip')) {
            document.getElementById('orientationTip').style.display = 'none';
            document.getElementById('maskContent').style.display = 'none';
        }

    }


  /**
   * 授权到期提示
   */
  static expiredTip(errorKey?: string) {
      if (document.getElementById('illegalTip')) {
        return;
      }
      let errorMsg = '';
      switch (errorKey) {
          case 'token':
              errorMsg = ',';
              break;
          case 'ua':
              errorMsg = '。';
              break;
          case 'engine':
              errorMsg = ';';
              break;
          case 'devtools':
              errorMsg = '.';
              break;
          default:
              errorMsg = '  ';
              break;
      }

      //const errorMsg  = errorKey ? `(error:${errorKey})</br>` : '';
      const tip = '<div id="illegalTip" ' +
        'style="position: absolute;z-index: 9999;width: 100%;height: 100%;background: #333333;margin: 0;padding: 0;font-size: 16px;' +
        'color: #E0E0E0;' +
        'text-align: center;' +
        'line-height: 24px;' +
        'display: -webkit-box;' +
        '-webkit-box-orient: horizontal;' +
        '-webkit-box-pack: center;' +
        '-webkit-box-align: center;">' +
        '教学资源使用授权已到期</br>' +
        '请联系火花学院咨询授权事宜。</br>（tel：400-086-6662 ' + errorMsg +
        ' email：<a href="mailto:huohuaS@huohuaschool.com">huohuaS@huohuaschool.com</a>）' +
        '</div>';
      const div = document.createElement('div');
      div.innerHTML = tip;
      document.body.appendChild(div);
    }



    showLoading() {
        this.loading.show();
    }

    hideLoading() {
        this.loading.hide();
    }

}
