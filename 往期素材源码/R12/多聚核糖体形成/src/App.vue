<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id='show' :style="'width:'+SW+'px;height:'+SH+'px;'">
                <div class="view_space" :style="[zoom]">
                    <img :src="'static/image/'+num+'.png'" alt="">
                </div>
            </div>
        </div>
        <!--重制按钮-->
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <ui-btn type="play" v-model="played" class="playBtn"></ui-btn>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiHead, uiBtn},
        data() {
            return {
                title: '多聚核糖体的形成',
                played: true,
                num: 1,
                value: 1,
                TM: null,
                zoom: {},
                SW: 0,
                SH: 0
            }
        },
        created() {
            document.title = this.title;
            this.setSideStyle();
        },
        watch: {
            played() {
                if (!this.played) {
                    this.TM = setInterval(() => {
                        if (this.value >= 265) {
                            this.value = 0;
                            this.played = true;
                            clearInterval(this.TM);
                        }
                        this.value++;
                        this.valueChange(this.value);
                    }, 100);
                } else {
                    clearInterval(this.TM);
                    this.TM = null;
                }
            }
        },
        mounted() {
            window.addEventListener('resize', () => {
                this.setSideStyle();
            });
        },
        methods: {
            valueChange(v) {
                var I = new Image();
                I.src = 'static/image/' + v + '.png';
                I.onload = () => {
                    if(this.TM !== null)this.num = v;
                }
            },
            //计算侧边
            setSideStyle() {
                let W = window.innerWidth - 80, H = window.innerHeight - 160;
                if (W / H >= 700 / 480) {
                    this.SW = H / 480 * 700;
                    this.SH = H;
                    this.zoom = {
                        'transform': 'scale(' + H / 480 + ')',
                        'transform-origin': 'left top',
                        '-moz-transform': 'scale(' + H / 480 + ')',
                        '-moz-transform-origin': 'left top',
                    }
                } else {
                    this.SW = W;
                    this.SH = W / 700 * 480;
                    this.zoom = {
                        'transform': 'scale(' + W / 700 + ')',
                        'transform-origin': 'left top',
                        '-moz-transform': 'scale(' + W / 700 + ')',
                        '-moz-transform-origin': 'left top',
                    }
                }
            },
            //重置
            resetWidget() {
                clearInterval(this.TM);
                this.TM = null;
                this.value = 1;
                this.num = 1;
                this.played = true;
                this.valueChange(this.value);
            }
        },
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    canvas {
        outline: none;
    }

    /*盒模型，padding尺寸不用再减去*/
    *,
    *:before,
    *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        background-color: #fff;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    .canvas_item img {
        width: 100%;
        height: 100%;
    }

    /*内容区*/
    .container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .container > h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }

    .view_space {
        width: 700px;
        height: 480px;
        padding: 10px;
        /*background-color: #fff;*/
    }

    .view_space > img {
        width: 100%;
        height: 100%;
        border: 0;
    }

    .aside_reset {
        position: absolute;
        top: 24px;
        right: 24px;
    }

    .playBtn {
        position: absolute;
        right: 50px;
        bottom: 30px;
    }

    #show {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 0 solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        border-radius: 6px;
    }
</style>
