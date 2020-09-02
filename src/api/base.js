// base.js
// axios请求方法封装
import axios from 'axios'

axios.defaults.timeout = 10000 // 请求超时时间

export const $_get = (url, param) => {
	let defaultConfig = {
		url,
		methos: 'GET',
		params: param
	}
	return axios.request(defaultConfig)
}

export const $_post = (url, body) => {
	let config = {
		url,
		method: 'POST',
		data: body,
		transformRequest: [function (data) {
			let ret = ''
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}]
	}
	return axios.request(config)
}

export const $_put = (url, body) => {
	let config = {
		url,
		methos: 'PUT',
		data: body,
		transformRequest: [function (data) {
			let ret = ''
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}]
	}
	return axios.request(config)
}

export const $_delete = (url, param) => {
	let config = {
		url,
		methos: 'DELETE',
		params: param
	}
	return axios.request(config)
}