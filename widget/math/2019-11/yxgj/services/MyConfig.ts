export class MyConfig {
  radius = 40;
  centerPointRadius = 3;

  deskImage = {
    x: 0,
    y: this.radius * 2,
    width: 960,
    height: 278,
  };

  originCoinImage = {
    x: 0,
    y: 0,
    width: this.radius * 2,
    height: this.radius * 2,
  };

  originCoinCenterPoint = {
    x: this.originCoinImage.x + this.originCoinImage.width / 2,
    y: this.originCoinImage.y + this.originCoinImage.height / 2,
    radius: this.centerPointRadius,
    fill: '#EA0000'
  };

  dragMoveCoinImage = {
    x: this.radius,
    y: this.radius,
    width: this.radius * 2,
    height: this.radius * 2,
    offset: {
      // offset的设置是使得围绕中心旋转
      x: this.radius,
      y: this.radius
    }
  };

  dragMoveCoinCenterPoint = {
    x: this.dragMoveCoinImage.x,
    y: this.dragMoveCoinImage.y,
    radius: this.centerPointRadius,
    fill: '#EA0000',
  };

  originCoinVertical = {
    points: [this.originCoinCenterPoint.x, this.originCoinCenterPoint.y,
      this.originCoinCenterPoint.x, this.originCoinCenterPoint.y + this.originCoinImage.height / 2],
    stroke: '#EA0000',
    strokeWidth: 2,
    hasBorders: true,
  };

  dragMoveCoinVertical = {
    points: [this.dragMoveCoinCenterPoint.x, this.dragMoveCoinCenterPoint.y,
      this.dragMoveCoinCenterPoint.x, this.dragMoveCoinCenterPoint.y + this.dragMoveCoinImage.height / 2],
    stroke: '#EA0000',
    strokeWidth: 2,
    hasBorders: true,
  };

  dashLine = {
    stroke: '#EA0000',
    strokeWidth: 2,
    dash: [5, 5]
  };


}







