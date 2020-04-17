/**
 *灯光
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-29 上午10:15
 *
 */
import * as THREE from 'three';

export class Light {
    // 创建全局光源
    static createAmbient () {
        // let ambientLight = new THREE.AmbientLight(0x111111, 1);
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        //const ambientLight = new THREE.AmbientLight(0x393939, 0.5);
        ambientLight.name = 'ambient';

        return ambientLight;
    }

    // 创建平行光源
    static createDirectional () {
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 100;
        directionalLight.intensity = .5;
        // directionalLight
        directionalLight.name = 'directional';
        // scene.add(directionalLight);

        return directionalLight;
    }

    static createSpot () {
        const spotLight = new THREE.SpotLight(0xffffff);

        spotLight.intensity = 1.2;
        spotLight.position.x = -46;
        spotLight.position.y = 35;
        spotLight.position.z = -44;
        spotLight.angle = 0.3;
        spotLight.castShadow = false;
        spotLight.penumbra = 0.4;
        spotLight.distance = 124;
        spotLight.decay = 1;
        spotLight.shadow.camera.near = 50;
        spotLight.shadow.camera.far = 200;
        spotLight.shadow.camera.fov = 35;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.mapSize.width = 1024;

        spotLight.name = 'spotLight';

        return spotLight;
    }
}
