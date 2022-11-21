<template>
	<view>
		<Header haveback='true'></Header>
		<view class="xian"></view>
		<view class="tab_box">
			<view class="tab_item" v-for="item,index in tab" :key='index' @click="changtab(index)"
				:class="act == index?'acted':''">
				{{item}}
			</view>
		</view>
		<view class="box" v-if="datalist.length > 0">
			<view class="item" v-for="item,index in datalist" :key='item.id'>
				<view class="item_left">
					<image :src="item.user_head_img" class="logo" mode=""></image>
					<text class="text">{{item.realname}}</text>
				</view>
				<view class="item_right">
					<view class="all" @click="agree(item.id)">
						同意
					</view>
					<view class="canuse" @click="no(item.id)">
						拒绝
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
				tab: [
					'员工审核',
					'店长申请'
				],
				datalist: [],
				act: 0,
				page: 1,
				total: 0
			};
		},
		onReachBottom() {
			if (this.datalist.length >= this.total) {
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page - 0) + 1
			this.getdata()
		},
		onLoad() {
			this.getdata()
			this.$api.getActUser({}, {
				success: (ret) => {
					if (ret.code == 200) {}
				}
			})
		},
		methods: {
			//选择签单类型
			changtab(index) {
				this.act = index
				this.page = 1
				this.total = 0
				this.datalist = []
				this.getdata()
			},
			//获取数据
			getdata() {
				var type = 'invitationList'
				if (this.act == 0) {
					type = 'invitationList'
				} else {
					type = 'invitationListStore'
				}
				this.$api[type]({
					page: this.page
				}, {
					success: (ret) => {
						if (ret.code == 200) {
							if (this.page == 1) {
								this.datalist = ret.data.data
							} else {
								this.datalist = [...this.datalist, ...ret.data.data]
							}
							this.total = ret.data.total
						}
					}
				})
			},
			//统一审核
			agree(id) {
				if (this.act == 0) {
					this.$api.invitationExamine({
						id: id,
						status: '2'
					}, {
						success: (ret) => {
							console.log(ret)
							if (ret.code == 200) {
								this.$Common.commonToast(ret.msg)
								setTimeout(() => {
									this.getdata()
								}, 500)
							}
						}
					})
				} else {
					this.$api.invitationExamine({
						id: id,
						status: '6'
					}, {
						success: (ret) => {
							console.log(ret)
							if (ret.code == 200) {
								this.$Common.commonToast(ret.msg)
								setTimeout(() => {
									this.getdata()
								}, 500)
							}
						}
					})
				}
			},
			//拒绝审核
			no(id) {
				this.$api.invitationExamine({
					id: id,
					status: '0'
				}, {
					success: (ret) => {
						console.log(ret)
						if (ret.code == 200) {
							this.$Common.commonToast(ret.msg)
							setTimeout(() => {
								this.getdata()
							}, 500)
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}

	.tab_box {
		margin-top: 24rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 80rpx;

		.tab_item {
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			padding-bottom: 2rpx;
			border-bottom: 4rpx solid transparent;
		}

		.acted {
			color: @common;
			border-bottom: 4rpx solid @common;
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
			padding: 22rpx 28rpx;

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
				}
			}

			.item_right {
				display: flex;
				align-items: center;

				.all {
					font-size: 26rpx;
					font-weight: 500;
					color: #FFFFFF;
					background: #69A87B;
					border-radius: 8rpx;
					padding: 10rpx 40rpx;
				}

				.canuse {
					margin-left: 16rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: #FFFFFF;
					background: #E02020;
					border-radius: 8rpx;
					padding: 10rpx 40rpx;
				}
			}
		}
	}
</style>
