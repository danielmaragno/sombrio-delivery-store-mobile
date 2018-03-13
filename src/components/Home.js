import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { viewStyle, orderStatusMap, listItemStyle, openTagStyle } from '../colors';
import Header from './Header';

import { updatePosOpen } from '../actions/userActions';

class Home extends React.Component {
	
	constructor(props) {
		super(props);
	}

	handleOpenButton() {
		const { dispatch, user} = this.props;

		dispatch(updatePosOpen(user.token, !user.open));
	}

	render() {

		const { user } = this.props;

		return (
			<View style={viewStyle} >
				<Header title="Início"  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					
				</ScrollView>

				<View style={{flexDirection: 'row', marginTop: 30, marginBottom: 20}}>
					<View>
						<Button
							title={`${user.open ? 'Fechar' : 'Abrir'} Loja`}
							backgroundColor={user.open ? openTagStyle.closed.color : openTagStyle.open.color}
							loading={user.openIsLoading}
							onPress={this.handleOpenButton.bind(this)}
						/>
					</View>
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

