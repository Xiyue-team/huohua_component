<template>
  <div class='imagebutton'/>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'buttonImage',
});
</script>

<style scoped="scoped">
  .imagebutton {
    background: #4A90E2;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border: 2px solid #FFFFFF;
    cursor: pointer;
    border-radius: 12px;
}
.imagebutton:active, .imagebutton.active {
    background: #4A90E2;
}
@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {
    .imagebutton {
        width: 14px;
        height: 14px;
        margin-left: -7px;
        margin-top: -7px;
        border: 1.5px solid #FFFFFF;
    }
}

@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 999px) {
    .imagebutton {
        width: 12px;
        height: 12px;
        margin-left: -6px;
        margin-top: -6px;
        border: 1px solid #FFFFFF;
    }
}
@media screen and (max-height: 449px)
, screen and (max-width: 699px) {
    .imagebutton {
        width: 6px;
        height: 6px;
        margin-left: -3px;
        margin-top: -3px;
        border: 0.5px solid #FFFFFF;
    }
}
</style>
