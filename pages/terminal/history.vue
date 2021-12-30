<template>
	<view>
		<nav-home :title="machineName" @rightClick="rightClick()"></nav-home>
		<u-tabs :list="list" @click="click"></u-tabs>
		<day-history ref="day" :machineId="machineId"></day-history>
		<month-history ref="month"  :machineId="machineId"></month-history>
		<year-history ref="year" :machineId="machineId"></year-history>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue';
import DayHistory from '../../components/ucharts/DayHistory.vue';
import MonthHistory from '../../components/ucharts/MonthHistory.vue';
import YearHistory from '../../components/ucharts/YearHistory.vue';
export default {
	data() {
		return {
			machineId: 0,
			machineName: '',
			parameterList: [],
			list: [],
			slaveId: 0
		};
	},
	components: {
		DayHistory,
		MonthHistory,
		YearHistory,
		NavHome
	},
	onLoad(option) {
		this.slaveId = option.id;
		this.getParameterList();
	},
	methods: {
		rightClick() {
			uni.switchTab({
				url: '/pages/terminal/terminal'
			});
		},
		async getParameterList() {
			await this.$sendRequest({
				url: `slaveDeviceList/slaveParameterList/${this.slaveId}`,
				success: res => {
					this.parameterList = res.data.data;
					let nameKey = {
						parameterName: 'name'
					};
					this.parameterList.forEach(item => {
						let obj = item;
						for (let key in obj) {
							let newKey = nameKey[key];
							if (newKey) {
								obj[newKey] = obj[key];
								delete obj[key];
							}
						}
					});
					if(this.parameterList.length === 1 || 0) {
						this.machineId = this.parameterList[0].parameterId
						this.machineName = this.parameterList[0].name
						return
					} else {
						this.list = this.parameterList;
						console.log(this.list)
						this.machineId = this.parameterList[0].parameterId
						this.machineName = this.list[0].name
					}
				}
			});
		},
		click(item) {
			this.$refs['day'].id= item.parameterId
			this.$refs['month'].id= item.parameterId
			this.$refs['year'].id= item.parameterId
			this.machineName = item.name
			this.$refs['day'].getDayHistoryList()
			this.$refs['month'].getDayHistoryList()
			this.$refs['year'].getDayHistoryList()
		}
	}
};
</script>

<style lang="scss" scoped>
.u-nav-slot {
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
