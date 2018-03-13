import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header as NativeHeader, Icon, Badge } from 'react-native-elements';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle, openTagStyle } from '../colors';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { title, navigate, user } = this.props;
		
		return (
			<NativeHeader
		    	outerContainerStyles={headerStyle}
		    	leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => navigate('DrawerOpen') }}
				centerComponent={<Text style={{color: '#fff', fontSize: 18}}>{title}</Text>}
				rightComponent={
					<Badge
						containerStyle={
							user.open ? 
							{backgroundColor: openTagStyle.open.color} : 
							{backgroundColor: openTagStyle.closed.color}
						}
						textStyle={{color:'#FFF'}}
						value={
							user.open ?
							openTagStyle.open.text :
							openTagStyle.closed.text
						}
					/>
				}
			/>
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
)(Header)