<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace">
                <div :style="[zoom]" class="viewBox">
                    <ul ref="tapUl">
                        <li v-for="name in names"
                            :style="{height:405/names.length+'px',lineHeight:405/names.length+'px'}"
                            v-text="name"></li>
                    </ul>
                    <dl>
                        <dd :style="{height:405/names.length+'px','justify-content': 'center'}">
                            <img :src="o.src" :class="o.class" v-for="o in first_dd" alt="">
                        </dd>
                        <dd :style="{height:405/names.length+'px'}">
                            <span v-html="inputs[0]" :style="{opacity:inputs[0] != ''?'1':'0',position:'relative',left:!justifyContent?'68px':'0'}"></span>
                            <span v-html="inputs[1]" :style="{opacity:inputs[1] != ''?'1':'0'}"></span>
                            <span v-html="inputs[2]" :style="{opacity:inputs[2] != ''?'1':'0'}"></span>
                            <span v-html="inputs[3]" :style="{opacity:inputs[3] != ''?'1':'0'}"></span>
                        </dd>
                        <dd :style="{height:405/names.length+'px'}">
                            <img :src="last_dd[0]" alt=""
                                 :style="{opacity:last_dd[0] != ''?'1':'0',position:'relative',left:!justifyContent?'122px':'0'}" class="img">
                            <img :src="last_dd[1]?last_dd[1]:last_dd[0]" alt=""
                                 :style="{opacity:last_dd[1] != ''?'1':'0'}" class="img">
                            <img :src="last_dd[2]" alt=""
                                 :style="{opacity:last_dd[2] != ''?'1':'0',position:'relative',left:!justifyContent?'9px':'0'}" class="img">
                            <img :src="last_dd[3]?last_dd[3]:last_dd[2]" alt=""
                                 :style="{opacity:last_dd[3] != ''?'1':'0'}" class="img">
                        </dd>
                    </dl>
                    <div class="result_btn">
                        <ui-btn v-html="childrens[0]"
                                :style="{opacity:childrens[0] != ''?'1':'0','pointer-events':'none',position:'relative',left:!justifyContent?'130px':'0px'}"></ui-btn>
                        <ui-btn v-html="childrens[1]"
                                :style="{opacity:childrens[1] != ''?'1':'0','pointer-events':'none'}"></ui-btn>
                        <ui-btn v-html="childrens[2]"
                                :style="{opacity:childrens[2] != ''?'1':'0','pointer-events':'none',position:'relative',left:!justifyContent?'12px':'0px'}"></ui-btn>
                        <ui-btn v-html="childrens[3]"
                                :style="{opacity:childrens[3] != ''?'1':'0','pointer-events':'none'}"></ui-btn>
                    </div>
                    <ol>
                        <li name="itemlist" tag="li">
                            <img :src="'static/arrows/arrow-'+q+'.png'"
                                 v-for="q in 5"
                                 :key="q"
                                 v-if="topShow[q-1] === 1"
                                 :style="{left:'125px'}">

                            <img :src="'static/arrows/arrow-0'+w+'.png'"
                                 v-for="w in 5"
                                 :key="w"
                                 v-if="topShow[w-1] === 2"
                                 :style="{left:'125px'}">
                        </li>
                        <li>
                            <img :src="'static/arrows/arrow-'+(e+5)+'.png'"
                                 v-for="e in 17"
                                 v-if="e+5<=17"
                                 :style="{left:'68px',opacity:downShow[(e+5-1)] === 1?1:0}">

                            <img :src="'static/arrows/arrow-0'+(r+5)+'.png'"
                                 v-for="r in 17"
                                 v-if="r+5<=17"
                                 :style="{left:'68px',opacity:downShow[(r+5-1)] === 2?1:0}">
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <h3>雌性</h3>
                <ui-btn size="big"
                        :key="fe.name"
                        @click.native="setActive(fe.name,'female',female != fe.name && female != '')"
                        :class="{disabled:female != fe.name && female != ''}"
                        :type="female === fe.name?'blue':''"
                        v-html="fe.htm"
                        v-for="fe in females"></ui-btn>

                <h3>雄性</h3>
                <ui-btn size="big"
                        :key="ma.name"
                        @click.native="setActive(ma.name,'male',male != ma.name && male != '')"
                        :class="{disabled:male != ma.name && male != ''}"
                        :type="male === ma.name?'blue':''"
                        v-html="ma.htm"
                        v-for="ma in males"></ui-btn>

            </div>
        </div>
    </div>
</template>

<script>
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiBtn},
        data() {
            return {
                title: '果蝇的杂交实验',
                BtnSpaceStyle: 'flex',
                zoom: {},//区域大小
                female: '',//当前项
                male: '',//当前项
                names: ['亲代', '配子', '子代'],
                inputs: ['', '', '', ''],
                first_dd: [
                    {class: 'icon', src: 'static/img/female-icon.png'},
                    {class: 'img', src: 'static/img/female-hui.png'},
                    {class: 'img', src: 'static/img/male-hui.png'},
                    {class: 'icon', src: 'static/img/male-icon.png'},
                ],
                last_dd: [
                    '',
                    '',
                    '',
                    '',
                ],
                //雌性按钮
                females: [{
                    name: 'XWXW',
                    htm: '红眼X<sup>W</sup>X<sup>W</sup>'
                }, {
                    name: 'XWXw',
                    htm: '红眼X<sup>W</sup>X<sup class="small">w</sup>'
                }, {
                    name: 'XwXw',
                    htm: '白眼X<sup class="small">w</sup>X<sup class="small">w</sup>'
                }],
                //雄性按钮
                males: [{
                    name: 'XWY',
                    htm: '红眼X<sup>W</sup>Y'
                }, {
                    name: 'XwY',
                    htm: '白眼X<sup class="small">w</sup>Y'
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
        },
        mounted() {
            this.resize();
            this.setSideStyle();
            this.getViewSize();
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

            //计算区块大小
            getViewSize() {
                const W = window.innerWidth - 280;
                const H = window.innerHeight - 72;
                if (W / H >= 744 / 505) {
                    this.zoom = {
                        zoom: H / 505
                    }
                } else {
                    this.zoom = {
                        zoom: W / 744
                    }
                }
            },

            //窗口大小更改
            resize() {
                const vm = this;
                window.addEventListener('resize', function () {
                    vm.setSideStyle();
                    vm.getViewSize();
                })
            },

            //重置
            resetWidget() {
                this.female = '';
                this.male = '';
                this.first_dd = [
                    {class: 'icon', src: 'static/img/female-icon.png'},
                    {class: 'img', src: 'static/img/female-hui.png'},
                    {class: 'img', src: 'static/img/male-hui.png'},
                    {class: 'icon', src: 'static/img/male-icon.png'},
                ];

                this.inputs = ['', '', '', '']
                this.topShow = [0, 0, 0, 0, 0];
                for (let i in this.Timeouts) {
                    if (this.Timeouts[i] && this.Timeouts[i] !== '') {
                        clearTimeout(this.Timeouts[i])
                    }
                }
                this.last_dd = [
                    '',
                    '',
                    '',
                    '',
                ];

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
                    if(info=='XWXw'){
                        this.justifyContent=true;
                    }else{
                        this.justifyContent=false;
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

            //根据名称获取图片链接
            getImgByName(name) {
                if (name === 'XWXW' || name === 'XWXw') {
                    return 'static/img/female-red.png'
                } else if (name === 'XwXw') {
                    return 'static/img/female-bai.png'
                } else if (name === 'XWY') {
                    return 'static/img/male-red.png'
                } else if (name === 'XwY') {
                    return 'static/img/male-bai.png'
                }
            },

            //根据名称获取配子文本框的内容
            getValueByName(name, index) {
                if (name === 'XWXW') {
                    return 'X<sup>W'
                } else if (name === 'XWXw') {
                    return index ? 'X<sup class="small">w</sup>' : 'X<sup>W'
                } else if (name === 'XwXw') {
                    return 'X<sup class="small">w</sup>'
                } else if (name === 'XWY') {
                    return index ? 'Y<sup></sup>' : 'X<sup>W</sup>'
                } else if (name === 'XwY') {
                    return index ? 'Y<sup></sup>' : 'X<sup class="small">w</sup>'
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
                    this.topShow[2] = 2;
                    this.topShow[3] = 1;
                }
            },

            //根据配子，获取子代信息
            getChild() {
                //先重置
                this.last_dd = [
                    '',
                    '',
                    '',
                    '',
                ];
                this.downShow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.childrens = ['', '', '', ''];
                //开始
                if (this.female === 'XWXW') {
                    if (this.male === 'XWY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 13, 1)
                            this.$set(this.downShow, 15, 1)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-red.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup>W</sup>')
                                }, 100)
                            }, 200)

                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 14, 1)
                            this.$set(this.downShow, 16, 1)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-red.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                                }, 100)
                            }, 200)
                        }, 1300)

                        // this.Timeouts[6]= setTimeout(()=>{
                        //   this.$set(this.downShow,9,1)
                        //   this.$set(this.downShow,10,1)
                        //   this.Timeouts[7]= setTimeout(()=>{
                        //     this.$set(this.last_dd,2,'static/img/male-red.png')
                        //     this.Timeouts[8]= setTimeout(()=>{
                        //       this.$set(this.childrens,2,'<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                        //     },100)
                        //
                        //   },200)
                        // },2100)
                        //
                        // this.Timeouts[9]= setTimeout(()=>{
                        //   this.$set(this.downShow,11,1)
                        //   this.$set(this.downShow,12,1)
                        //   this.Timeouts[10]=setTimeout(()=>{
                        //     this.$set(this.last_dd,3,'static/img/male-red.png')
                        //
                        //     this.Timeouts[11]=setTimeout(()=>{
                        //       this.$set(this.childrens,3,'<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                        //     },100)
                        //   },200)
                        // },2900)
                    }
                    else if (this.male === 'XwY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 13, 1)
                            this.$set(this.downShow, 15, 2)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-red.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)
                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 14, 1)
                            this.$set(this.downShow, 16, 1)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-red.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                                }, 100)
                            }, 200)
                        }, 1300)

                        // this.Timeouts[6]= setTimeout(()=>{
                        //   this.$set(this.downShow,9,1)
                        //   this.$set(this.downShow,10,1)
                        //   this.Timeouts[7]= setTimeout(()=>{
                        //     this.$set(this.last_dd,2,'static/img/male-red.png')
                        //     this.Timeouts[8]= setTimeout(()=>{
                        //       this.$set(this.childrens,2,'<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                        //     },100)
                        //
                        //   },200)
                        // },2100)
                        //
                        // this.Timeouts[9]= setTimeout(()=>{
                        //   this.$set(this.downShow,11,1)
                        //   this.$set(this.downShow,12,1)
                        //   this.Timeouts[10]=setTimeout(()=>{
                        //     this.$set(this.last_dd,3,'static/img/male-red.png')
                        //     this.Timeouts[11]=setTimeout(()=>{
                        //       this.$set(this.childrens,3,'<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                        //     },100)
                        //   },200)
                        // },2900)
                    }
                }
                else if (this.female === 'XWXw') {
                    if (this.male === 'XWY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 5, 1)
                            this.$set(this.downShow, 6, 1)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-red.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup>W</sup>')
                                }, 100)
                            }, 200)

                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 7, 2)
                            this.$set(this.downShow, 8, 1)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 1, 'static/img/female-red.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 1, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)
                        }, 1300)

                        this.Timeouts[6] = setTimeout(() => {
                            this.$set(this.downShow, 9, 1)
                            this.$set(this.downShow, 10, 1)
                            this.Timeouts[7] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-red.png')
                                this.Timeouts[8] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                                }, 100)

                            }, 200)
                        }, 2100)

                        this.Timeouts[9] = setTimeout(() => {
                            this.$set(this.downShow, 11, 2)
                            this.$set(this.downShow, 12, 1)
                            this.Timeouts[10] = setTimeout(() => {
                                this.$set(this.last_dd, 3, 'static/img/male-bai.png')
                                this.Timeouts[11] = setTimeout(() => {
                                    this.$set(this.childrens, 3, '<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                                }, 100)
                            }, 200)
                        }, 2900)
                    }
                    else if (this.male === 'XwY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 5, 1)
                            this.$set(this.downShow, 6, 2)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-red.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)

                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 7, 2)
                            this.$set(this.downShow, 8, 2)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 1, 'static/img/female-bai.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 1, '<img src="static/img/female-icon.png">白眼X<sup class="small">w</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)
                        }, 1300)

                        this.Timeouts[6] = setTimeout(() => {
                            this.$set(this.downShow, 9, 1)
                            this.$set(this.downShow, 10, 1)
                            this.Timeouts[7] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-red.png')
                                this.Timeouts[8] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">红眼X<sup>W</sup>Y')
                                }, 100)

                            }, 200)
                        }, 2100)

                        this.Timeouts[9] = setTimeout(() => {
                            this.$set(this.downShow, 11, 2)
                            this.$set(this.downShow, 12, 1)
                            this.Timeouts[10] = setTimeout(() => {
                                this.$set(this.last_dd, 3, 'static/img/male-bai.png')
                                this.Timeouts[11] = setTimeout(() => {
                                    this.$set(this.childrens, 3, '<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                                }, 100)
                            }, 200)
                        }, 2900)
                    }
                }
                else if (this.female === 'XwXw') {
                    if (this.male === 'XWY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 13, 2)
                            this.$set(this.downShow, 15, 1)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-red.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">红眼X<sup>W</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)

                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 14, 2)
                            this.$set(this.downShow, 16, 1)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-bai.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                                }, 100)
                            }, 200)
                        }, 1300)

                        // this.Timeouts[6]= setTimeout(()=>{
                        //   this.$set(this.downShow,9,2)
                        //   this.$set(this.downShow,10,1)
                        //   this.Timeouts[7]= setTimeout(()=>{
                        //     this.$set(this.last_dd,2,'static/img/male-bai.png')
                        //     this.Timeouts[8]= setTimeout(()=>{
                        //       this.$set(this.childrens,2,'<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                        //     },100)
                        //
                        //   },200)
                        // },2100)
                        //
                        // this.Timeouts[9]= setTimeout(()=>{
                        //   this.$set(this.downShow,11,2)
                        //   this.$set(this.downShow,12,1)
                        //   this.Timeouts[10]=setTimeout(()=>{
                        //     this.$set(this.last_dd,3,'static/img/male-bai.png')
                        //     this.Timeouts[11]=setTimeout(()=>{
                        //       this.$set(this.childrens,3,'<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                        //     },100)
                        //   },200)
                        // },2900)
                    }
                    else if (this.male === 'XwY') {
                        this.Timeouts[0] = setTimeout(() => {
                            this.$set(this.downShow, 13, 2)
                            this.$set(this.downShow, 15, 2)
                            this.Timeouts[1] = setTimeout(() => {
                                this.$set(this.last_dd, 0, 'static/img/female-bai.png')
                                this.Timeouts[2] = setTimeout(() => {
                                    this.$set(this.childrens, 0, '<img src="static/img/female-icon.png">白眼X<sup class="small">w</sup>X<sup class="small">w</sup>')
                                }, 100)
                            }, 200)

                        }, 500)

                        this.Timeouts[3] = setTimeout(() => {
                            this.$set(this.downShow, 14, 2)
                            this.$set(this.downShow, 16, 1)
                            this.Timeouts[4] = setTimeout(() => {
                                this.$set(this.last_dd, 2, 'static/img/male-bai.png')
                                this.Timeouts[5] = setTimeout(() => {
                                    this.$set(this.childrens, 2, '<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                                }, 100)
                            }, 200)
                        }, 1300)

                        // this.Timeouts[6]= setTimeout(()=>{
                        //   this.$set(this.downShow,9,2)
                        //   this.$set(this.downShow,10,1)
                        //   this.Timeouts[7]= setTimeout(()=>{
                        //     this.$set(this.last_dd,2, 'static/img/male-bai.png')
                        //     this.Timeouts[8]= setTimeout(()=>{
                        //       this.$set(this.childrens,2,'<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                        //     },100)
                        //
                        //   },200)
                        // },2100)
                        //
                        // this.Timeouts[9]= setTimeout(()=>{
                        //   this.$set(this.downShow,11,2)
                        //   this.$set(this.downShow,12,1)
                        //   this.Timeouts[10]=setTimeout(()=>{
                        //     this.$set(this.last_dd,3, 'static/img/male-bai.png')
                        //     this.Timeouts[11]=setTimeout(()=>{
                        //       this.$set(this.childrens,3,'<img src="static/img/male-icon.png">白眼X<sup class="small">w</sup>Y')
                        //     },100)
                        //   },200)
                        // },2900)
                    }
                }
            }

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

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    canvas {
        outline: none;
    }

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

    html, body, #app {
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

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    /*ui*/
    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    /*内容区*/
    .container {
        width: calc(100% - 280px);
        float: left;
        height: 100%;
    }

    .container h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }

    .app_aside {
        float: left;
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
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

    .btn_space .UI-btn {
        margin-bottom: 15px;
        line-height: 35px;
    }

    .btn_space .UI-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
        color: #CE4645;
    }

    sup.small {
        color: #FFD700;
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
        align-items: flex-end;
    }

    .ViewSpace dl dd .img {
        display: inline-block;
        width: 117px;
        height: 106px;
    }

    .ViewSpace dl dd:last-child .img {
        margin-right: 10px;
    }

    .ViewSpace dl dd:last-child .img:nth-child(2) {
        margin-right: 33px;
    }

    .ViewSpace dl dd:last-child .img:last-child {
        margin-right: 0;
    }

    .ViewSpace dl dd:first-child img:nth-child(2) {
        margin-right: 25px;
    }

    .ViewSpace dl dd:first-child img:nth-child(3) {
        margin-left: 25px;
    }

    .ViewSpace dl dd .icon {
        display: inline-block;
        width: 45px;
        height: 45px;
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
        transition: all 0.5s;
    }

    .ViewSpace ol li:last-child img {
        width: 400px;
    }

    .ViewSpace .result_btn {
        position: absolute;
        right: 0;
        bottom: 20px;
        width: calc(100% - 94px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ViewSpace .result_btn .UI-btn {
        margin-right: 12px;
        word-break: keep-all;
        white-space: nowrap;
        transition: all 0.5s;
        width: 130px;
        line-height: 36px;
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
        transition: all 2s;
    }

    .itemlist-enter,
    .itemlist-leave-active {
        opacity: 0;
    }

    .justifyContent {
        justify-content: center;
    }
</style>
