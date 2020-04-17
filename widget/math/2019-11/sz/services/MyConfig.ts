import {Context, Shape} from 'konva';

export class MyConfig {

    clockImg = {
        x: 0,
        y: 0,
        width: 550.8,
        height: 551.8,
    };

    middleImg = {
        x: 270.5,
        y: 271.6,
        width: 12,
        height: 13,
    };

    mzImg = {
        x: 264.6 + 11.9,
        y: 233.9 + 43.7,
        width: 15,
        height: 261,
        controlled: false,
        offset: {
            // offset的设置是使得围绕中心旋转
            x: 11.9,
            y: 43.7
        },
        hitFunc: (con: Context , shape: Shape ) => {},
    };

    mzRect = {
        x: 264.6,
        y: 233.9,
        width: 30,
        height: 261,
        fill: 'green',
        opacity: 0.01
    };
    fzImg = {
        x: 225.5 + 51,
        y: 270.9 + 8.7,
        width: 253,
        height: 29,
        controlled: false,
        offset: {
            // offset的设置是使得围绕中心旋转
            x: 51,
            y: 8.7
        }
    };
    fzRect = {
        x: 225.5 ,
        y: 268.9 ,
        width: 253,
        height: 40,
        fill: 'green',
        opacity: 0.01
    };

    zzgroup = {
        x:  276.5,
        y:  277.6,
        offset: {
            // offset的设置是使得围绕中心旋转
            x: 276.5,
            y: 277.6
        }
    };

    szImg = {
        x: 260.6 + 9.9 + 6,
        y: 132.9 + 138.7 + 6,
        width: 24,
        height: 191,
        controlled: false,
        offset: {
            // offset的设置是使得围绕中心旋转
            x: 9.9 + 6,
            y: 138.7 + 6
        }
    };
    szRect = {
        x: 260.6 ,
        y: 132.9  ,
        width: 30,
        height: 191,
        fill: 'green',
        opacity: 0.01
    };
}







