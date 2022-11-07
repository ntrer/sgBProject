import $C from './config.js'
export default {
    // 获取存储列表数据
    getStorage(key){
        let data = null;
		// #ifdef H5
		if($C.env === 'dev'){
		    data = window.sessionStorage.getItem(key)
		} else {
		    data = uni.getStorageSync(key)
		}
		// #endif
        // #ifndef H5
        data = uni.getStorageSync(key)
        // #endif
        return data
    },
    // 设置存储
    setStorage(key,data){
        // #ifdef H5
        if($C.env === 'dev'){
            return window.sessionStorage.setItem(key,data)
        } else {
            return uni.setStorageSync(key,data)
        }
        // #endif
		// #ifndef H5
		return uni.setStorageSync(key,data)
		// #endif
    },
    // 删除存储
    removeStorage(key){
        // #ifdef H5
        if($C.env === 'dev'){
            return window.sessionStorage.removeItem(key);
        } else {
            return uni.removeStorageSync(key)
        }
        // #endif
		// #ifndef H5
		return uni.removeStorageSync(key)
		// #endif
    },
	
	
	// 组织发送信息格式
	formatSendData(params){
		return {
			chat_type: "user",
			create_time: (new Date()).getTime(),
			data: params.data,
			from_avatar: "",
			from_id: 484,
			from_name: params.from_name,
			id: 1605145546105,
			isremove: 0,
			options: {},
			to_avatar: "",
			to_id: 500,
			to_name: "李振杰",
			type: params.type,
			noreadnum:5
		}
	},
	
	// 组织列表信息格式
	formatSendData2(params){
		return {
			chat_type: "user",
			create_time: (new Date(params.create_time)).getTime(),
			chatSortId:params.chatSortId,
			data: params.content,
			from_avatar: params.from_avatar,
			merchantId:params.merchantId,
			customerId: params.customerId,
			from_name: params.from_name,
			id: 1605145546105,
			isremove: 0,
			options: {},
			to_avatar: "",
			userId: params.userId,
			to_name: "李振杰",
			type: "text",
			noreadnum:params.count,
			mobileNumber:params.mobileNumber,
			merchantName:params.merchantName
		}
	},
	
	// 组织获取的消息格式
	formatGetData(params){
		return {
			chat_type: "user",
			create_time: (new Date(params.create_time)).getTime(),
			data: params.content,
			from_avatar:params.from_avatar,
			merchantId:params.merchantId,
			customerId: params.customerId,
			from_name: params.from_name,
			id: 1605145546105,
			isremove: 0,
			options: {},
			to_avatar: "",
			userId: params.userId,
			to_name: "李振杰",
			type: "text",
			noreadnum:params.count,
			fileUrl:params.fileUrl,
			newsType:params.newsType,
			sendType:params.sendType,
			status:params.status,
			poster:params.poster,
			videoImg:"http://img.testim.shushangsoft.com/upload/2020-12/07/2c8ecb314c574c089162285493810bbe_50C931467125B00D8CF8DBC84181C8A3.mp4?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png"
		}
	},
	
	
	formatGetData2(params){
		return {
			chat_type: "user",
			create_time: (new Date()).getTime(),
			data: params.content,
			from_avatar: params.from_avatar,
			merchantId:params.merchantId,
			customerId: params.customerId,
			from_name: params.from_name,
			id: 1605145546105,
			isremove: 0,
			options: {},
			to_avatar: "",
			userId: params.userId,
			to_name: "李振杰",
			type: "text",
			noreadnum:params.count,
			fileUrl:params.fileUrl,
			newsType:params.newsType,
			sendType:params.sendType,
			status:params.status,
			poster:params.poster,
			videoImg:"http://img.testim.shushangsoft.com/upload/2020-12/07/2c8ecb314c574c089162285493810bbe_50C931467125B00D8CF8DBC84181C8A3.mp4?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png"
		}
	},
	
}