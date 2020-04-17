export class MyConfig {
  radius = 40;
  centerPointRadius = 3;

  deskImage = {
    x: 0,
    y: this.radius * 2 + 100,
    width: 960,
    height: 278,
  };

  originTextImage = {
    x: 0,
    y: 100,
    width: this.radius * 2,
    height: this.radius * 2,
  };

  originTextCenterPoint = {
    x: this.originTextImage.x + this.originTextImage.width / 2,
    y: this.originTextImage.y + this.originTextImage.height / 2,
    radius: this.centerPointRadius,
    fill: '#EA0000'
  };

  dragMoveTextImage = {
    x: this.radius,
    y: this.radius + 100,
    width: this.radius * 2,
    height: this.radius * 2,
    offset: {
      // offset的设置是使得围绕中心旋转
      x: this.radius,
      y: this.radius
    }
  };

  dragMoveTextCenterPoint = {
    x: this.dragMoveTextImage.x,
    y: this.dragMoveTextImage.y,
    radius: this.centerPointRadius,
    fill: '#EA0000',
  };

  originTextVertical = {
    points: [this.originTextCenterPoint.x, this.originTextCenterPoint.y,
      this.originTextCenterPoint.x, this.originTextCenterPoint.y + this.originTextImage.height / 2],
    stroke: '#EA0000',
    strokeWidth: 2,
    hasBorders: true,
  };

  dragMoveTextVertical = {
    points: [this.dragMoveTextCenterPoint.x, this.dragMoveTextCenterPoint.y,
      this.dragMoveTextCenterPoint.x, this.dragMoveTextCenterPoint.y + this.dragMoveTextImage.height / 2],
    stroke: '#EA0000',
    strokeWidth: 2,
    hasBorders: true,
  };
}







