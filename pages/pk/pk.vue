<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-31 11:21:35
 * @Description: 战区PK大矩阵
-->
<template>
	<view class="pk-wrap">
		<Header :notitle="pageTitle + 'PK大矩阵'" haveback></Header>
		
		<view class="top-line"></view>
		<view class="pking-area">
			<view class="pking-area-title">
				<text>正在PK{{ pageTitle }}</text>
			</view>
			<view class="pking-area-content">
				<view @click="toBattle(item)" v-for="(item, i) of listData" :key="i" class="content-item">
					<text class="index">{{ i + 1 }}</text>
					<view class="ratio-wrap">
						<view :style="`width:${item.reat || 50}%`" class="left-ratio">
							<text class="team">{{ item.alliance[0].name }}</text>
							<view class="middle-box">
								<view class="border-box"></view>
								<view class="icon">
									<image src="../../static/pk/pk_icon.png" mode="scaleToFill" />
								</view>
							</view>
						</view>

						<view class="right-ratio" :style="`width:${100 - (item.reat || 50)}%`">
							<text class="team">{{ item.tribe[0].name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="middle-line"></view>
		<view class="select-area">
			<view @click="open(0)" class="select-area-item">
				<text>
					我的{{ pageTitle
          }}{{ myCur !== null ? '-' + modelList[myCur].name : '' }}
				</text>
				<view class="icon">
					<image src="../../static/pk/right_gray.png" mode="scaleToFill" />
				</view>
			</view>
			<view @click="open(1)" class="select-area-item">
				<text>
					选择要挑战的{{ pageTitle
          }}{{ battleCur !== null ? '-' + modelList[battleCur].name : '' }}
				</text>
				<view class="icon">
					<image src="../../static/pk/right_gray.png" mode="scaleToFill" />
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view @click="handlePk" class="btn">
				<text>开始PK</text>
			</view>
		</view>
		<!-- 选择我的战队弹框 -->
		<uni-popup ref="areaPopup" type="center" :mask-click="false">
			<view class="popup_box">
				<view class="proup_tit">切换{{ pageTitle }}</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close(0)"></image>
				</view>
				<view class="proup_content">
					<scroll-view class="vip-cards" scroll-y="true" show-scrollbar="false">
						<view class="proup_li" @click="changeactive(i)" v-for="(item, i) of modelList" :key="i">
							<view class="proup_li_left">{{ item.name }}</view>
							<view class="proup_li_right">
								<view v-if="modelCur === 0" class="proup_yuan" :class="myCur === i ? 'active' : ''">
								</view>
								<view v-else-if="modelCur === 1" class="proup_yuan"
									:class="battleCur === i ? 'active' : ''"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close(0)">取消</view>
					<view class="proup_btn2" @click="close(1)">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTitle: '',
				/* 页面类型 0战区 1战队 2门店 */
				pageType: 0,
				page: 1,
				total: 0,
				/* 当前正在pk的 战区/战队/门店 数据 */
				listData: [],
				/* 当前选中的我的 战区/战队/门店 */
				myCur: null,
				/* 当前选中对方的 战区/战队/门店 */
				battleCur: null,
				/* 模态框显示的可选 战区/战队/门店 */
				modelList: [],
				/* 模态框类型 0选择我的 战区/战队门店 1选择要挑战的 战区/战队/门店 */
				modelCur: null
			}
		},
		onLoad(op) {
			if (op.data) {
				let data = JSON.parse(decodeURIComponent(op.data))
				this.pageType = data.pageType
				switch (data.pageType) {
					case 0:
						this.pageTitle = '战区'
						this.getOnPkingList()
						this.getCanPkList()
						break
					case 1:
						this.pageTitle = '战队'
						this.getOnPkingList()
						this.getCanPkList()
						break
					case 2:
						this.pageTitle = '个人'
						break
				}
			}
		},
		onReachBottom() {
			this.getOnPkingList()
		},
		methods: {
			/**
			 * @description: 跳转到battle页面
			 * @param {*} item 当前点击项的数据
			 */
			toBattle(item) {
				this.$Common.commonJump(
					'/pages/battle/battle?id=' + item.id + '&type=' + this.pageType
				)
			},
			/**
			 * @description: 获取可以选择PK的战区/战队/门店
			 */
			getCanPkList() {
				let that = this
				let api = null
				if (this.pageType === 0) api = that.$api.getZhanPk
				if (this.pageType === 1) api = that.$api.getBrandPk
				api({}, {
					success(res) {
						console.log(res)
						that.modelList = res.data
					}
				})
			},
			/**
			 * @description: 获取正在pk的战区/战队/门店
			 */
			getOnPkingList() {
				let that = this
				let api = null
				if (this.pageType === 0) api = that.$api.zhanPkList
				if (this.pageType === 1) api = that.$api.brandPkList
				// if (this.pageType === 2) api = that.$api.actMemberPkList
				if (this.page !== 1 && this.listData.length >= this.total) {
					this.$Common.commonToast('暂无更多数据')
					return
				}
				api({}, {
					success(res) {
						console.log(res)
						that.total = res.data.total
						that.listData = [...that.listData, ...res.data.data]
						that.page += 1
					}
				})
			},
			/**
			 * @description: 点击PK按钮
			 */
			handlePk() {
				let that = this
				if (this.myCur === null) {
					this.$Common.commonToast('请选择我的战队')
					return
				}
				if (this.battleCur === null) {
					this.$Common.commonToast('请选择要挑战的战队')
					return
				}
				let api = null
				if (this.pageType === 0) api = this.$api.setZhanPk
				if (this.pageType === 1) api = this.$api.setBrandPk
				api({
					alliance_id: '' + that.modelList[that.myCur].id,
					tribe_id: '' + that.modelList[that.battleCur].id
				}, {
					success(res) {
						console.log(res)
						that.$Common.commonToast('操作成功', 'success')
						setTimeout(() => {
							let data = {
								id: res.data
							}
							that.toBattle(data)
						}, 500)
					}
				})
				// this.$Common.commonJump('/pages/battle/battle')
			},
			/**
			 * @description: 监听选择项发生变化
			 */
			changeactive(e) {
				if (this.modelCur === 0) {
					if (this.myCur === e) {
						this.myCur = null
						return
					}
					this.myCur = e
				}
				if (this.modelCur === 1) {
					if (this.battleCur === e) {
						this.battleCur = null
						return
					}
					this.battleCur = e
				}
			},
			/**
			 * @description: 关闭选择弹框
			 */
			close(e) {
				/* 选择我的pk */
				if (this.modelCur === 0) {
					if (e === 0) {
						this.myCur = null
					}
				}
				/* 选择pk对方 */
				if (this.modelCur === 1) {
					if (e === 0) {
						this.battleCur = null
					}
				}
				this.$refs.areaPopup.close()
			},
			/**
			 * @description: 打开选择弹框
			 * @param {*} e 点击的选择框标识
			 */
			open(e) {
				this.modelCur = e
				this.$refs.areaPopup.open()
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f5f6f8;
	}
	
	.pk-wrap {
		// margin-top: 20rpx;
		background: #ffffff;

		.top-line {
			// width: 100%;
			height: 20rpx;
			background: #f5f6f8;
		}

		.pking-area {
			padding: 0 30rpx;

			// background: #ffffff;
			&-title {
				padding: 28rpx 0 0;

				text {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
			}

			&-content {
				.content-item {
					display: flex;
					height: 88rpx;
					align-items: center;
					margin-top: 30rpx;

					.index {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(0, 0, 0, 0.85);
					}

					.ratio-wrap {
						height: 100%;
						flex: 1;
						margin-left: 18rpx;
						border-radius: 8rpx;
						overflow: hidden;
						background: #080808;
						display: flex;
						align-items: center;

						.left-ratio {
							height: 100%;
							display: flex;
							justify-content: flex-end;
							align-items: center;
							background: #e20808;
							position: relative;

							text {
								margin-right: 44rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #ffffff;
								white-space: nowrap;
							}

							.middle-box {
								width: 88rpx;
								height: 88rpx;
								right: -44rpx;

								position: absolute;
								display: flex;
								justify-content: center;
								align-items: center;

								.border-box {
									position: absolute;
									border-right: 88rpx solid #080808;
									border-bottom: 88rpx solid #e20808;
								}

								.icon {
									position: relative;
									z-index: 5;
									width: 74rpx;
									height: 74rpx;

									image {
										width: 100%;
										height: 100%;
									}
								}
							}
						}

						.right-ratio {
							height: 100%;
							display: flex;
							justify-content: flex-start;
							align-items: center;

							// flex: 1;
							text {
								margin-left: 44rpx;
								white-space: nowrap;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #ffffff;
							}
						}
					}
				}
			}
		}

		.middle-line {
			width: 690rpx;
			margin-left: 30rpx;
			border-top: 1px solid #d0cdcd;
			margin-top: 80rpx;
			background: #ffffff;
		}

		.select-area {
			padding: 0 48rpx;
			background: #ffffff;

			&::before {
				content: '';
				display: table;
			}

			&-item {
				border-radius: 8rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 0 16rpx;
				height: 88rpx;
				border: 1px solid rgba(0, 0, 0, 0.1);
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.85);
				}

				.icon {
					width: 26rpx;
					height: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.bottom-btn {
			display: flex;
			justify-content: center;
			padding: 20rpx 30rpx;
			background: #ffffff;

			.btn {
				width: 308rpx;
				height: 70rpx;
				background: @common;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}

		/* 弹窗布局 */
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
				top: 5%;

				.close_icon {
					width: 26rpx;
					height: 26rpx;
				}
			}

			.proup_content {
				max-height: 304rpx;

				// padding: 0 32rpx;
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

							&.active {
								background: @common;
							}
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
	}
</style>
