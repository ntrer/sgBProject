<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-28 15:48:36
 * @Description: CRM星级客户
-->
<template>
  <view class="crm-star">
    <Header haveback></Header>
    <view class="top-area">
      <view class="top-area-bg" :class="tabCur === 0 ? '' : 'back'">
        <image
          :src="
            tabCur === 0
              ? '../../static/crmStar/crm_star_bg1.png'
              : '../../static/crmStar/crm_star_bg2.png'
          "
          mode="scaleToFill"
        />
      </view>
      <view class="top-area-content">
        <view class="top-tab">
          <view
            @click="switchTab(0)"
            class="top-tab-button"
            :class="tabCur === 0 ? 'active' : ''"
          >
            <text>星级客户</text>
          </view>
          <view
            @click="switchTab(1)"
            class="top-tab-button"
            :class="tabCur === 1 ? 'active' : ''"
          >
            <text>客户回访率</text>
          </view>
        </view>
        <view class="search-area">
          <view class="search-box">
            <view class="icon">
              <image src="../../static/crmStar/search.png" mode="scaleToFill" />
            </view>
            <input
              type="text"
              placeholder="搜索"
              placeholder-style="color:#fff"
              v-model.trim="searchForm.name"
            />
          </view>
          <text @click="handleSearch" class="search-btn">搜索</text>
        </view>
        <view v-if="tabCur === 1" class="data-box">
          <view class="data-box-item">
            <text class="title">总报名人数</text>
            <text class="text">{{ backNum.z_count_member }}</text>
          </view>
          <view class="data-box-item">
            <text class="title">总回访人数</text>
            <text class="text">{{ backNum.z_count_hf }}</text>
          </view>
          <view class="data-box-item">
            <text class="title">总回访率</text>
            <text class="text">{{ backNum.z_hfl }}</text>
          </view>
        </view>
      </view>
    </view>
    <template v-if="tabCur === 0">
      <view class="total-times">
        <text>
          总数
          <text class="red-text">{{ ' ' + crmTotal + ' ' }}</text>
          次
        </text>
      </view>
      <view
        @click="navTo(item)"
        v-for="(item, i) of listData"
        :key="i"
        class="team-item"
      >
        <text class="team-item-index">{{ i + 1 }}</text>
        <view class="team-item-avatar">
          <image v-if="item.head_img" :src="item.head_img" mode="scaleToFill" />
          <image v-else src="../../static/user.png" mode="scaleToFill" />
        </view>
        <view class="team-item-info">
          <view class="info-top">
            <text class="title">{{ item.name }}</text>
            <text class="person">{{ item.count_member }} 人</text>
          </view>
          <view class="info-bottom">
            <view class="star-box">
              <text class="star-box-title">五星客户</text>
              <text class="star-box-num">
                {{ item.member[0] }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">四星客户</text>
              <text class="star-box-num">
                {{ item.member[1] }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">三星客户</text>
              <text class="star-box-num">
                {{ item.member[2] }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">二星客户</text>
              <text class="star-box-num">
                {{ item.member[3] }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">一星客户</text>
              <text class="star-box-num">
                {{ item.member[4] }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">占位客户</text>
              <!-- <text class="star-box-num">{{ item.one }}</text> -->
            </view>
          </view>
        </view>
      </view>
      <noData v-if="listData.length === 0"></noData>
    </template>
    <template v-else-if="tabCur === 1">
      <view
        @click="navTo(item)"
        v-for="(item, i) of listData"
        :key="i"
        class="team-item back"
      >
        <text class="team-item-index">{{ i + 1 }}</text>
        <view class="team-item-avatar">
          <image v-if="item.head_img" :src="item.head_img" mode="scaleToFill" />
          <image v-else src="../../static/user.png" mode="scaleToFill" />
        </view>
        <view class="team-item-info">
          <view class="info-top">
            <text class="title">{{ item.name }}</text>
          </view>
          <view class="info-bottom">
            <view class="star-box">
              <text class="star-box-title">报名人数</text>
              <text class="star-box-num">
                {{ item.count_member }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">已回访人数</text>
              <text class="star-box-num">
                {{ item.count_hf }}
              </text>
            </view>
            <view class="star-box">
              <text class="star-box-title">回访率</text>
              <text class="star-box-num">
                {{ item.hfl }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <noData v-if="listData.length === 0"></noData>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabCur: 0,
      /* 页面层级 0为战队 1为门店 2为员工 */
      pageIndex: 0,
      searchForm: {
        name: '',
        page: 1
      },
      listData: [],
      /* 页面总数据量 */
      total: 0,
      /* crm星级客户总数 */
      crmTotal: '',
      backNum: {},
      starListData: [
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          person: '233',
          five: '77',
          four: '88',
          three: '99',
          two: '99',
          one: '99'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          person: '233',
          five: '77',
          four: '88',
          three: '99',
          two: '99',
          one: '99'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          person: '233',
          five: '77',
          four: '88',
          three: '99',
          two: '99',
          one: '99'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          person: '233',
          five: '77',
          four: '88',
          three: '99',
          two: '99',
          one: '99'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          person: '233',
          five: '77',
          four: '88',
          three: '99',
          two: '99',
          one: '99'
        }
      ],
      backPersonData: [
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          signNum: '80',
          backNum: '40',
          rate: '50%'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          signNum: '80',
          backNum: '40',
          rate: '50%'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          signNum: '80',
          backNum: '40',
          rate: '50%'
        },
        {
          avatar: '../../static/user.png',
          teamName: '项目组战队',
          signNum: '80',
          backNum: '40',
          rate: '50%'
        }
      ]
    }
  },
  onLoad(options) {
    if (options.cur) this.tabCur = parseInt(options.cur)
    if (options.index) {
      let index = parseInt(options.index) + 1
      this.pageIndex = index
      index === 1 && (this.searchForm.brand_id = options.id)
      index === 2 && (this.searchForm.store_id = options.id)
    }
    this.getList()
  },
  onReachBottom() {
    this.getList()
  },
  methods: {
    navTo(item) {
      let id = null
      if (this.pageIndex === 2) return
      id = item.id
      if (this.pageIndex === 1) {
        id = item.store_id
      }
      this.$Common.commonJump(
        '/pages/crm-star/crm-star?index=' +
          this.pageIndex +
          '&id=' +
          id +
          '&cur=' +
          this.tabCur
      )
    },
    /**
     * @description: 获取页面数据
     */
    getList() {
      let that = this
      let api = null
      if (this.tabCur === 0) {
        this.pageIndex === 0 && (api = this.$api.brandStarMemberList)
        this.pageIndex === 1 && (api = this.$api.storeStarMemberList)
        this.pageIndex === 2 && (api = this.$api.ygStarMemberList)
      }
      if (this.tabCur === 1) {
        this.pageIndex === 0 && (api = this.$api.brandHfl)
        this.pageIndex === 1 && (api = this.$api.storeHfl)
        this.pageIndex === 2 && (api = this.$api.ygHfl)
      }

      api(this.searchForm, {
        success(res) {
          console.log(res)
          if (res.data.data.data.length === 0) {
            that.$Common.commonToast('暂无更多数据')
            return
          }
          /* 处理crm星级客户数量数据 */
          if (that.tabCur === 0) {
            res.data.data.data.map(item => {
              item.member = item.member.reverse().map(item => {
                let data = item.split(':')[1]
                return data.substring(0, data.length - 1)
              })
            })
          }
          /* 处理回访人数,回访率数据 */
          if (that.tabCur === 1) {
            res.data.data.data.map(item => {
              item.count_hf = item.count_hf
                .split(':')[1]
                .substring(1, item.count_hf.split(':')[1].length - 1)
              item.count_member = item.count_member
                .split(':')[1]
                .substring(1, item.count_member.split(':')[1].length - 1)
              item.hfl = item.hfl
                .split(':')[1]
                .substring(1, item.hfl.split(':')[1].length)
            })
          }
          that.listData = [...that.listData, ...res.data.data.data]
          that.searchForm.page += 1
          if (that.tabCur === 0) {
            that.crmTotal = res.data.count
          }
          if (that.tabCur === 1) {
            that.backNum.z_count_hf = res.data.z_count_hf
            that.backNum.z_count_member = res.data.z_count_member
            that.backNum.z_hfl = res.data.z_hfl
          }
        }
      })
    },
    /**
     * @description: 点击搜索按钮
     */
    handleSearch() {
      console.log(this.searchForm)
      this.searchForm.page = 1
      this.listData = []
      this.getList()
    },
    /**
     * @description: 点击切换tab页
     * @param {*} e 当前tab的索引
     */
    switchTab(e) {
      console.log(e)
      this.tabCur = e
      this.searchForm.name = ''
      this.searchForm.page = 1
      this.listData = []
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
page {
  background: #fff;
}
.crm-star {
  width: calc(100% - 30rpx * 2);
  margin-left: 30rpx;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-bottom: 30rpx;
  .top-area {
    width: 100%;
    position: relative;
    &-bg {
      position: absolute;
      left: -30rpx;
      top: 0px;
      width: 750rpx;
      height: 256rpx;
      &.back {
        height: 356rpx;
      }
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-content {
      position: relative;
      z-index: 1;
      .top-tab {
        margin-top: 40rpx;
        display: flex;
        justify-content: space-between;
        &-button {
          width: 324rpx;
          height: 56rpx;
          background: rgba(245, 247, 250, 0.2);
          border-radius: 8rpx;
          border: 1rpx solid rgba(255, 255, 255, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          text {
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.5);
          }
          &.active {
            border: 1rpx solid #ffffff;
            text {
              color: #ffffff;
            }
          }
        }
      }
      .search-area {
        margin-top: 36rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-box {
          width: calc(578rpx - 30rpx * 2);
          height: 70rpx;
          padding: 0 30rpx;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          .icon {
            width: 38rpx;
            height: 38rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          input {
            flex: 1;
            margin-left: 18rpx;
            font-size: 32rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .search-btn {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          transform: translateY(-5%);
        }
      }
      .data-box {
        display: flex;
        justify-content: space-around;
        background: #fff;
        border-radius: 20rpx;
        box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
        padding: 40rpx 0;
        margin-top: 20rpx;
        &-item {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          .title {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6d7278;
          }
          .text {
            font-size: 48rpx;
            margin-top: 30rpx;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #333333;
          }
        }
      }
    }
  }
  .total-times {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 70rpx 0 10rpx;
    text {
      font-size: 32rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      .red-text {
        color: #ff4242;
      }
    }
  }
  .team-item {
    width: calc(100% - 14rpx * 2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 14rpx;
    border-radius: 12rpx;
    background: #f7f7f7;
    margin-top: 20rpx;
    &-index {
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3a3a3a;
    }
    &-avatar {
      width: 100rpx;
      height: 100rpx;
      margin-left: 20rpx;
      border-radius: 50%;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      // width: 480rpx;
      flex: 1;
      margin-left: 20rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      .info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #3a3a3a;
        }
      }
      .info-bottom {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .star-box {
          // width: 100rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          margin-left: 90rpx;
          margin-top: 20rpx;
          &-title {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #120000;
          }
          &-num {
            font-size: 28rpx;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #120000;
            margin-top: 16rpx;
          }
          &:nth-child(1) {
            margin-left: 0;
          }
          &:nth-child(4) {
            margin-left: 0;
          }
          &:last-child {
            text {
              color: #f7f7f7;
            }
          }
        }
      }
    }
  }
  .team-item.back {
    .star-box {
      margin-left: 0;
      &:last-child {
        padding-right: 20rpx;
      }
      text {
        color: #120000 !important;
      }
    }
  }
}
</style>
