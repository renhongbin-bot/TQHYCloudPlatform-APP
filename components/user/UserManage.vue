<template>
	<view>
		<u-cell-group  :border="false">
			<slot name="one"></slot>
			<slot name="two"></slot>
		</u-cell-group>
		<u-cell-group :border="false" class="deal">
			<u-cell :border="false" icon="calendar" title="交易记录" isLink></u-cell>
			<u-cell :border="false" icon="star" title="礼品兑换记录" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.u-cell-group {
	width: 95%;
	margin-left: 2.5%;
	margin-top: 20rpx;
	background-color: #eee;
}
.deal{
		margin-top: 60rpx;
	}
</style>
