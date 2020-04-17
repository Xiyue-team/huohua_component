import * as smallhouse from '../sub_static/house.svg';
import * as smallbird from '../sub_static/bird.svg';
import * as smalltree from '../sub_static/tree.svg';
import * as smallwindmill from '../sub_static/windmill.svg';
import Konva from 'konva';

export class MyConfig {
    housekonva: Konva.Image;
    treekonva: Konva.Image;
    birdkonva: Konva.Image;
    windmillkonva: Konva.Image;
    smallhousekonva: Konva.Image;
    smalltreekonva: Konva.Image;
    smallbirdkonva: Konva.Image;
    smallwindmillkonva: Konva.Image;

    wholeImg = {
        x: 364,
        y: 155,
        width: 367.3,
        height: 362.6,
    };
    birdImg = {
        x: 326,
        y: 221,
        width: 407.2,
        height: 229.2,
    };
    treeImg = {
        x: 346,
        y: 155,
        width: 367.1,
        height: 362.4,
    };
    houseImg = {
        x: 399,
        y: 178,
        width: 402.9,
        height: 318.5,
    };
    windmillImg = {
        x: 341,
        y: 169,
        width: 377,
        height: 381.3,
    };
    smallbirdImg = {
        x: 1050,
        y: 110,
        width: 122.2,
        height: 68.7,
    };
    smalltreeImg = {
        x: 1050,
        y: 209,
        width: 110.1,
        height: 108.7,
    };
    smallwindmillImg = {
        x: 1050,
        y: 474,
        width: 113.1,
        height: 114.4,
    };
    smallhouseImg = {
        x: 1050,
        y: 348,
        width: 120.9,
        height: 95.5,
    };
    componentsArray = [
        smallbird,
        smalltree,
        smallhouse,
        smallwindmill,
    ];
    imgArray = [
        this.birdImg,
        this.treeImg,
        this.houseImg,
        this.windmillImg,
    ];
    smallimgArray = [
        this.smallbirdImg,
        this.smalltreeImg,
        this.smallhouseImg,
        this.smallwindmillImg,
    ];
    konvaArray = [
        this.birdkonva,
        this.treekonva,
        this.housekonva,
        this.windmillkonva,
    ];
    smallkonvaArray = [
        this.smallbirdkonva,
        this.smalltreekonva,
        this.smallhousekonva,
        this.smallwindmillkonva,
    ];
}








