import { Vector3, } from '@babylonjs/core/Legacy/legacy';

import bg01 from './sub_static/image/bg/bg01.png';
import bg02 from './sub_static/image/bg/bg02.png';
import bg03 from './sub_static/image/bg/bg03.png';
import bg04 from './sub_static/image/bg/bg04.png';
import bg05 from './sub_static/image/bg/bg05.png';
import bg06 from './sub_static/image/bg/bg06.png';
import bg07 from './sub_static/image/bg/bg07.png';
import bg08 from './sub_static/image/bg/bg08.png';
import bg09 from './sub_static/image/bg/bg09.png';

import frontb01 from './sub_static/image/frontb01.png';
import frontb02 from './sub_static/image/frontb02.png';
import frontb03 from './sub_static/image/frontb03.png';
import frontb04 from './sub_static/image/frontb04.png';
import frontb05 from './sub_static/image/frontb05.png';
import frontb06 from './sub_static/image/frontb06.png';
import frontb07 from './sub_static/image/frontb07.png';
import frontb08 from './sub_static/image/frontb08.png';
import frontb09 from './sub_static/image/frontb09.png';

import frontf01 from './sub_static/image/frontf01.png';
import frontf02 from './sub_static/image/frontf02.png';
import frontf03 from './sub_static/image/frontf03.png';
import frontf04 from './sub_static/image/frontf04.png';
import frontf05 from './sub_static/image/frontf05.png';
import frontf06 from './sub_static/image/frontf06.png';
import frontf07 from './sub_static/image/frontf07.png';
import frontf08 from './sub_static/image/frontf08.png';
import frontf09 from './sub_static/image/frontf09.png';

import lo01 from './sub_static/image/location/lo01.png';
import lo02 from './sub_static/image/location/lo02.png';
import lo03 from './sub_static/image/location/lo03.png';
import lo04 from './sub_static/image/location/lo04.png';
import lo05 from './sub_static/image/location/lo05.png';
import lo06 from './sub_static/image/location/lo06.png';

import line01 from './sub_static/image/line01.png';
import line02 from './sub_static/image/line02.png';
import line03 from './sub_static/image/line03.png';

import tip from './sub_static/image/tip.png';
import dot from './sub_static/image/dot.png';
import bg from './sub_static/image/bg.png';
import river from './sub_static/image/river.png';
import path from './sub_static/image/path.png';

export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    tip = tip;
    dot = dot;
    bg = bg;
    river = river;
    path = path;
    btns = [
        { img: dot, pos: new Vector3(-669.29, -156.87, 0), btn: null, active: 0 },
        { img: dot, pos: new Vector3(122.04, 90.56, 0), btn: null, active: 0 },
        { img: dot, pos: new Vector3(535.54, 9.20, 0), btn: null, active: 0 },
        { img: dot, pos: new Vector3(385.08, -151.30, 0), btn: null, active: 0 },
        { img: dot, pos: new Vector3(-499.29, -65.99, 0), btn: null, active: 15.4 },
        { img: dot, pos: new Vector3(-435.69, -67.58, 0), btn: null, active: 16.2 },
        { img: dot, pos: new Vector3(-349.82, -107.33, 0), btn: null, active: 20.7 },
        { img: dot, pos: new Vector3(-166.96, 59.63, 0), btn: null, active: 28.3 },
        { img: dot, pos: new Vector3(124.27, -125.94, 0), btn: null, active: 41.8 }
    ];
    lineList = [
        {
            frontf: line01,
            show: 36,
            texf: null,
            mesh: null
        },
        {
            frontf: line02,
            show: 44,
            texf: null,
            mesh: null
        },
        {
            frontf: line03,
            show: 49,
            texf: null,
            mesh: null
        }];

    frontList = [
        {
            frontb: frontb01,
            frontf: frontf01,
            show: 1,
            change: 7.4,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb02,
            frontf: frontf02,
            show: 10,
            change: 10.9,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb03,
            frontf: frontf03,
            show: 11,
            change: 26,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb04,
            frontf: frontf04,
            show: 27,
            change: 30,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb05,
            frontf: frontf05,
            show: 31,
            change: 35,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        }, {
            frontb: frontb06,
            frontf: frontf06,
            show: 36,
            change: 37,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb07,
            frontf: frontf07,
            show: 38,
            change: 42,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb08,
            frontf: frontf08,
            show: 43,
            change: 47,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        },
        {
            frontb: frontb09,
            frontf: frontf09,
            show: 48,
            change: 49,
            texf: null,
            texb: null,
            mat: null,
            mesh: null
        }
    ];

    showList = [
        {
            text: this.text[0],
            bg: bg01
        }, {
            text: this.text[1],
            bg: bg02
        }, {
            text: this.text[2],
            bg: bg03
        }, {
            text: this.text[3],
            bg: bg04
        }, {
            text: this.text[4],
            bg: bg05
        }, {
            text: this.text[5],
            bg: bg06
        }, {
            text: this.text[6],
            bg: bg07
        }, {
            text: this.text[7],
            bg: bg08
        }, {
            text: this.text[8],
            bg: bg09
        }
    ];

    loList = [
        { frame: 5, pos: new Vector3(-804.17, -262.98, 0), tex: lo01, mesh: null },
        { frame: 20, pos: new Vector3(-141.02, 164.97, 0), tex: lo02, mesh: null },
        { frame: 20, pos: new Vector3(-59.35, 345.74, 0), tex: lo03, mesh: null },
        { frame: 30, pos: new Vector3(-1.63, 311.98, 0), tex: lo04, mesh: null },
        { frame: 45, pos: new Vector3(134.48, 33.21, 0), tex: lo05, mesh: null },
        { frame: 60, pos: new Vector3(442.65, -4.90, 0), tex: lo06, mesh: null },
    ];
}

