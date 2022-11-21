<template>
	<view>
		<Header haveback='true'></Header>
		<view class="xian"></view>
		<view class="tab">
			<view class="item" v-for="item,index in list" :key='index' :class="act==index?'act':''" @click="change(index)">
				{{item}}
			</view>
		</view>
		<view class="box" v-if="address.length > 0">
			<view class="li" v-for="item,index in address" :key='index'>
				<view class="li_tit">
					订单编号:{{item.order_no}}
				</view>
				<view class="li_left">
					<view class="li_img" :style="{backgroundImage: `url(${item.goods_img})`}">
						
					</view>
					<view class="li_rig">
						<view class="li_rig_name">
							{{item.goods_name}}
						</view>
						<view class="li_rig_name">
							实际支付:{{item.goods_price}}
						</view>
						<view class="li_rig_name">
							用户昵称:{{item.realname}}
						</view>
						<view class="li_rig_name">
							用户手机:{{item.phones}}
						</view>
					</view>
				</view>
				<view class="li_bot">
					核销时间:{{item.write_off_time}}
				</view>
			</view>
		</view>
		<noData v-else></noData>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				list:[
					'闪购','拼团','集赞','预定','专场','积分','直播间','优惠券'
				],
				act:0,
				img:'',
				address:[],
			};
		},
		onShow() {
			this.$api.getWriteList({
				order_type:(this.act-0)+1
			},{
				success:(ret)=>{
					this.address = ret.data
				}
			})
		},
		methods:{
			change(index){	
				this.act = index
				this.$api.getWriteList({
					order_type:(this.act-0)+1
				},{
					success:(ret)=>{
						this.address = ret.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// page{
	// 	background-color: #F6F6F6;
	// }
.xian{
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
}
.tab{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15rpx;
	.item{
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.25);
		border-radius: 8rpx;
		border: 2rpx solid rgba(0, 0, 0, 0.1);
		padding: 12rpx 10rpx;
		text-align: center;
	}
	.act{
		color: #1F74B4;
		background: rgba(54, 144, 246, 0.2);
		border: 2rpx solid transparent;
	}
}
.box{
	margin-top: 20rpx;
	padding: 0 20rpx;
	.li{
		background-color: #fff;
		padding: 15rpx 20rpx;
		border-radius: 15rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #333;
		margin-bottom: 20rpx;
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
		.li_tit{
			font-size: 26rpx;
			font-weight: 400;
			color: #333;
		}
		.li_left{
			margin-top: 20rpx;
			display: flex;
			.li_img{
				width: 200rpx;
				height: 200rpx;
				background-size: cover;
				background-position: center;
			}
			.li_rig{
				margin-left: 25rpx;
				.li_rig_name{
					margin-bottom: 15rpx;
				}
			}
		}
		.li_bot{
			margin-top: 15rpx;
		}
	}
}
</style>
