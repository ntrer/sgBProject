<template>
	<view class="results-search">
		<Header haveback='true'></Header>
		<view class="top-area">
			<view class="top-area-bg">
			</view>
			<view class="top-area-search">
				<view class="search-box">
					<view class="input-box">
						<view class="icon">
							<image src="../../static/index/tuisearch.png" mode="scaleToFill" />
						</view>
						<input type="text" placeholder="搜索" placeholder-style="color:#fff"
							v-model="searchForm.search" />
					</view>
					<text @click="handleSearch" class="search-btn">搜索</text>
				</view>
			</view>
			<view class="white_box">
				<view class="white_item">
					<view class="white_text">
						总数据
					</view>
					<view class="white_number">
						{{total}}
					</view>
				</view>
				<view class="white_item">
					<view class="white_text">
						跟踪数据
					</view>
					<view class="white_number">
						{{tracjiong}}
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-list">
			<view v-for="(item, i) of listData" :key="i" class="bottom-list-item">
				<view class="item-content">
					<view class="user-avatar">
						<image v-if="item.user_head_img" :src="item.user_head_img" mode="scaleToFill" />
						<image v-else src="../../static/user.png" mode="scaleToFill" />
					</view>
					<view class="user-info">
						<text class="name">{{ item.realname }}</text>
						<text class="time">{{ item.create_time }}</text>
					</view>
				</view>
				<view class="right_start" @click="gocuster(item.id)">
					<view class="start">
						<uni-rate :touchable="false" :size="14" v-model="item.star_rating" readonly />
						<view class="start_text">
							{{item.star_rating==0?'零':item.star_rating==1?'一':item.star_rating==2?'二':item.star_rating==3?'三':item.star_rating==4?'四':'五'}}星用户
						</view>
					</view>
					<view class="icon">
						<image src="../../static/index/next@2x(1).png" mode="scaleToFill" />
					</view>
				</view>
			</view>
			<noData v-if="listData.length === 0"></noData>
		</view>
	</view>
</template>
<!-- getCustomer -->
<script>
	export default {
		onShow() {
			this.getdata()
		},
		onReachBottom() {
			if(this.listData.length>=this.total){
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = this.page + 1
			this.getdata()
		},
		data() {
			return {
				dataobj:{},
				page:1,
				total:0,
				listData: [],
				searchForm: {
					search: ''
				},
				tracjiong:''
			}
		},
		methods: {
			gocuster(id){
				this.$Common.commonJump('/pages/customerEditor/customerEditor?id='+id)
			},
			/**
			 * @description: 跳转客户详情页面
			 */
			// toDetail() {
			// 	this.$Common.commonJump('/pages/customer-detail/customer-detail')
			// },
			/**
			 * @description: 点击搜索按钮
			 */
			handleSearch() {
				this.getdata()
			},
			//获取数据
			getdata(){
				this.$api.getCustomer({
					name:this.searchForm.search,
					page:this.page
				},{
					success:(ret)=>{
						this.dataobj = ret.data.member_sign
						this.tracjiong =  ret.data.hf_data
						this.total = ret.data.member_sign.total
						if(this.page == 1){
							this.listData = this.dataobj.data
						}else{
							this.listData = [...this.listData,...this.dataobj.data]
						}
						console.log(this.listData)
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.results-search {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding-bottom: 36rpx;

		.top-area {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			width: 100%;
			height: 190rpx;
			position: relative;

			&-bg {
				position: absolute;
				width: 100%;
				height: 294rpx;
				left: 0px;
				top: 0px;
				z-index: 1;
				background: url(../../static/index/juxing.png) no-repeat;
				background-position: center;
				background-size: cover;
				// image {
				//   width: 100%;
				//   height: 100%;
				// }
			}

			&-search {
				position: relative;
				left: 0px;
				top: 0px;
				width: 100%;
				height: 100%;
				z-index: 2;

				.search-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					// width: 578rpx;
					// height: 70rpx;
					padding: 32rpx;

					.input-box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: calc(578rpx - 32rpx * 2);
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
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						transform: translateY(-5%);
					}
				}
			}

			.white_box {
				box-sizing: border-box;
				position: absolute;
				bottom: -150rpx;
				width: 714rpx;
				height: 204rpx;
				background-color: #fff;
				z-index: 2;
				box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, .3);
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 0 74rpx;

				.white_item {
					.white_text {
						text-align: center;
						font-size: 28rpx;
						font-weight: 400;
						color: #6D7278;
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

		.bottom-list {
			margin-top: 150rpx;
			width: 690rpx;

			&-item {
				padding: 14rpx 8rpx;
				margin-top: 36rpx;
				background: #f7f7f7;
				border-radius: 12rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item-content {
					display: flex;
					align-items: center;

					.user-avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.user-info {
						display: flex;
						flex-flow: column nowrap;
						// align-items: center;
						margin-left: 18rpx;

						.name {
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 600;
							color: #3a3a3a;
						}

						.time {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #3a3a3a;
							margin-top: 22rpx;
						}
					}
				}

				.icon {
					width: 30rpx;
					height: 30rpx;
					display: flex;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.right_start {
		display: flex;
		align-items: center;
		.start {
			.start_text {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #3A3A3A;
			}
		}
	}
</style>
