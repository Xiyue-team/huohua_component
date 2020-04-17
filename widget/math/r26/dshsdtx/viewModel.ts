import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {DshsdtxViewHandler} from './services/DshsdtxViewHandler';

const viewOptionConfig = require('./meta.json');

import * as formula1 from './sub_static/formulas/y=log2x.png';
import * as formula2 from './sub_static/formulas/y=log3x.png';
import * as formula3 from './sub_static/formulas/y=log1-2x.png';
import * as formula4 from './sub_static/formulas/y=log1-3x.png';

import * as graphic1 from './sub_static/graphics/y=log2x.png';
import * as graphic2 from './sub_static/graphics/y=log3x.png';
import * as graphic3 from './sub_static/graphics/y=log1-2x.png';
import * as graphic4 from './sub_static/graphics/y=log1-3x.png';

import * as point1 from './sub_static/points/y=log2x.png';
import * as point2 from './sub_static/points/y=log3x.png';
import * as point3 from './sub_static/points/y=log1-2x.png';
import * as point4 from './sub_static/points/y=log1-3x.png';



@Component
export class ViewModel extends Vue {
    count: number  = 0;
    title: string  = window.env.browserInfo.lang.title;
    button: string = window.env.browserInfo.lang.button;
    isFormulaSelect: boolean = false;
    isButtonClick: boolean = false;
    formulas = [
        {visiable: false, src: formula1},
        {visiable: false, src: formula2},
        {visiable: false, src: formula3},
        {visiable: false, src: formula4},
    ];
    graphics = [
        {visiable: false, src: graphic1},
        {visiable: false, src: graphic2},
        {visiable: false, src: graphic3},
        {visiable: false, src: graphic4},
    ];
    points = [
        {visiable: false, src: point1},
        {visiable: false, src: point2},
        {visiable: false, src: point3},
        {visiable: false, src: point4},
    ];

    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new DshsdtxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }

    getGraphic(index: number) {
        let count = 0;
        this.graphics[index].visiable = !this.graphics[index].visiable;
        this.formulas[index].visiable = !this.formulas[index].visiable;
        this.graphics.forEach((graphic) => {
            if (graphic.visiable) {
                count++;
            }
        });
        this.showPointAndLine(count);
    }

    getPoint() {
        this.isButtonClick = !this.isButtonClick;
    }

    resetEvent() {
        for (const index in this.formulas) {
            this.graphics[index].visiable = false;
            this.formulas[index].visiable = false;
            this.isButtonClick = false;
            this.isFormulaSelect = false;
        }
    }

    private showPointAndLine(count: number) {
        if (count > 0) {
            this.isFormulaSelect = true;
        } else {
            this.isFormulaSelect = false;
            this.isButtonClick = false;
        }
    }


}
