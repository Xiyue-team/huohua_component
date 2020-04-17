/**
 *three 模型基类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/27 11:16
 */
import { Camera, FBXLoader, Light, MTLLoader, Renderer, Scene } from 'three';
import * as THREE from 'three';
const GLTFLoader = require('three-gltf-loader');
const fbxLoader = require('three-fbxloader-offical');

export class ThreeBase {

    //场景
    scene: Scene;
    //摄像机
    camera: Camera;
    //渲染器
    renderer: Renderer;
    //光源
    lights: Light[];

    fov = 75;
    near = 1;
    far = 3000;

    //宽高
    width: number;
    height: number;
    //容器
    domElement: Element;

    /**
     * 判断webgl是否可用
     * @returns {boolean}
     */
    public webglAvailable(): boolean {
        try {
            const canvas = document.createElement( 'canvas' );
            return !!( (window as any).WebGLRenderingContext && (
                    canvas.getContext( 'webgl' ) ||
                    canvas.getContext( 'experimental-webgl' ) )
            );
        } catch ( e ) {
            return false;
        }
    }

    /**
     * 封装gltf加载器
     * @param {string} path
     * @returns {Promise<any>}
     */
    gltfLoader(path: string): Promise<any> {
        const loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve, reject) => {
            loader.load(path,
                (gltf) => {
                    resolve(gltf);
                },
                ( xhr  ) => {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },

                ( error ) => {
                    console.error(error);
                    console.log( 'An error happened' );
                    reject(error);
                }
            );
        });
    }

    fbxLoader(path: string): Promise<any> {
        const loader = new fbxLoader() as FBXLoader;
          return new Promise((resolve, reject) => {
            loader.load(path,
              (gltf) => {
                resolve(gltf);
              },
              ( xhr  ) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
              },

              ( error ) => {
                console.error(error);
                console.log( 'An error happened' );
                reject(error);
              }
            );

          });
    }


}
