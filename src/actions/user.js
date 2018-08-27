export function changeInfoUserAction(data) {
    return (dispatch, getState) => {
        return changeInfoUserApi(data)
    }
}

export function exitEmailAction(email) {
	return (dispatch, getState) => {
			return exitEmailApi(email)
	}
}


export function signUpAction(data) {
	return (dispatch, getState) => {
       return signUpApi(data)
    }   
}

export function fetchUserAction(data) {
	return (dispatch, getState) => {
       return fetchUserApi(data)
    }   
}


export function removeUserAction(email) {
	return (dispatch, getState) => {
        return removeUserApi(email);
    }   
}

//fake api
const changeInfoUserApi = (data) =>(
	new Promise(function(resolve, reject) {

		setTimeout(function(){

			let user = localStorage.getItem('user');
			if(!user){
				return reject(new Error('Wrong email or password'))
			}
			user = JSON.parse(user);
			let changeUser = [...user].map( e => {
					return (e.email === data.email ? {...e,...data} : {...e})			
					});
			localStorage.setItem("user", JSON.stringify(changeUser));
			return resolve({...data})
		}, 500);
	})
)

const exitEmailApi = (email) =>(
	new Promise(function(resolve, reject) {

		setTimeout(function(){
			let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
			let authEmail = user.filter(e => e.email === email).length;
			authEmail > 0 ? resolve({exist: true}) : reject(new Error('Email not exist'));
		}, 500);
	})
)

const signUpApi = (data) =>(
	new Promise(function(resolve, reject) {

		setTimeout(function(){
			let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
			let auth = user.filter(e => e.email === data.email).length;
			if(auth === 0){
					user.unshift(data);
					localStorage.setItem("user", JSON.stringify(user));
					return resolve(data);
			}
			return reject(new Error('Cannot signup accounts'));
		}, 500);
	})
)

const fetchUserApi = (data = {}) =>(
	new Promise(function(resolve, reject) {

		setTimeout(function(){
			let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
			if(data.filter){
				let { filter } = data;
				if(!!filter.or){
					user = user.filter( e=> e.username.indexOf(filter.username)!== -1 || e.email.indexOf(filter.email) !== -1)
				}
				else{
					if(filter.username) user = user.filter( e=> e.username.indexOf(filter.username)!== -1)
					if(filter.email) user = user.filter( e=> e.email.indexOf(filter.email) !== -1)
				}

			}
			resolve(user);
		}, 500);
	})
)

const removeUserApi = (email) =>(
	new Promise(function(resolve, reject) {

		setTimeout(function(){
			let user = localStorage.getItem('user');
			if(!user){
				return reject(new Error('Not found user database'))
			}
			user = JSON.parse(user);
			let deleteUser = user.filter(e => e.email !== email);
			if(deleteUser.length !== user.length){
				localStorage.setItem("user", JSON.stringify(deleteUser));
				return resolve({email});
			}
			return reject(new Error('Cannot remove user'))
		}, 500);
	})
)