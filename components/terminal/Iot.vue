<template>
	<view>
		<u-loading-page :loading="loading"></u-loading-page>
		<view><u-search class="search" placeholder="请输入设备名称" v-model="search" :showAction="false"></u-search></view>
		<view class="search checkbox">
			<u-swipe-action>
				<u-swipe-action-item v-for="(item, index) in tables" :index="index" :key="item.deviceId" :options="options2" @click="editIotList($event.index, item)">
					<view class="swipe-action u-border-bottom">
						<view class="swipe-action__content">
							<text class="swipe-action__content__text">{{ item.deviceName }}</text>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
			<u-overlay :show="show" @click="show = false">
				<view class="warp">
					<u--form class="form-bgc" labelPosition="left" :model="deviceList" ref="form1">
						<u-form-item labelWidth="150" label="设备Id:" borderBottom><u--text :text="deviceList.deviceId"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="设备名称:" borderBottom><u--text :text="deviceList.deviceName"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="设备从属区域:" borderBottom><u--text :text="deviceList.deviceAreaName"></u--text></u--input></u-form-item>
						<u-form-item labelWidth="150" label="设备状态:" borderBottom>
							<u--text :text="deviceList.deviceState == 0 ? '下线' : deviceList.deviceState == 1 ? '上线' : ''"></u--text>
						</u-form-item>
						<u-form-item labelWidth="150" label="设备从属人:" borderBottom><u--text :text="deviceList.userName"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="设备通信Id:" borderBottom><u--text :text="deviceList.deviceCid"></u--text></u-form-item>
					</u--form>
				</view>
			</u-overlay>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			iotValue: ['苹果'],
			// 基本案列数据
			iotList: [],
			deviceList: {},
			deviceAreaName: '',
			userName: '',
			search: '',
			loading: false,
			show: false,
			swiperShow: true,
			options2: [
				{
					text: '详情',
					style: {
						backgroundColor: '#006699'
					}
				},
				{
					text: '参数',
					style: {
						backgroundColor: '#f56c6c'
					}
				}
			]
		};
	},
	computed: {
		tables: {
			get() {
				const search = this.search;
				if (search) {
					return this.iotList.filter(function(dataNews) {
						return Object.keys(dataNews).some(function(key) {
							return (
								String(dataNews[key])
									.toLowerCase()
									.indexOf(search) > -1
							);
						});
					});
				}
				return this.iotList;
			},
			set(newValue) {
				return newValue;
			}
		}
	},
	created() {
		this.getIotList();
	},
	methods: {
		getIotList() {
			this.$sendRequest({
				url: 'deviceModel',
				methods: 'GET',
				success: res => {
					this.iotList = res.data.data;
					console.log(this.iotList);
				}
			});
		},
		editIotList(index, item) {
			console.log(item)
			if (!index) {
				this.$sendRequest({
					url: `selectDeviceById/${item.deviceId}`,
					methods: 'GET',
					success: res => {
						this.deviceList = res.data.data
						this.deviceList['deviceAreaName'] = item.deviceAreaList[0].deviceAreaName
						this.deviceList['userName'] = item.userList[0].userName
						this.show = true
					}
				})
			} else {
				uni.navigateTo({
					url: `/pages/terminal/EditTerminal?id=${item.deviceId}`
				})
			}
		},
		scrolltolower() {
			this.getIotList();
		},
		checkboxChange(n) {
			this.deleteIdList = n;
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	width: 92%;
	padding-left: 4%;
}
.checkbox {
	padding-top: $uni-spacing-col-sm * 4;
}
.iot-list {
	height: 50rpx;
}
.swipe-action {
	&__content {
		padding: 25rpx 0;

		&__text {
			font-size: 15px;
			color: $u-main-color;
			padding-left: 30rpx;
		}
	}
}
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.form-bgc {
	background-color: #fff;
	width: 85%;
	text-align: center;
	padding-left: $uni-spacing-row-sm * 5;
}
</style>
