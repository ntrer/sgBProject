/*
 * @Email: 769888021@qq.com
 * @Date: 2021-09-01 18:29:19
 * @Description: content
 */
// var host = 'http://192.168.1.123:8081'
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// var host = 'http://192.168.1.123:8081'
	var host = 'http://www.whaoshangliang.cn'
	// var host = 'http://youlekang.demo.zzznx.com'
} else {
	// 生产环境
	var host = 'http://www.whaoshangliang.cn/'
}
if (host.charAt(host.length - 1) == '/') {
	host = host.substr(0, host.length - 1)
}
var imgHost = host
// var imgHost = 'http://192.168.1.123:8081'
// #ifdef H5
host = imgHost
// #endif

export default {
  api: {
		blankUrl:host + '',
		apiUrl: host + '/api/user',
		serviceUrl: host + '/kpi',
		uploadUrl: host + "/api/upload/image"
	},
	imgHost
}