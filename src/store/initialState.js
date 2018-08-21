const initialState = () => {

    let login = !!localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : {status: false};

    let user = [{ username:"admin", email:"admin@dirox.net", password:"admin" }];
    user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : user ;
    localStorage.setItem('user',JSON.stringify(user));

    return({ 
        user,
        login
    })
};
export default initialState;