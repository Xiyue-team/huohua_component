import {default as Konva, Layer} from 'konva';

/**
 *网格方法
 *@since 2.0
 *@author zhiguo
 *@Date 2018/11/26 9:48
 */
export class Grid {

    blockSnapSize: number;
    width: number;
    height: number;

    constructor(width: number, height: number, blockSnapSize = 30) {
        this.width = width;
        this.height = height;
        this.blockSnapSize = blockSnapSize;
    }

    createGrid() {
        const gridLayer = new Layer({id: 'gridLayer'});
        const padding = this.blockSnapSize;

        console.log(this.width, padding, this.width / padding);
        for (let i = 0; i < this.width / padding; i++) {
            gridLayer.add(new Konva.Line({
                points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, this.height ],
                stroke: '#FFF',
                opacity: 0.08,
                strokeWidth: 2,
            }));
        }

        gridLayer.add(new Konva.Line({points: [0, 0, 10, 10]}));
        for (let j = 0; j < this.height / padding; j++) {
            gridLayer.add(new Konva.Line({
                points: [0, Math.round(j * padding), this.width, Math.round(j * padding)],
                stroke: '#FFF',
                opacity: 0.08,
                strokeWidth: 2,
            }));
        }

        return gridLayer;
        /*const layer = new Konva.Layer();
        this.shadowRectangle.hide();
        layer.add(this.shadowRectangle);
        this.newRectangle(this.blockSnapSize * 3, this.blockSnapSize * 3, layer, this.stage);
        this.newRectangle(this.blockSnapSize * 10, this.blockSnapSize * 3, layer, this.stage);

        this.stage.add(gridLayer);
        this.stage.add(layer);*/
    }
}
