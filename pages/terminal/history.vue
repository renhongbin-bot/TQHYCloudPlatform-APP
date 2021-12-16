<template>
	<view>
		<nav-home :title="machineName" @rightClick="rightClick()"></nav-home>
		<day-history :machineId="machineId"></day-history>
		<month-history :machineId="machineId"></month-history>
		<year-history :machineId="machineId"></year-history>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue'
import DayHistory from '../../components/ucharts/DayHistory.vue';
import MonthHistory from '../../components/ucharts/MonthHistory.vue';
import YearHistory from '../../components/ucharts/YearHistory.vue';
export default {
	data() {
		return {
			machineId: 0,
			machineName: '',
		};
	},
	components: {
		DayHistory,
		MonthHistory,
		YearHistory,
		NavHome
	},
	onLoad(option) {
		this.machineId = option.id;
		this.machineName = option.parameterName;
	},
	methods: {
		rightClick() {
			uni.switchTab({
				url: '/pages/terminal/terminal'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.u-nav-slot{
		display: flex;
		text-align: center;
		border: 1px solid #ddd;
		height: 60rpx;
		width: 150rpx;
		align-items: center;
		justify-content: center;
		border-radius: 30rpx;
	}
</style>
