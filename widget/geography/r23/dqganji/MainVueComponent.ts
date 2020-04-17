
import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DqgjViewHandler } from './services/DqgjViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const video = require('./video.js');
const url = require('./sub_static/video/121.mp4')
const imgUrl = require('./sub_static/video/1.jpg')
@Component
export class MainVueComponent extends Vue {
    videoUrl = url;
    player: any = null;
    loc: any = 0;
    list: any = [2.00, 11, 19.5, 28, 49]
    mk: any = true;
    imgUrl: any = imgUrl
    ua: any = null
    // created
    created() {
        const viewOption = new ViewOption();
        this.ua = navigator.userAgent

        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new DqgjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        const he = window.innerHeight;

        const e = this.ua.indexOf('MON-W19')
        const hx = this.ua.indexOf('HITV300C')
        ViewController.getInstance().domReady();
        // const h = document.getElementById('left').clientHeight
        // document.getElementById('left').style.width = h * 16 / 9 + 'px'
        // console.log(h)
        if (he < 801) {
            document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.8)';

        }
        if (he < 511) {
            document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.6)';

        }
        if (he < 453) {
            document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';

        }
        if (he < 361) {
            document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';

        }

        if (e > 0 || hx > 0) {
            document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';

        }
        this.player = video('video', {
            loop: true,
            controls: false,
            autoplay: true, preload: "auto"
        });
        // this.player.play()
        this.player.on('timeupdate', () => {

            //somethings\
            if (!this.mk) {
                this.mk = !this.mk
            }
            if (this.loc == 0) {
                // if (this.player.currentTime() >= this.list[4]) {
                //     this.player.currentTime(0);
                // }
            }
            if (this.loc == 1) {
                if (this.player.currentTime() >= this.list[this.loc]) {
                    this.player.pause()

                }
            }

            if (this.loc == 2) {
                if (this.player.currentTime() >= this.list[this.loc]) {
                    this.player.pause()
                }
            }
            if (this.loc == 3) {
                if (this.player.currentTime() >= this.list[this.loc]) {
                    this.player.pause();
                }
            }
            if (this.loc == 4) {
                if (this.player.currentTime() >= this.list[this.loc]) {
                    this.player.pause()

                }
            }

        })

    }
    cc(val: any) {

        if (val == 0) {
            this.player.currentTime(this.list[val])
        } else {
            this.player.currentTime(this.list[val - 1])
        }
        this.player.play()
        this.loc = val

    }
    // 点击事件
    // 重置
    reset() {
        this.cc(0)
    }
}