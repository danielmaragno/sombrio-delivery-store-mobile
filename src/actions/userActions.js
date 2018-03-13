import { request, request_get } from '../http_config';

export function fetchUser(token) {
	return (dispatch) => {

		request_get('/pos', token)

		.then((response) => {
			if(response.ok){
				response.json().then((body) => {
					dispatch({type: 'FETCH_USER', user: body})
				})
			}
		})

	}
}

export function updatePosOpen(token, open) {
	return (dispatch) => {
		
		dispatch({type: 'SET_OPEN_IS_LOADING', openIsLoading: true})

		request('/pos', 'PUT', {required_data: {open: open}}, token)

		.then((response) => {
			if(response.ok) {
				dispatch({type: 'SET_OPEN_IS_LOADING', openIsLoading: false})
				dispatch({type: 'SET_USER_OPEN', open: open})
			}
		})
	}
}