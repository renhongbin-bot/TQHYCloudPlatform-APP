<template>
	<view>
		<edit-user-next>
			<u--input slot="newcode" border="bottom" placeholder="请输入新的邮箱地址">
			</u--input>
			<u-button slot="succeed" type="primary" shape="circle" text="完成"></u-button>
		</edit-user-next>
	</view>
</template>

<script>
	import EditUserNext from '@/components/user/EditUserNext.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			EditUserNext
		},
		methods: {
			
		}
	}
</script>

<style>
.u-button {
		margin-top: 50rpx;
}
</style>
