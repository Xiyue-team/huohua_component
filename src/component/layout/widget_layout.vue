<template>
    <div class="  root_div_container fill_screen" >
        <div class="control-panel_div_content fill_screen">
            <!--微件内容-->
            <div class='fill_screen viewBox'>
                <slot name="viewBox"></slot>
                <!--标题面板-->
                <HuoHuaTitlePanel :title="title" :summary="summary"  :theme="theme" :subjectLogo="logo" :smallSubjectLogo="smallLogo" :reset="reset"/>
            </div>
            <!--微件提示区域-->
            <div class='tipBox'>
                <slot name="tipBox"></slot>

            </div>

        </div>

    </div>
</template>

<script lang="ts">
    import 'reflect-metadata';
    import { Vue, Component, Prop } from 'vue-property-decorator';

    import '../../../src/assets/css/core.css';
    import '../../../src/assets/css/layout.css';
    import '../../../src/assets/css/ui.css';
    import HuoHuaTitlePanel from '../../../src/component/ui/2.0/huoHuaTitlePanel.vue';


    @Component({name: 'WidgetLayout', components : { HuoHuaTitlePanel }})
    export default class WidgetLayout extends Vue {

      /** 微件标题 **/
      @Prop() title!: string;
      /** 微件描述 **/
      @Prop() summary!: string;
      /** 学科logo **/
      @Prop() logo: string;
      /** 学科logo **/
      @Prop() smallLogo: string;

      /** 目标坐标 **/
      @Prop() targetPosition: Object;
      /** 主题 **/
      @Prop({ default: 'light' }) theme!: 'light' | 'dark';

      @Prop() reset: Function;


       mounted() {

       }
    }

</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

    }
    .viewBox{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 8;
    }

    .tipBox {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 9;
        width: 100%;
    }

    .fill_screen {
        width: 100%;
        height: 100%;
    }





</style>
