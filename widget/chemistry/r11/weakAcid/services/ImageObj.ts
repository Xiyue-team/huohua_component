
import * as Konva from 'konva';
import {Layer} from 'konva';

/**
 *
 */
export class ImageObj {

    dragTarget: any;
    correctTween: any;
    wrongTween: any;
    tweenX: any;

    constructor() {

     }

    //图片拖拽事件
    /**
     *
     * @param e 当前拖拽对象
     * @param group 下面的排序框
     * @param map //存放排序顺序的容器
     */
    dragMove(image:  Konva.Image, group: any, map: any, imagePositionConfig: any, layer: Konva.Layer) {

        image.on('dragmove touchmove', (e: any) => {
            image.setZIndex(30);
            const target = e.target;
            this.dragTarget = target;
            const arry =  group.getChildren().toArray();
            arry.push( imagePositionConfig.get(e.target.id()).group );

                for (let i = 0; i < arry.length; i ++) {
                    if (arry[i] ===  target) {
                        return;
                    }
                    if ( this.haveIntersection(arry[i], target)) {

                        if ( arry[i].id().indexOf('Content') > 0 ) {
                          //  console.log('复位');
                            //拖回原位
                            target.x(imagePositionConfig.get(e.target.id()).x);
                            target.y(imagePositionConfig.get(e.target.id()).y);
                            map.set(target.id(), {index: arry[i].id(), position: {imageX: target.x(), imageY: target.y()}});
                            layer.draw();
                            return;
                        }

                        //获取当前拖拽的球的原始位置信息
                        const currentTargetPosition = map.get(target.id());

                        //获取将要拖入目标框
                        const targetPlaceName = this.getRectPosition(map, i);

                        if ( currentTargetPosition && targetPlaceName &&
                            ( target.id() != targetPlaceName) && map.get(target.id()).index.indexOf('Content') == -1) {
                            //交换
                          //  console.log('交换' + target.id() + '--' + targetPlaceName);
                          //  console.log('原始球位置：' , currentTargetPosition.position.imageX , currentTargetPosition.position.imageY);

                            const targetPosition = map.get(targetPlaceName);
                          //  console.log('交换球位置：' , targetPosition.position.imageX , targetPosition.position.imageY);
                            //将原始球移动到指定位置
                            target.x(targetPosition.position.imageX);
                            target.y(targetPosition.position.imageY);

                            //指定位置的球移动到原始球的位置
                            const targetImg = layer.findOne(`#${targetPlaceName}`);
                            targetImg.x(currentTargetPosition.position.imageX);
                            targetImg.y(currentTargetPosition.position.imageY);


                            map.set(targetPlaceName, currentTargetPosition);
                            map.set(target.id(), targetPosition);
                            image.setZIndex(10);
                            // (window as any).viewHandler.printMapArry();
                           layer.draw();
                        } else if ( targetPlaceName &&  ( target.id() != targetPlaceName)) {
                           // console.log('交换222');
                            const parentPosition = imagePositionConfig.get(target.id());
                            target.x(parentPosition.x);
                            target.y(parentPosition.y);
                            layer.draw();


                        } else {
                        //    console.log('正常吸附');
                            //正常吸附


                            target.x(arry[i].x() - 40);
                            target.y(arry[i].y() - 40);
                            map.set(target.id(), {index: arry[i].id(), position: {imageX: target.x(), imageY: target.y()}});
                            layer.draw();
                        }

                    }
                }
        });

        image.on( 'dragend', (e: any) => {
            image.setZIndex(10);
        });
    }


    /**
     * 获取指定下标对应的元素
     * @param {number} index
     */
    getRectPosition(mapArray: any, index: number): any {

        let resultName = null;
        mapArray.forEach(( obj: any , name: any ) => {
            if ( obj.index == (index + 1)) {
                resultName =  name;
            }
        });
        return resultName;
    }

    //碰撞测试
    haveIntersection(r1:  any, r2:  any) {
           const length = Math.sqrt(Math.pow(r1.x() - r2.x(), 2) + Math.pow(r1.y() - r2.y(), 2));
           if (length < r1.radius() + 8) {
               return true;
           }
    }




    /**
     *排序正确
     * @param topText 上面框中文字
     * @param imageArry 下面框中图片
     */
    paiXuMethods(topText: Konva.Text, imageArry: any) {
        //获取框中图片坐标
        let falg = false;
           if (imageArry[0].x() > imageArry[1].x() && imageArry[1].x() > imageArry[2].x() && imageArry[2].x() > imageArry[3].x()  ) {
               falg = true;
           }
           return falg;
    }

    /**
     * 检查下面四个框 是否都在下面
     * @param {Konva.Text} topText
     * @param imageArry 图片
     * @param group 下面的框
     * @returns {boolean}
     */
    jianCeMethods(topText: Konva.Text, imageArry: any, group: any) {
        const arry = group.getChildren();
        if ( topText.y() < imageArry[0].y() && topText.y() < imageArry[1].y() && topText.y() < imageArry[2].y() &&
            topText.y() < imageArry[3].y() ) {
            return true;
        }
        setTimeout(() => {
        }, 1000);

        return false;
    }



    //排序显示正确或错误
    showInfo (obj: any , imgArry: Array<any> , flag: boolean, map: any, layer: Layer) {
        //排序错误
        if ( flag ) {
            //正确排序
            obj.imgCorrect.moveToTop();
            this.correctTween = new Konva.Tween({
                node  :   obj.imgCorrect,
                x  :   obj.imgCorrect.x(),
                y  :   obj.imgCorrect.y(),
                duration  : 0,
                easing  :  Konva.Easings.EaseInOut,
                onFinish  :  () => {
                    obj.imgCorrect.visible(true);
                    document.getElementById('comfirm').setAttribute('disabled', 'disabled');
                }
            });
            this.correctTween.play();
        } else {
            //错误排序
            obj.imgErro.visible(true);
            obj.imgErro.moveToTop();
            // 添加代码 设置按钮可见
            (window as any).viewHandler.viewModel.$data.jxtzBtn = true;
            (window as any).viewHandler.viewModel.$data.zxpxBtn = true;
            imgArry[0].setZIndex(10);
            imgArry[1].setZIndex(10);
            imgArry[2].setZIndex(10);
            imgArry[3].setZIndex(10);
            this.wrongTween = new Konva.Tween({
                node  :  obj.imgErro,
                x  :    obj.imgErro.x(),
                y  :    obj.imgErro.y(),
                duration  : 0,
                easing  :  Konva.Easings.EaseInOut,
                onFinish  :  () => {
                  // const time1 = setTimeout( () => {
                  //      // obj.imgErro.visible(false);
                  //       clearTimeout(time1);
                  // }, 1000);

                  // 移除按钮disabled属性
                    document.getElementById('jxtzBtn').removeAttribute('disabled');
                    document.getElementById('zqpxBtn').removeAttribute('disabled');

                    //显示正确排序
                   // this.tweenX.play();
                }
            });

           // 显示正确答案位置
            this.wrongTween.play();
        }

    }


    //显示正确答案位置的动画 提取到一个方法中
    /**
     * 点击正确排序按钮 显示正确排序
     * @param obj
     * @param {Array<any>} imgArry
     * @param {Konva.Layer} layer
     */
    showCorrectQuestionTween(obj: any , imgArry: Array<any> , layer: Layer) {
        obj.imgErro.visible(false); //隐藏错误提示框
        this.tweenX =  new Konva.Tween({
            node  :   obj.imgCorrect,
            x  :   obj.imgCorrect.x(),
            y  :   obj.imgCorrect.y(),
            duration  : 0,
            easing  :  Konva.Easings.EaseInOut,
            onFinish  :  () => {
                //正确排序
                obj.imgCorrect.visible(false);
                obj.txtArry[0].visible(true);
                obj.txtArry[1].visible(true);
                obj.txtArry[2].visible(true);
                obj.txtArry[3].visible(true);
                //状态开关
                //排序正确位置
                //ch3cooh
                imgArry[3].x( obj.stage.getWidth() * (0.151 + 0.01) - 5 + 30 + 10);
                imgArry[3].y( obj.stage.getHeight() * (0.247 + 0.02) + 180);
                //h2co3
                imgArry[2].x( obj.stage.getWidth() * (0.442 + 0.02) - 140 + 30 + 10);
                imgArry[2].y( obj.stage.getHeight() * (0.061 + 0.03) + 315);

                //c2h5oh 400+90
                imgArry[1].x(400 + 80 + 30 + 10);
                imgArry[1].y(129 + 245);
                //hco3
                imgArry[0].x(630 + 20 + 30 + 10);
                imgArry[0].y(154 + 225);

                document.getElementById('comfirm').setAttribute('disabled', 'disabled');
                imgArry[3].setListening(false);
                imgArry[2].setListening(false);
                imgArry[1].setListening(false);
                imgArry[0].setListening(false);
                layer.draw();
            }
        });
        this.tweenX.play();
    }


    //点击继续挑战按钮 返回点击确认按钮前状态
    /**
     *
     * @param obj
     * @param {Array<any>} imgArry
     * @param {Konva.Layer} layer
     * @param map
     */
    returnSortBeforeStatus(obj: any, imgArry: Array<any>, layer: Layer) {
        obj.imgErro.visible(false); //隐藏错误提示框
        //事件监听开启
        imgArry[3].setListening(true);
        imgArry[2].setListening(true);
        imgArry[1].setListening(true);
        imgArry[0].setListening(true);
        layer.draw(); //重绘
    }

    getJISportOne(imageArryContainer: any): Array<any> {
        const x = imageArryContainer.x();
        const y = imageArryContainer.y();

        const p1 = {x: x - 10 , y: y + 0};
        const p2 = {x: x + 10, y: y - 10};
        const p3 = {x: x - 10, y: y - 20};
        const p4 = {x: x - 10, y: y - 0};

        return [p1, p2, p3, p4];
    }


    getJISportTwo(imageArryContainer: any): Array<any> {
        const x = imageArryContainer.x();
        const y = imageArryContainer.y();

        const p1 = {x: x + 10 , y: y - 10};
        const p2 = {x: x + 10, y: y - 10};
        const p3 = {x: x - 10, y: y - 20};
        const p4 = {x: x + 10, y: y - 10};

        return [p1, p2, p3, p4];
    }

    getJISportThree(imageArryContainer: any): Array<any> {
        const x = imageArryContainer.x();
        const y = imageArryContainer.y();

        const p1 = {x: x - 10 , y: y + 10};
        const p2 = {x: x + 10, y: y + 10};
        const p3 = {x: x - 0, y: y - 10};
        const p4 = {x: x + 10, y: y + 10};

        return [p1, p2, p3, p4];
    }

    getJISportFour(imageArryContainer: any): Array<any> {
        const x = imageArryContainer.x();
        const y = imageArryContainer.y();

        const p1 = {x: x + 10 , y: y - 10};
        const p2 = {x: x - 10, y: y + 10};
        const p3 = {x: x - 10, y: y - 10};
        const p4 = {x: x + 10, y: y + 10};

        return [p1, p2, p3, p4];
    }





    getClSportOne(imageArryCL: any): Array<any> {
        const x = imageArryCL.x();
        const y = imageArryCL.y();

        const p1 = {x: x + 5 , y: y - 5};
        const p2 = {x: x + 5 , y: y + 5};
        const p3 = {x: x + 5, y: y - 5};
        const p4 = {x: x + 5, y: y - 5};

        return [p1, p2, p3, p4];
    }

    getClSportTwo(imageArryCL: any): Array<any> {
        const x = imageArryCL.x();
        const y = imageArryCL.y();

        const p1 = {x: x - 5 , y: y + 5};
        const p2 = {x: x + 5, y: y - 5};
        const p3 = {x: x - 5, y: y - 5};
        const p4 = {x: x - 5, y: y + 5};

        return [p1, p2, p3, p4];
    }

    getClSportThree(imageArryCL: any): Array<any> {
        const x = imageArryCL.x();
        const y = imageArryCL.y();

        const p1 = {x: x - 5 , y: y + 5};
        const p2 = {x: x - 5, y: y - 5};
        const p3 = {x: x - 5, y: y - 5};
        const p4 = {x: x + 5, y: y + 5};

        return [p1, p2, p3, p4];
    }

}
