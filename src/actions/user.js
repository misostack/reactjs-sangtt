export function changeInfoUserAction(data) {
    return (dispatch, getState) => {
        let user = localStorage.getItem('user');
        if(!user){
            alert('Account not found');
            return false;
        }
        user = JSON.parse(user);
        let changeUser = [...user].map( e => {
            return (e.email === data.email ? {...e,...data} : {...e})			
            });
        localStorage.setItem("user", JSON.stringify(changeUser));
        alert('Change info success');
        return true;
    }
}

export function signUpAction(data) {
	return (dispatch, getState) => {
        let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
        let auth = user.filter(e => e.email === data.email).length;
        if(auth === 0){
            user.unshift(data);
            alert('Đăng kí thành công');
            localStorage.setItem("user", JSON.stringify(user));
            return true;
        }
        alert('Trùng tên email')
        return false;
    }   
}

export function removeUserAction(email) {
	return (dispatch, getState) => {
        let user = localStorage.getItem('user');
        if(!user){
            alert('Account not found');
            return false;
        }
        user = JSON.parse(user);
        if(!user){
            alert('Account not found');
            return false;
        }
        let deleteUser = user.filter(e => e.email !== email);
        if(deleteUser.length !== user.length){
            alert('Xoa thành công');
            localStorage.setItem("user", JSON.stringify(deleteUser));
            return true;
        }
        alert('Xoa bi loi')
        return false;
    }   
}