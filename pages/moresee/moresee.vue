<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<view class="tab_box">
			<view class="tab_item" v-for="item,index in tab" :key='index' @click="changtab(index)"
				:class="act == index?'acted':''">
				{{item}}
			</view>
		</view>
		<view class="fixed" @click="gosell">
			订单记录
		</view>
		<view class="" v-if="act == 0">
			<view class="content">
				<view class="item">
					<view class="item_left">
						姓名
					</view>
					<view class="item_right">
						{{obj.user_name}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						手机号
					</view>
					<view class="item_right">
						{{obj.user_phone}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						内购服务门店名称
					</view>
					<view class="item_right">
						{{obj.store_name}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						内购服务专线
					</view>
					<view class="item_right">
						{{obj.store_phone}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						内购服务门店地址
					</view>
					<view class="item_right">
						{{obj.store_address}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						身份
					</view>
					<view class="item_right">
						{{obj.user_card}}
					</view>
				</view>
				<view class="item">
					<view class="item_left">
						备注
					</view>
					<view class="item_right">
						{{obj.remarks}}
					</view>
				</view>
			</view>
			<view class="gohe">
				<view class="btn" @click="gohe">
					去核销
				</view>
			</view>
			<view class="text">
				优惠政策
			</view>
			<view class="text_cont">
				<image :src="obj.carry_discount_rule" class="img" mode=""></image>
			</view>
		</view>
			<image :src="img"  v-if="act == 1" mode="widthFix" class="useimg"></image>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [
					'内购优惠码详情',
					'优惠码使用说明'
				],
				act: 0,
				obj: {},
				idd:'',
				img:'',
			};
		},
		methods: {
			//选择签单类型
			changtab(index) {
				this.act = index
			},
			gohe() {
				this.$Common.commonJump('/pages/sign/sign')
			},
			gosell(){
				this.$Common.commonJump('/pages/sell/sell?id='+this.idd)
			}
		},
		onLoad(params) {
			this.idd = params.id
			this.$api.getCarryQrcodeRule({}, {
				success: (ret) => {
					this.img = ret.data
				}
			})
			this.$api.getCarryCodeInfo({
				id: params.id
			}, {
				success: (ret) => {
					this.obj = ret.data.carry_code
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.xian {
		width: 100%;
		background-color: #EDEDED;
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

	.fixed {
		position: fixed;
		left: 0;
		top: 30%;
		width: 32rpx;
		padding: 20rpx 8rpx;
		background-size: cover;
		background-position: 50%;
		background-color: @common;
		color: #fff;
		font-size: 26rpx;
		z-index: 9;
	}
	
		.useimg{
			margin-top: 15rpx;
			width: 100%;
			display: block;
		}
	.content {
		margin-top: 40rpx;
		padding: 30rpx 60rpx;
		padding-bottom: 0;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333;
			font-size: 26rpx;
			margin-bottom: 50rpx;
		}
	}

	.gohe {
		text-align: right;
		padding-right: 60rpx;

		.btn {
			color: #fff;
			background-color: @common;
			display: inline-block;
			border-radius: 8rpx;
			padding: 8rpx 16rpx;
			font-size: 28rpx;
		}
	}

	.text {
		padding-left: 60rpx;
		margin-top: 40rpx;
		font-size: 28rpx;
		color: #333;
		font-weight: 700;
	}

	.text_cont {
		padding:0 60rpx;
		margin-top: 20rpx;

		.img {
			width: 100%;
			display: block;
		}
	}
</style>
