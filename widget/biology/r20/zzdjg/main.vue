<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">种子的结构</div>
                <div id="3dContainer" class="note">
                </div>
            </template>

            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div @click="seedCoatEvent">
                        <buttonPrimary class="seedCoatButton" v-bind:title="seedCoatTitle" type="ellipse" v-bind:actived="seedCoatColor">
                        </buttonPrimary>
                    </div>

                    <div @click="endospermEvent">
                        <buttonPrimary class="endospermButton" v-bind:title="endospermTitle" type="ellipse" v-bind:actived="endospermColor">
                        </buttonPrimary>
                    </div>

                    <div @click="cotyledonEvent">
                        <buttonPrimary class="cotyledonButton" v-bind:title="cotyledonTitle" type="ellipse" v-bind:actived="cotyledonColor">
                        </buttonPrimary>
                    </div>

                    <div @click="germEvent">
                        <buttonPrimary class="germButton" v-bind:title="germTitle" type="ellipse" v-bind:actived="germColor">
                        </buttonPrimary>
                    </div>

                    <div @click="hypocotylEvent">
                        <buttonPrimary class="hypocotylButton" v-bind:title="hypocotyTitle" type="ellipse" v-bind:actived="hypocotylColor">
                        </buttonPrimary>
                    </div>

                    <div @click="radellaEvent">
                        <buttonPrimary class="radellaButton" v-bind:title="radellaTitle" type="ellipse" v-bind:actived="radellaColor">
                        </buttonPrimary>
                    </div>
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
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
       fullScreensLayout,
       buttonPrimary
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
    }

    .seedCoatButton, .endospermButton, .cotyledonButton, .germButton, .hypocotylButton, .radellaButton {
        position: absolute;
        top: 14.6%;
        width: 80px;
        height: 38px;
    }

    .seedCoatButton {
        left: 20.5%;
    }

    .endospermButton {
        left: 30.7%;
    }

    .cotyledonButton {
        left: 40.8%;
    }

    .germButton {
        left: 51%;
    }

    .hypocotylButton {
        left: 61.1%;
    }

    .radellaButton {
        left: 71.3%;
    }

    .note {
        width: 100%;
        height: 100%;
        background-color: #2B2B2B;
    }

    .title_text {
        font-size: 24px;
        line-height: 24px;
        color: #fff;
        position: absolute;
        top:24px;
        left:24px;
    }

</style>
