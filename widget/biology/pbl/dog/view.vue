
<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">

        <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;">
          <!--头部-->
          <div class="head" v-show="true">
            <!--标题-->
            <div class="title">物种的遗传</div>

            <!--返回上一页按钮-->
            <div class="previousPageButton" @click="dogSplicingPage.previousPageButtonClickEvent()" v-show="dogSplicingPage.operationStep <= 8">
              <img src="./sub_static/head/previousPageButton.png"/>
            </div>

            <!--返回初始界面按钮-->
            <div class="homeButton" v-show="dogSplicingPage.operationStep === 9" @click="homeButtonClickEvent">
              <img src="./sub_static/head/homeButton.png"/>
            </div>

            <!--文字说明按钮-->
            <div class="explainButton" @click="dogSplicingPage.explainButton()">
              <img src="./sub_static/head/explainButton.png"/>
            </div>
          </div>

          <!--内容-->
          <div class="content" v-show="true">

            <!--初始界面-->
            <div class="content_initialInterface" v-show="dogSplicingPage.operationStep === 0">

              <!--一群狗得到图片-->
              <div class="dogsImage">
                <img style="width: 100%" src="./sub_static/content_initialInterface/dogsImage.png"/>
              </div>

              <!--说明文字点击后的效果-->
              <div class="explainText" v-show="dogSplicingPage.isShowExplainButton">
                <div class="explainTextImage">
                  <img style="width: 100%" src="./sub_static/content_initialInterface/explainTextImage.png"/>
                </div>
              </div>

              <div class="startButton" @click="dogSplicingPage.startButtonClickEvent()">开始</div>
            </div>

            <!--狗拼接界面-->
            <div class="dogSplicingPage" v-show="dogSplicingPage.operationStep <= 8 && dogSplicingPage.operationStep > 0">

              <!--狗选择-->
              <div class="dogShapePage">

                <!--左侧展示狗界面-->
                <div class="leftExhibitionDogPage">
                  <div class="leftExhibitionDogPageBackGround" v-show="dogSplicingPage.operationStep === 8">
                    <img style="width: 100%" src="./sub_static/backgroundImage.png"/>
                  </div>
                  <aDog v-bind="dogSplicingPage.myLoveDog"></aDog>
                </div>

                <!--右侧选择界面-->
                <div class="rightChoicePage">

                  <!--文字-->
                  <div class="OptionalText">{{dogSplicingPage.optionalText}}</div>

                  <!--选项-->
                  <!--身体-->
                  <div class="rightOptions">
                    <div class="rightOptionChildrenWH dogWH" v-for="(item, index) in dogSplicingPage.dogParts[3]">
                      <img style="width: 100%;" :src="dogSplicingPage.getImmageSrc(item)"/>
                    </div>
                    <div class="dogWH" v-for="item in (dogSplicingPage.row-dogSplicingPage.len%dogSplicingPage.row)" v-if="dogSplicingPage.len%dogSplicingPage.row > 0"></div>
                  </div>
                  <!--耳朵-->
                  <div class="rightOptions">
                    <div class="rightOptionChildrenWH dogWH" v-for="(item, index) in dogSplicingPage.dogParts[2]">
                      <img style="width: 100%" :src="dogSplicingPage.getImmageSrc(item)"/>
                    </div>
                    <div class="dogWH" v-for="item in (dogSplicingPage.row-dogSplicingPage.len%dogSplicingPage.row)" v-if="dogSplicingPage.len%dogSplicingPage.row > 0"></div>
                  </div>
                  <!--腿-->
                  <div class="rightOptions">
                    <div class="rightOptionChildrenWH dogWH" v-for="(item, index) in dogSplicingPage.dogParts[1]">
                      <img style="width: 100%" :src="dogSplicingPage.getImmageSrc(item)"/>
                    </div>
                    <div class="dogWH" v-for="item in (dogSplicingPage.row-dogSplicingPage.len%dogSplicingPage.row)" v-if="dogSplicingPage.len%dogSplicingPage.row > 0"></div>
                  </div>
                  <!--尾巴-->
                  <div class="rightOptions">
                    <div class="rightOptionChildrenWH dogWH" v-for="(item, index) in dogSplicingPage.dogParts[0]" @click="dogSplicingPage.getDogsImage(index)"
                         v-bind:class="{selectionRightOptionChildren: dogSplicingPage.selectionChildren === index}">
                      <img style="width: 100%" :src="dogSplicingPage.getImmageSrc(item)"/>
                    </div>
                    <div class="dogWH" v-for="item in (dogSplicingPage.row-dogSplicingPage.len%dogSplicingPage.row)" v-if="dogSplicingPage.len%dogSplicingPage.row > 0"></div>
                  </div>
                  <!--确定按钮-->
                  <div class="yesButton" v-bind:class="{'buttonGray': dogSplicingPage.isYesButtonGray}"
                       @click="dogSplicingPage.yesButtonClickEvent()" >
                    <h_button title="确定" style="width: 100%;" ></h_button>
                  </div>

                  <!--提示文字-->
                  <div class="tipTextBorder" v-show="dogSplicingPage.operationStep === 8">
                    <div class="tipText">
                      <div>目标小狗创建成功！</div>
                      <div>接下来，根据给出的小狗，</div>
                      <div>尝试培育出这条目标小狗吧。</div>
                    </div>
                  </div>

                  <!--开始按钮-->
                  <div class="yesButton" @click="dogSplicingPage.startButtonClickEvent()"
                       v-show="dogSplicingPage.operationStep === 8">
                    <h_button title="开始" style="width: 100%;" ></h_button>
                  </div>
                </div>

              </div>
            </div>

            <!--狗杂交页面-->
            <div class="dogHybridizationPage" v-show="dogSplicingPage.operationStep === 9">
              <!--左侧父本母本选择-->
              <div class="leftParentPage">
                <div id="staticDogs" class="leftParentPageContent">
                  <div id="dog1" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[0]"></aDog></div>
                  <div id="dog2" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[1]"></aDog></div>
                  <div id="dog3" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[2]"></aDog></div>
                  <div id="dog4" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[3]"></aDog></div>
                  <div id="dog5" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[4]"></aDog></div>
                  <div id="dog6" class="whiteBackgroundChildren dogWH leftParentDog"><aDog v-bind="dogHybridizationPage.leftParent[5]"></aDog></div>
                </div>
              </div>

              <!--右侧杂交-->
              <div class="rightChildrenPage">

                <!--父本母本-->
                <div class="rightParent">
                  <!--背景-->
                  <div class="rightParentBackground">
                    <img style="width: 100%" src="./sub_static/rightParent.png"/>
                  </div>
                  <!--父本母本-->
                  <div class="rightParentFather dogWH">
                    <div id="parentFather" class="dogWH"></div>
                    <div class="resetRightParent" @click="dogHybridizationPage.resetParentFather()" v-show="dogHybridizationPage.isShowParentFatherImage">
                      <img style="width: 100%" src="./sub_static/resetRightParentImage.png"/>
                    </div>
                  </div>
                  <div class="rightParentMather dogWH">
                    <div id="parentMather" class="dogWH"></div>
                    <div class="resetRightParent" @click="dogHybridizationPage.resetParentMather()" v-show="dogHybridizationPage.isShowParentMatherImage">
                      <img style="width: 100%" src="./sub_static/resetRightParentImage.png"/>
                    </div>
                  </div>
                </div>

                <!--子代-->
                <div class="rightHybridizationChildren">
                  <div id="produceDescendants1" class="whiteBackgroundChildren dogWH rightChildDog"
                       v-show="dogHybridizationPage.rightChildren[0].isShow"
                       @click="dogHybridizationPage.clickProduceDescendants1()"
                       v-bind:class="{'selectionRightOptionChildren': dogHybridizationPage.selectDog === 1}">
                    <aDog v-bind="dogHybridizationPage.rightChildren[0]"></aDog>
                    <div class="similarityText">{{dogHybridizationPage.rightChildren[0].similarity + '%'}}</div>
                  </div>
                  <div id="produceDescendants2" class="whiteBackgroundChildren dogWH rightChildDog"
                       v-show="dogHybridizationPage.rightChildren[1].isShow"
                       @click="dogHybridizationPage.clickProduceDescendants2()"
                       v-bind:class="{'selectionRightOptionChildren': dogHybridizationPage.selectDog === 2}">
                    <aDog v-bind="dogHybridizationPage.rightChildren[1]"></aDog>
                    <div class="similarityText">{{dogHybridizationPage.rightChildren[1].similarity + '%'}}</div>
                  </div>
                  <div id="produceDescendants3" class="whiteBackgroundChildren dogWH rightChildDog"
                       v-show="dogHybridizationPage.rightChildren[2].isShow"
                       @click="dogHybridizationPage.clickProduceDescendants3()"
                       v-bind:class="{'selectionRightOptionChildren': dogHybridizationPage.selectDog === 3}">
                    <aDog v-bind="dogHybridizationPage.rightChildren[2]"></aDog>
                    <div class="similarityText">{{dogHybridizationPage.rightChildren[2].similarity + '%'}}</div>
                  </div>
                  <div id="produceDescendants4" class="whiteBackgroundChildren dogWH rightChildDog"
                       v-show="dogHybridizationPage.rightChildren[3].isShow"
                       @click="dogHybridizationPage.clickProduceDescendants4()"
                       v-bind:class="{'selectionRightOptionChildren': dogHybridizationPage.selectDog === 4}">
                    <aDog v-bind="dogHybridizationPage.rightChildren[3]"></aDog>
                    <div class="similarityText">{{dogHybridizationPage.rightChildren[3].similarity + '%'}}</div>
                  </div>
                  <div id="produceDescendants5" class="whiteBackgroundChildren dogWH rightChildDog"
                       v-show="dogHybridizationPage.rightChildren[4].isShow"
                       @click="dogHybridizationPage.clickProduceDescendants5()"
                       v-bind:class="{'selectionRightOptionChildren': dogHybridizationPage.selectDog === 5}">
                    <aDog v-bind="dogHybridizationPage.rightChildren[4]"></aDog>
                    <div class="similarityText">{{dogHybridizationPage.rightChildren[4].similarity + '%'}}</div>
                  </div>
                </div>

                <!--底部提示文字 按钮  喜欢的狗-->
                <div class="bottomSide">
                  <div class="bottomTipTextButtonDog">
                    <!--提示文字-->
                    <div class="bottomTipTextButton">
                      <div class="rightHybridizationTipText tipTextCenter" v-show="dogHybridizationPage.isShowTipText === 0">
                        快将左侧的小狗拖入方格生出第一窝小狗吧！
                      </div>
                      <div class="rightHybridizationTipText" v-show="dogHybridizationPage.isShowTipText === 1">
                        现在你可以将想要的小狗拖到左侧保留下来了哦！
                      </div>
                      <div class="rightHybridizationTipText tipTextCenter" v-show="dogHybridizationPage.isShowTipText === 2">
                        选择左栏任意狗狗，作为亲代再次生成
                      </div>
                      <div class="rightHybridizationTipText" v-show="dogHybridizationPage.isShowTipText === 3">
                        已出现高相似度的小狗，你可选择它完成探究，也可继续探究直至生成自己喜欢的小狗
                      </div>
                      <div class="rightHybridizationTipText" v-show="dogHybridizationPage.isShowTipText === 4">
                        你希望将这只小狗作为你喜欢的小狗吗？如果不是，可以点击取消哦！
                      </div>
                      <div class="rightHybridizationTipText" v-show="dogHybridizationPage.isShowTipText === 5">
                        恭喜你成功培育出自己喜欢的小狗啦！
                      </div>

                      <!--按钮-->
                      <div class="generateChildButton" v-bind:class="{'buttonGray': dogHybridizationPage.isGenerateChildButtonGray}"
                           @click="dogHybridizationPage.generateChild()"
                           v-show="dogHybridizationPage.isShowTipText !== 4">
                        <h_button title="生成子代" style="width: 100%;" ></h_button>
                      </div>
                      <div class="generateChildButton" @click="dogHybridizationPage.addGeneticMap()"
                           v-show="dogHybridizationPage.isShowTipText === 4">
                        <h_button title="完成探究" style="width: 100%;" ></h_button>
                      </div>
                    </div>
                    <!--我喜欢的狗-->
                    <div class="myLoveDog dogWH">
                      <aDog v-bind="dogSplicingPage.myLoveDog"></aDog>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--遗传图谱生成界面-->
            <div class="geneticMap" v-show="dogSplicingPage.operationStep === 10">

            </div>
          </div>

          <!--弹出框-->
          <!--<popup v-bind="popup"></popup>-->

          <!--问答题-->
          <!--<popupPage v-bind="popupPage"></popupPage>-->
        </div>

      </template>

      <template slot="controlPanel"  slot-scope="controlPanel">

      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import './view.css';
import aDog from './html/aDog.vue';
import h_button from './html/buttonEllipse.vue';
import popupPage from './html/popupPage.vue';
import popup from './html/popup.vue';

@Component({
  components: {
    fullScreens_layout,
    aDog,
    h_button,
    popupPage,
    popup
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}


</script>

<style scoped='scoped'>

</style>
<style>
  .control_div_resetBtn {
    z-index: -1;
    display: none;
  }
  .control_div_mobileResetBtn {
    display: none;
  }

  /*chrome 和Safari*/
  .dogHybridizationPage::-webkit-scrollbar {display:none}
  /*.element { -ms-overflow-style: none; }*/
  /*.element { overflow: -moz-scrollbars-none; }*/


</style>
