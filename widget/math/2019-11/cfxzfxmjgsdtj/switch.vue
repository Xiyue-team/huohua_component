<template>
            <div v-if="direction=='left'"  class="switch " style="margin-top:10px;"  v-bind:style="{backgroundColor: 'transparent' , width: width+'px',height:height+'px'}">
                <input type="checkbox" :name="name" :id="id"  :checked="checkVal" :value="value"   @change="update"  >
                <label :for="id"  style="background-color: transparent ; font-size: 26px ;line-height: 56px ; color: #FFFFFF ; width: 80px" >{{title}}</label>
            </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import "../../../../src/assets/css/ui.css";

    export default Vue.extend({

        model: {
            prop: 'modelVal',
            event: 'change'
        },
        props: {
            id: String,
            name: String,
            title: String,
            value: Boolean,
            modelVal: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: 'left'
            },
            height: {
                type: Number,
                default: 100
            } ,
            width: {
                type: Number,
                default: 100
            },
            // 定义 true-value  false-value
            trueValue: {
                type: Boolean,
                default : true
            },
            falseValue: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            checkVal(): Boolean {
                // 判断是一个还是多个 checkbox
                return this.modelVal === this.trueValue;
            }
        },
        methods: {
            update(event: any) {
                const isChecked = event.target.checked;
                this.$emit('change', isChecked ? this.trueValue : this.falseValue);
            }
        }
    });
</script>

<style>

</style>
