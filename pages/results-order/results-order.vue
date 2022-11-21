<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-28 09:08:48
 * @Description: 签单
-->
<template>
	<view class="results-order">
		<Header haveback></Header>

		<view class="bottom-list">
			<view @click="toDetail(item)" v-for="(item, i) of listData" :key="i" class="bottom-list-item">
				<view class="top">
					<text class="title">{{ item.goods_name }}</text>
					<text class="num">数量: {{ item.num }}</text>
				</view>
				<view class="bottom">
					<text class="date">{{ item.create_time }}</text>
					<text class="money">成交额: {{ item.turnover_money }}</text>
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
			page: 1,
			total: 0,
			idd: '',
			ii: false,
		};
	},
	onLoad(options) {
		if (options.id) {
			this.idd = options.id;
			this.ii = true;
		}
		if (options.type) {
			this.pageType = options.type;
		}
		this.getList();
	},
	onReachBottom() {
		this.getList();
	},
	methods: {
		getList() {
			let that = this;
			if (that.page !== 1 && that.listData.length >= that.total) {
				that.$Common.commonToast('暂无更多数据');
				return;
			}
			if (this.ii) {
				this.$api.offLineOrderTweet(
					{
						order_type: this.pageType,
						page: this.page,
						tk_id: this.idd,
					},
					{
						success: (ret) => {
							this.total = ret.data.total;
							this.listData = [...this.listData, ...ret.data.data];
							this.page += res.data.current_page;
						},
					}
				);
			} else {
				that.$api.offLineOrder(
					{
						order_type: that.pageType,
						page: that.page,
					},
					{
						success(res) {
							console.log(res);

							that.listData = [...that.listData, ...res.data.data];
							that.page += res.data.current_page;
							that.total = res.data.total;
						},
					}
				);
			}
		},
		/**
		 * @description: 跳转客户详情页面
		 */
		toDetail(item) {
			this.$Common.commonJump('/pages/bill-detail/bill-detail?id=' + item.id);
		},
		/**
		 * @description: 点击搜索按钮
		 */
		handleSearch() {
			console.log(this.searchForm);
		},
	},
};
</script>

<style lang="less">
.results-order {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	padding-bottom: 36rpx;

	.bottom-list {
		width: 690rpx;
		&-item {
			padding: 20rpx 20rpx;
			margin-top: 20rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			display: flex;
			flex-flow: column nowrap;
			.top,
			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.top {
				text {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.num {
					// color: @common;
				}
			}
			.bottom {
				margin-top: 20rpx;
				text {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #a7a7a7;
				}
				.money {
					font-size: 28rpx;
					color: @common;
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
