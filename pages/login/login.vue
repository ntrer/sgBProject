<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 14:50:41
 * @Description: content
-->
<template>
	<view class="login">
		<Header noLeft></Header>
		<view class="page-wrap">
			<view class="under-bg">
				<image src="../../static/reg/reg_bg.png" mode="scaleToFill" />
			</view>
			<view class="page-body">
				<view class="form-wrap">
					<view class="input-box">
						<input v-model.trim="loginForm.phone" maxlength="11" type="text" placeholder="请输入您的手机号" placeholder-style="color:#a7abb1" />
					</view>
					<view class="input-box">
						<input v-model.trim="loginForm.password" maxlength="20" type="text" :password="password" placeholder="请输入您的密码" placeholder-style="color:#a7abb1" />
						<view @click="toggleEye" class="eye-icon">
							<image v-show="password" src="../../static/eye-on.png" mode="scaleToFill" />
							<image v-show="!password" src="../../static/eye-off.png" mode="scaleToFill" />
						</view>
					</view>
					<!-- <view class="find">
						<text class="find_text" @click="findpassword">找回密码</text>
					</view> -->
					<view @click="submit" class="submit-btn">
						<text>立即登录</text>
					</view>
					<!-- <text @click="toPhoneReg" class="to-phone-reg">去注册></text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loginForm: {
				phone: '',
				password: '',
			},
			password: true,
			prouplist: [],
		};
	},
	onLoad() {
		uni.removeStorageSync('cishu');
	},
	methods: {
		//找回密码
		findpassword() {
			uni.redirectTo({
				url: '/pages/find/find',
			});
		},
		/**
		 * @description: 跳转手机号注册页面
		 */
		toPhoneReg() {
			uni.redirectTo({
				url: '/pages/phone-reg/phone-reg',
			});
		},
		/**
		 * @description: 切换密码显示隐藏
		 */
		toggleEye() {
			this.password = !this.password;
		},
		/**
		 * @description: 立即登录
		 */
		submit() {
			let that = this;
			this.$api.phoneLogin(that.loginForm, {
				success(res) {
					uni.setStorageSync('token', res.data.token);
					that.$Common.commonToast('登录成功', 'success', () => {
						uni.setStorageSync('cishu', '1');
						if (res.data.type == 'false') {
							uni.reLaunch({
								url: '/pages/holdup/holdup',
							});
						} else {
							that.$api.getActUser(
								{},
								{
									success: (ret) => {
										console.log(ret);
										uni.setStorageSync('user', ret.data);
										uni.reLaunch({
											url: '/pages/index/index',
										});
									},
									error: (err) => {
										if (err.code == '202') {
											uni.reLaunch({
												url: '/pages/holdup/holdup',
											});
										}
									},
								}
							);
						}
					});
				},
			});
		},
	},
};
</script>

<style lang="less">
.login {
	width: 100%;
	height: 100%;
	background: #f5f6f8;

	.page-wrap {
		height: calc(100% - 20rpx - @headerheight);
		margin-top: 20rpx;
		position: relative;

		.under-bg {
			width: 100%;
			height: calc(237 * 2rpx);
			position: absolute;
			z-index: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.page-body {
			width: calc(345rpx * 2);
			height: calc(100% - 30rpx);
			left: 30rpx;
			top: 30rpx;
			background-image: url(../../static/reg/login_bg.png);
			background-size: 100% 100%;
			position: relative;
			z-index: 1;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			.form-wrap {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				position: absolute;
				bottom: 126rpx;

				.input-box {
					width: 558rpx;
					height: 88rpx;
					background: #eceaea;
					border-radius: 999px;
					display: flex;
					align-items: center;
					position: relative;

					input {
						flex: 1;
						margin: 0 44rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						// color: #a7abb1;
					}

					// &:first-child {
					//   margin-top: 614rpx;
					// }
					& + .input-box {
						margin-top: 20rpx;
					}

					.eye-icon {
						width: 40rpx;
						height: 40rpx;
						position: relative;
						right: 25rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.find {
					margin-top: 15rpx;
					width: 100%;
					text-align: right;

					.find_text {
						font-size: 24rpx;
						color: @common;
						text-decoration: underline;
					}
				}

				.submit-btn {
					margin-top: 154rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 308rpx;
					height: 70rpx;
					background: @common;
					border-radius: 10rpx;

					text {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
					}
				}

				.to-phone-reg {
					margin-top: 30rpx;
					font-size: 24rpx;
					color: @common;
					text-decoration: underline;
				}
			}
		}
	}
}
</style>
