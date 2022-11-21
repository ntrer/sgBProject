<template>
	<view id="storema">
		<Header haveback='true'></Header>
		<view class="bg">

		</view>
		<view class="white">
			<view class="mt">
				<view class="eight_input">
					<input type="text" value="" class="int" placeholder="请输入姓名（可虚拟）"
						placeholder-style="color:#6D7278" v-model="params.user_name" />
				</view>
				<view class="eight_input">
					<input type="number" value="" v-model="params.user_phone" class="int" placeholder="请输入手机号" placeholder-style="color:#6D7278" />
				</view>
				<view class="eight_input_prick">
					<view class="prick_left">
						<picker @change="bindPickerChange" :value="index" :range="array" class="wbai">
							<view class="uni-input">{{ index >-1?array[index]:'请选择身份'}}</view>
						</picker>
					</view>
					<image src="../../static/index/next@2x(1).png" mode="" class="icon"></image>
				</view>
				<view class="eight_input_prick">
					<view class="prick_left">
						<picker @change="bindPickerChangedate" mode="date"	>
							<view class="uni-input">{{params.end_time?params.end_time:'请选择时间'}}</view>
						</picker>
					</view>
					<image src="../../static/index/next@2x(1).png" mode="" class="icon"></image>
				</view>
				<view class="eight_input_prick text">
					<textarea placeholder-style="color:#6D7278" v-model="params.remarks"  class="add_int" placeholder="添加更多备注信息" auto-height />
				</view>
				<view class="btn" @click="submit">
					内购随身码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [],
				index: -1,
				time:'请选择时间',
				params:{
					end_time:null,
					remarks:'',
					user_card:'',
					user_name:'',
					user_phone:''
				}
			};
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.params.user_card = this.array[this.index]
			},
			bindPickerChangedate(e){
				this.params.end_time = e.target.value

				console.log(this.time)
			},
			submit(){
				this.$api.setCarryCode(this.params, {
					success: (ret) => {
						if (ret.code == 200) {
							this.$Common.commonToast('设置成功!','success',()=>{
								this.$Common.commonJump('/pages/stamps/stamps')
							})
						}
					}
				})
			}
		},
		onLoad() {
			this.$api.getStaffIdentity({}, {
				success: (ret) => {
					if (ret.code == 200) {
						if(ret.data != ''){
							this.array = ret.data
						}
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	#storema{
		padding-bottom: 32rpx;
	}
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
		height: 1250rpx;
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
		
		.eight_input_prick{
			margin: 0 78rpx;
			margin-bottom: 20rpx;
			background: #ECEAEA;
			border-radius: 54rpx;
			padding: 44rpx 35rpx;
			display: flex;
			align-items: center;
			position: relative;
			.prick_left{
				width: 100%;
				position: absolute;
				z-index: 2;
				.uni-input{
					font-size: 28rpx;
					font-weight: 400;
					color: #6D7278;
				}
			}
			.icon{
				position: absolute;
				right: 30rpx;
				top: 28rpx;
				z-index: 1;
				width: 29rpx;
				height: 29rpx;
			}
			.add_int{
				font-size: 28rpx;
				font-weight: 400;
				color: #6D7278;
			}
		}
		.text{
			border-radius: 20rpx;
			padding-bottom: 84rpx;
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
	.wbai{
		width: 100%;
		// position: absolute;
		// z-index: 2;
	}
</style>
