<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<view class="user_detail">
			<view class="user_detail_top">
				<view class="user_detail_top_left">
					姓名
				</view>
				<view class="user_detail_top_left">
					{{obj.nick_name}}
				</view>
			</view>
			<view class="user_detail_top">
				<view class="user_detail_top_left">
					手机号
				</view>
				<view class="user_detail_top_left">
					{{obj.phones?obj.phones:'暂无'}}
				</view>
			</view>
		</view>
		<view class="zuji">
			浏览足迹
		</view>
		<view class="content">
			<scroll-view class="vip-cards" scroll-y="true" show-scrollbar="false" @scrolltolower='chudi'>
				<view class="proup_li" v-for="item,index in data" :key='index'>
					<view class="li_left" :style="{backgroundImage:`url(${item.goods_img})`}">
						
					</view>
					<view class="li_right">
						<view class="li_right_tit">
							{{item.goods_name}}
						</view>
						<view class="li_right_bot">
							<text class="price">闪购价￥{{item.goods_price}}/{{item.dan_wei}}</text>
							<text class="yuan">原价￥{{item.old_price}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idd: '',
				page: 1,
				data:[],
				obj:{},
				total:0
			};
		},
		onLoad(options) {
			if (options.id) {
				this.idd = options.id
				this.getdata()
			}
		},
		methods:{
			chudi() {
				if (this.data.length >= this.total) {
					return this.$Common.commonToast('暂无更多数据')
				}
				this.page = (this.page-0) + 1
				this.getdata()
			},
			getdata(){
				this.$api.getUserOwnerInfo({
					id: this.idd,
					page: this.page
				}, {
					success:(ret)=>{
						this.obj = ret.data.user
						this.total = ret.data.tg_browse.total
						if(this.page == 1){
							this.data = ret.data.tg_browse.data
						}else{
							this.data =[...this.data,...ret.data.tg_browse.data]
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #EDEDED;
	}
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}
	.user_detail{
		padding: 0 15rpx;
		background-color: #fff;
		.user_detail_top{
			padding: 30rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #333;
		}
		.user_detail_top:nth-child(1){
			border-bottom: 1rpx solid #dfdfdf;
		}
	}
	.zuji{
		padding-top: 30rpx;
		padding-left: 30rpx;
		font-size: 32rpx;
		color: #333;
	}
	.content{
		margin-top: 20rpx;
		padding: 20rpx;
		.vip-cards{
			max-height: 875rpx;
			.proup_li{
				display: flex;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				.li_left{
					width: 220rpx;
					height: 220rpx;
					background-position: center;
					background-size: cover;
				}
				.li_right{
					margin-left: 20rpx;
					.li_right_tit{
						font-weight: 700;
						font-size: 27rpx;
						color: #333;
					}
					.li_right_bot{
						margin-top: 20rpx;
						.price{
							font-size: 24rpx;
							color: @common;
						}
						.yuan{
							margin-left: 16rpx;
							font-size: 22rpx;
							color: #666;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
