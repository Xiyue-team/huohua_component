import { Animation } from '../../../../../src/util/Animation';
export class KeyFrameAnimationT {

    animationObj: Animation;
    private isStop = false;
    private animationCtrl = true;
    private interval = 80;
    private imageArray: string[] = [];
    private fragmentArray: any[] = [];
    private imgElm = document.getElementById('animationFrame');
    private range = document.getElementById('myRange');
    constructor(imageArray: string[], interval?: number) {
        if (interval) {
            this.interval = interval;
        }
        this.imageArray = imageArray;
        this.animationObj = new Animation( () => {
            this.animationProgress();
        }, this.interval);
        this.addEventToElement();
    }

    createFrame() {
        console.log('正在创建img标签，并将其添加至数组');
        for (let i = 0; i < this.imageArray.length; i++) {
            const fragment     = document.createDocumentFragment();
            const imageElement = document.createElement('img');
            imageElement.id = `image_${i + 1}`;
            imageElement.src = this.imageArray[i];
            fragment.appendChild(imageElement);
            this.fragmentArray.push(fragment);
        }
    }

    //开始方法
    playAnimation() {
        console.log('正在执行开始方法');
        //判断 如果在滑条滑动到数组尽头时触发方法 将滑条的初始值设为1
        if (this.getValue() === this.imageArray.length) {
            (this.range as any).value = 1;
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


    animationProgress() {

        if (this.getValue()  < this.imageArray.length) {
            if (this.imgElm.children != null && this.imgElm.children.length > 0) {
                this.imgElm.removeChild(this.imgElm.children[0]);
            }
            this.imgElm.appendChild(this.fragmentArray[this.getValue() - 1]);
            (this.range as any).value = this.getValue() + 1;
        }
        if (this.getValue() === this.imageArray.length) {
            this.cancelAnimation();
        }
    }

    cancelAnimation() {
        this.animationObj.cancle();
        this.animationCtrl = true;
        this.fragmentArray = [];
        console.log('动画执行结束');
    }

    //暂停方法
    stopAnimate() {
        console.log('正在执行暂停方法');
        this.isStop = true;
        this.animationCtrl = true;
        this.cancelAnimation();
    }

    //移动到某一帧
    moveToFrame() {
        console.log('正在拖动滑动条');
        //当改变滑条值时替换成对应的图片
            this.fragmentArray = [];
            this.createFrame();
            if (this.imgElm.children != null && this.imgElm.children.length > 0) {
                this.imgElm.removeChild(this.imgElm.children[0]);
            }
            this.imgElm.appendChild(this.fragmentArray[this.getValue() - 1]);
    }

    //给按钮绑定事件
    addEventToElement() {
        const playButton = document.getElementById('play');
        const stopButton = document.getElementById('stop');
        (this.range as any).min = 1;
        (this.range as any).max = this.imageArray.length;
        (this.range as any).value = 1;
        playButton.addEventListener('click', () => {
            this.playAnimation();
        });
        stopButton.addEventListener('click', () => {
            this.stopAnimate();
        });
        this.range.addEventListener('change', () => {
            this.moveToFrame();
        });
        console.log('给按钮绑定事件');
    }

    //获取当前的value值
    getValue() {
        return Number.parseInt((this.range as any).value);
    }
}
