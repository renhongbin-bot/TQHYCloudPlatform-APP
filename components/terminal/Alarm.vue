<template>
	<view>
		<view><u-search class="search" placeholder="请输入报警信息" v-model="search" :showAction="false"></u-search></view>
		<view class="search checkbox">
			 <view v-for="(item,index) in tables">
				<u--form>
					<u-form-item>
						<u-input
						    border="bottom"
						    v-model="item.warningMessage"
								disabled
								disabledColor="#fff"
						  >
							<template slot="suffix">
								<u-icon @click="editAlarmList(item)" name="eye" color="#555" size="28"></u-icon>
							</template>
							</u-input>
					</u-form-item>
				</u--form>
			 </view>
			<u-overlay :show="show" @click="show=false">
				<view class="warp">
					<u--form class="form-bgc" labelPosition="left" :model="editForm" ref="form1">
						<u-form-item labelWidth="150" label="报警Id:" borderBottom><u--text :text="editForm.warningId"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="报警设备:" borderBottom><u--text :text="editForm.deviceName"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="报警时间:" borderBottom><u--text :text="editForm.warningTime"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="报警信息:" borderBottom><u--text :text="editForm.warningMessage"></u--text></u-form-item>
						<u-form-item labelWidth="150" label="是否误报:" borderBottom>
							<u--text :text="editForm.warningStatus == 0 ? '否' : editForm.warningStatus == 1 ? '是' : ''"></u--text>
						</u-form-item>
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
			search: '',
			alarmList: [],
			editForm: {},
			deleteShow: false,
			show: false,
			deleteIds: [],
		}
	},
	computed: {
		tables: {
			get() {
				const search = this.search;
				if (search) {
					return this.alarmList.filter(function(dataNews) {
						return Object.keys(dataNews).some(function(key) {
							return (
								String(dataNews[key])
									.toLowerCase()
									.indexOf(search) > -1
							);
						});
					});
				}
				return this.alarmList;
			},
			set(newValue) {
				return newValue;
			}
		}
	},
	created() {
		this.getAlarmList();
	},
	methods: {
		getAlarmList() {
			this.$sendRequest({
				url: 'showUserWarningInfo',
				success: res => {
					this.alarmList = res.data.data;
					console.log(this.alarmList);
				}
			});
		},
		editAlarmList(item) {
				this.$sendRequest({
					url: `showUserWarningInfoById/${item.warningId}`,
					success: res => {
						this.editForm = res.data.data
						this.editForm['deviceName'] = item.device.deviceName
						this.show = true
					}
				})
			}
		}
	}
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
