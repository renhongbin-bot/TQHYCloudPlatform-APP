<template>
	<view class="_view">
		<view class="u-calendar-header">
			<u--image src="../../static/images/login.png" mode="scaleToFill" width="750rpx"></u--image>
			<view class="imgs"><u--image class="u_image" src="../../static/images/touxiang.png" mode="scaleToFill" height="200rpx" width="200rpx" shape="square"></u--image></view>
		</view>
		<view class="u-calendar-login">
			<u-tabs
				:list="list"
				sticky
				@click="click"
				lineWidth="80"
				lineColor="#007aff"
				:activeStyle="{
					color: '#007aff',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
			<view class="_login" v-show="index == 0 && isShow">
				<u--input class="phone-inp" placeholder="请输入手机号" prefixIcon="phone" prefixIconStyle="font-size: 44rpx;color: #007aff"></u--input>
				<u--input type="password" placeholder="请输入密码" suffixIcon="eye" prefixIcon="lock" prefixIconStyle="font-size: 44rpx;color: #007aff"></u--input>
				<view class="_login-remember">
					<u-checkbox-group class="_remenber" placement="column"><u-checkbox label="记住密码"></u-checkbox></u-checkbox-group>
					<u--text class="pwd" type="primary" text="忘记密码？"></u--text>
				</view>
				<u-button @click="gotoIndex" type="primary" shape="circle" text="登录"></u-button>
			</view>
			<view class="_register" v-show="index == 1">
				<u--input class="phone-inp" placeholder="请输入手机号" prefixIcon="phone" prefixIconStyle="font-size: 44rpx;color: #007aff"></u--input>
				<u--input class="phone-code" placeholder="请输入验证码" prefixIcon="info-circle" prefixIconStyle="font-size: 44rpx;color: #007aff"></u--input>
				<u-text type="primary" class="code-text" text="获取验证码"></u-text>
				<u--input
					class="pripwd mrg-bottom"
					type="password"
					placeholder="请输入密码"
					suffixIcon="eye"
					suffixIconStyle="font-size: 44rpx; color: #007aff"
					prefixIcon="lock"
					prefixIconStyle="font-size: 44rpx;color: #007aff"
				></u--input>
				<u-button type="primary" shape="circle" text="注册"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '登录'
				},
				{
					name: '注册'
				}
			],
			isShow: true,
			index: 0
		};
	},
	methods: {
		click(item) {
			this.index = item.index ? (this.isShow = !this.isShow) : (this.isShow = true);
			this.index = item.index;
		},
		gotoIndex() {
			// 跳转到tabar页面
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.imgs {
	position: relative;
	left: 50%;
	margin-left: -100rpx;
	top: -110rpx;
	width: 200rpx;
	height: 200rpx;
	text-align: center;
	background: #fff;
	border-radius: 32rpx;
	box-shadow: 2rpx 2rpx 2rpx #99ccff;
}
._login {
	margin-top: 40rpx;
	width: 95%;
	margin-left: 2.5%;
}
._register {
	margin-top: 40rpx;
	width: 95%;
	margin-left: 2.5%;
}
.phone-code {
	margin-bottom: 40rpx;
	width: 60%;
	float: left;
	margin-right: 80rpx;
}
.code-text {
	line-height: 37px;
	display: block;
}
.pripwd {
	width: 95%;
}
.phone-inp {
	margin-bottom: 40rpx;
}
._login-remember {
	margin-top: 40rpx;
	width: 105%;
	._remenber {
		display: block;
		width: 560rpx;
		float: left;
		margin-bottom: 50rpx;
	}
}
.mrg-bottom {
	margin-bottom: 60rpx;
}
</style>
