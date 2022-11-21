<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-30 09:18:59
 * @Description: 财务页面
-->
<template>
  <view class="financial-wrap">
    <view class="top-title">
      <text class="top-title-text">财务</text>
    </view>
    <view v-if="pageData" class="top-area">
      <view class="top-area-bg">
        <image
          src="../../static/financial/financial_bg.png"
          mode="scaleToFill"
        />
      </view>
      <view class="top-area-header">
        <view class="header-left">
          <text class="title">可提现金额（元）</text>
          <text class="money">
            {{ pageData.money.split('.')[0] }}
            <text class="dotted">.{{ pageData.money.split('.')[1] }}</text>
          </text>
          <text @click="toDetail" class="detail">提现明细 ></text>
        </view>
        <view class="header-right">
          <view @click="toWithdrawal" class="right-btn">
            <text>提现</text>
          </view>
        </view>
      </view>
      <view class="top-area-body">
        <view class="body-item">
          <text class="title">奖励总金额（元）</text>
          <text class="content">
            {{ pageData.total_money.split('.')[0] }}
            <text class="dotted">
              .{{ pageData.total_money.split('.')[1] }}
            </text>
          </text>
        </view>
        <view class="body-item">
          <text class="title">已提取金额（元）</text>
          <text class="content">
            {{ `${pageData.used_money}`.split('.')[0] }}
            <text v-if="`${pageData.used_money}`.split('.')[1]" class="dotted">
              {{ '.' + `${pageData.used_money}`.split('.')[1] }}
            </text>
          </text>
        </view>
      </view>
    </view>
    <view class="list-area">
      <view class="list-area-title">
        <text>收益来源</text>
      </view>
      <view v-for="(item, i) of listData" :key="i" class="list-area-item">
        <view class="item-bg">
          <image
            src="../../static/financial/financial_item_bg.png"
            mode="scaleToFill"
          />
        </view>
        <view class="item-left">
          <text class="item-left-title">{{ item.from_type_s }}</text>
          <text class="item-left-date">{{ item.create_time }}</text>
        </view>
        <view class="item-right">
          <text>{{ item.money }}</text>
        </view>
      </view>
      <noData v-if="listData.length === 0"></noData>
    </view>
    <Tabbar :selectIndex="3"></Tabbar>
  </view>
</template>

<script>
import Tabbar from '../../components/Tabbar.vue'
export default {
  components: {
    Tabbar
  },
  data() {
    return {
      listData: [],
      pageData: null,
      page: 1,
      total: 0
    }
  },
  onLoad(options) {
    // this.getList()
  },
  onShow() {
    this.page = 1
    this.total = 0
    this.listData = []
    this.pageData = null
    if (uni.getStorageSync('financialData')) {
      this.pageData = uni.getStorageSync('financialData')
    }
    this.getList()
  },
  onReachBottom() {
    this.getList()
  },
  methods: {
    /**
     * @description: 跳转提现明细页面
     */
    toDetail() {
      this.$Common.commonJump('/pages/financial-detail/financial-detail')
    },
    /**
     * @description: 获取页面数据
     */
    getList() {
      let that = this
      if (that.page !== 1 && that.listData.length >= that.total) {
        that.$Common.commonToast('暂无更多数据')
        return
      }
      that.$api.getMemberFinance(
        {
          type: that.pageType,
          page: that.page
        },
        {
          success(res) {
            console.log(res)
            that.listData = [...that.listData, ...res.data.record.data]
            that.pageData = res.data
            uni.setStorageSync('financialData', res.data)
            that.page += res.data.record.current_page
            that.total = res.data.record.total
          }
        }
      )
    },
    /**
     * @description: 跳转提现页面
     */
    toWithdrawal() {
      this.$Common.commonJump('/pages/withdrawal/withdrawal')
    }
  }
}
</script>

<style lang="less" scoped>
page {
  background: #f5f6f8;
}
.financial-wrap {
  width: calc(100% - 30rpx * 2);
  padding-bottom: 20rpx;
  margin-left: 30rpx;
  .top-title {
    padding: 24rpx 0;
    width: 750rpx;
    margin-left: -30rpx;
    // background: #ffffff;
    &-text {
      // margin-top: 24rpx;
      margin-left: 30rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
    }
  }
  .top-area {
    position: relative;
    padding-bottom: 20rpx;
    &-bg {
      width: 750rpx;
      height: 354rpx;
      position: absolute;
      left: -30rpx;
      z-index: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28rpx 0;
      background: none;
      position: relative;
      z-index: 1;
      // background: #fff;
      // border-radius: 20rpx;
      .header-left {
        display: flex;
        flex-flow: column nowrap;
        text {
          color: #ffffff;
        }
        .title {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
        .money {
          font-size: 60rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          text-shadow: 0px 0px 4px rgba(8, 118, 226, 0.7);
          margin: 20rpx 0;
          .dotted {
            font-size: 40rpx;
          }
        }
        .detail {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          text-decoration: underline;
        }
      }
      .header-right {
        width: 150rpx;
        height: 70rpx;
        border-radius: 10rpx;
        background: rgba(255, 255, 255, 0.3);
        // border: 1px solid rgba(255, 255, 255.3);
        display: flex;
        justify-content: center;
        align-items: center;
        text {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    &-body {
      position: relative;
      z-index: 1;
      padding: 36rpx 0;
      border-radius: 20rpx;
      background: #ffffff;
      box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-around;
      .body-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        .title {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #6d7278;
        }
        .content {
          font-size: 56rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #333333;
          margin-top: 30rpx;
          .dotted {
            font-size: 45rpx;
          }
        }
      }
    }
  }
  .list-area {
    background: #ffffff;
    width: 100%;
    padding: 0 30rpx 20rpx;
    margin-left: -30rpx;
    &-title {
      padding: 28rpx 0 0;
      text {
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: @common;
        border-bottom: 4rpx solid @common;
        padding-bottom: 2rpx;
      }
    }
    &-item {
      height: 116rpx;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .item-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .item-left,
      .item-right {
        position: relative;
        z-index: 1;
      }
      .item-left {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin-left: 24rpx;

        &-title {
          font-size: 26rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        &-date {
          margin-top: 12rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      .item-right {
        margin-right: 24rpx;
        text {
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: @common;
        }
      }
    }
  }
}
</style>
