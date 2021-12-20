<template>
	<view>
		<view class="new_phone">
			<u--input border="bottom" placeholder="请输入新手机号码" v-model="userPhone">
				<!-- #ifdef APP-NVUE -->
				<u--text text="+86" slot="prefix" margin="0 6px 0 0" type="tips"></u--text>
				<!-- #endif -->
			</u--input>
		</view>
		<view class="get_code">
			<u--input border="bottom" placeholder="请输入验证码" v-model="code">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
					<u-button @tap="getCode(userPhone)" :text="tips" type="success" size="mini" :disabled="dis"></u-button>
				</template>
			</u--input>
			<u-button @click="gotoAccountManagement()" type="primary" shape="circle" text="完成"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: '',
			userPhone: '',
			code: '',
		};
	},
	computed:{
		dis() {
			const RegPhoen = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if (RegPhoen.test(this.userPhone)) {
				return false
			} else {
				return true
			}
		}
	},
	onLoad() {
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		getCode(Phone) {
			if (this.$refs.uCode.canGetCode) {
				console.log(userPhone);
				// 模拟向后端请求验证码
				this.$sendRequest({
					url: `api/getIdentifyCodeUnsafe?userPhone=${userPhone}`,
					data: userPhone,
					success: res => {
						// console.log(res.data)
					}
				});
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 500);
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		change(e) {
			console.log('change', e);
		},
		gotoAccountManagement() {
			this.$emit('accountManagement');
		}
	}
};
</script>

<style lang="scss" scoped>
.new_phone {
	margin-top: 100rpx;
	width: 92%;
	margin-left: 4%;
}
.get_code {
	width: 92%;
	margin-left: 4%;
}
.u-button {
	margin-top: 20rpx;
}
</style>
