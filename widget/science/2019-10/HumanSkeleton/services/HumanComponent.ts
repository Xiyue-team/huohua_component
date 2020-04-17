import { Vector3, Texture, Mesh, Node, Scene, ExecuteCodeAction, ActionManager } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { PlanUtils } from '../../../../babylon/util/PlanUtils';
import { LabelSystem } from './LabelSystem';

/**
 *骨骼组件类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */
export class HumanComponent extends Mesh {
    isCheck = true; //是否检查位置
    AnswerPos: Vector3;
    borderwidth: number; //宽
    borderheight: number; //高
    baseAlphaIndex = 0; //透明层级
    goPos: Vector3; //目标位置
    goRot: Vector3; //目标旋转
    labelSystem: LabelSystem[] = [];
    label: Array<{ pos: Vector3, text: string }> = [];
    idRot: Vector3;
    constructor(name: string, alphaIndex: number, diffuse: string, dot: string, advancedTexture: GUI.AdvancedDynamicTexture,
        option: { width: number, height: number },
        label: Array<{ pos: Vector3, text: string }>, position: Vector3, rot: Vector3, scene: Scene,
        parent?: Node, source?: Mesh, doNotCloneChildren?: boolean, clonePhysicsImpostor?: boolean) {
        super(name, scene, parent, source, doNotCloneChildren, clonePhysicsImpostor);
        this.alphaIndex = alphaIndex;
        this.baseAlphaIndex = alphaIndex;
        this.borderwidth = option.width;
        this.borderheight = option.height;
        this.AnswerPos = position;
        this.position = position;
        this.goPos = position;
        this.idRot = this.rotation.clone();
        this.goRot = this.idRot.clone().add(rot);
        const tipTex = new Texture(diffuse, scene);
        tipTex.hasAlpha = true;
        for (let i = 0; i < label.length; i++) {
            const element = label[i];
            this.labelSystem.push(new LabelSystem(element.text, advancedTexture, 2, scene).init(dot).setRootPos(element.pos)
                .setPos(new Vector3(element.pos.x > 0 ? 250 : -250, element.pos.y, 0)).setText(element.text).setP(this));
        }
        this.material = PlanUtils.CreateMaterial('tipMat', tipTex, scene);
        this.actionManager = new ActionManager(scene);

        //ON MOUSE ENTER
        this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger,  (ev)=> {
            scene.hoverCursor = 'pointer';
        }));

        //ON MOUSE EXIT
        this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger,  (ev)=> {

        }));
        this.registerBeforeRender((mesh) => {
            if (this.isCheck) {
                const dis = Vector3.Distance(this.position, this.goPos);
                if (dis > 0.1) {
                    this.position = this.position.add(this.position.subtract(this.goPos).scale(1).normalize().scale(-dis / 5));
                } else {
                    this.position = this.goPos.scale(1);
                    this.alphaIndex = this.baseAlphaIndex;
                    this.isCheck = false;
                }
                if (this.goPos !== this.AnswerPos) {
                    const rots = Vector3.Distance(this.rotation, this.goRot);
                    if (rots > Math.PI / 180) {
                        this.rotation = this.rotation.add(this.rotation.subtract(this.goRot).scale(1).normalize().scale(-rots / 5));
                    } else {
                        this.rotation = this.goRot.scale(1);
                    }
                }
            }
        });
    }

    /**
     * 设置标签显示
     */
    setLabelV(Visible: boolean) {
        for (let i = 0; i < this.labelSystem.length; i++) {
            const element = this.labelSystem[i];
            element.setLabelVisible(Visible);
        }
    }

    /**
     * 重置位置
     */
    resetPosition() {
        this.isCheck = false;
        this.position = this.AnswerPos.scale(1);
        this.rotation = this.idRot;
        this.alphaIndex = this.baseAlphaIndex;
    }

    /**
     * 设置移动目标位置
     */
    setGoPos(): HumanComponent {
        this.goPos = new Vector3(this.position.x, -650, 0);
        this.isCheck = true;
        return this;
    }

    /**
     * 判断边界
     */
    getBorder(): boolean {
        return this.position.x < (this.AnswerPos.x + this.borderwidth / 2)
            && this.position.x > (this.AnswerPos.x - this.borderwidth / 2)
            && this.position.y < (this.AnswerPos.y + this.borderheight / 2)
            && this.position.y > (this.AnswerPos.y - this.borderheight / 2);
    }

    onPointerDown(startingPoint: Vector3) {
        this.isCheck = false;
        this.alphaIndex = 100;
        this.rotation = this.idRot;
    }

    onPointerUp(startingPoint: Vector3, condition: boolean) {
        if (this.getBorder() && condition) {
            this.goPos = this.AnswerPos;
        } else {
            this.goPos = new Vector3(this.position.x, -650, 0);
        }
        this.isCheck = true;
    }
}
