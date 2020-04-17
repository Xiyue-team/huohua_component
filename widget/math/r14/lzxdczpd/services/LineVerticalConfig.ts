import {Utils} from './Utils';


export class LineVerticalConfig {


    //初始倾斜角1
    static qxjAngle1 = 90 - 53.13;
    //初始倾斜角2
    static  qxjAngle2 = 90;

    static domWidth = document.getElementById('3dContainer');
    static domHeight = document.getElementById('3dContainer');

    static  text =  Utils.createText1('₁', 6, 78, 0, '#0094FF');
}
