import { LOGIN_START, LOGIN_FAILS, LOGIN_SUCCESS } from '../constants';

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


export function logoutAction(){
	return (dispatch, getState) => {
		localStorage.removeItem('login');
		dispatch(loginfails());
	}
}

export function loginAction({ email, password }) {
	return (dispatch, getState) => {
		let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
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




