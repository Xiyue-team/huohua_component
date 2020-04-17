/**
 * three js 辅助类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/27 11:13
 */
import * as THREE from 'three';
import {ThreeBase} from '../template/ThreeBase';
export class D3Helper {
    private threeObj: ThreeBase;
    constructor(threeObj: ThreeBase) {
        this.threeObj = threeObj;
    }

    /**
     * 创建辅助轴
     * x轴 红色
     * y轴 绿色
     * z轴 蓝色
     * @param {number} lineSize 辅助轴各个边长度
     */
    axisHelper(lineSize?: number): void {
        lineSize = !lineSize ? 160  :  lineSize;
        const axisHelper = new THREE.AxesHelper(lineSize);
        // 将立方体网格加入到场景中
        this.threeObj.scene.add(axisHelper);
    }


    /**
     * 显示网格线
     */
    gridHelper(): void {
        // 网格的边长是1000，每个小网格的边长是100
        const helper = new THREE.GridHelper( 1000, 100, 0x0000ff, 0x808080  );
        this.threeObj.scene.add( helper );
    }

    camerHelper(): void {
        const helper = new THREE.CameraHelper( this.threeObj.camera );
        this.threeObj.scene.add(helper );
    }

    /**
     * 光线辅助类
     */
    lightHelper() {
        /*   var sphereSize = 10;
          var pointLightHelper0 = new THREE.PointLightHelper( lights[0], sphereSize );
          scene.add( pointLightHelper0 ); */
    }



}
