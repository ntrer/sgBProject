<template>
	<view>
		<Header></Header>
		<view class="xian"></view>
		<!-- 客户信息 -->
		<view class="user_box" v-if="datalist.length > 0">
			<view class="user_item" v-for="item,index in datalist" :key='index' @click="godetails(item.form_uid)">
				<image :src="item.user_headimg" class="user_logo" mode="widthFix"></image>
				<view class="user_right">
					<view class="user_name">
						{{item.nick_name}}
					</view>
					<view class="user_time">
						{{item.create_time}}
					</view>
				</view>
			</view>
		</view>
		<noData v-else></noData>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				idd:'',
				page:1,
				optionsdata:'',
				datalist:[],
				dataobj:{},
				total:0
			};
		},
		onReachBottom() {
			if(this.datalist.length >= this.total){
				return this.$Common.commonToast('暂无更多数据')
			}
			this.page = (this.page - 0) + 1
			this.getdata()
		},
		onLoad(options) {
			if(options.id){
				this.idd = options.id
				this.optionsdata = options.type
			}
		},
		onShow() {
			this.getdata()
		},
		methods:{
			getdata(){
				this.$api.tweetAchievementList({tk_uid:this.idd,page:this.page,type:this.optionsdata},{
					success:(ret)=>{
						this.total = ret.data.total
						this.dataobj = ret.data
						if(this.page == 1){
							this.datalist = ret.data.data
						}else{
							this.datalist =[...this.datalist,...ret.data.data]
						}
					}
				})
			},
			//去往用户详情
			godetails(id){
				this.$Common.commonJump('/pages/customer/customer?id=' + id)
			},
		}
	}
</script>

<style lang="less" scoped>
	*{
		box-sizing: border-box;
	}
	.xian {
		width: 100%;
		background-color: #EDEDED;
		height: 20rpx;
	}
	.user_box{
		padding-top: 30rpx;
		.user_item{
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #dfdfdf;
			padding-left: 30rpx;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			.user_logo{
				width: 80rpx;
				margin-right: 15rpx;
			}
			.user_right{
				.user_name{
					font-size: 28rpx;
					color: #333;
					margin-bottom: 18rpx;
				}
				.user_time{
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>
