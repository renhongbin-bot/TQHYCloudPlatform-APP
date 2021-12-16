<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-user>
			<u--text slot="user" class="user-phone" text="验证码将发送到邮箱"></u--text>
			<u--text slot="code" class="user-phone" mode="email" :text="email" format="encrypt"></u--text>
			<u-button slot="next" @click="gotoEditUserEmailNext" type="primary" shape="circle" text="下一步"></u-button>
		</edit-user>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue'
import EditUser from '@/components/user/EditUser.vue'
export default {
	data() {
		return {
			email: '',
			title: '修改邮箱'
		};
	},
	onLoad(option) {
		this.email = option.email
	},
	components: {
		EditUser,
		NavHome
	},
	
	methods: {
		gotoEditUserEmailNext() {
			uni.navigateTo({
				url: 'edituseremailnext/editUserEmailNext'
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

