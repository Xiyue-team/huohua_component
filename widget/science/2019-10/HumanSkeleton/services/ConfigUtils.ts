import { Vector3 } from '@babylonjs/core/Legacy/legacy';

import * as head from '../sub_static/image/head.png';
import * as HipBone from '../sub_static/image/HipBone.png';
import * as LeftDownLimb from '../sub_static/image/LeftDownLimb.png';
import * as LeftUpperLimb from '../sub_static/image/LeftUpperLimb.png';
import * as ribCage from '../sub_static/image/ribCage.png';
import * as RightDownLimb from '../sub_static/image/RightDownLimb.png';
import * as RightUpperLimb from '../sub_static/image/RightUpperLimb.png';
import * as spine from '../sub_static/image/spine.png';

export class ConfigUtils {
    text = window.env.browserInfo.lang.text;
    // 配置信息
    humanComponentConfigs = [
        {
            name: 'tipHead',
            alphaIndex: 3,
            texture: head,
            rot: new Vector3(0, 0, 0),
            pos: new Vector3(1.05, 407.77, 0),
            option: { width: 150, height: 180 },
            label: [{
                pos: new Vector3(22.50, 442.00, 0),
                text: this.text[0]
            }, {
                pos: new Vector3(54.11, 342.29, 0),
                text: this.text[1]
            }]
        }, {
            name: 'tipHipBone',
            alphaIndex: 2,
            texture: HipBone,
            rot: new Vector3(0, 0, 0),
            pos: new Vector3(1.05, -47.88, 0),
            option: { width: 200, height: 111 },
            label: [{
                pos: new Vector3(57.76, -41.95, 0),
                text: this.text[6] //"髋骨",
            }]
        }, {
            name: 'tipLeftDownLimb',
            alphaIndex: 1,
            texture: LeftDownLimb,
            rot: new Vector3(0, 0, -Math.PI / 2),
            pos: new Vector3(-106.28, -268.86, 0),
            option: { width: 128, height: 418 },
            label: [{
                pos: new Vector3(-73.57, -134.36, 0),
                text: this.text[7] //"股骨",
            }, {
                pos: new Vector3(-56.54, -352.02, 0),
                text: this.text[9] //"胫骨",
            }, {
                pos: new Vector3(-72.35, -462.67, 0),
                text: this.text[11] //"跗骨",
            }]
        }, {
            name: 'tipRightDownLimb',
            alphaIndex: 1,
            texture: RightDownLimb,
            rot: new Vector3(0, 0, Math.PI / 2),
            pos: new Vector3(106.28, -268.86, 0),
            option: { width: 128, height: 418 },
            label: [{
                pos: new Vector3(68.70, -343.51, 0),
                text: this.text[8] //"腓骨",
            }, {
                pos: new Vector3(117.34, -467.54, 0),
                text: this.text[10] //"跖骨",
            }]
        }, {
            name: 'tipLeftUpperLimb',
            alphaIndex: 3,
            texture: LeftUpperLimb,
            rot: new Vector3(0, 0, -Math.PI / 2),
            pos: new Vector3(-128.38, 97.34, 0),
            option: { width: 135, height: 377 },
            label: [{
                pos: new Vector3(-140.44, 74.78, 0),
                text: this.text[4] //"桡骨",
            }, {
                pos: new Vector3(-176.92, -65.05, 0),
                text: this.text[12] //"指(趾)骨",
            }]
        }, {
            name: 'tipRightUpperLimb',
            alphaIndex: 3,
            texture: RightUpperLimb,
            rot: new Vector3(0, 0, Math.PI / 2),
            pos: new Vector3(130.38, 97.34, 0),
            option: { width: 135, height: 377 },
            label: [{
                pos: new Vector3(114.91, 164.76, 0),
                text: this.text[3] //"肱骨",
            }, {
                pos: new Vector3(144.09, 9.12, 0),
                text: this.text[5] //"尺骨",
            }]
        }, {
            name: 'tipribCage',
            alphaIndex: 3,
            texture: ribCage,
            rot: new Vector3(0, 0, 0),
            pos: new Vector3(1.05, 209.94, 0),
            option: { width: 200, height: 174 },
            label: [{
                pos: new Vector3(41.95, 225.56, 0),
                text: this.text[2]
            }, {
                pos: new Vector3(-32.22, 288.79, 0),
                text: this.text[14] //"锁骨"
            }]
        }, {
            name: 'tipspine',
            alphaIndex: 1,
            texture: spine,
            rot: new Vector3(0, 0, Math.PI / 2),
            pos: new Vector3(0, 149.95, 0),
            option: { width: 50, height: 415 },
            label: [{
                pos: new Vector3(-1, 20, 0),
                text: this.text[13] //"脊柱",
            }]
        }
    ];
}
