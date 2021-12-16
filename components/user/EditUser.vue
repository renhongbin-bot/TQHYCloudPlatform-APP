<template>
	<view>
		<view class="get_code_text">
			<slot name="user"></slot>
			<slot name="code"></slot>
		</view>
		<view class="get_code">
			<u--input border="bottom" placeholder="请输入验证码">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
					<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
				</template>
			</u--input>
			<slot name="next"></slot>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: ''
		};
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
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
		}
	}
}
</script>

<style lang="scss" scoped>
.get_code_text {
	width: 80%;
	margin-left: 5%;
	display: flex;
}
.get_code{
	width: 92%;
	margin-left: 4%;
	margin-top: 50rpx;
}
</style>

