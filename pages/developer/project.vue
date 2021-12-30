<template>
	<view>
		<nav-home title="工单下发" @developer="rightClick()"></nav-home>
		<u--form class="form" labelPosition="left" :model="addOrder" :rules="rules">
			<u-form-item class="mar-top" label="工单名称:" labelWidth="150rpx" prop="name" borderBottom><u--input v-model="addOrder.name" border="none"></u--input></u-form-item>
			<u-form-item class="mar-top" label="任务详尽:" labelWidth="150rpx" prop="message" borderBottom>
				<u--textarea placeholder="不低于3个字" v-model="addOrder.message" count></u--textarea>
			</u-form-item>
			<u-form-item class="mar-top" label="开始时间" prop="hotel" labelWidth="80" borderBottom @click="showCalendar = true">
				<u--input v-model="addOrder.startTime" disabled disabledColor="#ffffff" placeholder="请选择住开始时间" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item class="mar-top" label="结束时间" prop="hotel" labelWidth="80" borderBottom @click="show = true">
				<u--input v-model="addOrder.endTime" disabled disabledColor="#ffffff" placeholder="请选择住结束时间" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-button class="mar-top" text="创建工单" type="primary"></u-button>
		</u--form>
		<u-datetime-picker v-model="addOrder.endTime || addOrder.startTime" @confirm="confirm" @cancel="cancel" :minDate="1587525000000" :show="showCalendar || show" mode="datetime">
		</u-datetime-picker>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue';
export default {
	data() {
		return {
			userId: 0,
			showCalendar: false,
			show: false,
			addOrder: {
				name: '',
				message: '',
				startTime: Number(new Date()),
				endTime: Number(new Date())
			},
			rules: {
				name: {
					type: 'string',
					required: true,
					message: '请填写工单名称',
					trigger: ['blur', 'change']
				},
				message: {
					type: 'string',
					required: true,
					message: '请填写任务信息',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	components: {
		NavHome
	},
	onLoad(option) {
		this.userId = option.id;
		this.getDateTime()
	},
	methods: {
		rightClick() {
			uni.switchTab({
				url: '/pages/developer/developer'
			});
		},
		getDateTime() {
			const time = uni.$u.timeFormat
			this.addOrder.startTime = time(this.addOrder.startTime, 'yyyy-mm-dd hh:MM')
			this.addOrder.endTime = time(this.addOrder.endTime, 'yyyy-mm-dd hh:MM')
		},
		confirm(e) {
			const timeFormat = uni.$u.timeFormat
			const timer = 	timeFormat(e.value, 'yyyy-mm-dd hh:MM')
			if(this.show) {
				this.addOrder.endTime = timer
				this.show = false
			} else {
				this.addOrder.startTime = timer
				this.showCalendar = false
			}
			console.log(timer)
		},
		cancel() {
			if(this.show) {
				this.show = false
			} else {
				this.showCalendar = false
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.form {
	width: 92%;
	margin-left: 4%;
}
.mar-top {
	margin-top: 50rpx;
}
</style>
