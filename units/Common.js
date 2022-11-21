import api from "@/units/servers/api";
import config from './servers/config'
import {
	pathToBase64,
	base64ToPath
} from 'image-tools'

export default {
	// 上传图片
	upChooseImage(callBack) {
		console.log('进来了');
		uni.chooseImage({
			count: 1,
			sourceType: ['album'],
			success(res) {
				if (res.tempFilePaths.length > 0) {
					pathToBase64(res.tempFilePaths[0])
						.then(base64 => {
							callBack && callBack(base64)
						})
				}
			},
		});
	},
	// 获取个人信息
	userInfoUpData(success) {
		api.getUserInfo("", {
			success: (data) => {
				data.info.avatar = this.defaultPicture(data.info.avatar);
				uni.setStorageSync('user', data.info)
				if (success) {
					success(data.info)
				}
			},
		});
	},

	// 默认图片
	defaultPicture(src, type = 'face') {
		if (type === 'face') {
			return src || require('@/static/user.png')
		}
	},

	// 支付
	requestPayment(type, orderInfo, callBack, error) {
		console.log('orderInfo', orderInfo)
		uni.requestPayment({
			provider: type,
			orderInfo: orderInfo, //微信、支付宝订单数据
			success: function (res) {
				console.log('success:' + JSON.stringify(res));
				callBack && callBack()
			},
			fail: function (err) {
				uni.showModal({
					title: '错误', // 提示标题
					content: JSON.stringify(err), // 提示内容
					showCancel: false, // 是否显示取消按钮
					cancelText: '', // 取消文字按钮
					confirmText: '确认', // 确认按钮文字
					confirmColor: '#443FF8', // 确认文字颜色
					success: (res) => {},
				});
				console.log('fail:' + JSON.stringify(err));
				error && error()
			}
		});
	},

	// 图片增加路径
	returnImgUrl(path) {
		return config.imgHost + path
	},

	// 页面跳转
	commonJump(path, clear = false) {
		if (!path) {
			console.warn('请检查跳转地址，跳转地址为空')
			return
		}
		if (uni.getStorageSync('baoming') == 0) {
			this.commonToast('请点击活动报名进行报名')
			return
		}
		if (clear) {
			uni.reLaunch({
				url: path,
			});
		} else {
			uni.navigateTo({
				url: path,
			});
		}
	},

	// 页面弹出框
	commonToast(title, type = 'none', callback) {
		var toastDuration = 1000
		var toastParams = {
			title: title,
			duration: toastDuration,
			icon: type
		}
		uni.showToast(toastParams);
		if (callback) {
			setTimeout(() => {
				callback()
			}, toastDuration);
		}
	},

	// 页面弹出模态框
	commonMoadl(params) {
		uni.showModal({
			title: params.title, // 提示标题
			content: params.content, // 提示内容
			showCancel: params.showCancel, // 是否显示取消按钮
			cancelText: params.cancelText, // 取消文字按钮
			confirmText: params.confirmText, // 确认按钮文字
			confirmColor: '#443FF8', // 确认文字颜色
			success: (res) => {
				if (res.confirm) {
					params.success && params.success()
				} else if (res.cancel) {
					params.cancel && params.cancel()
				}
			},
		});
	},

	// 判断是否有支付密码
	inspectionUserPayPassword(callBack) {
		if (uni.getStorageSync("user").is_pay_password) {
			callBack && callBack()
		} else {
			this.commonMoadl({
				title: "很抱歉",
				content: "您还未设置支付密码",
				confirmText: "去设置",
				success: () => {
					uni.setStorageSync(
						"transferData",
						this.submitParams
					);
					this.commonJump("../editPayP/editPayP");
				},
			})
		}
	},

	// 获取详细平台
	getPlatForm() {
		let platForm = undefined

		// #ifdef APP-PLUS
		platForm = 'APP'
		// #endif

		// #ifdef H5
		platForm = 'H5'
		// #endif

		return platForm
	},
	// app更新
	appUpData(callBack) {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			api.fetchVersionNumber("", {
				success: (data) => {
					if (data.version_number * 1 > wgtinfo.version * 1) {
						return
						// 需要升级
						this.commonMoadl({
							title: "检测更新",
							content: "已有最新版，请尽快升级",
							showCancel: false,
							confirmText: "去下载",
							success: () => {
								plus.runtime.openURL(
									config.imgHost +
									"/pages/download/download"
								);
							},
							cancel: () => {
								uni.removeStorageSync('token')
								uni.removeStorageSync('user')
								plus.runtime.openURL(
									config.imgHost +
									"/pages/loginIn/loginIn"
								);
							}
						});
					} else {
						callBack && callBack()
					}
				},
			});
		});
		// #endif

		// #ifdef H5
		callBack && callBack()
		// #endif
	},
};