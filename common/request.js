import $C from './config.js';
import $U from './util.js';

export default {
    // 全局配置
    common:{
        baseUrl:$C.baseUrl,
        header:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        },
        data:{},
        method:'GET',
        dataType:'json',
		token:true
    },
	
  // 请求 返回promise
  request(options = {}){
  	// 组织参数
  	options.url = this.common.baseUrl + options.url
  	options.header = options.header || this.common.header
  	options.data = options.data || this.common.data
  	options.method = options.method || this.common.method
  	options.dataType = options.dataType || this.common.dataType
	// options.token = options.token === false ?  false : this.common.token
	// 请求之前验证
	// token验证
	// if (options.token) {
	//     let token = $U.getStorage('token')
	//     // 二次验证
	//     if (!token) {
	//         uni.showToast({ title: '请先登录', icon: 'none' });
	//         // token不存在时跳转
	//         return uni.reLaunch({
	//             url: '/pages/index/index.vue',
	//         });
	//     }
	//     // 往header头中添加token
	//     options.header.authorization = token
	// } 
	 
	 
  	// 请求
  	return new Promise((res,rej)=>{
  		// 请求之前... todo
		uni.showLoading({
			title:"请求中..."
		})
  		// 请求中...
  		uni.request({
  			...options,
  			success: (result) => {
				uni.hideLoading()
  				// 服务端失败
  				if(result.data.code== 500){
					
  					uni.showToast({
  						title: result.data.msg || '服务端请求失败',
  						icon: 'none'
  					});
  					// uni.clearStorage();
  					// uni.redirectTo({
  					// 	url:'../../login/login'
  					// })
  				}
				else if(result.data.code== -200){
					uni.showToast({
						title: result.data.msg || '服务端请求失败',
						icon: 'none'
					});
					
					uni.clearStorage();
					uni.reLaunch({
						url:'../../login/login'
					})
					
				}
				else if(result.data.code== 202){
					uni.showToast({
						title: result.data.msg || '服务端请求失败',
						icon: 'none'
					});
					
					return rej()
				}
				else{
					// 成功
					let data = result.data
					let header= result.header
					res(data,header)
				}
  				
  			},
  			fail: (error) => {
				uni.hideLoading()
				console.log(error)
  				uni.showToast({
  					title:"服务端失败",
  					icon: 'none'
  				});
  				return rej()
  			}
  		});
  	})
  },
	
	
	
    // get请求
    get(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'GET'
		 options.method = 'GET'
        return this.request(options)
    },
    // post请求
    post(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'POST'
		options.header = {'Content-Type':'application/json;charset=UTF-8'}
        return this.request(options)
    },
	
	// post请求
	put(url,data = {},options = {}){
	    options.url = url
	    options.data = data
		 options.method = 'PUT'
	    options.header = {'Content-Type':'application/json;charset=UTF-8'}
	    return this.request(options)
	},
	
    // delete请求
    del(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
	// 上传文件
	upload(url,data,onProgress = false){
		return new Promise((result,reject)=>{
			// 上传
			let token = $U.getStorage('token')
			if (!token) {
			    uni.showToast({ title: '请先登录', icon: 'none' });
			    // token不存在时跳转
			    return uni.reLaunch({
			        url: '/pages/index/index.vue',
			    });
			}
			
			const uploadTask = uni.uploadFile({
				url:this.common.baseUrl + url,
				filePath:data.filePath,
				name:data.name || "files",
				header:{ token },
				success: (res) => {
					if(res.statusCode !== 200){
						return uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
					let message = JSON.parse(res.data)
					result(message.data);
				},
				fail: (err) => {
					console.log(err);
					reject(err)
				}
			})
			
			uploadTask.onProgressUpdate((res) => {
				if(typeof onProgress === 'function'){
					onProgress(res.progress)
				}
			});
			
		})
	}
	
	
	
}