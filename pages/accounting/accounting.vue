<template>
	<view>
		<Header haveback='true'></Header>
		<view class="xian"></view>
		<view class="tab">
			<view class="item" v-for="item,index in list" :key='index' :class="act==index?'act':''" @click="change(index)">
				{{item}}
			</view>
		</view>
		<view class="ma">
			<view class="erweima" :style="{backgroundImage: `url(${img})`}">
				
			</view>
		</view>
		<view class="bj">
			
		</view>
		<view class="btn" @click="gonew">
			核销记录
		</view>
		<view class="absoult" @click="gonew">
			
		</view>
		<tki-qrcode class="qrcode-box" ref="qrcode" :val="address" :size="166" unit="upx" :onval="true"
			:showLoading="true" @result="qrR" />
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		components: {
			tkiQrcode,
		},
		data() {
			return {
				list:[
					'闪购','拼团','集赞','预定','专场','积分','直播间','优惠券'
				],
				act:0,
				img:'',
				address:'',
			};
		},
		onShow() {
			this.$api.writeOff({
				order_type:(this.act-0)+1
			},{
				success:(ret)=>{
					this.address = ret.data
				}
			})
		},
		methods:{
			gonew(){
				console.log(1)
				this.$Common.commonJump('/pages/accountnew/accountnew')
			},
			qrR(res) {
				console.log("------------------------------------");
				console.log(res);
				this.img = res;
			},
			change(index){	
				this.act = index
				this.$api.writeOff({
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
.ma{
	position: relative;
	transform: translateY(25%);
	width: 400rpx;
	height: 526rpx;
	margin: 0 auto;
	background: url(../../static/index/ma.png) no-repeat;
	background-position: center;
	background-size: cover;
	padding-top: 1rpx;
	.erweima{
		position: absolute;
		top: 38%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 330rpx;
		height: 344rpx;
		background-size: 100% 100%;
		background-position: center;
	}
}
.bj{
	position: relative;
	transform: translateY(50%);
	width: 720rpx;
	height: 394rpx;
	margin: 0 auto;
	background: url(../../static/index/mabj.png) no-repeat;
	background-position: center;
	background-size: cover;
}
.btn{
	position: relative;
	margin: auto;
	margin-top: 100rpx;
	width: 228rpx;
	background: #FFFFFF;
	border-radius: 39rpx;
	border: 2rpx solid #D4D4D4;
	text-align: center;
	padding: 14rpx 0;
	font-size: 32rpx;
	font-weight: 500;
	color: #000;
	z-index: 9;
}
.absoult{
	width: 176rpx;
	height: 176rpx;
	background: url(../../static/index/hesuan.png) no-repeat;
	background-position: center;
	background-size: cover;
	position: fixed;
	right: 0;
	top: 58%;
}
.qrcode-box{
	position: fixed;
	left: -9999rpx;
	top: -9999rpx;
}
</style>
