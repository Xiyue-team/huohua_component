<template>
        <div class="buttonGs">
            <div class="button_text" v-html="title">
        </div>
        </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'tipButton',
    props: {
        actived: {
          type: [Boolean, String],
          default: false
      },
        title: String,
    },
});
</script>

<style scoped="scoped">
.buttonGs{
    margin-top: -21px;
    margin-left: -160px;
    width: 160px;
    height: 42px;
}

.button_text{
    float: right;
    box-sizing: border-box;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    color: #4A4A4A;
    line-height: 22px;
    z-index: 999;
    background: #FFFFFF;
    padding: 10px;
    border: 2px solid rgba(0,0,0,0.08);
    border-radius: 4px;
    cursor: pointer;
}
@media screen and (min-height: 600px) and (max-height: 800px)
, screen and (min-width: 950px) and (max-width: 1500px) {
    .button_text{
        font-size: 20px;
        line-height: 20px;
        padding: 6px;
        border: 1px solid rgba(0,0,0,0.08);
    }
}
@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 949px)  {
    .button_text{
        font-size: 18px;
        line-height: 19px;
        height: 26px;
        padding: 4px;
        border: 1px solid rgba(0,0,0,0.08);
    }
}

@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
    .button_text{
        font-size: 16px;
        line-height: 16px;
        padding: 4px;
        border: 1px solid rgba(0,0,0,0.08);
    }

}
</style>
