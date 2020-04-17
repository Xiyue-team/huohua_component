<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="main" ref="main">
                <div class="show">
                    <div class="textB" style="position: absolute;left:30px;top:50px;">亲代</div>
                    <div class="textB" v-show="switch_checked1" style="position: absolute;left:30px;top:164px;">配子</div>
                    <div class="textB" v-show="switch_checked2" style="position: absolute;left:30px;top:298px;">子代</div>
                    <div class="fm" style="width: 380px;height: 120px;margin-bottom: 5px;">
                        <div class="fm1" style="width: 140px;height: 120px;">
                            <img src="static/UI/k.png">
                        </div>
                        <div style="width: 100px;height: 120px;position: relative;">
                            <img src="static/UI/X.png" style="width: 33px;height: auto;position: absolute;top:43px;left: 33px;">
                        </div>
                        <div class="fm2" style="width: 140px;height: 120px;">
                            <img src="static/UI/k.png">
                        </div>
                    </div>
                    <div class="j1" style="width:304px;height: 35px;opacity: 0;">
                        <div style="float: left;width: 62px;height: 29px;">
                            <img class="dj1" src="static/UI/dj.png">
                        </div>
                        <div style="float:right;width: 62px;height: 29px;">
                            <img class="dj2" src="static/UI/zj.png">
                        </div>
                    </div>
                    <div class="z1"  style="width: 380px;height: 38px;margin-bottom: 5px;opacity: 0;">
                        <div style="width: 140px;height: 38px;" class="Fz">
                            <img class="Fz1" src="static/UI/1.png" style="width: 38px;float: left;">
                            <img class="Fzz" src="static/UI/1.png" style="width: 38px;float: left;margin: 0 13px;">
                            <img class="Fz2" src="static/UI/1.png" style="width: 38px;float: right;">
                        </div>
                        <div style="width: 100px;height: 38px;"></div>
                        <div style="width: 140px;height: 38px;" class="Mz">
                            <img class="Mz1" src="static/UI/1.png" style="width: 38px;float: left;">
                            <img class="Mzz" src="static/UI/1.png" style="width: 38px;float: left;margin: 0 13px;">
                            <img class="Mz2" src="static/UI/1.png" style="width: 38px;float: right;">
                        </div>
                    </div>
                    <div class="j2" style="width: 490px;height: 60px;">
                        <div class="j21">
                            <img src="static/UI/j1.png" style="height: 60px;width: 490px">
                        </div>
                        <div class="j22">
                            <img src="static/UI/j2.png" style="height: 60px;width: 490px">
                        </div>
                        <div class="j23">
                            <img src="static/UI/j3.png" style="height: 60px;width: 490px">
                        </div>
                        <div class="j24">
                            <img src="static/UI/j4.png" style="height: 60px;width: 490px">
                        </div>
                    </div>
                    <div class="z2" style="width: 620px;height: 120px;">
                        <div class="z21" style="width: 140px;height: 120px;margin-right: 20px;">
                            <img src="static/UI/11.png">
                        </div>
                        <div class="z22" style="width: 140px;height: 120px;margin-right: 20px;">
                            <img src="static/UI/11.png">
                        </div>
                        <div class="z23" style="width: 140px;height: 120px;margin-right: 20px;">
                            <img src="static/UI/11.png">
                        </div>
                        <div class="z24" style="width: 140px;height: 120px;">
                            <img src="static/UI/11.png">
                        </div>
                    </div>
                    <div class="z2" style="width: 380px;height: 120px;margin: auto;position:relative;">
                        <div class="z2a1" style="width: 140px;height: 120px;float: left;">
                            <img src="static/UI/11.png">
                        </div>
                        <div class="z2az" style="width: 140px;height: 120px;position:absolute;z-index:555;left:0;right:0;margin: auto;">
                            <img src="static/UI/11.png">
                        </div>
                        <div class="z2a2" style="width: 140px;height: 120px;float: right;">
                            <img src="static/UI/11.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space">
                <div>
                    <div class="B FB">
                        <h4>父本</h4>
                        <div @click="addB('F1',$event)">
                            <img src="static/UI/11.png">
                        </div>
                        <div @click="addB('F2',$event)">
                            <img src="static/UI/12.png">
                        </div>
                        <div @click="addB('F3',$event)">
                            <img src="static/UI/22.png">
                        </div>
                    </div>
                    <div class="B MB">
                        <h4>母本</h4>
                        <div @click="addB('M1',$event)">
                            <img src="static/UI/11.png">
                        </div>
                        <div @click="addB('M2',$event)">
                            <img src="static/UI/12.png">
                        </div>
                        <div @click="addB('M3',$event)">
                            <img src="static/UI/22.png">
                        </div>
                    </div>
                    <ui-btn type="switch" class="btn1" v-model="switch_checked1" v-show="flag1">
                        配子
                    </ui-btn>
                    <ui-btn type="switch" class="btn2" v-model="switch_checked2" v-show="flag2">
                        子代
                    </ui-btn>
                </div>
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
                title: '分离定律',
                switch_checked1:false,
                switch_checked2:false,
                flag1:false,
                flag2:false,
                addNum:0,
                addF:false,
                addM:false,
                c1:0,
                c2:0,
                c3:0,
                c4:0,
                animateNum:0
            }
        },
        created() {
            document.title = this.title;
        },
        watch:{
            switch_checked1(){
                var thiz=this;
                if(this.switch_checked1){
                    $('.btn1').css({'pointer-events':'none'});
                    $('.j1').animate({'opacity':'1'},1000,function () {
                        $('.z1').animate({'opacity':'1'},1000,function () {
                            thiz.flag1 = false;
                            thiz.flag2 = true;
                            $('.btn1').css({'pointer-events':'auto'});
                        })
                    })
                }
            },
            switch_checked2(){
                var thiz=this;
                if(this.switch_checked2){
                    if(this.animateNum==3){
                        $('.j21').animate({'opacity':'1'},500,function () {
                            $('.z21').animate({'opacity':'1'},500,function () {
                                $('.j22').animate({'opacity':'1'},500,function () {
                                    $('.z22').animate({'opacity':'1'},500,function () {
                                        $('.j23').animate({'opacity':'1'},500,function () {
                                            $('.z23').animate({'opacity':'1'},500,function () {
                                                $('.j24').animate({'opacity':'1'},500,function () {
                                                    $('.z24').animate({'opacity':'1'},500)
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }else if(this.animateNum==1){
                        $('.j21').animate({'opacity':'1'},500,function () {
                            $('.z2az').animate({'opacity':'1'},500)
                        })
                    }else if(this.animateNum==2){
                        $('.j21').animate({'opacity':'1'},500,function () {
                            $('.z2a1').animate({'opacity':'1'},500,function () {
                                $('.j22').animate({'opacity':'1'},500,function () {
                                    $('.z2a2').animate({'opacity':'1'},500)
                                })
                            })
                        })
                    }

                }else{
                    $('div').stop();
                    $('.j2>div,.z2>div').css('opacity', '0');
                }
            }
        },
        methods: {
            setSideStyle() {
                const el = document.getElementById('btn_space');
                if (el &&  el.offsetHeight < 460) {
                    $(el).children('div').css('margin-top','0');
                } else {
                    $(el).children('div').css('margin-top',(el.offsetHeight-500)/2+'px');
                }
                var H=window.innerHeight-72;
                var W=window.innerWidth-280;
                var zoom=1;
                if(W/H>740/412){
                    zoom=H/412;
                }else{
                    zoom=W/740;
                }
                $('.show').css('zoom',zoom);
            },
            addB(style,e){
                if(this.addNum==2){
                    return;
                }
                switch (style){
                    case 'F1':
                        if(this.addF){
                            return;
                        }
                        this.addF = true;
                        $('.fm1 img').attr('src','static/UI/11x.png');
                        this.c1=1;
                        this.c2=1;
                        $('.Fz1').attr('src','static/UI/1.png').css('opacity','0');
                        $('.Fz2').attr('src','static/UI/1.png').css('opacity','0');
                        $('.Fzz').attr('src','static/UI/1.png').css('opacity','1');
                        $('.dj1').attr('src','static/UI/zj.png');
                        break;
                    case 'F2':
                        if(this.addF){
                            return;
                        }
                        this.addF = true;
                        $('.fm1 img').attr('src','static/UI/12x.png');
                        this.c1=1;
                        this.c2=2;
                        $('.Fz1').attr('src','static/UI/1.png').css('opacity','1');
                        $('.Fz2').attr('src','static/UI/2.png').css('opacity','1');
                        $('.Fzz').attr('src','static/UI/1.png').css('opacity','0');
                        $('.dj1').attr('src','static/UI/dj.png');
                        break;
                    case 'F3':
                        if(this.addF){
                            return;
                        }
                        this.addF = true;
                        $('.fm1 img').attr('src','static/UI/22x.png');
                        $('.Fz1').attr('src','static/UI/2.png').css('opacity','0');
                        $('.Fz2').attr('src','static/UI/2.png').css('opacity','0');
                        $('.Fzz').attr('src','static/UI/2.png').css('opacity','1');
                        $('.dj1').attr('src','static/UI/zj.png');
                        this.c1=2;
                        this.c2=2;
                        break;
                    case 'M1':
                        if(this.addM){
                            return;
                        }
                        this.addM = true;
                        $('.fm2 img').attr('src','static/UI/11x.png');
                        this.c3=1;
                        this.c4=1;
                        $('.Mz1').attr('src','static/UI/1.png').css('opacity','0');
                        $('.Mz2').attr('src','static/UI/1.png').css('opacity','0');
                        $('.Mzz').attr('src','static/UI/1.png').css('opacity','1');
                        $('.dj2').attr('src','static/UI/zj.png');
                        break;
                    case 'M2':
                        if(this.addM){
                            return;
                        }
                        this.addM = true;
                        $('.fm2 img').attr('src','static/UI/12x.png');
                        this.c3=1;
                        this.c4=2;
                        $('.Mz1').attr('src','static/UI/1.png').css('opacity','1');
                        $('.Mz2').attr('src','static/UI/2.png').css('opacity','1');
                        $('.Mzz').attr('src','static/UI/1.png').css('opacity','0');
                        $('.dj2').attr('src','static/UI/dj.png');
                        break;
                    case 'M3':
                        if(this.addM){
                            return;
                        }
                        this.addM = true;
                        $('.fm2 img').attr('src','static/UI/22x.png');
                        this.c3=2;
                        this.c4=2;
                        $('.Mz1').attr('src','static/UI/2.png').css('opacity','0');
                        $('.Mz2').attr('src','static/UI/2.png').css('opacity','0');
                        $('.Mzz').attr('src','static/UI/2.png').css('opacity','1');
                        $('.dj2').attr('src','static/UI/zj.png');
                        break;
                }
                var el=e.target;
                $(el).parent().siblings('div').css({'opacity':'0.35','pointer-events':'none'});
                this.addNum++;
                if(this.addNum==2){
                    this.flag1=true;
                    if(this.c1==this.c2&&this.c3==this.c4){
                        this.animateNum=1;
                        $('.z2').eq(0).hide();
                        $('.z2').eq(1).show();
                        $('.z2a1').hide();
                        $('.z2a2').hide();
                        $('.z2az').show();
                        $('.j21 img').attr('src','static/UI/c.png');
                        $('.j22').hide();
                        $('.j23').hide();
                        $('.j24').hide();
                        if(this.c1<=this.c3){
                            $('.z2az img').attr('src','static/UI/'+this.c1+''+this.c3+'.png');
                        }else{
                            $('.z2az img').attr('src','static/UI/'+this.c3+''+this.c1+'.png');
                        }
                    }else if(this.c1!=this.c2&&this.c3!=this.c4){
                        this.animateNum=3;
                        $('.z2').eq(1).hide();
                        $('.z2').eq(0).show();
                        $('.j21 img').attr('src','static/UI/j1.png');
                        $('.j22').show().children('img').attr('src','static/UI/j2.png');
                        $('.j23').show().children('img').attr('src','static/UI/j3.png');
                        $('.j24').show().children('img').attr('src','static/UI/j4.png');
                        if(this.c1<=this.c3){
                            $('.z21 img').attr('src','static/UI/'+this.c1+''+this.c3+'.png');
                        }else{
                            $('.z21 img').attr('src','static/UI/'+this.c3+''+this.c1+'.png');
                        }
                        if(this.c1<=this.c4){
                            $('.z22 img').attr('src','static/UI/'+this.c1+''+this.c4+'.png');
                        }else{
                            $('.z22 img').attr('src','static/UI/'+this.c4+''+this.c1+'.png');
                        }
                        if(this.c2<=this.c3){
                            $('.z23 img').attr('src','static/UI/'+this.c2+''+this.c3+'.png');
                        }else{
                            $('.z23 img').attr('src','static/UI/'+this.c3+''+this.c2+'.png');
                        }
                        if(this.c2<=this.c4){
                            $('.z24 img').attr('src','static/UI/'+this.c2+''+this.c4+'.png');
                        }else{
                            $('.z24 img').attr('src','static/UI/'+this.c4+''+this.c2+'.png');
                        }
                    }else{
                        this.animateNum=2;
                        $('.z2').eq(0).hide();
                        $('.z2').eq(1).show();
                        $('.z2a1').show();
                        $('.z2a2').show();
                        $('.z2az').hide();
                        $('.j22').show();
                        $('.j23').hide();
                        $('.j24').hide();
                        if(this.c1==this.c2){
                            $('.j21 img').attr('src','static/UI/l2.png');
                            $('.j22 img').attr('src','static/UI/r2.png');
                            if(this.c1<=this.c3){
                                $('.z2a1 img').attr('src','static/UI/'+this.c1+''+this.c3+'.png');
                            }else{
                                $('.z2a1 img').attr('src','static/UI/'+this.c3+''+this.c1+'.png');
                            }
                            if(this.c1<=this.c4){
                                $('.z2a2 img').attr('src','static/UI/'+this.c1+''+this.c4+'.png');
                            }else{
                                $('.z2a2 img').attr('src','static/UI/'+this.c4+''+this.c1+'.png');
                            }
                        }else{
                            $('.j21 img').attr('src','static/UI/2l.png');
                            $('.j22 img').attr('src','static/UI/2r.png');
                            if(this.c1<=this.c3){
                                $('.z2a1 img').attr('src','static/UI/'+this.c1+''+this.c3+'.png');
                            }else{
                                $('.z2a1 img').attr('src','static/UI/'+this.c3+''+this.c1+'.png');
                            }
                            if(this.c2<=this.c3){
                                $('.z2a2 img').attr('src','static/UI/'+this.c2+''+this.c3+'.png');
                            }else{
                                $('.z2a2 img').attr('src','static/UI/'+this.c3+''+this.c2+'.png');
                            }
                        }
                    }
                }
            },
            //重置
            resetWidget() {
                this.switch_checked1=false;
                this.switch_checked2=false;
                this.flag1=false;
                this.flag2=false;
                this.addNum=0;
                this.addF=false;
                this.addM=false;
                $('.B div').css({'opacity':'1','pointer-events':'auto'});
                $('.fm1 img ,.fm2 img').attr('src','static/UI/k.png');
                $('div').stop();
                $('.j1,.z1,.j2>div,.z2>div').css('opacity', '0');
                $('.btn1').css({'pointer-events':'auto'});
            }
        },
        mounted() {
            this.setSideStyle();
            const vm = this;
            window.addEventListener('resize', function () {
                vm.setSideStyle();
            })
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
    .container .main{
        width: 100%;
        height: calc(100% - 72px);
        position: relative;
    }
    .container .show{
        width: 740px ;
        height:412px;
        padding: 0 20px 20px 100px;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        margin: auto;
    }
    .container .show div img{
        width: 100%;
        height: auto;
    }
    .container .show>div{
        margin: auto;
    }
    .container .show>div>div{
        float: left;
    }
    .j2>div{
        opacity: 0;
        position: absolute;
        background: transparent;
    }
    .z2>div{
        opacity: 0;
    }
    .app_aside {
        float: left;
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    .btn_space {
        padding: 20px;
        padding-right: 0;
        width: 100%;
        height: calc(100% - 80px);
        clear: both;
        /*display: flex;*/
        /*align-items: center;*/
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
        margin-top: 22px;
    }
    .btn_space>div{
        height: 460px;
    }
    .btn_space .B{
        width: 110px;
        height:395px;
        float: left;
    }
    .btn_space .B h4{
        text-align: center;
        font-weight: 400;
        font-size: 18px;
        height: 18px;
        margin-bottom: 16px;
        line-height: 18px;
    }
    .btn_space .FB{
        margin-right: 20px;
    }
    .btn_space .B>div{
        width:110px;
        height: 110px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .btn_space .B>div>img{
        width:110px;
        height:auto;
        border: 0;
    }
    .textB{
        font-size: 18px;
        color:#4d4d4d;
    }
</style>