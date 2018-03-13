const initialState = {
	orders: [],
	ordersMap: {}
}

export default function reducer(state=initialState, action) {

	switch (action.type) {
		case 'FETCH_ORDERS': {
			return {...state, orders: action.orders, ordersMap: action.ordersMap}
		}
		case 'INSERT_ORDER': {
			const orders = [].concat([action.order._id], state.orders);
			
			let ordersMap = Object.assign({}, state.ordersMap);
			ordersMap[action.order._id] = action.order;

			return {...state, orders: orders, ordersMap: ordersMap}
		}

		case 'SET_ORDER_POS_COMENTARIO': {
			
			let ordersMap = Object.assign({}, state.ordersMap);
			ordersMap[action.order_id].pos_comentario = action.pos_comentario;

			return {...state, ordersMap: ordersMap}
		}

		case 'SET_ORDER_STATUS': {

			let ordersMap = Object.assign({}, state.ordersMap);
			ordersMap[action.order_id].status = action.status;

			return {...state, ordersMap: ordersMap}
		}
	}

	return state;
}