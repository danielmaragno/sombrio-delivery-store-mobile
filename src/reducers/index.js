import { combineReducers } from 'redux';

import login from './loginReducer';
import user from './userReducer';
import orders from './ordersReducer';
import orderModal from './orderModalReducer'

export default combineReducers({
	login,
	user,
	orders,
	orderModal
});