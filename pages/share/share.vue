<template>
	<view id="share">
		<Header haveback="true"></Header>
		<swiper class="ta" @change="shareImgChange">
			<swiper-item v-for="(item, ii) in pic" :key="ii" class="sw">
				<view class="topview"></view>
				<view class="share-box" :style="{ backgroundImage: `url(${base64})` }"></view>
			</swiper-item>
		</swiper>
		<view class="save_box">
			<view class="savejump" @click="saveImg()">点击保存海报</view>
		</view>
		<tki-qrcode class="qrcode-box" ref="qrcode" :val="address" :size="166" unit="upx" :onval="true" :showLoading="true" @result="qrR" />
		<canvas canvas-id="myCanvas" id="isCanvas"></canvas>
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
			pic: [],
			logo: '../../static/user.png',
			userinfo: {},
			spic: '',
			active: 0,
			dingimg: [],
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
		console.log(new Date());

		this.$api.poster(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.posterinfo = ret.data;
						this.address = this.posterinfo.url + `?act_id=${this.posterinfo.param.act_id}&&friend_id=${this.posterinfo.param.friend_id}&&y_uid=${this.posterinfo.param.y_uid}&&url_path=tg`;
						// this.pic = ret.data.bjt[0].src
						this.pic = ret.data.bjt;
						this.spic = ret.data.bjt[this.active].src;
					}
				},
			}
		);
	},
	methods: {
		shareImgChange(e) {
			this.active = e.detail.current;
			this.spic = this.pic[this.active].src;
			console.log(this.spic);
			if (this.dingimg[this.active]) {
				this.base64 = this.dingimg[this.active];
			} else {
				this.onCreatImg();
			}
		},
		qrR(res) {
			console.log('------------------------------------');
			console.log(res);
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
		// onClickShareClick() {
		// 	console.log(this.base64);

		// 	this.onCreatImg();
		// },
		onCreatImg() {
			console.log('进入了');
			let that = this;
			const query = uni.createSelectorQuery().in(that);
			query
				.select('#isCanvas')
				.boundingClientRect((data) => {
					//获取canvas-dom

					var ctx = uni.createCanvasContext('myCanvas', that); //绑定画布

					ctx.drawImage('../../static/index/share-bg.png', 0, 0, 187.5, 313.5); //填充进图片

					ctx.fillStyle = '#fff';

					ctx.drawImage(that.src, 130, 192.5, 50, 50); //填充进二维码

					that.drawRound(ctx, 17.5, 5, 202.5, that.logo);
					// ctx.drawImage(that.logo, 0, 355, 65, 65); //填充进头像
					ctx.setTextAlign('left');
					ctx.font = 'normal 7px sans-serif'; //设置对于坐标点的对齐方式
					ctx.setFillStyle('#333333'); //设置内容2的文字样式
					ctx.fillText(that.userinfo.realname, 47, 212.5);
					ctx.fillText('邀请您即刻关注', 47, 232.5);

					uni.showLoading({});
					uni.getImageInfo({
						src: that.spic,
						success(adImgInfo) {
							ctx.drawImage(adImgInfo.path, 0, 0, 187.5, 187.5); //填充进广告图片
							console.log(new Date());
							ctx.draw(false, () => {
								console.log(new Date());
								uni.canvasToTempFilePath({
									canvasId: 'myCanvas',
									height: 250,
									width: 187.5,
									success: (res) => {
										uni.hideLoading();
										that.dingimg.push(res.tempFilePath);
										that.base64 = that.dingimg[that.active];
										console.log(new Date());
									},
								});
							}); //输出到画布中
						},
					});
				})
				.exec();
		},

		//跳转外部链接
		// jumpurl(){
		// 	plus.runtime.openURL(this.address)
		// },
		drawRound(ctx, r, x, y, img) {
			ctx.save(); // 保存之前的
			var r = r; // 半径*屏幕分辨率比例
			var d = 2 * r; // 直径
			var cx = x + r; // 圆弧坐标x
			var cy = y + r; // 圆弧坐标 y
			ctx.arc(cx, cy, r, 0, 2 * Math.PI);
			ctx.clip(); // 裁剪
			ctx.drawImage(img, x, y, d, d); // 画头像
			ctx.restore(); // 返回上一状态
		},
		//长按保存图片
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
	top: 5%;
	left: 50%;
	transform: translateX(-50%);
	width: 690rpx;
	height: 900rpx;
	overflow: hidden;
	background-position: center;
	background-size: 100% 100%;
}
.save_box {
	position: fixed;
	bottom: 5%;
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

.sw {
	height: 900rpx;
}

.ta {
	height: 90vh;
	position: relative;
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
</style>
