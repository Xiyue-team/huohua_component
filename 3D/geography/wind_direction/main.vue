<template lang="pug">
  <div id="3dContainer" class="full_wh root_div_container">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../src/assets/css/core.css"
import "../../src/assets/css/layout.css"
import {BrowserUtil} from "../../src/util/BrowserUtil";
import {Simple3DModel} from "../../src/three/Simple3DModel";
import {Gltf3DModel} from "../../src/three/Gltf3DModel";
import {ViewController} from "../../src/core/ViewController";
import {ModelAnimationViewHandler} from "./service/ModelAnimationViewHandler";
//Returned expression type   is not assignable to type Data
export default Vue.extend({

    created(){
        ViewController.getInstance(new ModelAnimationViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
    /*    var vConsole = new VConsole();
        console.log('Hello world');*/
        ViewController.getInstance().domReady();
    },
    methods: {
    }
})
</script>

<style scoped="scoped">
body{
    overflow:hidden !important;
    overflow-x: hidden;
    overflow-y: hidden;


}

</style>
