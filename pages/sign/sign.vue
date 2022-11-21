<template>
	<view id="sign">
		<Header haveback="true"></Header>
		<view class="gray_line"></view>
		<view class="tab_box">
			<view class="tab_item" v-for="(item, index) in tab" :key="index" @click="changtab(index)" :class="act == index ? 'acted' : ''">
				{{ item }}
			</view>
		</view>
		<!-- 签单内容 -->
		<!-- 线下签单 -->
		<view class="one_sign" v-if="act == 0">
			<view class="input_item">
				<view class="input_item_text">姓名</view>
				<input type="text" class="input" placeholder="请输入姓名" v-model="params.realname" placeholder-style="color:#6D7278" />
			</view>
			<view class="input_item">
				<view class="input_item_text">电话</view>
				<input type="number" class="input" placeholder="请输入电话" v-model="params.phone" placeholder-style="color:#6D7278" />
			</view>
			<view class="input_item">
				<view class="input_item_text">签单图片</view>
				<view class="changeimg" @click="changeimg">
					{{ uploadtype }}
				</view>
			</view>
			<view class="input_item" v-for="(item, index) in lili" :key="index">
				<view class="input_item_text">
					{{ foroffline[item] }}
				</view>
				<input type="number" class="input" :placeholder="'请输入' + foroffline[item]" placeholder-style="color:#6D7278" v-model="params[item]" />
			</view>
			<view class="input_item" v-for="(item, index) in gailist" v-if="item.key != 'sign_order_img'" :key="index">
				<view class="input_item_text">
					{{ item.title }}
				</view>
				<input :type="item.type" class="input noborder" :placeholder="'请输入' + item.title" placeholder-style="color:#6D7278" v-model="item.number" />
			</view>
			<view class="input_item">
				<view class="input_item_text">商品品类</view>
				<picker @change="bindPickerChange" :value="typenum" :range="array" range-key="value">
					<view class="input_item_text">{{ changetype }}</view>
					<view class="input_item_text" v-if="typenum === ''">选择商品品类</view>
				</picker>
			</view>
			<view class="position_box">
				<view class="input_item_bot" v-for="(item, index) in shoparray" :key="index">
					<view class="input_item">
						<view class="input_item_text">商品名称</view>
						<picker @change="bindPickerChangegoods($event, index)" :value="goodsnum" :range="goodsgray" :range-key="'goods_name'">
							<view class="input_item_text">{{ shoparray[index].goods_name }}</view>
							<view class="input_item_text" v-if="!item.goods_name">选择商品名称</view>
						</picker>
					</view>
					<view class="bao">
						<view class="input_item">
							<view class="input_item_text">商品数量</view>
							<input type="number" class="input bot_input" placeholder="请输入数量" v-model="item.number" placeholder-style="color:#6D7278" />
						</view>
						<view class="input_item">
							<view class="input_item_text">商品价格</view>
							<input type="number" class="input bot_input" placeholder="请输入价格" v-model="item.price" placeholder-style="color:#6D7278" />
						</view>
						<view class="del_icon">
							<image src="../../static/index/del.png" mode="" class="del_img" @click="del(index)"></image>
						</view>
					</view>
				</view>
				<view class="input_item" v-if="numall != ''">
					<view class="input_item_text">商品数量总和</view>
					<view class="input_item_text">
						{{ numall }}
					</view>
				</view>
				<view class="add_icon" @click="add" v-if="goodsgray.length != shoparray.length">
					<image src="../../static/index/add.png" mode="" class="add_img"></image>
				</view>
			</view>
		</view>
		<!-- 异业签单 -->
		<view class="one_sign" v-if="act == 1">
			<!-- <view class="input_item">
				<view class="input_item_text">
					签单品牌
				</view>
				<view class="input_item_text">
					{{userinfo.brands}}
				</view>
			</view>
			<view class="input_item">
				<view class="input_item_text">
					签单人
				</view>
				<view class="input_item_text">
					{{userinfo.realname}}
				</view>
			</view> -->
			<view class="input_item">
				<view class="input_item_text">签单图片</view>
				<view class="changeimg" @click="changeimg">
					{{ onlinetype }}
				</view>
			</view>

			<view class="input_item" v-for="(item, index) in with_single_info_list" :key="index">
				<view class="input_item_text">
					{{ item.tag }}
				</view>
				<input type="text" class="input" :placeholder="item.placeholder" v-model="item.value" placeholder-style="color:#6D7278" />
			</view>

			<view class="input_item">
				<view class="input_item_text">姓名</view>
				<input type="text" class="input" placeholder="请输入姓名" v-model="params.realname" placeholder-style="color:#6D7278" />
			</view>
			<view class="input_item">
				<view class="input_item_text">电话</view>
				<input type="number" class="input" placeholder="请输入电话" v-model="params.phone" placeholder-style="color:#6D7278" />
			</view>
			<!-- <view class="input_item">
				<view class="input_item_text">
					签单图片
				</view>
				<view class="changeimg" @click="changeimg">
					{{uploadtype}}
				</view>
			</view> -->
			<view class="input_item" v-for="(item, index) in lili" :key="item.id">
				<view class="input_item_text">
					{{ foroffline[item] }}
				</view>
				<input type="number" class="input" :placeholder="'请输入' + foroffline[item]" placeholder-style="color:#6D7278" v-model="params[item]" />
			</view>
			<view class="input_item" v-for="(item, index) in gailist" v-if="item.key != 'sign_order_img'" :key="index">
				<view class="input_item_text">
					{{ item.title }}
				</view>
				<input :type="item.type" class="input noborder" :placeholder="'请输入' + item.title" placeholder-style="color:#6D7278" v-model="item.number" />
			</view>
			<view class="input_item">
				<view class="input_item_text">商品品类</view>
				<picker @change="bindPickerChange" :value="typenum" :range="array" range-key="value">
					<view class="input_item_text">{{ changetype }}</view>
					<view class="input_item_text" v-if="typenum === ''">选择商品品类</view>
				</picker>
			</view>
			<view class="position_box">
				<view class="input_item_bot" v-for="(item, index) in shoparray" :key="index">
					<view class="input_item">
						<view class="input_item_text">商品名称</view>
						<picker @change="bindPickerChangegoods($event, index)" :value="goodsnum" :range="goodsgray" :range-key="'goods_name'">
							<view class="input_item_text">{{ shoparray[index].goods_name }}</view>
							<view class="input_item_text" v-if="!item.goods_name">选择商品名称</view>
						</picker>
					</view>
					<view class="bao">
						<view class="input_item">
							<view class="input_item_text">商品数量</view>
							<input type="number" class="input bot_input" placeholder="请输入数量" v-model="item.number" placeholder-style="color:#6D7278" />
						</view>
						<view class="input_item">
							<view class="input_item_text">商品价格</view>
							<input type="number" class="input bot_input" placeholder="请输入价格" v-model="item.price" placeholder-style="color:#6D7278" />
						</view>
						<view class="del_icon">
							<image src="../../static/index/del.png" mode="" class="del_img" @click="del(index)"></image>
						</view>
					</view>
				</view>
				<view class="input_item" v-if="numall != ''">
					<view class="input_item_text">商品数量总和</view>
					<view class="input_item_text">
						{{ numall }}
					</view>
				</view>
				<view class="add_icon" @click="add" v-if="goodsgray.length != shoparray.length">
					<image src="../../static/index/add.png" mode="" class="add_img"></image>
				</view>
			</view>
		</view>

		<!-- 公共部分---客户签单 -->
		<view class="global_box">
			<view class="global_box_top">*客户来源</view>
			<view class="global_box_li">
				<view class="global_item" v-for="(item, index) in peopleli" :key="index" :class="index == globalnum ? 'global_act' : ''" @click="change(index)">
					{{ item }}
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="btn" @click="submit">提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tab: ['线下签单', '异业签单'],
			act: 0,
			imagesrc: '',
			url: '',
			changetype: '',
			typenum: '',
			goodsnum: '',
			goodspath: '',
			goodsprice: '',
			array: [],
			goodsgray: [],
			shoparray: [],
			peopleli: ['自然进店', '异业带单', '老客户复购', '老客户推荐', '推广裂变', '其它'],
			globalnum: 0,
			with_single_info_list: [
				{
					tag: '带单人姓名',
					placeholder: '请输入带单人姓名',
					value: '',
					key: 'with_order_name',
				},
				{
					tag: '带单人电话',
					placeholder: '请输入带单人电话',
					value: '',
					key: 'with_order_phone',
					type: 'number',
				},
				{
					tag: '带单品牌',
					placeholder: '请输入带单品牌',
					value: '',
					key: 'with_order_brand',
				},
				// ,
				// {
				// 	tag: '业主姓名',
				// 	placeholder: '请输入业主姓名',
				// 	value: '',
				// 	key: 'realname'
				// },
				// {
				// 	tag: '业主电话',
				// 	placeholder: '请输入业主电话',
				// 	value: '',
				// 	key: 'phone',
				// 	type: 'number'
				// },
				// {
				// 	tag: '商品品类',
				// 	placeholder: '请输入商品品类',
				// 	value: '',
				// 	key: 'goods_cate'
				// },
				// {
				// 	tag: '商品名称',
				// 	placeholder: '请输入商品名称',
				// 	value: '',
				// 	key: 'goods_name'
				// },
				// {
				// 	tag: '购买数量',
				// 	placeholder: '请输入购买数量',
				// 	value: '',
				// 	key: 'num',
				// 	type: 'number'
				// },
				// {
				// 	tag: '成交额',
				// 	placeholder: '请输入成交额',
				// 	value: '',
				// 	key: 'turnover_money',
				// 	type: 'number'
				// },
				// {
				// 	tag: '收款额',
				// 	placeholder: '请输入收款额',
				// 	value: '',
				// 	key: 'income_money',
				// 	type: 'number'
				// },
			],
			offlineobj: {},
			foroffline: {},
			lili: [],
			params: {
				order_type: '1',
				from_info: '自然进店',
			},
			gailist: [],
			img_icon: null,
			uploadtype: '上传图片',
			onlinetype: '上传图片',
			userinfo: {},
			onlineimg: null,
			onlineobj: { from_info: '自然进店' },
		};
	},
	onLoad() {
		this.$api.getActUser(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						uni.setStorageSync('user', ret.data);
						this.userinfo = ret.data;
					}
				},
			}
		);
		this.$api.getSignOrderCategory(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.offlineobj = ret.data;
						this.foroffline = ret.data.extend;
						this.gailist = ret.data.off;
						for (let s in this.gailist) {
							this.gailist[s].id = s;
							this.gailist[s].number = '';
						}
						if (this.foroffline) {
							this.lili = Object.keys(this.foroffline);
							for (let i in this.foroffline) {
								this.params[i] = '';
							}
						}
					}
				},
			}
		);
		this.$api.signOrderCategory(
			{},
			{
				success: (ret) => {
					if (ret.code == 200) {
						this.array = ret.data;
					}
				},
			}
		);
	},
	computed: {
		numall: function () {
			console.log(1231);
			var num1 = '';
			this.shoparray.map((item) => {
				if (item.number - 0 > 0) {
					num1 = num1 - 0 + (item.number - 0);
				}
			});

			console.log(this.params.sign_order_goods_num);
			return num1;
		},
	},
	methods: {
		submit() {
			if (this.act == 0) {
				for (let s in this.gailist) {
					var it = this.gailist[s];
					var keys = it.key;
					if (keys != 'sign_order_img') {
						this.params[keys] = it.number;
					}
				}
				this.params.sign_goods = [];
				this.shoparray.map((item) => {
					if (item.goods_name == '' || item.number == '' || item.price == '') {
						return this.$Common.commonToast('请填写完整信息');
					}
					var newobj = [];
					newobj.push(item.goods_name, item.number, item.price);
					this.params.sign_goods.push(newobj);
				});
				this.params.sign_order_goods_num = this.numall;
				this.params.goods_cate = this.array[this.typenum];
				this.$api.addOffLineOrder(this.params, {
					success: (ret) => {
						if (ret.code == 200) {
							this.$Common.commonToast(ret.msg);
							setTimeout(() => {
								uni.navigateBack(1);
							}, 500);
						}
					},
				});
			} else {
				for (let s in this.gailist) {
					var it = this.gailist[s];
					var keys = it.key;
					if (keys != 'sign_order_img') {
						this.params[keys] = it.number;
					}
				}
				this.params.sign_goods = [];
				this.shoparray.map((item) => {
					if (item.goods_name == '' || item.number == '' || item.price == '') {
						return this.$Common.commonToast('请填写完整信息');
					}
					var newobj = [];
					newobj.push(item.goods_name, item.number, item.price);
					this.params.sign_goods.push(newobj);
				});
				this.params.sign_order_goods_num = this.numall;
				this.params.goods_cate = this.array[this.typenum];
				this.params.order_type = 2;
				this.with_single_info_list.map((item) => {
					if (item.key == '') {
						return this.$Common.commonToast('请填写完整信息');
					}
					var keys = item.key;
					this.params[keys] = item.value;
				});
				this.$api.addOffLineOrder(this.params, {
					success: (ret) => {
						if (ret.code == 200) {
							this.$Common.commonToast(ret.msg);
							setTimeout(() => {
								uni.navigateBack(1);
							}, 500);
						}
					},
				});
			}
		},
		//选择签单类型
		changtab(index) {
			console.log(this.gailist);
			//重置表单值
			this.act = index;
			this.shoparray = [];
			this.typenum = '';
			this.changetype = '';
			console.log(this.params);
			for (let var1 in this.params) {
				console.log(var1);
				if (var1 != 'order_type' && var1 != 'from_info') {
					this.params[var1] = '';
				}
			}
			this.gailist.map((item) => {
				item.number = '';
			});
			if (this.act == 0) {
				this.params.order_type = this.act - 0 + 1;
			} else {
				this.onlineobj.order_type = this.act - 0 + 1;
			}
		},
		//选择录入类型
		change(index) {
			this.globalnum = index;
			if (this.act == 0) {
				this.params.from_info = this.peopleli[index];
			} else {
				this.onlineobj.from_info = this.peopleli[index];
			}
		},
		//上传图片
		//选择图片
		changeimg() {
			this.$Common.upChooseImage((data) => {
				this.img_icon = data;
				this.onlineimg = data;
				if (this.act == 0) {
					var res = this.img_icon;
				} else {
					var res = this.onlineimg;
				}
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
												if (that.act == 0) {
													that.uploadtype = '上传成功';
												} else {
													that.onlinetype = '上传成功';
												}
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
		//选择分类
		bindPickerChange(e) {
			this.typenum = e.target.value;
			this.changetype = this.array[this.typenum].value;
			console.log(this.typenum);
			this.$api.signOrderGoods(
				{
					goods_cate: this.array[this.typenum].value,
				},
				{
					success: (ret) => {
						if (ret.code == 200) {
							this.goodsgray = ret.data;
							this.shoparray = [];
						}
					},
				}
			);
		},
		//选择商品
		bindPickerChangegoods(e, index) {
			var isFalse = false;
			this.shoparray.map((item) => {
				if (item.id == this.goodsgray[e.target.value].id) {
					this.$Common.commonToast('已有重复商品');
					isFalse = true;
					return;
				}
			});
			if (isFalse) {
				return;
			}
			this.goodsnum = e.target.value;

			for (let s in this.goodsgray[this.goodsnum]) {
				this.shoparray[index][s] = this.goodsgray[this.goodsnum][s];
			}

			this.shoparray.push({});
			this.shoparray.pop({});
		},
		//添加商品
		add() {
			if (this.typenum === '') {
				return this.$Common.commonToast('请先选择分类');
			}
			var newobj = {};
			this.shoparray.push(newobj);
		},
		del(index) {
			this.shoparray.splice(index, 1);
		},
	},
};
</script>

<style lang="less" scoped>
#sign {
	padding-bottom: 250rpx;

	.gray_line {
		width: 100%;
		background-color: #f7f7f7;
		height: 20rpx;
	}

	.tab_box {
		margin-top: 24rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 80rpx;

		.tab_item {
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			padding-bottom: 2rpx;
			border-bottom: 4rpx solid transparent;
		}

		.acted {
			color: @common;
			border-bottom: 4rpx solid @common;
		}
	}

	.one_sign {
		margin-top: 20rpx;
		padding: 0 30rpx;

		.position_box {
			position: relative;

			.input_item_bot {
				position: relative;

				.bao {
					position: relative;
					display: flex;
					justify-content: space-between;
					padding-right: 40rpx;
				}

				.del_icon {
					position: absolute;
					right: 10rpx;
					top: 20rpx;

					.del_img {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.bot_input {
					width: 45%;
				}
			}

			.add_icon {
				position: absolute;
				right: 10rpx;
				bottom: -60rpx;

				.add_img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.input_item {
			background: #f7f7f7;
			border-radius: 12rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 22rpx 28rpx;
			margin-bottom: 18rpx;

			.input_item_text {
				font-size: 24rpx;
				font-weight: 500;
				color: #3a3a3a;
			}

			.input {
				text-align: right;
				font-size: 24rpx;
				font-weight: 400;
				color: #6d7278;
			}

			.input {
				border: none;
				background-color: #f7f7f7;
				outline: none;
			}

			.changeimg {
				font-size: 24rpx;
				font-weight: 400;
				color: #0091ff;
				border-bottom: 1rpx solid #0091ff;
			}
		}
	}

	.global_box {
		margin-top: 26rpx;
		padding: 0 30rpx;

		.global_box_top {
			font-size: 24rpx;
			font-weight: 500;
			color: #3a3a3a;
		}

		.global_box_li {
			margin-top: 26rpx;
			display: flex;
			flex-wrap: wrap;

			.global_item {
				width: 22%;
				margin-right: 12rpx;
				border-radius: 8rpx;
				border: 2rpx solid rgba(0, 0, 0, 0.1);
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.25);
				padding: 12rpx 0;
				text-align: center;
				margin-bottom: 8rpx;
			}

			.global_act {
				color: #1f74b4;
				background: rgba(54, 144, 246, 0.2);
			}
		}
	}

	.btn {
		left: 50%;
		position: relative;
		transform: translateX(-50%);
		margin-top: 50rpx;
		width: 308rpx;
		height: 70rpx;
		background: @common;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 70rpx;
	}
}
</style>
