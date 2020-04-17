<template>
  <div>
        <div class="imagebutton_image"/>
        <div v-show="show" class="imagebutton_text" v-html="text"></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'buttonEllipse',
    props: {
        text: String,
        show: Boolean
    },
});
</script>

<style scoped="scoped">
.imagebutton_text{
    position: absolute;
    margin-top: -17px;
    margin-left: 30px;
    min-width: 50px;
    height: 24px;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    line-height: 25px;
    padding: 5px;
    vertical-align: middle;
    pointer-events: none;
}


.imagebutton_image{
    position: absolute;
    margin-top: -12px;
    margin-left: -12px;
    height: 20px;
    width: 20px;
    background: #EA0000;
    border: 3px solid #FFFFFF;
    border-radius: 13px;
    cursor: pointer;
}

@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
.imagebutton_text{
    margin-top: -14px;
    margin-left: 20px;
    min-width: 36px;
    height: 18px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 18.5px;
    padding: 4px;
    pointer-events: none;
}

.imagebutton_image{
    margin-top: -8px;
    margin-left: -8px;
    height: 14px;
    width: 14px;
    border: 2px solid #FFFFFF;
    border-radius: 9px;
}
}
</style>
