<template>
	<view>
		<view>
			<span>历史访问次数：</span>
			<u-count-to :startVal="1" :endVal="history"></u-count-to>
		</view>
		<view class="history-time">
			<span>最后一次访问时间：</span>
			<span>{{time}}</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: '',
				history: ''
			}
		},
		onLoad(option) {
			this.time = option.time
			this.history = option.times
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.history-time{
	margin-top: 20rpx;
}
</style>
