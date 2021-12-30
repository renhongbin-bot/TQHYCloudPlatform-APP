<template>
	<view>
		<nav-home title="工单详尽" @developer="rightClick()"></nav-home>
		<u--form class="form" labelPosition="left" :model="editOrder">
			<u-form-item class="mar-top" label="工单编号:" labelWidth="150rpx"><u--input v-model="editOrder.id"></u--input></u-form-item>
			<u-form-item class="mar-top" label="工单名称:" labelWidth="150rpx"><u--input v-model="editOrder.oderName"></u--input></u-form-item>
			<u-form-item class="mar-top" label="任务详尽:" labelWidth="150rpx">
				<u--textarea v-model="editOrder.taskContent" count></u--textarea>
			</u-form-item>
			<u-form-item class="mar-top" label="回执详尽:" labelWidth="150rpx">
				<u--textarea v-model="editOrder.message" count></u--textarea>
			</u-form-item>
			<u-form-item class="mar-top" label="附件:" labelWidth="150rpx"><u--image :showLoading="true" :src="editOrder.imageUrl" width="80px" height="80px"></u--image></u-form-item>
			<u-form-item class="mar-top" label="工单状态:" labelWidth="150rpx"><u--text :text="editOrder.oderState" type="success"></u--text></u-form-item>
		</u--form>
	</view>
</template>

<script>
	import NavHome from '../../components/nav/NavHome.vue'
	export default {
		data() {
			return {
				editOrder: {
					id: 1,
					oderName: '工单0001',
					taskContent: '任务12323',
					message: '今日内完成',
					imageUrl: '/static/images/touxiang.png',
					oderState: '已完成'
				}
			}
		},
		components: {
			NavHome
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/developer/developer'
				})
			}
		}
	}
</script>

<style scoped>
.form {
	width: 92%;
	margin-left: 4%;
}
.mar-top {
	margin-top: 50rpx;
}
</style>
