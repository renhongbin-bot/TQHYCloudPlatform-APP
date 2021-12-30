<template>
	<view class="_view">
		<view class="u-calendar-header">
			<u--image src="../../static/images/login.png" mode="scaleToFill" width="750rpx"></u--image>
			<view class="imgs"><u--image class="u_image" src="../../static/images/touxiang.png" mode="scaleToFill" height="200rpx" width="200rpx" shape="square"></u--image></view>
		</view>
		<view class="u-calendar-login">
			<u-tabs
				:list="list"
				sticky
				@click="click"
				lineWidth="80"
				lineColor="#007aff"
				:activeStyle="{
					color: '#007aff',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
			></u-tabs>
			<!-- 账户登录 -->
			<view class="_login" v-show="index == 0 && isShow">
				<view class="">
					<u-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
						<u-form-item prop="userName">
							<u--input
								v-model="loginForm.userName"
								class="input-phone"
								border="bottom"
								placeholder="请输入账号"
								prefixIcon="account"
								prefixIconStyle="font-size: 44rpx;color: #007aff"
							></u--input>
						</u-form-item>
						<u-form-item prop="userPassword">
							<u-input
								v-show="cut === 0"
								ref="itp"
								v-model="loginForm.userPassword"
								class="input-pwd"
								border="bottom"
								type="password"
								placeholder="请输入密码"
								prefixIcon="lock"
								prefixIconStyle="font-size: 44rpx;color: #007aff"
							>
								<template slot="suffix">
									<u-icon name="eye" color="#2979ff" size="22" @click="cut = 1"></u-icon>
								</template>
							</u-input>
							<u-input
								v-show="cut === 1"
								ref="itp"
								v-model="loginForm.userPassword"
								class="input-pwd"
								border="bottom"
								type="text"
								placeholder="请输入密码"
								prefixIcon="lock"
								prefixIconStyle="font-size: 44rpx;color: #007aff"
							>
								<template slot="suffix">
									<u-icon name="eye-off" color="#2979ff" size="22" @click="cut = 0"></u-icon>
								</template>
							</u-input>
						</u-form-item>
					</u-form>
				</view>
				<!-- 记住密码 -->
				<view class="_login-remember">
					<u-checkbox-group class="_remenber" placement="column"><u-checkbox name="记住密码" :checked="checked" label="记住密码"></u-checkbox></u-checkbox-group>
				</view>
				<u-notify message="nihao" :show="true"></u-notify>
				<u-button @click="login" type="primary" shape="circle" text="登录"></u-button>
			</view>

			<!-- 验证码登录 -->
			<view class="code_login" v-show="index === 1">
				<view class="new_phone">
					<u-input border="bottom" placeholder="请输入手机号码" v-model="userPhone"><u-icon name="phone" color="#2979ff" size="28" slot="prefix"></u-icon></u-input>
				</view>
				<view class="get_code">
					<u-input class="code-input" border="bottom" placeholder="请输入验证码" v-model="userCode">
						<u-icon name="chat" color="#2979ff" size="28" slot="prefix"></u-icon>
						<template slot="suffix">
							<u-code v-model="userCode" ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCodeLogin(userPhone)" :text="tips" type="success" size="mini" :disabled="Codedis"></u-button>
						</template>
					</u-input>
					<u-button @click="codeLogin(userCode, userPhone)" type="primary" text="登录"></u-button>
				</view>
			</view>

			<!-- 注册 -->
			<view class="_register" v-show="index == 2">
				<u--input
					border="bottom"
					class="phone-inp"
					v-model="registerPhone"
					placeholder="请输入手机号"
					prefixIcon="phone"
					prefixIconStyle="font-size: 44rpx;color: #007aff"
				></u--input>
				<u-input v-model="code" prefixIconStyle="font-size: 44rpx;color: #007aff" class="code-text" prefixIcon="more-circle" border="bottom" placeholder="请输入验证码">
					<template slot="suffix">
						<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
						<u-button @tap="getCode(registerPhone)" :text="tips" type="success" size="mini" :disabled="dis"></u-button>
					</template>
				</u-input>

				<u-input
					class="pripwd mrg-bottom"
					type="password"
					placeholder="请输入密码"
					prefixIcon="lock"
					prefixIconStyle="font-size: 44rpx;color: #007aff"
					border="bottom"
					v-model="pwd"
					v-show="value === 0"
				>
					<template slot="suffix">
						<u-icon name="eye" color="#2979ff" size="22" @click="value = 1"></u-icon>
					</template>
				</u-input>
				<u-input
					class="pripwd mrg-bottom"
					type="text"
					placeholder="请输入密码"
					prefixIcon="lock"
					prefixIconStyle="font-size: 44rpx;color: #007aff"
					border="bottom"
					v-model="pwd"
					v-show="value === 1"
				>
					<template slot="suffix">
						<u-icon name="eye-off" color="#2979ff" size="22" @click="value = 0"></u-icon>
					</template>
				</u-input>
				<u-button type="primary" shape="circle" text="注册" @click="register(registerPhone, code, pwd)"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 登录
			loginForm: {
				userName: '',
				userPassword: ''
			},
			// 手机号
			registerPhone: '',
			// tab切换
			list: [
				{
					name: '账户登录'
				},
				{
					name: '验证码登录'
				},
				{
					name: '注册'
				}
			],
			// 手机号登录
			userPhone: '',
			userCode: '',
			// 验证码
			code: '',
			// 密码
			pwd: '',
			//
			cut: 0,
			isShow: true,
			// 控制记住密码
			checked: true,
			index: 0,
			value: 0,
			tips: '',
			userlist: [],
			loginFormRules: {
				// 验证用户名是否合法
				userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
				// 验证密码是否合法
				userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
			}
		};
	},
	computed: {
		dis() {
			const RegPhoen = /^(1[0-9])\d{9}$/;
			if (RegPhoen.test(this.registerPhone)) {
				return false;
			} else {
				return true;
			}
		},
		Codedis() {
			const RegPhoen = /^(1[0-9])\d{9}$/;
			if (RegPhoen.test(this.userPhone)) {
				return false;
			} else {
				return true;
			}
		}
	},
	onLoad() {
		const userName = uni.getStorageSync('userName');
		const userPwd = uni.getStorageSync('userPwd');
		if (userName && userPwd) {
			this.loginForm.userName = userName;
			this.loginForm.userPassword = userPwd;
		} else {
			this.loginForm.userName = '';
			this.loginForm.userPassword = '';
		}
	},
	methods: {
		click(item) {
			this.index = item.index ? (this.isShow = !this.isShow) : (this.isShow = true);
			this.index = item.index;
		},
		login() {
			this.$sendRequest({
				url: `app/login?userName=${this.loginForm.userName}&userPassword=${this.loginForm.userPassword}`,
				success: res => {
					switch (res.data.state) {
						case '200':
							this.userlist = res.data.loginUser;
							uni.showToast({
								title: '登录成功'
							});
							uni.setStorageSync('loginUser', res.data.loginUser);
							if(this.checked === true) {
								uni.setStorageSync('userName', this.loginForm.userName);
								uni.setStorageSync('userPwd', this.loginForm.userPassword);
							} else {
								uni.setStorageSync('userName');
								uni.setStorageSync('userPwd');
							}
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								});
							}, 200);
							break;
						case '40001':
							uni.showToast({
								title: '用户名不存在',
								icon: 'none'
							});
							break;
						case '40002':
							uni.showToast({
								title: '密码错误',
								icon: 'none'
							});
							break;
						case '40003':
							uni.showToast({
								title: '用户被锁定，不能登录',
								icon: 'none'
							});
							break;
						case '40004':
							uni.showToast({
								title: '无法识别的错误',
								icon: 'none'
							});
					}
				}
			});
		},
		getCodeLogin(userPhone) {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				this.$sendRequest({
					url: `api/getIdentifyCodeUnsafe?userPhone=${userPhone}`,
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
		codeLogin(userCode, userPhone) {
			console.log(userPhone)
			console.log(userCode)
			this.$sendRequest({
				url: `app/identifyCodeLogin?userPhone=${userPhone}&code=${userCode}`,
				success: res => {
					console.log(res.data)
					switch (res.data.state) {
						case '200':
							console.log(res.data);
							this.userlist = res.data.loginUser;
							console.log(this.userlist);
							uni.setStorageSync('loginUser', res.data.loginUser);
							uni.showToast({
								title: '登录成功'
							});
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								});
							}, 200);
							break;
						case '40001':
							uni.showToast({
								title: '用户名不存在',
								icon: 'none'
							});
							break;
						case '40002':
							uni.showToast({
								title: '密码错误',
								icon: 'none'
							});
							break;
						case '40003':
							uni.showToast({
								title: '用户被锁定，不能登录',
								icon: 'none'
							});
							break;
						case '40004':
							uni.showToast({
								title: '无法识别的错误',
								icon: 'none'
							});
					}
				}
			});
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode(userPhone) {
			if (this.$refs.uCode.canGetCode) {
				console.log(userPhone);
				// 模拟向后端请求验证码
				this.$sendRequest({
					url: `api/getIdentifyCodeUnsafe?userPhone=${userPhone}`,
					data: userPhone,
					success: res => {
						// console.log(res.data)
						switch (res.data.state) {
							case 200:
								uni.showToast({
									title: '验证码发送成功'
								});
								break;
							case 40002:
								uni.showToast({
									title: '验证码发送失败，请稍后再试',
									icon: 'none'
								});
								break;
							case 40001:
								uni.showToast({
									title: '验证码发送失败，请稍后再试',
									icon: 'none'
								});
								break;
						}
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
				}, 1000);
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		register(userPhone, code, pwd) {
			this.$sendRequest({
				url: `app/register?userPhone=${userPhone}&code=${code}&userPassword=${pwd}`,
				success: res => {
					switch (res.data.code) {
						case 200:
							uni.showToast({
								title: '注册成功'
							});
							this.userPhone = '';
							this.code = '';
							this.pwd = '';
							break;
						case 40001:
							uni.showToast({
								title: '用户已存在',
								icon: 'none'
							});
							break;
						case 40002:
							uni.showToast({
								title: '验证码错误',
								icon: 'none'
							});
							break;
						case 500:
							uni.showToast({
								title: '服务器内部错误',
								icon: 'none'
							});
							break;
					}
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
.imgs {
	position: relative;
	left: 50%;
	margin-left: -100rpx;
	top: -110rpx;
	width: 200rpx;
	height: 200rpx;
	text-align: center;
	background: #fff;
	border-radius: 32rpx;
	box-shadow: 2rpx 2rpx 2rpx #99ccff;
}
._login {
	margin-top: 40rpx;
	width: 95%;
	margin-left: 2.5%;
}
._register {
	margin-top: 40rpx;
	width: 95%;
	margin-left: 2.5%;
}
.phone-code {
	margin-bottom: 40rpx;
	width: 55%;
	float: left;
	margin-right: 80rpx;
}
.code-text {
	display: block;
	color: #007aff;
	margin-bottom: 40rpx;
}
.pripwd {
	width: 95%;
}
.phone-inp {
	margin-bottom: 40rpx;
	display: block;
	width: 100%;
}
._login-remember {
	margin-top: 40rpx;
	width: 105%;
	._remenber {
		display: block;
		width: 560rpx;
		float: left;
		margin-bottom: 50rpx;
	}
}
.mrg-bottom {
	margin-bottom: 60rpx;
}
.new_phone {
	margin-top: 50rpx;
	width: 92%;
	margin-left: 4%;
	margin-bottom: 50rpx;
}
.get_code {
	width: 92%;
	margin-left: 4%;
}
.u-button {
	margin-top: 20rpx;
	border-radius: 32rpx;
}
.code-input {
	margin-bottom: 50rpx;
}
</style>
