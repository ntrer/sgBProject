<template>
	<view>
		<Header haveback="true"></Header>
		<view class="bg">
			<view class="top">
				<view class="li_box">
					<view class="li" v-for="(item, index) in tab" :key="index" :class="active == index ? 'act' : ''" @click="change(index)">
						{{ item }}
					</view>
				</view>

				<view class="changeyear" @click="open">
					<view class="year">
						{{ obj.stage_name }}
					</view>
					<view class="year_right">
						<text class="year_text">切换</text>
						<image src="../../static/index/next@2x.png" class="xia_icon" mode=""></image>
					</view>
				</view>
			</view>
			<view class="search">
				<view class="search_left">
					<image src="../../static/index/tuisearch.png" mode="" class="search_icon"></image>
					<input type="text" value="" placeholder="搜索" class="input" v-model="search" placeholder-style="color:#fff" />
				</view>
				<view class="search_right" @click="onsearch()">搜索</view>
			</view>
			<view class="white">
				<view class="white_item">
					<view class="white_text">奖励总金额(元)</view>
					<view class="white_number">
						{{ obj.staff_money }}
					</view>
				</view>
				<view class="white_item">
					<view class="white_text">奖励豆总数(个)</view>
					<view class="white_number">
						{{ obj.total_point }}
					</view>
				</view>
				<view class="white_item">
					<view class="white_text">当前豆值(元)</view>
					<view class="white_number">
						{{ obj.bean_value }}
					</view>
				</view>
			</view>
		</view>
		<view class="tab_box">
			<view class="tab_item" v-for="(item, index) in tablist" :key="index" @click="changtab(index)" :class="act == index ? 'acted' : ''">
				{{ item }}
			</view>
		</view>
		<view class="fixedrule" @click="rule">
			<image src="../../static/jiangli.png" mode=""></image>
		</view>
		<view class="dou_box" v-if="ranking.length > 0">
			<view class="dou_item" v-for="(item, index) in ranking" :key="item.id">
				<view class="index">
					{{ index - 0 + 1 }}
				</view>
				<view class="dou_item_top">
					<view class="dou_item_top_left">
						<image :src="item.user_head_img" class="logo" mode=""></image>
						<text class="name">{{ item.realname }}</text>
					</view>
					<view class="dou_item_top_right">
						<image src="../../static/index/bi.png" class="qian" mode=""></image>
						<text class="num">{{ item.all_beans }}个</text>
					</view>
				</view>
				<view class="zhandui" v-if="item.ishow == 'true'">
					{{ item.brand }}
				</view>
				<view class="shouru" v-if="item.ishow">预计收入：{{ item.income }}元</view>
				<view class="item_box_shao">
					<view class="liulan" v-if="item.ishow" v-for="(item2, ids) in item.opobj" :key="ids">
						<view class="liulan_left">{{ item2.name }}：{{ item2.num1 }}/{{ item2.num2 }}</view>
					</view>
				</view>
				<!-- <view class="shouka" v-if='item.ishow'>
					<view class="shouke_left">
						售卡【优惠券】：{{item.schedule.selling_cards_coupon}}/{{item.aims.selling_cards_coupon}}
					</view>
					<view class="shouke_right">
						报名：{{item.schedule.sign_up}}/{{item.aims.sign_up}}
					</view>
				</view> -->
				<view class="seedata" @click="showchange(index)">查看数据</view>
			</view>
		</view>
		<noData v-else></noData>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">请选择</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<scroll-view class="vip-cards" scroll-y="true" show-scrollbar="false">
						<view class="proup_li" v-for="(item, index) in prouplist" :key="item.id" @click="changeactive(index, item.id)">
							<view class="proup_li_left">
								{{ item.name }}
							</view>
							<view class="proup_li_right">
								<view class="proup_yuan" :class="proupact == index ? 'changyuan' : ''"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close()">取消</view>
					<view class="proup_btn2" @click="close('api')">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupthree" type="bottom">
			<view class="popup_box_two">
				<view class="popup_box_two_tit">奖励规则</view>
				<view class="proup_position" v-for="(item, index) in prouptext" :key="index">
					{{ item }}
				</view>
				<view class="popup_box_two_bot" @click="twoclose">我知道了</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeobj: {},
			tab: ['员工奖金池', '品牌奖金池'],
			active: 0,
			act: 1,
			tablist: ['已完成排行', '未完成排行'],
			prouplist: [],
			obj: {},
			proupact: 0,
			stage_id: '',
			ranking: [], //下方排行数据
			finish: false, //已完成数据
			page: 1,
			search: '', //搜索内容
			apitye: 'getBeansRanking', //请求接口
			prouptext: [], //规则
		};
	},
	onShow() {
		this.$api.rewardLlocation(
			{},
			{
				success: (ret) => {
					this.typeobj = ret.data;
				},
			}
		);
		this.$api.getAllStage(
			{},
			{
				success: (ret) => {
					console.log(ret);
					if (ret.code == 200) {
						this.prouplist = ret.data;
						this.getdata();
					}
				},
			}
		);
		this.$api.getRewardRules(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.prouptext = ret.data.split('\n');
					}
				},
			}
		);
	},
	methods: {
		//规则展示
		rule() {
			this.$refs.popupthree.open('center');
		},
		showchange(index) {
			this.ranking[index].ishow = !this.ranking[index].ishow;
			this.ranking.push({});
			this.ranking.pop();
			console.log(this.ranking);
		},
		//选择弹出层
		changeactive(index, ids) {
			this.proupact = index;
			this.stage_id = ids;
		},
		//选择顶部导航栏
		change(index) {
			this.active = index;
			if (index == 0) {
				this.apitye = 'getBeansRanking';
			} else {
				this.apitye = 'getBeansSRanking';
			}
			this.getdata();
		},
		//选择签单类型
		changtab(index) {
			this.act = index;
			if (index == 0) {
				this.ranking = this.obj.carry_out;
				this.finish = true;
			} else {
				this.ranking = this.obj.undone;
				this.finish = false;
			}
			this.ranking.map((item) => {
				item.ishow = true;
			});
		},
		open() {
			this.$refs.popup.open('center');
		},
		close(type) {
			this.$refs.popup.close();
			if (type == 'api') {
				this.getdata();
			}
		},
		twoclose() {
			this.$refs.popupthree.close();
		},
		onsearch() {
			if (this.search == '') {
				return;
			}
			this.getdata();
		},
		//获取数据
		getdata() {
			this.$api[this.apitye](
				{
					stage_id: this.stage_id,
					name: this.searchtext,
					page: this.page,
					name: this.search,
				},
				{
					success: (res) => {
						res.data.carry_out.map((item) => {
							item.opobj = [];
						});
						res.data.undone.map((item) => {
							item.opobj = [];
						});
						res.data.carry_out.map((item) => {
							var keyarr = Object.keys(item.schedule);
							for (let var1 in this.typeobj) {
								let yuobj = {};
								if (keyarr.indexOf(var1) != -1) {
									yuobj.name = this.typeobj[var1];
									yuobj.key = var1;
									yuobj.num1 = item.schedule[var1];
									yuobj.num2 = item.aims[var1];
									item.opobj.push(yuobj);
								}
							}
						});
						res.data.undone.map((item) => {
							var keyarr = Object.keys(item.schedule);
							for (let var1 in this.typeobj) {
								let yuobj = {};
								if (keyarr.indexOf(var1) != -1) {
									yuobj.name = this.typeobj[var1];
									yuobj.key = var1;
									yuobj.num1 = item.schedule[var1];
									yuobj.num2 = item.aims[var1];
									item.opobj.push(yuobj);
								}
							}
						});
						this.obj = res.data;
						// console.log(this.obj)
						if (this.finish) {
							this.ranking = this.obj.carry_out;
							this.ranking.map((item) => {
								item.ishow = true;
								// item.opobj = []
							});
						} else {
							this.ranking = this.obj.undone;
							this.ranking.map((item) => {
								item.ishow = true;
								// item.opobj = []
							});
						}

						console.log(this.ranking);
						this.prouplist.forEach((item, index) => {
							if (item.name == this.obj.stage_name) {
								this.proupact = index;
								this.stage_id = item.id;
							}
						});
					},
				}
			);
		},
	},
};
</script>

<style lang="less" scoped>
.bg {
	height: 356rpx;
	background: url(../../static/index/juxing.png) no-repeat;
	background-position: center;
	background-size: cover;
	padding: 30rpx;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.li_box {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.li {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
				border-radius: 8rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.5);
				padding: 10rpx 24rpx;
			}

			.li:nth-child(1) {
				margin-right: 18rpx;
			}

			.act {
				color: #fff;
				border: 2rpx solid #fff;
			}
		}

		.changeyear {
			display: flex;
			align-items: center;
			padding: 10rpx 12rpx;
			background: rgba(245, 247, 250, 0.2);
			border-radius: 8rpx;
			border: 2rpx solid #ffffff;

			.year {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
				margin-right: 64rpx;
			}

			.year_right {
				.year_text {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.5);
				}

				.xia_icon {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
					margin-left: 10rpx;
				}
			}
		}
	}

	.search {
		margin-top: 46rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.search_left {
			display: flex;
			align-items: center;
			width: 70%;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 35rpx;
			border: 2rpx solid rgba(255, 255, 255, 0.3);
			padding: 12rpx 0;
			padding-left: 32rpx;

			.search_icon {
				width: 38rpx;
				height: 38rpx;
				vertical-align: middle;
				margin-right: 14rpx;
			}

			.input {
				font-size: 32rpx;
				font-weight: 400;
				color: #ffffff;
			}
		}

		.search_right {
			padding-right: 28rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
		}
	}

	.white {
		margin-top: 16rpx;
		background-color: #fff;
		z-index: 2;
		box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, 0.3);
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 36rpx 26rpx;

		.white_item {
			.white_text {
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #6d7278;
			}

			.white_number {
				text-align: center;
				margin-top: 20rpx;
				font-size: 48rpx;
				font-weight: bold;
				color: #333333;
			}
		}
	}
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

.dou_box {
	margin-top: 52rpx;
	padding: 0 20rpx;
	padding-bottom: 25rpx;

	.dou_item {
		background: #f7f7f7;
		border-radius: 12rpx;
		padding: 16rpx 42rpx;
		padding-bottom: 60rpx;
		padding-right: 0;
		position: relative;
		margin-bottom: 22rpx;

		.index {
			position: absolute;
			top: 36rpx;
			left: 16rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #3a3a3a;
		}

		.dou_item_top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.dou_item_top_left {
				display: flex;
				align-items: center;

				.logo {
					width: 72rpx;
					height: 72rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				.name {
					font-size: 28rpx;
					font-weight: 500;
					color: #3a3a3a;
				}
			}

			.dou_item_top_right {
				background: #ffffff;
				border-radius: 200rpx 0px 0px 200rpx;
				padding: 8rpx 20rpx;

				.qian {
					width: 38rpx;
					height: 28rpx;
					vertical-align: middle;
					margin-right: 14rpx;
				}

				.num {
					font-size: 32rpx;
					font-weight: 600;
					color: #e26c23;
				}
			}
		}

		.zhandui {
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #6d7278;
		}

		.shouru {
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #6d7278;
		}

		.item_box_shao {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}

		.liulan,
		.shouka {
			width: 41%;
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #6d7278;
			display: flex;
			padding-right: 40rpx;
			justify-content: space-between;
			text-align: center;
		}

		.seedata {
			width: 112rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #427bff;
			text-decoration: underline;
			position: absolute;
			bottom: 16rpx;
			left: 50%;
			transform: translateX(-50%);
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
		top: 5%;

		.close_icon {
			width: 26rpx;
			height: 26rpx;
		}
	}

	.proup_content {
		max-height: 304rpx;
		padding: 0 32rpx;

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
				}
				.changyuan {
					background: @common;
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
.fixedrule {
	position: fixed;
	bottom: 10%;
	right: 0;
	width: 176rpx;
	height: 176rpx;
	z-index: 99;
	image {
		width: 100%;
		height: 100%;
	}
}
.popup_box_two {
	width: 462rpx;
	background-color: #fff;
	position: relative;
	border-radius: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 40rpx;
	.popup_box_two_tit {
		text-align: center;
		font-size: 34rpx;
		font-weight: 400;
		color: #333;
	}
	.proup_position {
		margin-top: 25rpx;
		max-height: 320rpx;
		padding: 0 20rpx;
		word-wrap: break-word;
		word-break: normal;
		line-height: 1.5;
		font-size: 26rpx;
		text-align: center;
		&:nth-of-type(n + 3) {
			margin-top: 10rpx;
		}
	}
	.popup_box_two_bot {
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		padding: 14rpx 40rpx;
		margin: 0 40rpx;
		margin-top: 45rpx;
		background-color: @common;
	}
	.line {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 2rpx;
		height: 64rpx;
		background-color: #fff;
	}
	.proup_two_del {
		position: absolute;
		bottom: -5%;
		left: 50%;
		transform: translateX(-50%);
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		border: 2rpx solid #fff;
	}
	.three {
		bottom: 3%;
		height: 84rpx;
	}
	.three_close {
		bottom: -2%;
	}
}
</style>
