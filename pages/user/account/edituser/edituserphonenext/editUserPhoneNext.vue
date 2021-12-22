<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-user-next @getBack="rightClick()">
			
		</edit-user-next>
	</view>
</template>

<script>
import EditUserNext from '@/components/user/EditUserNext.vue'
import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			title: '修改手机号码',
			userPhone: ''
		};
	},
	components: {
		EditUserNext,
		NavHome
	},
	methods: {
		rightClick() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		},
	}
};
</script>

<style lang="scss" scoped>	
.u-button {
		margin-top: 50rpx;
}
</style>