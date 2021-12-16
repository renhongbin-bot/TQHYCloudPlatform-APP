<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<view class="edit_old_pwd">
			<u--text size="12rpx" class="u-text" text="旧密码"></u--text>
			<u--input v-model="userPassword" placeholder="请输入旧密码" border="bottom" clearable></u--input>
		</view>
		<view class="edit_old_pwd">
			<u--text size="12rpx" class="u-text" text="新密码"></u--text>
			{{userPasswordRe}}
			<u--input v-model="userPasswordRe" placeholder="请输入新密码" border="bottom" clearable></u--input>
		</view>
		<u-button type="primary" shape="circle" text="完成" @click="editPassword()"></u-button>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			userPassword: '',
			userPasswordRe: '',
			title: '修改密码'
		};
	},
	components: {
		NavHome
	},
	methods: {
		editPassword() {
			this.$sendRequest({
				url: `updateUserPassword/${1}?userPassword=${this.userPassword}&userPasswordRe=${this.userPasswordRe}`,
				success: res => {
					console.log(res.data)
				}
			})
		},
		rightClick() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.edit_old_pwd {
	margin-top: 100rpx;
	width: 92%;
	margin-left: 4%;
	.u-text {
		padding-left: 20rpx;
	}
}
.u-button {
	margin-top: 40rpx;
	width: 92%;
}
</style>
