<template>
	<view>
		<Header></Header>
		<view class="box" v-if="data.length > 0">
			<view class="item" v-for="item,index in data" :key='index'>
				<view class="item_li">
					<view class="item_li_left">
						姓名: <text class="tangxi">{{item.realname}}</text> 
					</view>
					<view class="item_li_left">
						带单人: <text class="tangxi">{{item.with_order_name}}</text> 
					</view>
				</view>
				<view class="item_li">
					<view class="item_li_left">
						订单金额: <text class="tangxi">{{item.turnover_money}}</text> 
					</view>
					<view class="item_li_left">
						时间: <text class="tangxi">{{item.create_time}}</text> 
					</view>
				</view>
				<view class="item_li">
					<view class="item_li_left">
						品类: <text class="tangxi">{{item.goods_cate}}</text> 
					</view>
					<view class="item_li_left">
						商品名称: <text class="tangxi">{{item.goods_name}}</text> 
					</view>
				</view>
			</view>
		</view>
		<noData v-else></noData>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				data:[],
				param:{}
			};
		},
		onReachBottom() {
			if (this.data.length >= this.total) {
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page - 0) + 1
			this.getdata()
		},
		methods:{
			getdata(){
				this.$api.getCarryCodeInfo({
					id: this.param.id,
					page: this.page
				}, {
					success: (ret) => {
						if(this.page == 1){
							this.data = ret.data.order.data
						}else{
							this.data = [...this.data,...ret.data.order.data]
						}
					}
				})
			}
		},
		onLoad(params) {
			this.param = params
			this.getdata()
		},
	}
</script>

<style lang="less" scoped>
	// page {
	// 	background-color: #f6f6f6;
	// }

	.box {
		padding: 25rpx;

		.item {
			background-color: #fff;
			padding: 20rpx 30rpx;
			margin-bottom: 15rpx;
			border-radius: 12rpx;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);

			.item_li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				font-weight: 700;
				margin-bottom: 15rpx;
				.tangxi{
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
