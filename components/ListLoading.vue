<template>
    <view class="ListLoading-box">
        <image
            class="list-loading-img"
            src="@/static/img/list-loading-icon.gif"
            mode="widthFix"
        />
        <view class="list-loading-tip">数据正在加载中</view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.ListLoading-box {
    text-align: center;
    padding: 40rpx 0 20rpx;
    animation: fadeAnimation 2s infinite linear;

    .list-loading-img {
        .middleItem();
        width: 30rpx;
    }

    .list-loading-tip {
        .middleItem();
        font-size: 24rpx;
        margin-left: 20rpx;
        color: white;
    }

    @keyframes fadeAnimation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.1;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>