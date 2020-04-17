<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">双曲线的离心率</div>
                <div>
                        <div style="position: absolute; left: 2.34vw; top: 16.67vh;">

                            <table class="table" border="1">
                                <tr>
                                    <td></td>
                                    <td>比值</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>c</div>
                                        <div style="width: 24px; margin-left: 26px; margin-top: 3px;border-top:1px solid black;">
                                            <!--<img src="./sub_static/line.png" style="width: 25px; height: 11px"/> -->
                                        </div>
                                        <div>a</div>
                                    </td>
                                    <td>
                                        <div>{{c}}</div>
                                        <div style="width: 24px; margin-left: 26px; margin-top: 3px;border-top:1px solid black;">
                                            <!--<img src="./sub_static/line.png" style="width: 25px; height: 11px"/>-->
                                        </div>
                                        <div>{{a}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>b</div>
                                       <div style="width: 24px; margin-left: 26px; margin-top: 3px;border-top:1px solid black;">
                                           <!--<img src="./sub_static/line.png" style="width: 25px; height: 11px"/> -->
                                       </div>
                                        <div>a</div>
                                    </td>
                                    <td>
                                        <div>{{b}}</div>
                                        <div style="width: 24px; margin-left: 26px; margin-top: 3px;border-top:1px solid black;">
                                        <!--<div style="height: 3px;overflow: hidden;">-->
                                            <!--<img src="./sub_static/line.png" style="width: 25px; height: 11px"/> -->
                                        </div>
                                        <div>{{a}}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                </div>  

                <div>
                    <div style="position: absolute; right: 2.34vw; top: 16.67vh;">
                        <img src="./sub_static/formula.png" style="width: 9.76vw; min-width: 100px; height: auto"/>
                    </div>
                </div>
                <div id="3dContainer" style="width: 100%;height: 100%;">

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
  import { MainVueComponent } from './mainVueComponent';

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
    .title_text{
        font-size: 20px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:4.17vh;
        left:2.34vw;
    }
    .table{
        width: 160px;
        height:180px;
        /* width: 15.625vw;
        height:31.25vh; */
        text-align: center;
        border-collapse: separate;
        /* font-size: 20px; */
    }
    .table td{
        width: 50%;
        height: calc(100% / 3);
    }

</style>

