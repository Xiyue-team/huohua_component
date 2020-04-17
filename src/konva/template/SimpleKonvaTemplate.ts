/**
 *konva模板类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {default as Konva, ImageConfig, Layer, Stage} from 'konva';

export class SimpleKonvaTemplate {

    //动画层
    animationLayer: Layer;
    //静态层
    staticLayer: Layer;

    stage: Stage;

    domId: string;


    constructor(domId: string) {
        this.domId = domId;

        this.initStage();
        this.initLayer();
    }

    private initStage(): void {

        Konva.pixelRatio = window.devicePixelRatio;
        this.stage = new Konva.Stage({
            container: this.domId,
            width: document.getElementById(this.domId).clientWidth,
            height: document.getElementById(this.domId).clientHeight
        });
    }

    private initLayer(): void {
        this.staticLayer = new Layer();
        //this.staticLayer.transformsEnabled( 'none') ;

        this.animationLayer = new Layer();
        this.stage.add(this.staticLayer, this.animationLayer);

    }

    /**
     * 封装加载konva图片
     * @param {string} src
     * @param {Konva.ImageConfig} imageConfig
     * @returns {Promise<Konva.Image>}
     */
    loadImage(src: string, imageConfig: ImageConfig): Promise<Konva.Image> {
        return new Promise<Konva.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new Konva.Image(Object.assign({image: img}, imageConfig));
                resolve(imgObj);
            };
            img.src = src;
        });
    }


}
