/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
import Vue from 'vue';
import { Vector3, Engine, Mesh, Scene, Texture, HemisphericLight, AbstractMesh } from '@babylonjs/core/Legacy/legacy';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';

import $ from 'jquery-ts';

import { ViewModel } from '../ViewModel';
import { Utils } from './Utils';
import * as bg from '../sub_static/image/bg.png';
import * as front from '../sub_static/image/front.png';
export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;

    bg: Texture;

    sin: Mesh;
    cos: Mesh;
    tan: Mesh;
    one: Mesh;
    cot: Mesh;
    sec: Mesh;
    csc: Mesh;

    tip = $('#tip');
    baseVisibleMesh: Mesh = null;
    selectIndex = 0;

    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }
    resize(): void {
        this.windowheight = $(window).height(), this.windowwidth = $(window).width();
        this.changeCameraSize();
        super.resize();
    }
    /**
     * 创建场景
     * @param engine 
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 540);
        this.camera.position.x = 200;
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.camera.position.x = 380;
        }
        const light = new HemisphericLight('light1', new Vector3(0, 0, -1), scene);
        light.intensity = 1;
        this.bg = Utils.CreateTexture(`${bg}`, 1, 1, 0, 0, scene);
        const bgPlan = Utils.CreatePlan(this.bg, new Vector3(1, 6, 0), { width: 750, height: 750 }, scene);
        bgPlan.isPickable = false;
        bgPlan.alphaIndex = 0;

        this.sin = this.createFront(`${front}`, 0, 1 / 2, new Vector3(-155, 222, 0), scene);
        this.cos = this.createFront(`${front}`, 1 / 4, 1 / 2, new Vector3(160, 222, 0), scene);
        this.tan = this.createFront(`${front}`, 2 / 4, 1 / 2, new Vector3(-287, 0, 0), scene);

        this.one = this.createFront(`${front}`, 3 / 4, 1 / 2, Vector3.Zero(), scene);
        this.one.name = 'one';

        this.cot = this.createFront(`${front}`, 0, 0, new Vector3(290, 0, 0), scene);
        this.sec = this.createFront(`${front}`, 1 / 4, 0, new Vector3(-155, -211, 0), scene);
        this.csc = this.createFront(`${front}`, 2 / 4, 0, new Vector3(160, -211, 0), scene);
        this.addPointerEventListener(this.canvas, scene);
        this.reset();
        return scene;
    }

    /**
     * 手势监听
     * @param pickinfoMesh 
     * @param canvas 
     * @param scene 
     */
    addPointerEventListener(canvas: HTMLCanvasElement, scene: Scene) {
        let currentMesh: AbstractMesh;
        // 场景输入坐标监听（按下）
        const onPointerDown = (evt: any) => {
            if (evt.button !== 0) { return; }
            const pickInfo = scene.pick(scene.pointerX, scene.pointerY,
                function (mesh) { return mesh.isPickable !== false; });
            if (pickInfo.hit) {
                currentMesh = pickInfo.pickedMesh;
                if (currentMesh.name.indexOf('tip') !== -1) {
                    this.onPointerDown(currentMesh);
                }
            }
        };

        canvas.addEventListener('pointerdown', onPointerDown, false);

        scene.onDispose = function () {
            canvas.removeEventListener('pointerdown', onPointerDown);
        };
    }
    /**
     * 创建六角
     * @param tex 
     * @param uOffset 
     * @param vOffset 
     * @param pos 
     * @param scene 
     */
    createFront(tex: string, uOffset: number, vOffset: number, pos: Vector3, scene: Scene): Mesh {
        const fronttex = Utils.CreateTexture(tex, 1 / 4, 1 / 2, uOffset, vOffset, scene);
        const Plan = Utils.CreatePlan(fronttex, pos, { width: 158, height: 158 }, scene);
        Plan.alphaIndex = 1;
        Plan.isVisible = false;
        return Plan;
    }

    /**
     * 鼠标按下
     * @param currentMesh 
     */
    onPointerDown(currentMesh: AbstractMesh) {
        this.setMeshVisible([this.one, this.sin, this.csc, this.sec, this.cos, this.tan, this.cot], false);
        currentMesh.isVisible = true;
        this.baseVisibleMesh = currentMesh as Mesh;
        this.selectEffect();
    }

    /**
     * 右侧按钮按下
     * @param index 
     */
    ButtonEvent(index: number) {
        this.selectIndex = index;
        this.setMeshVisible([this.one, this.sin, this.csc, this.sec, this.cos, this.tan, this.cot], false);
        this.tip.show();
        if (index === 1) {
            this.tip.offset({ top: this.windowheight / 2 - 101, left: this.windowwidth - this.tip.width() - 134 - 24 });
        } else if (index === 2) {
            this.tip.offset({ top: this.windowheight / 2 - 21, left: this.windowwidth - this.tip.width() - 134 - 24 });
        } else if (index === 3) {
            this.tip.offset({ top: this.windowheight / 2 + 63, left: this.windowwidth - this.tip.width() - 134 - 24 });
        }
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            if (index === 1) {
                this.tip.offset({ top: this.windowheight / 2 - 75, left: this.windowwidth - this.tip.width() - 134 - 12 });
            } else if (index === 2) {
                this.tip.offset({ top: this.windowheight / 2 - 21, left: this.windowwidth - this.tip.width() - 134 - 12 });
            } else if (index === 3) {
                this.tip.offset({ top: this.windowheight / 2 - 21, left: this.windowwidth - this.tip.width() - 134 - 12 });
            }
        }

        if (this.baseVisibleMesh !== null) {
            this.baseVisibleMesh.isVisible = true;
        }
        this.selectEffect();
    }

    /**
     * 更新贴图
     */
    selectEffect() {
        if (this.selectIndex === 1) {
            if (this.sin.isVisible || this.csc.isVisible) {
                this.setMeshVisible([this.one, this.sin, this.csc], true);
            } else if (this.sec.isVisible || this.cos.isVisible) {
                this.setMeshVisible([this.one, this.sec, this.cos], true);
            } else if (this.tan.isVisible || this.cot.isVisible) {
                this.setMeshVisible([this.one, this.tan, this.cot], true);
            }
        } else if (this.selectIndex === 2) {
            if (this.sin.isVisible || this.cos.isVisible) {
                this.setMeshVisible([this.one, this.sin, this.cos], true);
            } else if (this.cot.isVisible || this.csc.isVisible) {
                this.setMeshVisible([this.one, this.cot, this.csc], true);
            } else if (this.tan.isVisible || this.sec.isVisible) {
                this.setMeshVisible([this.one, this.tan, this.sec], true);
            }
        } else if (this.selectIndex === 3) {
            if (this.sin.isVisible) {
                this.setMeshVisible([this.cos, this.tan], true);
            } else if (this.cos.isVisible) {
                this.setMeshVisible([this.sin, this.cot], true);
            } else if (this.cot.isVisible) {
                this.setMeshVisible([this.cos, this.csc], true);
            } else if (this.csc.isVisible) {
                this.setMeshVisible([this.cot, this.sec], true);
            } else if (this.sec.isVisible) {
                this.setMeshVisible([this.csc, this.tan], true);
            } else if (this.tan.isVisible) {
                this.setMeshVisible([this.sin, this.sec], true);
            }
        }
    }
    /**
     * 重置按钮按下
     */
    reset(): void {
        this.tip.hide();
        this.selectIndex = 0;
        this.baseVisibleMesh = null;
        this.setMeshVisible([this.one, this.sin, this.csc, this.sec, this.cos, this.tan, this.cot], false);
    }

}
