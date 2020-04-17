/**
 * 背景
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-29 上午11:11
 *
 */
import * as THREE from 'three';
import * as bgStarts from '../../sub_static/bg_stars.jpg';
import * as bg from '../../sub_static/bg@2x.png';

export class Background {

    static createBg () {
        const bgGeometry = new THREE.BoxGeometry(1000, 1000, 1000);

        const material = this.createBgMaterial();

        const bgMesh = new THREE.Mesh(bgGeometry, material);

        return bgMesh;
    }

    static createBgMaterial () {
        const bgTexture = new THREE.TextureLoader().load(bg as any);
        const material = new THREE.MeshBasicMaterial();

        material.map = bgTexture;
        material.side = THREE.BackSide;

        return material;
    }

}
