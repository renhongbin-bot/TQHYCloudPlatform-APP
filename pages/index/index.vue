<template>
	<view class="content">
		<view class="content-herder">
			<view class="span-wather">
				<i class="iconfont v-icon-duoyun"></i>
				<span class="span">{{ weatherlist.tem }}</span>
				<span>℃</span>
			</view>
			<view class="span-humidity">
				<i class="iconfont v-icon-shidujiance_1"></i>
				<span class="span">{{ weatherlist.humidity }}</span>
				<i class="iconfont v-icon-daqiya"></i>
				<span class="span">{{ weatherlist.pressure }}</span>
				<span>Kap</span>
			</view>
		</view>
		<view class="content-body"></view>
		<view class="tag">
			<u-row class="row-one" customStyle="margin-top: 10px">
				<u-col span="6">
					<view class="demo-layout bg-purple-light">
						<span class="number">0</span>
						<p>今日报警</p>
					</view>
				</u-col>
				<u-col span="6">
					<view class="demo-layout bg-purple">
						<span class="number">{{ loginUser.userLoginTimes }}</span>
						<p>历史访问</p>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="tag">
			<u-row class="row-one" customStyle="margin-top: 10px">
				<u-col span="6">
					<view class="demo-layout bg-purple-light">
						<span class="number">{{ count }}</span>
						<p>现有设备</p>
					</view>
				</u-col>
				<u-col span="6">
					<view class="demo-layout bg-purple">
						<span class="number">{{ clientCount }}</span>
						<p>现有客户</p>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-line></u-line>
		<view class="alarn-Info">
			<p class="alarn-font">报警信息</p>
			<u-empty text="今日无报警信息"></u-empty>
		</view>
		<u-line></u-line>
		<view class="server">
			<p class="alarn-font">服务器状态</p>
			<server></server>
		</view>
	</view>
</template>

<script>
import Server from '../../components/ucharts/Server.vue';
export default {
	data() {
		return {
			// 获取天气
			weatherlist: {},
			// 获取任务
			tasklist: {},
			// 显示任务详情
			editForm: {},
			// 获取用户
			loginUser: {},
			// 获取设备数量
			count: 0,
			// 获取客户数量
			clientCount: 0,
			taskId: 0,
			options2: [
				{
					text: '查看',
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
			]
		};
	},
	components: {
		Server: Server
	},
	onShow() {
		this.getWather();
		this.getLoginUser();
		this.getdeviceList();
		this.getClient();
	},
	methods: {
		getWather() {
			this.$sendRequest({
				url: 'weather',
				method: 'POST',
				success: res => {
					this.weatherlist = res.data;
					console.log(this.weatherlist);
				},
				fail: fa => {
					console.log(fa);
				}
			});
		},
		getLoginUser() {
			this.loginUser = uni.getStorageSync('loginUser');
			console.log(this.loginUser);
		},
		getdeviceList() {
			this.$sendRequest({
				url: 'deviceModel',
				method: 'GET',
				success: res => {
					this.count = res.data.count;
				}
			});
		},
		getClient() {
			this.$sendRequest({
				url: 'showUserGroup',
				success: res => {
					const userChild = res.data.data;
					const childArr = [];
					for (let i = 0; i < userChild.length; i++) {
						if (userChild[i].userLimit === '3') {
							childArr.push(userChild[i].userLimit);
						}
					}
					this.clientCount = childArr.length;
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
span {
	color: #fff;
}
.iconfont {
	color: #fff;
	font-size: $uni-font-size-sm * 1.5;
}
p {
	color: #cccccc;
}
.content-herder {
	width: 100%;
	height: 300rpx;
	background-color: rgba($color: #000000, $alpha: .5);
	.span-wather {
		float: right;
		margin-top: 60rpx;
		margin-right: 100rpx;
		.v-icon-duoyun {
			font-size: $uni-font-size-sm * 3;
		}
		.span {
			font-size: $uni-font-size-sm * 3;
		}
	}
	.span-humidity {
		position: relative;
		top: 230rpx;
		left: $uni-spacing-row-sm * 15;
		.span {
			font-size: $uni-font-size-lg * 2;
			display: inline-block;
		}
		.iconfont {
			margin-right: $uni-spacing-row-sm;
		}
		.v-icon-shidujiance_1 {
		}
		.v-icon-daqiya {
			margin-left: $uni-spacing-row-sm * 15;
		}
	}
}
.content-body {
	width: 100%;
	height: 200rpx;
	background-color: rgba($color: #000000, $alpha: .5);
	border-bottom-left-radius: 375rpx;
	border-bottom-right-radius: 375rpx;
}
.u-tag {
	height: 250rpx;
}
.tag {
	width: 90%;
	margin-left: 7.5%;
	position: relative;
	top: -150rpx;
	.demo-layout {
		text-align: center;
		.number {
			font-size: $uni-font-size-sm * 3;
			display: inline-block;
			margin-top: $uni-spacing-col-sm * 4;
		}
	}
	.bg-purple-light {
		width: 250rpx;
		margin-left: $uni-spacing-row-sm * 5;
		height: 250rpx;
		border-radius: $uni-border-radius-sm * 2;
		background-color: $uni-second;
	}
	.bg-purple {
		width: 250rpx;
		height: 250rpx;
		border-radius: $uni-border-radius-sm * 2;
		background-color: $uni-second;
	}
}
.alarn-Info {
	margin-top: $uni-spacing-col-sm * 4;
	margin-bottom: $uni-spacing-col-sm * 4;
}
.alarn-font {
	color: #111;
	font-weight: 700;
	padding-left: 5%;
}
.server {
	margin-top: $uni-spacing-col-sm * 4;
	margin-bottom: $uni-spacing-col-sm * 4;
}
.task-list {
	margin-top: $uni-spacing-col-sm * 4;
}
.u-page {
	padding: 0;
}

.u-demo-block__title {
	padding: 10px 0 2px 15px;
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
	width: 80%;
	text-align: center;
	padding-left: $uni-spacing-row-sm * 5;
}
</style>
