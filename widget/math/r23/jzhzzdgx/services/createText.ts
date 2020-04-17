import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class CreateText {

  createText(text: string, scale: number, x: number, y: number) {
    const textGroup = new THREE.Group();

    let height = 0;

    for (let index = 0, jk = text.length; index < jk; index++) {
      // 判断是否是字母
      if (/^[a-zA-Z]+$/.test(text[index])) {
        const wenzi = ThreeUtil.createNewRomanText(text[index], this.getTextX(textGroup), 0, 0, '#ffffff', 1);
        textGroup.add(wenzi);
        height = wenzi.width;
      } else if ( text[index].replace(/[^0-9]/ig, '')) {
        // 判断是否是数字
        const wenzi = ThreeUtil.createNormalText(text[index], this.getTextX(textGroup), -height, 0, '#ffffff', 0.5);
        textGroup.add(wenzi);
      } else {
        const wenzi = ThreeUtil.createNormalText(text[index], this.getTextX(textGroup), 0, 0, '#ffffff', 1);
        textGroup.add(wenzi);
        height = wenzi.width;
      }
    }
    textGroup.scale.set(scale, scale, scale);
    textGroup.position.set(x, y, 0);
    return textGroup;
  }


  // 计算文字的x坐标
  private getTextX(textGroup: any) {
    let textX = 0;
    if (!textGroup.children[0]) {
      textX = 0;
    } else {
      for (let i = 0; i < textGroup.children.length; i++) {
        textX += textGroup.children[i].width;
      }
    }
    return textX;
  }





}



