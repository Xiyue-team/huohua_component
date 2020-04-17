import {fabric} from 'fabric';

export class FabricUtil {


    static loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src ;
        });
    }

    static findById(canvas: any, id: string) {
        let object;
        const size = canvas.getObjects().length;
        for (let i = 0, len = size; i < len; i++) {
            if (canvas.getObjects()[i].id && canvas.getObjects()[i].id === id) {
                object = canvas.getObjects()[i];
                break;
            }
        }

        return object;
    }


    static findByNames(canvas: any, name: string, call?: Function): Array<any> {
        const objects: any[] = [];
        const size = canvas.getObjects().length;
        for (let i = 0, len = size; i < len; i++) {
            if (canvas.getObjects()[i].name && canvas.getObjects()[i].name === name) {
                objects.push(canvas.getObjects()[i]);
                if (call) {
                    call(canvas.getObjects()[i]);
                }
            }
        }

        return objects;
    }

    static findByCustom(canvas: any, custom: any, name: string, call?: Function): Array<any> {
        const objects: any[] = [];
        const size = canvas.getObjects().length;
        for (let i = 0, len = size; i < len; i++) {
            if (canvas.getObjects()[i][custom] && canvas.getObjects()[i][custom] === name) {
                objects.push(canvas.getObjects()[i]);
                if (call) {
                    call(canvas.getObjects()[i]);
                }
            }
        }

        return objects;
    }



    static removeByName(myCanvas: any, stageName: any) {
        const objList = FabricUtil.findByNames(myCanvas, stageName, (obj: any) => {
            //obj.set('opacity', 0);
            //this.myCanvas.sendToBack(obj);
        });
        objList.forEach((object) => {
            myCanvas.remove(object);
        });
        //this.myCanvas.renderAll();
    }

}
