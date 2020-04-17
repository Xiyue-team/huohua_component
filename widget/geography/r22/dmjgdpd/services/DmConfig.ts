import {ScaleValue} from '../../../../../src/konva/template/ScaleValue';

export class DmConfig {

  scaleValue = new ScaleValue();

  scale = this.scaleValue.scale;

  bigMapConfig = {
      width :  660 * this.scale,
      height :  460 * this.scale,
      opacity : 1,
      x : 24 * this.scale,
      y : 74 * this.scale,
  };

  tipsFrameConfig = {
    width :  304 * this.scale,
    height :  72 * this.scale,
    opacity : 1,
    x : 699 * this.scale,
    y : 73 * this.scale,
  };


  // 左1
  leftOneConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 699 * this.scale,
    y : 168 * this.scale,
    draggable: true
  };

  // 左2
  leftTwoConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 699 * this.scale,
    y : 297 * this.scale,
    draggable: true
  };

  // 左3
  leftThreeConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 699 * this.scale,
    y : 427 * this.scale,
    draggable: true
  };

  // 右1
  rightOneConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 857 * this.scale,
    y : 168 * this.scale,
    draggable: true
  };

  // 右2
  rightTwoConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 857 * this.scale,
    y : 297 * this.scale,
    draggable: true
  };

  // 右3
  rightThreeConfig = {
    width :  144 * this.scale,
    height :  108 * this.scale,
    opacity : 1,
    x : 857 * this.scale,
    y : 427 * this.scale,
    draggable: true
  };

  // 右侧透明框1
  leftWhiteFrame1Config = {
    width :  154 * this.scale,
    height :  106 * this.scale,
    opacity : 0,
    x : 62 * this.scale,
    y : 120 * this.scale,
    // visible: false
  };

  // 右侧透明框2
  leftWhiteFrame2Config = {
    width :  154 * this.scale,
    height :  106 * this.scale,
    opacity : 0,
    x : 267 * this.scale,
    y : 151 * this.scale,
    // visible: false
  };

  // 右侧透明框3
  leftWhiteFrame3Config = {
    width :  154 * this.scale,
    height :  106 * this.scale,
    opacity : 0,
    x : 521 * this.scale,
    y : 148 * this.scale,
    // visible: false
  };

  // 右侧透明框4
  leftWhiteFrame4Config = {
    width :  142 * this.scale,
    height :  118 * this.scale,
    opacity : 0,
    rotation: 180,
    x : 233.5 * this.scale,
    y : 498 * this.scale,
    // visible: false
  };

  // 右侧透明框5
  leftWhiteFrame5Config = {
    width :  142 * this.scale,
    height :  118 * this.scale,
    opacity : 0,
    x : 233 * this.scale,
    y : 324 * this.scale,
    // visible: false
  };

  // 右侧透明框6
  leftWhiteFrame6Config = {
    width :  154 * this.scale,
    height :  106 * this.scale,
    opacity : 0,
    x : 462 * this.scale,
    y : 364 * this.scale,
    // visible: false
  };


  // 提示框
  leftTipsFrame1Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 62 * this.scale,
    y : 120 * this.scale,
    visible: false
  };

  leftTipsFrame2Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 279 * this.scale,
    y : 151 * this.scale,
    visible: false

  };

  leftTipsFrame3Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 533 * this.scale,
    y : 148 * this.scale,
    visible: false
  };

  leftTipsFrame4Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 89 * this.scale,
    y : 391 * this.scale,
    visible: false
  };

  leftTipsFrame5Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 233 * this.scale,
    y : 324 * this.scale,
    visible: false
  };

  leftTipsFrame6Config = {
    width :  142 * this.scale,
    height :  106 * this.scale,
    x : 474 * this.scale,
    y : 364 * this.scale,
    visible: false
  };

  line1Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    rotation: 90,
    x : 215 * this.scale,
    y : 207 * this.scale,
    visible: false
  };

  line2Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    x : 279.5 * this.scale,
    y : 223 * this.scale,
    visible: false
  };

  line3Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    x : 533.5 * this.scale,
    y : 234 * this.scale,
    visible: false
  };

  line4Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    rotation: 0,
    x : 153 * this.scale,
    y : 380 * this.scale,
    visible: false
  };

  line5Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    rotation: 0,
    x : 312 * this.scale,
    y : 429 * this.scale,
    visible: false
  };

  line6Config = {
    width :  2 * this.scale,
    height :  14 * this.scale,
    x : 475 * this.scale,
    y : 448 * this.scale,
    visible: false
  };

  labelPointBig1Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 214 * this.scale,
    y : 195 * this.scale,
  };

  labelPointBig2Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 242 * this.scale,
    y : 210 * this.scale,
  };

  labelPointBig3Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 493 * this.scale,
    y : 225 * this.scale,
  };

  labelPointBig4Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 140 * this.scale,
    y : 350 * this.scale,
  };

  labelPointBig5Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 300 * this.scale,
    y : 435 * this.scale,
  };

  labelPointBig6Config = {
    width :  28 * this.scale,
    height :  32 * this.scale,
    x : 436 * this.scale,
    y : 435 * this.scale,
  };

  textImage1 = {
    width :  173 * this.scale,
    height :  188 * this.scale,
    x : 39 * this.scale,
    y : 118 * this.scale,
    visible: false
  };

  textImage2 = {
    width :  173 * this.scale,
    height :  188 * this.scale,
    x : 271 * this.scale,
    y : 132 * this.scale,
    visible: false
  };

  textImage3 = {
    width :  173 * this.scale,
    height :  198 * this.scale,
    x : 318 * this.scale,
    y : 144 * this.scale,
    visible: false
  };

  textImage4 = {
    width :  173 * this.scale,
    height :  211 * this.scale,
    x : 169 * this.scale,
    y : 296 * this.scale,
    visible: false
  };

  textImage5 = {
    width :  168 * this.scale,
    height :  145 * this.scale,
    x : 230 * this.scale,
    y : 293 * this.scale,
    visible: false
  };

  textImage6 = {
    width :  173 * this.scale,
    height :  144 * this.scale,
    x : 465 * this.scale,
    y : 381 * this.scale,
    visible: false
  };
}


