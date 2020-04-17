/**
 *创建地球
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-29 上午10:08
 */

import * as THREE from 'three';
import * as earth4 from '../../sub_static/earth4.jpg';
import * as earthBump from '../../sub_static/earth_bump.jpg';
import * as earthSpecular from '../../sub_static/earth_spec.jpg';

export class Earth {

    mapSiz = {
        width: 2048,
        height: 1024
    };

    createEarth (): THREE.Mesh {
        const sphere = new THREE.SphereGeometry(25, 40, 40);
        const material: THREE.MeshPhongMaterial = this.createEarthMaterial();

        const earth = new THREE.Mesh(sphere, material);
        earth.name = 'earth';

        return earth;
    }

    // 创建地球材质
    createEarthMaterial (): THREE.MeshPhongMaterial {
        const mapCanvas = document.createElement('canvas');

        const context = mapCanvas.getContext('2d');

        mapCanvas.width = this.mapSiz.width;

        mapCanvas.height = this.mapSiz.height;

        const planetTexture = new THREE.Texture(mapCanvas);

        new THREE.TextureLoader().load(earth4 as any, (texture) => {
            context.drawImage(texture.image, 0, 0);

            planetTexture.needsUpdate = true;
        });

        const bumpTexture = new THREE.TextureLoader().load(earthBump as any);
        const specTexture = new THREE.TextureLoader().load(earthSpecular as any);

        const material = new THREE.MeshPhongMaterial();
        material.transparent = true;
        material.map = planetTexture;

        material.bumpMap = bumpTexture;
        material.bumpScale = 0.15;

        material.specularMap = specTexture;
        material.specular = new THREE.Color('#909090');

        material.shininess = 5;

        return material;
    }
}
