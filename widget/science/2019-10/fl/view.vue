<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{title}}</div>
                <div id="2dContainer" style="height:100%;background: #DFB79C ;display: flex">
                    <!--<div id="mother" class="ruler_content padding_90" style="width: 1200px;height: 675px;">
                       &lt;!&ndash; <img src="./sub_static/ruler@2x.png">
                        <input type="range" min="1" max="200" v-model="rulerData" class="slider" id="myRange">&ndash;&gt;
                    </div>-->

                </div>
                <buttonEllipse class="category2" title="二类" :isActive="active === 2" @click.native="active = 2" ></buttonEllipse>
                <buttonEllipse class="category3" title="三类" :isActive="active === 3" @click.native="active = 3"></buttonEllipse>
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
  import { ViewModel } from './ViewModel';
  import buttonEllipse from '../../../../src/component/ui/buttonEllipse'

  @Component({
    components: {
        fullScreensLayout, buttonEllipse
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>
<style>
    canvas {
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;

    }

    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .category2 {
        position: absolute;
        right: 32px;
        bottom: 122px;
        z-index: 9;
    }

    .category3 {
        position: absolute;
        right: 32px;
        bottom: 62px;
        z-index: 9;
    }
    @media (max-width:868px) {
        .category2 {
            right: 8px;
            transform: scale(0.9);
        }
        .category3 {
            right: 8px;
            transform: scale(0.9);
        }
    }


</style>
