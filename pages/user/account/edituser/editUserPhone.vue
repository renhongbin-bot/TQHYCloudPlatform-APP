<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-user>
			<u--text slot="user" class="user-phone" text="验证码将发送到手机"></u--text>
			<u--text slot="code" class="user-phone" mode="name" :text="phone" format="encrypt"></u--text>
			<u-button slot="next" @click="gotoEditUserPhoneNext" type="primary" shape="circle" text="下一步"></u-button>
		</edit-user>
	</view>
</template>

<script>
import EditUser from '@/components/user/EditUser.vue'
import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			phone: '',
			title: '修改手机号码'
		};
	},
	onLoad(option) {
		this.phone = option.phone
	},
	components: {
		EditUser,
		NavHome
	},
	methods: {
		gotoEditUserPhoneNext() {
			uni.navigateTo({
				url: 'edituserphonenext/editUserPhoneNext'
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
	.u--text {
		display: inline-block;
	}
	.user-phone {
		padding-top: 100rpx;
	}
	.u-button {
		margin-top: 50rpx;
	}
</style>
