<template>
	<view>
		<u-tabs :list="list1" @click="click" lineWidth="50" lineColor="#fff" inactiveStyle="{ color: '#706266', fontSize: '10rpx' }"></u-tabs>
		<view v-show="index === 0"><iot></iot></view>
		<view v-show="index === 1"><alarm></alarm></view>
	</view>
</template>

<script>
import Iot from '@/components/terminal/Iot.vue';
import Alarm from '@/components/terminal/Alarm.vue';
export default {
	data() {
		return {
			list1: [
				{
					name: 'IOT设备'
				},
				{
					name: '报警信息'
				}
			],
			index: 0
		};
	},
	components: {
		Iot,
		Alarm
	},
	methods: {
		click(item) {
			this.index = item.index
		}
	}
};
</script>

<style></style>
