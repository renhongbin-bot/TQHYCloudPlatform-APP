<template>
	<view>
		<nav-home :title="title" @userClick="rightClick()"></nav-home>
		<edit-user-next>
			<u--input slot="newcode" border="bottom" placeholder="请输入新手机号码" v-model="userPhone">
				<!-- #endif -->
				<u--text text="+86" slot="prefix" margin="0 6px 0 0" type="tips"></u--text>
				<!-- #ifndef APP-NVUE -->
			</u--input>
			<u-button @click="gotoAccountManagement" slot="succeed" type="primary" shape="circle" text="完成"></u-button>
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
		successPhoneInfo() {
			
		},
		gotoAccountManagement() {
			this.$sendRequest({
				url:`updateUserInfo/${1}?userPhone=${this.userPhone}`,
				success: res => {
					console.log(res.data)
				}
			})
			uni.navigateTo({
				url: '../../../user'
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
.u-button {
		margin-top: 50rpx;
}
</style>