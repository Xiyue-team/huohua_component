<template>
    <div class="ctrl">
        <ui-group type="radio" :margin="10" :groups="groups" v-model="radio"></ui-group>
        <ui-btn type="switch" v-model="checked" style="margin-top:20px" v-show="radio != 0">矫正</ui-btn>
    </div>
</template>
<script>
import uiGroup from './UI/uiGroup.vue'
import uiBtn from './UI/uiBtn.vue'
import Bus from '../assets/js/bus.js'
export default {
    components: {
        uiGroup,
        uiBtn
    },
    data() {
        return {
            radio: 0,
            checked: false,
            groups: [{
                name: 0,
                txt: '正常'
            }, {
                name: 1,
                txt: '近视'
            }, {
                name: 2,
                txt: '远视'
            }]
        }
    },
    mounted() {
        Bus.$on('reset', this.reset);
    },
    watch: {
        radio(v) {
            Bus.$emit('sendValue', v);
            this.checked = false;
        },
        checked(v) {
            Bus.$emit('checkValue', v);
        }
    },
    methods: {
        reset() {
            this.radio = 0;
        }
    }
}

</script>
<style scoped>
div {}

</style>
