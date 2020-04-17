import {CommonViewHandler} from '../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {IsoMery3DModel} from './IsoMery3DModel';
import {Euler, Object3D, Quaternion, } from 'three';
import {ViewController} from "../../../../src/core/ViewController";

export class IsoMeryViewHandler extends CommonViewHandler implements ViewHandler {

    isDragging = false;
    isTouching = false;

    previousMousePositionX = 0;
    previousMousePositionY = 0;
    previousTouchPositionX = 0;
    previousTouchPositionY = 0;

    isoMeryModel: IsoMery3DModel;
    constructor (vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        // const fov = 30;
        // const near = 1;
        // const far = 3000;
        // //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        // const width = document.getElementById('3dContainer').clientWidth;
        // const height = document.getElementById('3dContainer').clientHeight;
        // this.isoMeryModel = new IsoMery3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        // this.gltf = new Gltf3DModel(document.getElementById('3dContainer'));
        this.isoMeryModel = new IsoMery3DModel(document.getElementById('3dContainer'));
        ViewController.getInstance().hideLoading();
        this.initElement();
    }

    initElement() {
        this.initEvent();
    }

    //显示模型
    showModel (x: any) {
        switch (x) {
            case 4:
                if (this.isoMeryModel.modelArry.length === 0) {
                    this.isoMeryModel.initGltfLoader();
                } else {
                    this.isoMeryModel.modelArry[0].visible = true;
                    this.isoMeryModel.modelArry[1].visible = true;
                    this.isoMeryModel.modelArry[2].visible = true;
                    this.isoMeryModel.textArry[0].visible = true;
                    this.isoMeryModel.textArry[1].visible = true;
                    this.isoMeryModel.textArry[2].visible = true;
                }
                break;
            case 5:
                if (this.isoMeryModel.modelArry2.length === 0) {
                    this.isoMeryModel.initGLtfLoaderTwo();
                } else {
                    this.isoMeryModel.modelArry2[0].visible = true;
                    this.isoMeryModel.modelArry2[1].visible = true;
                    this.isoMeryModel.modelArry2[2].visible = true;
                    this.isoMeryModel.textArry2[0].visible = true;
                    this.isoMeryModel.textArry2[1].visible = true;
                    this.isoMeryModel.textArry2[2].visible = true;
                }
                break;
            case 6:
                if (this.isoMeryModel.modelArry3.length === 0) {
                    this.isoMeryModel.initGltfLoaderThree();
                } else {
                    this.isoMeryModel.modelArry3[0].visible = true;
                    this.isoMeryModel.modelArry3[1].visible = true;
                    this.isoMeryModel.textArry3[0].visible = true;
                    this.isoMeryModel.textArry3[1].visible = true;
                }
                break;
            case 7:
                if (this.isoMeryModel.modelArry4.length === 0) {
                    this.isoMeryModel.initGltfLoaderFour();
                } else {
                    this.isoMeryModel.modelArry4[0].visible = true;
                    this.isoMeryModel.modelArry4[1].visible = true;
                    this.isoMeryModel.textArry4[0].visible = true;
                    this.isoMeryModel.textArry4[1].visible = true;
                }
                break;
            case 8:
                if (this.isoMeryModel.modelArry5.length === 0) {
                    this.isoMeryModel.initGltfLoaderFive();
                } else {
                    this.isoMeryModel.modelArry5[0].visible = true;
                    this.isoMeryModel.modelArry5[1].visible = true;
                    this.isoMeryModel.textArry5[0].visible = true;
                    this.isoMeryModel.textArry5[1].visible = true;
                }
                break;
        }

        this.changeDivZindex(true);
    }

    //改变div层级和鼠标移上手势
    changeDivZindex(falg: boolean) {
      if (falg) {
          document.getElementById('show_one').style.zIndex = '-2';
          document.getElementById('show_two').style.zIndex = '-2';
          document.getElementById('show_three').style.zIndex = '-2';
          document.getElementById('show_model_one').style.zIndex = '-2';
          document.getElementById('show_model_two').style.zIndex = '-2';
          document.getElementById('show_model_three').style.zIndex = '-2';
          document.getElementById('show_model_four').style.zIndex = '-2';
          document.getElementById('show_model_five').style.zIndex = '-2';
      } else {
          document.getElementById('show_one').style.zIndex = '2';
          document.getElementById('show_two').style.zIndex = '2';
          document.getElementById('show_three').style.zIndex = '2';
          document.getElementById('show_model_one').style.zIndex = '2';
          document.getElementById('show_model_two').style.zIndex = '2';
          document.getElementById('show_model_three').style.zIndex = '2';
          document.getElementById('show_model_four').style.zIndex = '2';
          document.getElementById('show_model_five').style.zIndex = '2';
      }
    }
    //点击重置或返回按钮调用 还原div层级

    //重置模型位置
    resetModelLocal() {
        const arry = this.isoMeryModel.modelArry;
        const arry2 = this.isoMeryModel.modelArry2;
        const arry3 = this.isoMeryModel.modelArry3;
        const arry4 = this.isoMeryModel.modelArry4;
        const arry5 = this.isoMeryModel.modelArry5;


        if (this.isoMeryModel.modelArry.length !== 0) {
            for (let i = 0; i < arry.length; i++) {
                arry[i].rotation.set(0, 0 , 0);
                arry[i].updateMatrix();
            }
        }

        if (this.isoMeryModel.modelArry2.length !== 0) {
            for (let i = 0; i < arry2.length; i++) {
                arry2[i].rotation.set(0, 0 , 0);
                arry2[i].updateMatrix();
            }
        }


        if (this.isoMeryModel.modelArry3.length !== 0) {
            for (let i = 0; i < arry3.length; i++) {
                arry3[i].rotation.set(0, 0 , 0);
                arry3[i].updateMatrix();
            }
        }


        if (this.isoMeryModel.modelArry4.length !== 0) {
            for (let i = 0; i < arry4.length; i++) {
                arry4[i].rotation.set(0, 0 , 0);
                arry4[i].updateMatrix();
            }
        }

        if (this.isoMeryModel.modelArry5.length !== 0) {
            for (let i = 0; i < arry5.length; i++) {
                arry5[i].rotation.set(0, 0 , 0);
                arry5[i].updateMatrix();
            }
        }
    }

    toRadians(angle: number) {
        return angle * (Math.PI / 180);
    }

    toDegrees(angle: number) {
        return angle * (180 / Math.PI);
    }

    initEvent() {
      document.getElementById('father_div').onmouseup = this.boxMouseUp;
      document.getElementById('father_div').onmousedown = this.boxMouseDown;
      document.getElementById('father_div').onmousemove = this.boxMouseMove;

      document.getElementById('father_div').ontouchstart = this.boxTouchStart;
      document.getElementById('father_div').ontouchend = this.boxTouchEnd;
      document.getElementById('father_div').ontouchmove = this.boxTouchMove;
    }

    /* 鼠标事件  */
    boxMouseOut(event: MouseEvent) {
        this.isDragging = false;
    }

    boxMouseDown(event: MouseEvent) {
        this.isDragging = true;
    }
    boxMouseUp(event: Event) {
        this.isDragging = false;
    }
    boxMouseMove(event: MouseEvent) {
        const deltaMove = {
            x: event.offsetX - this.previousMousePositionX,
            y: event.offsetY - this.previousMousePositionY
        };

        if (this.isDragging) {

            const x = (window as any).viewHandler.toRadians(deltaMove.y * 1);
            const y = (window as any).viewHandler.toRadians(deltaMove.x * 1);
            const deltaRotationQuaternion = new Quaternion().
            setFromEuler(
                new Euler(x, y, 0, 'XYZ')
            );

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry[i].quaternion);
            }

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry2.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry2[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry2[i].quaternion);
            }

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry3.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry3[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry3[i].quaternion);
            }
            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry4.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry4[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry4[i].quaternion);
            }
            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry5.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry5[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry5[i].quaternion);
            }
        }

        this.previousMousePositionX = event.offsetX;
        this.previousMousePositionY = event.offsetY;
    }

    //触摸事件
    boxTouchStart(event: any) {
        this.isTouching = true;
    }
    boxTouchEnd(event: any) {
        this.isTouching = false;
    }
    boxTouchMove(event: any) {
        console.log(event);
        console.log('pageX: ' + event.touches[0].pageX);
        console.log('pageY: ' + event.touches[0].pageY);
        let pageX = event.touches[0].pageX;
        let pageY = event.touches[0].pageY;
        //direction == 1 竖屏
        if ((window as any)['direction'] === 1) {
            pageX = event.touches[0].pageY;
            pageY = event.touches[0].pageX;
        }

        const deltaMove = {
           x: pageX - this.previousTouchPositionX,
           y: pageY - this.previousTouchPositionY
        };

        if (this.isTouching) {

            const x = (window as any).viewHandler.toRadians(deltaMove.y * 1);
            const y = (window as any).viewHandler.toRadians(deltaMove.x * 1);
            console.log('isTouching : ' + x + '--' + y);
            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                new Euler(x, y, 0, 'XYZ')
            );

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry[i].quaternion);
            }

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry2.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry2[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry2[i].quaternion);
            }

            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry3.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry3[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry3[i].quaternion);
            }
            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry4.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry4[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry4[i].quaternion);
            }
            for (let i = 0; i <  (window as any).viewHandler.isoMeryModel.modelArry5.length; i++) {
                (window as any).viewHandler.isoMeryModel.modelArry5[i].quaternion.multiplyQuaternions(deltaRotationQuaternion,
                    (window as any).viewHandler.isoMeryModel.modelArry5[i].quaternion);
            }

        }

        this.previousTouchPositionX = event.touches[0].pageX;
        this.previousTouchPositionY = event.touches[0].pageY;

        if ((window as any)['direction'] === 1) {
            this.previousTouchPositionX = event.touches[0].pageY;
            this.previousTouchPositionY = event.touches[0].pageX;
        }
    }


    //添加内容
    createText(textObj: any) {
        document.getElementById('model_title').innerText = textObj.title;
        document.getElementById('3dContainer').style.position = 'absolute';
        document.getElementById('3dContainer').style.top = '0px';
        document.getElementById('3dContainer').style.left = '0px';
    }

    hiddenModel () { //点击返回按钮， 隐藏模型
        const arry = this.isoMeryModel.modelArry;
        const arryText = this.isoMeryModel.textArry;
        const arry2 = this.isoMeryModel.modelArry2;
        const arryText2 = this.isoMeryModel.textArry2;
        const arry3 = this.isoMeryModel.modelArry3;
        const arryText3 = this.isoMeryModel.textArry3;
        const arry4 = this.isoMeryModel.modelArry4;
        const arryText4 = this.isoMeryModel.textArry4;
        const arry5 = this.isoMeryModel.modelArry5;
        const arryText5 = this.isoMeryModel.textArry5;

        if (this.isoMeryModel.modelArry.length !== 0) {
            for (let i = 0; i < arry.length; i++) {
                arry[i].visible = false;
                arryText[i].visible = false;
                console.log('4566');
            }
        }

        if (this.isoMeryModel.modelArry2.length !== 0) {
            for (let i = 0; i < arry2.length; i++) {
                arry2[i].visible = false;
                arryText2[i].visible = false;
            }
        }


        if (this.isoMeryModel.modelArry3.length !== 0) {
            for (let i = 0; i < arry3.length; i++) {
                arry3[i].visible = false;
                arryText3[i].visible = false;
            }
        }


        if (this.isoMeryModel.modelArry4.length !== 0) {
            for (let i = 0; i < arry4.length; i++) {
                arry4[i].visible = false;
                arryText4[i].visible = false;
            }
        }

        if (this.isoMeryModel.modelArry5.length !== 0) {
            for (let i = 0; i < arry5.length; i++) {
                arry5[i].visible = false;
                arryText5[i].visible = false;
            }
        }

    }


    //页面大小发生改变
    resize() {
        super.resize();
    }
    //重置页面
    reset() {
        super.reset();
        // //重置模型位置
        this.resetModelLocal();

    }
}
