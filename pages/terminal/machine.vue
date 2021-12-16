<template>
	<view>
		<nav-home :title="title" ref="home" @rightClick="rightClick()"></nav-home>
		<u-cell-group class="device-form" :border="false">
			<u-cell @click="gotoHistory(item)" v-for="(item, index) in parameterList" :border="true" :title="item.parameterName" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
	export default {
		data() {
			return {
				slaveId: 0,
				parameterList: {},
				title: '从机参数'
			}
		},
		components: {
			NavHome
		},
		onLoad(option) {
			this.slaveId = option.id
			this.getParameterList()
		},
		methods: {
			getParameterList() {
				this.$sendRequest({
					url: `slaveDeviceList/slaveParameterList/${this.slaveId}`,
					success: res => {
						this.parameterList = res.data.data
					}
				})
			},
			gotoHistory(item) {
				uni.navigateTo({
					url: `/pages/terminal/history?id=${item.parameterId}&parameterName=${item.parameterName}`
				})
			},
			rightClick() {
				uni.switchTab({
					url: '/pages/terminal/terminal'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.device-form{
	width: 92%;
	padding-left: 4%;
	padding-top: 5%;
}
.u-nav-slot{
		display: flex;
		text-align: center;
		border: 1px solid #ccc;
		height: 60rpx;
		width: 150rpx;
		align-items: center;
		justify-content: center;
		border-radius: 30rpx;
	}
</style>
