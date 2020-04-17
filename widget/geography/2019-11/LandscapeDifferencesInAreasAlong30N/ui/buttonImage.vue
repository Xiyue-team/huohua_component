<template>
  <div class='imagebutton'/>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'buttonEllipse',
});
</script>

<style scoped="scoped">
  .imagebutton {
    width: 36px;
    height: 36px;
    margin-left: -18px;
    margin-top: -18px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 20px;
}

@media screen and (min-height: 450px) and (max-height: 599px) {
    .imagebutton {
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
}
@media screen and (max-height: 449px) {
    .imagebutton {
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
}
</style>
