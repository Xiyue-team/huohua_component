import { fabric } from 'fabric';

export class RightCradConfig {
  width = window.innerWidth;
  height = window.innerHeight;

  scale = this.width / this.height > 16 / 9 ? this.height / 675 : this.width / 1200;

  myCanvas = {
    width: document.getElementById('cardImage').clientWidth,
    height: document.getElementById('cardImage').clientHeight
  };

  threeThumbnail = {
    left: this.myCanvas.width / 2 - 342 * 0.5 * this.scale,
    top: this.myCanvas.height / 2 - 513 * 0.5 * this.scale,
    width: 342 * 2 ,
    height: 513 * 2 ,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    selectable: false,
  };

  cardImage = {
    left: 0,
    top: 0,
    width: 342 * 2,
    height: 513 * 2,
    scaleX: 0.5,
    scaleY: 0.5,
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.03)',
      offsetX: 2.5 * this.scale,
      offsetY: 5.5 * this.scale,
    }),
  };

  // 伊朗高原
  textTitle = {
    left: 20,
    top: 274,
    fill: '#1A1A1A',
    fontSize: 22,
    fontWeight: 'bold',
  };

  // 伊朗高原说明文字
  textContent = {
    left: 20,
    top: 316,
    fill: '#333333',
    fontSize: 17,
  };

  cardConfig = {
    scaleX: this.scale,
    scaleY: this.scale,
    originX: 'center',
    originY: 'center',
    left: this.myCanvas.width / 2,
    top: this.myCanvas.height / 2,
    selectable: false,
  };




}
