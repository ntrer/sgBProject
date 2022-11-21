<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 09:36:34
 * @Description: 目标分配-门店
-->
<template>
	<view class="allot-shop">
		<Header haveback></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<image src="../../static/allot/allot_team_bg.png" mode="scaleToFill" />
			</view>
			<view class="top-area-card">
				<view class="card-title">
					<text class="title">基础任务</text>
				</view>
				<view v-if="pageData !== null" class="card-info">
					<view class="card-info-left">
						<text class="top">
							订单数：
							<text>{{ pageData.all.order_num }}单</text>
						</text>
						<text class="bottom">
							订单数完成率：
							<text>{{ pageData.all.rate_order_num }}%</text>
						</text>
					</view>
					<view class="card-info-right">
						<text class="top">
							总销售额：
							<text>{{ pageData.all.sale }}元</text>
						</text>
						<text class="bottom">
							销售额完成率：
							<text>{{ pageData.all.rate_sale }}%</text>
						</text>
					</view>
				</view>
			</view>
			<view class="top-area-card">
				<view class="card-title">
					<text class="title">任务</text>
					<picker mode="selector" :range="phaseOptions" range-key="name" :value="phaseCur" @change="phaseChange">
						<text class="phase">切换阶段</text>
					</picker>
				</view>
				<view v-if="pageData !== null" class="card-info">
					<view class="card-info-left">
						<text class="top">
							订单数：
							<text>{{ pageData.stage.stage_order_num }}单</text>
						</text>
						<text class="bottom">
							订单数完成率：
							<text>{{ pageData.stage.stage_rate_order_num }}%</text>
						</text>
					</view>
					<view class="card-info-right">
						<text class="top">
							销售额：
							<text>{{ pageData.stage.stage_sale }}元</text>
						</text>
						<text class="bottom">
							销售额完成率：
							<text>{{ pageData.stage.stage_rate_sale }}%</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list-area">
			<view class="list-area-title">
				<view class="left">
					<text>
						门店
						<text>项目任务总控表</text>
					</text>
				</view>
				<text class="right">注：点击门店名查看个人信息</text>
			</view>
			<view class="list-area-content">
				<view v-for="(item, i) of listData" :key="i" class="item">
					<text class="index">{{ i + 1 }}</text>
					<view class="info">
						<view class="info-title">
							<text @click="toPerson(item)" class="info-title-left">{{ item.name }}>></text>
							<text @click="open(item)" class="info-title-right">编辑</text>
						</view>
						<view class="info-content">
							<view class="info-content-left">
								<text>总任务: {{ item.stage_order_num }}</text>
								<text>当前完成: {{ item.DoneStageOrderNum }}</text>
								<text>当前完成率: {{ item.stage_rate_order_num }}%</text>
							</view>
							<view class="info-content-right">
								<text>总额度: {{ item.stage_sale }}</text>
								<text>当前完成: {{ item.DoneStageSale }}</text>
								<text>当前完成率: {{ item.stage_rate_sale }}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 编辑门店任务弹框 -->
		<uni-popup ref="taskPopup" type="center" :mask-click="false">
			<view class="popup_box">
				<view class="proup_tit">编辑</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<view class="top-area">
						<view class="title">当前门店总任务</view>
						<view class="task-num">
							<view class="left">
								<text>订单数:{{ editShopOrder }}单</text>
							</view>
							<view class="right">
								<text>金额:{{ eidtShopSale }}元</text>
							</view>
						</view>
					</view>
					<view class="shop-name">{{ editShopName }}任务</view>
					<view class="input-box">
						<text>活动总金额数:</text>
						<input type="number" v-model.trim="editForm.sale" placeholder="请输入活动金额数" />
					</view>
					<view class="input-box">
						<text>活动总订单数:</text>
						<input type="number" v-model.trim="editForm.order_num" placeholder="请输入活动订单数" />
					</view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="saveAllot">保存</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageType: 'brand',
			page: 1,
			/* 页面底部列表数据 */
			listData: [],
			phaseOptions: [],
			phaseCur: 0,
			/* 获取到页面传的参数id */
			getId: null,
			/* 页面顶部数据 */
			pageData: null,
			/* 阶段id */
			stageId: null,
			/* 编辑任务提交的表单数据 */
			editForm: {
				id: '',
				order_num: '',
				sale: '',
				stage_id: '',
			},
			editShopName: '',
			editShopOrder: '',
			eidtShopSale: '',
		};
	},
	onLoad(options) {
		if (options.id) {
			this.getId = options.id;
		}
	},
	async onShow() {
		console.log(2);
		await this.getStage();
		this.getData();
		this.page = 1;
		this.listData = [];
		this.getList();
	},
	onReachBottom() {
		this.getList();
	},
	methods: {
		/**
		 * @description: 保存编辑的任务
		 */
		saveAllot() {
			let that = this;
			if (this.editForm.sale === '') {
				this.$Common.commonToast('请输入活动总金额数');
				return;
			}
			if (this.editForm.order_num === '') {
				this.$Common.commonToast('请输入活动总订单数');
				return;
			}
			this.$api.setStoreTarget(this.editForm, {
				success(res) {
					console.log(res);
					if (res.code === 200) {
						that.$Common.commonToast('操作成功');
						that.close();
						setTimeout(() => {
							that.page = 1;
							that.listData = [];
							that.getData();
							that.getList();
						}, 500);
					}
				},
			});
		},
		/**
		 * @description: 关闭编辑任务模态框
		 */
		close() {
			this.$refs.taskPopup.close();
			this.editForm = Object.assign({}, this.$options.data().editForm);
		},
		/**
		 * @description: 打开编辑任务模态框
		 */
		open(item) {
			console.log(item);
			this.editShopName = item.name;
			this.editForm.id = item.id;
			this.editForm.stage_id = this.stageId;
			this.editShopOrder = item.stage_order_num;
			this.eidtShopSale = item.stage_sale;
			this.$refs.taskPopup.open();
		},
		/**
		 * @description: 获取页面数据
		 */
		getData() {
			let that = this;
			let data = {
				id: this.getId,
				stage_id: this.stageId,
				type: this.pageType,
			};
			this.$api.TargetTaskAmount(data, {
				success(res) {
					that.pageData = res.data;
				},
			});
		},
		/**
		 * @description: 获取列表数据
		 */
		getList() {
			let that = this;
			let data = {
				id: this.getId,
				page: this.page,
				stage_id: this.stageId,
				type: this.pageType,
			};
			this.$api.memberTarget(data, {
				success(res) {
					if (res.data.length === 0) {
						that.$Common.commonToast('没有更多数据了');
						return;
					}
					that.listData = [...that.listData, ...res.data];
					that.page += 1;
				},
			});
		},
		/**
		 * @description: 获取所有阶段
		 */
		getStage() {
			return new Promise((resolve, reject) => {
				let that = this;
				this.$api.getTargetStage(
					{},
					{
						success(res) {
							if (res.data.length > 0) {
								that.phaseOptions = res.data;
								that.stageId = that.phaseOptions[that.phaseCur].id;
							}
							resolve();
						},
					}
				);
			});
		},
		/**
		 * @description: 监听阶段发生变化
		 */
		phaseChange(e) {
			console.log(e);
			this.stageId = this.phaseOptions[e.detail.value].id;
			this.phaseCur = e.detail.value;
			this.page = 1;
			this.listData = [];
			this.getData();
			this.getList();
		},
		toPerson(item) {
			this.$Common.commonJump('/pages/allot-person/allot-person?id=' + item.id);
		},
	},
};
</script>

<style lang="less">
.allot-shop {
	.top-area {
		&::before {
			content: '';
			display: table;
		}
		position: relative;
		&-bg {
			position: absolute;
			z-index: 0;
			width: 100%;
			height: 416rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		&-card {
			position: relative;
			z-index: 1;
			margin-left: 30rpx;
			width: 690rpx;
			background: #fff;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
			margin-top: 20rpx;
			border-radius: 20rpx;
			padding-bottom: 20rpx;
			&::before {
				content: '';
				display: table;
			}
			.card-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title {
					background: #f58836;
					border-radius: 0 999px 999px 0;
					margin-left: -1px;
					width: 128rpx;
					height: 48rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}
				.phase {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: @common;
					// position: absolute;
					// right: 30rpx;
					// top: 20rpx;
					margin-right: 30rpx;
					text-decoration: underline;
				}
			}
			.card-info {
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				&-left,
				&-right {
					width: 50%;
					display: flex;
					flex-flow: column nowrap;
					text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #6d7278;
						text {
							color: #000000;
						}
					}
					.bottom {
						margin-top: 16rpx;
					}
				}
			}
		}
	}
	.list-area {
		padding: 34rpx 30rpx 20rpx;
		&-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				padding-bottom: 2rpx;
				border-bottom: 4rpx solid @common;
				text {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: @common;
					text {
						font-size: 28rpx;
						margin-left: 10rpx;
					}
				}
			}
			.right {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #6d7278;
			}
		}
		&-content {
			padding: 10rpx 0 20rpx;
			.item {
				padding: 12rpx 20rpx;
				display: flex;
				border-radius: 12rpx;
				background: #f7f7f7;
				margin-top: 10rpx;
				.index {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.info {
					flex: 1;
					margin-left: 30rpx;
					&-title {
						display: flex;
						justify-content: space-between;
						align-items: center;

						&-left {
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 550;
							color: #3a3a3a;
							text-decoration: underline;
						}
						&-right {
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: @common;
							text-decoration: underline;
						}
					}
					&-content {
						display: flex;
						&-left,
						&-right {
							width: 50%;
							display: flex;
							flex-flow: column nowrap;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #120000;
							text {
								margin-top: 20rpx;
							}
						}
					}
				}
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
			font-size: 30rpx;
			color: #333333;
			padding: 0 36rpx;
			.top-area {
				.task-num {
					display: flex;
					.left,
					.right {
						font-size: 26rpx;
						width: 50%;
						margin-top: 10rpx;
					}
				}
			}
			.shop-name {
				margin-top: 30rpx;
			}
			.input-box {
				margin-top: 20rpx;
				padding: 20rpx;
				background: #f7f7f7;
				border-radius: 10rpx;
				font-size: 26rpx;
				input {
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}
		}
		.proup_bottom {
			margin: 34rpx 36rpx 0rpx 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.proup_btn1 {
				width: 100%;
				padding: 13rpx 0;
				font-size: 32rpx;
				font-weight: 500;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.proup_btn1 {
				color: #ffffff;
				background: @common;
			}
		}
	}
}
</style>
