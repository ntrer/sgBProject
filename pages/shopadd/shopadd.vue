<template>
	<view>
		<Header haveback='true'></Header>
		<view class="xian"></view>
		<view class="add_box">
			<view class="add_item">
				<view class="add_item_left">
					*客户姓名
				</view>
				<view class="add_item_right">
					<input type="text" value="" v-model="params.name" placeholder="请输入客户姓名" placeholder-style="color:#6D7278" class="int" />
				</view>
			</view>
			<view class="add_item">
				<view class="add_item_left">
					*客户手机号
				</view>
				<view class="add_item_right">
					<input type="number" value="" v-model="params.phone" placeholder="请输入客户手机号" placeholder-style="color:#6D7278" class="int" />
				</view>
			</view>
			<view class="add_item">
				<view class="add_item_left">
					*客户星级
				</view>
				<view class="add_item_right">
					<uni-rate v-model="star" @change="onChange"/>
				</view>
			</view>
			<view class="add_item">
				<view class="add_item_left">
					*客户意向品类
				</view>
				<view class="add_item_right">
					<input type="text" value="" v-model="params.goods_name" placeholder="请输入客户意向品类" placeholder-style="color:#6D7278" class="int" />
				</view>
			</view>
			<view class="add_item">
				<view class="add_item_left">
					*客户所在小区
				</view>
				<view class="add_item_right">
					<input type="text" value="" v-model="params.address" placeholder="请输入客户所在小区" placeholder-style="color:#6D7278" class="int" />
				</view>
			</view>
			<view class="add_item_reason">
				<view class="add_item_reason_left">
					未成交原因与项目举措
				</view>
				<view class="add_item_reason_content">
					<textarea placeholder-style="color:#6D7278" v-model="params.remarks" class="add_int" placeholder="添加未成交原因与项目举措" auto-height />
				</view>
			</view>
			<view class="save" @click="submit">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'2',
				add:null,
				params:{
					address: "",
					goods_name: "",
					name: "",
					phone: "",
					remarks: "",
				},
				star:0
			};
		},
		onLoad(options) {
			if(options.id){
				this.add = options.id
				this.$api.getInputMember({id:this.add},{
					success:(ret)=>{
						this.params = ret.data
						this.star = ret.data.star
					}
				})
			}
		},
		methods:{
			onChange(e){
				this.star = e.value
			},
			submit(){
				if(this.add){
					this.params.id = this.add
					this.params.star = this.star
					this.$api.inputMemberEdit(this.params,{
						success:(ret)=>{
								this.$Common.commonToast(ret.msg,'none',()=>{
									uni.navigateBack(1)
								})
						}
					})
				}else{
					this.params.star_rating = this.star
					this.$api.inputMember(this.params,{
						success:(ret)=>{
								this.$Common.commonToast(ret.msg,'none',()=>{
									uni.navigateBack(1)
								})
						}
					})
				}
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
	.add_box{
		margin: 30rpx 30rpx;
		.add_item{
			width: 100%;
			background: #F7F7F7;
			border-radius: 12rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 18rpx;
			.add_item_left{
				padding: 45rpx 28rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #3A3A3A;
			}
			.add_item_right{
				width: 50%;
				display: flex;
				justify-content: flex-end;
				padding-right: 28rpx;
				.int{
					width: 100%;
					font-size: 28rpx;
					font-weight: 400;
					color: #6D7278;
					text-align: right;
				}
			}
		}
		.add_item_reason{
			background: #F7F7F7;
			border-radius: 12rpx;
			padding: 26rpx 28rpx;
			.add_item_reason_left{
				font-size: 28rpx;
				font-weight: 500;
				color: #3A3A3A;
				margin-top: 34rpx;
			}
			.add_item_reason_content{
				margin-top: 34rpx;
				padding-bottom: 104rpx;
				.add_int{
					font-size: 28rpx;
					font-weight: 400;
					color: #6D7278;
				}
			}
		}
		.save{
			margin: 0 auto;
			margin-top: 32rpx;
			background: #427BFF;
			border-radius: 10rpx;
			padding: 14rpx 0;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: 308rpx;
			text-align: center;
		}
	}
</style>
