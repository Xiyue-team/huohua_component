export class RswzConfig {
    stageWidth = 885;
    stageHeight = 560;

    //小动物图片宽高
    animalImageWidth = 110;
    animalImageHeight = 110;

    animalImage = {
        x: 0,
        y: 0,
        width: this.animalImageWidth,
        height: this.animalImageHeight,
    };

    mbImageUp = {
        x: 0,
        y: 137,
        width: 885,
        height: 49,
    };

    mbImageMiddle = {
        x: 0,
        y: 314,
        width: 885,
        height: 49,
    };

    mbImageDown = {
        x: 0,
        y: 491,
        width: 885,
        height: 49,
    };

    selectTextTop = {
        x: 0,
        y: -30.3,
        width: this.animalImageWidth,
        fill: '#9D7725',
        fontSize: 28,
        fontFamily: 'Calibri',
        text: window.env.browserInfo.lang.top,
        align: 'center'
    };

    selectTextLeft = {
        x: - this.animalImageWidth - 6,
        y: 44,
        width: this.animalImageWidth,
        fill: '#9D7725',
        fontSize: 28,
        fontFamily: 'Calibri',
        text: window.env.browserInfo.lang.left,
        align: 'right'
    };

    selectTextBottom = {
        x: 0,
        y: 116,
        width: this.animalImageWidth,
        fill: '#9D7725',
        fontSize: 28,
        fontFamily: 'Calibri',
        text: window.env.browserInfo.lang.bottom,
        align: 'center'
    };

    selectTextRight = {
        x: 116,
        y: 44,
        width: this.animalImageWidth,
        fill: '#9D7725',
        fontSize: 28,
        fontFamily: 'Calibri',
        text: window.env.browserInfo.lang.right,
        align: 'left'
    };

    selectRect = {
        x: 0,
        y: 0,
        width: 110,
        height: 110,
        fill: '#FFFFFF',
        stroke: '#9D7725',
        cornerRadius: 5,
        strokeWidth: 3,
    };
}
