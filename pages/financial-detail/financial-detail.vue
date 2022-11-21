<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-07 17:31:59
 * @Description: 提现明细
-->
<template>
  <view class="financial-detail">
    <Header></Header>
    <view class="list-wrap">
      <view v-for="(item, i) of listData" :key="i" class="list-item">
        <view class="item-left">
          <text class="title">{{ item.from_type_s }}</text>
          <text class="date">{{ item.create_time }}</text>
        </view>
        <view class="item-right">
          <text class="money">{{ item.money }}</text>
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
      page: 1,
      total: 0,
      listData: [
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
        // {
        //   from_type_s:'提现',
        //   create_time:'2021-01-01 18:11',
        //   money:'1.00'
        // },
      ]
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
      if (this.page !== 1 && this.listData.length >= this.total) {
        this.$Common.commonToast('没有更多数据了')
        return
      }
      that.$api.getMoneyExpend(
        {
          pgae: that.page
        },
        {
          success(res) {
            that.listData = [...that.listData, ...res.data.data]
            that.total = res.data.total
            that.page += 1
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.financial-detail {
  // background: #fff;
  .list-wrap {
    padding: 0 30rpx 20rpx;
    .list-item {
      padding: 20rpx;
      border-radius: 12rpx;
      background: #f7f7f7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      text {
        color: #333333;
      }
      .item-left {
        display: flex;
        flex-flow: column nowrap;
        .title {
          font-size: 28rpx;
        }
        .date {
          font-size: 24rpx;
          color: #ccc;
        }
        text + text {
          margin-top: 20rpx;
        }
      }
      .item-right {
        .money {
          font-size: 28rpx;
          color: @common;
        }
      }
    }
  }
}
</style>
