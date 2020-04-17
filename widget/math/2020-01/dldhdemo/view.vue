<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="video">
                    <dldh v-bind="dldhOption">

                    </dldh>
                </div>
            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import fullScreens_layout from "../../../../src/component/layout/fullScreens_layout.vue";
    import {ViewModel} from "./ViewModel";
    import Component from "vue-class-component";
    import dldh from "../../../../src/component/ui/dldh.vue";


    @Component({
        components: {
            dldh,
            fullScreens_layout,
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped='scoped'>
  .video{
    width: 100%;
    height: 100%;
  }

</style>
