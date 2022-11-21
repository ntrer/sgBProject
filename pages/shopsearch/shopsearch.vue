<template>
	<view class="results-search">
		<Header haveback='true'></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<image src="../../static/result/result_search_bg.png" mode="scaleToFill" />
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
		</view>
		<view class="bottom-list">
			<view @click="toDetail(item.id)" v-for="(item, i) of listData" :key="i" class="bottom-list-item">
				<view class="item-content">
					<!-- <view class="user-avatar">
						<image v-if="item.avatar" :src="item.avatar" mode="scaleToFill" />
						<image v-else src="../../static/user.png" mode="scaleToFill" />
					</view> -->
					<view class="user-info">
						<text class="name">{{ item.realname }}</text>
						<text class="time">{{ item.create_time }}</text>
					</view>
				</view>
				<view class="icon">
					<image src="../../static/index/next@2x(1).png" mode="scaleToFill" />
				</view>
			</view>
			<noData v-if="listData.length === 0"></noData>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				searchForm: {
					search: ''
				},
				page: 1,
				obj: {},
				total: 0,
			}
		},
		onShow() {
			
		},
		onLoad() {
			this.getdata()
		},
		onReachBottom() {
			if(this.listData.length >= this.total){
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page) + 1
			this.getdata()
		},
		methods: {
			/**
			 * @description: 跳转客户详情页面
			 */
			toDetail(id) {
				this.$Common.commonJump('/pages/shopadd/shopadd?id='+id)
			},
			//获取数据
			getdata() {
				this.$api.inputMemberList({
					name: this.searchForm.search,
					page: this.page
				}, {
					success: (ret) => {
						if (ret.code == 200) {
							this.obj = ret.data.member_sign
							this.total = ret.data.member_sign.total
							if(this.page == 1){
								this.listData = ret.data.member_sign.data
							}else{
								this.listData = [...this.listData,...ret.data.member_sign.data]
							}
						}
					}
				})
			},
			/**
			 * @description: 点击搜索按钮
			 */
			handleSearch() {
				this.page = 1
				this.getdata()
			}
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
			height: 176rpx;
			position: relative;

			&-bg {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0px;
				top: 0px;
				z-index: 1;

				image {
					width: 100%;
					height: 100%;
				}
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
		}

		.bottom-list {
			width: 690rpx;

			&-item {
				padding: 14rpx 18rpx;
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
</style>
