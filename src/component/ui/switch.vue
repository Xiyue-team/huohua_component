<template>
  <div>
  <label :for="id" v-if="direction=='left'">
    <div v-if="direction=='left'" :for="id" class="control-block_div_border switch" style="margin-top:10px;"  v-bind:style="{width: width+'px',height:height+'px'}">
      <input type="checkbox" :name="name" :id="id"  :checked="checkVal" :value="value"   @change="update"  >
      <label :for="id">{{title}}</label>
    </div>
  </label>
      <label :for="id" v-if="direction=='top'">
        <div  class="control-block_div_border switch top"  v-bind:style="{width: width+'px',height:height+'px'}" >
          <label :for="id" class="top_label">{{title}}</label>
          <input type="checkbox" :name="name" :id="id"  :checked="checkVal" :value="value"   @change="update"  >
          <label :for="id" class="top_control_label" v-bind:style="{left:(44-width)/2+'px'}">  </label>
        </div>
      </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../assets/css/ui.css';

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
