import * as Konva from 'konva';

export class BirdConfig {
    graykonva: Konva.Line;
    yellowkonva: Konva.Line;
    redkonva: Konva.Line;
    greenkonva: Konva.Line;
    orangekonva: Konva.Line;
    bluekonva: Konva.Line;
    pinkkonva: Konva.Line;

    blueImg = {
        points: [578, 200, 709.3, 200, 645, 134],
        fill: '#00FFF0',
        closed: true,
        draggable: true
    };
    bluepos = {
        x: 22,
        y: 154.5,
    };
    greenImg = {
        points: [186, 215.3, 234.3, 167, 323.8, 168, 277.5, 215.3],
        fill: '#5FEB26',
        closed: true,
        draggable: true
    };
    greenpos = {
        x: 141,
        y: 185.5,
    };
    orangeImg = {
        points: [460.6, 118.35, 508, 72.3, 508, 164.4],
        fill: '#FFA60E',
        closed: true,
        draggable: true
    };
    orangepos = {
        x: 92,
        y: 188.5,
    };
    pinkImg = {
        points: [805, 384.3, 852.4, 335, 897.8, 384.3],
        fill: '#FF715F',
        closed: true,
        draggable: true
    };
    pinkpos = {
        x: -340,
        y: 66,
    };
    redImg = {
        points: [139, 287, 325.7, 287, 231.35, 382.7],
        fill: '#FC3E4B',
        closed: true,
        draggable: true
    };
    redpos = {
        x: 325,
        y: 66.3,
    };
    yellowImg = {
        points: [184, 462.35, 230.4, 414, 276.8, 462.35, 230.4, 510.7],
        fill: '#F5E51C',
        closed: true,
        draggable: true
    };
    yellowpos = {
        x: 234,
        y: -60.5,
    };
    grayImg = {
        points: [324, 479, 324, 611.5, 460.2, 611.5],
        fill: '#D1A37C',
        closed: true,
        draggable: true
    };
    graypos = {
        x: 141,
        y: -257.5,
    };
    posArray = [
        this.graypos,
        this.yellowpos,
        this.redpos,
        this.greenpos,
        this.orangepos,
        this.bluepos,
        this.pinkpos];
    limltbottomArray = [
        63.5,
        164.3,
        292.3,
        459.7,
        510.6,
        475,
        290.7];
    limltrightArray = [
        589.8,
        773.2,
        724.3,
        726.2,
        548,
        340.7,
        152.2];
    limltleftArray = [
        324,
        184,
        139,
        186,
        460.6,
        578,
        805];
    limlttopArray = [
        479,
        414,
        287,
        167,
        72.3,
        134,
        335];
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
