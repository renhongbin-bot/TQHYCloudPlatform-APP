<template>
	<view>
		<u--form>
			<u-form-item label="用户名:" label-width="150rpx" prop="userName" borderBottom><u--input placeholder="请输入新的用户名" v-model="userInfo.userName" border="none"></u--input></u-form-item>
		</u--form>
		<u-button type="primary" shape="circle" text="确定"></u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				userName: ''
			}
		};
	},
	methods: {}
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
