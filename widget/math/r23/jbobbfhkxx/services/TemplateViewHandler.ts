import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import FormulaOneCanvas from './FormulaOneCanvas';
import FormulaTwoCanvas from './FormulaTwoCanvas';
import FormulaThreeCanvas from './FormulaThreeCanvas';
import FormulaFourCanvas from './FormulaFourCanvas';
import FormulaFiveCanvas from './FormulaFiveCanvas';
import FormulaSixCanvas from './FormulaSixCanvas';
import { Helper } from './Helper';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    myCanvas: fabric.Canvas;

    formulaOneCanvas: FormulaOneCanvas;
    formulaTwoCanvas: FormulaTwoCanvas;
    formulaThreeCanvas: FormulaThreeCanvas;
    formulaFourCanvas: FormulaFourCanvas;
    formulaFiveCanvas: FormulaFiveCanvas;
    formulaSixCanvas: FormulaSixCanvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.init();
        this.formulaOneCanvas = new FormulaOneCanvas(this.myCanvas);
        this.formulaTwoCanvas = new FormulaTwoCanvas(this.myCanvas);
        this.formulaThreeCanvas = new FormulaThreeCanvas(this.myCanvas);
        this.formulaFourCanvas = new FormulaFourCanvas(this.myCanvas);
        this.formulaFiveCanvas = new FormulaFiveCanvas(this.myCanvas);
        this.formulaSixCanvas = new FormulaSixCanvas(this.myCanvas);
        this.myCanvas.renderAll();
        ViewController.getInstance().hideLoading(1000);
    }

    init() {
        const helper = new Helper();
        this.myCanvas = helper.createCanvas('storyCanvas1');
        helper.createAxis(this.myCanvas);
        helper.createCircle(this.myCanvas);
    }




    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        (this.viewModel as any).resetEvent();

        this.myCanvas.renderAll();
    }

}
