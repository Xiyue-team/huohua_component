<template>
        <div style="width: 680px;height: 660px;" v-model="animationIndex" id="keyFrameContainer">
                <!--主内容区-->
                <div v-if="!isIos" :id="'animationFrame' + animationName " style="margin: auto;" v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
                <div v-if="isIos" style="margin: auto;"  v-bind:style="{width: width + 'px', height: height + 'px'}">
                        <img :src="imageArray[0]" :id="'animationFrameIos' + animationName" alt="" v-on:touchend="disableImage()" v-bind:style="{width: width + 'px', height: height + 'px'}">
                </div>
                <div v-show="showSlider" class="slider-content control-block_div_border" style=" " v-bind:style="{width : width + 'px' , height: 55 * (height / 360) + 'px', margin: 50 * (height / 360) + 'px' + ' auto', opacity: opacity}" v-bind:class="{'board_disabled':sliderIsDisable}">
                        <!--滑动条-->
                        <vue-slider ref='sliderC' v-model='animationIndex' v-bind='sliderOption' style="width: calc( 100% - 59px);display: inline-block;" v-bind:style="{'margin-top': 29 * (height / 360) - 5 + 'px'}">
                                <template slot="label" slot-scope="{label,active,index}">
                                        <div  :class="['custom-label', { active }]" v-if="timeLineDot(index)">
                                                <div></div>
                                        </div>
                                        <div class="custom-label_txt" v-if="timeLineDot(index)">{{timeLineLabel(index)}}</div>
                                </template>
                        </vue-slider>
                        <!--开始暂停按钮-->
                        <div class="play_btn" @click="isPlay = !isPlay" style=" float: right;" v-bind:style="{'margin-top': 11 * (height / 360) - 11 + 'px'}">
                                <img v-show="!isPlay"  src="../../../static/images/play_icon.png" alt="">
                                <img v-show="isPlay"   src="../../../static/images/pause_icon.png" alt="">
                        </div>
                </div>
        </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {KeyFrameAnimationCore} from './KeyFrameAnimationCore';
    import vueSlider from '../../component/ui/vue2-slider.vue';
    import {BrowserUtil} from '../../util/BrowserUtil';
    const _ = require('lodash');
    const JSZip = require('jszip');
    const JSZipUtils = require('jszip-utils');

    export default Vue.extend({
        name: 'keyFrameAnimation',
        props: {
            //是否无限执行
            isInfinite: {
              default: false,
              type: Boolean
            },
            //主内容区的宽高
            width: {
                default : 680,
                type : Number
            },
            height: {
                default : 360,
                type : Number
            },
            //是否显示滑动条
            showSlider: {
                default: true,
                type : Boolean
            },
            //滑条上的点
            timeLine: {
                type : Array
            },
            //点上的标签
            label: {
                type : Array
            },
            //动画执行的时间间隔
            interval: {
                type: Number
            },
            //为了防止多次调用数据被覆盖
            animationName: {
                default: 'sliderComponent',
                type: String
            },
            //播放某段动画所需要传入的范围数组，如[20, 50]
            playRange: {
                default: undefined,
                type: Array
            },

            /*
            * 可以传入zip包或传入图片数组
            * */
            //传入图片所必须配置的参数
            //图片数组
            image: {
                type : Array
            },
            //时间轴的长度
            timeLineLength: {
                default: 0,
                type : Number
            },

            //传入ZIP包所必须配置的参数
            //zip包路径
            zipUrl: {
                type: String
            },
            //图片的总数
            imageNum: {
                type : Number
            },
            //滑条透明度
            opacity: {
              default: 1,
              type: Number,
            },
            //滑条是否不可拖动
            sliderIsDisable: {
              default: false,
              type: Boolean
            }
        },
        components: {
            vueSlider
        },
        data() {
            return{
                isIos: false,
                isEnd: false,
                map: new Map<any, any>(),
                imageArray: [],
                total: 0,
                imgElm: null,
                syncImg: false,
                keyframeAnimationController: null,
                animationIndex: 0,
                isPlay: false,
                sliderOption: {
                    width: '100%',
                    min: 0,
                    max: 0,
                    show: true,
                    tooltip: false,
                    piecewise: false,
                    interval: 1,
                    disabled: false,
                    piecewiseLabel: true,
                    dotSize: 30,
                    piecewiseStyle: {
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px'
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#5CAEFD',
                        'color': '#000000'
                    },
                    speed: 0,
                },

            };
        },
        computed: {

        },
        mounted() {
                if (BrowserUtil.getBrowserInfo().os === 'iOS') {
                        this.isIos = true;
                }
                (window as any)[this.animationName] = this;
                if (this.zipUrl && this.imageNum) {
                    this.initImage();
                } else {
                    this.imageArray = this.image;
                   setTimeout(() => {
                       this.total = this.timeLineLength;
                   }, 100);
                }
        },
        watch: {
            total: function(val) {
                if (val > 0) {
                    this.keyframeAnimationController = new KeyFrameAnimationCore(this.imageArray, this.width, this.height, this.animationName,
                        this.interval, this.playRange, this.isIos , this.isInfinite);
                    this.sliderOption.max = (this as any).total - 1;
                    this.syncImg = true;
                }
            },
            animationIndex: function (val) {
               if (this.isIos) {
                   this.keyframeAnimationController.moveToFrameIos();
               } else {
                   this.keyframeAnimationController.moveToFrame();
               }
                this.$emit('input', val);
            },
            isPlay: function (val) {
                if (this.isIos) {
                    if (val === true) {
                        (this as any).keyframeAnimationController.playAnimationIos(this.playRange);
                    } else {
                        (this as any).keyframeAnimationController.pauseAnimationIos();
                    }
                } else {
                    if (val === true) {
                        (this as any).keyframeAnimationController.playAnimation(this.playRange);
                    } else {
                        (this as any).keyframeAnimationController.pauseAnimation();
                    }
                }

            },
            isEnd: function(val: boolean) {
              this.$emit('update:isEnd', val);
            }
        },
        methods: {
            //读取zip包的方法
            initImage() {
                let count = 1;
                const promise = new JSZip.external.Promise( (resolove: any, reject: any) => {
                    JSZipUtils.getBinaryContent((this as any).zipUrl, (err: any, data: any) => {
                        if (err) {
                            throw err; // or handle err
                        }

                        JSZip.loadAsync(data).then( (url: any) => {
                            url.forEach( ( a: any, b: any) => {
                                const fileName = b.name;
                                let base64Img;
                                url.file(fileName).async('base64').then( (img: any) => {
                                    base64Img = 'data:image/png;base64,' + img;
                                    const index = Number.parseInt(b.name.split('.')[0]) - 1;
                                    (this as any).map.set(index, base64Img);
                                    if (count === (this as any).imageNum) {
                                        for (let i = 0; i < (this as any).imageNum; i++) {
                                            (this as any).imageArray.push((this as any).map.get(i));
                                        }
                                        (this as any).total = (this as any).imageArray.length;
                                    }
                                    count++;
                                });
                            });
                        });
                    });
                });
            },
            timeLineDot (index: number) {
                return _.indexOf((this as any).timeLine, index) >= 0;
            },
            timeLineLabel (index: number) {
                const labelIndex = _.indexOf((this as any).timeLine, index);
                return (this as any).label[labelIndex];
            },
            //重置方法 如果showSlider = false; 请先调用一次pause方法
            reset() {
                (this as any).isPlay = false;
                (this as any).keyframeAnimationController.reset();
            },
            //播放动画的方法
            play() {
                //为了防止图片未加载完成就调用播放方法所作出的修改
                if (!(this as any).syncImg) {
                    requestAnimationFrame( () => {
                        (this as any).play();
                    });
                    return;
                }
                if ((this as any).isIos) {
                    (this as any).keyframeAnimationController.playAnimationIos((this as any).playRange);
                } else {
                    (this as any).keyframeAnimationController.playAnimation((this as any).playRange);
                }

            },
            //暂停方法
            pause() {
                if ((this as any).isIos) {
                    (this as any).keyframeAnimationController.pauseAnimationIos();
                } else {
                    (this as any).keyframeAnimationController.pauseAnimation();
                }

            },

            //为了两次组件在切换时滑动条值无法重置的问题 提供如下方法
            //刷新滑动条值的方法
            refresh() {
                setTimeout(() => {
                    (this as any).$refs.sliderC.refresh();
                }, 100);
            },
            //使图片无法点击预览
            disableImage() {
                return false;
            }
        }
    });
</script>

<style scoped="scoped">
        body{
                overflow:hidden !important;
                overflow-x: hidden;
                overflow-y: hidden;

        }
        .custom-label {
                position: relative;
                width: 15px;
                height: 15px;
        }
        .custom-label div {
                background: #e6e6e6;
                border: 0 solid rgba(0,0,0,0.10);
                box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);
                width: 16px;
                height: 16px;
                border-radius: 50%;
                position: absolute;
                top: 13px;

        }
        .custom-label.active div{
                background: #5CAEFD;
        }

        .custom-label_txt {
                position: absolute;
                bottom: 100%;
                left: 0;
                transform: translate(-50%, -12px);
                margin-left: 50%;
                text-align: center;
                width: 50px;
        }

        .slider-content {
                background: #FFFFFF;
                border: 2px solid rgba(0,0,0,0.10);
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
                border-radius: 6px;
        }


        .play_btn {
                display: inline-block;
                width: 44px;
                height: 44px;
                background: #FFFFFF;
                border-radius: 50%;
                box-sizing: border-box;
                border: 0 solid rgba(0, 0, 0, 0.06);
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        }

        .play_btn img {
                width: 37%;
                margin-left: 15px;
                margin-top: 13px;

        }
        /*滑条不可触摸样式*/
        .board_disabled{
                pointer-events: none;
                cursor: default;
        }

</style>
