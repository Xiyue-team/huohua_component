/**
 *canvas元素基本配置类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/6/11 16:59
 */

// 球
export class BallConfig {
    // 球的面数
    static ballNoodles = 32;

    // 球的半径
    static ballRadius = 10;

    // 球心半径
    static ballCenterRadius = 0.2;
}

export class OneScene {
    // 横向线半径
    static line1Radius = 7.2;
    static line1y = 7;
    static rotationX = Math.PI / 2;

    // 纵向线半径
    static line2Radius = 10.05;
    static rotationY = Math.PI / 2;
    static xRotation = Math.PI / 2;

    // A点的位置
    static aSpotX = 0;
    static aSpotY = 7;
    static aSpotZ = 7.2;

    // 东经的位置
    static text1 = {
        x: 5,
        y: 15,
        z: 0,
    };

    // 北纬的位置
    static text2 = {
        x: 12.2,
        y: 12.2,
        z: -3,
    };
}

export class TwoScece {
    // O1点的位置
    static o1SpotX = 0;
    static o1SpotY = 7;
    static o1SpotZ = 0;

    // b1点的位置
    static b1SpotX = -7.2;
    static b1SpotY = 7;
    static b1SpotZ = 0;

    // b2点的位置
    static b2SpotX = 7.2;
    static b2SpotY = 7;
    static b2SpotZ = 0;

    // 灰色圆
    static circle1 = {
        radius: 10,
        noodles: 32,
        rotationY: -Math.PI / 5.1,
        rotationX: Math.PI / 4
    };

    // 红色圆
    static circle2 = {
        radius: 10,
        noodles: 32,
        rotationY: Math.PI / 5.2,
        rotationX: Math.PI / 4
    };

    // 扇形
    static sector1 = {
        radius: 1.5,
        noodles: 32,
    };

    // 圆弧
    static circleArc1 = {
        rotationX: Math.PI / 2,
        rotationz: Math.PI / 2,
        y: 7
    };

    // 圆弧b2 B1
    static circleArc2 = {
        rotationz: Math.PI
    };

    static rectangle = {
        width: 1.5,
        height: 1,
        rotationX: Math.PI / 2,
        y: 7,
        z: 0.5
    };
}

export class LetterPosition {
    // A点的位置
    static A = {
        x: 0.8,
        y: 7,
        z: 8,
    };

    // O点的位置
    static O = {
        x: 0,
        y: 0,
        z: 0,
    };

    // O1点的位置
    static O1 = {
        x: -1,
        y: 8.5,
        z: 0,
    };

    // B1点的位置
    static B1 = {
        x: -7.5,
        y: 8.5,
        z: 0,
    };

    // B2点的位置
    static B2 = {
        x: 7.5,
        y: 8.5,
        z: 0,
    };

    // R点的位置
    static R = {
        x: -5.2,
        y: 4,
        z: 0,
    };
}


