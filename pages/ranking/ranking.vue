<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 17:52:54
 * @Description: 业绩页面
-->
<template>
	<view class="ranking-wrap">
		<view class="top-title">
			<text class="top-title-text">智能数据排行</text>
		</view>
		<view class="top-card">
			<view class="top-card-bg">
				<image src="../../static/ranking/ranking_bg.png" mode="scaleToFill" />
			</view>
			<view class="top-card-content">
				<text class="content-tip">任务目标</text>
				<view class="data-box">
					<text class="title">完成进度</text>
					<text v-if="rateData" class="num">{{ rateData.num || 0 }}天</text>
				</view>
				<view class="data-box">
					<text class="title">完成率</text>
					<text v-if="rateData" class="num">{{ rateData.rate_sale || 0 }}%</text>
				</view>
			</view>
		</view>
		<view class="first-card" v-if="performanceListArr.length > 0">
			<view class="card-title">
				<text>推广引流</text>
			</view>
			<view class="card-content" :class="showMore ? '' : 'hide'">
				<view v-for="(item, i) of performanceListArr" @click="navTonew(item.name)" :key="i" class="card-item">
					<view class="card-item-bg">
						<image :src="item.icon" class="icon" mode="scaleToFill" />
					</view>
					<view class="card-item-title">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="show-more">
				<text @click="toggleShowMore">{{ showMore ? '收起' : '更多' }}</text>
			</view>
		</view>
		<view v-for="(item, i) of elseCardData" :key="i" class="else-card">
			<view v-if="checkPermission(item)" class="card-title">
				<text>{{ item.title }}</text>
			</view>
			<view v-if="checkPermission(item)" class="card-content">
				<template v-for="(box, index) of item.list">
					<view v-if="checkPermission(box)" @click="navTo(box)" class="card-content-item" :class="index % 3 === 0 ? 'no-margin' : ''" :key="index">
						<view class="bg-img">
							<image :src="box.img" mode="scaleToFill" />
						</view>
						<view class="title">
							<text>{{ box.title }}</text>
						</view>
					</view>
				</template>
			</view>
		</view>
		<Tabbar :selectIndex="2"></Tabbar>
	</view>
</template>

<script>
import Tabbar from '../../components/Tabbar.vue';
export default {
	components: {
		Tabbar,
	},
	data() {
		return {
			rateData: null,
			firstCardData: [
				{
					img: '../../static/ranking/bao_ming.png',
					title: '报名',
					path: '',
				},
				{
					img: '../../static/ranking/liu_lan.png',
					title: '浏览',
					path: '',
				},
				{
					img: '../../static/ranking/lie_bian.png',
					title: '裂变',
					path: '',
				},
				{
					img: '../../static/ranking/shou_ka.png',
					title: '售卡【优惠券】',
					path: '',
				},
				{
					img: '../../static/ranking/ji_zan.png',
					title: '集赞',
					path: '',
				},
				{
					img: '../../static/ranking/zhi_bo_jian_qian_dan.png',
					title: '直播间签单',
					path: '',
				},
				{
					img: '../../static/ranking/shan_gou.png',
					title: '闪购',
					path: '',
				},
				{
					img: '../../static/ranking/pin_tuan.png',
					title: '拼团',
					path: '',
				},
				{
					img: '../../static/ranking/yu_shou.png',
					title: '预售',
					path: '',
				},
				{
					img: '../../static/ranking/gong_xian.png',
					title: '贡献签单',
					path: '',
				},
				{
					img: '../../static/ranking/xian_xia.png',
					title: '线下签单',
					path: '',
				},
			],
			elseCardData: [
				{
					title: '目标驱动',
					list: [
						{
							title: '销售排行榜',
							img: '../../static/ranking/xiao_shou.png',
							path: '/pages/newranking/newranking',
						},
						{
							title: '动作红黑榜',
							img: '../../static/ranking/dong_zuo.png',
							path: '/pages/data-bi/data-bi',
						},
						{
							title: 'CRM星级客户',
							img: '../../static/ranking/crm_star.png',
							path: '/pages/crm-star/crm-star',
						},
					],
				},
				{
					title: 'PK矩阵',
					permission: [3, 4],
					list: [
						{
							title: '战区PK',
							img: '../../static/ranking/zhan_qu.png',
							path: '/pages/pk/pk',
							data: { pageType: 0 },
						},
						{
							title: '战队PK',
							img: '../../static/ranking/zhan_dui.png',
							path: '/pages/pk/pk',
							permission: [4],
							data: { pageType: 1 },
						},
						// {
						//   title: '个人PK',
						//   img: '../../static/ranking/men_dian.png',
						//   path: '/pages/pk/pk',
						//   data: { pageType: 2 }
						// }
					],
				},
			],
			showMore: true,
			performanceListArr: [],
			AchievementObj: {},
		};
	},
	onLoad() {
		let that = this;
		that.$api.getBonusBeans(
			{},
			{
				success(res) {
					that.AchievementObj = res.data.type;
					var key = Object.keys(that.AchievementObj);
					var value = Object.values(that.AchievementObj);
					var iconIndex = 0;
					value.forEach((i, x) => {
						var newobj = {};
						newobj.name = i;
						newobj.icon = '../../static/yeji/' + (iconIndex + 1) + '.png';
						iconIndex = iconIndex + 1;
						if (iconIndex > 9) {
							iconIndex = 0;
						}
						that.performanceListArr.push(newobj);
					});
					console.log(that.performanceListArr);
				},
			}
		);
	},
	onShow() {
		this.getRate();
		// this.checkPermission()
	},
	methods: {
		/**
		 * @description: 检查权限
		 */
		checkPermission(item) {
			let user = uni.getStorageSync('user');
			if (item.permission) {
				if (item.permission.indexOf(user.member_types) !== -1) {
					return true;
				} else {
					return false;
				}
			}
			return true;
		},
		/**
		 * @description: 获取完成进度/完成率
		 */
		getRate() {
			let that = this;
			that.$api.getTargetSpeed(
				{},
				{
					success(res) {
						that.rateData = res.data;
					},
				}
			);
		},
		/**
		 * @description: 跳转页面
		 * @param {*} item  当前点击项
		 */
		navTo(item) {
			if (!item.path) {
				this.$Common.commonToast('暂未开放');
				return;
			}
			if (item.data) {
				this.$Common.commonJump(item.path + '?data=' + encodeURIComponent(JSON.stringify(item.data)));
				return;
			}
			this.$Common.commonJump(item.path);
		},
		navTonew(name) {
			console.log(name);
			console.log(this.AchievementObj);
			var typeschange = '';
			for (let var1 in this.AchievementObj) {
				if (this.AchievementObj[var1] == name) {
					typeschange = var1;
				}
			}
			this.$Common.commonJump('/pages/sell-ranking/sell-ranking?type=' + typeschange);
		},
		/**
		 * @description: 切换显示更多
		 */
		toggleShowMore() {
			this.showMore = !this.showMore;
		},
	},
};
</script>

<style lang="less">
.ranking-wrap {
	width: 100%;
	background: #f5f6f8;
	padding-bottom: 20rpx;
	.top-title {
		padding: 24rpx 0;
		&-text {
			// margin-top: 24rpx;
			margin-left: 30rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
		}
	}
	.top-card {
		position: relative;
		// height: 234rpx;
		display: flex;
		justify-content: center;
		&-bg {
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			// height: 100%;
			height: 234rpx;
			z-index: 1;
			image {
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			width: 700rpx;
			z-index: 2;
			display: flex;
			background: #fff;
			border-radius: 20rpx;
			justify-content: space-between;
			padding: 64rpx 0 50rpx;
			margin-top: 36rpx;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
			.content-tip {
				position: absolute;
				padding: 5rpx 25rpx 6rpx 10rpx;
				background: #f58836;
				color: #fff;
				border-radius: 0 999px 999px 0;
				top: 14rpx;
				left: -1rpx;
			}
			.data-box {
				width: 50%;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;
				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #6d7278;
				}
				.num {
					font-size: 48rpx;
					font-family: DINAlternate-Bold, DINAlternate;
					font-weight: bold;
					color: #333333;
					margin-top: 14rpx;
				}
			}
		}
	}
	.first-card {
		margin-top: 20rpx;
		background: #fff;
		.card-title {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			padding: 20rpx 0;
			margin-left: 30rpx;
		}
		.card-content {
			display: flex;
			flex-flow: row wrap;
			.card-item {
				width: 210rpx;
				height: 102rpx;
				position: relative;
				margin-left: 30rpx;
				margin-bottom: 12rpx;
				display: flex;
				align-items: center;
				&-bg {
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 1;
					image {
						width: 100%;
						height: 100%;
					}
				}
				&-title {
					z-index: 2;
					position: absolute;
					width: 110rpx;
					right: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text {
						text-align: center;
						font-size: 26rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}
				.card-item-bg {
					// padding-top: 15rpx;
					// padding-left: 15rpx;
				}
				.icon {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					top: 25rpx;
					left: 25rpx;
				}
			}
		}
		.card-content.hide {
			height: 102rpx;
			overflow: hidden;
		}
		.show-more {
			display: flex;
			justify-content: center;
			padding: 20rpx;
			text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #0091ff;
				text-decoration: underline;
			}
		}
	}
	.else-card {
		padding: 0 30rpx;
		margin-top: 20rpx;
		background: #fff;
		.card-title {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			padding: 20rpx 0;
		}
		.card-content {
			display: flex;
			flex-flow: row wrap;
			&-item {
				box-sizing: border-box;
				// border: 1px solid #e8e8e8;
				// border-radius: 10rpx;
				width: 220rpx;
				height: 120rpx;
				// padding: 0 8rpx;
				margin-left: 15rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				position: relative;
				.bg-img {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 0;
					image {
						width: 100%;
						height: 100%;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
				.title {
					z-index: 1;
					position: absolute;
					width: 100rpx;
					flex: 1;
					// margin-left: 10rpx;
					display: flex;
					flex-flow: row wrap;
					justify-content: center;
					align-items: center;
					left: 45%;
					text {
						width: 100%;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}
			}
			&-item.no-margin {
				margin-left: 0;
			}
		}
	}
}
</style>
