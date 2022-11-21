<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-30 14:03:53
 * @Description: 销售排行
-->
<template>
	<view class="sell-ranking">
		<Header :key="comKey" :notitle="navTitle" haveback></Header>
		<view class="top-area">
			<view class="top-area-bg">
				<view class="bg-color"></view>
			</view>
			<!-- 销售排行tab -->
			<view class="top-area-tabs" :class="tabCurOne === 3 ? 'chart' : ''">
				<view v-for="(item, i) of tabsOne" :key="i" class="tabs-item" :class="tabCurOne === i ? 'active' : ''" @click="chooseTabOne(i)">
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 线上/线下订单 tab -->
			<view class="top-area-tabs order" :class="tabCurOne === 3 ? 'chart' : ''">
				<view v-for="(item, i) of orderTab" :key="i" class="tabs-item" :class="orderTabCur === i ? 'active' : ''" @click="chooseOrderTab(i)">
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 个人/门店/战队/战区排行 tab -->
			<view class="top-area-tabs">
				<view v-for="(item, i) of tabsTwo" :key="i" class="tabs-item" :class="tabCurTwo === i ? 'active' : ''" @click="chooseTabTwo(i, item)">
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 开始时间选择 -->
			<view class="time-select" v-if="!selectTimeDisabled">
				<picker @change="startTimeChange" :value="saleForm.start_date" :end="saleForm.end_date" :disabled="selectTimeDisabled" mode="date">
					<view class="select-box" :class="selectTimeDisabled ? 'disabled-box' : ''">
						<text>
							{{ saleForm.start_date ? saleForm.start_date : '开始时间' }}
						</text>
					</view>
				</picker>
				<text class="middle-text">至</text>
				<picker @change="endTimeChange" :value="saleForm.end_date" :start="saleForm.start_date" mode="date" :disabled="selectTimeDisabled">
					<view class="select-box" :class="selectTimeDisabled ? 'disabled-box' : ''">
						<text>
							{{ saleForm.end_date ? saleForm.end_date : '结束时间' }}
						</text>
					</view>
				</picker>
				<text @click="resetTime" class="reset-btn">重置</text>
			</view>
			<!-- 结束时间选择 -->
			<view class="search-area">
				<view class="search-box">
					<view class="icon">
						<image src="../../static/selle_ranking/search.png" mode="scaleToFill" />
					</view>
					<input v-model="saleForm.name" type="text" placeholder="搜索" placeholder-style="color:#fff" />
				</view>
				<text @click="handleSearch" class="search-btn">搜索</text>
			</view>
			<!-- 销售额排行 数据卡片 -->
			<view v-if="saleData" class="data-card">
				<view class="data-card-item">
					<text class="title">总销售额</text>
					<text class="num">{{ saleData.total_sale_money }}</text>
				</view>
				<view class="data-card-item">
					<text class="title">总销售数量</text>
					<text class="num">{{ saleData.total_sale_num }}</text>
				</view>
				<view class="data-card-item">
					<text class="title">总销售单数</text>
					<text class="num">{{ saleData.total_sale_count }}</text>
				</view>
				<view v-if="tabCurOne === 0" class="data-card-item">
					<text class="title">总任务数</text>
					<text class="num">{{ saleData.task_money }}</text>
				</view>
			</view>
		</view>
		<!-- 销售额排行 -->
		<template>
			<view v-for="(item, i) of listData" :key="i" class="team-item">
				<text class="team-item-index">{{ i + 1 }}</text>
				<view class="team-item-avatar">
					<image v-if="item.img" :src="item.img" mode="scaleToFill" />
					<image v-else src="../../static/user.png" mode="scaleToFill" />
				</view>
				<view class="team-item-info">
					<view class="info-top">
						<text class="title">{{ item.name }}</text>
					</view>
					<view class="info-bottom">
						<view class="star-box">
							<text class="star-box-title">销售额</text>
							<text class="star-box-num">
								<text v-if="tabCurOne === 2 && item.sale_money_levelNum !== 0" class="change" :class="item.sale_money_level === 'up' ? 'up' : ''">
									{{ item.sale_money_level === 'up' ? '+' : '-' }}
									{{ item.sale_money_levelNum }}
									{{ item.sale_money_level === 'up' ? '↑' : '↓' }}
								</text>
								{{ item.sale_money }}
							</text>
						</view>
						<view class="star-box">
							<text class="star-box-title">销售数量</text>
							<text class="star-box-num">
								<text v-if="tabCurOne === 2 && item.sale_num_levelNum !== 0" class="change" :class="item.sale_num_level === 'up' ? 'up' : ''">{{ item.sale_num_level === 'up' ? '+' : '-' }}{{ item.sale_num_levelNum }}{{ item.sale_num_level === 'up' ? '↑' : '↓' }}</text>
								{{ item.sale_num }}
							</text>
						</view>
						<view class="star-box">
							<text class="star-box-title">总销售单数</text>
							<text class="star-box-num">
								<text v-if="tabCurOne === 2 && item.sale_count_levelNum !== 0" class="change" :class="item.sale_count_level === 'up' ? 'up' : ''">{{ item.sale_count_level === 'up' ? '+' : '-' }}{{ item.sale_count_levelNum }}{{ item.sale_count_level === 'up' ? '↑' : '↓' }}</text>
								{{ item.sale_count }}
							</text>
						</view>
					</view>
				</view>
			</view>
			<noData v-if="listData.length === 0"></noData>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			comKey: 'header.1',
			pageIndex: 0,
			/* 导航栏名称 */
			navTitle: '销售额排行',
			tabsOne: [
				{
					id: 1,
					title: '总排行',
				},
				{
					id: 2,
					title: '昨日排行',
				},
				{
					id: 3,
					title: '今日排行',
				},
			],
			orderTab: [
				{
					id: 1,
					title: '线下签单',
				},
				{
					id: 2,
					title: '线上订单',
				},
			],
			tabsTwo: [
				{
					id: 5,
					title: '个人排行',
				},
				{
					id: 6,
					title: '门店排行',
				},
				{
					id: 7,
					permission: [3, 4],
					title: '战队排行',
				},
				{
					id: 8,
					permission: [4],
					title: '战区排行',
				},
			],
			/* 门店/战队/战区卡片数据 */
			imData: null,
			/* 总数 */
			totalTimes: '',
			listData: [],
			saleData: null,
			chartData: {
				categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				series: [],
			},
			opts: {
				dataLabel: false,
				dataPointShape: false,
				color: ['#427BFF', '#FF4242', '#FF8F42', '#0ECB4A'],
			},
			total: 0,
			reqForm: {
				start_date: '',
				end_date: '',
				/* 种类 1个人 2门店 3战队 4战区 */
				sorts: 1,
				page: 1,
			},
			saleForm: {
				order_type: '1',
				start_date: '',
				end_date: '',
				name: '',
				/* 种类 4个人 3门店 2战队 1战区 */
				type: '4',
				page: 1,
			},
			tabCurOne: 0,
			orderTabCur: 0,
			tabCurTwo: 0,
			/* 控制是否可用watch */
			useWatch: true,
			selectTimeDisabled: false,
		};
	},
	watch: {
		'saleForm.start_date'(n, o) {
			if (this.useWatch) {
				this.verifyDateChange();
			}
		},
		'saleForm.end_date'(n, o) {
			if (this.useWatch) {
				this.verifyDateChange();
			}
		},
	},
	onLoad(options) {
		/* 如果是跳转的页面,则设置好传过来的参数 */
		if (options.data) {
			let data = JSON.parse(decodeURIComponent(options.data));
			/* 设置页面的层级 默认0 */
			this.pageIndex = parseInt(data.index) + 1;
			this.tabCurOne = data.oneTab;
			this.orderTabCur = data.orderTab;
			if (this.pageIndex === 1) {
			}
			/* 修改时间时会触犯watch 所以需要先停用watch发送请求 */
			this.useWatch = false;
			this.saleForm.start_date = data.start;
			this.saleForm.end_date = data.end;
			if (data.orderTab === 0) {
				this.saleForm.order_type = '1';
			}
			if (data.orderTab === 1) {
				this.saleForm.order_type = '2';
			}
			console.log(options.index);
			if (this.pageIndex === 1) {
				delete this.saleForm.store_id;
				this.saleForm.brand_id = data.id;
				this.saleForm.type = '3';
			}
			if (this.pageIndex === 2) {
				delete this.saleForm.brand_id;
				this.saleForm.store_id = data.id;
				this.saleForm.type = '4';
			}
		}
		/* 设置权限 */
		let user = uni.getStorageSync('user');
		if (this.pageIndex === 0) {
			if (user.member_types === 6) {
				this.pageIndex = 1;
				this.saleForm.brand_id = user.brand_id;
				this.saleForm.type = '3';
			}
			if (user.member_types === 2) {
				this.pageIndex = 2;
				this.saleForm.store_id = user.store_id;
				this.saleForm.type = '4';
			}
		}
		this.getSaleList();
		// this.chooseTabTwo()
		// this.getDate()
	},
	onReachBottom() {
		console.log('到底了');
		this.getSaleList();
	},
	methods: {
		/**
		 * @description: 点击线上/线下订单 tab
		 */
		chooseOrderTab(e) {
			this.orderTabCur = e;
			this.saleForm.page = 1;
			this.listData = [];
			switch (this.orderTabCur) {
				case 0:
					this.saleForm.order_type = '1';
					this.getSaleList();
					break;
				case 1:
					this.saleForm.order_type = '2';
					this.getSaleList();
					break;
			}
		},
		/**
		 * @description: 点击搜索按钮
		 */
		handleSearch() {
			this.saleForm.page = 1;
			this.listData = [];
			this.getSaleList();
		},
		/**
		 * @description: 点击销售额排行列表项
		 */
		// chooseSaleItem(item) {
		//   if (this.pageIndex === 2) return
		//   let data = {
		//     id: item.id,
		//     index: this.pageIndex,
		//     oneTab: this.tabCurOne,
		//     towTab:this.tabCurTwo,
		//     orderTab: this.orderTabCur,
		//     start: this.saleForm.start_date,
		//     end: this.saleForm.end_date
		//   }
		//   this.$Common.commonJump(
		//     `/pages/sell-ranking/sell-ranking?data=${encodeURIComponent(
		//       JSON.stringify(data)
		//     )}`
		//   )
		// },
		/**
		 * @description: 设置导航栏标题
		 */
		setNavTitle(title) {
			this.navTitle = title;
			let arr = this.comKey.split('.');
			arr[1] = parseInt(arr[1]) + 1;
			this.comKey = arr.join('.');
		},
		/**
		 * @description: 验证日期改变后是否可请求数据
		 */
		verifyDateChange() {
			console.log('verifyDateChange');
			if (this.saleForm.start_date !== this.saleForm.end_date) {
				if (this.saleForm.start_date === '' || this.saleForm.end_date === '') {
					return;
				}
			}
			this.saleForm.page = 1;
			this.listData = [];
			this.getSaleList();
		},
		/**
		 * @description: 获取销售额排行数据
		 */
		getSaleList() {
			let that = this;
			let data = this.saleForm;
			// data.start_date = this.saleForm.start_date
			// data.end_date = this.saleForm.end_date
			this.$api.BrandStoreSaleMoney(data, {
				success(res) {
					that.useWatch = true;
					console.log(res);
					if (res.data.data.data.length === 0) {
						that.$Common.commonToast('暂无更多数据');
						return;
					}
					res.data.data.data.map((item) => {
						if (!item.sale_money_level) {
							item.sale_money_levelNum = 0;
						}
					});
					that.saleData = res.data;
					that.listData = [...that.listData, ...res.data.data.data];
					that.saleForm.page += 1;
				},
				error(err) {
					that.useWatch = true;
				},
			});
		},
		/**
		 * @description: 根据id获取各个排行榜数据
		 */
		getDataById(item) {
			this.reqForm.page = 1;
			this.reqForm.sorts = this.tabCurTwo;
			this.listData = [];
			switch (this.tabCurTwo) {
				/* 点击的是1 为查看门店下的个人排行 */
				case 1:
					this.reqForm.store_id = item.id;
					this.tabCurTwo = 0;

					this.getSaleList();
					break;
				/* 点击的是2 为查看品牌/战队下的门店排行 */
				case 2:
					this.reqForm.brand_id = item.id;
					this.tabCurTwo = 1;
					this.getSaleList();
					break;
				/* 点击的是3 为查看战区下的品牌/战队排行 */
				case 3:
					this.reqForm.zhan_id = item.id;
					this.tabCurTwo = 2;
					this.getSaleList();
					break;
			}
		},
		/**
		 * @description: 获取当前年月日(YYYY-MM-dd格式)
		 * @param {*} num 要获取的日期 -1为昨天 0为当天 1为明天(默认为0)
		 */
		getDate(num = 0) {
			let date = new Date();
			date.setTime(date.getTime() + num * 24 * 60 * 60 * 1000);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			console.log(month);
			let str = `${year}-${month > 9 ? month : '0' + month}-${day < 10 ? '0' + day : day}`;
			console.log(str);
			return str;
		},
		/**
		 * @description: 重置时间选择
		 */
		resetTime() {
			this.useWatch = false;
			this.saleForm.start_date = '';
			this.saleForm.end_date = '';
			if (this.tabCurOne === 1 || this.tabCurOne === 2) {
				this.tabCurOne = 0;
			}
			this.saleForm.page = 1;
			this.listData = [];

			this.getSaleList();
		},
		/**
		 * @description: 结束时间发生变化
		 * @param {*} e 变化的内容
		 */
		endTimeChange(e) {
			this.saleForm.end_date = e.detail.value;
		},
		/**
		 * @description: 开始时间发生变化
		 * @param {*} e 变化的内容
		 */
		startTimeChange(e) {
			console.log(e);
			this.saleForm.start_date = e.detail.value;
		},
		/**
		 * @description: 选择顶部tab
		 * @param {*} e tab的索引
		 */
		chooseTabTwo(e, item) {
			console.log(item);
			if (item) {
				if (item.permission) {
					let user = uni.getStorageSync('user');
					if (item.permission.indexOf(user.member_types) === -1) {
						this.$Common.commonToast('无访问权限');
						return;
					}
				}
			}
			if (e !== undefined) this.tabCurTwo = e;
			this.listData = [];
			this.saleForm.page = 1;
			this.reqForm.store_id && delete this.reqForm.store_id;
			this.reqForm.brand_id && delete this.reqForm.brand_id;
			this.reqForm.zhan_id && delete this.reqForm.zhan_id;
			// console.log(123123);
			switch (this.tabCurTwo) {
				case 0:
					this.saleForm.type = '4';
					// this.setNavTitle('个人排行榜')
					this.getSaleList();
					break;
				case 1:
					this.saleForm.type = '3';
					// this.setNavTitle('门店排行榜')
					this.getSaleList();

					break;
				case 2:
					this.saleForm.type = '2';
					// this.setNavTitle('战队/门店排行榜')
					this.getSaleList();

					break;
				case 3:
					this.saleForm.type = '1';
					// this.setNavTitle('战区排行榜')
					this.getSaleList();

					break;
			}
		},
		/**
		 * @description: 选择顶部tab
		 * @param {*} e tab的索引
		 */
		chooseTabOne(e) {
			this.tabCurOne = e;
			this.saleForm.page = 1;
			this.listData = [];
			this.useWatch = false;
			this.selectTimeDisabled = false;

			switch (this.tabCurOne) {
				case 0:
					// this.setNavTitle('销售额排行')

					this.saleForm.start_date = '';
					this.saleForm.end_date = '';
					this.getSaleList();
					break;
				case 1:
					// this.navTitle = '销售额排行'

					this.saleForm.start_date = this.getDate(-1);
					this.saleForm.end_date = this.getDate(0);
					this.selectTimeDisabled = true;
					this.getSaleList();
					break;
				case 2:
					// this.navTitle = '销售额排行'

					this.saleForm.start_date = this.getDate(0);
					this.saleForm.end_date = this.getDate(1);
					this.selectTimeDisabled = true;
					this.getSaleList();
					break;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.sell-ranking {
	padding-bottom: 20rpx;
	.top-area {
		width: 690rpx;
		position: relative;
		margin: 0 30rpx;

		&-bg {
			width: 750rpx;
			height: 450rpx;
			position: absolute;
			z-index: 0;
			left: -30rpx;
			display: flex;
			align-items: center;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
			.bg-color {
				left: 50%;
				transform: translateX(-50%);
				position: absolute;
				width: 1500rpx;
				height: 100%;
				border-radius: 0 0 50% 50%;
				background: linear-gradient(to bottom, #2d9df1, #3b8af8);
				&.chart {
					background: #fff;
				}
			}
		}
		&-tabs {
			position: relative;
			z-index: 1;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			.tabs-item {
				width: 146rpx;
				height: 56rpx;
				background: rgba(240, 243, 246, 0.2);
				border-radius: 8rpx;
				border: 1rpx solid #ffffff;
				opacity: 0.3;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
				text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}
				&.active {
					opacity: 1;
				}
			}
		}
		&-tabs.order {
			.tabs-item {
				width: 326rpx;
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
				border: 1rpx solid #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}

				&.disabled-box {
					background-color: #b3b3b3;
					border: 1rpx solid #d6d6d6;

					uni-text {
						color: #868686;
					}
				}
			}
			.middle-text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
			}
			.reset-btn {
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				text-decoration: underline;
			}
		}
		.search-area {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 1;
			margin-top: 20rpx;
			.search-box {
				width: calc(578rpx - 40rpx * 2);
				height: 70rpx;
				display: flex;
				align-items: center;
				padding: 0 40rpx;
				background: rgba(255, 255, 255, 0.3);
				border-radius: 999px;
				.icon {
					width: 24rpx;
					height: 24rpx;
					position: relative;
					image {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0px;
					}
				}
				input {
					flex: 1;
					margin-left: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}
			}
			.search-btn {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				transform: translateY(-5%);
			}
		}
		.data-card {
			padding: 34rpx 0;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;
			position: relative;
			z-index: 1;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
			&-item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				.title {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #6d7278;
				}
				.num {
					font-size: 40rpx;
					font-family: DINAlternate-Bold, DINAlternate;
					font-weight: bold;
					color: #333333;
					margin-top: 20rpx;
				}
			}
		}
	}
	.team-item {
		width: calc(100% - 30rpx * 2 - 14rpx * 2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 14rpx;
		border-radius: 12rpx;
		background: #f7f7f7;
		margin-top: 20rpx;
		margin-left: 30rpx;
		&-index {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #3a3a3a;
		}
		&-avatar {
			width: 100rpx;
			height: 100rpx;
			margin-left: 20rpx;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
		&-info {
			// width: 480rpx;
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			.info-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
			}
			.info-bottom {
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				.star-box {
					// width: 100rpx;
					display: flex;
					flex-flow: column nowrap;
					justify-content: space-between;
					align-items: center;
					margin-left: 0;
					margin-top: 20rpx;
					&-title {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #120000;
					}
					&-num {
						font-size: 28rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: #120000;
						margin-top: 16rpx;
						position: relative;
						.change {
							display: flex;
							flex-flow: row nowrap;
							align-items: center;
							position: absolute;
							font-weight: normal;
							right: 0px;
							top: 50%;
							// transform: translateY(-50%);
							transform: translate(100%, -55%);
							color: #e02020;
						}
						.change.up {
							color: @common;
						}
					}
				}
			}
		}
	}

	/* 趋势分析--start */
	.chart {
		.tabs-item {
			border-color: #333;
			text {
				color: #000;
			}
			&.active {
				border-color: #d5e8fc;
				background: #d5e8fc;
				text {
					color: #1f74b4;
				}
			}
		}
	}
	.top-line {
		border-bottom: 1px solid #d0cdcd;
		margin: 20rpx 0 66rpx;
		width: 690rpx;
		margin-left: 30rpx;
	}
	.trend-wrap {
		width: 100%;
		height: 700rpx;
	}
	/* 趋势分析--end */

	/* 个人排行--start */
	.single-bg {
		height: 296rpx;
	}
	.single-total-times {
		position: relative;
		z-index: 1;
		margin-top: 80rpx;
		display: flex;
		padding: 0 30rpx;
		justify-content: flex-end;
		text {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			text {
				color: #ff4242;
			}
		}
	}
	.single-list {
		padding: 0 30rpx;
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 20rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			margin-top: 20rpx;
			position: relative;
			.item-left {
				display: flex;
				align-items: center;
				.index {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.icon {
					width: 48rpx;
					height: 44rpx;
					position: absolute;
					left: 46rpx;
					top: 0rpx;
					z-index: 3;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
				.info {
					display: flex;
					flex-flow: column nowrap;
					.name,
					.team {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}
					.team {
						margin-top: 22rpx;
					}
				}
			}
			.times {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3a3a3a;
			}
		}
	}
	/* 个人排行--end */

	/* 门店排行--start */
	.shop-bg {
		height: 436rpx;
	}
	.shop-card {
		width: 690rpx;
		margin-left: 30rpx;
		position: relative;
		z-index: 2;
		background: #fff;
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		margin-top: 20rpx;
		display: flex;
		flex-flow: column nowrap;
		padding-bottom: 20rpx;
		.top-tip {
			margin-top: 16rpx;
			.out {
				background: #f58836;
				border-radius: 0px 999px 999px 0px;
				padding: 8rpx 20rpx 8rpx 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				text {
					font-size: 32rpx;
				}
			}
		}
		.shop-data {
			display: flex;
			padding: 0 20rpx;
			justify-content: space-between;
			align-items: center;
			margin-top: 22rpx;
			&-left {
				display: flex;
				align-items: center;
				.shop-index {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.shop-avatar {
					width: 100rpx;
					height: 100rpx;
					overflow: hidden;
					border-radius: 50%;
					margin: 0 20rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.shop-info {
					display: flex;
					flex-flow: column nowrap;
					.shop-name,
					.shop-team {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}
					.shop-team {
						font-weight: 400;
						margin-top: 22rpx;
					}
				}
			}
			.shop-times {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3a3a3a;
			}
		}
	}
	.shop-total-times {
		position: relative;
		z-index: 1;
		margin-top: 40rpx;
		display: flex;
		padding: 0 30rpx;
		justify-content: flex-end;
		text {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			text {
				color: #ff4242;
			}
		}
	}
	.shop-list {
		padding: 0 30rpx;
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 20rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			margin-top: 20rpx;
			position: relative;
			.item-left {
				display: flex;
				align-items: center;
				.index {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.icon {
					width: 48rpx;
					height: 44rpx;
					position: absolute;
					left: 46rpx;
					top: 0rpx;
					z-index: 3;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
				.info {
					display: flex;
					flex-flow: column nowrap;
					.name,
					.team {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}
					.team {
						margin-top: 22rpx;
					}
				}
			}
			.times {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3a3a3a;
			}
		}
	}
	/* 门店排行--end */

	/* 战队/品牌排行--start */
	.team-bg {
		height: 436rpx;
	}
	.team-card {
		width: 690rpx;
		margin-left: 30rpx;
		position: relative;
		z-index: 2;
		background: #fff;
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		margin-top: 20rpx;
		display: flex;
		flex-flow: column nowrap;
		padding-bottom: 20rpx;
		.top-tip {
			margin-top: 16rpx;
			.out {
				background: #f58836;
				border-radius: 0px 999px 999px 0px;
				padding: 8rpx 20rpx 8rpx 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				text {
					font-size: 32rpx;
				}
			}
		}
		.team-data {
			display: flex;
			padding: 0 20rpx;
			justify-content: space-between;
			align-items: center;
			margin-top: 22rpx;
			&-left {
				display: flex;
				align-items: center;
				.team-index {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.team-avatar {
					width: 100rpx;
					height: 100rpx;
					overflow: hidden;
					border-radius: 50%;
					margin: 0 20rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.team-info {
					display: flex;
					flex-flow: column nowrap;
					.team-name,
					.team-team {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}
					.team-team {
						font-weight: 400;
						margin-top: 22rpx;
					}
				}
			}
			.team-times {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3a3a3a;
			}
		}
	}
	.team-total-times {
		position: relative;
		z-index: 1;
		margin-top: 40rpx;
		display: flex;
		padding: 0 30rpx;
		justify-content: flex-end;
		text {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			text {
				color: #ff4242;
			}
		}
	}
	.team-list {
		padding: 0 30rpx;
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 20rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			margin-top: 20rpx;
			position: relative;
			.item-left {
				display: flex;
				align-items: center;
				.index {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3a3a3a;
				}
				.icon {
					width: 48rpx;
					height: 44rpx;
					position: absolute;
					left: 46rpx;
					top: 0rpx;
					z-index: 3;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
				.info {
					display: flex;
					flex-flow: column nowrap;
					.team {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3a3a3a;
					}
				}
			}
			.times {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3a3a3a;
			}
		}
	}
	/* 战队/品牌排行--end */
	.com-nodata {
		margin-top: 30rpx;
	}
}
</style>
