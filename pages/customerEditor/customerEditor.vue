<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<view class="box">
			<view class="item">
				<view class="item_left">真实姓名</view>
				<input class="int" placeholder="请输入" v-model="obj.realname" placeholder-style="color:#333" />
			</view>
			<view class="item">
				<view class="item_left">手机号</view>
				<input class="int" placeholder="请输入" v-model="obj.phones" placeholder-style="color:#333" />
			</view>
			<view class="item">
				<view class="item_left">客户星级</view>
				<uni-rate :touchable="false" :size="16" v-model="obj.star_rating" :value="2" @change="onChange" />
			</view>
			<view class="item">
				<view class="item_left">意向购买品类</view>
				<input class="int" placeholder="请输入品类" v-model="obj.intention" placeholder-style="color:#333" />
			</view>
			<view class="item">
				<view class="item_left">客户是否意向进店体验</view>
				<view class="yuan" :class="obj.is_jdty == 2 ? 'kong' : 'change'" @click="change1()"></view>
			</view>
			<view class="item">
				<view class="item_left">成交客户是否分享朋友圈领礼品</view>
				<view class="yuan" :class="obj.is_fx == 2 ? 'kong' : 'change'" @click="change2()"></view>
			</view>
			<view class="image" v-if="obj.is_fx == 1">
				<view class="show_text" v-if="obj.fx_img" :style="{ backgroundImage: `url(${obj.fx_img})` }" @click="changeimg"></view>
				<view class="show_text" v-else @click="changeimg">点击上传图片</view>
			</view>
			<view class="add_item_reason_left">备注: 电话回访及项目组跟踪</view>
			<view class="add_item_reason_content">
				<textarea placeholder-style="color:#6D7278" v-model="obj.remarks" class="add_int" placeholder="添加电话回访及项目组跟踪" auto-height />
			</view>
		</view>
		<view class="bb">
			<view class="bottom_item" v-for="(item, index) in datalist" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>
		<view class="btn" @click="str">保存</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			search: '',
			idd: '',
			obj: {},
			datalist: [],
			logo: '',
			image: '',
		};
	},
	onLoad(option) {
		this.idd = option.id;
	},
	onShow() {
		this.$api.getCustomerInfo(
			{
				id: this.idd,
			},
			{
				success: (ret) => {
					this.obj = ret.data;
					this.image = ret.data.fx_img;
					this.datalist = ret.data.text;
				},
			}
		);
	},
	methods: {
		str() {
			var params = {
				id: this.idd,
				intention: this.obj.intention,
				realname: this.obj.realname,
				remarks: this.obj.remarks,
				status: this.obj.status,
				star_rating: this.obj.star_rating,
				is_fx: this.obj.is_fx,
				is_jdty: this.obj.is_jdty,
			};

			params.fx_img = this.image;
			console.log(this.image);
			this.$api.editCustomer(params, {
				success: (ret) => {
					this.$Common.commonToast('提交成功');
					this.obj = {};
					uni.navigateBack(1);
				},
			});
		},
		changeimg() {
			this.$Common.upChooseImage((data) => {
				this.obj.fx_img = data;
				var res = data;
				res = res.slice(res.indexOf(',') + 1);
				var that = this;
				this.$api.baseUploadImg(
					{},
					{
						success: (Token) => {
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
			});
		},
		change1() {
			if (this.obj.is_jdty == 1) {
				this.obj.is_jdty = 2;
			} else {
				this.obj.is_jdty = 1;
			}
		},
		change2() {
			if (this.obj.is_fx == 1) {
				this.obj.is_fx = 2;
			} else {
				this.obj.is_fx = 1;
			}
		},
		handleSearch() {},
		onChange(e) {
			console.log(e.value);
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

.box {
	padding: 24rpx;

	.item {
		padding-bottom: 35rpx;
		border-bottom: 1rpx solid #dfdfdf;
		display: flex;
		margin-bottom: 35rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 27rpx;
		color: #333;

		.item_left {
		}

		.int {
			text-align: right;
			font-size: 27rpx;
			color: #333;
		}

		.yuan {
			width: 35rpx;
			height: 35rpx;
			border-radius: 50%;
			background-position: center;
			background-size: cover;
		}
	}

	.image {
		.show_text {
			margin: auto;
			width: 200rpx;
			height: 200rpx;
			line-height: 200rpx;
			background-color: #e6e6e6;
			text-align: center;
			color: #333;
			font-size: 26rpx;
			background-position: center;
			background-size: cover;
		}
	}

	.add_item_reason_left {
		font-size: 28rpx;
		font-weight: 500;
		color: #3a3a3a;
		margin-top: 34rpx;
	}

	.add_item_reason_content {
		margin-top: 34rpx;
		padding-bottom: 54rpx;
		background-color: #e6e6e6;

		.add_int {
			padding: 15rpx 25rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333;
		}
	}
}

.bottom_item {
	padding: 20rpx;
	color: @common;
}

.bottom_item:nth-child(1) {
	text-align: center;
}

.btn {
	padding: 28rpx 0;
	text-align: center;
	color: #fff;
	width: 440rpx;
	border-radius: 8rpx;
	border: none;
	background-color: @common;
	margin: auto;
	margin-top: 25rpx;
}

.kong {
	background: url(../../static/index/12.png) no-repeat;
}

.change {
	background: url(../../static/index/22.png);
}
</style>
