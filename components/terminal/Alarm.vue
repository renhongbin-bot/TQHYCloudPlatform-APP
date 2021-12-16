<template>
	<view>
		<view><u-search class="search" placeholder="请输入报警信息" v-model="search" :showAction="false"></u-search></view>
		<view class="search checkbox">
			 <u-swipe-action>
			        <u-swipe-action-item v-for="(item, index) in tables" :index="index" :options="options3" :key="alarmList.warningId" @click="editAlarmList($event.index, item)">
			          <view class="swipe-action u-border-bottom">
			            <view class="swipe-action__content">
			              <text class="swipe-action__content__text">{{item.warningMessage}}</text>
			            </view>
			          </view>
			        </u-swipe-action-item>
			      </u-swipe-action>
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
			<u-modal
				confirmColor="#dd524d"
				cancelColor="#007aff"
				:show="deleteShow"
				confirmText="确认"
				cancelText="取消"
				showCancelButton
				content="是否确认删除该报警信息？"
				@confirm="deleteAlarm()"
				@cancel="deleteShow = false"
			></u-modal>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			options3: [
				{
					text: '详情',
					style: {
						backgroundColor: '#006699'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}
			],
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
		editAlarmList(index, item) {
			if(!index) {
				this.$sendRequest({
					url: `showUserWarningInfoById/${item.warningId}`,
					success: res => {
						this.editForm = res.data.data
						this.editForm['deviceName'] = item.device.deviceName
						this.show = true
					}
				})
			} else {
				this.deleteIds = this.deleteIds.push(item.warningId)
				console.log(this.deleteIds)
				this.deleteShow = true
			}
		},
		deleteAlarm() {
			this.$sendRequest({
				url: `deleteWarningMessageByIds/${this.deleteIds}`,
				success: res => {
					console.log(res.data.data)
				}
			})
			this.deleteShow = false
			uni.showToast({
				title: '删除成功'
			});
			setTimeout(() => {
				this.getAlarmList();
			}, 500);
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
