<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-02 14:52:02
 * @Description: 签单信息
-->
<template>
  <view class="bill-detail">
    <Header></Header>
    <view class="list-wrap">
      <view class="list-item">
        <text class="left-title">姓名</text>
        <view class="right-content">
          <text>{{ pageData.y_name }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">电话</text>
        <view class="right-content">
          <text>{{ pageData.phone }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">商品分类</text>
        <view class="right-content">
          <text>{{ pageData.goods_cate }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">商品名称</text>
        <view class="right-content">
          <text>{{ pageData.goods_name }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">购买数量</text>
        <view class="right-content">
          <text>{{ pageData.num }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">成交金额</text>
        <view class="right-content">
          <text>{{ pageData.turnover_money }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">实收金额</text>
        <view class="right-content">
          <text>{{ pageData.income_money }}</text>
        </view>
      </view>
      <view class="list-item">
        <text class="left-title">签单图片</text>
        <view class="right-content">
          <view v-if="pageData.sign_order_img" class="img">
            <image :src="pageData.sign_order_img" mode="scaleToFill" />
          </view>
        </view>
      </view>
      <view class="list-item tips">
        <text class="left-title">客户来源</text>
        <view class="right-content tips">
          <template v-if="pageData.from_info instanceof Array">
            <text v-for="(item, i) of pageData.from_info" :key="i" class="tip">
              {{ item }}
            </text>
          </template>
          <text v-else class="tip">{{ pageData.from_info }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsId: '',
      pageData: {}
    }
  },
  onLoad(options) {
    if (options.id) this.goodsId = options.id
    this.getData()
  },
  methods: {
    /**
     * @description: 获取页面数据
     */
    getData() {
      let that = this
      that.$api.getOffLineOrderInfo(
        {
          order_id: that.goodsId
        },
        {
          success(res) {
            // console.log(res)
            that.pageData = res.data
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.bill-detail {
  .list-wrap {
    width: 690rpx;
    margin-left: 30rpx;
    .list-item {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      border-radius: 12rpx;
      background: #f7f7f7;
      box-sizing: border-box;
      padding: 20rpx 28rpx;
      text {
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3a3a3a;
      }
      .right-content {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        text {
          color: #6d7278;
        }
        .img {
          width: 300rpx;
          height: 200rpx;
          border-radius: 12rpx;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .tips {
      padding-bottom: 0;
      view {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        align-items: flex-start;
        flex: 1;
        padding-left: 30rpx;
        .tip {
          font-size: 24rpx;
          padding: 5rpx 20rpx;
          border: 1px solid @common;
          color: @common;
          border-radius: 10rpx;
          margin-left: 20rpx;
          margin-bottom: 20rpx;
        }
      }
    }
  }
}
</style>
