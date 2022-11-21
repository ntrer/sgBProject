<template>
	<view>
		<Header></Header>
		<view class="xian">
		
		</view>
		<view class="box">
			<view class="item">
				<view class="item_left">
					带单人姓名
				</view>
				<view class="item_right">
					{{obj.with_order_name}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					带单人电话
				</view>
				<view class="item_right">
					{{obj.with_order_phone}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					带单品牌
				</view>
				<view class="item_right">
					{{obj.with_order_brand}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					业主姓名
				</view>
				<view class="item_right">
					{{obj.realname}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					业主电话
				</view>
				<view class="item_right">
					{{obj.phone}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					商品品类
				</view>
				<view class="item_right">
					{{obj.goods_cate}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					商品名称
				</view>
				<view class="item_right">
					{{obj.goods_name}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					购买数量
				</view>
				<view class="item_right">
					{{obj.num}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					成交金额
				</view>
				<view class="item_right">
					{{obj.turnover_money}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					实收金额
				</view>
				<view class="item_right">
					{{obj.income_money}}
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					签单图
				</view>
				<view class="item_right">
					<image :src="obj.sign_order_img" mode="" class="img"></image>
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					客户来源
				</view>
				<view class="item_right">
					<text class="text"  v-for="items,indexs in obj.from_info" :key='indexs'>{{items}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idd: '',
				obj: {},
			};
		},
		onLoad(options) {
			if (options.id) {
				this.idd = options.id
				this.$api.getOffLineOrderInfo({
					order_id: this.idd
				}, {
					success: (ret) => {
						this.obj = ret.data
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}
	.box{
		padding: 0 20rpx;
		.item{
			padding: 30rpx 0;
			border-bottom: 1rpx solid #dfdfdf;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item_left{
				font-size: 28rpx;
				color: #666;
			}
			.item_right{
				color: #333;
				font-size: 26rpx;
				.text{
					margin-right: 10rpx;
				}
				.img{
					width: 160rpx;
					height: 120rpx;
				}
			}
		}
	}
</style>
