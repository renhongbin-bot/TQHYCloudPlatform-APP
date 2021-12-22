<template>
	<view>
		<u-cell-group :border="false">
			<u-cell url="./edituser/editUserName" :border="false" title="修改用户名" :value="name" isLink></u-cell>
			<u-cell @click="gotoEditUserPhone" :border="false" title="修改手机号" isLink>
				<u--text mode="phone" :call="false" class="text-phone" slot="value" :text="phone" format="encrypt"></u--text>
			</u-cell>
			<u-cell @click="gotoEditUserEmail" :border="false" title="修改邮箱" isLink>
				<u--text mode="email" type="email" class="text-email" slot="value" :text="email" format="encrypt"></u--text>
			</u-cell>
			<u-cell url="./edituser/editUserPassword" :border="false" title="修改密码" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		props:["name", "phone", "email", "password"],
		data() {
			return {
			}
		},
		methods: {
			gotoEditUserPhone() {
				uni.navigateTo({
					url: `./edituser/editUserPhone?phone=${this.phone}`
				})
			},
			gotoEditUserEmail() {
				uni.navigateTo({
					url: `./edituser/editUserEmail?email=${this.email}`
				})
			}
		}
	}
</script>

<style lang="scss">
.u-cell-group{
	background-color: #eee;
	color: rgb(48, 49, 51);
}
.text-phone {
	padding-left: 300rpx;
}
.text-email{
	padding-left: 160rpx;
}
.u-cell{
	margin-top: 20rpx;
}
</style>
