import {ViewController} from '../ViewController';
import * as resetImg from '../../../static/images/chongzhi.png';
const _ = require('lodash');

/**
 *
 * UI适配类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/25 14:15
 *
 */

export class UIAdapter {

    constructor() {

    }

    createElement() {
        this.createResetElement();
    }


    /**
     * 创建重置按钮
     */
    createResetElement() {
        if (document.getElementById('reset') || (window as any).viewOption.showReset === false) {
            return;
        }
        const resetEle =
                `<div class="button_border control_div_resetBtn" id="reset">
                        <img src="${resetImg}" >
                </div>`;
        document.body.insertAdjacentHTML('beforeend', resetEle);

        document.getElementById('reset').addEventListener('click', () => {
            ViewController.getInstance().viewHandler.reset();
        });
    }




}
