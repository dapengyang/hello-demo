import axios from 'axios';
import uriConfig from '@/config/apiUriConf'

export default class Http {
    static async request(method, url, opts, type) {
        // 开启本地 mock 的话，不使用接口域名
        let hostName = uriConfig.apiUrl
        // type 存在则使用对应的接口，否则使用通用接口
        let uri = `${hostName}${url}`

        // 接口别名、请求方式及url
        let params = {
            xhrName: (opts && opts.name) || '',
            method,
            url: uri,
        }

        // 请求数据
        params.data = opts.body || {}

        // 设置特殊请求头
        if (opts.type === 'formData') {
            params.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios(params)
    }

    static get(url, opts) {
        return this.request('GET', url, opts)
    }

    static put(url, opts) {
        return this.request('PUT', url, opts)
    }

    static post(url, opts) {
        return this.request('POST', url, opts)
    }

    static patch(url, opts) {
        return this.request('PATCH', url, opts)
    }

    static delete(url, opts) {
        return this.request('DELETE', url, opts)
    }
}