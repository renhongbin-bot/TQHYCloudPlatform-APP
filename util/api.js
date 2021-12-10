const BASE_URL = 'http://localhost:8081/'


export const sendRequest = (options) => {
	uni.request({
		url: BASE_URL + options.url,
		method: options.method || 'POST',
		data: options.data || {},
		success: (res) => {
			options.success(res)
		},
		fail: (err) => {
			uni.showToast({
				title: "请求接口失败"
			})
			console.log(err)
		}
	})

}