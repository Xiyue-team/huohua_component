export class MyConfig {

    gridLine = {
        points: [0, 0],
        stroke: '#C0E4DC',
        strokeWidth: 0.75
    };

    currentPoint = {
        x: 0,
        y: 0,
        radius: 15,
        fill: '#FFFFFF',
        opacity: 0.36,
        stroke: '#000000',
        strokeWidth: 1,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffsetY: 1,
        shadowBlur: 4,
        dragBoundFunc: (pos: any) => ({x: 0, y: 0})
    };

    dashLineStart = {
        points: [0, 0],
        stroke: '#ECF5ED',
        strokeWidth: 3,
        dash: [5, 5]
    };
}







