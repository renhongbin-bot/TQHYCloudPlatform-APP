<template>
	<view>
		<u--form class="device-form" labelPosition="left" :model="deviceList" ref="form1">
			<u-form-item labelWidth="150" label="设备Id:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.deviceId" border="none"></u--input></u-form-item>
			<u-form-item labelWidth="150" label="设备名称:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.deviceName" border="none"></u--input></u-form-item>
			<u-form-item labelWidth="150" label="设备从属区域:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.deviceAreaName" border="none"></u--input></u-form-item>
			<u-form-item labelWidth="150" label="设备状态:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.deviceState" border="none"></u--input></u-form-item>
			<u-form-item labelWidth="150" label="设备从属人:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.userName" border="none"></u--input></u-form-item>
			<u-form-item labelWidth="150" label="设备通信Id:" prop="userName" borderBottom ref="item1"><u--input v-model="deviceList.deviceCid" border="none"></u--input></u-form-item>
		</u--form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			optionList: {},
			deviceList: {}
		};
	},
	onLoad(option) {
		this.optionList = option;
		this.getEditList();
	},
	methods: {
		getEditList() {
			this.$sendRequest({
				url: `selectDeviceById/${this.optionList.deviceId}`,
				methods: 'GET',
				success: res => {
					// 将两个对象合并至一个对象
					this.deviceList = Object.assign(this.optionList, res.data.data);
					console.log(this.deviceList);
				}
			});
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
