import { LOGIN_START, LOGIN_FAILS, LOGIN_SUCCESS, CHANGE_PASS_SUCCESS, SIGN_UP_SUCCESS  } from '../constants';

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
export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS
	}
}

export function changePassSuccess(data) {
	return {
		type: CHANGE_PASS_SUCCESS,
		payload: data
	}
}
export function signUpSuccess(data) {
	return {
		type: SIGN_UP_SUCCESS,
		payload: data
	}
}


export function logoutAction(){
	return (dispatch, getState) => {
		localStorage.removeItem('login');
		dispatch(loginfails());
	}
}

export function loginAction({ email, password }) {
	return (dispatch, getState) => {
		const { user } = getState();
		dispatch(loginStart());
		let auth = user.filter(e => e.email === email && e.password === password).length;
		setTimeout(function(){
			if(auth > 0){
				dispatch(loginSuccess());
				
				localStorage.setItem("login", JSON.stringify({status: true}));
			}
			else{
				dispatch(loginfails());
				alert('Wrong username or password')
			}	
		}, 500);
		
	}
}

export function changePassword({email, password}) {
	return (dispatch, getState) => {
		let { user } = getState();
		let changeUser = [...user].map( e => {
			return (e.email === email ? {...e,email,password} : {...e,email, password: e.password})			
			});	
		dispatch(changePassSuccess(changeUser))
		localStorage.setItem("user", JSON.stringify(changeUser));
	}
}

export function signUpAction(data) {
	return (dispatch, getState) => {
		let { user } = getState();
		let auth = user.filter(e => e.email === data.email).length;
		if(auth === 0){
			user.push(data);
			alert('Đăng kí thành công');
			dispatch(signUpSuccess(user));
			localStorage.setItem("user", JSON.stringify(user));
			return true;
		}
		alert('Trùng tên email')
		return false;
		
	}
}


