<template>
  <div>
        <div class="imagebutton_image" :style="`background-image: url(${image})`"/>
        <div class="imagebutton_text" v-html="text"></div>
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
.imagebutton_text{
    margin-top: 6px;
    margin-left: -50px;
    width: 100px;
    height: 14px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: #005677;
    line-height: 14px;
    z-index: 999;
    pointer-events: none;
}


.imagebutton_image{
    margin-top: -32px;
    margin-left: -13px;
    height: 32px;
    width: 26px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
    .imagebutton_image{
   margin-top: -25px;
    margin-left: -10px;
    height: 25px;
    width: 20px;
}

.imagebutton_text{
    margin-top: 4px;
    margin-left: -50px;
    width: 100px;
    height: 14px;
    font-size: 14px;
}

}
@media screen and (max-height: 449px) , screen and (max-width: 699px){
    .imagebutton_image{
    margin-top: -21px;
    margin-left: -9px;
    height: 21px;
    width: 18px;
}
.imagebutton_text{
    margin-top: 4px;
    margin-left: -50px;
    width: 100px;
    height: 14px;
    font-size: 12px;
}
}
</style>
