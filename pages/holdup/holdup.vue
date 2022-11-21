<template>
	<view>
		<view class="bg">

		</view>
		<view class="white">
			<view class="white_tit">
				您未参与任何活动,
			</view>
			<view class="white_tit">
				请点击下方按钮参与活动!
			</view>
		</view>
		<view class="btn1" @click="clickone">
			参与活动
		</view>
		<view class="btn2" @click="clickthree">
			切换活动
		</view>
		<view class="btn2" @click="clicktwo">
			退出登录
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">切换活动-与我有关</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<scroll-view class="vip-cards" scroll-y="true" show-scrollbar="false">
						<view class="proup_li" v-for="(item, index) in prouplist" :key="index"
							@click="changeactive(index)">
							<view class="proup_li_left">
								{{ item.activity_name }}
							</view>
							<view class="proup_li_right">
								<view class="proup_yuan" :class="proupchange == index ? 'yuan_act' : ''"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close">取消</view>
					<view class="proup_btn2" @click="close('api')">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prouplist: [],
				proupchange: null,
			};
		},
		onShow() {
			this.$api.getActivity({}, {
				success: ret => {
					if(ret.data.length > 0){
						this.prouplist = ret.data
					}
				},
				error:(err)=>{
					console.log(err)
				}
			})
		},
		methods: {
			changeactive(index) {
				this.proupchange = index
				this.activeid = this.prouplist[index].act_id
			},
			close(data) {
				this.$refs.popup.close()
				if(this.activeid == ''){
					return this.$Common.commonToast('请选择活动')
					return
				}
				if (data == 'api') {
					this.$api.appBindingAct({
						act_id: this.activeid
					}, {
						success: data => {
							console.log(data)
							uni.setStorageSync(
								"token", data.data
							);
							this.$api.getActUser({}, {
								success: (ret) => {
									console.log(ret)
									uni.setStorageSync('user', ret.data)
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							})
							// this.getdata()
							// if (data.code == 200) {
							// 	this.$Common.commonToast(data.msg)
							// 	this.$api.getloginurl({}, {
							// 		success: data => {
							// 			console.log(data)
							// 			return
							// 			window.location.href =
							// 				data.data + '?act_id=' + this.activeid
							// 		}
							// 	})
							// }
						}
					})
				}
			},
			clickone() {
				let that = this
				// that.$Common.commonJump(`/pages/reg/reg?id=${194}`)
				uni.scanCode({
					scanType: ['qrCode'],
					success(res) {
						console.log(res)
						if (res.result) {
							let arr = res.result.split('?')[1]
							arr = arr.split('&')
							arr = arr.map(item => {
								return item.split('=')
							})
							let obj = {}
							arr.forEach(item => {
								obj[item[0]] = item[1]
							})
							console.log(obj)
							uni.navigateTo({
								url: `/pages/reg/reg?id=${obj.act_id}`,
							});
						}
					}
				})
			},
			clicktwo() {
				let newparams = {
					title: '请确认',
					content: '确认是否要退出登录',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: () => {
						uni.removeStorageSync('token')
						uni.removeStorageSync('baoming')
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				}
				this.$Common.commonMoadl(newparams)
			},
			clickthree(){
				this.$refs.popup.open('center')
			},
		}
	}
</script>

<style lang="less" scoped>
	.bg {
		width: 100%;
		height: 264rpx;
		background: url(../../static/index/yiye.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding-top: 1rpx;
	}

	.white {
		margin: 0 26rpx;
		margin-top: -200rpx;
		height: 530rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, .3);
		padding-top: 100rpx;

		.white_tit {
			text-align: center;
			font-size: 38rpx;
			color: #333;
			font-weight: 500;
			margin: 30rpx;
		}
	}

	.btn1,
	.btn2 {
		margin: 0 142rpx;
		background: #427BFF;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		padding: 14rpx 0;
		text-align: center;
		margin-top: 176rpx;
	}

	.btn2 {
		margin-top: 20rpx;
	}

	.popup_box {
		box-sizing: border-box;
		position: relative;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 32rpx 36rpx;
		padding-bottom: 56rpx;

		.proup_tit {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
			padding-bottom: 24rpx;
			border-bottom: 1rpx solid #d0cdcd;
			margin-bottom: 18rpx;
		}

		.proup_icon {
			position: absolute;
			right: 5%;
			top: 10%;

			.close_icon {
				width: 26rpx;
				height: 26rpx;
			}
		}

		.proup_content {
			max-height: 304rpx;
			padding: 0 32rpx;

			.vip-cards {
				max-height: 304rpx;
				overflow: hidden;
			}

			.proup_li {
				background: #f7f7f7;
				border-radius: 12rpx;
				padding: 14rpx 36rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;

				.proup_li_left {
					font-size: 24rpx;
					font-weight: 500;
					color: #3a3a3a;
				}

				.proup_li_right {
					.proup_yuan {
						width: 30rpx;
						height: 30rpx;
						background: #d8d8d8;
						border-radius: 50%;
					}

					.yuan_act {
						background-color: @common;
					}
				}
			}
		}

		.proup_bottom {
			margin: 34rpx 36rpx 0rpx 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.proup_btn1,
			.proup_btn2 {
				padding: 13rpx 86rpx;
				font-size: 32rpx;
				font-weight: 500;
				border-radius: 10rpx;
			}

			.proup_btn1 {
				color: @common;
				border: 2rpx solid @common;
			}

			.proup_btn2 {
				color: #ffffff;
				background: @common;
			}
		}
	}
</style>
