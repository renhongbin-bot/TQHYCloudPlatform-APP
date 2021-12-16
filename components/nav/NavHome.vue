<template>
	<view>
		<view class="empty"></view>
		<u-navbar bgColor=rgba(0,0,0,.5) class="u-nav" :title="title" :safeAreaInsetTop="false">
			<view class="u-nav-slot" slot="left">
				<u-icon color="#222" class="u-icon" name="arrow-left" size="19" @click="leftClick()"></u-icon>
				<u-line direction="column" :hairline="false" color="#222" length="30" margin="0 8px"></u-line>
				<u-icon color="#222" name="home" size="20" @click="rightClick()"></u-icon>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: ['title'],
		data() {
			return {
			}
		},
		mounted() {
			
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				})
			},
			rightClick() {
				this.$emit('rightClick')
				this.$emit('userClick')
				this.$emit('developer')
			},
		}
	}
</script>

<style>
	.empty {
		height: 56rpx;
		background-color:  rgba(0,0,0,.5)
	}
	.u-nav-slot{
			display: flex;
			text-align: center;
			border: 1px solid #222;
			width: 150rpx;
			height: 60rpx;
			align-items: center;
			justify-content: center;
			border-radius: 30rpx;
		}
</style>
