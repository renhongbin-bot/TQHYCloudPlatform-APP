<template>
	<view class="_user">
		<view class="empty">
			
		</view>
		<nav>
			<span slot="terminal" class="nav">
				用户中心
			</span>
		</nav>
		<view class="_user-image">
			<u--image class="text-bck" src="../../static/images/text-bck.png" mode="scaleToFill" width="720rpx"></u--image>
			<view class="u_image">
				<u--image src="../../static/images/touxiang.png" mode="scaleToFill" height="200rpx" width="200rpx" shape="square"></u--image>
				<view>
					<text class="text_root">{{loginUser.userName}}</text>
				</view>
				<view class="text">
					<text>{{loginUser.userLimit === '1' ? '超级管理员' : (loginUser.userLimit === '2' ? '管理员' : (loginUser.userLimit === '3' ? '普通用户' : ''))}}</text>
				</view>
			</view>
		</view>
		<user-manage>
			<u-cell @click="getUserLogin" :border="false" slot="one" icon="account" title="账户管理" isLink></u-cell>
			<u-cell :border="false" @click="gotoJournal" slot="two" icon="file-text" title="系统日志" isLink></u-cell>
		</user-manage>
		<u-button class="out_login" type="error" shape="circle" text="退出登录" @click="gotoLogin"></u-button>
	</view>
</template>

<script>
	import UserManage from '@/components/user/UserManage.vue'
	import Nav from '@/components/nav/Nav.vue'
	export default {
		data() {
			return {
				loginUser: {}
			}
		},
		onShow() {
			this.loginUser = uni.getStorageSync('loginUser')
		},
		components: {
			UserManage,
			Nav
		},
		methods: {
			// 退出登录
			gotoLogin() {
				uni.removeStorageSync('loginUser')
				uni.reLaunch({
					url: '../login/login'
				})
			},
			getUserLogin() {
				uni.navigateTo({
					url: `./account/accountManagement?
					name=${this.loginUser.userName}
					&phone=${this.loginUser.userPhone}
					&email=${this.loginUser.userEmail}
					&password=${this.loginUser.userPassword}`
				})
			},
			gotoJournal() {
				uni.navigateTo({
					url: `/pages/user/journal/journal?
					time=${this.loginUser.userLastLoginTime}
					&times=${this.loginUser.userLoginTimes}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	._user{
		._user-image {
			margin-left: 15rpx;
			position: relative;
		}
		.out_login{
			margin-top: 60rpx;
			width: 95%;
		}
	  .u_image {
			position: absolute;
			left: 50rpx;
			top: 100rpx;
			.text_root{
				flex-wrap: warp;
				font-size: 50rpx;
				line-height: 120rpx;
				height: 120rpx;
				color: #FFFFFF;
				position: absolute;
				left: 250rpx;
				top: 20rpx;
			}
			.text{
				color: #ccc;
				width: 100%;
				position: absolute;
				left: 250rpx;
				top: 110rpx;
			}
		}
	}
	.u-cell{
		margin-top: 20rpx;
	}
	.empty{
		width: 100%;
		height: 56rpx;
		background-color:  rgba($color: #000000, $alpha: 0.5);
	}
	.nav{
		display: block;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: rgba($color: #000000, $alpha: 0.5);
		color: #222;
	}
</style>
