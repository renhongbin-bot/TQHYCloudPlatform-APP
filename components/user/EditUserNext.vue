<template>
	<view>
		<view class="new_phone">
			<u-input border="bottom" placeholder="请输入新手机号码" v-model="userPhone"><u--text text="+86" slot="prefix" margin="0 6px 0 0" type="tips"></u--text></u-input>
		</view>
		<view class="get_code">
			<u-input class="code-input" border="bottom" placeholder="请输入验证码" v-model="code">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
					<u-button @tap="getCode(userPhone)" :text="tips" type="success" size="mini" :disabled="dis"></u-button>
				</template>
			</u-input>
			<u-button @click="editUserPhone(code, userPhone)" type="primary" text="完成"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: '',
			userPhone: '',
			code: ''
		};
	},
	computed: {
		dis() {
			const RegPhoen = /^(1[0-9])\d{9}$/;
			if (RegPhoen.test(this.userPhone)) {
				return false;
			} else {
				return true;
			}
		}
	},
	onLoad() {},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		getCode(phone) {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				this.$sendRequest({
					url: `api/getIdentifyCodeUnsafe?userPhone=${phone}`,
					data: phone,
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
		change(e) {
			console.log('change', e);
		},
		editUserPhone(code, phone) {
			this.$sendRequest({
				url: `app/changUserPhone?userPhone=${phone}&code=${code}`,
				success: res => {
					console.log(res.data)
					switch (res.data.state) {
						case 200:
							uni.showToast({
								title: '修改成功'
							});
							// 修改storage的值
							let loginUser = uni.getStorageSync('loginUser')
							loginUser.userPhone = this.userPhone
							uni.setStorageSync('loginUser', loginUser)
							console.log(loginUser)
							this.$emit('getBack')
							break;
						case 40001:
							uni.showToast({
								title: '验证码不正确，请稍后再试',
								icon: 'none'
							});
							break;
						case 40002:
							uni.showToast({
								title: '验证码不正确，请稍后再试',
								icon: 'none'
							});
							break;
					}
				}
			})
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
	margin-top: 50rpx;
}
.u-button {
	margin-top: 20rpx;
}
.code-input{
	margin-bottom: 50rpx;
}
</style>
