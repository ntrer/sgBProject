<template>
	<view class="main-item-title">
		<!-- 标题 -->
		<text style="padding: 0 20rpx;">{{ title }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '优乐康新品'
			}
		}
	}
</script>

<style>
.main-item-title::after {
		content: '';
		width: 106rpx;
		height: 25rpx;
		background-repeat: no-repeat;
		background-color:transparent;
		background-size: 100% 100%;
		background-image: url(../../static/home/qixing.png)
}
.main-item-title::before {
	content: '';
	width: 106rpx;
	height: 25rpx;
	background-color:transparent;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url(../../static/home/xingqi.png)
}
.main-item-title {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	padding: 12rpx 20rpx;
	margin: 26rpx 0;
	font-weight: bold;
	color: #333;
	background-color:#fff;
}
</style>
