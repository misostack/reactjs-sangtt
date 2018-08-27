import { LOGIN_START, LOGIN_FAILS, LOGIN_SUCCESS } from '../constants';


const initialState = {
		token: "",
		loading: false,
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case LOGIN_START:
			return {
				...state,
				loading: true
			}
		case LOGIN_SUCCESS:
			return {
				token: payload,
				loading: false,
			}
		case LOGIN_FAILS:
			return {
				...initialState
			}
		default:
			return state
	}
}
export default reducer;