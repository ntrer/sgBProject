<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<view class="item">
			<view class="item_left">
				<text class="text">阶段名称</text>
			</view>
			<view class="item_right">
				<input type="text" value="" class="input" placeholder="请输入阶段名称" v-model="params.name" placeholder-style="color:#6D7278" />
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">开始时间</text>
			</view>
			<view class="item_right">
				<picker mode="date" :value="start_time" @change="bindTimeChange">
					<view class="price">{{start_time?start_time:'请选择'}}</view>
				</picker>
				<!-- <text @click="DatePicker('date',true)" class="price">{{start?start:'请选择开始时间'}}</text> -->
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">结束时间</text>
			</view>
			<view class="item_right">
				<picker mode="date" :value="end_time" @change="bindTimeChangeend">
					<view class="price">{{end_time?end_time:'请选择'}}</view>
				</picker>
				<!-- <text @click="DatePicker('date',false)" class="price">{{end?end:'请输入结束时间'}}</text> -->
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">品牌奖励池总金额{{obj.brand_money}}元</text>
			</view>
			<view class="item_right">
				<text class="show">可用金额{{obj.use_brand_money}}元</text>
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">本阶段使用金额</text>
			</view>
			<view class="item_right">
				<input type="text" value="" class="input" placeholder="请输入金额" v-model="params.brand_money" placeholder-style="color:#6D7278" />
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">员工奖励总金额{{obj.staff_money}}元</text>
			</view>
			<view class="item_right">
				<text class="show">可用金额{{obj.use_staff_money}}元</text>
			</view>
		</view>
		<view class="item">
			<view class="item_left">
				<text class="text">本阶段使用金额</text>
			</view>
			<view class="item_right">
				<input type="text" value="" class="input" placeholder="请输入阶段金额" v-model="params.staff_money"  placeholder-style="color:#6D7278" />
			</view>
		</view>
		<view class="btn" @click="sbt">
			添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				start_time: null,
				end_time: null,
				params:{
					brand_money: "",
					end_time: "",
					name: "",
					staff_money: "",
					start_time: ""
				}
			};
		},
		onLoad() {
			this.$api.getStageMoney({}, {
				success: (ret) => {
					this.obj = ret.data
				}
			})
		},
		methods: {
			bindTimeChange: function(e) {
				this.start_time = e.target.value
			},
			bindTimeChangeend(e){
				this.end_time = e.target.value
			},
			sbt(){
				this.params.start_time = this.start_time
				this.params.end_time = this.end_time
				let newarr = Object.values(this.params)
				let num = 0
				newarr.map((item)=>{
					if(item == ''){
						num = num + 1
					}
				})
				if(num != 0){
					return this.$Common.commonToast('请补充表单数据')
				}
				this.$api.setStage(this.params,{
					success:(ret)=>{
						if(ret.code == 200){
							this.$Common.commonToast('添加成功!','success',()=>{
								uni.navigateBack(1)
							})
							this.params = {}
							this.start_time = null
							this.end_time = null
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}

	.item {
		margin-bottom: 18rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F7F7F7;
		border-radius: 12rpx;
		padding: 46rpx 28rpx;

		.item_left {
			display: flex;
			align-items: center;

			.text {
				font-size: 28rpx;
				font-weight: 500;
				color: #3A3A3A;
			}
		}

		.item_right {
			display: flex;
			align-items: center;

			.price {
				font-size: 28rpx;
				font-weight: 400;
				color: #6D7278;
			}

			.show {
				font-size: 28rpx;
				font-weight: 600;
				color: #0091FF;
			}

			.input {
				text-align: right;
				font-size: 28rpx;
				font-weight: 400;
				color: #6D7278;
			}
		}
	}

	.btn {
		margin: 0 auto;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		width: 308rpx;
		margin-top: 64rpx;
		background: #427BFF;
		text-align: center;
		border-radius: 10rpx;
		padding: 14rpx 0;
	}
</style>
