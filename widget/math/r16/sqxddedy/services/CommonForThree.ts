
import {SpriteText2D} from 'three-text2d';
export default class CommonForThree {
  static createText(text: string, position: Array<number> = [0, 0, 0], {color = '#000', isItalic = true, fontSize = 50} = {}) {
    const str = isItalic ? 'italic' : '';
    const textStyle = {font: `${str} ${fontSize}px "Times New Roman"`, fillStyle: color, antialias: true};
    const textMesh = new SpriteText2D(text, textStyle);
    textMesh.scale.set(0.15, 0.15, 0.15);
    textMesh.position.set(position[0], position[1], position[2]);
    textMesh.material.depthTest = false;
    return textMesh;
  }
}

