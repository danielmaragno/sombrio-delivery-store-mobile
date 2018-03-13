const initialState = {
	token: null,
	player_id: null,
	
	id: null,
	name: null,
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_USER': {
			return {...state, id: action.id, name: action.name}
		}
		case 'FETCH_TOKEN': {
			return {...state, token: action.token}
		}
		case 'FETCH_PLAYER_ID': {
			return {...state, player_id: action.player_id}
		}
	}


	return state;
}