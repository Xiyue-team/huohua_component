import * as THREE from 'three';
export class ThreejsConfig {
  private lineWidth = 5;
  private color = '#57A0AF';
  private bdColor = '#FF6801';
  private cdColor = '#f1fc2b';
  centerLineConfig = {
    startPoint: new THREE.Vector3(0, 0, 0),
    endPoint: new THREE.Vector3(0, 40, 0),
    lineWidth: this.lineWidth / 2,
    color: '#B618FF',
    dashLine: true,
  };

  leftDashLineConfig1 = {
    startPoint: new THREE.Vector3(0, 0, 0),
    endPoint: new THREE.Vector3(-40, 0, 0),
    lineWidth: this.lineWidth / 2,
    color: this.bdColor,
    dashLine: true,
  };

  leftDashLineConfig2 = {
    startPoint: new THREE.Vector3(0, 40, 0),
    endPoint: new THREE.Vector3(-40, 0, 0),
    lineWidth: this.lineWidth / 2,
    color: this.color,
    dashLine: true,
  };

  rightDashLineConfig1 = {
    startPoint: new THREE.Vector3(0, 0, 0),
    endPoint: new THREE.Vector3(40, 0, 0),
    lineWidth: this.lineWidth / 2,
    color: this.cdColor,
    dashLine: true,
  };

  rightDashLineConfig2 = {
    startPoint: new THREE.Vector3(0, 40, 0),
    endPoint: new THREE.Vector3(40, 0, 0),
    lineWidth: this.lineWidth / 2,
    color: this.color,
    dashLine: true,
  };

  traceDashLineConfig1 = {
    startPoint: new THREE.Vector3(0, 0.5, 0),
    endPoint: new THREE.Vector3(-40, 0.5, 0),
    lineWidth: this.lineWidth * 1.5,
    color: this.bdColor,
    dashLine: true,
    depthTest: true,
  };

  traceDashLineConfig2 = {
    startPoint: new THREE.Vector3(0, 0.5, 0),
    endPoint: new THREE.Vector3(-40, 0.5, 0),
    lineWidth: this.lineWidth * 1.5,
    color: this.cdColor,
    dashLine: true,
    depthTest: true,
  };

}
