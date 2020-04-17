import {
    Vector3, Scene, TransformNode, Texture, ShaderMaterial, StandardMaterial, Mesh, Color3
} from '@babylonjs/core/Legacy/legacy';

import { DrawEarth } from '../../../../babylon/Geography/util/DrawEarth';
import * as earthday from '../sub_static/image/earth/earthday.jpg';
import * as earthnight from '../sub_static/image/earth/earthnight.jpg';
import * as cloudTex from '../sub_static/image/earth/cloud.png';
import { MaterialCreater } from './MaterialCreater';

export class Earth extends TransformNode {
    earthMat: ShaderMaterial; //地球材质
    cloudMat: ShaderMaterial; //云材质
    earthGroup: TransformNode; //地球组
    earthgroupAngle: TransformNode; //地球偏转组
    r: number; //
    isSelfRotate = false;
    alpha = 0;
    earthAxis: Mesh = null; //地轴模型

    constructor(name: string, r: number, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.r = r;
        this.earthgroupAngle = new TransformNode('earthgroupAngle');
        this.earthGroup = new TransformNode('earthGroup');
        this.earthGroup.setParent(this.earthgroupAngle);
        this.earthgroupAngle.setParent(this);
        this.earthMat = MaterialCreater.CreateEarthMaterial(new Texture(`${earthday}`, scene), new Texture(`${earthnight}`, scene), scene);
        this.cloudMat = MaterialCreater.CreateCloudMaterial(new Texture(`${cloudTex}`, scene), scene);
        this.createEarth();
        this.createCloud();
        this.createWarpAndWeft();
        this.createEarthAxis();
        this.earthgroupAngle.rotation = new Vector3(0, 0, -Math.PI / 180 * 23.26);
        scene.registerBeforeRender(() => {
            if (this.isSelfRotate) {
                this.earthGroup.rotation = new Vector3(0, this.alpha * 0.2, 0);
                this.alpha -= 0.02;
            }
        });
    }

    /**
     * 更新材质灯光、相机位置
     * @param cameraPos 
     * @param sunPos 
     */
    updateAllMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.updateMaterial(cameraPos, sunPos);
        this.updateCloudMaterial(cameraPos, sunPos);
        return this;
    }

    updateMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.earthMat.setVector3('cameraPosition', cameraPos);
        this.earthMat.setVector3('vLightPosition', sunPos);
        return this;
    }

    updateCloudMaterial(cameraPos: Vector3, sunPos: Vector3): Earth {
        this.cloudMat.setVector3('cameraPosition', cameraPos);
        this.cloudMat.setVector3('vLightPosition', sunPos);
        return this;
    }

    /**
     * 创建地球
     */
    createEarth(): Earth {
        const earth = Mesh.CreateSphere('earth', 32, 2 * this.r, this._scene);
        earth.material = this.earthMat;
        earth.rotation = new Vector3(0, 0, Math.PI);
        earth.setParent(this.earthGroup);
        return this;
    }

    /**
     * 创建云层
     */
    createCloud(): Earth {
        const cloud = Mesh.CreateSphere('cloud', 32, 2 * this.r + 0.2, this._scene);
        cloud.material = this.cloudMat;
        cloud.rotation = new Vector3(0, 0, Math.PI);
        cloud.setParent(this.earthGroup);
        cloud.isPickable = false;
        return this;
    }

    /**
     * 创建经纬网
     */
    createWarpAndWeft(): Earth {
        const DashedLineColor = new Color3(1, 1, 0);
        const lineradius = this.r + 0.02;
        const warpAndWeft = DrawEarth.CreateWarpAndWeft(new Color3(1, 1, 1), 15, 15, lineradius, this._scene);
        warpAndWeft.setParent(this.earthGroup);
        DrawEarth.CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true, this.earthGroup); //创建回归线；
        DrawEarth.CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, false, this.earthGroup);
        DrawEarth.CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, false, this.earthGroup); //创建极圈；
        DrawEarth.CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true, this.earthGroup);
        return this;
    }

    /**
     * 是否开启阴影
     * @param has 
     */
    hasShadow(has: boolean): Earth {
        this.earthMat.setFloat('hasShadow', has ? 1 : 0);
        this.cloudMat.setFloat('hasShadow', has ? 1 : 0);
        return this;
    }

    /**
     * 设置自转
     * @param active 
     */
    setSelfRotate(active: boolean): Earth {
        this.isSelfRotate = active;
        return this;
    }

    /**
     * 创建地球
     */
    createEarthAxis(): Earth {
        const sliderR = this.r + 0.6;
        const cylinderMat = new StandardMaterial('EarthAxisMat', this._scene);
        cylinderMat.emissiveColor = Color3.Gray();
        cylinderMat.freeze();
        this.earthAxis = Mesh.CreateCylinder('EarthAxis', 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, this._scene);
        this.earthAxis.material = cylinderMat;
        this.earthAxis.setParent(this.earthGroup);
        this.earthAxis.isPickable = false;
        return this;
    }

}

