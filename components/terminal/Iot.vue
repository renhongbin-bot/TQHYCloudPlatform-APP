<template>
	<view>
		<u-loading-page :loading="loading"></u-loading-page>
		<view><u-search class="search"  placeholder="请输入设备名称" v-model="search" :showAction="false"></u-search></view>
		<view class="search checkbox">
			<u-list
						@scrolltolower="scrolltolower"
					>
						<u-list-item
							v-for="(item, index) in tables"
							:key="index"
						>
							<u-cell
								:title="item.deviceName"
								@click="gotoEditIOT(item)"
							>
							</u-cell>
						</u-list-item>
					</u-list>
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
			deviceAreaName: '',
			userName: '',
			search: '',
			loading: false
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
		gotoEditIOT(item) {
			this.loading = true
			setTimeout(() => {
				uni.navigateTo({
					url: `../../pages/terminal/EditTerminal?
					deviceId=${item.deviceId}
					&deviceState=${item.deviceState}
					&deviceAreaName=${item.deviceAreaList[0].deviceAreaName}
					&deviceCid=${item.deviceCid}
					&userName=${item.userList[0].userName}`
				})
				this.loading = false
			}, 500)
		},
		scrolltolower() {
			this.getIotList()
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
</style>
