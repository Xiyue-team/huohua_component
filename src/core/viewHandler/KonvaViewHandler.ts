import {CommonViewHandler} from '../CommonViewHandler';
import {ViewHandler} from '../CoreInterface';
import * as Konva from 'konva';
import {ImageConfig} from 'konva';

/**
 *使用konva.js 时继承的viewHandler 类
 * 封装常用方法
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/19 11:07
 */

export class KonvaViewHandler extends CommonViewHandler implements ViewHandler {



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
