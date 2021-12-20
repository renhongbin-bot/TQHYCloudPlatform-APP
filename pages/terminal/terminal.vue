<template>
	<view>
		<view class="empty">
			
		</view>
		<nav>
			<span class="nav" slot="terminal">数据终端</span>
		</nav>
		<u-tabs :list="list1" @click="click" lineWidth="50" lineColor="#fff" inactiveStyle="{ color: '#706266', fontSize: '10rpx' }"></u-tabs>
		<view v-if="index === 0"><iot></iot></view>
		<view v-else-if="index === 1"><alarm></alarm></view>
		<view v-else-if="index === 2"><camera-look></camera-look></view>
	</view>
</template>

<script>
import Iot from '@/components/terminal/Iot.vue';
import Alarm from '@/components/terminal/Alarm.vue';
import CameraLook from '@/components/terminal/CameraLook.vue'

import Nav from '@/components/nav/Nav.vue'
export default {
	data() {
		return {
			list1: [
				{
					name: 'IOT设备'
				},
				{
					name: '报警信息'
				},
				{
					name: '摄像头'
				}
			],
			index: 0
		};
	},
	components: {
		Iot,
		Alarm,
		CameraLook,
		Nav
	},
	methods: {
		click(item) {
			this.index = item.index
			console.log(this.index)
		}
	}
};
</script>

<style lang="scss" scoped>
	.empty{
		width: 100%;
		height: 56rpx;
		background-color:  rgba($color: #000000, $alpha: 0.5);
	}
	.nav{
		display: block;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: rgba($color: #000000, $alpha: 0.5);
		color: #222;
	}
</style>
