<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<view class="mar">
			<span>历史访问次数：</span>
			<u-count-to :startVal="1" :endVal="history"></u-count-to>
		</view>
		<view class="mar">
			<span>最后一次访问时间：</span>
			<span>{{time}}</span>
		</view>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
	export default {
		data() {
			return {
				time: '',
				history: '',
				title: '系统日志'
			}
		},
		components: {
			NavHome
		},
		onLoad(option) {
			this.time = option.time
			this.history = option.times
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/user/user'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mar{
	width: 92%;
	margin-left: 4%;
	margin-top: 20rpx;
}
</style>
