<template>
	<view>
		<nav-home :title="title" @rightClick="rightClick()"></nav-home>
		<video style="width: 100%;" :src="adress.webcamAddress" :controls="true" :autoplay="true"></video>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue';
export default {
	data() {
		return {
			title: '监控中心',
			webcamId: 0,
			adress: {}
		};
	},
	onLoad(option) {
		this.webcamId = option.id
		this.getCamera()
	},
	components: {
		NavHome
	},
	methods: {
		rightClick() {
			uni.switchTab({
				url: '/pages/terminal/terminal'
			});
		},
		getCamera() {
			this.$sendRequest({
				url: `showWebcamDetailForVue/${this.webcamId}`,
				success: res => {
					this.adress = res.data.data
					console.log(this.adress)
				}
			})
		}
	}
};
</script>

<style>
.video-js {
	width: 100%;
	height: 300rpx;
}
</style>
