<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-06 19:12:07
 * @Description: content
-->
<template>
	<view class="com-nodata">
		<!-- <view class="noData" :style="{height: height + 'rpx', width: width + 'rpx'}"> -->
		<view class="noData">
			<image
        src="../../static/nodata.png"
        mode="widthFix"
      />
		</view>
		<!-- <view class="no-data-tip">{{ noDataTip }}</view> -->
	</view>
	
</template>

<script>
	export default {
		props:{
			width: {
				default: '400',
				type: String
			},
			height: {
				default: '400',
				type: String
			},
			noDataTip: {
			    default: "暂无数据",
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.noData {
	// transform: translate(0,50%);
	margin: 0 auto;
	// background-image: url(../../static/nodata.png);
	// background-size: 100% 100%;
	// background-repeat: no-repeat;
  margin-bottom: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  image{
    width: 50vw;
    height: 50vw;
  }
}
.no-data-tip {
      margin-top: 220rpx;
      color: #666;
		text-align: center;
        font-size: 34rpx;
    }
</style>
