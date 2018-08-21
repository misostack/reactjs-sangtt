import { CHANGE_PASS_SUCCESS, SIGN_UP_SUCCESS } from '../constants';

const initialState = [{ 
    username:"",
    email: "",
    password: "",
  }];

const reducer = (state  = initialState, action) => {
    switch (action.type){
        case CHANGE_PASS_SUCCESS: 
            return (action.payload)            
        case SIGN_UP_SUCCESS: 
            return (action.payload)
        default:
            return state
    }
}
export default reducer;