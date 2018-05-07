import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Modal, View, Text, Image, TextInput, Alert } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { headerStyle, viewStyle, colorsTable, orderStatusMap, bottomInfoText } from '../colors';
import { formatMonetary, formatDate, formatTime, formatDateTime, formatAddress } from '../utils';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { http_url } from '../http_config';

import { updateOrderStatus } from '../actions/ordersActions';

class OrderExpandModal extends React.Component {
	
	constructor(props) {
		super(props);
	}

	updateOrderStatus(status) {
		const { token } = this.props.user;
		const { ordersMap } = this.props.orders;
		const { _id } = this.props.orderModal.order;
		const dispatch = this.props.dispatch;
		
		const data = {
			status: status,
			pos_comentario: ordersMap[_id].pos_comentario
		}

		dispatch(updateOrderStatus(token, _id, data))
	}

	render() {

		const props = this.props;
		const { order, updateOrderStatusLoading, cancelOrderStatusLoading } = this.props.orderModal;

		return (
			<Modal
				visible={props.visible}
				onRequestClose={props.onRequestClose}
				animationType={'slide'}
			>
				<View style={viewStyle}>
					<ScrollView>
						<HeaderBlock order={order} />

						<Block 
							title={"Cliente"}
							content={order.client_name}
						/>
						<Block 
							title={"Endereço de Entrega"}
							content={formatAddress(order.client_address)}
						/>
						<Block 
							title={"Forma de Pagamento"}
							content={order.formaPagamento}
						/>
						<Block
							show={order.formaPagamento === 'dinheiro' ? true : false}
							title={"Troco Para"}
							content={`R$ ${formatMonetary(order.change)}`}
						/>
						<ItemsBlock items={order.items} />
						
						<View style={viewBlockStyle}>
							<KeyboardAwareScrollView>
								<Text style={{fontWeight: 'bold'}}>Observação</Text>
								<TextInput 
									multiline={true}
									numberOfLines={2}
									value={order.pos_comentario}
									onChangeText={(pos_comentario) => {props.dispatch({
										type: 'SET_ORDER_POS_COMENTARIO',
										pos_comentario: pos_comentario,
										order_id: order._id
									})}}
								/>
							</KeyboardAwareScrollView>
						</View>


						<View style={{...viewBlockStyle, flexDirection: 'row'}}>
							<View>
								<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
									{`Taxa de Entrega`}
								</Text>
								<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
									{`R$ ${ formatMonetary(order.deliveryPrice)}`}
								</Text>
							</View>
							<View style={{alignItems: 'flex-end', flex: 1}}>
								<Text style={bottomInfoText}>
									{`Total R$ ${formatMonetary(order.total_price)}`}
								</Text>
							</View>
						</View>

					</ScrollView>
					

					<View style={order.status === 'requested' ? {flexDirection: 'row'} : {display: 'none'}}>
						<Button 
							large
							title="CONFIRMAR"
							containerViewStyle={{width: '50%', marginLeft:0, marginRight: 0}}
							backgroundColor={orderStatusMap.confirmed.color}
							onPress={() => this.updateOrderStatus('confirmed')}
							loading={updateOrderStatusLoading}
						/>
						<Button 
							large
							title="CANCELAR"
							containerViewStyle={{width: '50%', marginLeft:0}}
							backgroundColor={orderStatusMap.canceled.color}
							onPress={() => this.updateOrderStatus('canceled')}
							loading={cancelOrderStatusLoading}
						/>
					</View>

					<View style={order.status === 'confirmed' ? {} : {display: 'none'}}>
						<Button 
							large
							title="SAIU PARA ENTREGA"
							containerViewStyle={{width: '100%', marginLeft:0, marginRight: 0}}
							backgroundColor={orderStatusMap.on_road.color}
							onPress={() => this.updateOrderStatus('on_road')}
							loading={updateOrderStatusLoading}
						/>
					</View>

					<View style={order.status === 'on_road' ? {} : {display: 'none'}}>
						<Button 
							large
							title="FINALIZAR PEDIDO"
							containerViewStyle={{width: '100%', marginLeft:0, marginRight: 0}}
							backgroundColor={orderStatusMap.done.color}
							onPress={() => this.updateOrderStatus('done')}
							loading={updateOrderStatusLoading}
						/>
					</View>
				</View>

				
			</Modal>
		);
	}
}

const viewBlockStyle = {
	padding: 10
}

const HeaderBlock = ({order}) => {
	return (
		<View style={{padding: 10, marginTop: 10}}>
			<Grid>
				<Row>
					<Text 
						style={{
							color: '#444', fontSize: 20, fontWeight: 'bold',
							width: '100%', textAlign: 'center'
						}}
					>
						{`Pedido ${order._id.slice(-4)}`}
					</Text>
				</Row>
				<Row style={{marginTop: 15}}>
					<Col>
						<Row>
							<Text style={{fontWeight: 'bold', fontSize: 16}}>
								{`${formatDate(order.timeStamp)} `}
							</Text>
							<Text style={{fontWeight: 'bold', color: '#444', fontSize: 16}}>
								{` ${formatTime(order.timeStamp)}`}
							</Text>
						</Row>
					</Col>
					<Col>
						<Badge
							containerStyle={{backgroundColor: orderStatusMap[order.status].color}}
							textStyle={{color:'#FFF'}}
							value={orderStatusMap[order.status].title}
						/>
					</Col>
				</Row>
			</Grid>
			
		</View>
	)
}

const Block = ({title, content, show=true}) => {
	return (
		<View style={show ? viewBlockStyle : {display: 'none'}}>
			
			<View>
				<Text style={{fontWeight: 'bold'}}>
					{title}
				</Text>
			</View>
			<View style={{paddingLeft: 10, paddingRight: 10}}>
				<Text style={{color: '#444', fontWeight: 'bold'}}>
					{content}
				</Text>
			</View>

		</View>
	)
}

const ItemsBlock = ({items}) => {
	return (
		<View style={viewBlockStyle} >
			<View>
				<Text style={{fontWeight: 'bold', marginBottom: 5}}>
					{"Pedido"}
				</Text>
			</View>
			{
				items.map((item, index) => (
					<Grid key={index} style={{marginBottom: 5}}>
						<Col
							size={3} 
							style={{height: 40, marginRight: 5, backgroundColor: '#FFF', borderRadius: 10}}
						>
							
							<Image 
								source={{uri: http_url+item.image}}
								style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
							/>
							
						</Col>
						<Col size={8} style={{paddingRight: 5}}>
							<Row>
								<Text style={{fontWeight: 'bold', color: '#444'}}>
									{`${item.name} ${item.info}`}
								</Text>
							</Row>
							<Row>
								<Text>
									{item.observacao}
								</Text>
							</Row>
						</Col>
						<Col size={3}>
							<Row>
								<Text 
									style={{color: '#444', fontWeight: 'bold', fontSize: 30, position: 'absolute', bottom:0, right: 22}}
								>
									{`${item.qtd}`}
								</Text>
								<Text style={{color: '#444', position: 'absolute', bottom:5, right: 0, fontWeight: 'bold'}}>
									Un.
								</Text>
							</Row>
						</Col>
					</Grid>
				))
			}
		</View>
	)
}


const mapStateProps = state => {
	return {
		orderModal: state.orderModal,
		orders: state.orders,
		user: state.user
	}
}

export default connect(
	mapStateProps,
	null
)(OrderExpandModal)