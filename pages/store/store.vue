<template>
	<view>
		<Header haveback='true'></Header>
		<view class="bg">

		</view>
		<view class="white">
			<view class="mt">
				<view class="eight_input">
					<input type="text" value="" v-model="store_name" class="int" placeholder="请输入门店名称" placeholder-style="color:#6D7278" />
				</view>
				<view class="eight_input">
					<input type="text" value="" v-model="store_phone" class="int" placeholder="请输入门店电话" />
				</view>
				<view class="eight_input">
					<input type="text" value="" v-model="store_address" class="int" placeholder="请输入门店地址" />
				</view>
				<view class="btn" @click="submit">
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				store_name:'',
				store_phone:'',
				store_address:''
			};
		},
		onShow() {
			this.getdata()
		},
		methods:{
			getdata(){
				this.$api.getStoreInfo({}, {
					success: (ret) => {
						if (ret.code == 200) {
							if(ret.data){
								this.store_name = ret.data.store_name
								this.store_phone= ret.data.store_phone
								this.store_address= ret.data.store_address
							}
						}
					}
				})
			},
			submit(){
				this.$api.setStoreInfo({
					store_address: this.store_address,
					store_name: this.store_name,
					store_phone: this.store_phone
				}, {
					success: (ret) => {
						if (ret.code == 200) {
							this.$Common.commonToast('保存成功!','success',()=>{
								this.$Common.commonJump('/pages/storema/storema')
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bg {
		width: 100%;
		height: 474rpx;
		background: url(../../static/index/menbj.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding-top: 1rpx;
	}

	.white {
		margin: 0 26rpx;
		margin-top: -440rpx;
		height: 1030rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 15rpx rgba(0, 0, 0, .3);
		background: url(../../static/index/menaddbj.png) no-repeat;
		background-position: center;
		background-size: cover;
		padding-top: 1rpx;

		.mt {
			margin-top: 494rpx;
		}

		.eight_input {
			margin: 0 auto;
			margin-bottom: 20rpx;
			width: 528rpx;
			background: #ECEAEA;
			border-radius: 54rpx;
			padding-left: 35rpx;

			.int {
				width: 80%;
				height: 88rpx;
				color: #6D7278;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.btn {
			margin: auto;
			margin-top: 46rpx;
			width: 308rpx;
			background: #427BFF;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			padding: 14rpx 0;
		}
	}
</style>
