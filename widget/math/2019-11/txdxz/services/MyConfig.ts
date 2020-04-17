export class MyConfig {
    backdelta = {
        points: [490, 272, 724, 406, 490, 406],
        fill: '#D0F4E9',
        closed: true,
    };

    frontdelta = {
        points: [490, 272, 724, 406, 490, 406],

        fill: '#4ADACD',
        closed: true,
    };



    arrowImg = {
        x: 471,
        y: 253,
        width: 38,
        height: 24,
        visible: true
    };

    topcircle = {
        x: 490,
        y: 272,
        radius: 5,
        point: true,
        fill: 'white'
    };

    leftcircle = {
        x: 490,
        y: 406,
        radius: 5,
        point: false,
        fill: 'white'
    };



    taggingtext = {
        x: 640,
        y: 445,
        text: window.env.browserInfo.lang.tagging + '0°',
        fontSize: 28,
        fontFamily: 'SourceHanSansSC-Medium',
        fill: '#FFFFFF',
        visible: false
    };

    marktext = {
        x: 430,
        y: 380,
        text: window.env.browserInfo.lang.mark ,
        fontSize: 28,
        fontFamily: 'SourceHanSansSC-Medium',
        fill: '#FFFFFF',
        visible: false

    };
}







