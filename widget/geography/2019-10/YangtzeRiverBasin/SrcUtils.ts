import { Vector3 } from '@babylonjs/core/Legacy/legacy';

import bg01 from './sub_static/image/bg/bg01.png';
import bg02 from './sub_static/image/bg/bg02.png';
import bg03 from './sub_static/image/bg/bg03.png';

import frontb from './sub_static/image/frontb.png';

import frontf from './sub_static/image/frontf.png';

import lo from './sub_static/image/lo.png';

import line from './sub_static/image/line.png';

import river from './sub_static/image/river.png';

import tip from './sub_static/image/tip.png';
import dot from './sub_static/image/dot.png';
import bg from './sub_static/image/bg.png';
import riverArea from './sub_static/image/riverArea.png';
import riverArea2 from './sub_static/image/riverArea2.png';
import path from './sub_static/image/path.png';

export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    line = line;
    lo = lo;
    frontf = frontf;
    frontb = frontb;

    tip = tip;
    dot = dot;
    bg = bg;
    river = river;
    riverArea = riverArea;
    riverArea2 = riverArea2;
    path = path;


    btns = [
        { img: dot, pos: new Vector3(-143.06, -124.20, 0), btn: null, active: 20.2 },
        { img: dot, pos: new Vector3(-21.73, -73.15, 0), btn: null, active: 24.6 },
        { img: dot, pos: new Vector3(426.82, 22.25, 0), btn: null, active: 41.8 }
    ];

    lineList = [
        { name: 'line01', show: 31.7, mesh: null },
        { name: 'line02', show: 43.8, mesh: null },
        { name: 'line03', show: 49, mesh: null }
    ];

    frontList = [
        {
            name: 'front01',
            show: 1,
            change: 5.9,
            mat: null,
            mesh: null
        },
        {
            name: 'front02',
            show: 5.9,
            change: 7.1,
            mat: null,
            mesh: null
        },
        {
            name: 'front03',
            show: 7.1,
            change: 8.6,
            mat: null,
            mesh: null
        },
        {
            name: 'front04',
            show: 8.7,
            change: 20,
            mat: null,
            mesh: null
        },
        {
            name: 'front05',
            show: 22.3,
            change: 30.5,
            mat: null,
            mesh: null
        }, {
            name: 'front06',
            show: 30.6,
            change: 37,
            mat: null,
            mesh: null
        },
        {
            name: 'front07',
            show: 37.1,
            change: 39.1,
            mat: null,
            mesh: null
        },
        {
            name: 'front08',
            show: 43.1,
            change: 44,
            mat: null,
            mesh: null
        },
        {
            name: 'front09',
            show: 44.1,
            change: 47.7,
            mat: null,
            mesh: null
        },
        {
            name: 'front10',
            show: 47.8,
            change: 48.1,
            mat: null,
            mesh: null
        },
        {
            name: 'front11',
            show: 48.2,
            change: 49.8,
            mat: null,
            mesh: null
        }
    ];

    showList = [
        { text: this.text[0], bg: bg01 },
        { text: this.text[1], bg: bg02 },
        { text: this.text[2], bg: bg03 }
    ];

    loList = [
        { name: 'lo01', frame: 5, pos: new Vector3(-704.40, 71.32, 0), mesh: null },
        { name: 'lo02', frame: 15, pos: new Vector3(-442.01, -22.01, 0), mesh: null },
        { name: 'lo03', frame: 25, pos: new Vector3(-295.85, -340.75, 0), mesh: null },
        { name: 'lo04', frame: 35, pos: new Vector3(-121.51, 0.88, 0), mesh: null },
        { name: 'lo05', frame: 45, pos: new Vector3(618.11, 60.75, 0), mesh: null }
    ];


    tributaryList = [
        { name: 'river01', show: 13.4, mesh: null },
        { name: 'river02', show: 20.2, mesh: null },
        { name: 'river03', show: 24.6, mesh: null },
        { name: 'river04', show: 27, mesh: null },
        { name: 'river05', show: 37.8, mesh: null },
        { name: 'river06', show: 41.8, mesh: null },
        { name: 'river07', show: 43.8, mesh: null }
    ];

    constructor() {

    }
}

