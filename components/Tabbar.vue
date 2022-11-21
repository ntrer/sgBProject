<template>
  <view class="Tabbar-box">
    <view class="tabbar-main-box">
      <view
        class="tabbar-main-item"
        v-for="(item, index) in tabbarList"
        :key="index"
        :class="selectIndex === index ? 'act' : ''"
        @click="pageJump(item)"
      >
        <image
          mode="widthFix"
          :src="selectIndex === index ? item.actIcon : item.icon"
          class="tabbar-main-item-icon"
        />
        <view class="tabbar-main-item-text">{{ item.text }}</view>
      </view>
    </view>

    <view class="tabbar-height"></view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    selectIndex: ''
  },
  data() {
    return {
      tabbarList: [
        {
          icon: require('@/static/tabbar/icon-1.png'),
          actIcon: require('@/static/tabbar/icon-1-act.png'),
          text: '首页',
          path: '/pages/index/index'
        },
        {
          icon: require('@/static/tabbar/icon-3.png'),
          actIcon: require('@/static/tabbar/icon-3-act.png'),
          text: '业绩',
          path: '/pages/results/results'
        },
        {
          icon: require('@/static/tabbar/icon-2.png'),
          actIcon: require('@/static/tabbar/icon-2-act.png'),
          text: '排行',
          path: '/pages/ranking/ranking'
        },

        {
          icon: require('@/static/tabbar/icon-4.png'),
          actIcon: require('@/static/tabbar/icon-4-act.png'),
          text: '财务',
          path: '/pages/financial/financial'
        },
        {
          icon: require('@/static/tabbar/icon-5.png'),
          actIcon: require('@/static/tabbar/icon-5-act.png'),
          text: '目标',
          path: '../target/target'
        }
      ]
    }
  },
  created() {},
  methods: {
    pageJump(item) {
      console.log(item)
      if (!item.path) {
        this.$Common.commonToast('敬请期待')
        return
      }
      this.$Common.commonJump(item.path, true)
    }
  }
}
</script>

<style lang="less" scoped>
.Tabbar-box {
  padding-bottom: 97rpx;
  padding-bottom: calc(98rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(98rpx + env(safe-area-inset-bottom));

  .tabbar-main-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    z-index: 2;

    .tabbar-main-item {
      .middleItem();
      padding: 12rpx 0;
      padding-bottom: calc(12rpx + constant(safe-area-inset-bottom));
      padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
      width: 20%;
      text-align: center;

      .tabbar-main-item-icon {
        display: block;
        margin: 0 auto;
        width: 44rpx;
      }

      .tabbar-main-item-text {
        margin-top: 7rpx;
        font-size: 24rpx;
        color: #999999;
        font-weight: bold;
      }

      &.act {
        .tabbar-main-item-text {
          color: @common;
        }
      }
    }
  }
}
</style>
