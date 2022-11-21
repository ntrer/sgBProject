<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 09:36:34
 * @Description: 目标分配-个人
-->
<template>
	<view class="allot-person">
		<Header haveback></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<image src="../../static/allot/allot_team_bg.png" mode="scaleToFill" />
			</view>
			<view class="top-area-card">
				<view class="card-title">
					<text class="title">基础任务</text>
				</view>
				<view v-if="pageData" class="card-info">
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
				<view v-if="pageData" class="card-info">
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
		<view class="change-task">
			<view @click="toChangePersonTask" class="change-task-btn">
				<text>员工调整任务</text>
			</view>
		</view>
		<view class="list-area">
			<view class="list-area-title">
				<view class="left">
					<text>
						个人
						<text>项目任务总控表</text>
					</text>
				</view>
				<!-- <text class="right">注：点击门店名查看个人信息</text> -->
			</view>
			<view class="list-area-content">
				<view v-for="(item, i) of listData" :key="i" class="item">
					<text class="index">{{ i + 1 }}</text>
					<view class="info">
						<view class="info-title">
							<text class="info-title-left">
								{{ item.name }}
							</text>
							<!-- <text class="info-title-right">编辑</text> -->
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageType: 'store',
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
		toChangePersonTask() {
			this.$Common.commonJump('/pages/change-person-task/change-person-task?id=' + this.getId);
		},
	},
};
</script>

<style lang="less">
.allot-person {
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
	.change-task {
		margin-top: 20rpx;
		padding: 0 30rpx;
		&-btn {
			width: 690rpx;
			height: 70rpx;
			border-radius: 10rpx;
			background: @common;
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
							// text-decoration: underline;
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
}
</style>
