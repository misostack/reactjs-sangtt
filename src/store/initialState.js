const initialState = () => {

    let login = !!localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : {status: false};
    
    let user = [{ username:"admin", email:"admin@dirox.net", password:"admin" }];
    if(!localStorage.getItem('user'))localStorage.setItem('user',JSON.stringify(user));

    return({ 
        login
    })
};
export default initialState;