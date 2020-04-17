function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
      // Compact form
      for (i = 0; i < len; i++) {
          uuid[i] = chars[0 | Math.random() * radix];
      }
  } else {
      // rfc4122, version 4 form
      let r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      // Fill in random data.  At i==19 set the high bits of clock sequence as  per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
              r = 0 || Math.random() * 16;
              uuid[i] = chars[(i === 19) ? ( r & 0x3) | 0x8 : r];
          }
      }
  }

  return uuid.join('');
}
var self = this;

Vue.component('switch2',{
  model: {
      prop: 'value',
      event: 'input'
  },
  data: function(){
      return {
          id: self.uuid(8,16),
          activeIndex : 0,
          width: 'auto',
          ready: true,
          itemPosition: [],
          left: '3px',
          top: '3px'
      }
  },
  props: {
      datas: [],
      value: "",
      images: Array,
      vertical: {
          type: Boolean,
          default: false
      }
  },
  computed: {
      currentValue: function(){
          return this.value;
      }
  },
  mounted: function()  {
      const maxWidth  = this.getMaxWidthItem();
      this.width = maxWidth + 'px';
      this.datas.indexOf(this.value);
      setTimeout( () => {
          this.loadItemPosition();
          this.activeIndex = this.datas.indexOf(this.value);
      }, 200);
  },
  watch : {
      activeIndex: function(newVal, oldVal) {
          const dataVal = this.datas[newVal];

          this.left   =  this.itemPosition[newVal] ? this.itemPosition[newVal].left + 'px'  : '3px';
          this.top    =  this.itemPosition[newVal] ? this.itemPosition[newVal].top   + 'px'  : '3px';
          this.$emit('input' , dataVal);
      },
      value: function(newVal) {
          this.activeIndex = this.datas.indexOf(newVal);
          if (this.width === '0px' ) {
              this.width = this.getMaxWidthItem() + 'px';
          }
      }
  },
  methods: {
      setActiveIndex: function(index){
          this.activeIndex = index;
      },
      getMaxWidthItem: function() {
          const items = document.getElementById(this.id).querySelectorAll('.switch-item');
          let maxWidth = 0;
          for ( const i of items ) {
              const iWidth = i.clientWidth;
              maxWidth = maxWidth > iWidth ? maxWidth : iWidth;
          }
          return maxWidth + 1;
      },

      loadItemPosition: function() {
          const items = document.getElementById(this.id).querySelectorAll('.switch-item');
          for ( const i of items) {
              const left = i.offsetLeft;
              const top = i.offsetTop;
              this.itemPosition.push({
                  left: left,
                  top: top
              });
          }
      }
  },
  template: `<div class="button-switch" v-bind:id="id" v-bind:class="{'vertical':vertical}">
  <div v-if="!images" class="switch-item" v-bind:class="{ 'switch-padding': ready, 'active': index == activeIndex}" v-bind:style="{width: width}" v-for="(item,index) in datas" @click="activeIndex = index">{{item}}</div>
  <div v-if="images" class="switch-item" v-bind:style="{width: item.w}" v-bind:class="{ 'switch-padding': ready, 'active': index == activeIndex}" v-for="(item,index) in images" @click="activeIndex = index"><img :src="item.src" class="switch2_item_img"></div>
  <div>`
});