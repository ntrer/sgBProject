<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 14:50:41
 * @Description: content
-->
<template>
  <view class="reg">
    <Header noLeft></Header>
    <view class="page-wrap">
      <view class="under-bg">
        <image src="../../static/reg/reg_bg.png" mode="scaleToFill" />
      </view>
      <view class="page-body">
        <view class="form-wrap two">
          <view class="input-box">
            <input
              v-model.trim="reqForm.phone"
              maxlength="11"
              type="text"
              placeholder="请输入您的手机号"
              placeholder-style="color:#a7abb1"
            />
          </view>
          <view class="input-box code">
            <input
              v-model.trim="reqForm.phone_code"
              maxlength="6"
              type="text"
              placeholder="请输入验证码"
              placeholder-style="color:#a7abb1"
            />
            <text @click="tapCodeBtn" class="code-btn">
              {{ codeBtnText }}
            </text>
          </view>
          <view class="input-box">
            <input
              v-model.trim="reqForm.password"
              maxlength="20"
              type="text"
              placeholder="请输入您的密码"
              placeholder-style="color:#a7abb1"
              :password="psw1"
            />
            <view @click="toggleEye(0)" class="eye-icon">
              <image
                v-show="psw1"
                src="../../static/eye-on.png"
                mode="scaleToFill"
              />
              <image
                v-show="!psw1"
                src="../../static/eye-off.png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <view class="input-box">
            <input
              v-model.trim="reqForm.rePassword"
              maxlength="20"
              type="text"
              placeholder="再次输入您的密码"
              placeholder-style="color:#a7abb1"
              :password="psw2"
            />
            <view @click="toggleEye(1)" class="eye-icon">
              <image
                v-show="psw2"
                src="../../static/eye-on.png"
                mode="scaleToFill"
              />
              <image
                v-show="!psw2"
                src="../../static/eye-off.png"
                mode="scaleToFill"
              />
            </view>
          </view>

          <view @click="submit" class="submit-btn">
            <text>找回密码</text>
          </view>
          <text @click="toLogin" class="to-login">去登录></text>
        </view>
        <!-- <view class="tip-text">
          <text>
            亲，当前注册活动的伙伴可能较多，注册审核时间可能在5～30分钟，请您耐心等待，查看是否审核通过，请再次识别二维码，进入KPI系统。
          </text>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      psw1: true,
      psw2: true,
      codeBtnText: '获取验证码',
      reqForm: {
        phone: '',
        password: '',
        rePassword: '',
        phone_code: ''
      },
      canGetCode: true
    }
  },
  methods: {
    /**
     * @description: 跳转到登录页面
     */
    toLogin() {
      uni.redirectTo({ url: '/pages/login/login' })
    },
    toggleEye(e) {
      switch (e) {
        case 0:
          this.psw1 = !this.psw1
          break
        case 1:
          this.psw2 = !this.psw2
          break
      }
    },
    /**
     * @description: 提交注册
     */
    submit() {
      let that = this
      this.$api.RetrievePwd(that.reqForm, {
        success(res) {
          that.$Common.commonToast('操作成功!','success',()=>{
			  uni.redirectTo({ url: '/pages/login/login' })
		  })
        }
      })
    },
    /**
     * @description: 点击获取验证码按钮
     */
    tapCodeBtn() {
      if (this.reqForm.phone === '') {
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
          phone: that.reqForm.phone
        },
        {
          success(res) {
            that.$Common.commonToast('验证码已发送,请注意查收')
          }
        }
      )
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
          position: relative;
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
          .eye-icon {
            width: 40rpx;
            height: 40rpx;
            position: absolute;
            right: 25rpx;
            image {
              width: 100%;
              height: 100%;
            }
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
        .to-login {
          margin-top: 30rpx;
          font-size: 24rpx;
          color: @common;
          text-decoration: underline;
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
