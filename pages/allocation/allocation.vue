<template>
	<view>
		<Header></Header>
		<view class="all_box">
			<view class="all_item">
				<view class="all_item_top">
					<view class="all_item_left">
						<view class="all_item_logo" :style="{backgroundImage: `url(${unify.brand_img})`}" >
							
						</view>
						<view class="all_item_name">
							{{unify.name}}
						</view>
					</view>
					<view class="all_item_rig">
						<text class="save" @click="allsave(1)">保存</text>
						<view class="see" @click="allsee">
							{{allshow?'收起':'展开'}}
						</view>
					</view>
				</view>
				<view class="all_item_bot" v-if="allshow">
					<view class="bot_item" v-for="item in unifyson">
						<view class="all_item_bot_left" v-if="item[0]">
							<view class="bot_name" >
								{{item[0].name}}:
							</view>
							<input type="text" class="int" v-model="item[0].num" />
						</view>
						<view class="all_item_bot_rig" v-if="item[1]">
							<view class="bot_name">
								{{item[1].name}}:
							</view>
							<input type="text" class="int" v-model="item[1].num" />
						</view>
					</view>
				</view>
			</view>
			<view class="all_item" v-for="item,indexed in userdata" :key='indexed'>
				<view class="all_item_top">
					<view class="all_item_left">
						<view class="all_item_logo" :style="{backgroundImage: `url(${item.brand_img})`}">
			
						</view>
						<view class="all_item_name">
							{{item.name}}
						</view>
					</view>
					<view class="all_item_rig">
						<text class="save" @click="allsave(item)">保存</text>
						<view class="see" @click="see(item)">
							{{item.isshow?'收起':'展开'}}
						</view>
					</view>
				</view>
				<view class="all_item_bot" v-if="item.isshow">
					<view class="bot_item" v-for="itemed,newkey in item.newdata" :key='newkey'>
						<view class="all_item_bot_left" v-if="itemed[0]">
							<view class="bot_name">
								{{itemed[0].name}}:
							</view>
							<input type="text" v-model="itemed[0].num" class="int" />
						</view>
						<view class="all_item_bot_rig" v-if="itemed[1]">
							<view class="bot_name">
								{{itemed[1].name}}:
							</view>
							<input type="text" v-model="itemed[1].num" class="int" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unify:{},
				unifyson:{},
				typeobj:{},
				datalist_uni:[],
				userdata:[],
				allshow:true,
				idd:''
			};
		},
		onLoad(options) {
			if (options.id) {
				this.idd = options.id
				this.$api.getBrandBonus({
					stage_id: options.id
				}, {
					success: (ret) => {
						this.unify = ret.data.staff
						this.unifyson = ret.data.staff.brand_task_info
						this.userdata = ret.data.brand
						this.$api.rewardLlocation({}, {
							success: (ret) => {
								this.typeobj = ret.data
								
								
								//员工统一处理
								let returndata = []
								for (let var1 in this.unifyson) {
									let newobj = {}
									newobj.key = var1
									newobj.name = this.typeobj[var1]
									newobj.num = this.unifyson[var1]
									returndata.push(newobj)
								}
								let twoarr = []
								let num = 0
								let number = returndata.length
								for (var i = 0; i < number; i=i+2) {
									var datanew = []
									datanew.push(returndata[i])
									datanew.push(returndata[i+1])
									twoarr.push(datanew)
								}
								this.unifyson = twoarr
								
								//用户数据处理
								this.userdata.map((item)=>{
									item.newdata = []
									item.isshow = true
								})
								
								this.userdata.map((item)=>{
									let returndata = []
									for (let var1 in item.brand_task_info) {
										let newobj = {}
										newobj.key = var1
										newobj.name = this.typeobj[var1]
										newobj.num = item.brand_task_info[var1]
										returndata.push(newobj)
									}
									let twoarr = []
									let num = 0
									let number = returndata.length
									for (var i = 0; i < number; i=i+2) {
										var datanew = []
										datanew.push(returndata[i])
										datanew.push(returndata[i+1])
										twoarr.push(datanew)
									}
									item.newdata = twoarr
								})
								
								console.log(this.userdata)
								
							}
						})
					}
				})
				
			}
		},
		methods:{
			allsee(){
				this.allshow = !this.allshow
			},
			see(item){
				item.isshow = !item.isshow
				console.log(item)
				this.userdata.push({})
				this.userdata.pop()
			},
			allsave(type){
				if(type=='1'){
					let params = {}
					console.log(this.unifyson)
					this.unifyson.map((itemd)=>{
						itemd.map((it)=>{
							params[it.key]=it.num
						})
					})
					params.stage_id = this.idd
					this.$api.setBrandBonus(params,{
						success:(ret)=>{
							this.$Common.commonToast('保存成功')
						}
					})
				}else{
					let params = {}
					type.newdata.map((itemd)=>{
						itemd.map((it)=>{
							params[it.key]=it.num
						})
					})
					params.stage_id = this.idd
					params.brand_id = type.id
					this.$api.setBrandBonus(params,{
						success:(ret)=>{
							this.$Common.commonToast('保存成功')
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.all_box {
		padding: 20rpx 24rpx;

		.all_item {
			padding: 20rpx 24rpx;
			border-bottom: 2rpx solid #dfdfdf;

			.all_item_top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.all_item_left {
					display: flex;
					align-items: center;

					.all_item_logo {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						background-size: cover;
						background-position: center;
						background-repeat: no-repeat;
					}

					.all_item_name {
						color: #333;
						font-size: 28rpx;
						margin-left: 8rpx
					}
				}

				.all_item_rig {
					display: flex;
					align-items: center;

					.save,
					.see {
						color: @common;
						font-size: 24rpx;
						white-space: nowrap
					}

					.see {
						margin-left: 20rpx;
					}
				}
			}

			.all_item_bot {
				padding-top: 36rpx;

				.bot_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;

					.all_item_bot_left {
						width: 68%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.bot_name {
							color: #656565;
							font-size: 24rpx;
						}

						.int {
							margin-left: 10rpx;
							width: 50%;
							color: #333;
							font-size: 24rpx;
						}
					}

					.all_item_bot_rig {
						width: 72%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.bot_name {
							color: #656565;
							font-size: 24rpx;
						}

						.int {
							margin-left: 10rpx;
							width: 50%;
							color: #333;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
