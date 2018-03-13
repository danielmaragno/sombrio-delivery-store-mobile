const initialState = {
	token: null,
	player_id: null,
	
	id: null,
	name: null,
	image: null,
	open: null,
	deliveryPrice: null,

	openIsLoading: false
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_USER': {
			return {
				...state, 
				id: action.user.id, 
				name: action.user.name,
				image: action.user.image,
				open: action.user.open,
				deliveryPrice: action.user.deliveryPrice,
			}
		}
		case 'FETCH_TOKEN': {
			return {...state, token: action.token}
		}
		case 'FETCH_PLAYER_ID': {
			return {...state, player_id: action.player_id}
		}

		case 'SET_USER_OPEN': {
			return {...state, open: action.open}
		}
		case 'SET_OPEN_IS_LOADING': {
			return {...state, openIsLoading: action.openIsLoading}
		}
	}


	return state;
}