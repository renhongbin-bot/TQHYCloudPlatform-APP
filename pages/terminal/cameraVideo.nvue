<template>
	<view>
		<nav-home :title="title" ref="home" @rightClick="rightClick()"></nav-home>
		<camera-video :camAdress="camAdress"></camera-video>
		
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
	import CameraVideo from '@/components/terminal/CameraVideo.nvue'
	export default {
		data() {
			return {
				title: '监控视频',
				// 视频流
				camAdress: ''
			}
		},
		onLoad(option){
			this.camAdress = option.camId
		},
		components:{
			NavHome,
			CameraVideo
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/terminal/terminal'
				})
			}
		}
	}
</script>

<style>

</style>
