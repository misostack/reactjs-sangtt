import { LOGIN_START, LOGIN_FAILS, LOGIN_SUCCESS } from '../constants';
import { removeToken, getTokenLocal } from 'utils/localStorage';

export const loginStart = () => {
	return {
		type: LOGIN_START
	}
}

export function loginfails() {
	return {
		type: LOGIN_FAILS
	}
}
export function loginSuccess(token) {
	return {
		type: LOGIN_SUCCESS,
		payload: token
	}
}


export function logoutAction(){
	return (dispatch, getState) => {
		localStorage.removeItem('auth');
		dispatch(loginfails());
	}
}

export function loginAction({ email, password }) {
	return (dispatch, getState) => {
	
		dispatch(loginStart());
		return loginApi({email, password})
		.then(
			res =>{
				dispatch(loginSuccess(res.token))
				return res
			}
		)
		.catch(
				err =>{
					dispatch(loginfails());
					throw new Error(err);
				} 
		)	
	}
}
//fake api
	const loginApi = ({ email, password }) =>(
	new Promise(function(resolve, reject) {
		let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
		let auth = user.filter(e => e.email === email && e.password === password).length;
		setTimeout(function(){
			if(auth > 0){
				localStorage.setItem("auth", JSON.stringify({token:"123"}));
				resolve({token:"123"})
			}
			else{
				reject(new Error('Wrong email or password'))
			}	
		}, 500);
	})
)



