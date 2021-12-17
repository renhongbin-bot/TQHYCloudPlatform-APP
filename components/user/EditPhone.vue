<template>
	<view>
		<view class="get_code_text">
			<u--text class="user-phone" text="验证码将发送到手机"></u--text>
			<u--text class="user-phone" mode="name" :text="userPhone" format="encrypt"></u--text>
		</view>
		<view class="get_code">
			<u--input border="bottom" v-model="code" placeholder="请输入验证码">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
					<u-button @tap="getCode(userPhone)" :text="tips" type="success" size="mini"></u-button>
				</template>
			</u--input>
			<u-button @click="next(code)" type="primary" shape="circle" text="下一步"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	props: ['userPhone'],
	data() {
		return {
			tips: '',
			code: ''
		};
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		getCode(userPhone) {
			if (this.$refs.uCode.canGetCode) {
				console.log(userPhone);
				// 模拟向后端请求验证码
				this.$sendRequest({
					url: `GetIdentifyCode?userPhone=${userPhone}`,
					success: res => {
						console.log(res.data.state);
						if (res.data.state === 200) {
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
						} else if (res.data.state === 40002 || 40001) {
							uni.showToast({
								title: '验证码发送失败，请稍后再试',
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		next(code) {
			console.log(code);
			this.$sendRequest({
				url: `CheckIdentifyCode?code=${code}`,
				success: res => {
					console.log(res.data);
					if (res.data.state === 200) {
						this.$emit('editUserPhoneNext');
					} else if (res.data.state === 40001) {
						uni.showToast({
							title: '验证码不正确',
							icon: 'none',
							duration: 1000
						});
					} else if (res.data.state === 40002) {
						uni.showToast({
							title: '验证码不存在',
							icon: 'none',
							duration: 1000
						});
					} else if (res.data.state === 40003) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
							duration: 1000
						});
					}
				},
				fail: fa => {
					console.log(fa);
				}
			});
		},
		change(e) {
			console.log('change', e);
		}
	}
};
</script>

<style lang="scss" scoped>
.get_code_text {
	width: 80%;
	margin-left: 5%;
	display: flex;
}
.get_code {
	width: 92%;
	margin-left: 4%;
	margin-top: 50rpx;
}
.u-button {
	margin-top: 50rpx;
}
.u--text {
	display: inline-block;
}
.user-phone {
	padding-top: 100rpx;
}
</style>
