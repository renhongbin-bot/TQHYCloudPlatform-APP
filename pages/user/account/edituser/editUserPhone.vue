<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-phone :userPhone="phone" @editUserPhoneNext="gotoEditUserPhoneNext()"></edit-phone>
	</view>
</template>

<script>
import EditPhone from '@/components/user/EditPhone.vue'
import NavHome from '@/components/nav/NavHome.vue'
export default {
	data() {
		return {
			phone: '',
			title: '修改手机号码',
		};
	},
	onLoad(option) {
		this.phone = option.phone
	},
	components: {
		EditPhone,
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
</style>
