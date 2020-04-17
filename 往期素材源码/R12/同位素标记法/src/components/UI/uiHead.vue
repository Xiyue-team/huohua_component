<template>
    <div class="Ui-head" :class="{type2:type === 'head_btn'}">
      <h3 v-text="title"></h3>
      <slot></slot>
    </div>
</template>

<script>
    export default{
        props: ['title','type'],
        components: {},
        created(){},
        data(){
            return {};
        },
        methods: {
          //重置按钮
          resetApp(){
            this.$emit('resetApp')
          }
        },
    };
</script>

<style>
  .Ui-head{
      position: relative;
    width:100%;
    height: 76px;
    padding: 18px 24px;
  }
  .Ui-head.type2{
      height: 120px;
      padding: 24px 24px 12px 24px;
  }
  .Ui-head h3{
    line-height: 40px;
    font-size: 24px;
    font-weight: normal;
    color: #000000;
  }
  .Ui-head.type2 h3{
      line-height: 1;
      margin-bottom: 20px;
  }
  .Ui-head .UI-btn.btn-48{
      position: absolute;
      top:18px;
      right:24px;
  }
  .Ui-head.type2 .UI-btn{
      margin-right: 20px;
  }
  .Ui-head.type2 .UI-btn.btn-48{
      position: absolute;
      top:auto;
      bottom: 12px;
      right:24px;
      margin-right: 0;
  }


</style>
