export class MyConfig {

    arrow = {
        x: 100,
        y: 338,
        points: [0, 0, 1020, 0],
        pointerLength: 20,
        pointerWidth: 20,
        fill: '#179DF5',
        stroke: '#179DF5',
        strokeWidth: 3
    };
    origincicle = {
        x: 600,
        y: 338,
        radius: 5,
        fill: 'white',
    };
    rightbigcircle = {
        x: 744,
        y: 338,
        radius: 15,
        fill: 'white',
        opacity: 0.5
    };
    rightsmallcircle = {
        x: 744,
        y: 338,
        radius: 5,
        fill: 'white',
    };
    leftbigcircle = {
        x: 456,
        y: 338,
        radius: 15,
        fill: 'white',
        opacity: 0.5
    };
    leftsmallcircle = {
        x: 456,
        y: 338,
        radius: 5,
        fill: 'white',
    };
    valueline = {
        points: [744, 338,
            456, 338],
        stroke: '#F5A623',
        strokeWidth: 3,
    };
    rightnumberframe = {
        points: [
            744, 338,
            734, 323,
            704, 323,
            704, 295,
            790, 295,
            790, 323,
            754, 323,
        ],
        fill: '#414141',
        closed: true,
        lineJoin: 'round',
        blurRadius: 40
    };

    leftnumberframe = {
        points: [
            456, 338,
            446, 323,
            416, 323,
            416, 295,
            502, 295,
            502, 323,
            466, 323,
        ],
        fill: '#414141',
        closed: true,
        lineJoin: 'round'
    };

    rightnumbertext = {
        x: 729 ,
        y: 298 ,
        text: '3.0',
        fontSize: 25,
        fill: '#FFFFFF',
    };
    leftnumbertext = {
        x: 435 ,
        y: 298 ,
        text: '-3.0',
        fontSize: 25,
        fill: '#FFFFFF',
    };
    rightImg = {
        x: 569 ,
        y: 414 ,
        width: 58,
        height: 38
    };
    leftImg = {
        x: 486 ,
        y: 414 ,
        width: 58,
        height: 38
    };
    comparevalueright = {
        x: 500 ,
        y: 425 ,
        text: '-3.0',
        fontSize: 18,
        fill: '#FFFFFF',
    };
    comparevalueleft = {
        x: 585 ,
        y: 425 ,
        text: '3.0',
        fontSize: 18,
        fill: '#FFFFFF',
    };
    comparewhite = {
        x: 550 ,
        y: 425 ,
        text: window.env.browserInfo.lang.tagging[0],
        fontSize: 16,
        fill: '#FFFFFF',
    };
    compareyellow = {
        x: 630.8 ,
        y: 425 ,
        text: window.env.browserInfo.lang.tagging[1],
        fontSize: 16,
        fill: '#F5A623',
    };
    leftlable = {
        x: 426,
        y: 290,
    };
    lefttag = {
        fill: '#414141',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        width: 60,
        height: 36,
        cornerRadius: 5,
        stroke: '#545454',
        strokeWidth: 1,
    };
    rightlable = {
        x: 714,
        y: 290,
    };
    righttag = {
        fill: '#414141',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        width: 60,
        height: 36,
        cornerRadius: 5,
        stroke: '#545454',
        strokeWidth: 1,
    };
}







