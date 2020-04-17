<template>
  <div id="app" class="noselect">

    <span id="title" class="title_text" >消化道</span>
    <div class="aside_reset" @click="reset"> <img  src="../static/img/reset.png" onclick="return false" style="width: 100%;height: auto"/></div>
    <div class="imageFloor" id="shade" ref="im">


      <video id="my-video"  style="bottom: 0px;position: absolute;width: 100%;height: auto;z-index: 30"
             class=" vjs-default-skin"  preload="auto" webkit-playsinline playsinline x5-playsinline
             data-setup="{}" v-show="jingtai">
        <source src="../static/video/22.webm" type='video/webm' v-if="qq">
        <source src="../static/video/22.mp4" type='video/mp4' >
      </video>
      <img  src="../static/img/jingzhi.jpg"  v-show="kk" onclick="return false" style=""/>

    </div>

    <div class="imageFloor" v-show="!jingtai" @click="()=>{
    showw = false
    }" >
      <div class="ball" @click="()=>{
      replace(1);
      view(1);
      }">
        <img  src="../static/img/yq.png" onclick="return false " style="width: 100%;height: auto"/>
      </div>
      <span class="kq"  onclick="return false ">口腔 </span>
      <div class="raisin" @click="()=>{
      replace(2);
      view(2);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="y"  onclick="return false ">咽 </span>
      <div class="star" @click="()=>{
      replace(3);
      view(3);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="sd"onclick="return false " >食道 </span>
      <div class="boor" @click="()=>{
      replace(4);
      view(4);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="w" onclick="return false ">胃 </span>


      <div class="cloud"@click="()=>{
      replace(7);
      view(5);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="xc" onclick="return false ">小肠 </span>

      <div class="cloud1" @click="()=>{
      replace(5);
      view(7);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="dc" onclick="return false ">大肠 </span>


      <div class="cloud11" @click="()=>{
      replace(6);
      view(6);
      }">
        <img  src="../static/img/yq.png" onclick="return false" style="width: 100%;height: auto"/>
      </div>
      <span class="gm" onclick="return false ">肛门 </span>
      <img  src="../static/img/bg.png" onclick="return false" style="bottom: 0px ;opacity: 0"/>
      <div :class="xx" id="aler" v-show="showw" style="">

        <!--<h3 style="padding-left: 14px;padding-right: 14px;padding-bottom: 3px;" v-text="pName"></h3>-->
        <p style="padding-left: 14px;padding-right: 14px" v-text="info"></p>
      </div>
    </div>
    <div class="cl" v-show="!loadModelF"><h3>loading...</h3></div>
  </div>
</template>

<script>
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import videojs from 'video.js';
  import lcss from '@/components/index.css'
  export default {
    name: 'app',
    data() {
      return {
        title:'消化道',
        qq:true,
        xx: 'vxx',
        jingtai:true,
        mark:false,
        list:[
          {'class':'xx','name':'口腔','info':'消化道的起始部位，内有牙齿、舌和唾液腺','url':'static/img/kq.jpg'},
          {'class':'yxx','name':'咽','info':'食物的通道','url':'static/img/y.jpg'},
          {'class':'sdxx','name':'食道','info':'食物的通道，通过蠕动将食物推入胃中','url':'static/img/sd.jpg'},
          {'class':'wxx','name':'胃','info':'消化道中最膨大部分，可暂时储存食物和初步消化蛋白质','url':'static/img/w.jpg'},
          {'class':'gmxx','name':'小肠','info':'消化和吸收的主要场所','url':'static/img/xc.jpg'},
          {'class':'dcxx','name':'大肠','info':'暂时储存粪便','url':'static/img/dc.jpg'},
          {'class':'xcxx','name':'肛门','info':'将粪便排出体外','url':'static/img/gm.jpg'},
        ],
        url:"",
        pName:null,
        info:null,
        indexT:0,
        loadModelF:false,
        door:true,
        kk:false,
        showw:false
      }
    },
    components: {uiBtn},
    watch:{

    },
    created() {

     if(navigator.userAgent.toLowerCase().match(/QQ/i)){
       this.loadModelF = true;
       this.qq = false;
     }
      for(let i in this.list){
          let promises = this.preloadImage(this.list[i].url).then((image) => {
            this.list[i].url = image;
            if(i == 6){
              setTimeout(()=>{
                this.loadModelF = true;
                this. pName = null;
                this.player.play()
              },1000);

            }
          })

      }

      document.title = this.title;
    },
    mounted() {
      let ls = setTimeout(()=>{
        this.kk = true;
        clearTimeout(ls)
      },5000);
      this.init();
    },
    methods: {
      cnacle(){

        let dom = this.$refs.im;
        this.xx = 'vxx';
        this.pName=null;
        if( this.num==1){
          dom.removeChild( dom.lastChild);
        }
        this.num = 0;
      },
      reset(){

        this.pName=null;
        this.xx = 'vxx';

        let dom = this.$refs.im;
        this.player.currentTime(0);
        this.player.play();
        // if( this.num==1){
        //   dom.removeChild( dom.lastChild);
        // }
        // this.num = 0
        this.showw = false
        this.jingtai = true;

      },
      view(i){
        event.stopPropagation();
        this.xx = this.list[i-1].class;
      },
      init(){
        let thiz = this;
       this.player = videojs('my-video',{
          muted: true,
          loop : false,
        });
        this.player.on('ended',()=>{
          this.loadModelF = true;
          this.jingtai = false;
        });

      },
      replace(i) {
        event.stopPropagation();
        this.showw = true
        this.xx = 'vxx';
        let dom = this.$refs.im;
        if( this.num==1){
          dom.removeChild( dom.lastChild);
        }

        this.pName = this.list[i-1].name;
        this.info = this.list[i-1].info;
        dom.appendChild(this.list[i-1].url);
        this.num = 1
      },
      preloadImage(path) {

        return new Promise((resolve, reject) => {
          let image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = path;
        })
      },
    },
  }
</script>



