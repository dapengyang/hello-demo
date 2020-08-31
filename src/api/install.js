// index.js
import { get,post,put,_delete} from './base.js'

export const install = function(Vue, config = {}) {
    Vue.prototype.$_get = get
    Vue.prototype.$_post = post
    Vue.prototype.$_put = put
    Vue.prototype.$_delete = _delete
}