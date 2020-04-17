import * as Konva from 'konva';

export class TreeConfig {
    graykonva: Konva.Line;
    yellowkonva: Konva.Line;
    redkonva: Konva.Line;
    greenkonva: Konva.Line;
    orangekonva: Konva.Line;
    bluekonva: Konva.Line;
    pinkkonva: Konva.Line;

    blueImg = {
        points: [655, 228.4, 746.7, 136, 838.4, 228],
        fill: '#00FFF0',
        closed: true,
        draggable: true
    };
    bluepos = {
        x: -218,
        y: 289,
    };
    greenImg = {
        points: [206, 475, 298.6, 475, 388.5, 564.9, 294.9, 564.9],
        fill: '#5FEB26',
        closed: true,
        draggable: true
    };
    greenpos = {
        x: 322,
        y: -140,
    };
    orangeImg = {
        points: [793, 423, 793, 512.9, 884, 512.9],
        fill: '#FFA60E',
        closed: true,
        draggable: true
    };
    orangepos = {
        x: -267,
        y: -89,
    };
    pinkImg = {
        points: [767, 392.9, 858.9, 392.9, 858.9, 303],
        fill: '#FF715F',
        closed: true,
        draggable: true
    };
    pinkpos = {
        x: -422,
        y: 30.5,
    };
    redImg = {
        points: [530, 577.1, 708, 577.1, 706, 397],
        fill: '#FC3B44',
        closed: true,
        draggable: true
    };
    redpos = {
        x: -178,
        y: -243,
    };
    yellowImg = {
        points: [216, 342, 307.7, 342, 307.7, 431.9, 216, 431.9],
        fill: '#F5E81D',
        closed: true,
        draggable: true
    };
    yellowpos = {
        x: 220,
        y: -7,
    };
    grayImg = {
        points: [261, 133, 261, 313.1, 444.5, 313.1],
        fill: '#D1A37C',
        closed: true,
        draggable: true
    };
    graypos = {
        x: 267.5,
        y: 21.5,
    };
    posArray = [
        this.graypos,
        this.yellowpos,
        this.redpos,
        this.greenpos,
        this.orangepos,
        this.bluepos,
        this.pinkpos];
    limltrightArray = [
        605.5,
        742.3,
        342,
        611.5,
        166,
        211.6,
        191.1];
    limltleftArray = [
        261,
        216,
        530,
        206,
        793,
        655,
        767];
    limltbottomArray = [
        361.9,
        243.1,
       97.9,
        110.1,
       162.1,
        446.6,
        282.1];


    limlttopArray = [
        133,
        342,
        397,
        475,
        423,
        136,
        303];

    imgArray = [
        this.grayImg,
        this.yellowImg,
        this.redImg,
        this.greenImg,
        this.orangeImg,
        this.blueImg,
        this.pinkImg];
    konvaArray = [
        this.graykonva,
        this.yellowkonva,
        this.redkonva,
        this.greenkonva,
        this.orangekonva,
        this.bluekonva,
        this.pinkkonva];
}
