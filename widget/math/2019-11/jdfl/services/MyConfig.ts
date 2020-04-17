export class MyConfig {
    sjbImg = {
        x: 500,
        y: 25,
        width: 273.1,
        height: 461.7,

    };
    animationline = {
        points: [500, 486.7, 624.7, 362.3],

        stroke: '#FF8B11',
        strokeWidth: 4,
        lineCap: 'round',

    };
    whitecircle = {
        x: 626,
        y: 360.7,
        radius: 7,
        fill: '#FFFFFF',
        opacity: 0.54,
    };
    orangecircle = {
        x: 626,
        y: 360.7,
        radius: 4,
        fill: '#FF8B11',
    };
    middlecircle = {
        x: 500,
        y: 486.7,
        radius: 4,
        fill: '#7012D4',
    };
    anglewedge = {
        x: 500,
        y: 486.7,
        radius: 20,
        angle: -45,
        stroke: '#9148DE',
        strokeWidth: 2,
        rotation: 0,
        clockwise: true
    };
    staticline = {
        points: [500, 486.7, 710, 486.7],
        stroke: '#FF8B11',
        strokeWidth: 4,
        lineCap: 'round',
    };
    angletext = {
        x: 543.5,
        y: 451,
        text: '45°',
        fontSize: 30,
        fontFamily: 'SourceHanSansSC-Medium',
        fill: '#9148DE '
    };
    judgetext = {
        x: 788.5,
        y: 198,
        text: window.env.browserInfo.lang.angle[0],
        fontSize: 30,
        fontFamily: 'SourceHanSansSC-Medium',
        fill: '#FFFFFF  ',
        visible: true
    };
    rightangleline = {
        points: [500, 472.7, 514, 472.7, 514, 486.7],
        stroke: '#9148DE',
        strokeWidth: 2,
        visible: false
    };
    movegroup = {
        x: 0 + 500,
        y: 0 + 486.7,
        offset: {
            // offset的设置是使得围绕中心旋转
            x: 500,
            y: 486.7
        },
        controlled: false,
    };
    opacitycircle = {
        x: 626,
        y: 360.7,
        radius: 14,
        fill: '#FFFFFF',
        opacity: 0.01,
    };
    moverect = {
        points: [471.5, 458.2, 528.5, 515.2, 683.2, 360.8, 626.2, 303.8],
        fill: '#00D2FF',
        opacity: 0.01,
        closed: true
    };
}







