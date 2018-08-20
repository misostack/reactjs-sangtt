import { LOGIN_START, LOGIN_FAILS, LOGIN_SUCCESS } from '../constants';


const initialState = {
	status: false,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				loading: true
			}
		case LOGIN_SUCCESS:
			return {
				status: true,
				loading: false,
			}
		case LOGIN_FAILS:
			return {
				state:initialState
			}
		default:
			return state
	}
}
export default reducer;