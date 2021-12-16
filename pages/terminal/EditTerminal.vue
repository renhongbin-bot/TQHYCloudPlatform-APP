<template>
	<view>
		<nav-home :title="title" @rightClick="rightClick()"></nav-home>
		<view class="device-form">
			<u-cell-group :border="false">
				<u-cell @click="gotoMachineList(item.slaveId)" v-for="(item, index) in slaveList" :border="true" :title="item.slaveName" isLink></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			id: 4,
			deviceList: {},
			slaveList: {},
			title: '从机列表'
		};
	},
	components: {
		NavHome
	},
	onLoad(option) {
		this.id = option.id
		this.getSlaveList()
	},
	methods: {
		getSlaveList() {
			this.$sendRequest({
				url: `slaveDeviceList/showSlaveMessage/${this.id}`,
				methods: 'GET',
				success: res => {
					console.log(res.data.data)
					this.slaveList = res.data.data
				}
			})
		},
		gotoMachineList(id) {
			uni.navigateTo({
				url: `/pages/terminal/machine?id=${id}`
			})
		},
		rightClick() {
			uni.switchTab({
				url: '/pages/terminal/terminal'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.device-form{
		width: 92%;
		padding-left: 4%;
		padding-top: 5%;
	}
</style>
