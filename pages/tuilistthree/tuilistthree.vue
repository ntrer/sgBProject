<template>
	<view>
		<Header haveback='true'></Header>
		<view class="bg">
			<view class="search-box">
				<view class="input-box">
					<view class="icon">
						<image src="../../static/index/tuisearch.png" mode="scaleToFill" />
					</view>
					<input type="text" placeholder="搜索" placeholder-style="color:#fff" v-model="search" />
				</view>
				<text class="search-btn" @click="grtdata">搜索</text>
			</view>
		</view>
		<view class="top">
			<view class="top_left">
				注：点击名称查看下一页
			</view>
			<view class="top_right">
				总数 <text class="red">{{all}}</text> 次
			</view>
		</view>
		<view class="box">
			<view class="item" v-for="item,index in datalist" :key='index'>
				<view class="item_left" @click="tonext(item.id)">
					<image :src="item.head_img" class="logo" mode=""></image>
					<text class="text">{{item.name}}>>	</text>
				</view>
				<view class="item_right" @click="tomytwitter(item.id)">
					<text class="people">{{item.count_member}}人</text>
					<image src="../../static/index/next@2x(1).png" class="right_icon" mode=""></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[],
				all:'',
				search:'',
				idd:''
			};
		},
		onLoad(id) {
			this.idd = id
			this.grtdata()
		},
		methods:{
			grtdata(){
				this.$api.getStoreTweetList({name:this.search,id:this.idd},{
					success:(ret)=>{
						if(ret.code == 200){
							this.all= ret.data.count
							this.datalist = ret.data.data
						}
					}
				})
			},
			tomytwitter(id){
				this.$Common.commonJump('pages/mytwitter/mytwitter?store_id='+id)
			},
			tonext(id){
				this.$Common.commonJump('pages/tuilistfour/tuilistfour?id='+id)
			}
		}
	}
</script>

<style lang="less" scoped>
	* {
		box-sizing: border-box;
	}

	.bg {
		height: 176rpx;
		background: url(../../static/index/tuilistbj.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding: 30rpx;
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.input-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: calc(578rpx - 5rpx * 2);
			height: 70rpx;
			padding: 0 32rpx;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.3);

			.icon {
				width: 36rpx;
				height: 36rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			input {
				flex: 1;
				margin-left: 18rpx;
				color: #fff;
			}
		}

		.search-btn {
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
			transform: translateY(-5%);
		}
	}

	.top {
		margin-top: 46rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.top_left {
			font-size: 28rpx;
			font-weight: 400;
			color: #6D7278;
		}

		.top_right {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;

			.red {
				color: #FF4242;
				margin: 0 8rpx;
			}
		}
	}

	.box {
		margin: 0 30rpx;
		margin-top: 30rpx;

		.item {
			margin-bottom: 18rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #F7F7F7;
			border-radius: 12rpx;
			padding: 22rpx 54rpx;

			.item_left {
				display: flex;
				align-items: center;

				.logo {
					width: 100rpx;
					height: 100rpx;
					margin-right: 18rpx;
					border-radius: 50%;
				}

				.text {
					font-size: 28rpx;
					font-weight: 500;
					color: #3A3A3A;
					text-decoration: underline;
				}
			}

			.item_right {
				display: flex;
				align-items: center;
				.people{
					font-size: 32rpx;
					font-weight: 500;
					color: #3A3A3A;
				}
				.right_icon{
					width: 28rpx;
					height: 28rpx;
					margin-left: 26rpx;
					vertical-align: middle;
				}
			}
		}
	}
</style>
