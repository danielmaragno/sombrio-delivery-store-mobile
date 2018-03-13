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

export function updatePos(token, data) {
	return (dispatch) => {
		dispatch({type: 'SET_USER_UPDATE_IS_LOADING', updateIsLoading: true});

		request('/pos', 'PUT', {required_data: data}, token)

		.then((response) => {
			if(response.ok) {
				dispatch({type: 'SET_USER_UPDATE_IS_LOADING', updateIsLoading: false});
			}
		})
	}
}

export function registerPlayerId(token, player_id) {
	return (dispatch) => {
		request('/pos/player_id', 'POST', {player_id: player_id}, token)

		.then((response) => {
			if(response.ok) {
				dispatch({type: 'FETCH_PLAYER_ID', player_id: player_id})
				// console.log('TUDO AZUL');
			}
		})

		.catch((error) => {
			console.log(error);
		})
	}
}
