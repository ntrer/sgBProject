/*
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 18:29:19
 * @Description: content
 */
import request from './request'
import config from './config'

export default {


	// 获取门店列表
	getStoreList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getStoreList', opt, params, true)
	},
	// 获取战队列表
	getBrandList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getBrandList', opt, params, true)
	},
	// 获取战区列表
	getZhanList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getZhanList', opt, params, true)
	},
	// 加入活动
	addActivityForYuan: (params, opt) => {
		return request.post(config.api.serviceUrl + '/addActivityForYuan', opt, params, true)
	},
	// 获取完成进度/完成率
	getTargetSpeed: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getTargetSpeed', opt, params, true)
	},
	// 用户手机号注册
	phoneRegister: (params, opt) => {
		return request.post(config.api.blankUrl + '/phoneRegister', opt, params, false)
	},
	// 用户获取手机验证码
	RegisterSendCode: (params, opt) => {
		return request.post(config.api.blankUrl + '/RegisterSendCode', opt, params, false)
	},
	// 用户登录
	phoneLogin: (params, opt) => {
		return request.bgPost(config.api.blankUrl + '/phoneLogin', opt, params, false)
	},

	// 销售额排行数据
	BrandStoreSaleMoney: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/BrandStoreSaleMoney', opt, params, true)
	},
	// 找回密码
	RetrievePwd: (params, opt) => {
		return request.post(config.api.serviceUrl + '/RetrievePwd', opt, params, true)
	},
	// 获取个人pk列表
	actMemberPkList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/act_member_pk_list', opt, params, true)
	},
	// 获取提现明细
	getMoneyExpend: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/get_money_expend', opt, params, true)
	},
	// 保存员工任务设置
	setStaffTarget: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/set_staff_target', opt, params, true)
	},
	// 保存门店任务设置
	setStoreTarget: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/set_store_target', opt, params, true)
	},
	// 保存任务设置
	addTargetStage: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/addTargetStage', opt, params, true)
	},
	// 获取pk数据
	rewardLlocationPk: (params, opt) => {
		return request.post(config.api.serviceUrl + '/reward_llocation_pk', opt, params, true)
	},
	// 获取战队pk信息
	getBrandPkInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_brand_pk_info', opt, params, true)
	},
	// 获取战区pk信息
	getZhanPkInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_zhan_pk_info', opt, params, true)
	},
	// 开始战队pk
	setBrandPk: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/set_brand_pk', opt, params, true)
	},
	// 开始战区pk
	setZhanPk: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/set_zhan_pk', opt, params, true)
	},
	// 获取战队
	getBrandPk: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_brand_pk', opt, params, true)
	},
	// 业主详情
	getUserOwnerInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_user_owner_info', opt, params)
	},
	// 推客业绩跳转页面
	tweetAchievementList: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/TweetAchievementList', opt, params)
	},
	// 获取战区
	getZhanPk: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_zhan_pk', opt, params, true)
	},
	// 推客签单
	offLineOrderTweet: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/off_line_order_tweet', opt, params)
	},
	// 签单详情
	getOffLineOrderInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_off_line_order_info', opt, params)
	},
	// 正在pk的战队
	brandPkList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/brand_pk_list', opt, params, true)
	},
	// 正在pk的战区
	zhanPkList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/zhan_pk_list', opt, params, true)
	},
	// 数据bi分析
	getBrandRanking: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_brand_ranking', opt, params, true)
	},
	// crm星级客户(回访率)-员工
	ygHfl: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/ygHfl', opt, params, true)
	},
	// crm星级客户(回访率)-门店
	storeHfl: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/storeHfl', opt, params, true)
	},
	// crm星级客户(回访率)-战队
	brandHfl: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/brandHfl', opt, params, true)
	},
	// crm星级客户-员工
	ygStarMemberList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/ygStarMemberList', opt, params, true)
	},
	// crm星级客户-门店
	storeStarMemberList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/storeStarMemberList', opt, params, true)
	},
	// crm星级客户-战队
	brandStarMemberList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/brandStarMemberList', opt, params, true)
	},
	// 排行榜趋势(个人,门店,战队,战区)
	trend: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/trend', opt, params, true)
	},
	// 排行榜(个人,门店,战队,战区)
	getBrandRanking: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_brand_ranking', opt, params, true)
		// return request.post(config.api.serviceUrl + '/member/BrandStoreSaleMoney', opt, params, true)
	},
	//首页
	getActivity: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_activity', opt, params, true)
	},

	// 获取用户信息(提现)
	getUserAccountInfo: (params, opt) => {
		return request.post(config.api.blankUrl + '/extension/index/getUserAccountInfo', opt, params, true)
	},
	// 提现
	setWithdrawal: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/set_withdrawal', opt, params, true)
	},
	// 获取token
	getToken: (params, opt) => {
		return request.post(config.api.blankUrl + '/logic/get_token', opt, params, true)
	},
	// 财务页面数据
	getMemberFinance: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/get_member_finance', opt, params, true)
	},
	// 推客业绩
	tweetAchievement: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/TweetAchievement', opt, params)
	},
	// 推客分配参数
	tweetTargetType: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/TweetTargetType', opt, params)
	},
	// 客户详情页面数据
	getUserOwnerInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_user_owner_info', opt, params, true)
	},
	// 业主查询页面数据
	getAchievementMember: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_achievement_member', opt, params, true)
	},
	// 设置红黑榜显示数据
	setRedBlackInit: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/setRedBlackInit', opt, params, true)
	},
	// 签单信息
	getOffLineOrderInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_off_line_order_info', opt, params, true)
	},
	// 签单 页面数据
	offLineOrder: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/off_line_order', opt, params, true)
	},
	// 业绩>浏览 页面数据
	getAchievementBrowse: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_achievement_browse', opt, params, true)
	},
	// 业绩页面数据注释
	rewardLlocation: (params, opt) => {
		return request.post(config.api.serviceUrl + '/reward_llocation', opt, params, true)
	},
	// 任务执行情况
	getTaskPerformance: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_task_performance', opt, params)
	},
	// 业绩页面数据
	getAchievement: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_achievement', opt, params, true)
	},
	// 是否可以参加团购
	getActBrief: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_act_brief', opt, params, true)
	},
	getActUser: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_act_user', opt, params, true)
	},
	getCarryQrcodeRule: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_carry_qrcode_rule', opt, params, true)
	},
	//推广海报
	poster: (params, opt) => {
		return request.post(config.api.serviceUrl + '/poster', opt, params, true)
	},
	//核销码
	writeOff: (params, opt) => {
		return request.post(config.api.serviceUrl + '/write_off', opt, params, true)
	},
	//报名客户
	getCustomer: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_customer', opt, params, true)
	},
	setStage: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/set_stage', opt, params, true)
	},
	getCustomerInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_customer_info', opt, params, true)
	},
	//奖励豆排行
	getAllStage: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_all_stage', opt, params, true)
	},
	getStageMoney: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_stage_money', opt, params, true)
	},
	editCustomer: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/edit_customer', opt, params, true)
	},
	getBonusBeans: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_bonus_beans', opt, params, true)
	},
	setBonusBeans: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/set_bonus_beans', opt, params, true)
	},
	getBeansRanking: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_beans_ranking', opt, params, true)
	},
	getBeansSRanking: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_beans_s_ranking', opt, params, true)
	},
	getRewardRules: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_reward_rules', opt, params, true)
	},

	//9/28修改奖金池
	// 任务分配获取奖励配置
	getBrandBonus: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/get_brand_bonus', opt, params)
	},
	// 奖励豆配置参数注释
	rewardLlocation: (params, opt) => {
		return request.post(config.api.serviceUrl + '/reward_llocation', opt, params)
	},
	// 任务分配
	setBrandBonus: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/set_brand_bonus', opt, params)
	},

	// 9/3
	//个人二维码
	getPersonalCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getPersonalCode', opt, params, true)
	},
	// 获取七牛token
	baseUploadImg: (params, opt) => {
		return request.post(config.api.blankUrl + '/base_upload_img', opt, params)
	},
	// 更新活动个人码
	setPersonalCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/setPersonalCode', opt, params)
	},
	// 店长邀请
	invitationStaff: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/invitation_staff', opt, params)
	},
	// 录入客户提交
	inputMember: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/inputMember', opt, params)
	},
	// 
	inputMemberList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/inputMemberList', opt, params)
	},
	// 获取随身码详情
	getCarryCodeInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_carry_code_info', opt, params)
	},
	// 获取随身码列表
	getCarryCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_carry_code', opt, params)
	},
	// 身份列表
	getStaffIdentity: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_staff_identity', opt, params)
	},
	// 随身码
	setCarryCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/set_carry_code', opt, params)
	},
	// 签单
	getSignOrderCategory: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getSignOrderCategory', opt, params)
	},
	// 内购码门店信息
	getStoreInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getStoreInfo', opt, params)
	},
	// 设置内购码门店信息
	setStoreInfo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/setStoreInfo', opt, params)
	},
	TweetTargetType: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/TweetTargetType', opt, params)
	},
	tweetTarget: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/tweetTarget', opt, params)
	},
	getZhanTweetList: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/getZhanTweetList', opt, params)
	},
	getBrandTweetList: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/getBrandTweetList', opt, params)
	},
	getStoreTweetList: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/getStoreTweetList', opt, params)
	},
	TweetInvitation: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/TweetInvitation', opt, params)
	},
	getStaffTweetList: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/getStaffTweetList', opt, params)
	},
	setTweetTarget: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/setTweetTarget', opt, params)
	},
	getPayUrl: (params, opt) => {
		return request.get(config.api.blankUrl + '/get_pay_url', opt, params)
	},
	allTweetTarget: (params, opt) => {
		return request.post(config.api.blankUrl + '/tweet/allTweetTarget', opt, params)
	},
	signOrderGoods: (params, opt) => {
		return request.post(config.api.serviceUrl + '/signOrderGoods', opt, params)
	},
	signOrderCategory: (params, opt) => {
		return request.post(config.api.serviceUrl + '/signOrderCategory', opt, params)
	},
	// 获取活动奖励政策
	getPolicy: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getPolicy', opt, params)
	},
	addOffLineOrder: (params, opt) => {
		return request.post(config.api.serviceUrl + '/add_off_line_order', opt, params)
	},
	invitationList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/invitation_list', opt, params)
	},
	getInputMember: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/getInputMember', opt, params)
	},
	inputMemberEdit: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/inputMemberEdit', opt, params)
	},
	invitationListStore: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/invitation_list_store', opt, params)
	},
	invitationExamine: (params, opt) => {
		return request.post(config.api.serviceUrl + '/member/invitation_examine', opt, params)
	},
	getCarryCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_carry_code', opt, params)
	},
	getCarryQrcode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_carry_qrcode', opt, params)
	},
	setCostWithdrawal: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/set_cost_withdrawal', opt, params)
	},
	getOrderMoney: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/get_order_money', opt, params)
	},
	// 活动费用 充值
	actCostRecharge: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/act_cost_recharge', opt, params)
	},
	getActCost: (params, opt) => {
		return request.post(config.api.serviceUrl + '/finance/get_act_cost', opt, params)
	},
	TargetTaskAmount: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/TargetTaskAmount', opt, params)
	},
	memberTarget: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/member_target', opt, params)
	},
	getTargetStage: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/getTargetStage', opt, params)
	},
	SetTaskDivision: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/SetTaskDivision', opt, params)
	},
	getTaskDivision: (params, opt) => {
		return request.post(config.api.serviceUrl + '/target/getTaskDivision', opt, params)
	},
	// 订单支付
	paymentsIndex: (params, opt) => {
		return request.post(config.api.blankUrl + '/payments/index', opt, params)
	},
	// app绑定or切活动
	appBindingAct: (params, opt) => {
		return request.post(config.api.serviceUrl + '/appBindingAct', opt, params)
	},
	getWriteList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/getWriteList', opt, params)
	},
	// 取授权地址
	getloginurl: (params, opt) => {
		return request.get(config.api.blankUrl + '/get_login_url', opt, params)
	},
}
