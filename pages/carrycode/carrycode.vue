<template>
	<view id="share">
		<Header haveback="true"></Header>
		<view class="topview"></view>
		<view class="share-box" :style="{ backgroundImage: `url(${base64})` }">
			<view class="save_box">
				<view class="savejump" @click="saveImg()">点击保存海报</view>
			</view>
			<tki-qrcode class="qrcode-box" ref="qrcode" :val="address" :size="166" unit="upx" :onval="true" :showLoading="true" @result="qrR" />
			<canvas canvas-id="myCanvas" id="isCanvas"></canvas>
		</view>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import Config from '@/units/servers/config';
export default {
	components: {
		tkiQrcode,
	},
	data() {
		return {
			address: '',
			showShare: false,
			posterinfo: {},
			src: '',
			base64: '',
			pic: '../../static/index/re@2x.png',
			logo: '../../static/user.png',
			userinfo: {},
		};
	},
	onLoad() {
		this.$api.getActUser(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.userinfo = ret.data;
						this.logo = ret.data.user_head_img;
					}
				},
			}
		);
	},
	onReady() {
		this.$api.poster(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.posterinfo = ret.data;
						this.address = this.posterinfo.url + `?act_id=${this.posterinfo.param.act_id}&&friend_id=${this.posterinfo.param.friend_id}&&y_uid=${this.posterinfo.param.y_uid}&&url_path=tg`;
						this.pic = ret.data.bjt[0].src;
					}
				},
			}
		);
	},
	methods: {
		qrR(res) {
			console.log('------------------------------------');
			this.src = res;
			this.onCreatImg();
		},
		onClickLeft() {
			uni.navigateBack({});
		},
		onSelect(option) {
			this.$com.showToast(option.name);
			this.showShare = false;
		},
		onClickShareClick() {
			console.log(this.base64);

			this.onCreatImg();
		},
		onCreatImg() {
			let that = this;
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#isCanvas')
				.boundingClientRect((data) => {
					//获取canvas-dom

					var ctx = uni.createCanvasContext('myCanvas', this); //绑定画布

					ctx.drawImage('../../static/index/share.png', 0, 0, 187.5, 323.5); //填充进图片

					ctx.lineJoin = 'round'; //设置圆角
					ctx.lineWidth = 3;
					ctx.strokeStyle = '#3592F5'; //设置边框颜色
					ctx.strokeRect(116.5, 200, 65, 65); //绘制边框

					ctx.font = 'normal 6px sans-serif'; //设置对于坐标点的对齐方式
					ctx.setFillStyle('#333'); //设置内容2的文字样式
					ctx.fillText('长按识别二维码', 126, 280);

					ctx.drawImage(that.src, 121.5, 205, 55, 55); //填充进二维码

					// ctx.drawImage(that.pic, 0, 30, 375, 300); //填充进广告图片

					ctx.font = 'normal bold 9px sans-serif'; //设置对于坐标点的对齐方式
					ctx.setFillStyle('#333333'); //设置内容2的文字样式
					ctx.fillText('内购优惠口令:' + this.userinfo.internal_code, 47.5, 181);

					ctx.setFontSize(16);
					ctx.setTextAlign('left');
					ctx.font = 'normal bold 7px sans-serif'; //设置对于坐标点的对齐方式
					ctx.setFillStyle('#333333'); //设置内容2的文字样式
					ctx.fillText('内购优惠截止日期:', 15, 206);
					if (this.userinfo.customer_time) {
						ctx.fillText(this.userinfo.customer_time, 15, 216);
					}
					ctx.fillText('内购开展认证门店:', 15, 231);
					ctx.fillText(this.userinfo.store, 15, 240);

					ctx.fillText('内购客服专线:', 15, 255);
					ctx.fillText(this.userinfo.phones, 15, 270);

					uni.getImageInfo({
						src: that.pic,
						success(adImgInfo) {
							ctx.drawImage(adImgInfo.path, 0, 15, 187.5, 150); //填充进广告图片
							ctx.draw(false, () => {
								uni.canvasToTempFilePath({
									canvasId: 'myCanvas',
									height: 333.5,
									width: 187.5,
									success: (res) => {
										uni.hideLoading();
										that.base64 = res.tempFilePath;
									},
								});
							}); //输出到画布中
						},
					});
				})
				.exec();
		},
		//跳转外部链接
		jumpurl() {
			plus.runtime.openURL(this.address);
		},
		//保存图片
		saveImg() {
			var that = this;
			uni.saveImageToPhotosAlbum({
				filePath: this.base64,
				success: function () {
					that.$Common.commonToast('保存成功', 'success');
				},
			});
		},
	},
};
</script>

<style lang="less" scoped>
#share {
	position: relative;
}
.topview {
	width: 100%;
	height: 354rpx;
	background: url(../../static/index/juxing.png) no-repeat;
	background-position: center;
	background-size: cover;
}
.share-box {
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translateX(-50%);
	width: 690rpx;
	height: 1080rpx;
	overflow: hidden;
	background-position: center;
	background-size: cover;
	border-radius: 15rpx;

	.save_box {
		position: absolute;
		bottom: 1%;
		left: 50%;
		transform: translateX(-50%);
		.savejump {
			width: 308rpx;
			height: 70rpx;
			background: @common;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
			text-align: center;
			line-height: 70rpx;
			margin-bottom: 16rpx;
		}
		.save {
			text-align: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}
	}

	#isCanvas {
		position: absolute;
		width: 1000px;
		height: 2500px;
		top: -99999899rpx;
		left: -99999899rpx;
		z-index: 9999;
	}

	.qrcode-box {
		position: fixed;
		left: -9999rpx;
		top: -9999rpx;
	}
}
</style>
