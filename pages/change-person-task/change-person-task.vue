<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 09:36:34
 * @Description: 目标分配-员工任务调整
-->
<template>
	<view class="change-person-task">
		<Header haveback></Header>
		<view class="top-area">
			<view class="top-area-bg"></view>
			<view class="top-area-card">
				<view class="card-title">
					<text class="title">当前门店总任务</text>
				</view>
				<view v-if="pageData" class="card-info">
					<view class="card-info-left">
						<text class="top">
							订单数：
							<text>{{ pageData.all.order_num }}单</text>
						</text>
					</view>
					<view class="card-info-right">
						<text class="top">
							金额：
							<text>{{ pageData.all.sale }}元</text>
						</text>
					</view>
				</view>
			</view>
			<view class="top-area-card">
				<view class="card-title">
					<text class="title">当前阶段总任务</text>
				</view>
				<view v-if="pageData" class="card-info">
					<view class="card-info-left">
						<text class="top">
							订单数：
							<text>{{ pageData.stage.stage_order_num }}单</text>
						</text>
					</view>
					<view class="card-info-right">
						<text class="top">
							金额：
							<text>{{ pageData.stage.stage_sale }}元</text>
						</text>
					</view>
				</view>
			</view>
			<view class="list-area">
				<view class="title">
					<view class="title-left">
						<text>任务</text>
					</view>
					<picker mode="selector" :range="phaseOptions" range-key="name" :value="phaseCur" @change="phaseChange">
						<text class="title-right">切换阶段</text>
					</picker>
				</view>
				<view class="content">
					<view v-for="(item, i) of listData" :key="i" class="content-item">
						<view class="item-wrap">
							<text class="name">{{ item.name }}</text>
							<view class="input-box">
								<view class="left-title">
									<text>订单数:</text>
								</view>
								<input type="number" v-model.trim="item.order" placeholder="请输入订单数" />
								<view class="right-unit">
									<text>单</text>
								</view>
							</view>
							<view class="input-box">
								<view class="left-title">
									<text>金额:</text>
								</view>
								<input type="number" v-model.trim="item.sale" placeholder="请输入金额" />
								<view class="right-unit">
									<text>元</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-group">
			<view @click="handleCancel" class="btn">
				<text>取消</text>
			</view>
			<view @click="handleSave" class="btn">
				<text>保存</text>
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
		await this.getStage();
		this.getData();
		this.page = 1;
		this.listData = [];
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
					that.listData = res.data.map((item) => {
						return {
							id: item.id,
							name: item.name,
							order: '',
							sale: '',
						};
					});
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
		handleCancel() {
			uni.navigateBack();
		},
		/**
		 * @description: 保存员工任务
		 */
		handleSave() {
			console.log(this.formList);
			let data = [];
			let that = this;
			data = this.listData.map((item) => {
				return [item.id, item.order, item.sale];
			});
			this.$api.setStaffTarget(
				{
					data_all: data,
					stage_id: that.stageId,
				},
				{
					success(res) {
						if (res.code === 200) {
							that.$Common.commonToast('操作成功', 'success');
							setTimeout(() => {
								that.getData();
								that.getList();
							}, 500);
						}
					},
				}
			);
		},
	},
};
</script>

<style lang="less">
.change-person-task {
	padding-bottom: 20rpx;
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
			height: calc(100% - 20rpx);
			background: linear-gradient(to bottom, #2d9df1, #3b8af8);
			// opacity: .7;
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
					width: 202rpx;
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
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				&-left,
				&-right {
					padding: 28rpx 0;
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
		.list-area {
			position: relative;
			z-index: 1;
			width: 690rpx;
			margin-left: 30rpx;
			margin-top: 20rpx;
			padding: 20rpx 0;
			background: #fff;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				&-left {
					width: 128rpx;
					height: 48rpx;
					background: #f58836;
					border-radius: 0px 999px 999px 0px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: -1px;
					text {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
					}
				}
				&-right {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: @common;
					text-decoration: underline;
					margin-right: 20rpx;
				}
			}
			.content {
				padding: 0 20rpx;

				&-item {
					margin-top: 20rpx;
					padding: 0 24rpx 20rpx;
					background: #f7f7f7;
					border-radius: 12rpx;

					.item-wrap {
						display: flex;
						flex-flow: column nowrap;
						width: 50%;
						.name,
						.input-box {
							margin-top: 24rpx;
							display: inline-block;
						}
						.name {
							font-size: 24rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #3a3a3a;
						}
						.input-box {
							display: flex;
							// justify-content: flex-end;
							align-items: center;
							.left-title {
								width: 100rpx;
							}
							input {
								flex: 1;
							}
							text,
							input {
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #120000;
							}
							.list-unit {
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}
	.btn-group {
		padding: 0 30rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.btn {
			width: 324rpx;
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
}
</style>
