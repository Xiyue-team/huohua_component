import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import StoryCanvas from './StoryCanvas';
import ExternalControl from "../ExternalControl";



const VConsole = require('VConsole');
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {


    storyCanvas: StoryCanvas;
    externalModel: ExternalControl;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();

        this.storyCanvas = new StoryCanvas();

        this.externalModel = new ExternalControl();

    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
    }


}
