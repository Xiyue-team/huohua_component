import * as THREE from 'three';
import { SpriteText2D } from 'three-text2d';
export default class CommonForThree {
  // 图片贴图
  static createImg(vertices: any, w: number, h: number, src: any) {
    const PlaneG = new THREE.PlaneGeometry(w, h);
    const PlaneM = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(src),
      transparent: true,
      overdraw: 0.2,
      depthTest: false
    });
    const Plane = new THREE.Mesh(PlaneG, PlaneM);
    Plane.position.set(vertices[0], vertices[1], vertices[2]);
    return Plane;
  }
  static createText(text: string, position: Array<number> = [0, 0, 0], { color = '#000', isItalic = false } = {}) {
    const str = isItalic ? 'italic' : '';
    const textStyle = { font: `${str} 40px "PingFangSC-Regular"`, fillStyle: color, antialias: true };
    const textMesh = new SpriteText2D(text, textStyle);
    textMesh.scale.set(0.25, 0.25, 0.25);
    textMesh.position.set(position[0], position[1], position[2]);
    textMesh.material.depthTest = false;
    return textMesh;
}
}
