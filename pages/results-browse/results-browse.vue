<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-28 09:08:48
 * @Description: 浏览
-->
<template>
  <view class="results-browse">
    <Header haveback></Header>
    <view class="bottom-list">
      <view v-for="(item, i) of listData" :key="i" class="bottom-list-item">
        <view class="user-avatar">
          <image
            v-if="item.user_head_img"
            :src="item.user_head_img"
            mode="scaleToFill"
          />
          <image v-else src="../../static/user.png" mode="scaleToFill" />
        </view>
        <view class="info">
          <view class="top">
            <text class="left">{{ item.realname }}</text>
            <text class="right">{{ item.update_time }}</text>
          </view>
          <view class="bottom">
            <text class="left">{{ item.remarks }}</text>
            <text class="right">{{ item.number }} {{ item.status_s }}</text>
          </view>
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
      pageTitle: '',
      pageType: '',
      listData: [],
      page: 1,
      total: 0
    }
  },
  onLoad(options) {
    this.getList()
  },
  onReachBottom() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this
      if (that.page !== 1 &&that.listData.length >= that.total) {
        that.$Common.commonToast('暂无更多数据')
        return
      }
      that.$api.getAchievementBrowse(
        {
          page: that.page
        },
        {
          success(res) {
            console.log(res)
            that.listData = [...that.listData, ...res.data.data]
            that.page += res.data.current_page
            that.total = res.data.total
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.results-browse {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-bottom: 36rpx;
  .bottom-list {
    width: 690rpx;
    &-item {
      // height: 120rpx;
      padding: 20rpx 20rpx;
      margin-top: 20rpx;
      background: #f7f7f7;
      border-radius: 12rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 20rpx;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left,
          .right {
            font-size: 28rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3a3a3a;
          }
          .right {
            font-size: 24rpx;
            color: #888888;
          }
        }
        .bottom {
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left,
          .right {
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #a8a8a8;
          }
          .right {
            color: @common;
          }
        }
      }
    }
  }
}
</style>
