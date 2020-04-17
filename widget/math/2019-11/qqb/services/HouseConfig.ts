
import * as Konva from 'konva';

export class HouseConfig {
    yellowkonva: Konva.Image;
    redkonva: Konva.Image;
    greenkonva: Konva.Image;
    orangekonva: Konva.Image;
    bluekonva: Konva.Image;
    pinkkonva: Konva.Image;

    blueImg = {
        points: [189, 549, 398.6, 549, 293.8, 445],
        fill: '#00FFF0',
        closed: true,
        draggable: true
    };
    bluepos = {
        x: 307,
        y: -54,
    };
    greenImg = {
        points: [638, 601.5, 746.8, 602.5, 853.3, 496, 746.5, 496],
        fill: '#5FEB26',
        closed: true,
        draggable: true
    };
    greenpos = {
        x: -241,
        y: -211,
    };
    orangeImg = {
        points: [367, 410, 472.6, 409, 472.6, 515],
        fill: '#FFA60E',
        closed: true,
        draggable: true
    };
    orangepos = {
        x: 234.5,
        y: -19,
    };
    pinkImg = {
        points: [279, 273, 384, 273, 279, 377],
        fill: '#FF715F',
        closed: true,
        draggable: true
    };
    pinkpos = {
        x: 218,
        y: 118,
    };
    redImg = {
        points: [641, 271.8, 937.1, 271.8, 789.05, 123],
        fill: '#FC3E4B',
        closed: true,
        draggable: true
    };
    redpos = {
        x: -135,
        y: 119,
    };
    yellowImg = {
        points: [358, 104, 463.5, 104, 463.5, 212, 358, 212],
        fill: '#F5E51C',
        closed: true,
        draggable: true
    };
    yellowpos = {
        x: 147.5,
        y: 73.5,
    };
    posArray = [
        this.yellowpos,
        this.redpos,
        this.greenpos,
        this.orangepos,
        this.bluepos,
        this.pinkpos];

    limltrightArray = [
        586.5,
        112.9,
        196.7,
        577.4,
        651.4,
        666,
        ];
    limltbottomArray = [
        463,
        403.2,
        72.5,
        160,
        126,
        298];
    limlttopArray = [
        104,
        123,
        496,
        409,
        445,
        273];
    limltleftArray = [
        358,
        641,
        638,
        367,
        189,
        279];
    imgArray = [
        this.yellowImg,
        this.redImg,
        this.greenImg,
        this.orangeImg,
        this.blueImg,
        this.pinkImg];
    konvaArray = [
        this.yellowkonva,
        this.redkonva,
        this.greenkonva,
        this.orangekonva,
        this.bluekonva,
        this.pinkkonva];
}
