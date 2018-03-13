import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header as NativeHeader, Icon } from 'react-native-elements';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { title, navigate } = this.props;
		
		return (
			<NativeHeader
		    	outerContainerStyles={headerStyle}
		    	leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => navigate('DrawerOpen') }}
				centerComponent={<Text style={{color: '#fff', fontSize: 18}}>{title}</Text>}
				
			/>
		);
	}
}