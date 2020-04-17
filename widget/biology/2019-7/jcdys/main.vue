<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class='fullS' :style="{'background-image': 'url(\"" +bg+'\')'} " >
                    <div class="left"  >
                        <div class="xuankuangBox" :style="{zoom:zoom1}">
                            <div class="tishi_text" v-if="tishi">{{tiShi}}</div>
                            <div class="tishi_img_right" v-if="tishi_right">{{imgText[0]}}<br>{{imgText[1]}}</div>
                            <div class="tishi_img_error" v-if="tishi_error">{{imgText[2]}}<br>{{imgText[3]}}</div>
                            <div class="jiantou">
                                <img src="./sub_static/UI/0.png" style="width:100%;height: 100%">
                                <div class="one" id="one">
                                    <div class="oneImageContent smallImage"
                                         v-for="(item, index) in imgArr1"
                                         :key = index
                                         :id = "'oneDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box1" v-show="item.src" :id="'delete1' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(1)" >
                                        </div>
                                        <div class="Box_Title1" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="two" id="two">
                                    <div class="twoImageContent smallImage"
                                         v-for="(item, index) in imgArr2"
                                         :key = index
                                         :id = "'twoDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box2" v-show="item.src"  :id="'delete2' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(2)">
                                        </div>
                                        <div class="Box_Title2" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="three" id="three">
                                    <div class="threeImageContent smallImage"
                                         v-for="(item, index) in imgArr3"
                                         :key = index
                                         :id = "'threeDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box3" v-show="item.src"  :id="'delete3' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(3)">
                                        </div>
                                        <div class="Box_Title3" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="four" id="four">
                                    <div class="fourImageContent smallImage"
                                         v-for="(item, index) in imgArr4"
                                         :key = index
                                         :id = "'fourDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box4" v-show="item.src"  :id="'delete4' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(4)">
                                        </div>
                                        <div class="Box_Title4" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="five" id="five">
                                    <div class="fiveImageContent smallImage"
                                         v-for="(item, index) in imgArr5"
                                         :key = index
                                         :id = "'fiveDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box5" v-show="item.src"  :id="'delete5' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(5)">
                                        </div>
                                        <div class="Box_Title5" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="six" id="six">
                                    <div class="sixImageContent smallImage"
                                         v-for="(item, index) in imgArr6"
                                         :key = index
                                         :id = "'sixDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box6" v-show="item.src"  :id="'delete6' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%" v-if="img_delete" @click="del(6)">
                                        </div>
                                        <div class="Box_Title6" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                                <div class="seven" id="seven">
                                    <div class="sixImageContent smallImage"
                                         v-for="(item, index) in imgArr7"
                                         :key = index
                                         :id = "'sevenDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <div class="shanchu_box7" v-show="item.src"  :id="'delete7' + index">
                                            <img src="./sub_static/UI/shanchu.png" class="shanchu" style="width:100%;height: 100%"  v-if="img_delete" @click="del(7)">
                                        </div>
                                        <div class="Box_Title7" v-if="isShow">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div v-show="showButton" :class="{'an_niu': ishave === 1, 'whitecomplete': ishave === 2,'bulecomplete': ishave === 3}"  @click="complete()" >{{buttonText}}</div>
                    </div>
                    <div class="right" :style="{zoom:zoom1}">
                        <div class="imgBox" >
                            <div class="chioceImgBox"
                                 v-for="(item, index) in allImagArr"
                                 :key = "'item-' + index + '-1'"
                                 :id = "'div' + index">
                                <img class="img"
                                     :src="item"
                                     :id ="'image' + index"
                                     ondragstart="return false"
                                     style="width: 100%;height: 100%"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
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
import Vue from 'vue';
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

<style>
.control-panel_div_floatRight{
    height:0!important;
}
.fullS{
    width:100%;
    height: 100%;
    background-size: 100% 100%;
}

/*左边的样式*/
.left{
    width: 70.8%;
    height: 100%;
    float: left;
    position: relative;
    background-size: 100% 100%;
}
.xuankuangBox{
    width: 558px;
    height: 550px;
    position: absolute;
    top: 11%;
    left: 50%;
    transform: translateX(-50%);
}
.title_text{
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
    font-family: SourceHanSansSC-Medium;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 28px;
}

.tishi_text{
    ont-family: SourceHanSansSC-Regular;
    font-size: 20px;
    color: #8A8A8A;
    line-height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.tishi_img_right{
    width: 226px;
    height: 124px;
    background: #74D00B;
    border-radius: 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-family: SourceHanSansSC-Bold;
    font-size: 28px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tishi_img_error{
    width: 226px;
    height: 124px;
    background: #FF3535;
    border-radius: 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-family: SourceHanSansSC-Bold;
    font-weight: 900;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.jiantou{
    width: 460px;
    height: 440px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.one{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    top: -15%;
    left:35% ;
}
.two{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    top: 2%;
    right: 0;
}
.three{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    top: 43%;
    right: -13%;
}
.four{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    bottom: -5%;
    right: 15%;
}
.five{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    bottom: -7%;
    left: 17%;
}
.six{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    top: 47%;
    left: -12%;
}
.seven{
    width: 133px;
    height: 133px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    top: 3%;
    left: -2%;
}
.shanchu_box1{
    width: 22px;
    height: 22px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.shanchu_box2{
    width: 22px;
    height: 22px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.shanchu_box3{
    width: 22px;
    height: 22px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.shanchu_box4{
    width: 22px;
    height: 22px;
    position: absolute;
    top: 40%;
    right:-17%;
    cursor: pointer;
}
.shanchu_box5{
    width: 22px;
    height: 22px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
}
.shanchu_box6{
    width: 22px;
    height: 22px;
    position: absolute;
    bottom: -16%;
    left: 30%;
    cursor: pointer;
}
.shanchu_box7{
    width: 22px;
    height: 22px;
    position: absolute;
    bottom: 20%;
    left: -13%;
    cursor: pointer;
}
.an_niu{
    width: 72px;
    height: 42px;
    background: #767676;
    border-radius: 21px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #111111;
    line-height: 16px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.whitecomplete{
    width: 72px;
    height: 42px;
    background: #FFFFFF;
    border-radius: 21px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #111111;
    line-height: 16px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bulecomplete{
    width: 72px;
    height: 42px;
    background: #0091FF;
    border-radius: 21px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 16px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/*点击完成后排序正确后每张图出现的文字*/
.Box_Title1,.Box_Title2,.Box_Title3,.Box_Title4,.Box_Title5,.Box_Title6,.Box_Title7{
    ont-family: SourceHanSansHWSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 28px;
}
.Box_Title1{
    position: absolute;
    top:-33px;
    width: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Box_Title2{
    width: 132px;
    position: absolute;
    top: 50%;
    right:-107%;
    transform: translateY(-50%);
}
.Box_Title3{
    width: 132px;
    position: absolute;
    top: 50%;
    right:-107%;
    transform: translateY(-50%);
}
.Box_Title4{
    position: absolute;
    bottom:-33px;
    width: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Box_Title5{
    position: absolute;
    bottom:-33px;
    width: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Box_Title6{
    width: 132px;
    position: absolute;
    top: 50%;
    left:-107%;
    transform: translateY(-50%);
    text-align: right;
}
.Box_Title7{
    width: 132px;
    position: absolute;
    top: 50%;
    left:-107%;
    transform: translateY(-50%);
    text-align: right;
}



/*右边的样式*/
.right{
    width: 29.2%;
    height: 100%;
    float: left;
    position: relative;
}
.imgBox{
    width: 240px;
    height: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.chioceImgBox{
    width: 108px;
    height: 108px;
    margin-right: 12px;
    margin-bottom: 14px;
    float: left;
    position: relative;
    border-radius: 50%;
}
.chioceImgBox>img{
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
    border-radius: 50%;
}
@media (width:1024px) and (height: 768px) {
    .xuankuangBox{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>
