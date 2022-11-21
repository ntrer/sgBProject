<template>
	<view>
		<Header haveback="true"></Header>
		<view class="xian"></view>
		<view class="box">
			<view class="item" v-for="(item, index) in prouplist" :key="index" @click="change(index, item.type)">
				<view class="item_left">
					{{ item.type_s }}
				</view>
				<view class="item_right">
					<view class="all">
						总额：¥{{ item.total_money }}
						<image src="../../static/index/changethis.png" class="abimg" mode="" :class="act === index ? 'show' : ''"></image>
					</view>
					<view class="canuse">可用：¥{{ item.other_money }}</view>
				</view>
			</view>
			<view class="note">注：手续费为千分之6</view>
		</view>
		<view class="btn" @click="btn">充值</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">充值金额</view>
				<view class="proup_content">
					<view class="proup_content_text">请输入金额</view>
					<view class="proup_int">
						<input type="digit" class="int_proup" value="" v-model="much" />
					</view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close()">取消</view>
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
			act: '',
			changeid: null,
			much: '',
		};
	},
	onLoad() {
		this.getListData();
		// this.$api.getPayUrl(
		// 	{},
		// 	{
		// 		success: (ret) => {
		// 			if (ret.code == 200) {
		// 			}
		// 		},
		// 	}
		// );
	},
	methods: {
		getListData() {
			this.$api.getActCost(
				{},
				{
					success: (ret) => {
						if (ret.code == 200) {
							this.prouplist = ret.data;
						}
					},
				}
			);
		},
		change(index, id) {
			this.act = index;
			this.changeid = id;
		},
		btn() {
			console.log(this.changeid);
			if (this.changeid) {
				this.$refs.popup.open('center');
			} else {
				this.$Common.commonToast('请选择充值类型');
			}
		},
		close(type) {
			if (!type) {
				this.$refs.popup.close();
				this.much = '';
			} else {
				this.$api.actCostRecharge(
					{
						type: this.changeid,
						money: this.much,
					},
					{
						success: (ret) => {
							if (ret.code == 200) {
								this.$api.paymentsIndex(
									{
										order_no: ret.data.order_no,
										order_type: ret.data.order_type,
										is_app: 1,
									},
									{
										success: (payData) => {
											console.log(payData);
											this.$Common.requestPayment('wxpay', JSON.parse(payData.data), () => {
												this.$refs.popup.close();
												this.getListData();
											});
										},
									}
								);
							}
						},
					}
				);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.xian {
	width: 100%;
	background-color: #ededed;
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
		background: #f7f7f7;
		border-radius: 12rpx;
		padding: 22rpx 28rpx;
		padding-top: 40rpx;

		.item_left {
			font-size: 28rpx;
			font-weight: 500;
			color: #3a3a3a;
		}

		.item_right {
			.all {
				font-size: 28rpx;
				font-weight: 500;
				color: #e02020;
				position: relative;

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
				color: #6d7278;
			}
		}
	}

	.note {
		text-align: right;
		font-size: 28rpx;
		font-weight: 400;
		color: #6d7278;
	}
}

.btn {
	margin: 0 auto;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
	width: 308rpx;
	margin-top: 386rpx;
	background: #427bff;
	text-align: center;
	border-radius: 10rpx;
	padding: 14rpx 0;
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
			border: 1rpx solid rgba(0, 0, 0, 0.2);
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
			color: #ffffff;
			background: @common;
		}
	}
}
</style>
