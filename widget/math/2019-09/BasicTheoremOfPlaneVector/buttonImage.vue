<template>
  <button
    type="button"
    class="button-primary"
    v-bind:class="{ 'button-ellipse': type == 'ellipse', 'event_disabled': disableStatus, 'active' : actived}"
  >
    <div class="btn" v-html="buttonUnclickedImage" v-show="actived" />
    <div class="btn" v-html="buttonclickedImage" v-show="!actived" />
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'buttonImage',
  props: {
    type: String,
    actived: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    buttonUnclickedImage: String,
    buttonclickedImage: String
  },
  computed: {
    disableStatus() {
      return this.disabled === true || this.disabled === 'true';
    }
  }
});
</script>

<style scoped="scoped">
.button-primary {
  background: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  height: 100%;
  width: auto;
  line-height: 16px;
  box-sizing: border-box;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.button-ellipse {
  border-radius: 21px;
  color: #525252;
}

.button-ellipse:hover {
  background-color: #fafafa;
}

.button-ellipse:active {
  background: #0199ff;
  color: #ffffff;
  border-color: #0199ff;
}

.button-ellipse.active {
  background: #0199ff;
  color: #ffffff;
  border-color: #0199ff;
}

.btn {
  margin-left: 0;
  margin-right: 0;
  height: 100%;
}

.btn >>> img {
  width: 16px;
  height: 16px;
  margin-top: 12px;
  position: relative;
  float: left;
}

.btn >>> p {
  float: left;
  margin-top: 13px;
  line-height: 16px;
}
@media screen and (min-height: 300px) and (max-height: 449px) {
  .button-primary {
    padding-left: 14px;
    padding-right: 14px;
    min-width: 120px;
  }

  .button-ellipse {
    border-radius: 14px;
  }

  .btn >>> img {
    width: 14px;
    height: 14px;
    margin-top: 6px;
  }

  .btn >>> p {
    font-size: 14px;
    line-height: 14px;
    margin-top: 7.5px;
  }
}
</style>
