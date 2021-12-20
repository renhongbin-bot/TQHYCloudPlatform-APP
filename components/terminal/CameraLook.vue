<template>
	<view>
		<u-cell-group class="mar-top">
				<u-cell @click="gotoCameraVideo(item.webcamAddress)" v-for="(item,index) in cameraList" icon="camera-fill" :index="index" :title="item.webcamName" isLink  :value="item.deviceArea.deviceAreaName"></u-cell>
			</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: 'CameraLook',
		data() {
			return {
				cameraList: []
			}
		},
		created() {
			this.getcameraList()
		},
		methods: {
			getcameraList() {
				this.$sendRequest({
					url: 'showWebcamInfoForVue',
					success: res => {
						console.log(res.data)
						this.cameraList = res.data.data
					}
				})
			},
			gotoCameraVideo(camId) {
				uni.navigateTo({
					url: `/pages/terminal/cameraVideo?camId=${camId}`
				})
			}
		}
	}
</script>

<style>
.mar-top{
	padding-top: 50rpx;
}
</style>
