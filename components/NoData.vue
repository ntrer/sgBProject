<template>
    <view class="NoData-box">
        <image
            class="no-data-img"
            src="@/static/img/noData.gif"
            mode="widthFix"
        />
        <view class="no-data-tip">{{ noDataTip }}</view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        noDataTip: {
            default: "暂无数据",
        },
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.NoData-box {
    text-align: center;
    .no-data-img {
        display: block;
        margin: 0 auto;
        width: 200rpx;
    }
    .no-data-tip {
        margin-top: 20rpx;
        color: white;
        font-size: 28rpx;
        font-weight: bold;
    }
}
</style>