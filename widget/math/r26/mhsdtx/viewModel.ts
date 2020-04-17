import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {MhsdtxViewHandler} from './services/MhsdtxViewHandler';

const viewOptionConfig = require('./meta.json');

import * as formula1 from './sub_static/formulas/y=x.png';
import * as formula2 from './sub_static/formulas/y=x2.png';
import * as formula3 from './sub_static/formulas/y=x3.png';
import * as formula4 from './sub_static/formulas/y=x1-2.png';
import * as formula5 from './sub_static/formulas/y=x1-3.png';
import * as formula6 from './sub_static/formulas/y=x-1-2.png';
import * as formula7 from './sub_static/formulas/y=x-1-3.png';
import * as formula8 from './sub_static/formulas/y=x-1.png';
import * as formula9 from './sub_static/formulas/y=x-2.png';
import * as formula10 from './sub_static/formulas/y=x-3.png';


import * as graphic1 from './sub_static/graphics/y=x.png';
import * as graphic2 from './sub_static/graphics/y=x2.png';
import * as graphic3 from './sub_static/graphics/y=x3.png';
import * as graphic4 from './sub_static/graphics/y=x1-2.png';
import * as graphic5 from './sub_static/graphics/y=x1-3.png';
import * as graphic6 from './sub_static/graphics/y=x-1-2.png';
import * as graphic7 from './sub_static/graphics/y=x-1-3.png';
import * as graphic8 from './sub_static/graphics/y=x-1.png';
import * as graphic9 from './sub_static/graphics/y=x-2.png';
import * as graphic10 from './sub_static/graphics/y=x-3.png';

@Component
export class ViewModel extends Vue {
    title: string = window.env.browserInfo.lang.title;
    button: string = window.env.browserInfo.lang.button;
    isFormulaSelect: boolean = false;
    formulas = [
        {visiable: false, src: formula1},
        {visiable: false, src: formula2},
        {visiable: false, src: formula3},
        {visiable: false, src: formula4},
        {visiable: false, src: formula5},
        {visiable: false, src: formula6},
        {visiable: false, src: formula7},
        {visiable: false, src: formula8},
        {visiable: false, src: formula9},
        {visiable: false, src: formula10},
    ];
    graphics = [
        {visiable: false, src: graphic1},
        {visiable: false, src: graphic2},
        {visiable: false, src: graphic3},
        {visiable: false, src: graphic4},
        {visiable: false, src: graphic5},
        {visiable: false, src: graphic6},
        {visiable: false, src: graphic7},
        {visiable: false, src: graphic8},
        {visiable: false, src: graphic9},
        {visiable: false, src: graphic10},
    ];

    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new MhsdtxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
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
        this.showPoint(count);
    }


    showPoint(count: number) {
        if (count > 0) {
            this.isFormulaSelect = true;
        } else {
            this.isFormulaSelect = false;
        }
    }

    mounted() {
        ViewController.getInstance().domReady();
    }

    resetEvent() {
        this.isFormulaSelect = false;
        for (const index in this.formulas) {
            this.graphics[index].visiable = false;
            this.formulas[index].visiable = false;
        }
    }


}
