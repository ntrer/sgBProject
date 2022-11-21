<!--
 * @Email: 769888021@qq.com
 * @Date: 2021-08-27 14:25:45
 * @Description: content
-->
<script>
// import upApp from '@/components/VersionUpdate.vue'
export default {
  components: {
    // upApp
  },
  onLaunch: function () {
	  if (process.env.NODE_ENV === 'development') {
	  	// 开发环境
	  	// uni.setStorageSync(
	  	//     "token",
	  	//     "Bearer+eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZhdWx0XzYxM2FiNDM4NmM4ZWYxLjg1NjcxNzU2IiwiaWF0IjoxNjMxMjM3MTc2LCJuYmYiOjE2MzEyMzcxNzYsImV4cCI6MTYzMzgyOTE3NiwidWlkIjo2NSwiYWN0X2lkIjoiMTk0Iiwiand0X3NjZW5lIjoiZGVmYXVsdCJ9.8yxq7UmSQhgQw2R9vYJYbisSLQZaTHLBBbRCeVcpz0c"
	  	// );
	  } else {
	  	// 生产环境
	  	// #ifdef H5
	  	uni.removeStorageSync('token')
	  	uni.removeStorageSync('user')
	  	return;
	  	// #endif
	  }
    
    // uni.setStorageSync('token', '')
    // #ifdef H5
    // uni.removeStorageSync('token')
    // uni.removeStorageSync('user')
    // return;
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="less">
page {
  width: 100%;
  height: 100%;
}
</style>
