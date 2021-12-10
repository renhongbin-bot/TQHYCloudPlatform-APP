<template>
	<view>
		<user-cell :name="userName" :phone="userPhone" :email="userEmail" :password="userPassword"></user-cell>
	</view>
</template>

<script>
	import UserCell from '@/components/user/UserCell.vue'
	export default {
		data() {
			return {
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
			UserCell
		}
	}
</script>

<style lang="scss" scoped>

</style>
