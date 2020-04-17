<template>
  <div class='imagebutton' v-bind:class="{'active' : actived}">
        <div class="imagebutton_image" v-show="image!==null" :style="`background-image: url(${image})`"/>
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
    padding: 3px 10px 3px 10px;
    display: table-cell;
    min-width: 60px;
    height: 56px;
    box-sizing: border-box;
    border: 2px solid rgba(0,0,0,0.08);
    transition: background-color 0.3s,border-color 0.3s,color 0.3s;
    border-radius: 4px;
    cursor: pointer;
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
    height: 28px;
    margin-top: 9px;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    color: #525252;
    line-height: 28px;
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
    height: 46px;
    width: 46px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}



@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 949px)  {
    .imagebutton {
        padding: 3px 10px 3px 10px;
        height: 42px;
    }

    .imagebutton_image{
        margin-right: 6px;
        margin-top: 7px;
        height: 22px;
        width: 22px;
    }
    .imagebutton_text{
        margin-top: 10px;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
    }
}

@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
    .imagebutton {
        padding: 3px 10px 3px 10px;
        height: 42px;
    }

    .imagebutton_image{
        margin-right: 6px;
        margin-top: 7px;
        height: 22px;
        width: 22px;
    }
    .imagebutton_text{
        margin-top: 10px;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
    }
}
</style>
