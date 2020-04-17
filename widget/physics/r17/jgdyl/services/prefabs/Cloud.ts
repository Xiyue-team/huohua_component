/**
 * 云
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-29 上午10:02
 *
 */
import * as THREE from 'three';
import * as cloudImg from '../../sub_static/earth_cloud.png';


export class Cloud {

    static createCloud(radius: number, name: string) {
        const cloudSphere = new THREE.SphereGeometry(radius, 40, 40);
        const cloudMaterial = this.createClodMaterial();

        const cloudMesh = new THREE.Mesh(cloudSphere, cloudMaterial);

        cloudMesh.name = name;

        return cloudMesh;

        // group.add(cloudMesh);
    }

    static createClodMaterial (): THREE.MeshPhongMaterial {
        const cloudTexture = new THREE.TextureLoader().load(cloudImg as any);

        const material = new THREE.MeshPhongMaterial();
        material.map = cloudTexture;
        material.transparent = true;
        material.opacity = 1;
        material.blending = THREE.AdditiveBlending;

        return material;
    }
}
