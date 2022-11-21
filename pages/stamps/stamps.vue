<template>
	<view>
		<Header haveback='true'></Header>
		<view class="bg">

		</view>
		<view class="white">
			<scroll-view scroll-y="true" class="scroll" show-scrollbar="false" @scrolltolower='chudi' v-if="datallist.length>0">
				<view class="li" v-for="item,index in datallist" :key='index'>
					<view class="li_left">
						<view class="li_left_tit">
							{{item.user_name}}
						</view>
						<view class="li_left_bot">
							{{item.end_time}}
						</view>
					</view>
					<view class="li_right">
						<view class="li_show" @click="seeposter(item.id)">
							查看海报
						</view>
						<view class="li_show_text" @click="seemore(item.id)">
							查看信息
						</view>
					</view>
				</view>
			</scroll-view>
			<noData v-else></noData>
		</view>
		<view class="btn1" @click="clickone">
			门店信息管理
		</view>
		<view class="btn2" @click="clicktwo">
			立即生成内购随身码
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datallist: [],
				page: 1,
				total: 0,
			};
		},
		onShow() {
			this.getdata()
		},
		methods: {
			chudi() {
				if (this.datallist.length >= this.total) {
					return this.$Common.commonToast('暂无更多数据')
				}
				this.page = (this.page-0) + 1
				this.getdata()
			},
			seeposter(id){
				console.log(id)
				this.$Common.commonJump('pages/postersee/postersee?id='+id)
			},
			seemore(id){
				this.$Common.commonJump('pages/moresee/moresee?id='+id)
			},
			clickone() {
				this.$Common.commonJump('pages/store/store')
			},
			clicktwo() {
				this.$Common.commonJump('pages/storema/storema')
			},
			getdata() {
				this.$api.getCarryCode({
					page: this.page
				}, {
					success: (ret) => {
						console.log(ret)
						this.total = ret.data.total
						if (this.page == 1) {
							this.datallist = ret.data.data
						} else {
							this.datallist = [...this.datallist, ...ret.data.data]
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bg {
		width: 100%;
		height: 264rpx;
		background: url(../../static/index/yiye.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding-top: 1rpx;
	}

	.white {
		margin: 0 26rpx;
		margin-top: -250rpx;
		height: 830rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, .3);
		.scroll{
			max-height: 804rpx;
			overflow: hidden;
			padding-top: 20rpx;
		}
		.li {
			margin-bottom: 15rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 30rpx;

			.li_left {
				width: 50%;

				.li_left_tit {
					font-size: 28rpx;
					color: #333;
				}

				.li_left_bot {
					margin-top: 12rpx;
					color: #999;
					font-size: 24rpx;
				}
			}

			.li_right {
				width: 50%;
				display: flex;
				align-items: center;

				.li_show {
					background-color: @common;
					color: #fff;
					border: none;
					border-radius: 8rpx;
					font-size: 24rpx;
					padding: 12rpx 20rpx;
					margin-right: 20rpx;
				}
				.li_show_text {
					background-color: #fff;
					color: @common;
					border: 1rpx solid @common;
					border-radius: 8rpx;
					font-size: 24rpx;
					padding: 12rpx 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}

	.btn1,
	.btn2 {
		margin: 0 142rpx;
		background: #427BFF;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		padding: 14rpx 0;
		text-align: center;
		margin-top: 176rpx;
	}

	.btn2 {
		margin-top: 20rpx;
	}
</style>
