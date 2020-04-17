/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/10 15:05
 */
import {LoadingInterface} from './LoadingInterface';
import * as loadingPng from '../../../static/images/ic_loading.png';


export class CommonLoading implements LoadingInterface {


    constructor() {
        //this.init();
    }

    hide(): void {
        document.getElementById('loading').style.display = 'none';
    }

    init(): void {
        console.log(loadingPng);
        document.getElementById('loading').innerHTML = `<div class='ui-flex justify-center center' style='width: 100%;height: 100%;'>
<img src='${loadingPng}' class='common_loading_img rotate_animate'/></div>`;
    }

    show(): void {
        //document.getElementById('loading').style.display = 'block';
    }

    isShown(): boolean {
        return false;
    }


    destory(): void {

    }

}
