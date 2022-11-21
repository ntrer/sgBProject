<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-28 09:08:48
 * @Description: 业主查询
-->
<template>
	<view class="results-search">
		<Header haveback></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<image src="../../static/result/result_search_bg.png" mode="scaleToFill" />
			</view>
			<view class="top-area-search">
				<view class="search-box">
					<view class="input-box">
						<view class="icon">
							<image src="../../static/result/search.png" mode="scaleToFill" />
						</view>
						<input type="text" placeholder="搜索" placeholder-style="color:#fff" v-model="search" />
					</view>
					<text @click="handleSearch" class="search-btn">搜索</text>
				</view>
			</view>
		</view>
		<view class="bottom-list">
			<view @click="toDetail(item)" v-for="(item, i) of listData" :key="i" class="bottom-list-item">
				<view class="item-content">
					<view class="user-avatar">
						<image v-if="item.user_headimg" :src="item.user_headimg" mode="scaleToFill" />
						<image v-else src="../../static/user.png" mode="scaleToFill" />
					</view>
					<view class="user-info">
						<text class="name">{{ item.nick_name }}</text>
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
				pageType: '',
				listData: [],
				search: '',
				page: 1,
				total: 0,
				ii: false,
				idd: ''
			}
		},
		onLoad(options) {
			if (options.type) this.pageType = options.type
			if (options.ii) {
				this.ii = true
				this.idd = options.id
			}
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			/**
			 * @description: 获取页面数据
			 */
			getList() {
				let that = this
				if (that.page !== 1 && that.listData.length >= that.total) {
					that.$Common.commonToast('暂无更多数据')
					return
				}
				console.log(this.ii)
				if (this.ii == true) {
					this.$api.tweetAchievementList({
						tk_uid: this.idd,
						page: this.page,
						type: this.pageType
					}, {
						success: (ret) => {
							this.total = ret.data.total
							this.page += ret.data.current_page
							this.listData = [...this.listData, ...ret.data.data]
						}
					}, )
				} else {
					that.$api.getAchievementMember({
						type: that.pageType,
						page: that.page,
						nick_name: that.search
					}, {
						success(res) {
							console.log(res)
							that.listData = [...that.listData, ...res.data.data]
							that.page += res.data.current_page
							that.total = res.data.total
						}
					})
				}
			},
			/**
			 * @description: 跳转客户详情页面
			 */
			toDetail(item) {
				this.$Common.commonJump(
					'/pages/customer-detail/customer-detail?id=' + item.form_uid
				)
			},
			/**
			 * @description: 点击搜索按钮
			 */
			handleSearch() {
				this.page = 1
				this.listData = []
				this.getList()
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
</style>
