<template>
	<view class="pooltask">
		<Header haveback="true"></Header>
		<view class="xian"></view>
		<view class="tab_box">
			<view class="tab_item" v-for="(item, index) in tab" :key="index" @click="changtab(index)" :class="act == index ? 'acted' : ''">
				{{ item }}
			</view>
		</view>
		<view class="box" v-if="act == 0">
			<view class="item" v-for="(item, index) in leftlist" :key="index">
				<view class="item_left">
					<text class="text">{{ item[1] }}</text>
				</view>
				<view class="item_right">
					<input type="text" value="" class="input" placeholder="请输入" v-model="item[2]" placeholder-style="color:#6D7278" />
				</view>
			</view>
			<view class="btn" @click="leftbtn">保存设置</view>
		</view>
		<view class="box" v-if="act == 1">
			<view class="right_li" v-for="(item, index) in rightlist" :key="item.id">
				<view class="right_top">
					<view class="right_top_left">
						{{ item.name }}
					</view>
					<view class="right_top_right">
						起止时间:
						<text class="text">{{ item.start_time }}至{{ item.end_time }}</text>
					</view>
				</view>
				<view class="right_bot" v-if="!item.ishsow">阶段已结束</view>
				<view class="right_bot" v-else>
					<view class="right_bot_text" @click="goallocation(item.id)">任务分配</view>
					<view class="right_bot_text" @click="gotask(item.id)">任务执行情况</view>
				</view>
			</view>
			<view class="btn" @click="gonew">添加</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tab: ['奖励豆设置', '品牌任务划分'],
			act: 0,

			returnobj: {},
			leftlist: [],
			rightlist: [],
			today: '',
		};
	},
	onShow() {
		console.log(this.today);
		this.$api.getAllStage(
			{},
			{
				success: (ret) => {
					console.log(ret);
					this.rightlist = ret.data;
					this.rightlist.map((item) => {
						var tt = new Date(item.end_time);
						this.today = new Date();
						if (this.today < tt) {
							item.ishsow = true;
						} else {
							item.ishsow = false;
						}
					});
					console.log(this.rightlist);
				},
			}
		);
		this.getdata();
	},
	methods: {
		//获取数据
		getdata() {
			this.leftlist = [];
			this.$api.getBonusBeans(
				{},
				{
					success: (ret) => {
						this.returnobj = ret.data;
						this.leftobj = ret.data.type;
						var arr = [];
						var number = 0;
						for (var var1 in this.leftobj) {
							var obj = [];
							obj[0] = var1;
							obj[1] = this.leftobj[var1];
							for (var var2 in this.returnobj) {
								if (var1 == var2) {
									obj[2] = this.returnobj[var2];
								}
							}
							this.leftlist.push(obj);
						}
					},
				}
			);
		},
		gonew() {
			this.$Common.commonJump('pages/newpooltask/newpooltask');
		},
		//选择签单类型
		changtab(index) {
			this.act = index;
		},
		DatePicker(type, blean) {
			//显示
			console.log(blean);
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
			this.isstart = blean;
		},
		//保存
		leftbtn() {
			var params = {};
			for (var x in this.returnobj) {
				for (var y of this.leftlist) {
					if (x == y[0]) {
						params[y[0]] = y[2];
					}
				}
			}
			this.$api.setBonusBeans(params, {
				success: (ret) => {
					this.$Common.commonToast(ret.msg);
					setTimeout(() => {
						this.getdata();
					}, 400);
				},
			});
		},
		goallocation(id) {
			this.$Common.commonJump('pages/allocation/allocation?id=' + id);
		},
		gotask(id) {
			this.$Common.commonJump('pages/task/task?id=' + id);
		},
	},
};
</script>

<style lang="less" scoped>
.pooltask {
	padding-bottom: 35rpx;
}

.xian {
	width: 100%;
	background-color: #ededed;
	height: 20rpx;
}

.tab_box {
	margin-top: 24rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0 80rpx;

	.tab_item {
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		padding-bottom: 2rpx;
		border-bottom: 4rpx solid transparent;
	}

	.acted {
		color: @common;
		border-bottom: 4rpx solid @common;
	}
}

.box {
	margin: 0 30rpx;
	margin-top: 30rpx;

	.right_li {
		padding: 25rpx;
		border-bottom: 1rpx solid #6666;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.right_top {
			width: 80%;

			.right_top_left {
				color: #333;
				font-size: 28rpx;
			}

			.right_top_right {
				margin-top: 12rpx;
				font-size: 24rpx;
				color: #333;
				.text {
					margin-left: 8rpx;
				}
			}
		}

		.right_bot {
			width: 25%;
			color: @common;
			font-size: 24rpx;
			.right_bot_text {
				color: @common;
				font-size: 24rpx;
				margin-bottom: 8rpx;
			}
		}
	}

	.item {
		margin-bottom: 18rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f7f7f7;
		border-radius: 12rpx;
		padding: 46rpx 28rpx;

		.item_left {
			display: flex;
			align-items: center;

			.text {
				font-size: 28rpx;
				font-weight: 500;
				color: #3a3a3a;
				white-space: nowrap;
			}
		}

		.item_right {
			display: flex;
			align-items: center;

			.price {
				font-size: 28rpx;
				font-weight: 400;
				color: #6d7278;
			}

			.show {
				font-size: 28rpx;
				font-weight: 600;
				color: #0091ff;
			}

			.input {
				text-align: right;
				font-size: 28rpx;
				font-weight: 400;
				color: #6d7278;
			}
		}
	}

	.btn {
		margin: 0 auto;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		width: 308rpx;
		margin-top: 64rpx;
		background: #427bff;
		text-align: center;
		border-radius: 10rpx;
		padding: 14rpx 0;
	}
}
</style>
