<template>
    <div id="app" class="noselect">
        <div class="menu" @click="sildeMenu(1)" ref="menu"></div>
        <div class="cover">
            <div class="landscape">
                <img src="static/UI/cover1.png">
            </div>
        </div>
        <div class="hint" style="z-index: 10;" v-if="hiddenMobTip">
            <h5>建议您在电脑或平板上打开，以获取最佳的演示效果</h5>
        </div>
        <div class="bkb">
           <h3 v-text="title" class="app_title"></h3>
        <div class="container" ref="container" id="test" @click="sildeMenu(2)">
            <!--头部-->
           
            <!--视图区-->
            <div class="ViewSpace">
                <div :style="[zoom]" class="viewBox">
                    <ul ref="tapUl">
                        <li v-for="name in names" :style="{height:405/names.length+'px',lineHeight:405/names.length+'px'}" v-text="name"></li>
                    </ul>
                    <dl>
                        <dd :style="{height:405/names.length+'px'}">
                            <img :src="o.src" :class="o.class" v-for="o in first_dd" alt="">
                        </dd>
                        <dd :style="{height:405/names.length+'px'}">
                            <span v-html="inputs[0]" :style="{opacity:inputs[0] != ''?'1':'0',position:'relative',left:!justifyContent?'68px':'0'}"></span>
                            <span v-html="inputs[1]" :style="{opacity:inputs[1] != ''?'1':'0'}"></span>
                            <span v-html="inputs[2]" :style="{opacity:inputs[2] != ''?'1':'0'}"></span>
                            <span v-html="inputs[3]" :style="{opacity:inputs[3] != ''?'1':'0'}"></span>
                        </dd>
                        <dd :style="{height:405/names.length+'px'}">
                            <img :src="last_dd[0]" alt="" :style="{opacity:last_dd[0] != ''?'1':'0',position:'relative',left:!justifyContent?'115px':'0'}" class="img">
                            <img :src="last_dd[1]?last_dd[1]:last_dd[0]" alt="" :style="{opacity:last_dd[1] != ''?'1':'0'}" class="img">
                            <img :src="last_dd[2]" alt="" :style="{opacity:last_dd[2] != ''?'1':'0',position:'relative',left:!justifyContent?'9px':'0'}" class="img">
                            <img :src="last_dd[3]?last_dd[3]:last_dd[2]" alt="" :style="{opacity:last_dd[3] != ''?'1':'0'}" class="img">
                        </dd>
                    </dl>
                    <div name="itemlist" tag="div" class="result_btn">
                        <ui-btn v-html="childrens[0]" :style="{opacity:childrens[0] != ''?'1':'0','pointer-events':'none',position:'relative',left:!justifyContent?'140px':'0px'}"></ui-btn>
                        <ui-btn v-html="childrens[1]" :style="{opacity:childrens[1] != ''?'1':'0','pointer-events':'none'}"></ui-btn>
                        <ui-btn v-html="childrens[2]" :style="{opacity:childrens[2] != ''?'1':'0','pointer-events':'none',position:'relative',left:!justifyContent?'2px':'0px'}"></ui-btn>
                        <ui-btn v-html="childrens[3]" :style="{opacity:childrens[3] != ''?'1':'0','pointer-events':'none'}"></ui-btn>
                    </div>
                    <ol>
                        <li>
                            <img :src="'static/arrows/arrow-'+q+'.png'" v-for="q in 5" :key="q" v-if="topShow[q-1] === 1" :style="{left:'122px'}">
                            <img :src="'static/arrows/arrow-0'+w+'.png'" v-for="w in 5" :key="w" v-if="topShow[w-1] === 2" :style="{left:'122px'}">
                        </li>
                        <li>
                            <img :src="'static/arrows/arrow-'+(e+5)+'.png'" v-for="e in 17" :key="e" v-if="e+5<=17" :style="{left:'68px',opacity:downShow[(e+5-1)] === 1?1:0}">
                            <img :src="'static/arrows/arrow-0'+(r+5)+'.png'" v-for="r in 17" :key="r" v-if="r+5<=17" :style="{left:'68px',opacity:downShow[(r+5-1)] === 2?1:0}">
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside" ref="sides" :class="ismob?'mobleRightColor':'normalRightColor'">
            <!--返回按钮-->
            <!--  <ui-btn type="reset3" id="buttom7" class="aside_reset" @click.native="backWidget" :style="'position:absolute;right:72px;'"></ui-btn> -->
            <!--重制按钮-->
            <ui-btn type="reset1" id="buttom1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <div>
                    <div>
                        <h3>女性</h3>
                        <div size="big" :id="fe.id" :key="fe.name" @click="setActive(fe.name,'female',female != fe.name && female != '')" :type="female === fe.name?'blue':''" :class="{disabled:female != fe.name && female != '',checked:female == fe.name}" v-html="fe.htm" v-for="fe in females"></div>
                    </div>
                    <div>
                        <h3>男性</h3>
                        <div size="big" :id="ma.id" :key="ma.name" @click="setActive(ma.name,'male',male != ma.name && male != '')" :type="male === ma.name?'blue':''" :class="{disabled:male != ma.name && male != '',checked:male == ma.name}" v-html="ma.htm" v-for="ma in males"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
    name: 'app',
    components: { uiBtn },
    data() {
        return {
            title: '外耳道多毛症的遗传方式',
            BtnSpaceStyle: 'flex',
            isMob: /iPad|Android/g.test(navigator.userAgent),
            hiddenMobTip: false,
            ele: null,
            isHidden: false,
            canSlide: false,
            ismob: false,
            ismobhen: false,
            zoom: {}, //区域大小
            female: '', //当前项
            male: '', //当前项
            names: ['亲代', '配子', '子代'],
            inputs: ['', '', '', ''],
            first_dd: [{ class: 'icon', src: 'static/img/female-icon.png' }, { class: 'img', src: 'static/img/female-hui.png' }, { class: 'img', src: 'static/img/male-hui.png' }, { class: 'icon', src: 'static/img/male-icon.png' }, ],
            last_dd: ['', '', '', ''],
            //雌性按钮
            females: [{
                name: 'XWXW',
                htm: '<img src="static/img/1.png" alt=""><p>X<sup></sup>X<sup></sup></p>',
                id: 'buttom2'
            }],
            //雄性按钮
            males: [{
                name: 'XWY',
                htm: '<img src="static/img/4.png" alt=""><p>X<sup></sup>Y</p>',
                id: 'buttom5'
            }, {
                name: 'XwY',
                htm: '<img src="static/img/5.png" alt=""><p>XY<sup class="small">B</sup></p>',
                id: 'buttom6'
            }],
            //视图区数据
            topShow: [0, 0, 0, 0, 0],
            downShow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            childrens: ['', '', '', ''],
            Timeouts: [],
            justifyContent: false
        }
    },
    created() {
        document.title = this.title;
        this.canSlide = false;
        this.isHidden = false;
    },
    mounted() {
        this.resize();
        this.setSideStyle();
        this.getViewSize();
        this.listenSide();
        window.addEventListener("resize", () => {
          this.listenSide();
        });
        let thiz = this;
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            var mql = window.matchMedia("(orientation: portrait)");

            function onMatchMeidaChange(mql) {
                clearTimeout(thiz.tipTimer);
                if (mql.matches) {
                    // 竖屏
                    thiz.isLandscape = false
                } else {
                    thiz.isLandscape = true
                    if (window.innerWidth < 500 || window.innerHeight < 500) {
                        thiz.hiddenMobTip = true;
                        thiz.tipTimer = setTimeout(() => {
                            thiz.hiddenMobTip = false;
                        }, 3000)
                    }
                }
            }
            onMatchMeidaChange(mql);
            mql.addListener(onMatchMeidaChange);
        } else {}
    },
    computed: {},
    watch: {},
    methods: {
        //计算侧边
        setSideStyle() {
            const el = document.getElementById('btn_space')
            if (el && el.scrollHeight > el.offsetHeight) {
                this.BtnSpaceStyle = 'block'
            } else {
                this.BtnSpaceStyle = 'flex'
            }
        },
        sildeMenu(val) { 
        if (!this.canSlide) {
          return;
        }
        if (val == 1 && this.isHidden) {
          this.$refs.sides.style.right = '0';
          this.$refs.menu.style.top = '-45px';
        } else if (val == 2 && !this.isHidden) {
          this.$refs.sides.style.right = '-280px';
          this.$refs.menu.style.top = '24px';
        }
        this.isHidden = !this.isHidden;
        
      },
      listenSide() { 
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (w < 500 || h < 500) {
          this.isHidden = true;
          this.canSlide = true;
          this.$refs.container.style.width = '100%';
           this.$refs.menu.style.top = '24px';
          this.$refs.sides.style.right = '-280px';
          this.ismob = true;
          if(w<=h){
            this.ismobhen = true
          }else{
            this.ismobhen = false;
          }
        } else {
          this.isHidden = false;
          this.canSlide = false;
          this.$refs.container.style.width = w - 280 + 'px';
          this.$refs.sides.style.right = '0';
          this.ismob = false;
        }
        
      },
        //计算区块大小
        getViewSize() {
            const W = window.innerWidth - 280;
            const H = window.innerHeight - 72;
            if (W / H >= 744 / 505) {
                this.zoom = {
                    // transform: 'scale(' + H / 505 + ')'
                    zoom: (H / 505).toFixed(1)
                }
            } else {
                this.zoom = {
                    // transform: 'scale(' + W / 744+','+W / 744 + ')'
                    zoom: (W / 744).toFixed(1)
                }
            }
        },
        //窗口大小更改
        resize() {
            const vm = this;
            window.addEventListener('resize', function() {
                vm.setSideStyle();
                vm.getViewSize();
            })
        },
        backWidget() {
            window.location.href = '../../index.html'
        },
        //重置
        resetWidget() {
            this.female = '';
            this.male = '';
            this.first_dd = [{ class: 'icon', src: 'static/img/female-icon.png' }, { class: 'img', src: 'static/img/female-hui.png' }, { class: 'img', src: 'static/img/male-hui.png' }, { class: 'icon', src: 'static/img/male-icon.png' }, ];
            this.inputs = ['', '', '', '']
            this.topShow = [0, 0, 0, 0, 0];
            for (let i in this.Timeouts) {
                if (this.Timeouts[i] && this.Timeouts[i] !== '') {
                    clearTimeout(this.Timeouts[i])
                }
            }
            this.last_dd = ['', '', '', ''];
            this.downShow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.childrens = ['', '', '', ''];
        },
        //设置当前项
        setActive(info, type, isDisabled) {
            if (isDisabled) {
                return;
            }
            //切换状态
            if (type === 'female') {
                if (this.female === info) {
                    return;
                }
                this.female = info;
                if (info == 'XWXw') {
                    this.justifyContent = true;
                } else {
                    this.justifyContent = false;
                }
                //更换亲代图片
                this.first_dd[1].src = this.getImgByName(info);
                //更换配子文字
                this.inputs[0] = this.getValueByName(info);
                this.inputs[1] = this.getValueByName(info, 1);
                if (this.inputs[0] == this.inputs[1]) {
                    this.inputs[1] = '';
                }

                //增加连线
                this.setLineByName(info);
            } else if (type === 'male') {
                if (this.male === info) {
                    return
                }
                this.male = info;
                //更换亲代图片
                this.first_dd[2].src = this.getImgByName(info);
                //更换配子文字
                this.inputs[2] = this.getValueByName(info);
                this.inputs[3] = this.getValueByName(info, 1);
                //增加连线
                this.setLineByName(info);
            }
            //更新子代，前提有父有母
            if (this.female && this.male) {
                this.getChild()
            }
        },
        //根据名称获取q亲代图片链接
        getImgByName(name) {
            if (name === 'XWXW') {
                return 'static/img/female-blue.png'
            } else if (name === 'XWXw') {
                return 'static/img/female-take.png'
            } else if (name === 'XwXw') {
                return 'static/img/female-red.png'
            } else if (name === 'XWY') {
                return 'static/img/male-blue.png'
            } else if (name === 'XwY') {
                return 'static/img/male-red.png'
            }
        },
        //根据名称获取配子文本框的内容
        getValueByName(name, index) {
            if (name === 'XWXW') {
                return 'X<sup>'
            } else if (name === 'XWXw') {
                return index ? 'X<sup class="small">h</sup>' : 'X'
            } else if (name === 'XwXw') {
                return 'X<sup class="small">h</sup>'
            } else if (name === 'XWY') {
                return index ? 'Y<sup></sup>' : 'X<sup></sup>'
            } else if (name === 'XwY') {
                return index ? 'Y<sup class="small">B</sup>' : 'X<sup></sup>'
            }
        },
        //根据点击的名称，添加连线
        setLineByName(name) {
            if (name === 'XWXW') {
                this.topShow[4] = 1;
            } else if (name === 'XWXw') {
                this.topShow[0] = 1;
                this.topShow[1] = 2;
            } else if (name === 'XwXw') {
                this.topShow[4] = 2;
            } else if (name === 'XWY') {
                this.topShow[2] = 1;
                this.topShow[3] = 1;
            } else if (name === 'XwY') {
                this.topShow[2] = 1;
                this.topShow[3] = 2;
            }
        },
        //根据配子，获取子代信息
        getChild() {
            //先重置
            this.last_dd = ['', '', '', ''];
            this.downShow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.childrens = ['', '', '', ''];
            //开始
            if (this.female === 'XWXW') {
                //正常+正常
                if (this.male === 'XWY') {
                    //XWXW-XWY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 13, 1)
                        this.$set(this.downShow, 15, 1)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-blue.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '正常X<sup></sup>X<sup></sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 14, 1)
                        this.$set(this.downShow, 16, 1)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/girl-blue.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 2, '正常X<sup></sup>Y')
                            }, 100)
                        }, 200)
                    }, 1300)
                    // this.Timeouts[6] = setTimeout(() => {
                    //   this.$set(this.downShow, 8, 1)
                    //   this.$set(this.downShow, 9, 1)
                    //   this.Timeouts[7] = setTimeout(() => {
                    //     this.$set(this.last_dd, 2, 'static/img/boy-blue.png')
                    //     this.Timeouts[8] = setTimeout(() => {
                    //       this.$set(this.childrens, 2, '正常X<sup>H</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2100)
                    // this.Timeouts[9] = setTimeout(() => {
                    //   this.$set(this.downShow, 10, 1)
                    //   this.$set(this.downShow, 11, 1)
                    //   this.Timeouts[10] = setTimeout(() => {
                    //     this.$set(this.last_dd, 3, 'static/img/boy-blue.png')
                    //     this.Timeouts[11] = setTimeout(() => {
                    //       this.$set(this.childrens, 3, '正常X<sup>H</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2900)
                }
                //正常+患者
                else if (this.male === 'XwY') {
                    //XWXW-XwY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 13, 1)
                        this.$set(this.downShow, 15, 1)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-blue.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '正常X<sup></sup>X<sup class="small"></sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 14, 1)
                        this.$set(this.downShow, 16, 2)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/boy-blue.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 2, '患者X<sup></sup>Y<sup class="small">B</sup>')
                            }, 100)
                        }, 200)
                    }, 1300)
                    // this.Timeouts[6] = setTimeout(() => {
                    //   this.$set(this.downShow, 8, 1)
                    //   this.$set(this.downShow, 9, 1)
                    //   this.Timeouts[7] = setTimeout(() => {
                    //     this.$set(this.last_dd, 2, 'static/img/boy-blue.png')
                    //     this.Timeouts[8] = setTimeout(() => {
                    //       this.$set(this.childrens, 2, '正常X<sup>H</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2100)
                    // this.Timeouts[9] = setTimeout(() => {
                    //   this.$set(this.downShow, 10, 1)
                    //   this.$set(this.downShow, 11, 1)
                    //   this.Timeouts[10] = setTimeout(() => {
                    //     this.$set(this.last_dd, 3, 'static/img/boy-blue.png')
                    //     this.Timeouts[11] = setTimeout(() => {
                    //       this.$set(this.childrens, 3, '正常X<sup>H</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2900)
                }
            } else if (this.female === 'XWXw') {
                //携带+正常
                if (this.male === 'XWY') {
                    //XWXw-XWY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 5, 1)
                        this.$set(this.downShow, 6, 1)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-blue.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '正常X<sup>H</sup>X<sup>H</sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 7, 2)
                        this.$set(this.downShow, 8, 1)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 1, 'static/img/girl-take.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 1, '携带X<sup>H</sup>X<sup class="small">h</sup>')
                            }, 100)
                        }, 200)
                    }, 1300)
                    this.Timeouts[6] = setTimeout(() => {
                        this.$set(this.downShow, 9, 1)
                        this.$set(this.downShow, 10, 1)
                        this.Timeouts[7] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/boy-blue.png')
                            this.Timeouts[8] = setTimeout(() => {
                                this.$set(this.childrens, 2, '正常X<sup>H</sup>Y')
                            }, 100)
                        }, 200)
                    }, 2100)
                    this.Timeouts[9] = setTimeout(() => {
                        this.$set(this.downShow, 11, 2)
                        this.$set(this.downShow, 12, 1)
                        this.Timeouts[10] = setTimeout(() => {
                            this.$set(this.last_dd, 3, 'static/img/boy-red.png')
                            this.Timeouts[11] = setTimeout(() => {
                                this.$set(this.childrens, 3, '患者X<sup class="small">h</sup>Y')
                            }, 100)
                        }, 200)
                    }, 2900)
                }
                //携带+患者
                else if (this.male === 'XwY') {
                    console.log('XWXw-XwY')
                    //XWXw-XwY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 5, 1)
                        this.$set(this.downShow, 6, 2)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-take.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '携带X<sup>H</sup>X<sup class="small">h</sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 7, 2)
                        this.$set(this.downShow, 8, 2)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 1, 'static/img/girl-red.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 1, '患者X<sup class="small">h</sup>X<sup class="small">h</sup>')
                            }, 100)
                        }, 200)
                    }, 1300)
                    this.Timeouts[6] = setTimeout(() => {
                        this.$set(this.downShow, 9, 1)
                        this.$set(this.downShow, 10, 1)
                        this.Timeouts[7] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/boy-blue.png')
                            this.Timeouts[8] = setTimeout(() => {
                                this.$set(this.childrens, 2, '正常X<sup>H</sup>Y')
                            }, 100)
                        }, 200)
                    }, 2100)
                    this.Timeouts[9] = setTimeout(() => {
                        this.$set(this.downShow, 11, 2)
                        this.$set(this.downShow, 12, 1)
                        this.Timeouts[10] = setTimeout(() => {
                            this.$set(this.last_dd, 3, 'static/img/boy-red.png')
                            this.Timeouts[11] = setTimeout(() => {
                                this.$set(this.childrens, 3, '患者X<sup class="small">h</sup>Y')
                            }, 100)
                        }, 200)
                    }, 2900)
                }
            } else if (this.female === 'XwXw') {
                //患者+正常
                if (this.male === 'XWY') {
                    //XwXw-XWY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 13, 2)
                        this.$set(this.downShow, 15, 1)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-take.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '携带X<sup>H</sup>X<sup class="small">h</sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 14, 2)
                        this.$set(this.downShow, 16, 1)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/boy-red.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 2, '患者X<sup class="small">h</sup>Y')
                            }, 100)
                        }, 200)
                    }, 1300)
                    // this.Timeouts[6] = setTimeout(() => {
                    //   this.$set(this.downShow, 8, 2)
                    //   this.$set(this.downShow, 9, 1)
                    //   this.Timeouts[7] = setTimeout(() => {
                    //     this.$set(this.last_dd, 2, 'static/img/boy-red.png')
                    //     this.Timeouts[8] = setTimeout(() => {
                    //       this.$set(this.childrens, 2, '患者X<sup class="small">h</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2100)
                    // this.Timeouts[9] = setTimeout(() => {
                    //   this.$set(this.downShow, 10, 2)
                    //   this.$set(this.downShow, 11, 1)
                    //   this.Timeouts[10] = setTimeout(() => {
                    //     this.$set(this.last_dd, 3, 'static/img/boy-red.png')
                    //     this.Timeouts[11] = setTimeout(() => {
                    //       this.$set(this.childrens, 3, '患者X<sup class="small">h</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2900)
                }
                //患者+患者
                else if (this.male === 'XwY') {
                    //XwXw-XwY
                    this.Timeouts[0] = setTimeout(() => {
                        this.$set(this.downShow, 13, 2)
                        this.$set(this.downShow, 15, 2)
                        this.Timeouts[1] = setTimeout(() => {
                            this.$set(this.last_dd, 0, 'static/img/girl-red.png')
                            this.Timeouts[2] = setTimeout(() => {
                                this.$set(this.childrens, 0, '患者X<sup class="small">h</sup>X<sup class="small">h</sup>')
                            }, 100)
                        }, 200)
                    }, 500)
                    this.Timeouts[3] = setTimeout(() => {
                        this.$set(this.downShow, 14, 2)
                        this.$set(this.downShow, 16, 1)
                        this.Timeouts[4] = setTimeout(() => {
                            this.$set(this.last_dd, 2, 'static/img/boy-red.png')
                            this.Timeouts[5] = setTimeout(() => {
                                this.$set(this.childrens, 2, '患者X<sup class="small">h</sup>Y')
                            }, 100)
                        }, 200)
                    }, 1300)
                    // this.Timeouts[6] = setTimeout(() => {
                    //   this.$set(this.downShow, 8, 2)
                    //   this.$set(this.downShow, 9, 1)
                    //   this.Timeouts[7] = setTimeout(() => {
                    //     this.$set(this.last_dd, 2, 'static/img/boy-red.png')
                    //     this.Timeouts[8] = setTimeout(() => {
                    //       this.$set(this.childrens, 2, '患者X<sup class="small">h</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2100)
                    // this.Timeouts[9] = setTimeout(() => {
                    //   this.$set(this.downShow, 10, 2)
                    //   this.$set(this.downShow, 11, 1)
                    //   this.Timeouts[10] = setTimeout(() => {
                    //     this.$set(this.last_dd, 3, 'static/img/boy-red.png')
                    //     this.Timeouts[11] = setTimeout(() => {
                    //       this.$set(this.childrens, 3, '患者X<sup class="small">h</sup>Y')
                    //     }, 100)
                    //   }, 200)
                    // }, 2900)
                }
            }
        },
    },
}
</script>
<style>
* {
    margin: 0;
    padding: 0;

}

li {
    list-style: none;
}

input,
button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
}

canvas {
    outline: none;
}




img{ pointer-events: none; }






/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.normalRightColor {
    background: #f7f7f7;
  }

  .mobleRightColor {
    background: rgba(0, 0, 0, .2);
  }
.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently not supported by any browser */
}











/*ui*/

.UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
}


  .menu {
    position: fixed;
    height: 48px;
    width: 48px;
    right: 24px;
    top: 24px;
    cursor: pointer;
    background: url('./img/menu.png') no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 10;
    transition: all 1s;
  }








/*内容区*/

.container {
    width: calc(100% - 280px);
    float: left;
    height: 100%;
}

.bkb h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
}

.app_aside {
   position: absolute;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    transition: all 1s;
    z-index: 20;
}

.insp-wrapper {
    width: 100%;
    height: 100%;
}

.aside_reset {
    margin: 20px 24px;
    float: right;
}

.btn_space {
    padding: 20px;
    width: 100%;
    height: calc(100% - 80px);
    clear: both;
    /*display: flex;*/
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
}

.btn_space>div {
    width: 240px;
    height: 385px;
}

.btn_space>div>div {
    float: left;
    width: 120px;
    height: 385px;
}

.btn_space>div>div>div {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    margin-left: 20px;
    margin-bottom: 37px;
    position: relative;
}

.btn_space>div>div>div>img {
    width: 80px;
    height: auto;
}

.btn_space>div>div>div>p {
    width: 80px;
    display: inline-block;
    font-size: 18px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: -30px;
}

.btn_space>div>div>div.checked {
    box-shadow: 0 1px 7px 0 rgba(111, 202, 255, 0.75);
}

.btn_space>div>div>div.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
}

.btn_space h3 {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
}

.UI-btn.btn-blue {
    color: #000;
}

sup {
    font-size: 14px;
    color: #373334;
}

sup.small {
    color: #FF546B;
}

.bkb{
   position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width:100%;
}


@media all and (orientation: portrait) {

    .landscape {
        width: 260px;
        height: 198px;
        margin: auto;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
        border-radius: 12px;
        z-index: 1000;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .landscape img {
        width: 100%;
        height: auto;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .cover {
        width: 100%;
        height: 100%;
        z-index: 1000;
        position: absolute;
        background-color: rgba(255, 255, 255, 1);
    }
    .hint {
        display: none;
    }
}


@media all and (orientation: landscape) {

    .landscape {
        display: none;
    }
    .landscape img {
        display: none;
    }

    .cover {
        display: none;
    }

    .hint {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 10px;
        width: 60%;
        height: 40px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
        border-radius: 100px;
        transition: display 1s;
        line-height: 40px;
    }
    .hint h5 {
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        text-align: center;
    }
}






/*视图区*/

.ViewSpace {
    width: 100%;
    height: calc(100% - 72px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ViewSpace .viewBox {
    position: relative;
    width: 744px;
    height: 505px;
    padding: 20px 0;
    display: flex;
    flex-direction:row;
}

.ViewSpace ul {
    float: left;
    width: 94px;
    height: 100%;
}

.ViewSpace ul li {
    font-size: 18px;
    color: #4D4D4D;
    width: 100%;
    text-align: right;
}

.ViewSpace dl {
    float: top;
    float: left;
    width: calc(100% - 94px);
    height: 100%;
}

.ViewSpace dl dd {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ViewSpace dl dd:last-child {
    padding-top: 12px;
}

.ViewSpace dl dd .img {
    display: inline-block;
    width: 101px;
    height: 101px;
}

.ViewSpace dl dd:last-child .img {
    margin-right: 50px;
    width: 80px;
    height: 80px;
}

.ViewSpace dl dd:last-child .img:last-child {
    margin-right: 0;
}

.ViewSpace dl dd:first-child img:nth-child(2) {
    margin-right: 30px;
}

.ViewSpace dl dd:first-child img:nth-child(3) {
    margin-left: 30px;
}

.ViewSpace dl dd .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
}

.ViewSpace dl dd:first-child .icon:first-child {
    margin-right: 18px;
}

.ViewSpace dl dd:first-child .icon:last-child {
    margin-left: 18px;
}

.ViewSpace dl dd span {
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    width: 60px;
    height: 44px;
    margin-right: 40px;
    text-align: center;
    line-height: 34px;
    font-size: 3vmin;
}

.ViewSpace dl dd span sup {
    font-size: 60%;
}

.ViewSpace dl dd span:last-child {
    margin-right: 0;
}

.ViewSpace ol {
    position: absolute;
    right: 0;
    width: 80%;
    top: 20px;
}

.ViewSpace ol li:first-child {
    margin-top: 125px;
    position: relative;
}

.ViewSpace ol li:last-child {
    margin-top: 225px;
    position: relative;
}

.ViewSpace ol li img {
    width: 300px;
    position: absolute;
    top: 0;
}

.ViewSpace ol li:last-child img {
    width: 400px;
}

.ViewSpace .result_btn {
    position: absolute;
    right: 0;
    bottom: 30px;
    width: calc(100% - 94px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ViewSpace .result_btn .UI-btn {
    margin-right: 12px;
    word-break: keep-all;
    white-space: nowrap;
    width: 135px;
    height: 44px;
    line-height: 36px;
    transition: all 0.5s;
}

.ViewSpace .result_btn .UI-btn:last-child {
    margin-right: 0;
}

.ViewSpace .result_btn img {
    height: 18px;
    vertical-align: middle;
    margin-right: 2px;
}

.itemlist-enter-active,
.itemlist-leave-active {
    transition: all 0.5s;
}

.itemlist-enter,
.itemlist-leave-active {
    height: 0;
}
</style>