<template>
	<view>
		<view><u-search class="search" placeholder="请输入摄像头名称" v-model="search" :showAction="false"></u-search></view>
		<u-cell-group class="mar-top">
				<u-cell @click="gotoCameraVideo(item.webcamId)" v-for="(item,index) in tables" icon="camera-fill" :index="index" :title="item.webcamName" isLink  :value="item.deviceArea.deviceAreaName"></u-cell>
			</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: 'CameraLook',
		data() {
			return {
				cameraList: [],
				search: ''
			}
		},
		computed: {
			tables: {
				get() {
					const search = this.search;
					if (search) {
						return this.cameraList.filter(function(dataNews) {
							return Object.keys(dataNews).some(function(key) {
								return (
									String(dataNews[key])
										.toLowerCase()
										.indexOf(search) > -1
								);
							});
						});
					}
					return this.cameraList;
				},
				set(newValue) {
					return newValue;
				}
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
			gotoCameraVideo(webcamId) {
				uni.navigateTo({
					url: `/pages/terminal/cameraVideo?id=${webcamId}`
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
