// base.js
// axios请求方法封装
import axios from 'axios'
import qs from 'qs'

export const post=(url,body,extend={isJson:true})=>{
	let defaultConfig={
		url,
		method:'POST',
		data:extend.isJson?body:qs.stringify(body)
	}
	let config={...defaultConfig,...extend}
	return axios.post(config).then(res=>{
		return res.data
	}).catch(err=>{
		return Promise.reject(err)
	})
}

export const get=(url,param)=>{
	let defaultConfig={
		url,
		methos:'GET',
		params:param
	}
	return axios.get(defaultConfig).then(res=>{
		return res.data
	}).catch(err=>{
		return Promise.reject(err)
	})
}

export const put=(url,body,extend={isJson:true})=>{
	let defaultConfig={
		url,
		methos:'PUT',
		data:body
	}
	let config={...defaultConfig,...extend}
	return axios.put(config).then(res=>{
		return res.data
	}).catch(err=>{
		return Promise.reject(err)
	})
}

export const _delete=(url,param,extend={isJson:true})=>{
	let defaultConfig={
		url,
		methos:'DELETE',
		params:param
	}
	let config={...defaultConfig,...extend}
	return axios.delete(config).then(res=>{
		return res.data
	}).catch(err=>{
		return Promise.reject(err)
	})
}