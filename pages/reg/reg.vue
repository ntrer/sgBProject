<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 14:50:41
 * @Description: content
-->
<template>
  <view class="reg">
    <Header></Header>
    <view class="page-wrap">
      <view class="under-bg">
        <image src="../../static/reg/reg_bg.png" mode="scaleToFill" />
      </view>
      <view class="page-body">
        <!-- 注册第一步 -->
        <view v-if="step === 1" class="form-wrap">
          <view class="input-box">
            <input
              v-model.trim="stepOneForm.realname"
              maxlength="10"
              type="text"
              placeholder="请输入您的称呼"
              placeholder-style="color:#a7abb1"
            />
          </view>
          <view class="input-box">
            <input
              v-model.trim="stepOneForm.phone"
              maxlength="11"
              type="number"
              placeholder="请输入您的手机号"
              placeholder-style="color:#a7abb1"
            />
          </view>
          <view @click="submitOne" class="submit-btn">
            <text>提交审核</text>
          </view>
        </view>
        <!-- 注册第二步 -->
        <view v-if="step === 2" class="form-wrap two">
          <view class="input-box">
            <input
              v-model.trim="stepTwoForm.realname"
              maxlength="10"
              type="text"
              placeholder="请输入您的称呼"
              placeholder-style="color:#a7abb1"
            />
          </view>
          <view class="input-box">
            <input
              v-model.trim="stepTwoForm.phone"
              maxlength="11"
              type="text"
              placeholder="请输入您的手机号"
              placeholder-style="color:#a7abb1"
            />
          </view>
          <view class="input-box code">
            <input
              v-model.trim="stepTwoForm.phone_code"
              maxlength="11"
              type="text"
              placeholder="请输入验证码"
              placeholder-style="color:#a7abb1"
            />
            <text @click="tapCodeBtn" class="code-btn">
              {{ codeBtnText }}
            </text>
          </view>
          <!-- 选择战区 -->
          <view class="input-box select" v-if="zhanOptions.length != 0">
            <picker
              mode="selector"
              :range="zhanOptions"
              range-key="zhan_name"
              :value="zhanCur"
              @change="zhanChange"
              class="picker-select"
            >
              <!-- <view v-if="zhanOptions.length === 0" class="picker-select-text">
                暂无战区-无法报名
              </view> -->
              <view class="picker-select-text">
                {{
                  stepTwoForm.zhan_id
                    ? zhanOptions[zhanCur].zhan_name
                    : '请选择战区'
                }}
              </view>
            </picker>

            <view class="icon">
              <image
                src="../../static/index/next@2x(1).png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <!-- 选择战队 -->
          <view class="input-box select">
            <picker
              mode="selector"
              :range="brandOptions"
              range-key="name"
              :value="brandCur"
              @change="brandChange"
              class="picker-select"
            >
              <view v-if="brandOptions.length === 0" class="picker-select-text">
                暂无战队-无法报名
              </view>
              <view v-else class="picker-select-text">
                {{
                  stepTwoForm.brand_id
                    ? brandOptions[brandCur].name
                    : '请选择战队'
                }}
              </view>
            </picker>

            <view class="icon">
              <image
                src="../../static/index/next@2x(1).png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <view class="input-box select">
            <picker
              mode="selector"
              :range="storeOptions"
              range-key="store_name"
              :value="storeCur"
              @change="storeChange"
              class="picker-select"
            >
              <view v-if="storeOptions.length === 0" class="picker-select-text">
                暂无门店-无法报名
              </view>
              <view v-else class="picker-select-text">
                {{
                  stepTwoForm.store_id
                    ? storeOptions[storeCur].store_name
                    : '请选择门店'
                }}
              </view>
            </picker>

            <view class="icon">
              <image
                src="../../static/index/next@2x(1).png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <view @click="submitTwo" class="submit-btn">
            <text>提交审核</text>
          </view>
        </view>
        <view class="tip-text">
          <text>
            亲，当前注册活动的伙伴可能较多，注册审核时间可能在5～30分钟，请您耐心等待，查看是否审核通过，请再次识别二维码，进入KPI系统。
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		juli:'',
      step: 1,
      codeBtnText: '获取验证码',
      stepOneForm: {
        is_app: '',
        act_id: '',
        realname: '',
        phone: ''
      },
      stepTwoForm: {
        is_app: '',
        act_id: '',
        realname: '',
        phone: '',
        phone_code: '',
        zhan_id: '',
        brand_id: '',
        store_id: ''
      },
      zhanCur: '',
      brandCur: '',
      storeCur: '',
      zhanOptions: [],
      brandOptions: [],
      storeOptions: [],
      canGetCode: true
    }
  },
  watch: {},
  onLoad(options) {
    this.stepOneForm.is_app = '2'
    this.stepTwoForm.is_app = '2'
    /* #ifdef APP-PLUS */
    this.stepOneForm.is_app = '1'
    this.stepTwoForm.is_app = '1'
    /* #endif */
    if (options.id) {
		this.juli = options.id
      this.stepOneForm.act_id = options.id
      this.stepTwoForm.act_id = options.id
      console.log(this.stepOneForm)
    }
  },
  methods: {
    /**
     * @description: 获取门店列表
     */
    getStoreList() {
      let that = this
      this.$api.getStoreList(
        {
          act_id: that.stepTwoForm.act_id,
          brand_id: that.stepTwoForm.brand_id
        },
        {
          success(res) {
            that.storeOptions = res.data
          }
        }
      )
    },
    /**
     * @description: 获取战队列表
     */
    getBrandList() {
		let that = this
		if(that.zhanOptions.length == 0){
			that.stepTwoForm.zhan_id = 0
		}
      this.$api.getBrandList(
        {
          act_id: that.stepTwoForm.act_id,
          zhan_id: that.stepTwoForm.zhan_id
        },
        {
          success(res) {
            that.brandOptions = res.data
          }
        }
      )
    },
    /**
     * @description: 获取战区列表
     */
    getZhanList() {
      let that = this
      this.$api.getZhanList(
        {
          act_id: that.stepTwoForm.act_id
        },
        {
          success(res) {
            that.zhanOptions = res.data
			if( that.zhanOptions.length == 0){
				that.getBrandList()
			}
          }
        }
      )
    },
    /**
     * @description: 加入活动
     */
    addActivity() {
      let that = this
      let data = null
      return new Promise((resolve, reject) => {
        if (that.step === 1) {
          data = that.stepOneForm
        }
        if (that.step === 2) {
          data = that.stepTwoForm
        }
		data.act_id = that.juli
		console.log(data)
        that.$api.addActivityForYuan(data, {
          success(res) {
            that.$Common.commonToast(res.msg)
            uni.setStorageSync('token', res.data)
            resolve(res.code)
          },
          error(err) {
            resolve(err.code)
            if (err.code === 400) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      })
    },
    /**
     * @description: 点击获取验证码按钮
     */
    tapCodeBtn() {
      if (this.stepTwoForm.phone === '') {
        this.$Common.commonToast('请输入手机号')
        return
      }
      if (this.canGetCode === false) return
      let time = 30
      this.canGetCode = false
      this.codeBtnText = `${time}秒后获取`
      let interval = setInterval(() => {
        if (time === 1) {
          clearInterval(interval)
          this.codeBtnText = '获取验证码'
          this.canGetCode = true
          return
        }
        time -= 1
        this.codeBtnText = `${time}秒后获取`
      }, 1000)
      let that = this
      this.$api.RegisterSendCode(
        {
          phone: that.stepTwoForm.phone
        },
        {
          success(res) {
            that.$Common.commonToast('验证码已发送,请注意查收')
          }
        }
      )
    },
    /**
     * @description: 监听最后一个picker发生变化
     * @param {*} e 变化的内容
     */
    storeChange(e) {
      console.log(e)
      if (this.storeOptions.length === 0) return
      this.storeCur = e.detail.value
      this.stepTwoForm.store_id = this.storeOptions[e.detail.value].store_id
    },
    /**
     * @description: 监听战队发生变化
     * @param {*} e 变化的内容
     */
    brandChange(e) {
      console.log(e)
      if (this.brandOptions.length === 0) return
      this.brandCur = e.detail.value
      this.stepTwoForm.brand_id = this.brandOptions[e.detail.value].id
      this.storeOptions = []
      this.storeCur = ''
      this.getStoreList()
    },
    /**
     * @description: 监听战区发生变化
     * @param {*} e 变化的内容
     */
    zhanChange(e) {
      console.log(e)
      if (this.zhanOptions.length === 0) return
      this.zhanCur = e.detail.value
      this.stepTwoForm.zhan_id = this.zhanOptions[e.detail.value].zhan_id
      this.brandOptions = []
      this.brandCur = ''
      this.storeOptions = []
      this.storeCur = ''
      this.getBrandList()
    },
    /**
     * @description: 注册第二步提交
     */
    async submitTwo() {
      let code = await this.addActivity()
      if (code === 200) {
		 uni.reLaunch({
		 	url: 'pages/holdup/holdup',
		 });
      }
    },
    /**
     * @description: 注册第一步提交
     */
    async submitOne() {
      console.log(this.stepOneForm)
      if (this.stepOneForm.realname === '') {
        this.$Common.commonToast('请输入您的称呼')
        return
      }
      if (this.stepOneForm.phone === '') {
        this.$Common.commonToast('请输入您的称呼')
        return
      }
      let code = await this.addActivity()
      /* 如果重复报名活动 */
      if (code === 400) {
        this.step = 1
        this.stepOneForm = Object.assign({}, this.$options.data().stepOneForm)
        this.stepTwoForm = Object.assign({}, this.$options.data().stepTwoForm)
        return
      }
      Object.keys(this.stepOneForm).forEach(item => {
        this.stepTwoForm[item] = this.stepOneForm[item]
      })
      setTimeout(() => {
        this.getZhanList()
        this.step = 2
      }, 500)
    }
  }
}
</script>

<style lang="less">
.reg {
  width: 100%;
  height: 100%;
  background: #f5f6f8;
  .page-wrap {
    height: calc(100% - 20rpx - @headerheight);
    margin-top: 20rpx;
    position: relative;
    .under-bg {
      width: 100%;
      height: calc(237 * 2rpx);
      position: absolute;
      z-index: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .page-body {
      width: calc(345rpx * 2);
      height: calc(100% - 30rpx);
      left: 30rpx;
      top: 30rpx;
      background-image: url(../../static/reg/page_bg.png);
      background-size: 100% 100%;
      position: relative;
      z-index: 1;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .form-wrap {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        position: absolute;
        bottom: 126rpx;
        .input-box {
          width: 558rpx;
          height: 88rpx;
          background: #eceaea;
          border-radius: 999px;
          display: flex;
          align-items: center;
          input {
            flex: 1;
            margin: 0 44rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            // color: #a7abb1;
          }
          // &:first-child {
          //   margin-top: 614rpx;
          // }
          & + .input-box {
            margin-top: 20rpx;
          }
        }
        .submit-btn {
          margin-top: 154rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 308rpx;
          height: 70rpx;
          background: @common;
          border-radius: 10rpx;
          text {
            font-size: 32rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
      .two {
        .code {
          justify-content: space-between;
          input {
            margin-right: 0;
          }
          .code-btn {
            margin: 0 44rpx 0 30rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
          }
        }
        .select {
          .picker-select {
            margin-left: 44rpx;
            flex: 1;
            &-text {
              font-size: 28rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #000000;
            }
          }
          justify-content: space-between;
          input {
            margin-right: 0;
          }
          .icon {
            margin-right: 44rpx;
            width: 30rpx;
            height: 30rpx;
            transform: rotate(90deg);
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .submit-btn {
          margin-top: 22rpx;
        }
      }
      .tip-text {
        position: absolute;
        bottom: 5rpx;
        width: 616rpx;
        display: flex;
        justify-content: center;
        text {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #676b6e;
          text-align: center;
        }
      }
    }
  }
}
</style>
