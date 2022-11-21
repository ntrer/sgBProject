<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<view class="box">
			<view class="item_li" v-for="item,index in performanceListArr[0]" :key='index'>
				<view class="fang">
					<image :src="item.icon" class="fang_icon" mode="widthFix"></image>
				</view>
				<view class="img_right">
					<view class="img_right_left">
						{{item.title}}
					</view>
					<view class="img_right_right" @click="gohref(item)">
						<text class="number">{{item.brief}}</text>
						<text class="number">人</text>
						<image src="../../static/index/next@2x(1).png" class="right_icon" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.$api.tweetAchievement({
				tk_uid: this.idd
			}, {
				success: (data) => {
					this.AchievementObj = data.data
					this.$api.tweetTargetType({
						tk_uid: this.idd
					}, {
						success: rewData => {
							var new_reward_list = []
							for (var i in this.AchievementObj) {
								var new_reward_item = {}
								new_reward_item.title = rewData.data[i]
								new_reward_item.brief = data.data[i]
								new_reward_item.type = i
								new_reward_list.push(new_reward_item)
							}
							var new_performanceListArr = [new_reward_list]
							var i = 0
							for (var item in new_performanceListArr) {
								for (var item2 in new_performanceListArr[item]) {
									console.log(new_performanceListArr[item][item2],
										new_reward_list, i)
									new_performanceListArr[item][item2].title = new_reward_list[i]
										.title
									new_performanceListArr[item][item2].brief = new_reward_list[i]
										.brief
									new_performanceListArr[item][item2].icon = (
										'../../static/yeji/' + (i + 1) + '.png')
									new_performanceListArr[item][item2].goHref =
										'/pages/' + new_reward_list[i].type+'/'+new_reward_list[i].type
									if (new_reward_list[i].title == "线下签单") {
										new_performanceListArr[item][item2].goHref = '/pages/signList/signList'
									}
									if (new_reward_list[i].title == '异业带单') {
										new_performanceListArr[item][item2].goHref = '/pages/signListz/signListz'
									}
									i++
								}
							}
							console.log(new_performanceListArr)
							this.performanceListArr = new_performanceListArr
							console.log(this.performanceListArr)
							this.is_show = true
						}
					})
				}
			})
		},
		onLoad(options) {
			if (options.id) {
				this.idd = options.id
			}
		},
		data() {
			return {
				performanceListArr: [
					
				],
				AchievementObj: {},
				idd: '',
				is_show: false,
			};
		}
		,methods:{
			gohref(item){
				let href = item.goHref
				href = href+'?id='+this.idd+'&type='+item.type
				this.$Common.commonJump(href)
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

	.box {
		padding: 0 26rpx;

		.item_li {
			display: flex;
			align-items: center;

			.fang {
				padding-top: 6rpx;
				width: 50rpx;
				height: 50rpx;
				margin-right: 30rpx;
				.fang_icon{
					width: 100%;
				}
			}

			.img_right {
				width: 100%;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #dfdfdf;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.img_right_left {
					font-weight: 700;
					font-size: 28rpx;

				}

				.img_right_right {
					display: flex;
					align-items: center;

					.number {
						font-weight: 700;
						font-size: 24rpx;
						color: #666;
					}

					.right_icon {
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
	}
</style>
