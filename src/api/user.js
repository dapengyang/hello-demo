import { $_post} from './base.js'

export const login = ({ username, password }) => {
    const data = {
        username,
        password
    }
    
    return new Promise((resolve, reject) => {
		$_post('/rss/Users/v2_2_login',data).then(res => {
			resolve(res.data)
		}).catch(err => {
			console.log('err---------: ', err);
			reject(err)
		})
	})
}