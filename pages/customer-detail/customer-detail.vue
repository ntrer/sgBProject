<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-28 10:13:02
 * @Description: 客户详情页面
-->
<template>
  <view class="customer-detail">
    <Header haveback></Header>
    <view class="top-area">
      <view class="top-area-bg">
        <image
          src="../../static/customerDetail/customer_detail_bg.png"
          mode="scaleToFill"
        />
      </view>
      <view class="top-area-box">
        <view class="left-info">
          <text class="name">{{ userData.nick_name }}</text>
          <text class="phone">{{ userData.phones }}</text>
        </view>
        <view class="right-avatar">
          <image
            v-if="userData.user_img"
            :src="userData.user_img"
            mode="scaleToFill"
          />
          <image v-else src="../../static/user.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <view class="foot-list">
      <view class="foot-list-title">
        <text>浏览足迹</text>
      </view>
      <view v-for="(item, i) of listData" :key="i" class="foot-list-item">
        <view class="picture">
          <image :src="item.goods_img" mode="scaleToFill" />
        </view>
        <view class="right-info">
          <text class="title">{{ item.goods_name }}</text>
          <text class="prev-price">原价 {{ item.old_price }}</text>
          <text class="fast-price-title">
            闪购价
            <text class="fast-price">
              ¥ {{ item.goods_price }} {{ item.dan_wei }}
            </text>
          </text>
        </view>
      </view>
      <noData v-if="listData.length === 0"></noData>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      listData: [],
      userData: {},
      page: 1,
      total: 0
    }
  },
  onLoad(options) {
    if (options.id) this.id = options.id
    this.getList()
  },
  onReachBottom() {
    this.getList()
  },
  methods: {
    /**
     * @description: 获取页面数据
     */
    getList() {
      let that = this
      if (that.page !== 1 && that.listData.length >= that.total) {
        that.$Common.commonToast('暂无更多数据')
        return
      }
      that.$api.getUserOwnerInfo(
        {
          id: that.id,
          page: that.page
        },
        {
          success(res) {
            // console.log(res)

            that.listData = [...that.listData, ...res.data.tg_browse.data]
            that.userData = res.data.user
            that.page += res.data.tg_browse.current_page
            that.total = res.data.tg_browse.total
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
page {
  background: #f5f6f8;
}
.customer-detail {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-bottom: 30rpx;
  .top-area {
    width: 100%;
    height: 354rpx;
    position: relative;
    &-bg {
      position: absolute;
      z-index: 0;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
    &-box {
      position: relative;
      z-index: 1;
      padding: 42rpx 28rpx 22rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-info {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        flex: 1;
        .name {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          text-shadow: 0px 0px 4px rgba(8, 118, 226, 0.7);
        }
        .phone {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          text-shadow: 0px 0px 4px rgba(8, 118, 226, 0.7);
          margin-top: 16rpx;
        }
      }
      .right-avatar {
        width: 120rpx;
        height: 120rpx;
        border: 2rpx solid #ffffff;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .foot-list {
    position: relative;
    z-index: 1;
    width: 650rpx;
    padding: 0 24rpx 30rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background: #ffffff;
    margin-top: -170rpx;
    &-title {
      padding: 44rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
    &-item {
      height: calc(204rpx - 14rpx * 2);
      padding: 14rpx;
      background: #f7f7f7;
      display: flex;
      align-items: center;
      border-radius: 12rpx;
      & + .foot-list-item {
        margin-top: 20rpx;
      }
      .picture {
        width: 178rpx;
        height: 178rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .right-info {
        height: 100%;
        margin-left: 22rpx;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        .title {
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #3a3a3a;
        }
        .prev-price {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #120000;
          text-decoration: line-through;
        }
        .fast-price-title {
          font-size: 24rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #e02020;
          .fast-price {
            margin-left: 5rpx;
            font-size: 34rpx;
          }
        }
      }
    }
  }
}
</style>
