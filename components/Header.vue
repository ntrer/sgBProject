<template>
	<view class="Header-box">
		<view class="header-fixed-box" :style="{
                background: noBg ? noBg : '#fff',
            }">
			<view class="header-main-box">
				<view v-if="!noLeft" @click="headerLeftClick" class="header-left-box header-operation" :class="haveback?'w25':''">
					<image v-if="whiteback" class="header-left-back" mode="widthFix"
						src="../static/icon-back-white.png" />
					<image v-else class="header-left-back" mode="widthFix" src="../static/icon-back.png" />
					<text v-if="haveback" class="haveback_test">返回</text>
				</view>
				<view class="header-title" :style="{color:titlecolor?titlecolor:' #333'}">{{ title?title:pageTitle }}
				</view>
				<view @click="headerRightClick" class="header-right-box header-operation">{{ rightText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			// 右侧文字
			rightText: {
				default: '',
			},
			//左侧返回文字
			haveback:{
				default:false
			},
			
			title: {
				default: false,
			},
			// 是否有背景色
			noBg: {
				default: false,
			},
			//是否有标题颜色
			titlecolor: {
				default: false,
			},
			//是否有白色左侧箭头
			whiteback: {
				default: false,
			},
			// 是否有返回
			noLeft: {
				default: false,
			},
			// 传进来的标题
			notitle: {
				default: false,
			}
		},
		data() {
			return {
				pageTitle: ""
			};
		},
		created() {
			console.log(this.noBg)
			// 获取当前页面路由标题
			if (this.notitle) {
				this.pageTitle = this.notitle
			} else {
				this.pageTitle = this.$Route.style.navigationBarTitleText;
				
			}
		},
		methods: {
			headerRightClick() {
				// 组件绑定click事件
				this.$emit("rightClick");
			},
			headerLeftClick() {
				
					uni.navigateBack({});
					uni.setStorageSync("changeActive", 0)
			},

			// 更换标题
			changeTitle(title) {
				console.log(title);
				this.pageTitle = title;
			},
		},
	};
</script>

<style lang="less" scoped>
	.Header-box {
		position: relative;
		padding-bottom: @headerheight;
		padding-bottom: calc(constant(safe-area-inset-top) + @headerheight);
		padding-bottom: calc(env(safe-area-inset-top) + @headerheight);

		.header-fixed-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: @headerheight;
			height: calc(constant(safe-area-inset-top) + @headerheight);
			height: calc(env(safe-area-inset-top) + @headerheight);
			z-index: 9;

			.header-main-box {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				height: calc(@headerheight - constant(safe-area-inset-top));
				height: calc(@headerheight - env(safe-area-inset-top));
				height: @headerheight;
				color: white;

				.header-title {
					color: #333333;
					width: 70%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
				}

				.header-operation {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 15%;
					position: absolute;
					bottom: 0;
					white-space: nowrap;
					color: #333 !important;

					.header-left-back {
						width: 33rpx;
					}
					.haveback_test{
						font-size: 30rpx;
						font-weight: 400;
						color: #000000;
					}

					&.header-left-box {
						left: 0;
					}

					&.header-right-box {
						right: 32rpx;
						width: auto;
					}
				}
				.w25{
					width: 23%;
				}
			}
		}
	}
</style>
