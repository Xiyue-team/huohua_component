webpackJsonp([0],{"8wPv":function(t,e,i){"use strict";e.a={props:{type:String,size:String,value:{type:Boolean,default:!1}},components:{},created:function(){},watch:{value:function(t){"play"===this.type&&(this.playSrc=t?"static/UI/play icon@2x.png":"static/UI/Combined Shape@2x.png")}},computed:{classObj:function(){return{"btn-48":"reset1"===this.type||"reset2"===this.type||"reset3"===this.type,"btn-blue":"blue"===this.type,"btn-240":"big"===this.size||"240"===this.size,"UI-circle":"play"===this.type,"btn-radio":"radio"===this.type,"btn-checkbox":"checkbox"===this.type,"btn-switch":"switch"===this.type}}},data:function(){return{playSrc:"static/UI/play icon@2x.png"}},methods:{clickEvent:function(){this.$emit("input",!this.value)}}}},I5Qu:function(t,e,i){"use strict";function s(t){i("rz/e")}var n=i("m1oz"),r=i("j/Ck"),a=i("VU/8"),o=s,l=a(n.a,r.a,!1,o,null,null);e.a=l.exports},M93x:function(t,e,i){"use strict";function s(t){i("i9vq")}var n=i("xJD8"),r=i("l7jA"),a=i("VU/8"),o=s,l=a(n.a,r.a,!1,o,null,null);e.a=l.exports},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),n=i("M93x"),r=i("v5o6"),a=i.n(r),o=i("7t+N"),l=i.n(o);window.$=l.a,s.a.config.productionTip=!1,a.a.attach(document.body),new s.a({el:"#app",template:"<App/>",components:{App:n.a}})},Pn51:function(t,e){},WCnO:function(t,e,i){"use strict";e.a={data:function(){return{flag:!1,noBlue:!1,size:0,currentValue:0,currentSlider:0}},props:{box:{type:Boolean,default:!0},boxWidth:{type:[Number,String],default:240},boxHeight:{type:[Number,String],default:108},title:{type:[Boolean,String],default:"某某值"},subTitle:{type:[Boolean,String],default:!1},processWidth:{type:[Number,String],default:"auto"},processHeight:{type:[Number,String],default:6},data:{type:Array,default:null},label:{type:Array,default:null},dotSize:{type:Number,default:44},dotTxt:{type:[String,Array],default:null},min:{type:Number,default:0},max:{type:Number,default:100},interval:{type:Number,default:1},infinity:{type:Boolean,default:!1},piecewise:{type:Boolean,default:!1},piecewiseLabel:{type:Boolean,default:!1},noBlueProcess:{type:Boolean,default:!1},tooltip:{type:[String,Boolean],default:"always"},direction:{type:String,default:"horizontal"},reverse:{type:Boolean,default:!1},beyondCircle:{type:Boolean,default:!0},speed:{type:Number,default:.5},realTime:{type:Boolean,default:!1},value:{type:[String,Number,Array],default:0},tooltipDir:[Array,String],formatter:[String,Function],piecewiseActiveStyle:Object,labelActiveStyle:Object},computed:{isBox:function(){return this.box?"ui-box":""},infinityStyle:function(){if(this.infinity)return{float:"left",width:"64%"}},flowDirection:function(){return"vue-slider-"+this.direction+(this.reverse?"-reverse":"")},tooltipDirection:function(){var t=this.tooltipDir||("vertical"===this.direction?"left":"top");return Array.isArray(t)?this.valueIsArray?t:t[1]:this.valueIsArray?[t,t]:t},tooltipStatus:function(){return"hover"===this.tooltip&&this.flag?"vue-slider-always":this.tooltip?"vue-slider-"+this.tooltip:""},valueIsArray:function(){return Array.isArray(this.value)},slider:function(){return this.valueIsArray?[this.$refs.dot0,this.$refs.dot1]:this.$refs.dot},minimum:function(){return this.data?0:this.min},maximum:function(){return this.data?this.data.length-1:this.max},val:{get:function(){return this.data?this.valueIsArray?[this.data[this.currentValue[0]],this.data[this.currentValue[1]]]:this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data)if(this.valueIsArray){var e=this.data.indexOf(t[0]),i=this.data.indexOf(t[1]);e>-1&&i>-1&&(this.currentValue=[e,i])}else{var s=this.data.indexOf(t);s>-1&&(this.currentValue=s)}else this.currentValue=t}},currentIndex:function(){return this.valueIsArray?this.data?this.currentValue:[(this.currentValue[0]-this.minimum)/this.spacing,(this.currentValue[1]-this.minimum)/this.spacing]:(this.currentValue-this.minimum)/this.spacing},indexRange:function(){return this.valueIsArray?this.currentIndex:[0,this.currentIndex]},multiple:function(){var t=(""+this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(~~((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&console.error("[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return this.valueIsArray?[(this.currentValue[0]-this.minimum)/this.spacing*this.gap,(this.currentValue[1]-this.minimum)/this.spacing*this.gap]:(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return this.valueIsArray?[[0,this.position[1]],[this.position[0],this.size]]:[0,this.size]},valueLimit:function(){return this.valueIsArray?[[this.minimum,this.currentValue[1]],[this.currentValue[0],this.maximum]]:[this.minimum,this.maximum]},wrapStyles:function(){return{width:"number"==typeof this.boxWidth?this.boxWidth+"px":this.boxWidth,height:"number"==typeof this.boxHeight?this.boxHeight+"px":this.boxHeight,padding:"vertical"===this.direction?this.dotSize/2+"px "+(this.dotSize/2+5)+"px":this.piecewiseLabel?"0 "+(this.dotSize/2+10)+"px":"0 "+this.dotSize/2+"px"}},elemStyles:function(){return"vertical"===this.direction?{width:this.processWidth+"px",height:"100%"}:this.title?{height:this.processHeight+"px",marginTop:"50px"}:{height:this.processHeight+"px",marginTop:"70px"}},dotStyles:function(){return"vertical"===this.direction?{width:this.dotSize+"px",height:this.dotSize+"px",left:-(this.dotSize-this.processWidth)/2+"px"}:{width:this.dotSize+"px",height:this.dotSize+"px",top:-(this.dotSize-this.processHeight)/2+"px"}},piecewiseDotStyle:function(){return"vertical"===this.direction?{width:2*this.processWidth+"px",height:2*this.processWidth+"px"}:{width:2*this.processHeight+"px",height:2*this.processHeight+"px"}},piecewiseDotWrap:function(){if(!this.piecewise&&!this.piecewiseLabel)return!1;for(var t=[],e=0;e<=this.total;e++){var i="vertical"===this.direction?{bottom:this.gap*e-this.processWidth/2+"px",left:0}:{left:this.gap*e-this.processHeight+"px",top:"-3px"},s=this.reverse?this.total-e:e,n=this.data?this.data[s]:this.spacing*s+this.min;t.push({style:i,label:this.formatter?this.formatting(n):n,inRange:this.val===n})}return t}},watch:{value:function(t){this.setValue(t,!0)},max:function(t){var e=this.limitValue(this.val);!1!==e&&this.setValue(e),this.refresh()},min:function(t){var e=this.limitValue(this.val);!1!==e&&this.setValue(e),this.refresh()}},methods:{bindEvents:function(){document.addEventListener("touchmove",this.moving,{passive:!1}),document.addEventListener("touchend",this.moveEnd,{passive:!1}),document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd),window.addEventListener("resize",this.refresh)},unbindEvents:function(){window.removeEventListener("resize",this.refresh),document.removeEventListener("touchmove",this.moving),document.removeEventListener("touchend",this.moveEnd),document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd)},formatting:function(t){return"string"==typeof this.formatter?this.formatter.replace(/\{value\}/,t):this.formatter(t)},getPos:function(t){return this.realTime&&this.getStaticData(),"vertical"===this.direction?this.reverse?t.pageY-this.offset:this.size-(t.pageY-this.offset):this.reverse?this.size-(t.clientX-this.offset):t.clientX-this.offset},wrapClick:function(t){var e=this.getPos(t);this.valueIsArray?this.currentSlider=e>(this.position[1]-this.position[0])/2+this.position[0]?1:0:this.setValueOnPos(e)},moveStart:function(t){this.valueIsArray&&(this.currentSlider=t),this.flag=!0,this.$emit("drag-start",this)},moving:function(t){if(!this.flag)return!1;t.preventDefault(),t.targetTouches&&t.targetTouches[0]&&(t=t.targetTouches[0]),this.setValueOnPos(this.getPos(t),!0)},moveEnd:function(t){if(!this.flag)return!1;this.$emit("drag-end",this),this.flag=!1,this.setPosition()},setValueOnPos:function(t,e){var i=this.valueIsArray?this.limit[this.currentSlider]:this.limit,s=this.valueIsArray?this.valueLimit[this.currentSlider]:this.valueLimit;if(this.valueIsArray&&this.beyondCircle){if(t>=0&&t<=this.$refs.elem.offsetWidth){this.setTransform(t);var n=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(n,e),t<i[0]?this.noBlue=!0:t>i[1]?this.noBlue=!0:this.noBlue=!1}}else if(t>=i[0]&&t<=i[1]){this.setTransform(t);var r=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(r,e)}else t<i[0]?(this.setTransform(i[0]),this.setCurrentValue(s[0],e)):(this.setTransform(i[1]),this.setCurrentValue(s[1],e))},isDiff:function(t,e){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some(function(t,i){return t!==e[i]}):t!==e)},setCurrentValue:function(t,e){if(t<this.minimum||t>this.maximum)return!1;this.valueIsArray?this.isDiff(this.currentValue[this.currentSlider],t)&&(this.currentValue.splice(this.currentSlider,1,t),this.syncValue()):this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.syncValue()),e||this.setPosition()},setValue:function(t,e,i){var s=this;if(this.isDiff(this.val,t)){var n=this.limitValue(t);this.val=!1!==n?this.valueIsArray?n.concat():n:this.valueIsArray?t.concat():t,this.syncValue(e)}this.$nextTick(function(){return s.setPosition(i)})},setPosition:function(t){this.flag||this.setTransitionTime(void 0===t?this.speed:t),this.valueIsArray?(this.currentSlider=0,this.setTransform(this.position[this.currentSlider]),this.currentSlider=1,this.setTransform(this.position[this.currentSlider])):this.setTransform(this.position),this.flag||this.setTransitionTime(0)},setTransform:function(t){var e=void 0;e="vertical"===this.direction?(this.dotSize/2-t)*(this.reverse?-1:1):(t-this.dotSize/2)*(this.reverse?-1:1);var i="vertical"===this.direction?"translateY("+e+"px)":"translateX("+e+"px)",s=(0===this.currentSlider?this.position[1]-t:t-this.position[0])+"px",n=(0===this.currentSlider?t:this.position[0])+"px";this.valueIsArray?(this.slider[this.currentSlider].style.transform=i,this.slider[this.currentSlider].style.WebkitTransform=i,this.slider[this.currentSlider].style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=s,this.$refs.process.style[this.reverse?"top":"bottom"]=n):(this.$refs.process.style.width=s,this.$refs.process.style[this.reverse?"right":"left"]=n)):(this.slider.style.transform=i,this.slider.style.WebkitTransform=i,this.slider.style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=t+"px",this.$refs.process.style[this.reverse?"top":"bottom"]=0):(this.$refs.process.style.width=t+"px",this.$refs.process.style[this.reverse?"right":"left"]=0))},setTransitionTime:function(t){if(t||this.$refs.process.offsetWidth,this.valueIsArray){for(var e=0;e<this.slider.length;e++)this.slider[e].style.transitionDuration=t+"s",this.slider[e].style.WebkitTransitionDuration=t+"s";this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"}else this.slider.style.transitionDuration=t+"s",this.slider.style.WebkitTransitionDuration=t+"s",this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"},limitValue:function(t){var e=this;if(this.data)return t;var i=!1;return this.valueIsArray?t=t.map(function(t){return t<e.min?(i=!0,e.min):t>e.max?(i=!0,e.max):t}):t>this.max?(i=!0,t=this.max):t<this.min&&(i=!0,t=this.min),i&&t},syncValue:function(t){t||this.$emit("callback",this.val),this.$emit("input",this.valueIsArray?this.val.concat():this.val)},getStaticData:function(){this.$refs.elem&&(this.size="vertical"===this.direction?this.$refs.elem.offsetHeight:this.$refs.elem.offsetWidth,this.offset="vertical"===this.direction?this.$refs.elem.getBoundingClientRect().top+window.pageYOffset||document.documentElement.scrollTop:this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.setPosition())}},mounted:function(){var t=this;"undefined"!=typeof window&&"undefined"!=typeof document&&this.$nextTick(function(){t.getStaticData(),t.setValue(t.value,!0,0),t.bindEvents()})},beforeDestroy:function(){this.unbindEvents()}}},chG5:function(t,e,i){"use strict";function s(t){i("Pn51")}var n=i("WCnO"),r=i("zjtT"),a=i("VU/8"),o=s,l=a(n.a,r.a,!1,o,null,null);e.a=l.exports},i9vq:function(t,e){},"j/Ck":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Ui-head",class:{type2:"head_btn"===t.type}},[i("h3",{domProps:{textContent:t._s(t.title)}}),t._v(" "),t._t("default")],2)},n=[],r={render:s,staticRenderFns:n};e.a=r},l7jA:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"noselect",attrs:{id:"app"}},[i("div",{staticClass:"container"},[i("h3",{staticClass:"app_title",domProps:{textContent:t._s(t.title)}}),t._v(" "),i("div",{attrs:{id:"renderCanvas"}},[i("div",{staticClass:"img"},[i("img",{attrs:{src:t.img1}})])])]),t._v(" "),i("ui-btn",{staticClass:"aside_reset",style:"position:absolute;right:92px;",attrs:{type:"reset3",id:"button1"},nativeOn:{click:function(e){t.backWidget(e)}}}),t._v(" "),i("ui-btn",{staticClass:"aside_reset",attrs:{type:"reset1"},nativeOn:{click:function(e){t.reset(e)}}}),t._v(" "),i("div",{staticClass:"switch-group"},[i("ui-btn",{staticClass:"switch1",attrs:{type:"switch"},model:{value:t.checked1,callback:function(e){t.checked1=e},expression:"checked1"}},[t._v("\n    平移\n  ")]),t._v(" "),i("ui-btn",{staticClass:"switch2",attrs:{type:"switch"},model:{value:t.checked2,callback:function(e){t.checked2=e},expression:"checked2"}},[t._v("\n      隐藏y=sinx 图像\n    ")])],1)],1)},n=[],r={render:s,staticRenderFns:n};e.a=r},m1oz:function(t,e,i){"use strict";e.a={props:["title","type"],components:{},created:function(){},data:function(){return{}},methods:{resetApp:function(){this.$emit("resetApp")}}}},odG8:function(t,e){},oinG:function(t,e,i){"use strict";function s(t){i("odG8")}var n=i("8wPv"),r=i("yMOy"),a=i("VU/8"),o=s,l=a(n.a,r.a,!1,o,null,null);e.a=l.exports},"rz/e":function(t,e){},xJD8:function(t,e,i){"use strict";var s=i("I5Qu"),n=i("oinG"),r=i("chG5");e.a={name:"app",components:{uiHead:s.a,uiBtn:n.a,uiSlider:r.a},data:function(){return{title:"余弦函数的图像（平移法）",BtnSpaceStyle:"flex",isFirst:!0,checked1:!1,checked2:!1,TO:null,timer:null,img1:"static/img/img1.png"}},created:function(){document.title=this.title},mounted:function(){document.onselectstart=function(){return!1},this.setSideStyle(),this.TO=this.init(),window.onresize=function(){var t=$("canvas").width(),e=$("canvas").height();$("canvas").css({left:($("#renderCanvas").width()-t)/2+"px",top:($("#renderCanvas").height()-e)/2+"px"})}},computed:{},watch:{checked1:function(){this.TO.pingyi(this.checked1)},checked2:function(){this.TO.yincang(this.checked2)}},methods:{backWidget:function(){window.location.href="../../index.html"},reset:function(){this.TO.reset()},init:function(){var t=this,e=null,i=null,s=null,n=null,r=null,a=null,o=null,l=null;l=/iPad|Android/g.test(navigator.userAgent),s=l?new THREE.WebGLRenderer({antialias:!0}):new THREE.CanvasRenderer,n=$("#renderCanvas").width(),r=$("#renderCanvas").height(),e=new THREE.Scene,i=new THREE.PerspectiveCamera(50,n/r,1,1e4),i.position.x=0,i.position.y=0,i.position.z=1200,i.lookAt(e.position),e.add(i),s.setPixelRatio(window.devicePixelRatio),s.setClearColor(16777215),s.setSize(n,r),a=new THREE.OrbitControls(i,s.domElement),a.enableDamping=!0,a.dampingFactor=.25,a.enableZoom=!0,a.enableRotate=!1,a.enablePan=!1,$("#renderCanvas").append(s.domElement);var u=function(t,e,i){return new THREE.Vector3(t,e,i)},h=function(t,e,i,s){var n=null,r=new THREE.Geometry;return e||(e="#000"),s||(s=1),2==i?(r.vertices=t,r.computeLineDistances(),n=new THREE.Line(r,new THREE.LineDashedMaterial({color:e,dashSize:5,gapSize:5,depthTest:!1,linewidth:s}))):3==i&&(r.vertices=t,n=new THREE.Line(r,new THREE.LineBasicMaterial({color:e,linewidth:s}))),n},c=function(t,e){var i=new THREE.MeshBasicMaterial({color:e}),s=new THREE.Geometry;return s.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0)),s.vertices=t,new THREE.Mesh(s,i)},d=function(t,e,i,s,n,r){var a=THREE_Text.SpriteText2D,o=THREE_Text.textAlign,l={align:o.center,font:r+'px "Cambria Italic"',fillStyle:n,antialias:!0},u=new a(t,l);return u.position.set(e,i,s),u},p=function(t,e,i){for(var s=THREE_Text.SpriteText2D,n=THREE_Text.textAlign,r={align:n.center,font:'18px "Cambria Math"',fillStyle:"#000000",antialias:!0},a={},l={},c=null,d=null,p=t-80;p<=i+80;p+=2*e)if(0!=p){l=new s(p/160+"π",r),l.position.x=0==p?p+10:p,l.position.y=-5,o.add(l),d=[],d.push(u(p,0,0)),d.push(u(p,10,0));var c=h(d,"#000000",3,2);o.add(c)}for(var p=t;p<=i;p+=100)0!=p&&(a=new s(p/100,r),a.position.x=-15,a.position.y=p+10,a.position.z=.2,o.add(a),d=[],d.push(u(0,p,0)),d.push(u(10,p,0)),c=h(d,"#000000",3,2),o.add(c));o.add(a)},f=function(t,e,i,s){var n=new THREE.Geometry,r=[];r.push(t),r.push(e),n.vertices=r;var a=h(n.vertices,i,3,2);o.add(a);var l;if(1==s){r=[],r.push(u(e.x-10,0,0)),r.push(u(e.x-13,5,0)),r.push(u(e.x+5,0,0));var p=c(r,"#000");o.add(p),r=[],r.push(u(e.x-10,0,0)),r.push(u(e.x-13,-5,0)),r.push(u(e.x+5,0,0));var f=c(r,"#000");o.add(f),l=d("x",e.x,-5,0,"#000",28),o.add(l),l=d("0",-14,-2,0,"#000",28),o.add(l)}else{r=[],r.push(u(0,e.y-10,0)),r.push(u(5,e.y-13,0)),r.push(u(0,e.y+5,0));var p=c(r,"#000");o.add(p),r=[],r.push(u(0,e.y-10,0)),r.push(u(-5,e.y-13,0)),r.push(u(0,e.y+5,0));var f=c(r,"#000");o.add(f),l=d("y",20,e.y+10,0,"#000",28),o.add(l)}};!function(){o=new THREE.Group,p(-400,40,400),f(u(-550,0,0),u(550,0,0),0,1),f(u(0,-450,0),u(0,450,0),0,2),e.add(o)}();var m,v;!function(){for(var t=[],i=[],s=[],n=-450;n<450;n++)t.push(u(n,100*Math.sin(n/160*Math.PI),0));m=h(t,"#000",3,2),v=h(t,"#f00",3,2),v.visible=!1,i.push(u(-500,100,0)),i.push(u(500,100,0)),s.push(u(-500,-100,0)),s.push(u(500,-100,0));var r=h(i,"#000",2,1),a=h(s,"#000",2,1);e.add(v,m,r,a)}();var y=function(e){cancelAnimationFrame(t.timer);var i=v.position.x;v.visible=!0;!function s(){if(e){if(i<=-80)return void cancelAnimationFrame(t.timer);i-=2,v.position.x-=2}else{if(i>=0)return cancelAnimationFrame(t.timer),void(v.visible=!1);i+=2,v.position.x+=2}t.timer=requestAnimationFrame(s)}()},g=function(t){m.visible=!t},x=function(){i.position.x=0,i.position.y=0,i.position.z=1200,t.checked1=!1,t.checked2=!1,v.position.x=0,v.visible=!1,cancelAnimationFrame(t.timer)};!function t(){a.update(),s.clear(),s.render(e,i),requestAnimationFrame(t)}();return function(t){return{reset:x,pingyi:y,yincang:g}}()},setSideStyle:function(){var t=document.getElementById("btn_space");t&&t.scrollHeight>t.offsetHeight?this.BtnSpaceStyle="block":this.BtnSpaceStyle="flex"}}}},yMOy:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"UI-btn",class:t.classObj,attrs:{value:t.value},on:{click:t.clickEvent}},["reset1"===t.type?i("img",{attrs:{src:"static/UI/chongzhi@2x.png",alt:""}}):t._e(),t._v(" "),"reset2"===t.type?i("img",{attrs:{src:"static/UI/last@2x.png",alt:""}}):t._e(),t._v(" "),"reset3"===t.type?i("img",{attrs:{src:"static/UI/back@2x.png",alt:""}}):t._e(),t._v(" "),"radio"!=this.type&&"checkbox"!=this.type&&"switch"!=this.type?t._t("default"):t._e(),t._v(" "),"play"===t.type?i("img",{attrs:{src:t.playSrc,alt:""}}):t._e(),t._v(" "),"radio"===this.type?i("span",{class:{checked:t.value}},[i("em")]):t._e(),t._v(" "),"radio"===this.type?i("p",[t._t("default")],2):t._e(),t._v(" "),"checkbox"===this.type?i("span",{class:{checked:t.value}},[i("img",{attrs:{src:"static/UI/nike@2x.png"}})]):t._e(),t._v(" "),"checkbox"===this.type?i("p",[t._t("default")],2):t._e(),t._v(" "),"switch"===this.type?i("p",[t._t("default")],2):t._e(),t._v(" "),"switch"===this.type?i("span",{class:{checked:t.value}},[i("em")]):t._e()],2)},n=[],r={render:s,staticRenderFns:n};e.a=r},zjtT:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrap",class:["uiSlider",t.isBox,t.flowDirection,{"ui-has-piecewise":t.piecewiseLabel,noBlueProcess:t.noBlueProcess?t.noBlueProcess:t.noBlue}],style:t.wrapStyles,on:{click:t.wrapClick}},[t.title?i("h3",{staticClass:"ui-title",domProps:{textContent:t._s(t.title)}}):t._e(),t._v(" "),t.subTitle?i("p",{staticClass:"ui-subTitle",domProps:{textContent:t._s(t.subTitle)}}):t._e(),t._v(" "),t.label?i("ul",{staticClass:"ui-label",style:{width:t.infinity?"53%":"",marginLeft:t.dotSize/2+"px"}},t._l(t.label,function(e){return i("li",{style:{width:100/t.label.length+"%"},domProps:{textContent:t._s(e)}})})):t._e(),t._v(" "),i("div",{ref:"elem",staticClass:"vue-slider",style:[t.elemStyles,t.infinityStyle],attrs:{"aria-hidden":"true"}},[t.valueIsArray?[i("div",{ref:"dot0",class:[t.tooltipStatus,"ui-dot"],style:[t.dotStyles],on:{mousedown:function(e){t.moveStart(0)},touchstart:function(e){t.moveStart(0)}}},[i("span",{staticClass:"dotTxt",domProps:{textContent:t._s(t.dotTxt&&t.dotTxt[0])}}),t._v(" "),i("span",{class:["ui-toolTip-"+t.tooltipDirection[0],"ui-toolTip-wrap"]},[t._v("\n            "+t._s(t.formatter?t.formatting(t.val[0]):t.val[0])+"\n          ")])]),t._v(" "),i("div",{ref:"dot1",class:[t.tooltipStatus,"ui-dot"],style:[t.dotStyles],on:{mousedown:function(e){t.moveStart(1)},touchstart:function(e){t.moveStart(1)}}},[i("span",{staticClass:"dotTxt",domProps:{textContent:t._s(t.dotTxt&&t.dotTxt[1])}}),t._v(" "),i("span",{class:["ui-toolTip-"+t.tooltipDirection[1],"ui-toolTip-wrap"]},[t._v("\n            "+t._s(t.formatter?t.formatting(t.val[1]):t.val[1])+"\n\t\t\t\t\t")])])]:[i("div",{ref:"dot",class:[t.tooltipStatus,"ui-dot"],style:[t.dotStyles],on:{mousedown:t.moveStart,touchstart:t.moveStart}},[i("span",{staticClass:"dotTxt",domProps:{textContent:t._s(t.dotTxt)}}),t._v(" "),i("span",{class:["ui-toolTip-"+t.tooltipDirection,"ui-toolTip-wrap"]},[t._v("\n            "+t._s(t.formatter?t.formatting(t.val):t.val)+"\n\t\t\t\t\t")])])],t._v(" "),i("ul",{staticClass:"ui-piecewise"},t._l(t.piecewiseDotWrap,function(e,s){return i("li",{key:s,staticClass:"ui-piecewise-item",style:[t.piecewiseDotStyle,e.style]},[t.piecewise?i("span",{staticClass:"ui-piecewise-dot",class:{piecewiseActiveStyle:e.inRange}}):t._e(),t._v(" "),t.piecewiseLabel?i("span",{staticClass:"ui-piecewise-label",class:{labelActiveStyle:e.inRange}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t")]):t._e()])})),t._v(" "),i("div",{ref:"process",staticClass:"vue-slider-process"})],2),t._v(" "),t.infinity?i("div",{staticClass:"ui-infinity",style:{height:t.processHeight+"px"}},[i("span"),i("span"),t._v(" "),i("span"),t._v(" "),i("span"),i("span"),t._v(" "),i("small",[t._v("+∞")])]):t._e(),t._v(" "),t.valueIsArray||t.data?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"vue-slider-sr-only",attrs:{type:"range",min:t.min,max:t.max},domProps:{value:t.val},on:{__r:function(e){t.val=e.target.value}}})])},n=[],r={render:s,staticRenderFns:n};e.a=r}},["NHnr"]);