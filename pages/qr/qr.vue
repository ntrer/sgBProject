<template>
	<view>
		<Header haveback="true"></Header>
		<view class="xian"></view>
		<view class="ma">
			<view class="erweima" @click="chengimg" :style="{ backgroundImage: `url(${logo})` }"></view>
			<view class="text mt">点击下方按钮</view>
			<view class="text">上传个人微信二维码</view>
		</view>
		<view class="bj"></view>
		<view class="btn" @click="uploading">上传二维码</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			logo: null,
			url: '',
		};
	},
	onLoad() {
		this.$api.getPersonalCode(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.logo = ret.data;
					}
				},
			}
		);
	},
	methods: {
		chengimg() {
			this.$Common.upChooseImage((data) => {
				this.logo = data;
				this.url = data;
			});
		},
		uploading() {
			if (!this.url) {
				return this.$Common.commonToast('请先上传图片');
			}
			var res = this.url;
			if (!res && res.indexOf(',') === -1) {
				Toast.fail('请上传个人微信二维码');
				return;
			}
			console.log();
			res = res.slice(res.indexOf(',') + 1);
			console.log(res);

			var that = this;
			this.$api.baseUploadImg(
				{},
				{
					success: (Token) => {
						console.log(Token);
						Token = Token.data;
						var url = 'http://upload-z2.qiniup.com/putb64/-1';
						uni.request({
							method: 'POST',
							url: url,
							data: res,
							header: {
								'Content-Type': 'application/octet-stream',
								Authorization: 'UpToken ' + Token.token,
							},
							success: (res) => {
								that.$api.setPersonalCode(
									{
										personal_code: Token.url + '/' + res.data.key,
									},
									{
										success: (data) => {
											return that.$Common.commonToast('上传成功');
										},
									}
								);
							},
						});
					},
				}
			);
		},
	},
};
</script>

<style lang="less" scoped>
.xian {
	width: 100%;
	background-color: #ededed;
	height: 20rpx;
}
.ma {
	position: relative;
	transform: translateY(25%);
	width: 400rpx;
	height: 526rpx;
	margin: 0 auto;
	background: url(../../static/index/ma.png) no-repeat;
	background-position: center;
	background-size: cover;
	padding-top: 1rpx;
	.erweima {
		position: absolute;
		top: 6%;
		left: 50%;
		transform: translate(-50%);
		width: 350rpx;
		height: 350rpx;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.text {
		font-size: 32rpx;
		font-weight: 500;
		color: #6d7278;
		text-align: center;
	}
	.mt {
		margin-top: 150rpx;
	}
}
.bj {
	position: relative;
	transform: translateY(50%);
	width: 720rpx;
	height: 394rpx;
	margin: 0 auto;
	background: url(../../static/index/mabj.png) no-repeat;
	background-position: center;
	background-size: cover;
}
.btn {
	position: relative;
	z-index: 9;
	margin: auto;
	margin-top: 80rpx;
	width: 308rpx;
	background: @common;
	border-radius: 10rpx;
	text-align: center;
	padding: 14rpx 0;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
}
</style>
