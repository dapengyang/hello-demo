import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios';
import ElementUI from 'element-ui';
//引入element-ui的默认CSS样式
import 'element-ui/lib/theme-chalk/index.css';

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Avue);

// 请求拦截器
axios.interceptors.request.use(config => {
	const token = store.getters.token;
	if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
		// config.headers.common['access_token'] = `${token}`;
		config.url = `${config.url}${config.url.indexOf('?') > -1 ? '&' : '?'}access_token=${token}`;
	}
	return config
}, error => Promise.reject(error))

// 响应拦截器
axios.interceptors.response.use(response => {
	const status = response.status || response.data.status || response.data.code || 200;
	//如果是401则跳转到登录页面
	if (status === 401) store.dispatch('FedLogOut').then(() => router.push({
		path: '/login'
	}));
	return response;
}, (error) => {
	// 跳转到登录页面
	let me=this
	// console.debug('axios error', error.response, error.response.data, error.response.data.error);
	let status = error.status || error.response && (error.response.status || error.response.data.status || error.response
		.data.error.status) || undefined;
	switch (status) {
		case 401:
			store.dispatch('FedLogOut').then(() => {
				router.replace({
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				});
			});
			break;
		case 403:
			me.$message({
				message: '用户信息已过期，请重新登录',
				type: 'error'
			});
			// 清除token
			localStorage.removeItem('access_token');
			// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
			setTimeout(() => {
				router.replace({
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				});
			}, 1000);
			break;
		case 404:
			me.$message({
				message: '网络链接错误',
				type: 'error'
			});
			break;
		default:
			break;
	}
	return Promise.reject(error);
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
