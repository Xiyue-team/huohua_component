<template>
	<div class="aspectration bg_white root_div_container" data-ratio="16:9" oncontextmenu="return false" onselectstart="return false"
	 ondragstart="return false">
		<fullScreensLayout>
			<template slot="viewBox" slot-scope="viewBox">
				<div id="title" v-bind:style="{ color: activeColor}">
					普利斯特利光合作用实验探究
				</div>
				<div class="sky">
					<img src="./sub_static/assets/bg_sky.png" alt="" id="sky" v-bind:style="{opacity: skyopacity}" >
				</div>
				<div id="table" v-bind:style="{ backgroundColor: bgColor}">
				</div>
				<div id="glass">
					<img :src="fs_glass" alt="" >
					<img :src="bg_candel" alt="" id="bg_candel" v-bind:style="{opacity: candelopacity}" v-bind:class="{ mystyle: candelactive }">
					<img :src="bg_candel1" alt="" id="bg_candel1" v-bind:style="{opacity: candel1opacity}" v-bind:class="{ mystyle1: candelactive }">
					
					<img :src="bg_plant" alt="" id="bg_plant" v-bind:style="{opacity: plantopacity}" v-bind:class="{ mystyle: plantactive }">
					<img :src="bg_plant1" alt="" id="bg_plant1" v-bind:style="{opacity: plant1opacity}" v-bind:class="{ mystyle1: plant1active }">
					
					<img :src="bg_mouse" alt="" id="bg_mouse" v-bind:style="{opacity: mouseopacity}" v-bind:class="{ mystyle: mouseactive }">
					<img :src="bg_mouse1" alt="" id="bg_mouse1" v-bind:style="{opacity: mouse1opacity}" v-bind:class="{ mystyle1: mouse1active }">
				</div>
				<div id="options" v-bind:style="{ display: xianShi}">
					<div id="thing"><img src="./sub_static/assets/candel.png" alt="" @click="chooseobject(0,!active1)" :class="{active:active1}" id="candel" style = "cursor: pointer;">
						<img src="./sub_static/assets/point.png" alt="蜡烛" id="point1" v-show="active1"><br />蜡烛</div>

					<div id="thing1"><img src="./sub_static/assets/mouse.png" alt="" @click="chooseobject(1,!active2)" :class="{active:active2}" id="mouse" style = "cursor: pointer;">
						<img src="./sub_static/assets/point.png" alt="小鼠" id="point2" v-show="active2"><br />小鼠</div>

					<div id="thing2"><img src="./sub_static/assets/plant.png" alt="" @click="chooseobject(2,!active3)" :class="{active:active3}" id="plant" style = "cursor: pointer;">
						<img src="./sub_static/assets/point.png" alt="绿色植物" id="point3" v-show="active3"><br />绿色植物</div>
					<div id="determine" @click="Performanimation">确定</div>
				</div>
				<div id="stop" v-bind:style="{ pointerEvents: pointerEvents, opacity: stoppacity }">
					<div class="sunbtn" @click="changelight">
						<img :src="fs_sunbtn" alt="">
					</div>
					<div class="thingbtn" @click="addobject">
						<img src="./sub_static/assets/thing.png" alt="">
					</div>
				</div>
			</template>
			<template slot="controlPanel" slot-scope="controlPanel">
			</template>
		</fullScreensLayout>
	</div>
</template>
<script lang="ts">
	import '../../../../src/assets/css/core.css';
	import '../../../../src/assets/css/layout.css';
	import './sub_static/assets/css/plstl.css';
	import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
	import Component from 'vue-class-component';
	import {MainVueComponent} from './mainVueComponent.ts';

	@Component({ components: { fullScreensLayout, },
	})
	export default class App extends MainVueComponent {}
</script>
<style scoped="scoped">
	
</style>
