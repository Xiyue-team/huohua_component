<template>
    <div class="buttonImage" style="width: 100%; height: 100%;" @click="clickEvent">
        <img :src="buttonUnclickedImage" style="width: 100%;" v-show="clickNumber"/>
        <img :src="buttonclickedImage" style="width: 100%;" v-show="!clickNumber"/>
    </div>

</template>

<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
    name: 'buttonEllipse',
    props: {
        title: String,
        clickNumber: {
            default: true,
            type: Boolean
        },
        buttonUnclickedImage: String,
        buttonclickedImage: String,
    },

    data() {
        return{
            // clickNumber: true,
            // isActive: false
        };
    },

    methods: {
        clickEvent() {
            if (this.clickNumber === true) {
                this.$emit('update:clickNumber', false);
            } else {
                this.$emit('update:clickNumber', true);
            }
        },
    }
});
</script>

<style scoped="scoped">
  .buttonImage:hover{
    cursor: pointer;
  }
</style>
