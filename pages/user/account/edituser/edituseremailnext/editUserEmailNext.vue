<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-user-next>
			<u--input slot="newcode" border="bottom" placeholder="请输入新的邮箱地址">
			</u--input>
			<u-button slot="succeed" type="primary" shape="circle" text="完成"></u-button>
		</edit-user-next>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
	import EditUserNext from '@/components/user/EditUserNext.vue'
	export default {
		data() {
			return {
				title: '修改邮箱'
			}
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
			}
		}
	}
</script>

<style>
.u-button {
		margin-top: 50rpx;
}
</style>
