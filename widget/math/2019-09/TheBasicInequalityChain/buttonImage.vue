<template>
  <div class='imagebutton'>
       <img :src="buttonUnclickedImage" v-show="actived"/>
        <img :src="buttonclickedImage" v-show="!actived"/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    name: 'buttonEllipse',
    props: {
        actived: {
          type: [Boolean, String],
          default: false
      },
        buttonUnclickedImage: String,
        buttonclickedImage: String,
    },
});
</script>

<style scoped="scoped">
  .imagebutton{
    height: 42px;
  }
  img{
      width: 100%;
      height: 40px;
  }

@media screen and (min-height: 600px) and (max-height: 800px) {
   .imagebutton{
    border-radius: 21px;
    height: 42px;
  }
  img{
      width: 100%;
      height: 40px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
   .imagebutton{
    border-radius: 21px;
    height: 42px;
  }
  img{
      width: 100%;
      height: 40px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .imagebutton{
    height: 31px;
  }
  img{
      width: 100%;
      height: 30px;
  }
}

</style>
