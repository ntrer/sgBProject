<template>
	<view>
		<Header haveback='true'></Header>
		<view class="" v-if="tuilist.length>0">
			<view class="niuma" v-for="item,index in tuilist" :key='item.id'>
				<view class="bg">
					<view class="white">
						<view class="orange">
							推客信息
						</view>
						<view class="white_name">
							{{item.realname}}
						</view>
						<!-- <view class="white_tel">
							{{item.phones}}
						</view> -->
					</view>
				</view>
				<!-- 按钮操作区域 -->
				<view class="do">
					<view class="doone" @click="goyeji(item.uid)">
						查看
					</view>
					<view class="doone" @click="save(item.uid,index)">
						保存
					</view>
					<view class="doone" @click="ishow(index)">
						{{item.show?'收起':'展开'}}
					</view>
				</view>
				<!-- 信息录入区域 -->
				<view class="bot" v-if="item.show">
					<view class="botone">
						<view class="botone_tit">
							活动目标
						</view>
						<view class="botone_con">
							<view class="item" v-for="items,indexs in item.todown" :key='indexs'>
								<view class="item_text">
									{{items[1]}}
								</view>
								<input class="int" v-model="items[2]" placeholder-style="color:#120000" />
							</view>
						</view>
					</view>
					<view class="botone">
						<view class="botone_tit two">
							当前已完成
						</view>
						<view class="botone_con">
							<view class="item" v-for="itemd,indexss in item.down" :key='indexss'>
								<view class="item_text">
									{{itemd[1]}}
								</view>
								<view class="item_text">
									{{itemd[2]}}
								</view>
							</view>
						</view>
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
				one: {

				},
				two: {

				},
				valueobj: [],
				page: 1,
				total: 0,
				returnobj: {},
				returnrigobj: {},
				userid: '',
				leftobj: {}, //type类型
				leftlist: [],
				rightlist: [],
				uid: '',
				tuilist: [],
				chuan:{},
			};
		},
		onLoad(data) {
			this.chuan = data
			if (data.zhan_id) {
				this.userid = data.zhan_id
				this.getdata('zhan_id')
			} else if (data.brand_id) {
				this.userid = data.brand_id
				this.getdata('brand_id')
			} else if (data.store_id) {
				this.userid = data.store_id
				this.getdata('store_id')
			} else if (data.y_uid) {
				this.userid = data.y_uid
				this.getdata('y_uid')
			} else {
				this.getnewdata()
			}

		},
		onReachBottom() {
			if (this.tuilist.length >= this.total) {
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page - 0) + 1
			if (this.chuan.zhan_id) {
				this.userid = this.chuan.zhan_id
				this.getdata('zhan_id')
			} else if (this.chuan.brand_id) {
				this.userid = this.chuan.brand_id
				this.getdata('brand_id')
			} else if (this.chuan.store_id) {
				this.userid = this.chuan.store_id
				this.getdata('store_id')
			} else if (this.chuan.y_uid) {
				this.userid = this.chuan.y_uid
				this.getdata('y_uid')
			} else {
				this.getnewdata()
			}
		},
		methods: {
			goyeji(id) {
				this.$Common.commonJump('pages/seeyeji/seeyeji?id='+id)
			},
			//保存
			save(id,index) {
				var params = {}
				this.tuilist[index].todown.map((item)=>{
					params[item[0]] = item[2]
				})
				this.$api.setTweetTarget({
					b_uid: id,
					target_type: params
				}, {
					success: (ret) => {
						this.$Common.commonToast(ret.msg, 'success')
					}
				})
			},
			ishow(index) {
				console.log(this.tuilist[index])
				this.tuilist[index].show = !this.tuilist[index].show
			},
			//首页我的推客
			getnewdata() {
				this.$api.tweetTarget({
					page: this.page
				}, {
					success: (ret) => {
						if(this.page == 1){
							var newarr = ret.data.data
						}else{
							var newarr = [...this.tuilist,...ret.data.data]
						}
						this.total = ret.data.total
						this.$api.TweetTargetType({}, {
							success: (ret) => {
								this.leftobj = ret.data
								var arr = []
								var number = 0
								newarr.map((item) => {
									item.down = []
									item.todown = []
									item.show = true
								})
								for (var var1 in this.leftobj) {
									for (let item1 of newarr) {
										var obj = []
										var objs = []
										obj[0] = var1
										objs[0] = var1
										obj[1] = this.leftobj[var1]
										objs[1] = this.leftobj[var1]
										for (var var2 in item1.done_target) {
											if (var1 == var2) {
												obj[2] = item1.done_target[var2]
											}
										}
										for (var var2 in item1.target) {
											if (var1 == var2) {
												objs[2] = item1.target[var2]
											}
										}
										item1.down.push(obj);
										item1.todown.push(objs);
										console.log(1313)
									}
								}
								this.tuilist = newarr
							}
						})
					}
				})
			},
			getdata(tupe) {
				var params = {
					page: this.page,
				}
				params[tupe] = this.userid
				this.$api.allTweetTarget(params, {
					success: (ret) => {
						if(this.page == 1){
							var newarr = ret.data.data
						}else{
							var newarr = [...this.tuilist,...ret.data.data]
						}
						this.total = ret.data.total
						this.$api.TweetTargetType({}, {
							success: (ret) => {
								this.leftobj = ret.data
								var arr = []
								var number = 0
								newarr.map((item) => {
									item.down = []
									item.todown = []
									item.show = true
								})
								for (var var1 in this.leftobj) {
									newarr.map((item) => {
										var obj = []
										var objs = []
										obj[0] = var1
										objs[0] = var1
										obj[1] = this.leftobj[var1]
										objs[1] = this.leftobj[var1]
										for (var var2 in item.done_target) {
											if (var1 == var2) {
												obj[2] = item.done_target[var2]
											}
										}
										item.down.push(obj)
										for (var var2 in item.target) {
											if (var1 == var2) {
												objs[2] = item.target[var2]
											}
										}
										item.todown.push(objs)
									})
								}
								this.tuilist = newarr
								console.log(this.tuilist)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.niuma {
		margin-bottom: 30rpx;
	}

	.bg {
		width: 100%;
		height: 196rpx;
		background: url(../../static/index/mytui.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding-top: 1rpx;

		.white {
			margin: 0 26rpx;
			background-color: #fff;
			margin-top: 16rpx;
			height: 214rpx;
			border-radius: 15rpx;
			padding-top: 20rpx;
			box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, .3);

			.orange {
				background: #F58836;
				border-radius: 0px 200rpx 200rpx 0px;
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding: 15rpx 0;
				width: 128rpx;
				text-align: center;
			}

			.white_name,
			.white_tel {
				margin-top: 28rpx;
				margin-left: 28rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
			}
		}
	}

	.do {
		margin-top: 75rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;

		.doone {
			width: 31%;
			background: @common;
			border-radius: 10rpx;
			text-align: center;
			padding: 14rpx 0;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.bot {
		margin-top: 62rpx;
		display: flex;
		padding: 0 10rpx;

		.botone {
			margin: 0 10rpx;
			width: 50%;

			.botone_tit {
				width: 130rpx;
				margin: 0 auto;
				font-size: 32rpx;
				font-weight: 600;
				color: @common;
				padding-bottom: 2rpx;
				border-bottom: 4rpx solid #0091FF;
			}

			.two {
				width: 170rpx;
			}

			.botone_con {
				margin-top: 28rpx;
				background: #F7F7F7;
				border-radius: 12rpx;
				padding-top: 32rpx;
				padding-left: 28rpx;
				padding-bottom: 10rpx;

				.item {
					display: flex;
					margin-bottom: 24rpx;

					.item_text {
						margin-right: 15rpx;
						white-space: nowrap;
						font-size: 28rpx;
						font-weight: 400;
						color: #120000;
					}

					.int {
						font-size: 28rpx;
						font-weight: 400;
						color: #120000;
					}
				}
			}
		}
	}
</style>
