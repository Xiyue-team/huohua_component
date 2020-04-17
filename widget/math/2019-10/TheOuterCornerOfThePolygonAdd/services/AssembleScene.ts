/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/10/1 21:10
 */
import Vue from 'vue';
import { Vector3, Color3, LinesMesh, Scene, Engine, StandardMaterial, Mesh } from '@babylonjs/core/Legacy/legacy';
import { ViewModel } from '../ViewModel';
import { Base2DScene } from '../../../../babylon/template/Base2DScene';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';

export class AssembleScene extends Base2DScene {
    viewModel: ViewModel;
    edgesWidth = 6; //线宽
    lineLength = 20; //线长
    realR = 0; //角度

    hexRed = '#FED521';
    hexBlue = '#17A3FF';
    colorRed: Color3;
    colorBlue: Color3;

    lines: LinesMesh[] = []; //线条组
    angleLines: Mesh[] = []; //角度组
    mat: StandardMaterial; //材质
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    resize() {
        super.resize();
        this.changeCameraSize();
    }

    /**
     * 创建场景
     * @param engine
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.createTargetCamera4Math(scene, 22);
        this.colorRed = Color3.FromHexString(this.hexRed);
        this.colorBlue = Color3.FromHexString(this.hexBlue);
        this.mat = MaterialLab.CreateLightMaterial(this.colorRed, scene);
        this.reset();
        return scene;
    }

    formatterR() {
        const n = this.viewModel.sliderNumber2;
        const angle = 360 / n;
        this.realR = this.viewModel.sliderNumber === 0 ? 0.00001 : this.viewModel.sliderNumber;
        for (let i = 0; i < n; i++) {
            const pos1 = FormulasUtils.GetCirclePoint(this.realR, angle * i);
            this.lines[i].position = pos1;
            this.angleLines[i].position = pos1;
        }
    }

    formatterN() {
        const n = this.viewModel.sliderNumber2;
        const angle = 360 / n;
        this.realR = this.viewModel.sliderNumber === 0 ? 0.00001 : this.viewModel.sliderNumber;
        if (this.lines.length > 0) {
            for (let i = 0; i < this.lines.length; i++) {
                this.lines[i].dispose();
                this.angleLines[i].dispose();
            }
            this.lines = [];
            this.angleLines = [];
        }

        for (let i = 0; i < n; i++) {
            const pos1 = FormulasUtils.GetCirclePoint(this.realR, angle * i);
            const pos2 = FormulasUtils.GetCirclePoint(this.realR, angle * (i + 1));
            const pos = Vector3.Normalize(pos2.subtract(pos1)).scale(this.lineLength);
            const line = LinesBuild.CreateLines([Vector3.Zero(), pos], this.colorBlue, this.edgesWidth, this.scene);
            line.position = pos1;
            this.lines.push(line);
            let p1 = Vector3Utils.GetAngle(pos, new Vector3(1, 0, 0));
            p1 = pos.y >= 0 ? p1 : 360 - p1;
            const po = [];
            if (n === 4) {
                po.push([FormulasUtils.GetCirclePoint(1, p1), Vector3.Zero()],
                    [FormulasUtils.GetCirclePoint(1, p1).add(FormulasUtils.GetCirclePoint(1, p1 - angle)),
                    FormulasUtils.GetCirclePoint(1, p1 - angle)]);
            } else {
                const poses = FormulasUtils.GetArcUpdateVertices(1, p1, p1 - angle);
                for (let j = 0; j < poses.length; j++) {
                    po.push([poses[j], Vector3.Zero()]);
                }
            }

            const angline = Mesh.CreateRibbon('ribbon', po, false, false, 0, this.scene, true, Mesh.DOUBLESIDE);
            angline.material = this.mat;
            angline.position = pos1;
            this.angleLines.push(angline);
        }
    }

    /**
     * 重置按钮按下
     */
    reset(): void {
        this.formatterN();
    }
}
