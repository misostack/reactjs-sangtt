import { getTokenLocal } from 'utils/localStorage'


const initialState = () => {

  let token = getTokenLocal();
  token = !!token ? token : "";
  // let user = [{ username:"admin", email:"admin@dirox.net", password:"admin" }];
  // if(!localStorage.getItem('user'))localStorage.setItem('user',JSON.stringify(user));

  return({ 
    auth: {
      token,
      loading: false,
    }
  })
};
export default initialState;