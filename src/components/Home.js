import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { viewStyle, orderStatusMap, listItemStyle, openTagStyle } from '../colors';
import { TextInputMask } from 'react-native-masked-text';
import Header from './Header';

import { updatePosOpen, updatePos } from '../actions/userActions';

class Home extends React.Component {
	
	constructor(props) {
		super(props);
	}

	setDeliveryPrice(deliveryPrice){
		newDeliveryPrice = deliveryPrice.split(' ')[1];
		newDeliveryPrice = newDeliveryPrice.replace('.','').replace(',','');
		
		this.props.dispatch({
			type: 'SET_DELIVERY_PRICE',
			deliveryPrice: newDeliveryPrice
		})
	}

	handleOpenButton() {
		const { dispatch, user} = this.props;

		dispatch(updatePosOpen(user.token, !user.open));
	}

	handleUpdateButton() {
		const { dispatch, user } = this.props;

		dispatch(updatePos(user.token, {deliveryPrice: user.deliveryPrice}));
	}

	render() {

		const { user } = this.props;

		return (
			<View style={viewStyle} >
				<Header title="Início"  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					
					<View style={{width: '100%', alignItems: 'center', marginTop: 25}}>
						<Avatar
						  height={100}
						  rounded
						  source={{uri: user.image}}
						  activeOpacity={0.7}
						/>
						<Text style={{color: '#555', fontWeight: 'bold', fontSize: 22}}>
							{user.name}
						</Text>
					</View>

					<View style={{marginTop: 35, padding: 15}}>
						<Text style={{fontWeight: 'bold'}}>
							Taxa de Entrega
						</Text>
						<TextInputMask 
							style={{
								color: '#444',
								fontSize: 18
							}}
							options={{
								unit: 'R$ '
							}}
							// underlineColorAndroid={'transparent'}
							type={'money'}
							value={user.deliveryPrice/100}
							onChangeText={this.setDeliveryPrice.bind(this)}
						/>
					</View>


				</ScrollView>

				<View style={{flexDirection: 'row', marginTop: 30}}>
					
						<Button
							large
							title={`${user.open ? 'Fechar' : 'Abrir'} Loja`}
							backgroundColor={'#34495e'}
							loading={user.openIsLoading}
							onPress={this.handleOpenButton.bind(this)}
							containerViewStyle={{width: '50%', marginLeft:0, marginRight: 0}}
						/>
					
					
						<Button
							large
							title={"Atualizar"}
							backgroundColor={'#2980b9'}
							loading={user.updateIsLoading}
							onPress={this.handleUpdateButton.bind(this)}
							containerViewStyle={{width: '50%', marginLeft:0, marginRight: 0}}
						/>
					
				</View>

			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateProps,
	null
)(Home)

