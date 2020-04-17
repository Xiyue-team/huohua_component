<template>
  <div class='imagebutton' v-bind:class="{'active' : actived}">
        <div class="imagebutton_image" :style="`background-image: url(${image})`"/>
        <div class="imagebutton_text" v-bind:class="{'active' : actived}" v-html="text"></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'buttonEllipse',
    props: {
        actived: {
          type: [Boolean, String],
          default: false
      },
        image: String,
        text: String,
    },
});
</script>

<style scoped="scoped">
.imagebutton {
    background: #FFFFFF;
    padding: 10px 0px 10px 10px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
    border-radius: 21px;
}

.imagebutton:hover {
    background-color: #FAFAFA;
}

.imagebutton:active {
    background: #0199FF;
    color: #FFFFFF;
    border-color: #0199FF;
}

.imagebutton.active {
    background: #0199FF;
    color: #FFFFFF;
    border-color: #0199FF;
}
.imagebutton_text{
    float: left;
    width: auto;
    height: 22px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: #525252;
    line-height: 22px;
}

.imagebutton_text:active {
    color: #FFFFFF;
}
.imagebutton_text.active {
    color: #FFFFFF;
}
.imagebutton_image{
    float: left;
    margin-right: 10px;
    height: 100%;
    width: 26px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

@media screen and (min-height: 450px) and (max-height: 599px) {
    .imagebutton {
        padding: 8px 0px 8px 7px;
        border-radius: 16px;
    }
    .imagebutton_image{
        margin-right: 6px;
        height: 100%;
        width: 22px;
    }
    .imagebutton_text{
        height: 16px;
        font-size: 16px;
        line-height: 16px;
    }
}

@media screen and (max-height: 449px) {
    .imagebutton {
        padding: 7px 0px 7px 7px;
        border-radius: 14px;
    }
    .imagebutton_image{
        margin-right: 4px;
        height: 100%;
        width: 20px;
    }
    .imagebutton_text{
        height: 14px;
        font-size: 14px;
        line-height: 14px;
    }
}
</style>
