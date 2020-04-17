import {Group} from 'three';
import {Power0, TweenMax, TimelineLite} from 'gsap';

export class ModelAnimate {

    timeLine: TimelineLite ; //动画连
    djEnable: Boolean = false; //断键动画开关
    cjEnable: Boolean = false; //成键动画开关

    pauseDj () {
        if ( this.djEnable === true && this.timeLine.progress() >= 0.45) {
            this.timeLine.pause();
            this.djEnable = false;
        }
    }

    pauseCj () {
        if ( this.cjEnable === true && this.timeLine.progress() >= 0.8) {
            this.timeLine.pause();
            this.cjEnable = false;
        }
    }
}
