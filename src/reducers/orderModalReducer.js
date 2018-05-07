const initialState = {
	order: {},

	visible: false,
	updateOrderStatusLoading: false,
	cancelOrderStatusLoading: false // special for cancel buttom
}

export default function reducer(state=initialState, action) {

	switch (action.type) {
		case 'FETCH_ORDER_MODAL': {
			return {
				...state, 
				order: action.order
			}
		}
		case 'RESET_ORDER_MODAL': {
			return {
				...state, 
				order: {}
			}
		}

		case 'SET_ORDER_MODAL_VISIBLE': {
			return {...state, visible: action.visible}
		}

		case 'SET_UPDATE_ORDER_STATUS_IS_LOADING': {
			return {...state, updateOrderStatusLoading: action.updateOrderStatusLoading}
		}
		case 'SET_CANCEL_ORDER_STATUS_IS_LOADING': {
			return {...state, cancelOrderStatusLoading: action.cancelOrderStatusLoading}
		}
	}

	return state;
}