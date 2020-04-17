<template>
	<div id="mianApp" class="noselect">
		<div class="menu" @click="sildeMenu(1)" ref="menu">
			<img src="static/img/menu.png">
		</div>
		<div class="container" ref="container" @click="sildeMenu(2)" id="test">
			<slot></slot>
		</div>
		<div class="app_aside" ref="sides" :class="ismob?'mobleRightColor':'normalRightColor'">
			<ui-btn type="reset1" id="buttom1" class="aside_reset" @click.native="resetWidget"></ui-btn>
			<div class='felx'>
				<div class="btn_space">
					<ui-slider v-model="value" :boxWidth="240" :boxHeight="108" :title="'放大镜倍数'" :piecewise="true" :piecewiseLabel="true" :dragable="true" :clickable="false" :tooltip="false" :speed="1" :noBlueProcess="false" :data="[5,10,15]"></ui-slider>
					<br/>
					<div class="date">
						<img src="static/img/date.png">
						<h1><b>{{ longNum }}</b></h1></div>
					<br/>
					<ui-btn btn type="switch" v-model="line">辅助线
					</ui-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* global $:true */
import Bus from '@/assets/js/Bus.js'
// import common from '@/assets/js/common.js';
import uiBtn from '@/components/UI/uiBtn';
import uiSlider from '@/components/UI/uiSlider';
export default {
	props: {},
	components: { uiBtn, uiSlider },
	data() {
		return {
			ismob: false,
			longNum: 6.3,
			value: 5,
			line: true
		}
	},
	created() {
		this.canSlide = false;
		this.isHidden = false;
	},
	watch: {
		value(v) {
			Bus.$emit('multiple', v)
		},
		line(v) {
			Bus.$emit('visebalLine', v)
		}
	},
	mounted() {
		this.resize();
		this.setSideStyle();
		this.getViewSize();
		this.listenSide();
		window.addEventListener('resize', () => {
			this.listenSide();
		});
		Bus.$on('msg', (e) => {
			this.sildeMenu(2)
		})
		Bus.$on('long', (e) => {
			this.longNum = e;
		})
		Bus.$on('canvasX', () => {
			this.setSideStyle();
			this.getViewSize();
		})
	},
	methods: {
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
			if (val === 1 && this.isHidden) {
				this.$refs.sides.style.right = '0';
				this.$refs.menu.style.top = '-45px';
			} else if (val === 2 && !this.isHidden) {
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
				if (w < h) {
					[w, h] = [h, w];
				}
				Bus.$emit('canvas', [w, h])
				this.ismob = true;
				if (w <= h) {
					this.ismobhen = true
				} else {
					this.ismobhen = false;
				}
			} else {
				if (w < h) {
					[w, h] = [h, w];
				}
				this.isHidden = false;
				this.canSlide = false;
				this.$refs.container.style.width = w - 280 + 'px';
				this.$refs.sides.style.right = '0';
				this.ismob = false;
				Bus.$emit('canvas', [w - 280, h])
			}
		},
		// 计算区块大小
		getViewSize() {
			const W = window.innerWidth - 280;
			const H = window.innerHeight - 72;
			if (W / H >= 744 / 505) {
				this.zoom = {
					zoom: (H / 505).toFixed(1)
				}
			} else {
				this.zoom = {
					zoom: (W / 744).toFixed(1)
				}
			}
		},
		// 窗口大小更改
		resize() {
			const vm = this;
			window.addEventListener('resize', function() {
				vm.setSideStyle();
				vm.getViewSize();
			})
		},
		resetWidget() {
			this.value = 5
			this.line = true
			$(`.ui-piecewise-dot`).css('background', '#f0f0f0');
			Bus.$emit('reset', 1)
		}

	}
}

</script>
<style scoped>
canvas {
	outline: none;
}

img {
	pointer-events: none;
}

#mianApp {
	width: 100%;
	height: 100%;
	overflow: hidden;
	font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
	background-color: #fff;
}

.date {
	width: 100%;
	height: 20px;
	padding-bottom: 20px;
	background-size: 100% 100%;
}

.date img {
	position: absolute;
	width: 240px;
	height: 20px;
}

.date h1 {
	position: absolute;
	right: 65px;
	font-size: 20px;
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

.menu {
	position: fixed;
	height: 48px;
	width: 48px;
	right: 24px;
	top: 24px;
	cursor: pointer;
	z-index: 10;
	transition: all 1s;
}

.menu img {
	position: absolute;
	width: 100%;
	height: 100%;
}

.container {
	width: calc(100% - 280px);
	float: left;
	height: 100%;
	position: absolute;
}

.app_aside {
	position: absolute;
	right: 0;
	top: 0;
	width: 280px;
	height: 100%;
	transition: all 1s;
	z-index: 20;
	align-items: center;
	justify-content: center;
}

.felx {
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	display: flex;
	z-index: -20;
}

.btn_space {
	padding: 20px;
	padding-top: 0px;
	width: 100%;
	height: 280px;
	clear: both;
	/*display: flex;*/
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	overflow-y: auto;
}

.insp-wrapper {
	width: 100%;
	height: 100%;
}

.aside_reset {
	margin: 20px 24px;
	float: right;
	z-index: 200;
}

</style>
