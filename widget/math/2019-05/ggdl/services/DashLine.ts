/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/28 8:45
 */
import {
  BrowserInfo
} from '../../../../../src/model/BrowserInfo';
import {
  BrowserUtil
} from '../../../../../src/util/BrowserUtil';
import * as THREE from 'three';
import { DoubleSide } from 'three';
const OBJLoader = require('three-obj-loader');
const MeshLine = require('three.meshline').MeshLine;
const MeshLineMaterial = require('three.meshline').MeshLineMaterial;
OBJLoader(THREE);
export class DashLine {
  /*
      这个类主要是做一个兼容判定
      判断是Ipad时用three自带的虚线
      不是Ipad时用我们给的虚线meshLIne
   */
  browserInfo: BrowserInfo;
  private geometryLine: any;
  private dottedLine: any;
  private tween: any;
  constructor() {
    this.browserInfo = BrowserUtil.getBrowserInfo();
  }

  addLine(pointArr: any, color: any, linewidth: number, dashLine: any) {
          let lineMesh = null;
          const geometryLine = new THREE.Geometry();

          if (!color) {
              color = '#000';
          }

          if (!dashLine) {
              geometryLine.vertices = pointArr;
              lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                  color: color,
                  opacity: 1,
                  dashSize: 0.08,
                  gapSize: 0.07,
                  depthTest: false,
                  side: DoubleSide
              }));
              lineMesh.computeLineDistances();

          } else if ( dashLine) {
              geometryLine.vertices = pointArr;
              lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                color: color,
                depthTest: false,                
                side: DoubleSide
              }));
          }
          return lineMesh;
      }


  // 用来画meshLine虚线
  createLine(geometry: any, dashLine: boolean, color: any, lineWidth: number) {
    const g = new MeshLine();
    g.setGeometry(geometry);

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    const material = new MeshLineMaterial({
      useMap: false,
      color: new THREE.Color(color),
      opacity: 1,
      dashArray: 0.05,
      dashOffset: 0,
      dashRatio: 0.5,
      resolution: resolution,
      lineWidth: lineWidth,
      near: 1,
      far: 100,
      depthWrite: false,
      depthTest: false,
      alphaTest: 0,
      side: THREE.DoubleSide,
      transparent: dashLine,
    });

    return new THREE.Mesh(g.geometry, material);

  }

  // 用于更新苹果机虚线动画
  updateDottedLine1(startPoint: any) {
    this.geometryLine = new THREE.Geometry();

    const endPoint = new THREE.Vector3(this.tween.x, this.tween.y, this.tween.z);
    this.geometryLine.vertices = [startPoint, endPoint];

    this.dottedLine.geometry.dispose();
    this.dottedLine.geometry = this.geometryLine;
    this.dottedLine.computeLineDistances();
  }

  // 用于更新非苹果机虚线动画
  updateDottedLine2(startPoint: any) {
    this.geometryLine = new THREE.Geometry();

    const endPoint = new THREE.Vector3(this.tween.x, this.tween.y, this.tween.z);
    this.geometryLine.vertices.push(startPoint);
    this.geometryLine.vertices.push(endPoint);

    this.dottedLine.geometry.dispose();
    const g = new MeshLine();
    g.setGeometry(this.geometryLine);
    this.dottedLine.geometry = g.geometry;
  }

}
