const initialState = {
	id: 'pao_mel',
	passwd: 'pao_mel',
	// id: null,
	// passwd: null,
	
	isLoading: false,
	errorFlag: false
}

export default function reducer(state=initialState, action) {

	switch (action.type) {
		case 'CHANGE_ID': {
			return {...state, id: action.id}
		}
		case 'CHANGE_PASSWD': {
			return {...state, passwd: action.passwd}
		}
		case 'EXEC_LOGIN': {
			return {...state, isLoading: true, errorFlag: false}
		}
		case "EXEC_LOGIN_REJECTED": {
			return {...state, isLoading: false, errorFlag: true}
		}
		case "EXEC_LOGIN_FULFILLED": {
			return {...state, isLoading: false}
		}
		case "LOGIN_FLAG_ERROR_FALSE": {
			return {...state, errorFlag: false}
		}
		case 'LOGIN_CLEAR_PASSWD_FIELD': {
			return {...state, errorFlag: false, passwd: initialState.passwd}
		}
	}

	return state;
}