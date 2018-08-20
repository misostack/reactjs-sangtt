import { CHANGE_PASS_SUCCESS } from '../constants';

const initialState = [{ 
    email: "",
    password: "",
  }];

const reducer = (state  = initialState, action) => {
    switch (action.type){
        case CHANGE_PASS_SUCCESS: 
            return (action.payload)
        default:
            return state
    }
}
export default reducer;