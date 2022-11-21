<template>
	<view>
		<uni-popup ref="commonproup" type="bottom">
			<view class="popup_box" :class="number == 6||number == 26?'sixbg':number == 8||number == 28?'eight':''">
				<view class="proup_tit">
					{{title?title:'标题'}}
					<view class="proup_icon">
						<image src="../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
					</view>
				</view>

				<!-- 内容 -->
				<view class="proup_content">
					<view class="lurukehu" v-if="number == 11" @click="addshop()">
						录入客户
					</view>
					<view class="sixbox" v-if="number == 6">
						<view class="sixbox_tit">
							扫描二维码，完成店长邀请
						</view>
						<view class="sixbox_ma">
							<image :src="img" class="sixbox_img" mode=""></image>
						</view>
					</view>
					<view class="sixbox" v-if="number == 26">
						<view class="sixbox_tit">
							扫描二维码，完成推客邀请
						</view>
						<view class="sixbox_ma">
							<image :src="img" class="sixbox_img" mode=""></image>
						</view>
						<view class="eight_btn" @click="saveImg">
							保存图片
						</view>
					</view>
					<!-- <view class="eightbox" v-if="number == 8">
						<view class="eightbox_tit">
							请在下方输入手机号码：
						</view>
						<view class="eight_input">
							<input type="text" value="" class="int" />
						</view>
						<view class="eight_btn">
							提交认证
						</view>
					</view> -->
					<view class="eightbox" v-if="number == 28">
						<view class="eightbox_tit">
							请输入提现金额
						</view>
						<view class="eight_input">
							<input type="text" value="" class="int" />
						</view>
						<view class="eight_btn" @click="ok">
							确定
						</view>
					</view>
					<view class="nonenone" v-if="number == 99">
						<view class="noneitem">
							<text class="nonetext">冲刺任务百分比</text>
							<input type="text" value="" v-model="paramss.challenge_percentage" class="noneint" />
							<text class="nonebi">%</text>
						</view>
						<view class="noneitem">
							<text class="nonetext">挑战任务百分比</text>
							<input type="text" value="" v-model="paramss.sprint_percentage" class="noneint" />
							<text class="nonebi">%</text>
						</view>
						<view class="btn" @click="noneclick">
							保存
						</view>
						<view class="nonetextshow">
							冲刺任务和挑战任务为基础任务完成率基础之上
						</view>
					</view>
				</view>
				<!-- 底部 -->
				<view class="proup_bottom">
					<!-- <view class="proup_btn1" @click="close">
						取消
					</view>
					<view class="proup_btn2" @click="layout">
						确定
					</view> -->
					<view class="searchkehu" v-if="number == 11" @click="searchshop()">
						搜索客户
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "Indexproup",
		data() {
			return {
				params: {}
			};
		},
		props: {
			props: {
				default: false
			},
			title: {
				default: null
			},
			number: {
				default: 11
			},
			img: {
				default: null
			},
			paramss: {
				default: null
			},
			down: {
				default: false
			}
		},
		watch: {
			props(e) {
				this.$refs.commonproup.open('center')
			},
			down(e) {
				this.$refs.commonproup.close()
			}
		},
		methods: {
			saveImg(){
				var that = this
				uni.saveImageToPhotosAlbum({
					filePath: that.img,
					success: function() {
						that.$Common.commonToast("保存成功", "success",()=>{
							that.$refs.commonproup.close()
						});
					},
				});
			},
			layout() {
				this.$refs.commonproup.close()
				this.$emit('checkok')
			},
			searchshop() {
				this.$emit('gosearch')
			},
			addshop() {
				this.$emit('addshop')
				this.$refs.commonproup.close()
			},
			close() {
				this.$refs.commonproup.close()
			},
			//提现
			ok() {
				this.$emit('tixian')
			},
			//确认
			noneclick() {
				console.log(this.params)
				this.$emit('none', this.paramss)
			}
		}
	}
</script>

<style lang="less">
	.popup_box {
		box-sizing: border-box;
		position: relative;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 32rpx 36rpx;
		padding-bottom: 56rpx;

		.proup_tit {
			position: relative;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
			padding-bottom: 24rpx;
			border-bottom: 1rpx solid #D0CDCD;
			margin-bottom: 18rpx;
		}

		.proup_icon {
			position: absolute;
			right: 0%;
			top: 10%;

			.close_icon {
				width: 26rpx;
				height: 26rpx;
			}
		}

		.proup_content {
			max-height: 698rpx;
			padding: 0 32rpx;
			padding-top: 15rpx;

			.sixbox {
				width: 100%;
				height: 596rpx;
				
				.eight_btn{
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
					width: 308rpx;
					margin: auto;
					margin-top: 28rpx;
					background: @common;
					border-radius: 10rpx;
					padding: 14rpx 0;
					text-align: center;
				}

				.sixbox_tit {
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #333333;
				}

				.sixbox_ma {
					width: 330rpx;
					height: 344rpx;
					margin: 0 auto;
					margin-top: 52rpx;

					.sixbox_img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.eightbox {
				width: 100%;
				height: 502rpx;

				.eightbox_tit {
					font-size: 32rpx;
					font-weight: 400;
					color: #333333;
					text-align: center;
				}

				.eight_input {
					margin: 0 auto;
					margin-top: 50rpx;
					width: 528rpx;
					background: #ECEAEA;
					border-radius: 54rpx;
					padding-left: 35rpx;

					.int {
						width: 80%;
						height: 108rpx;
						color: #6D7278;
						font-size: 28rpx;
						font-weight: 400;
					}
				}

				.eight_btn {
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
					width: 308rpx;
					margin: auto;
					margin-top: 118rpx;
					background: @common;
					border-radius: 10rpx;
					padding: 14rpx 0;
					text-align: center;
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
				color: #FFFFFF;
				background: @common;
			}
		}

		.lurukehu,
		.searchkehu {
			width: 308rpx;
			height: 70rpx;
			background: #427BFF;
			border-radius: 10rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			margin: 0 auto;
		}
	}

	.sixbg {
		background: url(../static/index/dianzhang.png) no-repeat;
		background-size: 100%;
	}

	.eight {
		background: url(../static/index/tuibg.png) no-repeat;
		background-size: 100%;
	}

	.nonenone {
		max-height: 492rpx;

		.noneitem {
			margin: 0 30rpx;
			border-radius: 12rpx;
			background: #F7F7F7;
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 32rpx 36rpx;
			margin-bottom: 20rpx;

			.nonetext {
				font-size: 24rpx;
				font-weight: 500;
				color: #3A3A3A;
			}

			.noneint {
				width: 40%;
				padding-right: 10rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #3A3A3A;
				text-align: right;
			}

			.nonebi {
				font-size: 24rpx;
				font-weight: 500;
				color: #3A3A3A;
			}
		}

		.btn {
			margin-top: 48rpx;
			background: #427BFF;
			border-radius: 10rpx;
			padding: 14rpx 254rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.nonetextshow {
			text-align: center;
			margin-top: 24rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #6D7278;
		}
	}
</style>
