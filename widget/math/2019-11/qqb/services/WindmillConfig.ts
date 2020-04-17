import * as Konva from 'konva';

export class WindmillConfig {
    graykonva: Konva.Image;
    yellowkonva: Konva.Image;
    redkonva: Konva.Image;
    greenkonva: Konva.Image;
    orangekonva: Konva.Image;
    bluekonva: Konva.Image;
    pinkkonva: Konva.Image;

    blueImg = {
        points: [325, 502, 472.3, 502, 397.15, 577.6],
        fill: '#00FFF0',
        closed: true,
        draggable: true

    };
    bluepos = {
        x: 165,
        y: -101,
    };
    greenImg = {
        points: [218, 324, 218, 399.1, 292.1, 473.2, 292.1, 398.1],
        fill: '#5FEB26',
        closed: true,
        draggable: true
    };
    greenpos = {
        x: 272,
        y: 77,
    };
    orangeImg = {
        points: [292, 291, 368.5, 291, 368.5, 366.9],
        fill: '#FFA60E',
        closed: true,
        draggable: true
    };
    orangepos = {
        x: 121.5,
        y: 109,
    };
    pinkImg = {
        points: [737, 392, 814.2, 392, 737, 472.8],
        fill: '#FF715F',
        closed: true,
        draggable: true
    };
    pinkpos = {
        x: -98.5,
        y: -72.5,
    };
    redImg = {
        points: [737, 305.9, 886.6, 305.9, 886.6, 152],
        fill: '#FC3E4B',
        closed: true,
        draggable: true

    };
    redpos = {
        x: -397.5,
        y: 94.5,
    };
    yellowImg = {
        points: [643, 210, 719, 210, 719, 291.8, 643, 291.8],
        fill: '#F5E51C',
        closed: true,
        draggable: true
    };
    yellowpos = {
        x: -81,
        y: 109,
    };
    grayImg = {
        points: [307, 100, 307, 251.3, 457.6, 251.3],
        fill: '#D1A37C',
        closed: true,
        draggable: true
    };
    graypos = {
        x: 182,
        y: 67.5,
    };

    posArray = [
        this.graypos,
        this.yellowpos,
        this.redpos,
        this.greenpos,
        this.orangepos,
        this.bluepos,
        this.pinkpos];
    limltleftArray = [
        307,
        643,
        737,
        217,
        292,
        325,
        737];
    limlttopArray = [
        100,
        210,
        152,
        324,
        291,
        502,
        392];
    limltbottomArray = [
        423.7,
        383.2,
        369.1,
        201.8,
        308.1,
        97.4,
        202.2];
    limltrightArray = [
        592.4,
        331,
        163.4,
        759.9,
        681.5,
        577.7,
        235.8];


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
