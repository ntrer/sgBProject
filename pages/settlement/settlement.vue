<template>
	<view>
		<Header haveback='true'></Header>
		<view class="xian"></view>
		<view class="box">
			<view class="item" v-for="item,index in listDataArr" :key='index' @click="change(index,item.type)">
				<view class="item_left">
					{{item.type_s}}
				</view>
				<view class="item_right">
					<view class="all">
						{{item.isOrder ? ("数量：") : '总额：¥'}}：{{item.total_money}}
						<image src="../../static/index/changethis.png" class="abimg" mode=""
							:class="act===index?'show':''"></image>
					</view>
					<view class="canuse">
						可用：¥{{item.other_money}}
					</view>
				</view>
			</view>
			<!-- <view class="note">
				注：手续费为千分之6
			</view> -->
		</view>
		<view class="btn" @click="btn">
			充值
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">
					充值金额
				</view>
				<view class="proup_content">
					<view class="proup_content_text">
						请输入金额
					</view>
					<view class="proup_int">
						<input type="text" class="int_proup" value="" v-model="much" />
					</view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close()">
						取消
					</view>
					<view class="proup_btn2" @click="close('api')">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				act:'',
				much:'',
				initialization: true,
				listDataArr: [],
				listDataKey: -2
			};
		},
		onLoad() {
			this.$api.getActCost({}, {
				success: (data) => {
					this.listDataArr= this.listDataArr.concat(data.data)
				}
			})

			this.$api.rewardLlocation({}, {
				success: (rewardData) => {
					var listDataArr = []
					this.$api.getOrderMoney({}, {
						success: (data) => {
							for (const key in data.data) {
								var params = {
									other_money: data.data[key],
									total_money: data.data[key + "_num"],
									type: key,
									type_s: rewardData.data[key],
									isOrder: true
								}
								if (!rewardData.data[key]) {
									continue
								}
								listDataArr.push(params)
							}
							this.listDataArr = this.listDataArr.concat(listDataArr)
						}
					})
				}
			})
		},
		methods: {
			change(index, id) {
				this.act = index
				this.changeid = id
			},
			btn() {
				console.log(this.changeid)
				if (this.changeid) {
					this.$refs.popup.open('center')
				} else {
					this.$Common.commonToast('请选择充值类型')
				}
			},
			close(type) {
				if (!type) {
					this.$refs.popup.close()
					this.much = ''
				} else {
					this.$api.getToken({},{
						success:(data)=>{
							this.$api.setCostWithdrawal({
								order_type: "advance_booking_order",
								money: this.much,
								form_token : data.data
							}, {
								success: (ret) => {
									if (ret.code == 200) {
										this.$Common.commonToast(ret.msg)
										setTimeout(() => {
											this.$refs.popup.close()
											this.much = ''
										}, 400)
									}
								}
							})
						}
					})
					
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}

	.box {
		margin: 0 30rpx;
		margin-top: 30rpx;

		.item {
			margin-bottom: 18rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #F7F7F7;
			border-radius: 12rpx;
			padding: 22rpx 28rpx;
			padding-top: 40rpx;

			.item_left {
				font-size: 28rpx;
				font-weight: 500;
				color: #3A3A3A;

			}

			.item_right {
				.all {
					font-size: 28rpx;
					font-weight: 500;
					color: #E02020;
					position: relative;
					text-align: right;

					.abimg {
						display: none;
						position: absolute;
						top: -90%;
						right: -10%;
						width: 45rpx;
						height: 45rpx;
					}

					.show {
						display: block;
					}
				}

				.canuse {
					margin-top: 10rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #6D7278;
					text-align: right;
				}
			}
		}

		.note {
			text-align: right;
			font-size: 28rpx;
			font-weight: 400;
			color: #6D7278;
		}
	}

	.btn {
		margin: 0 auto;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		width: 308rpx;
		margin-top: 142rpx;
		background: #427BFF;
		text-align: center;
		border-radius: 10rpx;
		padding: 14rpx 0;
	}

	.popup_box {
		box-sizing: border-box;
		position: relative;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 32rpx 36rpx;
		padding-bottom: 56rpx;

		.proup_tit {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
			padding-bottom: 24rpx;
			border-bottom: 1rpx solid #D0CDCD;
			margin-bottom: 18rpx;
		}

		.proup_content {
			max-height: 304rpx;
			padding: 0 32rpx;

			.proup_content_text {
				text-align: center;
			}

			.int_proup {
				margin: auto;
				margin-top: 20rpx;
				width: 80%;
				padding: 10rpx 0;
				border: 1rpx solid rgba(0, 0, 0, .2);
				border-radius: 10rpx;

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
				color: #FFFFFF;
				background: @common;
			}
		}
	}
</style>
