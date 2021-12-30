<template>
	<view>
		<nav-home title="从机列表及最新参数" @rightClick="rightClick()"></nav-home>
		<view class="device-form">
			<span>从机列表</span>
			<u-cell-group :border="false">
				<u-cell @click="gotoMachineList(item.slaveId)" v-for="(item, index) in slaveList" :border="true" :title="item.slaveName" isLink></u-cell>
			</u-cell-group>
		</view>
		<view class="device-form">
			<span>相关参数及最新数据</span>
			<u-loadmore class="matop" v-show="show" status="loading" />
			<table frame="box" cellspacing="0" border="1" width="100%" v-show="parameterList.length > 0">
			  	<tr>
			  	  <th>参数名称</th>
			  	  <th>参数数值</th>
			  		<th>参数更新日期</th>
			  	</tr>
					<template v-for="(item, index) in parameterList">
			  	<tr>
			  	  <td v-text="item.parameterName"></td>
			  	  <td v-text="item.valueNum"></td>
						<td v-text="item.valueDate"></td>
			  	</tr>
			  </template>
			</table>
			<u-empty class="matop" v-show="parameterList.length === 0" text="该设备没有相关参数信息"></u-empty>
		</view>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			id: 4,
			slaveList: {},
			parameterList: {},
			show: true
		};
	},
	components: {
		NavHome
	},
	onLoad(option) {
		this.id = option.id
		this.getSlaveList()
		this.getParameterList()
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
		getParameterList() {
			this.$sendRequest({
				url: `selectDeviceNewData/${this.id}`,
				success: res => {
					this.parameterList = res.data.data
					this.show = false
				}
			})
		},
		gotoMachineList(id) {
			uni.navigateTo({
				url: `/pages/terminal/history?id=${id}`
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
		margin-bottom: 50rpx;
	}
	span{
		display: block;
		margin-bottom: 30rpx;
	}
	table{
		border-collapse: collapse;
		border: 1px solid #DCDCDC;
		text-align: center;
	}
	th, td{
		border: 1px solid #DCDCDC;
		height: 80rpx;
	}
	.matop{
		padding-top: 300rpx;
	}
</style>
