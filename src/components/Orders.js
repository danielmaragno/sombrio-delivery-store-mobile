import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { viewStyle, orderStatusMap, listItemStyle } from '../colors';
import { formatMonetary, formatDate, formatTime, formatDateTime } from '../utils';
import Header from './Header';

import OrderExpandModal from './OrderExpandModal';

class Orders extends React.Component {
	
	constructor(props) {
		super(props);
	}

	openModal(order) {
		this.props.dispatch({type: 'FETCH_ORDER_MODAL', order: order});
		this.props.dispatch({type: 'SET_ORDER_MODAL_VISIBLE', visible: true})
	}

	closeModal() {
		this.props.dispatch({type: 'SET_ORDER_MODAL_VISIBLE', visible: false})
	} 

	render() {

		const { orders, ordersMap } = this.props.orders;
		
		return (
			<View style={viewStyle} >
				<Header title="Pedidos"  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					{
						orders.map((order_id, i) => (
							<ListItem 
								key={order_id}
								title={<Item order={ordersMap[order_id]} />}
								onPress={() => this.openModal(ordersMap[order_id])}
							/>
						))
					}

				</ScrollView>

				<OrderExpandModal
					visible={this.props.orderModal.visible}
					onRequestClose={this.closeModal.bind(this)}
				/>

			</View>
		);
	}
}


const Item = ({order}) => {
	return (
		<View>
			<Grid>
				<Row>
					<Col>
						<Text style={{fontWeight: 'bold', color: listItemStyle.color}}>
							{`Pedido ${order._id.slice(-4)}`}
						</Text>
					</Col>
					<Col>
						<Badge
							containerStyle={{backgroundColor: orderStatusMap[order.status].color}}
							textStyle={{color:'#FFF'}}
							value={orderStatusMap[order.status].title}
						/>
					</Col>
				</Row>
				<Row style={{marginTop: 8}}>
					<Col>
						<Text style={{fontWeight: 'bold'}}>
							{formatDate(order.timeStamp)}
						</Text>
						<Text style={{fontWeight: 'bold', color: listItemStyle.color}}>
							{formatTime(order.timeStamp)}
						</Text>
					</Col>

					<Col>
						<Text style={{
							fontWeight: 'bold', 
							fontSize: 20,
							position: 'absolute',
							right: 8,
							bottom:0
						}}>
							{`$ ${formatMonetary(order.total_price - order.deliveryPrice)}`}
						</Text>
					</Col>
				</Row>
			</Grid>
		</View>
	)
}

const mapStateProps = state => {
	return {
		orders: state.orders,
    	user: state.user,
    	orderModal: state.orderModal
	}
}

export default connect(
	mapStateProps,
	null
)(Orders)
