webpackJsonp([1],{"8wPv":function(t,s,e){"use strict";s.a={props:{type:String,size:String,value:{type:Boolean,default:!1}},components:{},created:function(){},watch:{value:function(t){"play"===this.type&&(this.playSrc=t?"static/UI/play icon@2x.png":"static/UI/Combined Shape@2x.png")}},computed:{classObj:function(){return{"btn-48":"reset1"===this.type||"reset2"===this.type||"reset3"===this.type,"btn-blue":"blue"===this.type,"btn-240":"big"===this.size||"240"===this.size,"UI-circle":"play"===this.type,"btn-radio":"radio"===this.type,"btn-checkbox":"checkbox"===this.type,"btn-switch":"switch"===this.type}}},data:function(){return{playSrc:"static/UI/play icon@2x.png"}},methods:{clickEvent:function(){this.$emit("input",!this.value)}}}},M93x:function(t,s,e){"use strict";function i(t){e("tVPh")}var n=e("xJD8"),o=e("SGCC"),a=e("VU/8"),u=i,l=a(n.a,o.a,!1,u,null,null);s.a=l.exports},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7+uW"),n=e("M93x"),o=e("v5o6"),a=e.n(o);i.a.config.productionTip=!1,a.a.attach(document.body),new i.a({el:"#app",template:"<App/>",components:{App:n.a}})},P7qo:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"UI-btn",class:t.classObj,attrs:{value:t.value},on:{click:t.clickEvent}},["reset1"===t.type?e("img",{attrs:{src:"static/UI/chongzhi@2x.png",alt:""}}):t._e(),t._v(" "),"reset2"===t.type?e("img",{attrs:{src:"static/UI/last@2x.png",alt:""}}):t._e(),t._v(" "),"reset3"===t.type?e("img",{attrs:{src:"static/UI/back@2x.png",alt:""}}):t._e(),t._v(" "),"radio"!=this.type&&"checkbox"!=this.type&&"switch"!=this.type?t._t("default"):t._e(),t._v(" "),"play"===t.type?e("img",{attrs:{src:t.playSrc,alt:""}}):t._e(),t._v(" "),"radio"===this.type?e("span",{class:{checked:t.value}},[e("em")]):t._e(),t._v(" "),"radio"===this.type?e("p",[t._t("default")],2):t._e(),t._v(" "),"checkbox"===this.type?e("span",{class:{checked:t.value}},[e("img",{attrs:{src:"static/UI/nike@2x.png"}})]):t._e(),t._v(" "),"checkbox"===this.type?e("p",[t._t("default")],2):t._e(),t._v(" "),"switch"===this.type?e("p",[t._t("default")],2):t._e(),t._v(" "),"switch"===this.type?e("span",{class:{checked:t.value}},[e("em")]):t._e()],2)},n=[],o={render:i,staticRenderFns:n};s.a=o},SGCC:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"noselect",attrs:{id:"app"}},[e("div",{staticClass:"container"},[e("h3",{staticClass:"app_title",domProps:{textContent:t._s(t.title)}}),t._v(" "),e("div",{staticClass:"ViewSpace"},[e("div",{staticClass:"viewBox",style:[t.zoom]},[e("ul",{ref:"tapUl"},t._l(t.names,function(s){return e("li",{style:{height:405/t.names.length+"px",lineHeight:405/t.names.length+"px"},domProps:{textContent:t._s(s)}})})),t._v(" "),e("dl",[e("dd",{style:{height:405/t.names.length+"px"}},t._l(t.first_dd,function(t){return e("img",{class:t.class,attrs:{src:t.src,alt:""}})})),t._v(" "),e("dd",{style:{height:405/t.names.length+"px"}},[e("span",{style:{opacity:""!=t.inputs[0]?"1":"0",position:"relative",left:t.justifyContent?"0":"68px"},domProps:{innerHTML:t._s(t.inputs[0])}}),t._v(" "),e("span",{style:{opacity:""!=t.inputs[1]?"1":"0"},domProps:{innerHTML:t._s(t.inputs[1])}}),t._v(" "),e("span",{style:{opacity:""!=t.inputs[2]?"1":"0"},domProps:{innerHTML:t._s(t.inputs[2])}}),t._v(" "),e("span",{style:{opacity:""!=t.inputs[3]?"1":"0"},domProps:{innerHTML:t._s(t.inputs[3])}})]),t._v(" "),e("dd",{style:{height:405/t.names.length+"px"}},[e("img",{staticClass:"img",style:{opacity:""!=t.last_dd[0]?"1":"0",position:"relative",left:t.justifyContent?"0":"115px"},attrs:{src:t.last_dd[0],alt:""}}),t._v(" "),e("img",{staticClass:"img",style:{opacity:""!=t.last_dd[1]?"1":"0"},attrs:{src:t.last_dd[1]?t.last_dd[1]:t.last_dd[0],alt:""}}),t._v(" "),e("img",{staticClass:"img",style:{opacity:""!=t.last_dd[2]?"1":"0",position:"relative",left:t.justifyContent?"0":"9px"},attrs:{src:t.last_dd[2],alt:""}}),t._v(" "),e("img",{staticClass:"img",style:{opacity:""!=t.last_dd[3]?"1":"0"},attrs:{src:t.last_dd[3]?t.last_dd[3]:t.last_dd[2],alt:""}})])]),t._v(" "),e("div",{staticClass:"result_btn",attrs:{name:"itemlist",tag:"div"}},[e("ui-btn",{style:{opacity:""!=t.childrens[0]?"1":"0","pointer-events":"none",position:"relative",left:t.justifyContent?"0px":"140px"},domProps:{innerHTML:t._s(t.childrens[0])}}),t._v(" "),e("ui-btn",{style:{opacity:""!=t.childrens[1]?"1":"0","pointer-events":"none"},domProps:{innerHTML:t._s(t.childrens[1])}}),t._v(" "),e("ui-btn",{style:{opacity:""!=t.childrens[2]?"1":"0","pointer-events":"none",position:"relative",left:t.justifyContent?"0px":"2px"},domProps:{innerHTML:t._s(t.childrens[2])}}),t._v(" "),e("ui-btn",{style:{opacity:""!=t.childrens[3]?"1":"0","pointer-events":"none"},domProps:{innerHTML:t._s(t.childrens[3])}})],1),t._v(" "),e("ol",[e("li",[t._l(5,function(s){return 1===t.topShow[s-1]?e("img",{key:s,style:{left:"122px"},attrs:{src:"static/arrows/arrow-"+s+".png"}}):t._e()}),t._v(" "),t._l(5,function(s){return 2===t.topShow[s-1]?e("img",{key:s,style:{left:"122px"},attrs:{src:"static/arrows/arrow-0"+s+".png"}}):t._e()})],2),t._v(" "),e("li",[t._l(17,function(s){return s+5<=17?e("img",{key:s,style:{left:"68px",opacity:1===t.downShow[s+5-1]?1:0},attrs:{src:"static/arrows/arrow-"+(s+5)+".png"}}):t._e()}),t._v(" "),t._l(17,function(s){return s+5<=17?e("img",{key:s,style:{left:"68px",opacity:2===t.downShow[s+5-1]?1:0},attrs:{src:"static/arrows/arrow-0"+(s+5)+".png"}}):t._e()})],2)])])])]),t._v(" "),e("div",{staticClass:"app_aside"},[e("ui-btn",{staticClass:"aside_reset",style:"position:absolute;right:72px;",attrs:{type:"reset3",id:"buttom7"},nativeOn:{click:function(s){t.backWidget(s)}}}),t._v(" "),e("ui-btn",{staticClass:"aside_reset",attrs:{type:"reset1",id:"buttom1"},nativeOn:{click:function(s){t.resetWidget(s)}}}),t._v(" "),e("div",{staticClass:"btn_space",style:{display:t.BtnSpaceStyle},attrs:{id:"btn_space"}},[e("div",[e("div",[e("h3",[t._v("女性")]),t._v(" "),t._l(t.females,function(s){return e("div",{key:s.name,class:{disabled:t.female!=s.name&&""!=t.female,checked:t.female==s.name},attrs:{size:"big",id:s.id,type:t.female===s.name?"blue":""},domProps:{innerHTML:t._s(s.htm)},on:{click:function(e){t.setActive(s.name,"female",t.female!=s.name&&""!=t.female)}}})})],2),t._v(" "),e("div",[e("h3",[t._v("男性")]),t._v(" "),t._l(t.males,function(s){return e("div",{key:s.name,class:{disabled:t.male!=s.name&&""!=t.male,checked:t.male==s.name},attrs:{size:"big",id:s.id,type:t.male===s.name?"blue":""},domProps:{innerHTML:t._s(s.htm)},on:{click:function(e){t.setActive(s.name,"male",t.male!=s.name&&""!=t.male)}}})})],2)])])],1)])},n=[],o={render:i,staticRenderFns:n};s.a=o},n5F4:function(t,s){},oinG:function(t,s,e){"use strict";function i(t){e("n5F4")}var n=e("8wPv"),o=e("P7qo"),a=e("VU/8"),u=i,l=a(n.a,o.a,!1,u,null,null);s.a=l.exports},tVPh:function(t,s){},xJD8:function(t,s,e){"use strict";var i=e("oinG");s.a={name:"app",components:{uiBtn:i.a},data:function(){return{title:"血友病的遗传方式",BtnSpaceStyle:"flex",zoom:{},female:"",male:"",names:["亲代","配子","子代"],inputs:["","","",""],first_dd:[{class:"icon",src:"static/img/female-icon.png"},{class:"img",src:"static/img/female-hui.png"},{class:"img",src:"static/img/male-hui.png"},{class:"icon",src:"static/img/male-icon.png"}],last_dd:["","","",""],females:[{name:"XWXW",htm:'<img src="static/img/1.png" alt=""><p>X<sup>H</sup>X<sup>H</sup></p>',id:"buttom2"},{name:"XWXw",htm:'<img src="static/img/2.png" alt=""><p>X<sup>H</sup>X<sup class="small">h</sup></p>',id:"buttom3"},{name:"XwXw",htm:'<img src="static/img/3.png" alt=""><p>X<sup class="small">h</sup>X<sup class="small">h</sup></p>',id:"buttom4"}],males:[{name:"XWY",htm:'<img src="static/img/4.png" alt=""><p>X<sup>H</sup>Y</p>',id:"buttom5"},{name:"XwY",htm:'<img src="static/img/5.png" alt=""><p>X<sup class="small">h</sup>Y</p>',id:"buttom6"}],topShow:[0,0,0,0,0],downShow:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],childrens:["","","",""],Timeouts:[],justifyContent:!1}},created:function(){document.title=this.title},mounted:function(){this.resize(),this.setSideStyle(),this.getViewSize()},computed:{},watch:{},methods:{setSideStyle:function(){var t=document.getElementById("btn_space");t&&t.scrollHeight>t.offsetHeight?this.BtnSpaceStyle="block":this.BtnSpaceStyle="flex"},getViewSize:function(){var t=window.innerWidth-280,s=window.innerHeight-72;this.zoom=t/s>=744/505?{zoom:(s/505).toFixed(1)}:{zoom:(t/744).toFixed(1)}},resize:function(){var t=this;window.addEventListener("resize",function(){t.setSideStyle(),t.getViewSize()})},backWidget:function(){window.location.href="../../index.html"},resetWidget:function(){this.female="",this.male="",this.first_dd=[{class:"icon",src:"static/img/female-icon.png"},{class:"img",src:"static/img/female-hui.png"},{class:"img",src:"static/img/male-hui.png"},{class:"icon",src:"static/img/male-icon.png"}],this.inputs=["","","",""],this.topShow=[0,0,0,0,0];for(var t in this.Timeouts)this.Timeouts[t]&&""!==this.Timeouts[t]&&clearTimeout(this.Timeouts[t]);this.last_dd=["","","",""],this.downShow=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.childrens=["","","",""]},setActive:function(t,s,e){if(!e){if("female"===s){if(this.female===t)return;this.female=t,this.justifyContent="XWXw"==t,this.first_dd[1].src=this.getImgByName(t),this.inputs[0]=this.getValueByName(t),this.inputs[1]=this.getValueByName(t,1),this.inputs[0]==this.inputs[1]&&(this.inputs[1]=""),this.setLineByName(t)}else if("male"===s){if(this.male===t)return;this.male=t,this.first_dd[2].src=this.getImgByName(t),this.inputs[2]=this.getValueByName(t),this.inputs[3]=this.getValueByName(t,1),this.setLineByName(t)}this.female&&this.male&&this.getChild()}},getImgByName:function(t){return"XWXW"===t?"static/img/female-blue.png":"XWXw"===t?"static/img/female-take.png":"XwXw"===t?"static/img/female-red.png":"XWY"===t?"static/img/male-blue.png":"XwY"===t?"static/img/male-red.png":void 0},getValueByName:function(t,s){return"XWXW"===t?"X<sup>H":"XWXw"===t?s?'X<sup class="small">h</sup>':"X<sup>H":"XwXw"===t?'X<sup class="small">h</sup>':"XWY"===t?s?"Y<sup></sup>":"X<sup>H</sup>":"XwY"===t?s?"Y<sup></sup>":'X<sup class="small">h</sup>':void 0},setLineByName:function(t){"XWXW"===t?this.topShow[4]=1:"XWXw"===t?(this.topShow[0]=1,this.topShow[1]=2):"XwXw"===t?this.topShow[4]=2:"XWY"===t?(this.topShow[2]=1,this.topShow[3]=1):"XwY"===t&&(this.topShow[2]=2,this.topShow[3]=1)},getChild:function(){var t=this;this.last_dd=["","","",""],this.downShow=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.childrens=["","","",""],"XWXW"===this.female?"XWY"===this.male?(this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,13,1),t.$set(t.downShow,15,1),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-blue.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,"正常X<sup>H</sup>X<sup>H</sup>")},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,14,1),t.$set(t.downShow,16,1),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-blue.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,2,"正常X<sup>H</sup>Y")},100)},200)},1300)):"XwY"===this.male&&(this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,13,1),t.$set(t.downShow,15,2),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-take.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,'携带X<sup>H</sup>X<sup class="small">h</sup>')},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,14,1),t.$set(t.downShow,16,1),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-blue.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,2,"正常X<sup>H</sup>Y")},100)},200)},1300)):"XWXw"===this.female?"XWY"===this.male?(this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,5,1),t.$set(t.downShow,6,1),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-blue.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,"正常X<sup>H</sup>X<sup>H</sup>")},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,7,2),t.$set(t.downShow,8,1),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,1,"static/img/girl-take.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,1,'携带X<sup>H</sup>X<sup class="small">h</sup>')},100)},200)},1300),this.Timeouts[6]=setTimeout(function(){t.$set(t.downShow,9,1),t.$set(t.downShow,10,1),t.Timeouts[7]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-blue.png"),t.Timeouts[8]=setTimeout(function(){t.$set(t.childrens,2,"正常X<sup>H</sup>Y")},100)},200)},2100),this.Timeouts[9]=setTimeout(function(){t.$set(t.downShow,11,2),t.$set(t.downShow,12,1),t.Timeouts[10]=setTimeout(function(){t.$set(t.last_dd,3,"static/img/boy-red.png"),t.Timeouts[11]=setTimeout(function(){t.$set(t.childrens,3,'患者X<sup class="small">h</sup>Y')},100)},200)},2900)):"XwY"===this.male&&(console.log("XWXw-XwY"),this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,5,1),t.$set(t.downShow,6,2),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-take.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,'携带X<sup>H</sup>X<sup class="small">h</sup>')},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,7,2),t.$set(t.downShow,8,2),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,1,"static/img/girl-red.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,1,'患者X<sup class="small">h</sup>X<sup class="small">h</sup>')},100)},200)},1300),this.Timeouts[6]=setTimeout(function(){t.$set(t.downShow,9,1),t.$set(t.downShow,10,1),t.Timeouts[7]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-blue.png"),t.Timeouts[8]=setTimeout(function(){t.$set(t.childrens,2,"正常X<sup>H</sup>Y")},100)},200)},2100),this.Timeouts[9]=setTimeout(function(){t.$set(t.downShow,11,2),t.$set(t.downShow,12,1),t.Timeouts[10]=setTimeout(function(){t.$set(t.last_dd,3,"static/img/boy-red.png"),t.Timeouts[11]=setTimeout(function(){t.$set(t.childrens,3,'患者X<sup class="small">h</sup>Y')},100)},200)},2900)):"XwXw"===this.female&&("XWY"===this.male?(this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,13,2),t.$set(t.downShow,15,1),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-take.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,'携带X<sup>H</sup>X<sup class="small">h</sup>')},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,14,2),t.$set(t.downShow,16,1),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-red.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,2,'患者X<sup class="small">h</sup>Y')},100)},200)},1300)):"XwY"===this.male&&(this.Timeouts[0]=setTimeout(function(){t.$set(t.downShow,13,2),t.$set(t.downShow,15,2),t.Timeouts[1]=setTimeout(function(){t.$set(t.last_dd,0,"static/img/girl-red.png"),t.Timeouts[2]=setTimeout(function(){t.$set(t.childrens,0,'患者X<sup class="small">h</sup>X<sup class="small">h</sup>')},100)},200)},500),this.Timeouts[3]=setTimeout(function(){t.$set(t.downShow,14,2),t.$set(t.downShow,16,1),t.Timeouts[4]=setTimeout(function(){t.$set(t.last_dd,2,"static/img/boy-red.png"),t.Timeouts[5]=setTimeout(function(){t.$set(t.childrens,2,'患者X<sup class="small">h</sup>Y')},100)},200)},1300)))}}}}},["NHnr"]);