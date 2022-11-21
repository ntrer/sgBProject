<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 09:36:34
 * @Description: 目标分配-战队
-->
<template>
  <view class="allot-team">
    <Header haveback></Header>
    <view class="top-area">
      <view class="top-area-bg">
        <image src="../../static/allot/allot_team_bg.png" mode="scaleToFill" />
      </view>
      <view class="top-area-card">
        <view class="card-title">
          <text class="title">基础任务</text>
        </view>
        <view class="card-info">
          <view class="card-info-left">
            <text class="top">
              订单数：
              <text>{{ allinfo.order_num }}单</text>
            </text>
            <text class="bottom">
              订单数完成率：
              <text>{{ allinfo.rate_order_num }}%</text>
            </text>
          </view>
          <view class="card-info-right">
            <text class="top">
              总销售额：
              <text>{{ allinfo.sale }}元</text>
            </text>
            <text class="bottom">
              销售额完成率：
              <text>{{ allinfo.rate_sale }}%</text>
            </text>
          </view>
        </view>
      </view>
      <view class="top-area-card">
        <view class="card-title">
          <text class="title">任务</text>
          <picker
            mode="selector"
            :range="phaseOptions"
            range-key="name"
            :value="phaseCur"
            @change="phaseChange"
          >
            <text class="phase" v-if="!changeitem">切换阶段</text>
            <text class="phase" v-if="changeitem">{{ changeitem }}</text>
          </picker>
        </view>
        <view class="card-info">
          <view class="card-info-left">
            <text class="top">
              订单数：
              <text>{{ stageinfo.stage_order_num }}单</text>
            </text>
            <text class="bottom">
              订单数完成率：
              <text>{{ stageinfo.stage_rate_order_num }}%</text>
            </text>
          </view>
          <view class="card-info-right">
            <text class="top">
              销售额：
              <text>{{ stageinfo.stage_sale }}元</text>
            </text>
            <text class="bottom">
              销售额完成率：
              <text>{{ stageinfo.stage_rate_sale }}%</text>
            </text>
          </view>
        </view>
      </view>
    </view>
    <!-- 两个按钮 -->
    <view class="btn-list">
      <view @click="toTaskSetting" class="btn-list-btn">
        <text>任务设置</text>
      </view>
      <view class="btn-list-btn" @click="proup">
        <text>任务划分</text>
      </view>
    </view>
    <!-- 底部列表区域 -->
    <view class="list-area">
      <view class="list-area-title">
        <view class="left">
          <text>
            战队
            <text>项目任务总控表</text>
          </text>
        </view>
        <text class="right">注：点击战队名查看门店信息</text>
      </view>
      <view class="list-area-content">
        <view v-for="(item, i) of listData" :key="i" class="item">
          <text class="index">{{ i + 1 }}</text>
          <view class="info">
            <text @click="toShop(item)" class="info-title">
              {{ item.name }}>>
            </text>
            <view class="info-content">
              <view class="info-content-left">
                <text>总任务: {{ item.stage_order_num }}</text>
                <text>当前完成: {{ item.DoneStageOrderNum }}</text>
                <text>当前完成率: {{ item.stage_rate_order_num }}%</text>
              </view>
              <view class="info-content-right">
                <text>总额度: {{ item.stage_sale }}</text>
                <text>当前完成: {{ item.DoneStageSale }}</text>
                <text>当前完成率: {{ item.stage_rate_sale }}%</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Indexproup
      :props="compontshow"
      :title="nametit"
      number="99"
      @none="none"
      :paramss="propsobj"
      :down="daye"
    ></Indexproup>
  </view>
</template>

<script>
import Indexproup from '@/components/indexproup.vue'
export default {
  components: {
    Indexproup
  },
  data() {
    return {
      nametit: '任务划分',
      compontshow: false,
      daye: false,
      listData: [],
      phaseCur: 0,
      phaseOptions: [],
      currentId: '',
      type: '',
      userInfor: {},
      datainfo: {},
      stageinfo: {},
      allinfo: {},
      changeitem: null,
      changeitemid: '',
      page: 1,
      propsobj: {}
    }
  },
  onLoad() {},
  onShow() {
    this.userInfor = uni.getStorageSync('user')
    if (
      this.userInfor.member_types === !4 ||
      this.userInfor.member_types === !5
    ) {
      switch (this.userInfor.member_types) {
        case 3:
          this.type = 'brand'
          this.currentId = this.userInfor.brand_id
          break
        case 6:
          this.type = 'store'
          this.currentId = this.userInfor.store_id
          break
        case 2:
          this.type = 'store'
          this.currentId = this.userInfor.store_id
          break
        default:
          break
      }
    }
    this.page = 1
    this.listData = []
    this.getdata()
    //获取阶段
    this.$api.getTargetStage(
      {},
      {
        success: ret => {
          if (ret.code == 200) {
            this.phaseOptions = ret.data
          }
        }
      }
    )
  },
  onReachBottom() {
    this.getdata()
  },
  methods: {
    none(data) {
      this.propsobj = data
      console.log(data)
      console.log('确认按钮')
      this.$api.SetTaskDivision(
        {
          challenge_percentage: this.propsobj.challenge_percentage,
          sprint_percentage: this.propsobj.sprint_percentage
        },
        {
          success: ret => {
            this.$Common.commonToast(ret.msg)
            this.daye = !this.daye
          }
        }
      )
    },
    proup() {
      this.hua()
      this.compontshow = !this.compontshow
    },
    /**
     * @description: 监听阶段发生变化
     */
    phaseChange(e) {
      this.phaseCur = e.target.value
      this.changeitemid = this.phaseOptions[this.phaseCur].id
      this.changeitem = this.phaseOptions[this.phaseCur].name
      this.page = 1
      this.listData = []
      this.getdata()
    },
    /**
     * @description: 跳转到任务设置页面
     */
    toTaskSetting() {
      this.$Common.commonJump('/pages/allot-task-setting/allot-task-setting')
    },
    /**
     * @description: 跳转门店信息页面
     */
    toShop(item) {
      this.$Common.commonJump(`/pages/allot-shop/allot-shop?id=${item.id}`)
    },
    //获取数据
    getdata() {
      this.$api.TargetTaskAmount(
        {
          stage_id: this.changeitemid,
          type: ''
        },
        {
          success: ret => {
            if (ret.code == 200) {
              this.datainfo = ret.data
              this.stageinfo = ret.data.stage
              this.allinfo = ret.data.all
            }
          }
        }
      )
      this.$api.memberTarget(
        {
          id: '',
          page: this.page,
          stage_id: this.changeitemid,
          type: ''
        },
        {
          success: ret => {
            if (ret.code == 200) {
              if (ret.data.length === 0) {
                this.$Common.commonToast('没有更多数据了')
                return
              }
              this.listData = [...this.listData, ...ret.data]
              this.page += 1
            }
          }
        }
      )
    },
    //任务划分
    hua() {
      this.$api.getTaskDivision(
        {},
        {
          success: item => {
            this.propsobj = item.data
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.allot-team {
  .top-area {
    &::before {
      content: '';
      display: table;
    }

    position: relative;

    &-bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 416rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    &-card {
      position: relative;
      z-index: 1;
      margin-left: 30rpx;
      width: 690rpx;
      background: #fff;
      box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
      margin-top: 20rpx;
      border-radius: 20rpx;
      padding-bottom: 20rpx;

      &::before {
        content: '';
        display: table;
      }

      .card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          background: #f58836;
          border-radius: 0 999px 999px 0;
          margin-left: -1px;
          width: 128rpx;
          height: 48rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }

        .phase {
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: @common;
          // position: absolute;
          // right: 30rpx;
          // top: 20rpx;
          margin-right: 30rpx;
          text-decoration: underline;
        }
      }

      .card-info {
        padding: 0 20rpx;
        display: flex;
        align-items: center;
        margin-top: 20rpx;

        &-left,
        &-right {
          width: 50%;
          display: flex;
          flex-flow: column nowrap;

          text {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6d7278;

            text {
              color: #000000;
            }
          }

          .bottom {
            margin-top: 16rpx;
          }
        }
      }
    }
  }

  .btn-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin-top: 20rpx;

    &-btn {
      width: 324rpx;
      height: 70rpx;
      background: @common;
      border-radius: 10rpx;
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

  .list-area {
    padding: 34rpx 30rpx 20rpx;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        padding-bottom: 2rpx;
        border-bottom: 4rpx solid @common;

        text {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: @common;

          text {
            font-size: 28rpx;
            margin-left: 10rpx;
          }
        }
      }

      .right {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6d7278;
      }
    }

    &-content {
      padding: 10rpx 0 20rpx;

      .item {
        padding: 12rpx 20rpx;
        display: flex;
        border-radius: 12rpx;
        background: #f7f7f7;
        margin-top: 10rpx;

        .index {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #3a3a3a;
        }

        .info {
          flex: 1;
          margin-left: 30rpx;

          &-title {
            font-size: 28rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 550;
            color: #3a3a3a;
            text-decoration: underline;
          }

          &-content {
            display: flex;

            &-left,
            &-right {
              width: 50%;
              display: flex;
              flex-flow: column nowrap;
              font-size: 28rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #120000;

              text {
                margin-top: 20rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
