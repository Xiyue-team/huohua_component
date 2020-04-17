import { Vector3 } from '@babylonjs/core/Legacy/legacy';

import dot1 from '../sub_static/image/dot1.png';
import dot2 from '../sub_static/image/dot2.png';

export class Label {
    lang = window.env.browserInfo.lang;
    labeltext = this.lang.label;
    btntext = this.lang.btntext;
    frontMessage = [{
        uOffset: 0,
        pos: new Vector3(282.85, 99.59, 0),
        text: this.btntext[0],
        textpos: new Vector3(64.02, 218.29, 0),
        fromPos: new Vector3(7.69, -85.64, 0),
        fromPos2: new Vector3(-70, 30, 0),
        endPos: new Vector3(277.44, 149.23, 0),
        location: [{
            frame: 10,
            pos: new Vector3(-2.16, 11.50, 0),
            text: this.labeltext[0][0],
            offsetX: -36,
            offsetY: 0,
            img: dot2
        }, {
            frame: 20,
            pos: new Vector3(32.34, 2.87, 0),
            text: this.labeltext[0][1],
            offsetX: 0,
            offsetY: 24,
            img: dot2
        }, {
            frame: 21,
            pos: new Vector3(59.64, -1.44, 0),
            text: this.labeltext[0][2],
            offsetX: 0,
            offsetY: -24,
            img: dot2
        }, {
            frame: 30,
            pos: new Vector3(105.63, 73.29, 0),
            text: this.labeltext[0][3],
            offsetX: -36,
            offsetY: 0,
            img: dot1
        }, {
            frame: 50,
            pos: new Vector3(196.17, 86.23, 0),
            text: this.labeltext[0][4],
            offsetX: -36,
            offsetY: 0,
            img: dot2
        }, {
            frame: 60,
            pos: new Vector3(236.41, 120.72, 0),
            text: this.labeltext[0][5],
            offsetX: -30,
            offsetY: 0,
            img: dot1
        }]
    }, {
        uOffset: 1 / 3,
        pos: new Vector3(346.51, -96.51, 0),
        text: this.btntext[1],
        textpos: new Vector3(-99.39, -119.51, 0),
        fromPos: new Vector3(3.59, -210.77, 0),
        fromPos2: new Vector3(-90, -80, 0),
        endPos: new Vector3(350.26, -33.33, 0),
        location: [{
            frame: 10,
            pos: new Vector3(88.38, -76.17, 0),
            text: this.labeltext[1][0],
            offsetX: 0,
            offsetY: -24,
            img: dot2
        }, {
            frame: 20,
            pos: new Vector3(108.50, -136.53, 0),
            text: this.labeltext[1][1],
            offsetX: -30,
            offsetY: 0,
            img: dot1
        }, {
            frame: 40,
            pos: new Vector3(125.75, -112.10, 0),
            text: this.labeltext[1][2],
            offsetX: -30,
            offsetY: 0,
            img: dot1
        }, {
            frame: 60,
            pos: new Vector3(196.17, -110.66, 0),
            text: this.labeltext[1][3],
            offsetX: 0,
            offsetY: -24,
            img: dot2
        }, {
            frame: 80,
            pos: new Vector3(256.53, -43.11, 0),
            text: this.labeltext[1][4],
            offsetX: -36,
            offsetY: 0,
            img: dot1
        }]
    }, {
        uOffset: 2 / 3,
        pos: new Vector3(238.71, -312.11, 0),
        text: this.btntext[2],
        textpos: new Vector3(-35.98, -168.29, 0),
        fromPos: new Vector3(-58.97, -270.03, 0),
        fromPos2: new Vector3(-20, -140, 0),
        endPos: new Vector3(224.87, -304.10, 0),
        location: [{
            frame: 10,
            pos: new Vector3(-53.33, -272.31, 0),
            text: this.labeltext[2][0],
            offsetX: 0,
            offsetY: -24,
            img: dot2
        }, {
            frame: 30,
            pos: new Vector3(-7.18, -283.59, 0),
            text: this.labeltext[2][1],
            offsetX: 40,
            offsetY: 0,
            img: dot1
        }, {
            frame: 60,
            pos: new Vector3(60.51, -257.95, 0),
            text: this.labeltext[2][2],
            offsetX: 0,
            offsetY: -24,
            img: dot2
        }, {
            frame: 80,
            pos: new Vector3(170.26, -242.56, 0),
            text: this.labeltext[2][3],
            offsetX: -30,
            offsetY: 0,
            img: dot1
        }]
    }];
}
