<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<user-cell :name="userName" :phone="userPhone" :email="userEmail" :password="userPassword"></user-cell>
	</view>
</template>

<script>
	import UserCell from '@/components/user/UserCell.vue'
	import NavHome from '@/components/nav/NavHome.vue'
	export default {
		data() {
			return {
				title: '修改信息',
				userName: '',
				userPhone: '',
				userPassword: '',
				userEmail: ''
			}
		},
		onLoad(option) {
			this.userName = option.name
			this.userPhone = option.phone
			this.userEmail = option.email
			this.userPassword = option.password
		},
		components: {
			UserCell,
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

<style lang="scss" scoped>

</style>
