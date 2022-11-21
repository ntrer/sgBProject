<template>
	<view>
		<Header></Header>
		<view class="box" v-if="data.length > 0">
			<view class="item_li" v-for="item,index in data" :key='index' @click="godetail(item.id)">
				<view class="item_li_top">
					<view class="tit">
						<text class="hei">{{item.goods_name}}</text>
					</view>
					<view class="num">
						<text class="number">数量:{{item.num}}</text>
					</view>
				</view>
				<view class="item_li_top">
					<view class="tit">
						<text class="hui">{{item.create_time}}</text>
					</view>
					<view class="num">
						<text class="number">成交额:{{item.turnover_money}}</text>
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
				page:1,
				idd:'',
				data:[],
				total:0
			};
		},
		onReachBottom() {
			if(this.data.length >= this.total){
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page - 0) + 1
			this.getdata()
		},
		onLoad(options) {
			if(options.id){
				this.idd = options.id
				this.getdata()
			}
		},
		methods:{
			getdata(){
				this.$api.offLineOrderTweet({
					order_type: "1",
					page: this.page,
					tk_id: this.idd
				}, {
					success:(ret)=>{
						this.total = ret.data.total
						if(this.page == 1){
							this.data = ret.data.data
						}else{
							this.data =[...this.data,...ret.data.data]
						}
					}
				})
			},
			godetail(id){
				this.$Common.commonJump('/pages/signDetail/signDetail?id=' + id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 0 24rpx;

		.item_li {
			padding: 30rpx;
			margin-bottom: 20rpx;

			.item_li_top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 12rpx;

				.tit {
					width: 50%;
					text-align: left;

					.hei {
						color: #333;
						font-size: 28rpx;
					}

					.hui {
						color: #666;
						font-size: 24rpx;
					}
				}

				.num {
					width: 30%;
					text-align: left;
					font-size: 24rpx;
					color: @common;
					text-align: left;
				}
			}
		}
	}
</style>
