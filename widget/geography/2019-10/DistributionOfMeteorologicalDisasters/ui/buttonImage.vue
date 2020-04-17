<template>
  <button type='button' class='imagebutton' v-bind:class="{'active' : actived}">
       <div :style="`width: 100%; height: 100%;background-image: url(${Unclicked})`" v-show="actived"/>
        <div :style="`width: 100%; height: 100%;background-image: url(${clicked})`" v-show="!actived"/>
  </button>
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
        Unclicked: String,
        clicked: String,
    },
});
</script>

<style scoped="scoped">
  .imagebutton {
    background: #FFFFFF;
    padding-left: 10px;
    padding-right: 10px;
    width: 60px;
    height: 36px;
    margin-left: -30px;
    margin-top: -18px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
    border-radius: 18px;
}

.imagebutton div{
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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

@media screen and (min-height: 450px) and (max-height: 599px) {
    .imagebutton {
        width: 45px;
        height: 30px;
        margin-left: -22.5px;
        margin-top: -15px;
    }
}
@media screen and (min-height: 300px) and (max-height: 449px) {
    .imagebutton {
        width: 36px;
        height: 20px;
        padding-left: 5px;
        padding-right: 5px;
        margin-left: -18px;
        margin-top: -10px;
        border-radius: 10px;
        color: #525252;
    }
}
</style>
