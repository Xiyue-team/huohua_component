import { Animation } from '../../util/Animation';
import {BrowserUtil} from '../../util/BrowserUtil';
export class KeyFrameAnimationCore {

    animationObj: Animation;
    private isStop = false;
    private animationCtrl = true;
    private interval = 80;
    private imageArray: string[] = [];
    private fragmentArray: any[] = [];
    private imgElm: any;
    private imgWidth: string;
    private imgHeight: string;
    private name: string;
    private range: number[];
    private isInfinite: boolean;


    constructor(imageArray: any,  imgWidth: number, imgHeight: number, name: string, interval?: number,
                  playRange?: any[], isIos?: boolean, isInfinite?: boolean) {

        if (interval) {
            this.interval = interval;
        }
        this.isInfinite = isInfinite;
        this.name = name;
        if (isIos) {
            this.imgElm = document.getElementById('animationFrameIos' + name);
            this.imageArray = imageArray;
            this.animationObj = new Animation( () => {
                this.animationProgressIos(playRange);
            }, this.interval);
        } else {
            this.imgElm = document.getElementById('animationFrame' + name);
            this.imageArray = imageArray;
            this.animationObj = new Animation( () => {
                this.animationProgress(playRange);
            }, this.interval);
            this.imgWidth = imgWidth  + 'px';
            this.imgHeight = imgHeight  + 'px';

            this.createFrame();
            this.imgElm.appendChild(this.fragmentArray[0]);
        }

        if (playRange) {
            this.range = playRange;
            (window as any)[this.name].$data.animationIndex = playRange[0];
        }
    }

    //创建img标签，并将其添加至数组
    createFrame() {
        for (let i = 0; i < this.imageArray.length; i++) {
            const fragment     = document.createDocumentFragment();
            const imageElement = document.createElement('img');
            imageElement.id = `image_${i + 1}`;
            imageElement.src = this.imageArray[i];
            imageElement.style.width = this.imgWidth;
            imageElement.style.height = this.imgHeight;
            imageElement.addEventListener('touchend', () => {
                return false;
            });
            fragment.appendChild(imageElement);
            this.fragmentArray.push(fragment);
        }
    }

    //开始方法
    playAnimation(range?: any) {
        if (range) {
            if (this.getValue() === range[1]) {
                (window as any)[this.name].$data.isEnd = false;
                (window as any)[this.name].$data.animationIndex = range[0];
            }
        } else {
            //判断 如果在滑条滑动到数组尽头时触发方法 将滑条的初始值设为1
            if (this.getValue() === this.imageArray.length - 1) {
                (window as any)[this.name].$data.isEnd = false;
                (window as any)[this.name].$data.animationIndex = 0;
            }
        }

        // 为了防止连续调用play方法 在动画的执行过程当中禁止调用
        if (!this.animationCtrl) {
            return;
        }

        this.animationCtrl = false;
        setTimeout( () => {
            this.createFrame();
            this.createAnimation();
        }, 10);
    }

    createAnimation() {
        this.animationObj.run();
    }

    //让动画运行的方法
    animationProgress(range?: any) {
        if (range) {
            if (this.getValue() < range[1]) {
                if (this.imgElm.children != null && this.imgElm.children.length > 0) {
                    this.imgElm.removeChild(this.imgElm.children[0]);
                }
                this.imgElm.appendChild(this.fragmentArray[this.getValue()]);
                (window as any)[this.name].$data.animationIndex = this.getValue() + 1;
            }
            if (this.getValue() === range[1] && !this.isInfinite) {
                this.cancelAnimation();
                (window as any)[this.name].$data.isPlay = false;
                (window as any)[this.name].$data.isEnd = true;
            } else if (this.getValue() + 1 === this.imageArray.length && this.isInfinite) {
                (window as any)[this.name].$data.animationIndex = range[0];
            }

        } else {
            if (this.getValue() < this.imageArray.length) {
                if (this.imgElm.children != null && this.imgElm.children.length > 0) {
                    this.imgElm.removeChild(this.imgElm.children[0]);
                }
                this.imgElm.appendChild(this.fragmentArray[this.getValue()]);
                (window as any)[this.name].$data.animationIndex = this.getValue() + 1;
            }

            if (this.getValue() + 1 === this.imageArray.length && !this.isInfinite) {
                this.cancelAnimation();
              (window as any)[this.name].$data.isEnd = true;
            } else  if (this.getValue() + 1 === this.imageArray.length && this.isInfinite) {
                (window as any)[this.name].$data.animationIndex = 0;
            }
        }
    }

    //清空动画的方法
    cancelAnimation() {
        this.animationObj.cancle();
        this.animationCtrl = true;
        this.fragmentArray = [];
    }

    //ios清空动画的方法
    cancelAnimationIos() {
        this.animationObj.cancle();
        this.animationCtrl = true;
    }

    //暂停方法
    pauseAnimation() {
        this.isStop = true;
        this.animationCtrl = true;
        this.cancelAnimation();
    }

    //移动到某一帧
    moveToFrame() {
        //当改变滑条值时替换成对应的图片
        this.fragmentArray = [];
        this.createFrame();
        if (this.imgElm.children != null && this.imgElm.children.length > 0) {
            this.imgElm.removeChild(this.imgElm.children[0]);
        }
        this.imgElm.appendChild(this.fragmentArray[this.getValue()]);

        //播放完成后切换播放按钮
        if ( this.getValue() === (window as any)[this.name].$data.sliderOption.max ) {
            (window as any)[this.name].$data.isPlay = false;
        }
    }

    // 重置方法
    reset() {
            (window as any)[this.name].$data.isEnd = false;
        if (this.range) {
            (window as any)[this.name].$data.animationIndex = this.range[0];
        } else {
            (window as any)[this.name].$data.animationIndex = 0;
        }
    }

    //获取当前的value值
    getValue() {
        return (window as any)[this.name].$data.animationIndex;
    }

    //对iphone做特殊适配
    animationProgressIos(range ?: any) {
        if (range) {
            if (this.getValue() < range[1]) {
                this.imgElm.src = (this.imageArray[this.getValue()]);
                (window as any)[this.name].$data.animationIndex = this.getValue() + 1;
            }
            if (this.getValue() === range[1] && !this.isInfinite) {
                this.cancelAnimationIos();
                (window as any)[this.name].$data.isEnd = true;
                (window as any)[this.name].$data.isPlay = false;
            } else if (this.getValue() === range[1] && this.isInfinite) {
                (window as any)[this.name].$data.animationIndex = range[0];
            }
        } else {
            if (this.getValue() < this.imageArray.length) {
                this.imgElm.src = (this.imageArray[this.getValue()]);
                (window as any)[this.name].$data.animationIndex = this.getValue() + 1;
            }
            if (this.getValue() + 1 === this.imageArray.length && !this.isInfinite) {
                (window as any)[this.name].$data.isEnd = true;
                this.cancelAnimationIos();
            } else if (this.getValue() + 1 === this.imageArray.length && this.isInfinite) {
                (window as any)[this.name].$data.animationIndex = 0;
            }
        }
    }

    //ios Play 方法
    playAnimationIos(range?: any) {
        if (range) {
            if (this.getValue() === range[1]) {
                (window as any)[this.name].$data.animationIndex = range[0];
                (window as any)[this.name].$data.isEnd = false;
            }
        } else {
            //判断 如果在滑条滑动到数组尽头时触发方法 将滑条的初始值设为1
            if (this.getValue() === this.imageArray.length - 1) {
                (window as any)[this.name].$data.animationIndex = 0;
                (window as any)[this.name].$data.isEnd = false;
            }
        }

        // 为了防止连续调用play方法 在动画的执行过程当中禁止调用
        if (!this.animationCtrl) {
            return;
        }

        this.animationCtrl = false;
        setTimeout( () => {
            this.createAnimation();
        }, 10);
    }

    moveToFrameIos() {
        //当改变滑条值时替换成对应的图片
        this.imgElm.src = (this.imageArray[this.getValue()]);
        //播放完成后切换播放按钮
        if ( this.getValue() === (window as any)[this.name].$data.sliderOption.max ) {
            (window as any)[this.name].$data.isPlay = false;
        }
    }

    pauseAnimationIos() {
        this.isStop = true;
        this.animationCtrl = true;
        this.cancelAnimationIos();
    }



}
