<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-31 15:26:04
 * @Description: PK大作战
-->
<template>
	<view class="battle-wrap">
		<Header haveback></Header>
		<view class="fixed_shai" @click="show">
			<text class="change_text">筛选</text>
			<image src="../../static/data_bi/iocn_bottom.png" mode="" class="change_img"></image>
		</view>
		<view class="top-card">
			<view class="top-card-title">
				<text>
					倒计时
					<text v-if="countdownData">
						{{ countdownData.endDay }}天{{ countdownData.endHours }}时{{
              countdownData.endMinute
            }}分{{ countdownData.endSeconds }}秒
					</text>
				</text>
			</view>
			<view class="top-card-bg">
				<image src="../../static/pk/battle_bg.png" mode="scaleToFill" />
				<!-- <view class="out-team">
          <text>我方</text>
        </view>
        <view class="icon">
          <image src="../../static/pk/pk_icon.png" mode="scaleToFill" />
        </view>
        <view class="other-team">
          <text>对方</text>
        </view> -->
			</view>
			<view v-if="pageData" class="team-name">
				<text>{{ pageData.alliance_brand_name[0] }}</text>
				<text>{{ pageData.tribe_brand_name[0] }}</text>
			</view>
		</view>
		<view class="battle-detail">
			<view v-if="pageData" class="battle-detail-title">
				<text>获胜方: {{ pageData.winner }}</text>
			</view>
			<view class="battle-detail-content">
				<view v-for="(item, i) of newlistData" :key="i" class="content-item">
					<text class="item-title">{{ item.name }}</text>
					<view class="progress-area">
						<text class="left-num">{{ item.self }}</text>
						<view class="left-progress-wrap">
							<view :style="`width:${Math.round((item.self / maxNum) * 100)}%`" class="progress"></view>
						</view>
						<view class="right-progress-wrap">
							<view :style="`width:${Math.round((item.other / maxNum) * 100)}%`" class="progress"></view>
						</view>
						<text class="right-num">{{ item.other }}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">筛选</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<view class="proup_item" v-for="item,ii in listData" :key='ii' @click="changeproup(ii)" :class="item.show?'proup_act':''">
						{{item.name}}
					</view>
				</view>
				<!-- <view class="proup_bottom">
					<view class="proup_btn1" @click="close">取消</view>
					<view class="proup_btn2" @click="close('api')">确定</view>
				</view> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxNum: 0,
				pageType: '',
				listData: [],
				pageData: null,
				countdownData: null,
				pkId: null,
				ishow: false,
				act:[],
				newlistData:[],
			}
		},
		watch:{
			act(val){
				var yarray = []
				for(let n in this.listData){
					let rt = val.indexOf(this.listData[n].name)
					if(rt != -1){
						yarray.push(this.listData[n])
					}
				}
				if(yarray.length < 1){
					console.log(12312)
					this.newlistData = this.listData
				}else{
					this.newlistData = yarray
				}
				console.log(this.newlistData)
			}
		},
		onLoad(options) {
			if (options.id && options.type) {
				this.pkId = options.id
				this.pageType = options.type
				this.getData()
			}
		},
		methods: {
			changeproup(ii){
				let changename = this.listData[ii].name
				this.listData[ii].show = !this.listData[ii].show
				let num = this.act.indexOf(changename)
				if(num == -1){
					this.act.push(changename)
				}else{
					this.act.splice(num,1)
				}
				
			},
			show() {
				this.$refs.popup.open('center')
			},
			close(data) {
				this.$refs.popup.close()
				if(this.activeid == ''){
					return
				}
				if (data == 'api') {

				}
			},
			/**
			 * @description: 计算倒计时
			 */
			calcCountdown(endTimeDate) {
				var timeNum = endTimeDate * 1
				var nowtime = new Date(), //获取当前时间
					endtime = new Date(timeNum) //定义结束时间
				// console.log(endtime)
				var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
					endDay = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
					endHours = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
					endMinute = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
					endSeconds = Math.floor((lefttime / 1000) % 60) //计算秒数

				setTimeout(() => {
					this.calcCountdown(timeNum)
				}, 1000)

				var params = {}
				params = {
					endDay,
					endHours,
					endMinute,
					endSeconds
				}
				// console.log(params)
				this.countdownData = params
			},
			/**
			 * @description: 获取pk的数据
			 */
			getData() {
				let that = this
				let api = null
				if (this.pageType === '0') api = that.$api.getZhanPkInfo
				if (this.pageType === '1') api = that.$api.getBrandPkInfo
				api({
					pk_id: that.pkId
				}, {
					success(res) {
						// console.log(res)
						that.pageData = res.data
						that.calcCountdown(res.data.countdown * 1000)
						that.$api.rewardLlocationPk({}, {
							success(data) {
								var new_pkInfoList = []
								var maxNum = 0
								for (var i in data.data) {
									var pkInfo_item = {}
									pkInfo_item.show = false
									pkInfo_item.name = data.data[i]
									pkInfo_item.self = res.data.alliance_num[i]
									if (res.data.alliance_num[i] * 1 > maxNum) {
										maxNum = res.data.alliance_num[i] * 1
									}
									if (res.data.tribe_num[i] * 1 > maxNum) {
										maxNum = res.data.tribe_num[i] * 1
									}
									pkInfo_item.other = res.data.tribe_num[i]
									new_pkInfoList.push(pkInfo_item)
								}
								console.log(111, new_pkInfoList)
								that.maxNum = maxNum
								that.listData = new_pkInfoList
								that.newlistData = new_pkInfoList
								// this.setState({
								//   pkInfoList: new_pkInfoList,
								//   maxNum
								// })
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f5f6f8;
	}

	.fixed_shai {
		position: fixed;
		top: 30rpx;
		right: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #333;
		z-index: 9;

		.change_text {
			margin-right: 10rpx;
		}

		.change_img {
			width: 26rpx;
			height: 26rpx;
			vertical-align: middle;
		}
	}

	.battle-wrap {
		margin-top: 20rpx;

		.top-card {
			padding: 26rpx 30rpx 20rpx;
			background: #fff;

			&-title {
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					font-size: 42rpx;
					font-family: Helvetica;
					color: #ec1a3b;
					font-weight: bold;

					text {
						color: rgba(0, 0, 0, 0.85);
						font-size: 32rpx;
						font-weight: bold;
						font-style: italic;
						margin-left: 10rpx;
					}
				}
			}

			&-bg {
				margin-top: 20rpx;
				height: 144rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

				// .out-team,
				// .other-team {
				//   height: 100%;
				//   width: 50%;
				//   display: flex;
				//   justify-content: center;
				//   align-items: center;
				//   text {
				//     font-size: 42rpx;
				//     font-style: italic;
				//     font-weight: bold;
				//     color: #fff;
				//   }
				// }
				// .out-team {
				//   background: #f40000;
				// }
				// .other-team {
				//   background: #000000;
				// }
				// .icon {
				//   position: absolute;
				//   width: 144rpx;
				//   height: 144rpx;

				//   image {
				//     width: 100%;
				//     height: 100%;
				//   }
				// }
			}

			.team-name {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;

				text {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.85);
				}
			}
		}

		.battle-detail {
			margin-top: 20rpx;
			padding: 0 30rpx 40rpx;
			background: #fff;

			&-title {
				padding: 22rpx 0 14rpx;
				display: flex;
				justify-content: center;

				text {
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.85);
				}
			}

			&-content {
				width: 100%;

				.content-item {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					width: 100%;

					&+.content-item {
						margin-top: 40rpx;
					}

					.item-title {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(0, 0, 0, 0.85);
					}

					.progress-area {
						margin-top: 8rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.left-num,
						.right-num {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 100rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(0, 0, 0, 0.85);
						}

						.left-num {
							justify-content: flex-start;
						}

						.right-num {
							justify-content: flex-end;
						}

						.left-progress-wrap,
						.right-progress-wrap {
							flex: 1;

							.progress {
								height: 16rpx;
							}
						}

						.left-progress-wrap {
							display: flex;
							justify-content: flex-end;

							.progress {
								border-radius: 999px 0 0 999px;
								background: #f70000;
							}
						}

						.right-progress-wrap {
							.progress {
								border-radius: 0 999px 999px 0;
								background: #000000;
							}
						}
					}
				}
			}
		}
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
			padding: 0 12rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.proup_item{
				width: 30%;
				padding: 20rpx 0;
				text-align: center;
				background-color: #dfdfdf;
				color: #333;
				margin-bottom: 22rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
			}
			.proup_act{
				color: #fff;
				background-color: @common;
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
