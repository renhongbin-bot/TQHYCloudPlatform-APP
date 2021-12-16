<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<u--form>
			<u-form-item label="用户名:" label-width="150rpx" borderBottom><u--input placeholder="请输入新的用户名" v-model="userName" border="none"></u--input></u-form-item>
		</u--form>
		<u-button type="primary" shape="circle" text="确定" @click="editUserName()"></u-button>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			userName: '',
			title: '修改用户名'
		};
	},
	components: {
		NavHome
	},
	methods: {
		editUserName() {
			this.$sendRequest({
				url: `updateUserInfo/${1}?userName=${this.userName}`,
				methods: 'POST',
				success: res => {
					uni.showToast({
						title: "修改成功",
						icon:"success"
					})
					uni.redirectTo({
						url: '../accountManagement'
					})
				},
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
	.u-form-item{
		width: 92%;
		margin-left: 4%;
		margin-top: 100rpx;
	}
	.u-button {
		margin-top: 50rpx;
		width: 95%;
	}
</style>
