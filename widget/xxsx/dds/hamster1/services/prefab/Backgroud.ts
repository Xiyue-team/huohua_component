import {fabric} from 'fabric';
import { SCREEN_CONFIG } from './Const';

/**
 * 初始化5层背景色
 */



/** 第一层 高度74 渐变 */
export const bg1 = (): fabric.Rect => {
  const bg1Rect = new fabric.Rect({
    left: 0,
    top: 0,
    width: SCREEN_CONFIG.windowWidth,
    height: 74,
    fill: '#FFFFFF',
    selectable: false
  });
  const option = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: bg1Rect.height,
    colorStops: {
      0: '#8DC3D2',
      1: '#6A94AC'
    }
  };
  //增加渐变
   bg1Rect.setGradient('fill', option);

  return bg1Rect;
};

/** 第二层 高度30 */
export const bg2 = (): fabric.Rect => {
  const bg2Rect = new fabric.Rect({
    left: 0,
    top: 74,
    width: SCREEN_CONFIG.windowWidth,
    height: 30,
    fill: '#8EC3D1',
    selectable: false
  });
  return bg2Rect;
};

/** 第三层 高度12 */
export const bg3 = (): fabric.Rect => {
  const bg3Rect = new fabric.Rect({
    left: 0,
    top: 74 + 30 ,
    width: SCREEN_CONFIG.windowWidth,
    height: 12,
    fill: '#C3EAF3',
    selectable: false
  });
  return bg3Rect;
};

/** 第四层 高度540 地鼠层，主操作区在层 */
export const bg4 = (): fabric.Rect => {
  const bg4Rect = new fabric.Rect({
    left: 0,
    top: 74 + 30 + 12,
    width: SCREEN_CONFIG.windowWidth,
    height: 540,
    fill: '#8ACEBD',
    selectable: false
  });
  return bg4Rect;
};


/** 第五层 高度20 */
export const bg5 = (): fabric.Rect => {
  const bg5Rect = new fabric.Rect({
    left: 0,
    top: 74 + 30 + 12 + 540,
    width: SCREEN_CONFIG.windowWidth,
    height: 20,
    fill: '#66AF9C',
    selectable: false
  });
  return bg5Rect;
};


