
import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { Watch } from 'vue-property-decorator';
import { DqgjViewHandler } from './services/DqgjViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
// const Vconsole = require('vconsole');
// const vConsole = new Vconsole();
const video = require('video.js/dist/video.js');
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
    ua: any = null;
    width: any = window.innerWidth * 0.4 + 'px';
    valueTime: any = 0;
    max: any = 4;
    interval: any = 0.1;
    mc = false;
    markV = false;
    // created
    created() {
        const viewOption = new ViewOption();
        this.ua = navigator.userAgent

        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new DqgjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    @Watch('valueTime')
    getValueTime(value: number) {

        this.player.currentTime(value)
    }
    // mounted
    mounted() {
        const he = window.innerHeight;

        const e = this.ua.indexOf('MON-W19')
        const hx = this.ua.indexOf('HITV300C')
        console.log(this.ua)

        // const h = document.getElementById('left').clientHeight
        // document.getElementById('left').style.width = h * 16 / 9 + 'px'
        // console.log(h)

        // this.player = document.getElementById("video");

        this.player = video('video', {
            controls: false,
            autoplay: true, preload: "auto"
        });

        this.player.on('suspend', function () {//延迟下载
            console.log("延迟下载")
        });
        this.player.on('loadstart', function () { //客户端开始请求数据
            console.log("客户端开始请求数据")
        });
        this.player.on('progress', function () {//客户端正在请求数据
            console.log("客户端正在请求数据")
        });
        this.player.on('abort', function () {//客户端主动终止下载（不是因为错误引起）
            console.log("客户端主动终止下载")
        });
        this.player.on('error', function () {//请求数据时遇到错误
            console.log("请求数据时遇到错误")
        });
        this.player.on('stalled', function () {//网速失速
            console.log("网速失速")
        });
        this.player.on('play', function () {//开始播放
            console.log("开始播放")
        });
        this.player.on('pause', function () {//暂停
            console.log("暂停")
        });
        this.player.on('loadedmetadata', function () {//成功获取资源长度
            console.log("成功获取资源长度")
        });
        this.player.on('loadeddata', function () {//渲染播放画面
            console.log("渲染播放画面")
        });
        this.player.on('waiting', function () {//等待数据，并非错误
            console.log("等待数据")
        });
        this.player.on('playing', function () {//开始回放
            console.log("开始回放")
        });
        this.player.on('canplay', function () {//可以播放，但中途可能因为加载而暂停
        });

        this.player.on('seeking', function () { //寻找中
            console.log("寻找中")
        });
        this.player.on('seeked', () => {//寻找完毕
            console.log("寻找完毕")
            this.markV = true
        });
        this.player.on('timeupdate', function () {//播放时间改变
            console.log("播放时间改变")
        });
        this.player.on('ended', function () {//播放结束
            console.log("播放结束")
        });
        this.player.on('ratechange', function () {//播放速率改变
            console.log("播放速率改变")
        });
        this.player.on('durationchange', function () {//资源长度改变
            console.log("资源长度改变")
        });
        this.player.on('volumechange', function () {//音量改变
            console.log("音量改变")
        });




        this.player.on('canplaythrough', () => {
            // if (!this.markV) this.player.load()
            if (this.mc && this.markV) return; //可以播放，歌曲全部加载完

            setTimeout(() => {
                this.player.pause();
                this.player.currentTime(0)
                console.log("可以播放", 111)


                this.mc = true;
                ViewController.getInstance().domReady();
            }, 3000)
        });



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
        this.valueTime = 0
        this.player.currentTime(0)
    }
}