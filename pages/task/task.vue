<template>
	<view>
		<Header></Header>
		<view class="all_box">
			<view class="all_item" v-for="item,indexed in userdata" :key='indexed'>
				<view class="all_item_top">
					<view class="all_item_left">
						<view class="all_item_logo" :style="{backgroundImage: `url(${item.brand_img})`}">

						</view>
						<view class="all_item_name">
							{{item.name}}
						</view>
					</view>
					<view class="all_item_rig">
						<view class="see" @click="see(item)">
							{{item.isshow?'收起':'展开'}}
						</view>
					</view>
				</view>
				<view class="all_item_bot" v-if="item.isshow">
					<view class="bot_item" v-for="itemed,newkey in item.newdata" :key='newkey'>
						<view class="all_item_bot_left" v-if="itemed[0]">
							<view class="bot_name">
								{{itemed[0].name}}:
								<text>{{item.newdatatwo[newkey][0].num}}/{{itemed[0].num}}/</text>
							</view>
						</view>
						<view class="all_item_bot_rig" v-if="itemed[1]">
							<view class="bot_name">
								{{itemed[1].name}}:
								<text>{{item.newdatatwo[newkey][1].num}}/{{itemed[1].num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeobj: {},
				idd: '',
				userdata: [],
				lldata:[]
			};
		},
		onLoad(options) {
			if (options.id) {
				this.idd = options.id
				this.$api.getTaskPerformance({
					stage_id: this.idd
				}, {
					success: (ret) => {
						ret.data.map((item)=>{
							item.isshow = true
						})
						this.lldata = ret.data
						
						this.$api.rewardLlocation({}, {
							success: (ret) => {
								this.typeobj = ret.data
								
								this.lldata.map((item)=>{
									item.newdata = []
									item.newdatatwo = []
								})
								
								this.lldata.map((item)=>{
									let returndata = []
									let returndatatwo = []
									for (let var1 in item.brand_task_info) {
										let newobj = {}
										newobj.key = var1
										newobj.name = this.typeobj[var1]
										newobj.num = item.brand_task_info[var1]
										returndata.push(newobj)
									}
									for (let var1 in item.brand_task_info_s) {
										let newobj = {}
										newobj.key = var1
										newobj.name = this.typeobj[var1]
										newobj.num = item.brand_task_info_s[var1]
										returndatatwo.push(newobj)
									}
									let twoarr = []
									let twoarrtwo = []
									let num = 0
									let number = returndata.length
									for (var i = 0; i < number; i=i+2) {
										var datanew = []
										datanew.push(returndata[i])
										datanew.push(returndata[i+1])
										twoarr.push(datanew)
									}
									let twonumber = returndatatwo.length
									for (var i = 0; i < twonumber; i=i+2) {
										var datanew = []
										datanew.push(returndatatwo[i])
										datanew.push(returndatatwo[i+1])
										twoarrtwo.push(datanew)
									}
									item.newdata = twoarr
									item.newdatatwo = twoarrtwo
								})
								this.userdata=this.lldata
								console.log(this.userdata)
							}
						})
						
					}
				})
				
			}
		},
		methods: {
			see(item) {
				item.isshow = !item.isshow
				console.log(item)
				this.userdata.push({})
				this.userdata.pop()
			},
		}
	}
</script>

<style lang="less" scoped>
	.all_box {
		padding: 20rpx 24rpx;

		.all_item {
			padding: 20rpx 24rpx;
			border-bottom: 2rpx solid #dfdfdf;

			.all_item_top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.all_item_left {
					display: flex;
					align-items: center;

					.all_item_logo {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						background-size: cover;
						background-position: center;
						background-repeat: no-repeat;
					}

					.all_item_name {
						color: #333;
						font-size: 28rpx;
						margin-left: 8rpx
					}
				}

				.all_item_rig {
					display: flex;
					align-items: center;

					.save,
					.see {
						color: @common;
						font-size: 24rpx;
						white-space: nowrap
					}

					.see {
						margin-left: 20rpx;
					}
				}
			}

			.all_item_bot {
				padding-top: 36rpx;

				.bot_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;

					.all_item_bot_left {
						width: 68%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.bot_name {
							color: #656565;
							font-size: 24rpx;
						}

						.int {
							margin-left: 10rpx;
							width: 50%;
							color: #333;
							font-size: 24rpx;
						}
					}

					.all_item_bot_rig {
						width: 72%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.bot_name {
							color: #656565;
							font-size: 24rpx;
						}

						.int {
							margin-left: 10rpx;
							width: 50%;
							color: #333;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
