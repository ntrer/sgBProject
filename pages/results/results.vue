<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 17:52:54
 * @Description: 业绩页面
-->
<template>
  <view class="results">
    <!-- <Header></Header> -->
    <view class="top-title">
      <text class="top-title-text">业绩</text>
    </view>
    <view v-for="(item, i) of cardData" :key="i" class="card-wrap">
      <view
        @click="navTo(card)"
        v-for="(card, index) of item"
        :key="index"
        class="card-item"
      >
        <view class="card-item-bg">
          <image :src="card.bg" mode="scaleToFill" />
        </view>
        <view class="card-item-info">
          <text class="title">{{ card.title }}</text>
          <text class="person">{{ pageData[card.name] }} 人</text>
        </view>
      </view>
    </view>
    <noData v-if="cardData.length === 0"></noData>
    <Tabbar :selectIndex="1"></Tabbar>
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
      cardData: [
        [
          {
            title: '报名',
            bg: '../../static/result/bao_ming.png',
            name: 'sign_up'
          },
          {
            title: '浏览',
            bg: '../../static/result/liu_lan.png',
            name: 'browse'
          },
          {
            title: '裂变',
            bg: '../../static/result/lie_bian.png',
            name: 'fission'
          },
          {
            title: '售卡【优惠券】',
            bg: '../../static/result/shou_ka.png',
            name: 'selling_cards_coupon'
          },
          {
            title: '集赞',
            bg: '../../static/result/ji_zan.png',
            name: 'jizan'
          }
        ],
        [
          {
            title: '直播间邀约客户',
            bg: '../../static/result/yao_yue.png',
            name: 'live_room_invitation'
          },
          {
            title: '直播间签单',
            bg: '../../static/result/zhi_bo.png',
            name: 'live_room_order'
          },
          {
            title: '闪购',
            bg: '../../static/result/shan_gou.png',
            name: 'flash_sale_order'
          },
          {
            title: '拼团',
            bg: '../../static/result/pin_tuan.png',
            name: 'collage_order'
          },
          {
            title: '预售',
            bg: '../../static/result/yu_shou.png',
            name: 'advance_booking_order'
          },
          {
            title: '接待逛店',
            bg: '../../static/result/jie_dai.png',
            name: 'reception_shop'
          }
        ],
        [
          {
            title: '线下签到',
            bg: '../../static/result/qian_dao.png',
            name: 'off_line_sign'
          },
          {
            title: '贡献签单',
            bg: '../../static/result/gong_xian.png',
            name: 'contribution_signature'
          },
          {
            title: '线下签单',
            bg: '../../static/result/qian_dan.png',
            name: 'off_line_order'
          }
        ]
      ],
      /* 页面数据 */
      pageData: {},
      /* 页面数据名称 */
      dataNames: {}
    }
  },
  async onLoad(options) {
    await this.getDataName()
    this.getData()
  },
  methods: {
    /**
     * @description: 获取页面数据名称
     */
    getDataName() {
      let that = this
      return new Promise((resolve, reject) => {
        that.$api.rewardLlocation(
          {},
          {
            success(res) {
              that.dataNames = res.data
              resolve()
            }
          }
        )
      })
    },
    /**
     * @description: 获取页面数据
     */
    getData() {
      let that = this
      this.$api.getAchievement(
        {},
        {
          success(res) {
            // console.log(res)
            that.pageData = res.data
          }
        }
      )
    },
    navTo(item) {
      let path = ''
      let type = item.name
      switch (type) {
        /* 跳转 浏览 页面 */
        case 'browse':
          path = '/pages/results-browse/results-browse'
          this.$Common.commonJump(path + '?type=' + type)
          break
        /* 跳转 签单 页面 */
        case 'off_line_order':
          path = '/pages/results-order/results-order'
          type = '1'
          this.$Common.commonJump(path + '?type=' + type)
          break
        /* 跳转 签单 页面 */
        case 'contribution_signature':
          path = '/pages/results-order/results-order'
          type = '2'
          this.$Common.commonJump(path + '?type=' + type)
          break
        /* 跳转 业绩查询 页面 */
        default:
          path = '/pages/results-search/results-search'
          this.$Common.commonJump(path + '?type=' + type)
          break
      }
    }
  }
}
</script>

<style lang="less">
.results {
  width: 100%;
  background: #f5f6f8;
  .top-title {
    padding: 24rpx 0 4rpx;
    &-text {
      // margin-top: 24rpx;
      margin-left: 30rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
    }
  }
  .card-wrap {
    width: 100%;
    padding-bottom: 30rpx;
    display: flex;
    flex-flow: row wrap;
    background: #fff;
    // &+.card-wrap{
    margin-top: 20rpx;
    // }
    .card-item {
      width: 210rpx;
      height: 162rpx;
      position: relative;
      margin-left: 30rpx;
      margin-top: 30rpx;

      &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 3;
        image {
          width: 100%;
          height: 100%;
        }
      }
      &-info {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 4;
        display: flex;
        justify-content: center;
        .title {
          position: absolute;
          top: 14rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .person {
          position: absolute;
          right: 16rpx;
          bottom: 20rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
    }
  }
  .com-nodata {
    background: #fff;
  }
}
</style>
