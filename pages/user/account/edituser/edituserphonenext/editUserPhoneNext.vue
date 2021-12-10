<template>
	<view>
		<edit-user-next>
			<u--input slot="newcode" border="bottom" placeholder="请输入新手机号码">
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
export default {
	data() {
		return {};
	},
	components: {
		EditUserNext
	},
	methods: {
		gotoAccountManagement() {
			uni.navigateTo({
				url: '../../../user'
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