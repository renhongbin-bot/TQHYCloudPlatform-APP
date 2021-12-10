<template>
	<view>
		<view class="edit_old_pwd">
			<u--text size="12rpx" class="u-text" text="旧密码"></u--text>
			<u--input placeholder="请输入旧密码" border="bottom" clearable></u--input>
		</view>
		<view class="edit_old_pwd">
			<u--text size="12rpx" class="u-text" text="新密码"></u--text>
			<u--input placeholder="请输入新密码" border="bottom" clearable></u--input>
		</view>
		<u-button type="primary" shape="circle" text="完成"></u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
	.edit_old_pwd {
		margin-top: 100rpx;
		width: 92%;
		margin-left: 4%;
		.u-text{
			padding-left: 20rpx;
		}
	}
	.u-button {
		margin-top: 40rpx;
		width: 92%;
	}
</style>
