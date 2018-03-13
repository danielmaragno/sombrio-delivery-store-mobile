import { request, request_get } from '../http_config';

export function fetchOrders(token, data) {
	return (dispatch) => {
		
		request_get('/open-orders', token)

		.then((response) => {
			if(response.ok){
				response.json().then((body) => {
					let orders = [];
					let ordersMap = {};

					for(let i in body){
						orders.push(body[i]._id)
						ordersMap[body[i]._id] = body[i];
					}

					dispatch({type: 'FETCH_ORDERS', orders: orders, ordersMap: ordersMap})
				})
			}
			
		})

		.catch((err) => {
			console.log(err);
		})
	}
}

export function updateOrderStatus(token, order_id, data) {
	// data = status & pos_comentario
	return (dispatch) => {
		dispatch({type: 'SET_UPDATE_ORDER_STATUS_IS_LOADING', updateOrderStatusLoading: true})

		request('/order/'+order_id+'/status', 'PUT', {data: data}, token)

		.then((response) => {
			if(response.ok){
				dispatch({type: 'SET_ORDER_STATUS', order_id: order_id, status: data.status})				
				dispatch({type: 'SET_UPDATE_ORDER_STATUS_IS_LOADING', updateOrderStatusLoading: false})
				dispatch({type: 'SET_ORDER_MODAL_VISIBLE', visible: false})
			}
		})

		.catch((err) => {
			console.log(err);

		})
	}
}