<template>
	<view id="index">
		<view class="topview">
			<view class="topview_text_top">
				<view class="topview_text_top_text">
					{{ topactive }}
				</view>
				<view class="topview_text_top_change" @click="open">
					<text class="change_text">切换</text>
					<image src="../../static/index/next@2x.png" mode="" class="change_img"></image>
				</view>
			</view>
			<view class="topview_content">
				<view class="topview_content_left">
					<view class="content_name">
						{{ userinfo.realname ? userinfo.realname : '暂无数据' }}
						<text style="margin-left: 2rpx">[{{ userinfo.member_types_s ? userinfo.member_types_s : '暂无数据' }}]</text>
					</view>
					<view class="content_team">所属战队：{{ userinfo.brands ? userinfo.brands : '无' }}</view>
					<view class="content_shop">所属门店：{{ userinfo.store ? userinfo.store : '无' }}</view>
				</view>
				<view class="topview_content_right">
					<view class="logo">
						<image :src="userinfo.user_head_img ? userinfo.user_head_img : '../../static/user.png'" mode="" class="logo_img"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="white_box">
			<view class="white_box_left">
				<view class="white_text">员工积分</view>
				<view class="white_number">
					<text class="big_font">{{ userinfo.integral ? userinfo.integral : '0' }}.</text>
					<text class="small_font">{{ userinfo.integralwei ? userinfo.integralwei : '00' }}</text>
				</view>
			</view>
			<view class="white_box_left">
				<view class="white_text">现金</view>
				<view class="white_number">
					<text class="big_font">{{ userinfo.money ? userinfo.money : '0' }}.</text>
					<text class="small_font">{{ userinfo.moneywei ? userinfo.moneywei : '00' }}</text>
				</view>
			</view>
			<view class="white_box_left">
				<view class="white_text">已提现金额</view>
				<view class="white_number">
					<text class="big_font">{{ userinfo.use_money ? userinfo.use_money : '0' }}.</text>
					<text class="small_font">
						{{ userinfo.use_moneywei ? userinfo.use_moneywei : '00' }}
					</text>
				</view>
			</view>
		</view>
		<view class="btn_content">
			<view class="btn_left" @click="goshare()">
				<image src="../../static/index/bg-left.png" class="btn_left_icon" mode="widthFix"></image>
				<text class="btn_text">推广海报</text>
			</view>
			<view class="btn_left" @click="gosign">
				<image src="../../static/index/bg-right.png" class="btn_left_icon" mode="widthFix"></image>
				<text class="btn_text">线下签单</text>
			</view>
		</view>
		<view class="index_bot_box">
			<view class="index_tab" v-if="active == 0 || li.length > 0">
				<view class="tab_item" v-for="(item, index) in tab" :key="index" @click="changetab(index)" :class="active == index ? 'act' : ''">
					{{ item }}
				</view>
			</view>
			<view class="index_tab" v-else>
				<view class="tab_item tabcenter">
					{{ '我的常用功能' }}
				</view>
			</view>
			<view class="index_bot_list">
				<view class="li" v-for="(item, index) in li" :key="index" @click="jump(item)" v-if="!item.usertype || item.usertype == usertype">
					<view class="li_logo">
						<image :src="item.logo" mode="" class="li_logo_img"></image>
					</view>
					<view class="li_text">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="bottom_show" v-if="!baomingdata.carryOutArr">
				<view class="bottom_show_left">当前阶段</view>
				<view class="bottom_show_right">
					<text class="bot_text">暂无</text>
				</view>
			</view>
			<view class="bottom_show" v-if="baomingdata.carryOutArr">
				<view class="time">距本阶段任务结束仅剩{{ paramsdate.endDay }}天{{ paramsdate.endHours }}时{{ paramsdate.endMinute }}分{{ paramsdate.endSeconds }}秒</view>
			</view>
			<view class="bottom_show" v-if="baomingdata.carryOutArr">
				<view class="time meihua" v-if="baomingdata.carry_out">
					您还差{{ baomingdata.carry_out.sign_up ? baomingdata.carry_out.sign_up : 0 }}报名，{{ baomingdata.carry_out.browse ? baomingdata.carry_out.browse : 0 }}浏览，{{ baomingdata.carry_out.fission ? baomingdata.carry_out.fission : 0 }}裂变
				</view>
			</view>
		</view>
		<view class="goout" @click="deltoken">退出登录</view>
		<view class="mask" v-if="past">
			<view class="mask_box">
				<view class="mask_tit">当前活动已到期，请切换其它活动</view>
				<view class="mask_btn" @click="scanActivityCode">参与活动</view>
				<view class="mask_btn" @click="open">切换活动</view>
				<view class="mask_btn btn2" @click="deltoken">退出登录</view>
			</view>
		</view>
		<Tabbar :selectIndex="0"></Tabbar>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<view class="proup_tit">切换活动-与我有关</view>
				<view class="proup_icon">
					<image src="../../static/index/close@2x.png" class="close_icon" mode="" @click="close"></image>
				</view>
				<view class="proup_content">
					<scroll-view class="vip-cards" scroll-y="true" show-scrollbar="false">
						<view class="proup_li" v-for="(item, index) in prouplist" :key="index" @click="changeactive(index)">
							<view class="proup_li_left">
								{{ item.activity_name }}
							</view>
							<view class="proup_li_right">
								<view class="proup_yuan" :class="proupchange == index ? 'yuan_act' : ''"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="proup_bottom">
					<view class="proup_btn1" @click="close">取消</view>
					<view class="proup_btn2" @click="close('api')">确定</view>
				</view>
			</view>
		</uni-popup>
		<!-- 启动页 -->
		<uni-popup ref="popuptwo" type="bottom">
			<view class="popup_box_two">
				<image src="../../static/index/re@2x.png" mode="" class="re_proup_img"></image>
				<view class="line"></view>
				<view class="proup_two_del" @click="del">X</view>
			</view>
		</uni-popup>
		<!-- //奖励政策 -->
		<uni-popup ref="popupthree" type="bottom">
			<view class="popup_box_two">
				<image src="../../static/index/tan@2x.png" mode="" class="re_proup_img"></image>
				<view class="proup_position">
					<!-- <jyf-parser html='code_content' class='white'></jyf-parser> -->
					<view class="proup_position_text" v-for="(item, ins) in code_content" :key="ins" v-if="cishu == 2">
						{{ item }}
					</view>
					<view class="proup_position_text" v-if="cishu == 3">
						{{ kpi_show_total }}
					</view>
				</view>
				<view class="line three"></view>
				<view class="proup_two_del three_close" @click="delthree">X</view>
			</view>
		</uni-popup>
		<Indexproup :props="compontshow" :title="nametit" :img="dianzhangimg" :number="number" @gosearch="gosearch" @addshop="addshop"></Indexproup>
		<tki-qrcode class="qrcode-box" ref="qrcode" :val="address" :size="166" unit="upx" :onval="true" :showLoading="true" @result="qrR" />
	</view>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import Indexproup from '@/components/indexproup.vue';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
export default {
	components: {
		Tabbar,
		Indexproup,
		tkiQrcode,
	},
	onShow() {
		this.getdata();
		// console.log('我已11111111111111111了')
		// this.$api.getActUser({}, {
		// 	success: ret => {
		// 		this.calcCountdown(ret.data.end_time * 1000)
		// 		// uni.setStorageSync('user',ret.data)
		// 	}
		// })
	},
	onHide() {
		console.log('我已了');
		clearTimeout(this.calcCountDownTime);
		console.log(this.calcCountDownTime);
	},
	onLoad() {},
	data() {
		return {
			baomingdata: {},
			kpi_show_total: '',
			usertype: uni.getStorageSync('user').member_types,
			cishu: uni.getStorageSync('cishu'),
			code_content: [],
			code_type: '', //首页弹框数据
			compontshow: false, //封装组件弹出层是否展示
			nametit: null,
			number: null,
			tab: ['我的常用功能', '活动执行管理'],
			active: 0,
			activeid: '',
			changeact: 0,
			proupchange: null,
			topactive: '',
			userinfo: {},
			dianzhangimg: '',
			prouplist: [],
			address: '',
			calcCountDownTime: null,
			past: false,
			paramsdate: {
				endDay: '',
				endHours: '',
				endMinute: '',
				endSeconds: '',
			},
			li: [
				{
					name: '1.报名客户',
					logo: '../../static/index/1@2x.png',
					path: 'pages/signup/signup',
				},
				{
					name: '2.核销码',
					logo: '../../static/index/2@2x.png',
					path: 'pages/accounting/accounting',
				},
				{
					name: '3.内购随身码',
					logo: '../../static/index/3@2x.png',
					path: 'pages/carrycode/carrycode',
				},
				{
					name: '4.奖励豆排行',
					logo: '../../static/index/4@2x.png',
					path: 'pages/bean/bean',
				},
				{
					name: '5.个人二维码',
					logo: '../../static/index/5@2x.png',
					path: 'pages/qr/qr',
				},
				{
					name: '6.店长邀请',
					logo: '../../static/index/6@2x.png',
					path: '6',
				},
				{
					name: '7.异业内购券',
					logo: '../../static/index/7@2x.png',
					path: 'pages/stamps/stamps',
				},
				{
					name: '8.推客邀请',
					logo: '../../static/index/8@2x.png',
					path: '8',
				},
				{
					name: '9.我的推客',
					logo: '../../static/index/9@2x.png',
					path: 'pages/mytwitter/mytwitter',
				},
				{
					name: '10.客户录入',
					logo: '../../static/index/11@2x.png',
					path: '11',
				},
				// {
				// 	name: '11.参与活动',
				// 	logo: '../../static/index/2@2x.png',
				// 	path: '12'
				// }
			],
			rewardLlocationData: {},
		};
	},
	methods: {
		//退出登录
		deltoken() {
			let newparams = {
				title: '请确认',
				content: '确认是否要退出登录',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确认',
				success: () => {
					uni.removeStorageSync('token');
					uni.removeStorageSync('baoming');
					uni.removeStorageSync('user');
					uni.reLaunch({
						url: '/pages/login/login',
					});
				},
			};
			this.$Common.commonMoadl(newparams);
		},
		//获取数据
		getdata() {
			this.$api.getActivity(
				{},
				{
					success: (ret) => {
						if (ret.code == 200) {
							this.prouplist = ret.data;
							if (this.prouplist.length > 0) {
								//是否弹框
								if (uni.getStorageSync('cishu') == 1) {
									this.$api.getPolicy(
										{},
										{
											success: (data) => {
												this.kpi_show_total = data.data.kpi_show;
												var kpi_show_list = data.data.kpi_show_total.split('\n');
												this.code_content = kpi_show_list;
												this.code_type = 'notice';
												setTimeout(() => {
													this.$refs.popupthree.open('center');
													uni.setStorageSync('cishu', '2');
													this.cishu = 2;
													// this.delthree()
												}, 500);
											},
										}
									);
								}
								uni.setStorageSync('baoming', 1);
								console.log('~~~~~~~~~~~~~~~~~~');
								this.$api.getActBrief(
									{},
									{
										success: (ret) => {
											//判断活动是否结束
											let endtime = ret.data.act_end_time;
											let newdata = Date.parse(new Date()) / 1000;
											if (endtime < newdata) {
												this.past = true;
											} else {
												this.past = false;
											}
											console.log(this.past);
											this.topactive = ret.data.name;
											uni.setStorageSync('active_id', ret.data.id);
										},
									}
								);

								this.$api.getActUser(
									{},
									{
										success: (ret) => {
											this.calcCountdown(ret.data.end_time * 1000);
											if (Object.prototype.toString.call(ret.data.carry_out) === '[object Object]') {
												var carryOutArr = [];
												for (const key in ret.data.carry_out) {
													carryOutArr.push({
														key: key,
														value: ret.data.carry_out[key],
														label: this.rewardLlocationData[key],
													});
												}
												console.log();
												ret.data.carryOutArr = carryOutArr;
											}
											this.baomingdata = ret.data;
											console.log(this.baomingdata);
											uni.setStorageSync('user', ret.data);
											(this.usertype = ret.data.member_types), console.log(ret);
											this.userinfo = ret.data;
											this.userinfo.integral = this.userinfo.integral + '';
											this.userinfo.money = this.userinfo.money + '';
											this.userinfo.use_money = this.userinfo.use_money + '';
											if (this.userinfo.integral.indexOf('.') == -1) {
												this.userinfo.integralwei = '00';
											} else {
												var numd = this.userinfo.integral.split('.');
												this.userinfo.integral = numd[0];
												this.userinfo.integralwei = numd[1];
											}
											if (this.userinfo.money.indexOf('.') == -1) {
												this.userinfo.moneywei = '00';
											} else {
												var numd1 = this.userinfo.money.split('.');
												this.userinfo.money = numd1[0];
												this.userinfo.moneywei = numd1[1];
												this.userinfo.use_money = this.userinfo.use_money + '';
											}
											if (this.userinfo.use_money.indexOf('.') == -1) {
												this.userinfo.use_moneywei = '00';
											} else {
												var numd12 = this.userinfo.use_money.split('.');
												this.userinfo.use_money = numd12[0];
												this.userinfo.use_moneywei = numd12[1];
											}
										},
									}
								);
							} else {
								uni.removeStorageSync('baoming');
								console.log(uni.getStorageSync('baoming'));
								uni.setStorageSync('baoming', 0);
								this.$Common.commonToast('请点击活动报名进行报名');
							}
						}
					},
				}
			);
		},
		/**
		 * @description: 调起扫码功能
		 */
		scanActivityCode() {
			let that = this;
			// that.$Common.commonJump(`/pages/reg/reg?id=${194}`)
			uni.scanCode({
				scanType: ['qrCode'],
				success(res) {
					console.log(res);
					if (res.result) {
						let arr = res.result.split('?')[1];
						arr = arr.split('&');
						arr = arr.map((item) => {
							return item.split('=');
						});
						let obj = {};
						arr.forEach((item) => {
							obj[item[0]] = item[1];
						});
						console.log(obj);
						uni.navigateTo({
							url: `/pages/reg/reg?id=${obj.act_id}`,
						});
					}
				},
			});
		},
		//倒计时阶段
		calcCountdown(endTimeDate) {
			var timeNum = endTimeDate * 1;
			var nowtime = new Date(), //获取当前时间
				endtime = new Date(timeNum); //定义结束时间
			// console.log(endtime);
			var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
				endDay = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
				endHours = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
				endMinute = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
				endSeconds = Math.floor((lefttime / 1000) % 60); //计算秒数

			this.calcCountDownTime = setTimeout(() => {
				this.calcCountdown(timeNum);
			}, 1000);
			var params = {};
			params = {
				endDay,
				endHours,
				endMinute,
				endSeconds,
			};
			this.paramsdate = params;
		},
		changetab(index) {
			this.active = index;
			if (this.active == 0) {
				this.li = [
					{
						name: '1.报名客户',
						logo: '../../static/index/1@2x.png',
						path: 'pages/signup/signup',
					},
					{
						name: '2.核销码',
						logo: '../../static/index/2@2x.png',
						path: 'pages/accounting/accounting',
					},
					{
						name: '3.内购随身码',
						logo: '../../static/index/3@2x.png',
						path: 'pages/carrycode/carrycode',
					},
					{
						name: '4.奖励豆排行',
						logo: '../../static/index/4@2x.png',
						path: 'pages/bean/bean',
					},
					{
						name: '5.个人二维码',
						logo: '../../static/index/5@2x.png',
						path: 'pages/qr/qr',
					},
					{
						name: '6.店长邀请',
						logo: '../../static/index/6@2x.png',
						path: '6',
					},
					{
						name: '7.异业内购券',
						logo: '../../static/index/7@2x.png',
						path: 'pages/stamps/stamps',
					},
					{
						name: '8.推客邀请',
						logo: '../../static/index/8@2x.png',
						path: '8',
					},
					{
						name: '9.我的推客',
						logo: '../../static/index/9@2x.png',
						path: 'pages/mytwitter/mytwitter',
					},
					{
						name: '10.客户录入',
						logo: '../../static/index/11@2x.png',
						path: '11',
					},
					{
						name: '11.参与活动',
						logo: '../../static/index/2@2x.png',
						path: '12',
					},
				];
			} else {
				this.li = [
					{
						name: '奖金池任务',
						logo: '../../static/index/21@2x.png',
						path: 'pages/pooltask/pooltask',
						usertype: 4,
					},
					{
						name: '品牌惩罚任务',
						logo: '../../static/index/22@2x.png',
						path: '',
						usertype: 4,
					},
					{
						name: '手动奖金',
						logo: '../../static/index/23@2x.png',
						path: '',
						usertype: 4,
					},
					{
						name: '目标分配',
						logo: '../../static/index/24@2x.png',
						path: '/pages/allot-team/allot-team',
						usertype: 4,
					},
					{
						name: '活动费用充值',
						logo: '../../static/index/25@2x.png',
						path: 'pages/activityup/activityup',
						usertype: 4,
					},
					{
						name: '注册审核',
						logo: '../../static/index/26@2x.png',
						path: 'pages/twittlelist/twittlelist',
						usertype: 4,
					},
					{
						name: '财务结算',
						logo: '../../static/index/27@2x.png',
						path: 'pages/settlement/settlement',
						usertype: 5,
					},
					{
						name: '推客列表',
						logo: '../../static/index/28@2x.png',
						path: 'tui',
						usertype: 4,
					},
				];
			}
		},
		open() {
			this.$refs.popup.open('center');
		},
		//右上角切换活动重新获取数据
		close(data) {
			clearTimeout(this.calcCountDownTime);
			this.$refs.popup.close();
			if (this.activeid == '') {
				// return this.$Common.commonToast('请选择活动')
				return;
			}
			if (data == 'api') {
				this.$api.appBindingAct(
					{
						act_id: this.activeid,
					},
					{
						success: (data) => {
							console.log(data);
							uni.setStorageSync('token', data.data);
							this.getdata(); //重新获取数据
							if (data.code == 200) {
								this.$Common.commonToast(data.msg);
								this.$api.getloginurl(
									{},
									{
										success: (data) => {
											console.log(data);
											return;
											window.location.href = data.data + '?act_id=' + this.activeid;
										},
									}
								);
							}
						},
					}
				);
			}
		},
		changeactive(index) {
			this.proupchange = index;
			this.activeid = this.prouplist[index].act_id;
		},
		//关闭首次进入的弹出层·
		del() {
			this.$refs.popuptwo.close();
		},
		delthree() {
			this.$refs.popupthree.close();
			return;
			if (uni.getStorageSync('cishu') == 2) {
				this.$refs.popupthree.close();
				setTimeout(() => {
					this.$refs.popupthree.open('center');
				}, 500);
				uni.setStorageSync('cishu', '3');
				this.cishu = 3;
			} else {
				this.$refs.popupthree.close();
			}
		},
		//去往海报页面
		goshare() {
			this.$Common.commonJump('pages/share/share');
		},
		//去往签单页面
		gosign() {
			this.$Common.commonJump('pages/sign/sign');
		},
		//去往别的页面
		jump(item) {
			if (item.path == '') {
				return this.$Common.commonToast('暂未开通');
			} else {
				switch (item.path) {
					case '6':
						this.$api.invitationStaff(
							{},
							{
								success: (ret) => {
									this.address = ret.data.url;
									this.compontshow = !this.compontshow;
									this.nametit = '店长邀请';
									this.number = 6;
								},
							}
						);
						break;
					case '8':
						this.$api.TweetInvitation(
							{},
							{
								success: (ret) => {
									this.address = ret.data.url;
									this.compontshow = !this.compontshow;
									this.nametit = '添加推客-先认证';
									this.number = 26;
								},
							}
						);

						break;
					case '11':
						if (uni.getStorageSync('baoming') == 0) {
							this.$Common.commonToast('请点击活动报名进行报名');
						} else {
							this.compontshow = !this.compontshow;
							this.nametit = '自然进店客户录入';
							this.number = 11;
						}

						break;
					case '12':
						this.scanActivityCode();
						break;
					case 'tui':
						this.$api.getZhanTweetList(
							{},
							{
								success: (ret) => {
									if (this.userinfo.member_types == 4) {
										if (ret.data.data.length > 0) {
											this.$Common.commonJump('pages/tuilist/tuilist');
										} else {
											this.$Common.commonJump('pages/tuilisttwo/tuilisttwo?id=' + this.userinfo.zhan_id);
										}
									} else if (this.userinfo.member_types == 3) {
										if (ret.data.data.length > 0) {
											this.$Common.commonJump('pages/tuilist/tuilist');
										} else {
											this.$Common.commonJump('pages/tuilisttwo/tuilisttwo?id=' + this.userinfo.zhan_id);
										}
									} else if (this.userinfo.member_types == 6) {
										this.$Common.commonJump('pages/tuilisttwo/tuilisttwo?id=' + this.userinfo.zhan_id);
									} else if (this.userinfo.member_types == 2) {
										this.$Common.commonJump('pages/tuilistthree/tuilistthree?id=' + this.userinfo.brand_id);
									} else {
										this.$Common.commonJump('pages/tuilistthree/tuilistthree?id=' + this.userinfo.brand_id);
									}
								},
							}
						);

						break;
					default:
						this.$Common.commonJump(item.path);
				}
			}
		},
		qrR(res) {
			console.log('------------------------------------');
			console.log(res);
			this.dianzhangimg = res;
		},
		// 去搜索客户
		gosearch() {
			this.$Common.commonJump('pages/shopsearch/shopsearch');
		},
		//添加客户
		addshop() {
			this.$Common.commonJump('pages/shopadd/shopadd');
		},
	},
};
</script>

<style lang="less" scoped>
page {
	background-color: #f5f6f8;
}

#index {
	padding-bottom: 50rpx;

	.topview {
		width: 100%;
		height: 354rpx;
		background: url(../../static/index/juxing.png) no-repeat;
		background-position: center;
		background-size: cover;

		.topview_text_top {
			display: flex;
			justify-content: space-between;
			padding-right: 30rpx;
			padding-top: 20rpx;

			.topview_text_top_text {
				background: rgba(255, 255, 255, 0.3);
				border-radius: 0px 25rpx 25rpx 0px;
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;
				text-shadow: 0px 0px 6rpx #0c73cb;
				padding: 14rpx 14rpx 12rpx 16rpx;
			}

			.topview_text_top_change {
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;

				.change_text {
					margin-right: 10rpx;
				}

				.change_img {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
				}
			}
		}

		.topview_content {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;

			.topview_content_left {
				width: 80%;

				.content_name {
					font-size: 32rpx;
					font-weight: 600;
					color: #ffffff;
					text-shadow: 0px 0px 8rpx rgba(8, 118, 226, 0.7);
				}

				.content_team,
				.content_shop {
					font-size: 24rpx;
					font-weight: 400;
					color: #ffffff;
				}

				.content_team {
					margin: 8rpx 0;
				}
			}

			.topview_content_right {
				.logo {
					.logo_img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.white_box {
		margin: 0 26rpx;
		margin-top: -110rpx;
		background: #ffffff;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 36rpx 46rpx;

		.white_box_left {
			width: 25%;

			.white_text {
				font-size: 28rpx;
				font-weight: 400;
				color: #6d7278;
				margin-bottom: 30rpx;
				text-align: center;
			}

			.white_number {
				text-align: center;

				.big_font,
				.small_font {
					font-size: 48rpx;
					font-weight: bold;
					color: #333333;
				}

				.small_font {
					font-size: 40rpx;
				}
			}
		}
	}

	.btn_content {
		margin: 0 30rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 20rpx;

		.btn_left {
			position: relative;
			width: 48%;
			// height: 118rpx;
			// background: url(../../static/index/bg-left.png) no-repeat;
			// background-size: 100%;
			// background-position: center;
			border-radius: 15rpx;

			.btn_left_icon {
				width: 100%;
				display: block;
			}

			.btn_text {
				position: absolute;
				top: 41%;
				transform: translateY(-50%);
				right: 45rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}

		// .btn_left:nth-child(2) {
		// 	background: url(../../static/index/bg-right.png) no-repeat;
		// 	background-size: cover;
		// 	background-position: center;
		// }
	}

	.index_bot_box {
		margin-top: 20rpx;
		margin-bottom: 66rpx;
		background-color: #fff;
		padding-bottom: 14rpx;

		.index_tab {
			padding: 0 166rpx;
			padding-top: 26rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			margin-bottom: 50rpx;

			.tab_item {
				border-bottom: 4rpx solid transparent;
				padding-bottom: 2rpx;
			}

			.act {
				color: @common;
				border-bottom: 4rpx solid #0091ff;
			}

			.tabcenter {
				width: 100%;
				text-align: center;
				color: @common;
			}
		}

		.index_bot_list {
			display: flex;
			flex-wrap: wrap;
			margin: 0 30rpx;
			border-bottom: 2rpx solid #d0cdcd;
			margin-bottom: 17rpx;

			.li {
				width: 25%;
				text-align: center;
				margin-bottom: 36rpx;

				.li_logo {
					.li_logo_img {
						width: 96rpx;
						height: 66rpx;
					}
				}

				.li_text {
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
				}
			}
		}

		.bottom_show {
			margin: 0 30rpx;
			display: flex;
			justify-content: space-between;
			padding-bottom: 14rpx;
			padding-top: 14rpx;

			.time {
				font-size: 28rpx;
				text-align: center;
				width: 100%;
			}

			.meihua {
				color: @common;
			}

			.bottom_show_left {
				font-size: 28rpx;
				font-weight: 600;
				color: @common;
			}

			.bottom_show_right {
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;

				.bot_text {
					margin-right: 9rpx;
				}

				.bot_img {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
				}
			}
		}
	}
}

.goout {
	padding: 14rpx 0;
	text-align: center;
	color: #fff;
	width: 340rpx;
	border-radius: 8rpx;
	border: none;
	background-color: @common;
	margin: auto;
	margin-top: 25rpx;
	font-size: 24rpx;
}

.mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.8);

	.mask_box {
		width: 600rpx;
		padding-bottom: 100rpx;
		margin: auto;
		margin-top: 300rpx;
		background-color: #fff;
	}

	.mask_tit {
		font-size: 36rpx;
		color: #333;
		text-align: center;
		padding-top: 200rpx;
	}

	.mask_btn {
		margin: 0 150rpx;
		margin-top: 200rpx;
		padding: 10rpx 0rpx;
		border-radius: 15rpx;
		background-color: @common;
		color: #fff;
		font-size: 34rpx;
		text-align: center;
	}

	.btn2 {
		margin-top: 20rpx;
		background-color: #fff;
		color: @common;
		border: 1rpx solid @common;
	}
}

.popup_box {
	box-sizing: border-box;
	position: relative;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx;
	padding: 32rpx 36rpx;
	padding-bottom: 56rpx;

	.proup_tit {
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
		padding-bottom: 24rpx;
		border-bottom: 1rpx solid #d0cdcd;
		margin-bottom: 18rpx;
	}

	.proup_icon {
		position: absolute;
		right: 5%;
		top: 10%;

		.close_icon {
			width: 26rpx;
			height: 26rpx;
		}
	}

	.proup_content {
		max-height: 304rpx;
		padding: 0 32rpx;

		.vip-cards {
			max-height: 304rpx;
			overflow: hidden;
		}

		.proup_li {
			background: #f7f7f7;
			border-radius: 12rpx;
			padding: 14rpx 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16rpx;

			.proup_li_left {
				font-size: 24rpx;
				font-weight: 500;
				color: #3a3a3a;
			}

			.proup_li_right {
				.proup_yuan {
					width: 30rpx;
					height: 30rpx;
					background: #d8d8d8;
					border-radius: 50%;
				}

				.yuan_act {
					background-color: @common;
				}
			}
		}
	}

	.proup_bottom {
		margin: 34rpx 36rpx 0rpx 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.proup_btn1,
		.proup_btn2 {
			padding: 13rpx 86rpx;
			font-size: 32rpx;
			font-weight: 500;
			border-radius: 10rpx;
		}

		.proup_btn1 {
			color: @common;
			border: 2rpx solid @common;
		}

		.proup_btn2 {
			color: #ffffff;
			background: @common;
		}
	}
}

.popup_box_two {
	width: 662rpx;
	height: 950rpx;
	position: relative;

	.re_proup_img {
		width: 100%;
		height: 882rpx;
	}

	.proup_position {
		position: absolute;
		top: 13%;
		left: 50%;
		transform: translateX(-50%);
		width: 420rpx;
		max-height: 320rpx;
		word-wrap: break-word;
		word-break: normal;
		padding-top: 15rpx;

		.proup_position_text {
			font-size: 28rpx;
			text-align: center;
			margin-bottom: 8rpx;
		}
	}

	.line {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 2rpx;
		height: 64rpx;
		background-color: #fff;
	}

	.proup_two_del {
		position: absolute;
		bottom: -5%;
		left: 50%;
		transform: translateX(-50%);
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		border: 2rpx solid #fff;
	}

	.three {
		bottom: 3%;
		height: 84rpx;
	}

	.three_close {
		bottom: -2%;
	}
}

.qrcode-box {
	position: fixed;
	left: -9999rpx;
	top: -9999rpx;
}

.white {
	white-space: pre-line;
}
</style>
