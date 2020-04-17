  <template>
  <div class="aspectration bg_white covered root_div_container no_mobile ">

    <!--标题 和 按钮 -->
    <div v-bind:style='{top: exerciseRootTop, height:exerciseHeight}' v-bind:class="{ transtaion_animation: topAnimation }" class="exercise_div_subjectBody">
      <div class="exercise_div_subjectLayout"  v-bind:class="{ 'bg-white': showEnter }">
        <div id="exerciseSubjectContent" class="exercise_div_subjectCenter">
          <!-- 题目 -->
          <div class="exercise_div_subjectContent">


              <div id="subjectImg" class="bg-white" v-bind:class="{'top_border': !showEnter}">
                  <!--如果是图片题干-->
                  <img v-if="exercise.question.coverImage" :src="exercise.question.coverImage" draggable="false" class="coverImage"/>
                  <!--如果是html题干-->
                  <div v-if="!exercise.question.coverImage"  class="exercise_div_title">{{exercise.question.title}}</div>
                  <div v-if="!exercise.question.coverImage"  class="exercise_div_content">
                      <slot name="title" ></slot>
                  </div>

                  <div class="exercise_div_cover"></div>
              </div>

          </div>
          <button v-show="showEnter" @click="enterExercise" type="button" class="begin_button" >点击开始</button>
        </div>

      </div>
    </div>
    <!--<label  @click="expandExercise" class="exercise_label_switch" v-bind:style="{fontSize:tipFontSize}"> 展开题目</label>-->
      <div id="dragTopSign" v-show="!showEnter"  v-bind:style='{top: dragSignTop}' v-bind:class="{ transtaion_animation: topAnimation }" class="control-block_div_topDrag">
          <div  class="control-block_div_topSign"></div>
          <div v-show="showTip" class="tip_txt ver_tip">下滑展开题目</div>
      </div>
    <!--内容变宽-->
      <div  v-bind:class="{ transtaion_animation: leftAnimation }" v-bind:style="{width:exerciseWidth}" class="control-panel_div_content exercise_panel_content"  >

        <!--控件识别区域-->
        <div id="dragLeftSign" class="control-block_div_drag" >
            <div  class="control-block_div_sign" ></div>
            <span v-show="showTip" class="tip_txt hor_tip">左滑收起解析</span>
            <transition name="fade">
                <switch2 v-if="showSteps" v-show="showSwitch2" v-bind="switchOption" v-model="switchModel" v-bind:vertical="vertical" class="exercise_switch_steps"></switch2>
            </transition>
        </div>



        <div class="view_div_content exercise_content" data-ratio="1:1" >

        <slot name="box" >
          <div  id="box" style="width: 100%;height: 100%;"></div>
        </slot>
      </div>
    </div>

    <!-- 解析 v-bind:style='{height:stepHeight }'  -->
    <!--拖拽时向左偏移-->
    <div  v-bind:class="{ transtaion_animation: leftAnimation }" v-bind:style="{left:exerciseLeft}" id="analyticContent" class="control-panel_div_floatLeft analytic_div_content" >
       <div class="exercise-analytic_div" v-if="analyticArray.length > 1 ">
           <div v-for="(item,index) in analyticArray" class="exercise-analytic-tab_div_title" v-bind:class="{active: activeAnalytic == item}" @click="activeAnalytic=item">{{item}}</div>
       </div>

        <div v-for="(analyticItem,analyticIndex) in analyticArray" :id="'scrollContent'+analyticIndex" v-show="showEnter || analyticArray.indexOf(activeAnalytic) == analyticIndex" style="height: 100%;position:relative;top: 0;">
         <div v-for="(item, index) in exercise.analyticArray[analyticIndex].stepArray" style="display: flex;min-height: 100%;">
             <!--自定义解析-->
             <div v-if="!item.coverImage" :id="'analyticCoverImg_'+analyticIndex+'_'+index" :data-index="index"   style="width: 100%;margin: auto;padding-left: 30px;padding-right: 30px;">
                 <slot :name="'analytic_' +analyticIndex+'_'+index" ></slot>
             </div>
             <!--解析图片-->
             <img v-if="item.coverImage" draggable="false" :id="'analyticCoverImg_'+analyticIndex+'_'+index" :data-index="index"  :analytic-index="analyticIndex"  :src="item.coverImage" style="width: 100%;margin: auto;" @load="loadComplete"/>
          </div>
        </div>
    </div>


  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../assets/css/core.css';
import '../../assets/css/layout.css';
/*import PerfectScrollbar from 'perfect-scrollbar';*/

const PerfectScrollbar = require('../../libs/perfect-scrollbar.js');

import switch2 from '../ui/switch2.vue';
const _ = require('lodash');


export default Vue.extend({
    name: 'ExerciseLayout',

    props: {
        width: {
            type: [Number, String],
            default: 'auto'
        },
        height: {
            type: [Number, String],
            default: 6
        },
        exercise: {
            type: [Object]
        },
        resizeCall: {
            type: [Function]
        },
        analyticArray: {
            type: [Object, Array, Function],
            default: ['解析一']

        },
        enterCall: {
            type: [Function]
        },
        // 显示或隐藏解析收起后出现的按钮， 默认为显示
        showSwitch2: {
            type: [Boolean],
            default: true
        },
      //是否显示左侧解析
        showAnalytic: {
          type: [Boolean],
          default: true
        }

    },
    components: {
        switch2
    },
    data() {
        return{
            showSteps: false,
            vertical: true,
            switchOption: {
                datas: ['1']
            },
            switchModel: '1',
            showEnter: true,
            showTip : true,
            exerciseRootTop : '0',
            exerciseWidth : '61.8%',
            exerciseLeft : '0',
            lastVerType : '',
            lastHorType : '',
            tempHeightLimit :  0,
            tempWidthLimit : 0,
            tempTop : '0',
            tempLeft : '0',

            topAnimation : false,
            leftAnimation : false,

            perfectScrollbar : {},
            exerciseHeight : '100%',
            contentWidth : '' ,
            leftWidth : '',
            tipFontSize : '18px',
            dataArray : [],
            resizeFlag : false,
            analyticContentEle : document.getElementById('analyticContent'),
            subjectImgEle : document.getElementById('subjectImg'),
            dragSignTop : '0',
            //当前激活的tab
            activeAnalytic : ''

        };
    },

    created() {
//       new vConsole();
    },
    mounted() {
        console.log('PerfectScrollbar', PerfectScrollbar);
        //默认选中第一个
        this.activeAnalytic = this.analyticArray[0];

        const topHammer = new Hammer(document.getElementById('dragTopSign'));
        const leftHammer = new Hammer(document.getElementById('dragLeftSign'));

        topHammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        /* 上下滑动条 */
        topHammer.on('panstart panend panup pandown', (ev: any) => {
            if (ev.type === 'panstart') {
                this.tempHeightLimit = document.getElementById('subjectImg').clientHeight;
                this.tempTop = this.exerciseRootTop;
                this.topAnimation = false;
            }

            //console.log(ev.type);
            if ( ev.type !== 'panend') {
                this.lastVerType = ev.type;
            }


            const top = Number.parseInt(this.tempTop) + ev.deltaY;
            if (top > 0  || top < (0 - this.tempHeightLimit)) {
                this.topSpringbackAnimation();
                return;
            }

            //正常滑动时跟随手势
            this.exerciseRootTop = `${top.toFixed(0)}px`;
            const signTop = top + document.getElementById('exerciseSubjectContent').clientHeight;
            //console.log('signTop:' + signTop);
            this.dragSignTop = signTop + `px`;

            //滑动结束后释放，根据最后滑动方向来判断最终位置
            if (ev.type === 'panend') {
                //console.log('end')
                this.topSpringbackAnimation();
            }



        });

        /* 左右滑动条 */
        leftHammer.on('panstart panend panleft panright', (ev: any) => {
           if (ev.type === 'panstart') {
                this.tempWidthLimit = document.getElementById('analyticContent').clientWidth;
                this.leftAnimation = false;
            }

            if (ev.type !== 'panend') {
               this.lastHorType = ev.type;
            }

            const left = Number.parseInt(this.tempLeft) + ev.deltaX;
            if ( left > 0 ) {
                this.leftSpringbackAnimation();
                this.tempLeft = 0 + '';
                return;
            } else if ( Math.abs(left) > this.tempWidthLimit) {
                this.leftSpringbackAnimation();
                this.tempLeft = (0 - this.tempWidthLimit) + '';
                return;
            }

            //正常滑动时跟随手势
            this.exerciseWidth = `calc(61.8% + ${0 - left}px )`;
            this.exerciseLeft = left + 'px';
            /*if(document.getElementById('analyticContent').classList.contains('ps') === false) {
                document.getElementById('analyticContent').classList.add('ps');
            }*/
            //滑动结束后释放，根据最后滑动方向来判断最终位置
            if (ev.type === 'panend') {

                this.leftSpringbackAnimation();
                //拖拽结束后重新更新滚动条组件
                /*setTimeout(() => {
                    console.log(document.getElementById('analyticContent').scrollTop);
                    //(this.perfectScrollbar as any).update();
                }, 410);*/
            }

        });

        /*左右滑动条*/
        /**
         * 1.设置右侧视图区为整体页面宽度的0.618，设置左侧解析宽度为0.382；
         * 2.设置每一步解析图片的高度，最小高度为浏览器高度
         * 3.计算文字大小，等比缩放
         */

        //右侧内容宽度
        //this.contentWidth = document.documentElement.clientWidth * 0.618 + 'px';

        //左侧宽度
        //this.leftWidth = document.documentElement.clientWidth * 0.382 + 'px';

        for ( let i = 0 ; i < this.analyticArray.length ; i++ ) {
            //console.log(i);
            this.initAnalyticContent(i);
            setTimeout(() => {
                this.loadAnalyticHeight(i);
            }, 1000);
        }
        //console.info('test',this.exercise.analyticArray[0].stepArray.length )
        this.initSwitchSteps(this.exercise.analyticArray[0].stepArray.length);
        this.switchModel = '1';

        //是否隐藏解析
        if (this.showAnalytic === false) {
            this.retractAnalyPanel();
        }

    },
    computed: {
    },
    watch: {
        showAnalytic: function(val) {
            if (val === false) {
              this.retractAnalyPanel();
            }
        },
        activeAnalytic: function(val) {
            //每次点击tab时重新计算解析长度
            const analyticIndex = this.analyticArray.indexOf(val);
            //console.log(val + analyticIndex);
            //if(analyticIndex > 0 ){
                setTimeout( () => {
                    //重新设置步骤下标
                    this.initSwitchSteps(this.exercise.analyticArray[analyticIndex].stepArray.length);

                    this.loadAnalyticHeight(analyticIndex);
                    this.scrollCall(analyticIndex);
                }, 100);
            //}

        },
        switchModel: function(val) {
            if (this.showSteps === true) {
                const analyticIndex = this.analyticArray.indexOf(this.activeAnalytic);
                const psContent = document.getElementById('scrollContent' + analyticIndex);
                psContent.scrollTop = document.documentElement.clientHeight * (val - 1);
            }


        }
    },
    methods: {
        /**
         * 初始化解析步骤
         */
        initAnalyticContent(analyticIndex: number) {
            const psContent = document.getElementById('scrollContent' + analyticIndex);
            const pScrollbar = new PerfectScrollbar( psContent , {
                suppressScrollX : false
            } );

            psContent.addEventListener('ps-scroll-y', () => {
                //let totalHeight = 0 ;
                this.scrollCall(analyticIndex);

            });
        },

        scrollCall(analyticIndex: number) {
            const psContent = document.getElementById('scrollContent' + analyticIndex);

            /**
             * 当现在正在显示的图片的高度加上已经显示过的图片高度减去滑动条的高度小于屏幕的1/3时调用下一张图的回调函数
             *
             **/
            for (let i = 0 ; i < this.dataArray[analyticIndex].length; i++) {
                //console.log(this.dataArray)
                const beforeArray = _.chunk(this.dataArray[analyticIndex], i)[0];
                const afterArray  = _.chunk(this.dataArray[analyticIndex], i + 1)[0];

                const beforeSum = _.sum(beforeArray);
                const afterSum  = _.sum(afterArray);

                if ( ! ( beforeSum <= psContent.scrollTop &&  psContent.scrollTop  < afterSum)) {
                    continue;
                }
                const diffTop = afterSum - psContent.scrollTop ;
                const splitLimit = document.documentElement.clientHeight * 0.66;
                let j = i;
                if ( diffTop <= splitLimit) {
                    j++;
                }

                this.switchModel = (j + 1).toString();
                this.exercise.analyticArray[analyticIndex].stepArray[j].call();

            }
        },
        /**
         * 获取解析高度
         */
        loadAnalyticHeight(analyticIndex: number) {
            if ( ! this.dataArray[analyticIndex] ) {
                this.dataArray[analyticIndex] = [];
            }
            for ( let i = 0 ; i < this.exercise.analyticArray[analyticIndex].stepArray.length ; i++ ) {
                this.dataArray[analyticIndex][i] =
                    (document.getElementById('analyticCoverImg_' + analyticIndex + '_' + i).parentNode as HTMLDivElement).clientHeight;
            }
        },
        /**
         * 初始化解析收起时的缩写步骤
         */
        initSwitchSteps(length ) {
            const stepsArray: Array = [];
            for (let i = 1 ; i <= length; i++ ) {
                stepsArray.push(i.toString());
            }
            this.switchOption.datas = stepsArray;

            //this
        },


        topSpringbackAnimation() {
            this.topAnimation = true;
            //console.log(this.lastVerType);
            if (this.lastVerType  === 'panup') {
                this.exerciseRootTop = `-${document.getElementById('exerciseSubjectContent').clientHeight}px`;
                this.dragSignTop = '0';
            } else if (this.lastVerType  === 'pandown') {
                this.exerciseRootTop = `0px`;
                this.dragSignTop = `${document.getElementById('exerciseSubjectContent').clientHeight}px`;
            }
        },
        leftSpringbackAnimation() {
            this.leftAnimation = true;
            let direction = 'right';
            //console.log('panend')
            const clientWidth = document.getElementById('analyticContent').clientWidth;
            if (this.lastHorType === 'panleft') {
                this.exerciseWidth = `calc(61.8% + ${clientWidth}px )`;
                this.exerciseLeft = `-${clientWidth}px`;
                this.tempLeft = (-clientWidth) + '';
                direction = 'left';
                this.showSteps = true;
            } else if (this.lastHorType === 'panright') {
                this.exerciseWidth = `61.8% `;
                this.exerciseLeft = `0px`;
                this.tempLeft = 0 + '';
                direction = 'right';
                this.showSteps = false;
            }
            if (!this.resizeCall) {
                return;
            }
            setTimeout(() => {
                this.resizeCall(direction);

            }, 400);
        },
        loadComplete(event: any) {
            //当图片加载完成时，设置图片容器的高度与图片高度一致
            //兼容safari
            const targetEle = event.srcElement ? event.srcElement  : event.path[0];
            let clientHeight = targetEle.clientHeight;
            //当前解析步骤
            const index = targetEle.getAttribute('data-index');
            //当前解析分类
            const analyticIndex = targetEle.getAttribute('analytic-index');
            if (clientHeight < document.documentElement.clientHeight ) {
                clientHeight = document.documentElement.clientHeight;
            }
            targetEle.parentNode.style.height = `${clientHeight}px`;
            if (!this.dataArray[analyticIndex]) {
                this.dataArray[analyticIndex] = [];
            }
            this.dataArray[analyticIndex][index] = clientHeight;

            const w1 = targetEle.parentNode.clientWidth;
            const img = new Image();
            img.onload = () => {
                const w2 = img.width;
                const h2 = img.height;
                const h1 = w1 * h2 / w2;

                targetEle.height = h1;
            };
            img.src = targetEle.src;

        },
        resetEvent() {

        },
        enterExercise() {
            this.exerciseHeight = 'auto';
            this.showEnter = false;
            this.lastVerType = 'panup';
            this.topSpringbackAnimation();
            if (this.enterCall) {
                this.enterCall();
            }

            setTimeout( () => {
                this.showTip = false;
            } , 2400);
        },
        takeUp() {
            const clientHeight = document.getElementsByClassName('exercise_div_subjectContent')[0].clientHeight;
            this.exerciseRootTop = `-${clientHeight}px`;
        },
        expandExercise() {
            this.exerciseRootTop = '0px';
        },
        retractAnalyPanel() {
            //收起解析面板
          this.lastHorType = 'panleft';
          this.leftSpringbackAnimation();
        }

    }
});
</script>

<style scoped="scoped">

  .begin_button{
    width: 240px;
    height: 60px;
    background: #0199FF;
    border: 0 solid rgba(0,0,0,0.04);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    line-height: 16px;

    margin-left: calc(50% - 120px);
    margin-top: 10px;
  }

  .exercise_label_switch {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 24px;
    color: #0199FF;
    text-align: right;
    line-height: 24px;
    padding-top: 5px;
  }


  .exercise_div_subjectBody {
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  .exercise_div_subjectLayout {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .exercise_switch_steps {
      position: absolute;
      z-index: 1;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
  }

  .exercise_content {
      background-color: white;height: 100%;
  }

  .bg-white {
      background: #FAFAFA;
  }

  .top_border {
      box-shadow: inset 0 -1px 0 0 #F2F2F2;
  }

  .transtaion_animation {
      transition: all 0.4s ease-in-out;
  }

  .coverImage {
      width:100%;  pointer-events: none;
  }

  .tip_txt {
      font-size: 18px;
      color: #0199FF;
  }

  .ver_tip {
      position: relative;top: 17px;text-align: center;
  }

  .hor_tip {
      position: absolute;top: calc( 50% - 77px);z-index: 1;left: 24px;
  }
  .exercise_panel_content {
      background-color: white;
      color: #FFFFFF;
      float: right;
      width: 61.8%;
      position: relative;
  }
  .exercise_div_subjectCenter {
    width: 100%;
    margin: auto;
  }
  .exercise_div_subjectContent {
    width: 100%;
    /*height: 260px;*/
    position: relative;
  }

  .control-block_div_topDrag{
      position: absolute;
      width: 120px;
      z-index: 2;
      top: 0;
      left: calc( 50% - 60px );
      height: 48px;
      /*background: rgba(255, 71, 71, 0.12);*/
  }

  .control-block_div_topSign{
      opacity: 0.2;
      background: #000000;
      border-radius: 100px;
      width: 120px;
      height: 6px;
      position: relative;
      left: calc(50% - 60px);
      top: 12px;
  }

  .control-block_div_topSign:hover {
      cursor: pointer;
  }

  .control-block_div_drag {
      height: 100%;
      width: 48px;
      /*background: rgba(255, 71, 71, 0.12);*/
      position: absolute;
      left: 0;
      z-index: 2;

  }

  .control-block_div_sign {
      height: 72px;
      width: 6px;
      opacity: 0.2;
      background: #000000;
      border-radius: 100px;
      position: relative;
      top: calc(50% - 36px);
      left: 10px;
  }

  .control-block_div_sign {
      cursor: pointer;
  }

   .analytic_div_content {
       left: 0;
       top: 0;
       box-shadow: inset -1px 0 0 0 #EBEBEB;
       width: 38.2%;
       background: #FAFAFA;
   }
    .exercise_div_title {
        font-size: 20px;
        color: #000000;
        line-height: 24px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 24px;
        padding-right: 30px;
    }

    .exercise_div_content {
        font-size: 20px;
        color: #000000;
        line-height: 30px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 17px;
        padding-bottom: 33px;
    }
    .exercise-analytic-tab_div_title {
        background: #FAFAFA;
        width: 50%;
        height: 48px;
        box-shadow: inset 0 -1px 0 0 #EBEBEB;
        font-size: 18px;
        color: #999999;
        line-height: 18px;

        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        /*background-color: #3299bb;*/
        text-align: center;
    }
    .exercise-analytic-tab_div_title:hover {
        cursor: pointer;
    }

    .exercise-analytic_div {
        display: flex;
        flex-flow: row nowrap;
        place-content: stretch space-around;
        align-items: flex-start;
        width: 99%;
    }
    .exercise-analytic-tab_div_title.active {
        color: #0199FF;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }




</style>
