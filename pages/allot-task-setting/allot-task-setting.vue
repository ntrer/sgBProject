<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 09:36:34
 * @Description: 目标分配-任务设置
-->
<template>
	<view class="allot-task-setting">
		<Header haveback></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<image src="../../static/allot/allot_team_bg.png" mode="scaleToFill" />
			</view>
			<view class="top-area-card">
				<text class="card-title">活动任务</text>
				<view class="card-info">
					<view class="card-info-top">
						<view class="left">
							<text>
								总任务：
								<text>{{ allinfo.order_num }}单</text>
							</text>
						</view>
						<view class="right">
							<text>
								总金额：
								<text>{{ allinfo.sale }}元</text>
							</text>
						</view>
					</view>
					<view class="card-info-bottom">
						<text class="date">
							{{ allinfo.start_time }}
							<text>至</text>
							{{ allinfo.end_time }}
						</text>
					</view>
				</view>
			</view>
			<view class="top-area-form">
				<text class="card-title">阶段任务</text>
				<view v-for="(item, i) of formList" :key="i" class="card-info">
					<view class="card-info-top">
						<view class="left">
							<!-- <text>第{{ returnCnNum(i + 1) }}阶段：</text> -->
							<text>第{{ i + 1 }}阶段：</text>
						</view>
						<view class="right">
							<picker mode="date" :value="formList[i].start_time" @change="startDateChange($event, i)" :end="formList[i].end_time">
								<text>
									{{ formList[i].start_time ? formList[i].start_time : '开始时间' }}
								</text>
							</picker>
							<text class="middle-text">至</text>
							<picker mode="date" :value="formList[i].end_time" @change="endDateChange($event, i)" :start="formList[i].start_time" :disabled="formList[i].start_time === ''">
								<text>
									{{ formList[i].end_time ? formList[i].end_time : '结束时间' }}
								</text>
							</picker>
						</view>
					</view>
					<view class="card-info-bottom">
						<text class="left">百分比：</text>
						<view class="input-box">
							<input v-model.number="formList[i].percentage" type="text" placeholder="输入百分比" />
							<text>%</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 两个按钮 -->
		<view class="btn-list">
			<view @click="addTask" class="btn-list-btn">
				<text>新增阶段</text>
			</view>
			<view @click="handleSave" class="btn-list-btn">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formItem: {
				start_time: '',
				end_time: '',
				percentage: '',
			},
			formList: [],
			datainfo: {},
			allinfo: {},
			returndata: [],
		};
	},
	onLoad(options) {
		this.formList.push(Object.assign({}, this.formItem));

		this.$api.TargetTaskAmount(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.datainfo = ret.data;
						this.allinfo = ret.data.all;
					}
				},
			}
		);
		this.getPhaseTask();
	},
	methods: {
		/**
		 * @description: 获取阶段任务
		 */
		getPhaseTask() {
			let that = this;

			this.$api.getTargetStage(
				{},
				{
					success(res) {
						that.formList = res.data;
					},
				}
			);
		},
		returnCnNum(e) {
			if (e > 10) return '';
			switch (e) {
				case 1:
					return '一';
				case 2:
					return '二';
				case 3:
					return '三';
				case 4:
					return '四';
				case 5:
					return '五';
				case 6:
					return '六';
				case 7:
					return '七';
				case 8:
					return '八';
				case 9:
					return '九';
				case 10:
					return '十';
			}
		},
		startDateChange(e, i) {
			console.log(e);
			console.log(i);
			this.formList[i].start_time = e.detail.value;
		},
		endDateChange(e, i) {
			console.log(e);
			console.log(i);
			this.formList[i].end_time = e.detail.value;
		},
		phaseChange(e) {},
		/**
		 * @description: 点击新增阶段按钮
		 */
		addTask() {
			if (this.formList.length === 10) {
				this.$Common.commonToast('最多添加10个阶段');
				return;
			}
			this.formList.push(Object.assign({}, this.formItem));
		},
		/**
		 * @description: 点击保存按钮
		 */
		handleSave() {
			let that = this;
			let bool = '';
			this.formList.forEach((item) => {
				if (item.start_time === '') {
					bool = 'start';
				}
				if (item.end_time === '' && bool === '') {
					bool = 'end';
				}
				if (item.percentage === '' && bool === '') {
					bool = 'percentage';
				}
			});
			if (bool === 'start') {
				this.$Common.commonToast('开始时间不能为空');
				return;
			}
			if (bool === 'end') {
				this.$Common.commonToast('结束时间不能为空');
				return;
			}
			if (bool === 'percentage') {
				this.$Common.commonToast('百分比不能为空');
				return;
			}
			let data = this.formList.map((item) => {
				return [item.start_time, item.end_time, item.percentage];
			});
			// console.log(data)
			this.$api.addTargetStage(
				{
					data_all: data,
				},
				{
					success(res) {
						that.$Common.commonToast('操作成功', 'success');
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
						}, 500);
					},
				}
			);
		},
		toShop() {
			this.$Common.commonJump('/pages/allot-shop/allot-shop');
		},
	},
};
</script>

<style lang="less">
.allot-task-setting {
	padding-bottom: 20rpx;
	.top-area {
		&::before {
			content: '';
			display: table;
		}
		position: relative;
		&-bg {
			position: absolute;
			z-index: -1;
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
				position: absolute;
				right: 30rpx;
				top: 20rpx;
				text-decoration: underline;
			}
			.card-info {
				padding: 0 20rpx;
				// display: flex;
				// align-items: center;
				// margin-top: 20rpx;
				&-top,
				&-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 16rpx;
					.left,
					.right {
						width: 50%;
						text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #6d7278;
							text {
								color: #000000;
							}
						}
					}
					.date {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #6d7278;
						text {
							color: #000000;
							margin: 0 10rpx;
						}
					}
				}
			}
		}
		&-form {
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

			.card-info {
				padding: 0 40rpx;
				// display: flex;
				// align-items: center;
				margin-top: 20rpx;
				&-top,
				&-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left,
					.right {
						text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #6d7278;
							text {
								color: #000000;
							}
						}
					}
					.right {
						// width: 70%;
						display: flex;
						justify-content: flex-end;
					}
				}
				&-top {
					margin-top: 38rpx;
					.right {
						display: flex;
						align-items: flex-end;
						text {
							text-decoration: underline;
						}
						.middle-text {
							margin: 0 10rpx;
							color: #000000;
							text-decoration: none;
						}
					}
				}
				&-bottom {
					margin-top: 60rpx;

					.left {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #6d7278;
					}
					.input-box {
						width: 60%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						input {
							text-align: center;
							width: 50%;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #6d7278;
						}
					}
				}
			}
		}
	}
	.btn-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 20rpx;
		&-btn {
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
