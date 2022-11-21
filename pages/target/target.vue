<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-30 09:18:59
 * @Description: 目标页面
-->
<template>
  <view class="target-wrap">
    <view class="top-title">
      <text class="top-title-text">目标</text>
    </view>
    <view class="page-card">
      <view
        v-for="(item, i) in listData"
        @click="navTo(item.path)"
        :key="i"
        class="page-card-item"
      >
        <view class="icon">
          <image :src="item.img" mode="scaleToFill" />
        </view>
        <view class="title">{{ item.title }}</view>
      </view>
    </view>
	
	<view class="copyright-info-box">
		<view>Copyright © 2019</view>
		<view>美视界（郑州）网络科技有限公司. 豫ICP备19042426号</view>
	</view>
	
	<Tabbar :selectIndex="4"></Tabbar>
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
      listData: [
        {
          img: '../../static/target/kao_qin.png',
          title: '考勤',
          path: ''
        },
        {
          img: '../../static/target/ri_zhi.png',
          title: '日志',
          path: ''
        },
        {
          img: '../../static/target/ren_wu.png',
          title: '我的任务',
          path: ''
        },
        {
          img: '../../static/target/qu_dao.png',
          title: '渠道管理',
          path: ''
        },
        {
          img: '../../static/target/jian_yi.png',
          title: '我的建议',
          path: ''
        },
        {
          img: '../../static/target/zhuang_tai.png',
          title: '我的状态',
          path: ''
        },
        {
          img: '../../static/target/shu_zhi.png',
          title: '阶段述职',
          path: ''
        },
        {
          img: '../../static/target/xue_xi.png',
          title: '经验学习',
          path: ''
        }
      ]
    }
  },
  methods: {
    navTo(path) {
      if (!path) {
        this.$Common.commonToast('暂未开放')
        return
      }
      this.$Common.commonJump(path)
    }
  }
}
</script>

<style lang="less" scoped>
page {
  background: #f5f6f8;
}
.target-wrap {
  // width: calc(100% - 30rpx * 2);
  padding-bottom: 20rpx;
  // margin-left: 30rpx;
  .top-title {
    padding: 24rpx 0;
    width: 750rpx;
    // margin-left: -30rpx;
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
  .page-card {
    padding-top: 32rpx;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background: #fff;
    &-item {
      margin-bottom: 32rpx;
      width: 21%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .icon {
        width: 76rpx;
        height: 76rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 20rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 2rpx;
      }
    }
  }
}
	
.copyright-info-box{
	text-align: center;
	font-size: 22rpx;
	position: absolute;
	bottom: 200rpx;
	left: 0;
	width: 100%;
	line-height: 2;
	color: #767676;
}
</style>
