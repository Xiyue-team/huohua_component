<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <div id="title" class="title_text">小肠</div>
                <div class="content" :style="{'background-image': 'url(\"" +bg+'\')'} ">
                    <div class="imageBox1">
                        <div class="list" :style="{left:num + 'vw'}">
                            <div class="one">
                                 <img src="./sub_static/UI/1.png">
                                 <div class="frame"></div>
                                 <div class="line"></div>
                                 <div class="txt">小肠</div>
                            </div>
                            <div class="two">
                                    <div class="two-lf">
                                        <img src="./sub_static/UI/2-1.png">
                                        <div class="frame"></div>
                                        <div class="line"></div>
                                        <div class="arrows"></div>
                                        <div class="text">小肠</div>
                                    </div>
                                    <div class="two-rt">
                                        <img src="./sub_static/UI/2-2.png" >
                                        <div class="text">小肠内壁</div>
                                    </div>
                            </div>
                            <div class="three">
                                    <div class="three-lf">
                                        <img src="./sub_static/UI/3-1.png">
                                        <div class="frame"></div>
                                        <div class="line"></div>
                                        <div class="arrows"></div>
                                        <div class="text">小肠内壁</div>
                                    </div>
                                   <div class="three-rt">
                                       <img src="./sub_static/UI/3-2.png">
                                       <div class="text">小肠绒毛</div>
                                   </div>
                            </div>
                            <div class="four">
                                    <div class="four-lf">
                                        <img src="./sub_static/UI/4-1.png">
                                        <div class="frame"></div>
                                        <div class="line"></div>
                                        <div class="arrows"></div>
                                        <div class="text">小肠绒毛</div>
                                    </div>
                                    <div class="four-rt">
                                        <img src="./sub_static/UI/4-2.png">
                                        <div class="text">毛细血管</div>
                                    </div>
                            </div>
                            <div class="five">
                                    <div class="five-lf">
                                        <img src="./sub_static/UI/5-1.png">
                                        <div class="frame"></div>
                                        <div class="line"></div>
                                        <div class="arrows"></div>
                                        <div class="text">毛细血管</div>
                                    </div>
                                    <div class="five-rt" >
                                        <img src="./sub_static/UI/5-2.png">
                                        <div class="text">绒毛细胞</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div id="prev" class=" arrow" @mousedown="getMove(+65)" v-show="isShow1" :class="{active:msg_l}"
                         @mouseup="msg_l=false"  @touchstart="getColor(+65)" @touchend="msg_l=false">
                        <img src="./sub_static/UI/left.png"></div>
                    <div  id="next"  class=" arrow" @mousedown="getMove(-65)" v-show="isShow2"
                          :class="{active:msg_r}" @mouseup="msg_r=false"  @touchstart="getColor(-65)"
                          @touchend="msg_r=false">
                        <img src="./sub_static/UI/right.png"></div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';

    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>
<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        line-height: 24px;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        text-align: justify;
    }
    .content {

        width: 100%;
        height: 100%;
        font-size: 1vw;
        background-size: 100% 100%;
    }
    .imageBox1{
        width: 65vw;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }
    .imageBox1  img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .list{
        width: 325vw;
        height: auto;
        position: absolute;
        z-index: 1;
        transition: left 0.6s;
        top:50%;
        transform: translateY(-50%);
    }
    .one,.two,.three,.four,.five{
        float: left;
    }
    .one{
        width: 20%;
        height: 35vw;
        position: relative;

    }
    .one img{
        width: 60vw;
        margin: 0 auto;
        display: block;
        border-radius:2vw ;
    }
    .one .frame{
        width:3.6%;
        height:5.6%;
        border: 0.15vw solid #fff;
        position: absolute;
        bottom: 24.4%;
        left: 52.5%;
        border-radius: 0.4vw;
        background: rgba(0,0,0,0.30);
    }
    .one .line{
        width:8.4vw;
        height: 0.18vh;
        background: #fff;
        position: absolute;
        bottom: 34.0%;
        left: 55.9%;
        transform:rotate(-20deg) ;
    }
    .one .txt{
        font-family: PingFangSC-Medium;
        font-size: 1.1vw;
        color: #FFFFFF;
        text-align: justify;
        position: absolute;
        bottom: 37%;
        left: 70%;
    }

    .two{
        width: 65vw;
        height:auto;
        display: flex;
        justify-content:space-around;
    }
    .two-lf{
        width: 31vw;
        height:auto;
        position: relative;
    }
    .two-lf .frame{
        width:3vw;
        height:3vw;
        border: 0.15vw solid #fff;
        position: absolute;
        bottom: 21.0%;
        left: 46.2%;
        border-radius: 0.4vw;
        background: rgba(0,0,0,0.30);
    }
    .two-lf .line{
        width: 13vw;
        height:0.25vw;
        background: #fff;
        position: absolute;
        bottom: 25.0%;
        left: 56.8%;
    }
    .two-lf .arrows{
        width: 0px;
        height: 0px;
        border-bottom:1vw solid transparent ;
        border-top:1vw solid transparent ;
        border-left:2vw solid #fff ;
        border-right:1vw solid transparent ;
        position: absolute;
        bottom: 22.5%;
        left: 98%;
    }
    .two-rt {
        width: 31vw;
        height:auto;
    }
    .two-rt img{
        border: 2px solid #FFFFFF;
        border-radius: 2.8vw;
    }
    .three{
        width: 65vw;
        display: flex;
        justify-content:space-around;
    }
    .three-lf{
        width: 31vw;
        height:auto;
        position: relative;
    }
    .three-lf .frame{
        width:3vw;
        height:3vw;
        border: 0.15vw solid #fff;
        position: absolute;
        bottom: 21.0%;
        left: 46.2%;
        border-radius: 0.4vw;
        background: rgba(0,0,0,0.30);
    }
    .three-lf .line{
        width: 13vw;
        height: 0.25vw;
        background: #fff;
        position: absolute;
        bottom: 25.0%;
        left: 56.8%;
    }
    .three-lf .arrows{
        width: 0px;
        height: 0px;
        border-bottom:1vw solid transparent ;
        border-top:1vw solid transparent ;
        border-left:2vw solid #fff ;
        border-right:1vw solid transparent ;
        position: absolute;
        bottom: 22.5%;
        left: 98%;
    }
    .three-rt{
        width: 31vw;
        height:auto;
    }
    .three-rt img{
        border: 2px solid #FFFFFF;
        border-radius: 2.8vw;
    }
    .four{
        width: 65vw;
        display: flex;
        justify-content:space-around;
    }
    .four-lf{
        width: 31vw;
        height:auto;
        position: relative;
    }
    .four-lf .frame{
        width:3vw;
        height:3vw;
        border: 0.15vw solid #fff;
        position: absolute;
        bottom: 21.0%;
        left: 56.2%;
        border-radius: 0.4vw;
        background: rgba(0,0,0,0.30);
    }
    .four-lf .line{
        width: 11vw;
        height: 0.25vw;
        background: #fff;
        position: absolute;
        bottom: 25.0%;
        left: 66.8%;
    }
    .four-lf .arrows{
        width: 0px;
        height: 0px;
        border-bottom:1vw solid transparent ;
        border-top:1vw solid transparent ;
        border-left:2vw solid #fff ;
        border-right:1vw solid transparent ;
        position: absolute;
        bottom: 22.5%;
        left: 98%;
    }
    .four-rt{
        width: 31vw;
        height:auto;
    }
    .four-rt img{
        border: 2px solid #FFFFFF;
        border-radius: 2.8vw;
    }
    .five{
        width: 65vw;
        display: flex;
        justify-content:space-around;
    }
    .five-lf{
        width: 31vw;
        height:auto;
        position: relative;
    }
    .five-lf .frame{
        width:3vw;
        height:3vw;
        border: 0.15vw solid #fff;
        position: absolute;
        top: 21.0%;
        left: 46.2%;
        border-radius: 0.4vw;
        background: rgba(0,0,0,0.30);
    }
    .five-lf .line{
        width: 13vw;
        height: 0.25vw;
        background: #fff;
        position: absolute;
        top: 25.0%;
        left: 56.8%;
    }
    .five-lf .arrows{
        width: 0px;
        height: 0px;
        border-bottom:1vw solid transparent ;
        border-top:1vw solid transparent ;
        border-left:2vw solid #fff ;
        border-right:1vw solid transparent ;
        position: absolute;
        top: 22.5%;
        left: 98%;
    }
    .five-rt{
        width: 31vw;
        height:auto;
    }
    .five-rt img{
        border: 2px solid #FFFFFF;
        border-radius: 2.8vw;
    }
   .text{
       color: #fff;
       font-size: 1.2vw;
       text-align: center;
       margin-top: 1vh;
   }
  /*左右箭头的样式*/
    .arrow { cursor: pointer; text-align: center;
        width: 20px;padding:7px 5px ; height: auto; position: absolute; z-index: 2;color: #fff;top:50%;
        transform: translateY(-50%);
    }
    #prev { left: 5vw;}
    #next { right: 5vw;}
    .arrow img{
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .active{
        padding:7px 5px ;
        background: rgba(250,90,84,0.50);
        line-height: 5px;
    }

    @media (max-height: 300px) {
        .title_text {
            font-size: 18px;
            line-height: 18px;
        }
        .two-rt img{
            border-radius: 2.8vw;
        }
        .three-rt img{
            border-radius: 2.8vw;
        }
        .four-rt img{
            border-radius: 2.8vw;
        }
        .five-rt img{
            border-radius: 2.8vw;
        }
    }
    @media (max-height: 550px) {
        .title_text {
            font-size: 18px;
            line-height: 18px;
        }
        .two-rt img{
            border-radius: 2.8vw;
        }
        .three-rt img{
            border-radius: 2.8vw;
        }
        .four-rt img{
            border-radius: 2.8vw;
        }
        .five-rt img{
            border-radius: 2.8vw;
        }
    }
    @media (max-height: 650px) {
        .title_text {
            font-size: 18px;
            line-height: 18px;
        }
        .two-rt img{
            border-radius: 2.8vw;
        }
        .three-rt img{
            border-radius: 2.8vw;
        }
        .four-rt img{
            border-radius: 2.8vw;
        }
        .five-rt img{
            border-radius: 2.8vw;
        }
    }
    @media (max-height: 768px) {
        .two-rt img{
            border-radius: 2.8vw;
        }
        .three-rt img{
            border-radius: 2.8vw;
        }
        .four-rt img{
            border-radius: 2.8vw;
        }
        .five-rt img{
            border-radius: 2.8vw;
        }
    }
    @media (max-height: 1024px) {
        .two-rt img{
            border-radius: 2.8vw;
        }
        .three-rt img{
            border-radius: 2.8vw;
        }
        .four-rt img{
            border-radius: 2.8vw;
        }
        .five-rt img{
            border-radius: 2.8vw;
        }
    }
    @media (max-height: 300px) {
        .imageBox1{
            transform: scale(0.95);
        }
        .text{
            font-size: 6px;
            text-align: center;
            margin-bottom: 1vh;
        }
    }

    @media (min-width: 800px) and (max-width:1300px ) {
        .two-rt img{
            border-radius: 3.2vw;
        }
        .three-rt img{
            border-radius: 3.2vw;
        }
        .four-rt img{
            border-radius: 3.2vw;
        }
        .five-rt img{
            border-radius: 3.2vw;
        }
    }
</style>
