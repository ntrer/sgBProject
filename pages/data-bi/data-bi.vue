<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-31 16:44:04
 * @Description: 数据BI分析
-->
<template>
	<view class="data-bi">
		<Header haveback></Header>
		<view class="fixed_shai" @click="show">
			<text class="change_text">筛选</text>
			<image src="../../static/data_bi/iocn_bottom.png" mode="" class="change_img"></image>
		</view>
		<view class="top-area">
			<view class="top-area-tabs">
				<view v-for="(item, i) of tabsOne" :key="i" class="tabs-item" :class="tabCurOne === i ? 'active' : ''"
					@click="chooseTabOne(i, item)">
					<text>{{ item.title }}</text>
				</view>
			</view>
			<view class="time-select">
				<picker @change="startTimeChange" :value="reqForm.star_time" :end="reqForm.end" mode="date">
					<view class="select-box">
						<text>
							{{ reqForm.star_time ? reqForm.star_time : '开始时间' }}
						</text>
					</view>
				</picker>
				<text class="middle-text">至</text>
				<picker @change="endTimeChange" :value="reqForm.end_time" :start="reqForm.star_time" mode="date"
					:disabled="!reqForm.star_time">
					<view class="select-box">
						<text>{{ reqForm.end_time ? reqForm.end_time : '结束时间' }}</text>
					</view>
				</picker>
				<text @click="resetTime" class="reset-btn">重置</text>
			</view>
			<picker mode="selector" :range="rankingOptions" :value="rankingCur" @change="rankingChange">
				<view class="ranking-select">
					<text>显示排行前几名- {{ rankingOptions[rankingCur] }}</text>
					<view class="icon">
						<image src="../../static/data_bi/iocn_bottom.png" mode="scaleToFill" />
					</view>
				</view>
			</picker>
			<view class="under-line"></view>
		</view>
		<view class="ranking-list">
			<view class="top-btn">
				<view class="top-btn-bg">
					<image src="../../static/data_bi/title_img.png" mode="scaleToFill" />
				</view>
				<view @click="chooseRanking(0)" class="top-btn-btn"></view>
				<view @click="chooseRanking(1)" class="top-btn-btn"></view>
			</view>
			<view class="san-jiao-list">
				<view class="item" :class="listCur === 0 ? 'active' : ''">
					<view></view>
				</view>
				<view class="item black" :class="listCur === 1 ? 'active' : ''">
					<view></view>
				</view>
			</view>
			<view class="list-data-area" :class="listCur === 1 ? 'black' : ''">
				<view class="list-data-title">
					<text>数据汇总: <text v-for="items,ids in changetype" :key='ids'
							v-if="changetype.length != 0">{{items+'、'}}</text></text>
				</view>
				<view v-for="(item, i) of listData" :key="i" class="list-data-item">
					<view class="item-left">
						<text class="index">{{ i + 1 }}</text>
						<view class="avatar">
							<template v-if="tabCurOne === 0">
								<image v-if="item.user_head_img" :src="item.user_head_img" mode="scaleToFill" />
							</template>
							<template v-if="tabCurOne === 1">
								<image v-if="item.store_img" :src="item.store_img" mode="scaleToFill" />
							</template>
							<template v-if="tabCurOne === 2">
								<image v-if="item.brand_img" :src="item.brand_img" mode="scaleToFill" />
							</template>
							<image src="../../static/user.png" mode="scaleToFill" />
						</view>
						<view class="info">
							<text v-if="item.realname" class="info-top">
								{{ item.realname }}
							</text>
							<text v-if="item.store_name" class="info-middle">
								门店: {{ item.store_name }}
							</text>
							<text class="info-bottom">战队: {{ item.brand_name }}</text>
						</view>
					</view>
					<text class="num">{{ item.count }}积分</text>
				</view>
				<noData v-if="listData.length === 0"></noData>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">筛选</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<view class="proup_item" v-for="item,ii in listDataold" :key='ii' @click="changeproup(ii)"
						:class="item.show?'proup_act':''">
						{{item.name}}
					</view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close">取消</view>
					<view class="proup_btn2" @click="close('api')">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsOne: [{
						id: 1,
						title: '个人排行',
						permission: [4, 3, 2, 6]
					},
					{
						id: 2,
						title: '门店排行',
						permission: [4, 3, 6]
					},
					{
						id: 3,
						title: '战队排行',
						permission: [4, 3]
					}
					// {
					//   id: 4,
					//   title: '产品排行'
					// }
				],
				listData: [],
				reqForm: {
					all_type: 'all_type',
					star_time: '',
					end_time: '',
					sorts: 1,
					sort: 'desc',
					type: ''
				},
				rankingOptions: [20, 10, 5, 3],
				rankingCur: 0,
				tabCurOne: 0,
				listCur: 0,
				/* 控制是否可用watch */
				useWatch: true,
				ishow: false,
				act: [],
				newlistData: [],
				maxNum: 0,
				signnum: 0,
				pageType: '',
				listDataold: null,
				keylist: [], //活动key数组
				taichiobj: [],
				changetype:[]
			}
		},
		watch: {
			'reqForm.star_time'(n, o) {
				if (this.useWatch) {
					this.verifyDateChange()
				}
			},
			'reqForm.end_time'(n, o) {
				if (this.useWatch) {
					this.verifyDateChange()
				}
			},
			act(val) {
				console.log(12313)
				var yarray = []
				for (let n in this.listDataold) {
					let rt = val.indexOf(this.listDataold[n].name)
					if (rt != -1) {
						yarray.push(this.listDataold[n])
					}
				}
				// if(this.signnum == 0){
				// 	this.newlistData = this.listDataold
				// }else{
				this.newlistData = yarray
				// }
				var paramsdata = []
				this.newlistData.map((itemdata) => {
					paramsdata.push(itemdata.key)
				})
				this.reqForm.type = paramsdata.join()
				this.reqForm.sort_num = this.rankingOptions[this.rankingCur]
				var that = this
				//重新获取红黑棒数据
				this.$api.getBrandRanking(that.reqForm, {
					success(res) {
						that.signnum = (that.signnum - 0) + 1
						this.useWatch = true
						if (res.data.data.length === 0) {
							that.$Common.commonToast('没有更多数据了')
							return
						}
						that.listData = res.data.data
						that.signnum = (that.signnum - 0) + 1
					},
					error(err) {
						this.useWatch = true
					}
				})
				//重新获取筛选类型
				that.$api.setRedBlackInit({
					beans_value_opt: paramsdata.join()
				}, {
					success(data) {
						var new_pkInfoList = []
						var maxNum = 0
						that.changetype = Object.values(data.data.TemplateOpt)
						that.taichiobj = Object.values(data.data.TemplateOpt)
						for (var i in data.data.Template) {
							var pkInfo_item = {}
							pkInfo_item.show = false
							pkInfo_item.name = data.data.Template[i]
							pkInfo_item.key = i
							new_pkInfoList.push(pkInfo_item)
						}
						for (var i2 in data.data.TemplateOpt) {
							new_pkInfoList.map((item) => {
								if (item.key == i2) {
									item.show = true
								}
							})
						}

						that.maxNum = maxNum
						that.listDataold = new_pkInfoList
						that.listDataold.push({})
						that.listDataold.pop()
					}
				})
			}
		},
		onLoad(options) {
			this.getdata()
		},
		onShow() {},
		methods: {
			changeproup(ii) {
				let changename = this.listDataold[ii].name
				console.log(changename)
				this.listDataold[ii].show = !this.listDataold[ii].show
				let num = this.taichiobj.indexOf(changename)
				if (num == -1) {
					this.taichiobj.push(changename)
				} else {
					this.taichiobj.splice(num, 1)
				}
			},
			show() {
				this.$refs.popup.open('center')
			},
			close(data) {
				this.$refs.popup.close()

				if (data == 'api') {
					console.log(this.taichiobj)
					this.act = this.taichiobj
				} else {
					var paramsdata = []
					this.newlistData.map((itemdata) => {
						paramsdata.push(itemdata.key)
					})
					this.$api.setRedBlackInit({
						beans_value_opt: paramsdata.join()
					}, {
						success: (data) => {
							var new_pkInfoList = []
							var maxNum = 0
							that.changetype = Object.values(data.data.TemplateOpt)
							that.taichiobj = Object.values(data.data.TemplateOpt)
							for (var i in data.data.Template) {
								var pkInfo_item = {}
								pkInfo_item.show = false
								pkInfo_item.name = data.data.Template[i]
								pkInfo_item.key = i
								new_pkInfoList.push(pkInfo_item)
							}
							for (var i2 in data.data.TemplateOpt) {
								new_pkInfoList.map((item) => {
									if (item.key == i2) {
										item.show = true
									}
								})
							}

							this.listDataold = new_pkInfoList
							this.listDataold.push({})
							this.listDataold.pop()
						}
					})
				}
			},
			verifyDateChange() {
				if (this.reqForm.star_time !== this.reqForm.end_time) {
					if (this.reqForm.star_time === '' || this.reqForm.end_time === '') {
						return
					}
				}
				this.listData = []
				this.getList()
			},
			getList() {
				this.act.push('')
			},
			//获取筛选数据
			getdata() {
				var that = this
				that.$api.setRedBlackInit({
					beans_value_opt: ''
				}, {
					success(data) {
						var new_pkInfoList = []
						var maxNum = 0
						that.changetype = Object.values(data.data.TemplateOpt)
						that.taichiobj = Object.values(data.data.TemplateOpt)
						for (var i in data.data.Template) {
							var pkInfo_item = {}
							// if(that.signnum == 0){
							// pkInfo_item.show = true
							// }else{
							pkInfo_item.show = false
							// }
							pkInfo_item.name = data.data.Template[i]
							pkInfo_item.key = i
							new_pkInfoList.push(pkInfo_item)
						}
						for (var i2 in data.data.TemplateOpt) {
							new_pkInfoList.map((item) => {
								if (item.key == i2) {
									item.show = true
								}
							})
						}
						that.maxNum = maxNum
						that.listDataold = new_pkInfoList
						console.log(that.listDataold)
					}
				})
				var paramsdata = []
				this.newlistData.map((itemdata) => {
					paramsdata.push(itemdata.key)
				})
				this.reqForm.type = paramsdata.join()
				console.log(this.reqForm.type)
				this.reqForm.sort_num = this.rankingOptions[this.rankingCur]
				var that = this
				//重新获取红黑棒数据
				this.$api.getBrandRanking(that.reqForm, {
					success(res) {
						that.signnum = (that.signnum - 0) + 1
						this.useWatch = true
						if (res.data.data.length === 0) {
							that.$Common.commonToast('没有更多数据了')
							return
						}
						that.listData = res.data.data
						that.signnum = (that.signnum - 0) + 1
					},
					error(err) {
						this.useWatch = true
					}
				})
			},
			/**
			 * @description: 监听显示前几名发生变化
			 */
			rankingChange(e) {
				console.log(e)
				this.rankingCur = e.detail.value
				this.listData = []
				this.getList()
			},
			/**
			 * @description: 选择红榜 黑榜
			 * @param {*} e 选择的值
			 */
			chooseRanking(e) {
				this.listCur = e
				e === 0 && (this.reqForm.sort = 'desc')
				e === 1 && (this.reqForm.sort = 'asc')
				if (this.tabCurOne === 3) return
				this.getList()
			},
			/**
			 * @description: 重置时间选择
			 */
			resetTime() {
				this.useWatch = false
				this.reqForm.star_time = ''
				this.reqForm.end_time = ''
				this.listData = []
				this.newlistData = []
				this.getList()
			},
			/**
			 * @description: 结束时间发生变化
			 * @param {*} e 变化的内容
			 */
			endTimeChange(e) {
				this.reqForm.end_time = e.detail.value
			},
			/**
			 * @description: 开始时间发生变化
			 * @param {*} e 变化的内容
			 */
			startTimeChange(e) {
				console.log(e)
				this.reqForm.star_time = e.detail.value
			},
			/**
			 * @description: 选择顶部tab
			 * @param {*} e tab的索引
			 */
			chooseTabOne(e, item) {
				if (item.permission) {
					let user = uni.getStorageSync('user')
					console.log(user.member_types)
					console.log(item.permission)
					if (item.permission.indexOf(user.member_types) === -1) {
						this.$Common.commonToast('无访问权限')
						return
					}
				}
				this.tabCurOne = e
				// this.getdata()
				this.listData = []
				switch (this.tabCurOne) {
					case 0:
						console.log(this.tabCurOne)
						this.reqForm.sorts = 1
						this.getList()
						break
					case 1:
						console.log(this.tabCurOne)
						this.reqForm.sorts = 2
						this.getList()
						break
					case 2:
						console.log(this.tabCurOne)
						this.reqForm.sorts = 3
						this.getList()
						break
					case 3:
						console.log(this.tabCurOne)
						break
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f5f6f8;
	}

	.fixed_shai {
		position: fixed;
		top: 30rpx;
		right: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #333;
		z-index: 9;

		.change_text {
			margin-right: 10rpx;
		}

		.change_img {
			width: 26rpx;
			height: 26rpx;
			vertical-align: middle;
		}
	}

	.data-bi {
		padding-bottom: 20rpx;

		.top-area {
			background: #ffffff;
			width: 690rpx;
			position: relative;
			margin-top: 20rpx;
			padding: 0 30rpx;

			&-bg {
				width: 750rpx;
				height: 436rpx;
				position: absolute;
				z-index: 0;
				left: -30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			&-tabs {
				position: relative;
				z-index: 1;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;

				.tabs-item {
					width: 200rpx;
					height: 56rpx;
					background: rgba(240, 243, 246, 0.2);
					border-radius: 8rpx;
					border: 1rpx solid #333;
					opacity: 0.3;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;

					text {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000;
					}

					&.active {
						opacity: 1;
						border-color: #d5e8fc;
						background: #d5e8fc;

						text {
							color: #1f74b4;
						}
					}
				}
			}

			.time-select {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				position: relative;
				z-index: 1;

				.select-box {
					width: 256rpx;
					height: 56rpx;
					background: rgba(240, 243, 246, 0.2);
					border-radius: 8rpx;
					border: 1rpx solid #000;
					display: flex;
					justify-content: center;
					align-items: center;
					opacity: 0.3;

					text {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000;
					}
				}

				.middle-text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000;
					opacity: 0.3;
				}

				.reset-btn {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333;
					text-decoration: underline;
					padding-right: 20rpx;
				}
			}

			.ranking-select {
				margin-top: 20rpx;
				width: 308rpx;
				height: 56rpx;
				border-radius: 8rpx;
				border: 1rpx solid rgba(0, 0, 0, 0.3);
				display: flex;
				justify-content: space-around;
				align-items: center;

				text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.85);
				}

				.icon {
					width: 26rpx;
					height: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.under-line {
				height: 1px;
				background: #d0cdcd;
				margin-top: 20rpx;
			}
		}

		.ranking-list {
			background: #ffffff;

			.top-btn {
				width: 690rpx;
				padding: 10rpx 30rpx 0;
				position: relative;
				height: 144rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-bg {
					position: absolute;
					z-index: 1;
					width: 690rpx;
					height: 144rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				&-btn {
					width: 40%;
					height: 70%;
					position: relative;
					z-index: 2;
				}
			}

			.san-jiao-list {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					border-left: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
					border-bottom: 18rpx solid #ffffff;
					position: relative;

					view {
						border-left: 10rpx solid transparent;
						border-right: 10rpx solid transparent;
						border-bottom: 18rpx solid #ffffff;
						display: none;
						position: absolute;
						z-index: 1;
						transform: translate(-50%, 4px);
					}

					&.active {
						border-bottom: 18rpx solid #eb4747;

						view {
							display: block;
						}
					}

					&.active.black {
						border-bottom-color: #534a4a;
					}
				}
			}

			.list-data-area {
				width: calc(100% - 8rpx * 2 - 20rpx * 2 - 4px);
				margin-left: 8rpx;
				border-radius: 10rpx;
				border: 2px solid #eb4747;
				// padding-bottom: 20rpx;
				padding: 0 20rpx 20rpx;

				.list-data-title {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #787777;
					padding-top: 20rpx;
					display: flex;
					justify-content: flex-end;
				}

				.list-data-item {
					margin-top: 20rpx;
					border-radius: 12rpx;
					background: #f7f7f7;
					display: flex;
					padding: 16rpx 16rpx;
					justify-content: space-between;
					align-items: center;

					text {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}

					.item-left {
						display: flex;
						align-items: center;

						.avatar {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							overflow: hidden;
							margin: 0 10rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.info {
							display: flex;
							flex-flow: column nowrap;

							&-middle {
								margin: 10rpx 0;
							}
						}
					}
				}
			}

			.list-data-area.black {
				border-color: #534a4a;
			}
		}
	}

	.popup_box {
		box-sizing: border-box;
		position: relative;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 32rpx 36rpx;
		padding-bottom: 56rpx;

		.proup_tit {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
			padding-bottom: 24rpx;
			border-bottom: 1rpx solid #d0cdcd;
			margin-bottom: 18rpx;
		}

		.proup_icon {
			position: absolute;
			right: 5%;
			top: 10%;

			.close_icon {
				width: 26rpx;
				height: 26rpx;
			}
		}

		.proup_content {
			padding: 0 12rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.proup_item {
				width: 30%;
				padding: 20rpx 0;
				text-align: center;
				background-color: #dfdfdf;
				color: #333;
				margin-bottom: 22rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
			}

			.proup_act {
				color: #fff;
				background-color: @common;
			}
		}

		.proup_bottom {
			margin: 34rpx 36rpx 0rpx 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.proup_btn1,
			.proup_btn2 {
				padding: 13rpx 86rpx;
				font-size: 32rpx;
				font-weight: 500;
				border-radius: 10rpx;
			}

			.proup_btn1 {
				color: @common;
				border: 2rpx solid @common;
			}

			.proup_btn2 {
				color: #ffffff;
				background: @common;
			}
		}
	}
</style>
