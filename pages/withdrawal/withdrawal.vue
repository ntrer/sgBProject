<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-30 10:39:38
 * @Description: 提现页面
-->
<template>
  <view class="withdrawal-wrap">
    <Header haveback></Header>
    <view class="top-person">
      <text class="top-person-title">提现至:</text>
      <input class="input" type="text" />
      <view class="top-person-info">
        <view class="avatar">
          <image
            v-if="userInfo.user_head_img"
            :src="userInfo.user_head_img"
            mode="scaleToFill"
          />
          <image v-else src="../../static/user.png" mode="scaleToFill" />
        </view>
        <text class="name">{{ userInfo.realname || '' }}</text>
      </view>
    </view>
    <view class="withdrawal-box">
      <view class="withdrawal-box-header">
        <text>提现金额</text>
      </view>
      <view class="withdrawal-box-body">
        <text class="yen">¥</text>
        <input type="number" v-model.number="withdrawalForm.money" />
        <view class="right-icon">
          <image
            v-show="`${withdrawalForm.money}`.length > 0"
            @click="clear"
            src="../../static/withdrawal/clear.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view class="withdrawal-box-footer">
        <text class="left">可用余额: {{ userInfo.money || '0.00' }}元</text>
        <text @click="handleAll" class="right">全部提现</text>
      </view>
    </view>
    <view @click="submitWithdrawal" class="submit-btn">
      <text>提现</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      withdrawalForm: {
        money: ''
      }
    }
  },
  onLoad(options) {
    this.getUserInfo()
  },
  methods: {
    /**
     * @description: 获取用户信息(提现)
     */
    getUserInfo() {
      let that = this
      that.$api.getActUser(
        {},
        {
          success(res) {
            console.log(res)
            that.userInfo = res.data
            uni.setStorageSync('user', res.data)
          }
        }
      )
    },
    /**
     * @description: 提现
     */
    async submitWithdrawal() {
      let that = this
      let token = await this.getToken()
      that.$api.setWithdrawal(
        {
          form_token: token,
          money: this.withdrawalForm.money
        },
        {
          success(res) {
            console.log(res)
            that.$Common.commonToast('操作成功', 'success')
            setTimeout(() => {
              uni.navigateBack({ delta: 1 })
            }, 500)
          }
        }
      )
    },
    /**
     * @description: 获取token
     */
    getToken() {
      let that = this
      return new Promise((resolve, reject) => {
        that.$api.getToken(
          {},
          {
            success(res) {
              // console.log(res)
              resolve(res.data)
            }
          }
        )
      })
    },
    /**
     * @description: 点击全部提现按钮
     */
    handleAll() {
      if (this.userInfo.money) {
        let money = parseFloat(this.userInfo.money)
        this.withdrawalForm.money = money
      }
    },
    clear() {
      this.withdrawalForm.money = ''
    }
  }
}
</script>

<style lang="less" scoped>
page {
  background: #f5f6f8;
}
.withdrawal-wrap {
  // display: flex;
  // flex-flow: column nowrap;
  // align-items: center;
  .top-person {
    background: #ffffff;
    padding: 15rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    &-title {
      font-size: 28rpx;
      color: #333;
    }
    &-input {
      flex: 1;
      font-size: 28rpx;
      margin: 0 20rpx;
    }
    input {
      flex: 1;
      margin: 0 20rpx;
    }
    &-info {
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #100f0f;
        margin-left: 22rpx;
        transform: translateY(-5%);
      }
    }
  }
  .withdrawal-box {
    margin-top: 20rpx;
    padding: 0 30rpx;
    background: #fff;
    &-header {
      font-size: 32rpx;
      padding: 20rpx 0;
      color: #808080;
    }
    &-body {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 70rpx 0;
      border-bottom: 1px solid #e8e8e8;
      // position: relative;
      .yen {
        font-size: 60rpx;
        color: #000;
        font-weight: bold;
      }
      input {
        color: #000;
        font-size: 70rpx;
        // font-weight: bold;
        flex: 1;
        padding: 0 30rpx;
      }
      .right-icon {
        width: 60rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 30rpx;
          height: 30rpx;
          margin-bottom: 50%;
          // transform: translateY(-50%);
        }
      }
    }
    &-footer {
      padding: 20rpx 0;
      display: flex;
      justify-content: space-between;
      text {
        font-size: 32rpx;
        color: #808080;
      }
      .right {
        color: @common;
      }
    }
  }
  .submit-btn {
    width: 482rpx;
    height: 70rpx;
    background: #427bff;
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text {
      color: #fff;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
