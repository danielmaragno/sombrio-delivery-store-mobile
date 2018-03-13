import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { fetchOrders } from './actions/ordersActions';

//
// Login Navigator
//

import Login from './components/Login';

const LoginNavigator = StackNavigator(
  {
    Login: {screen: Login},
    // Register: {screen: Register},
    // PasswdRecovery: {screen: PasswdRecovery}
  }
);

//
// App Navigator
//

import routesList from './routes';
import DrawerMenu from './components/DrawerMenu';

let routes = {};

for(i in routesList)
  routes[routesList[i].key] = {screen: routesList[i].screen}

const AppNavigator = DrawerNavigator(
  routes,
  {
    contentComponent: DrawerMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

//
// App
//

let Navigator = LoginNavigator;

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {token: null}
	}

	async _checkToken() {

	    const token = await AsyncStorage.getItem('token');
	    const { dispatch } = this.props;
	    
	    // if user logged in, link OneSignal player_id to this user
	    if(token){
			// Fetch token and stuff
	        dispatch({type: 'FETCH_TOKEN', token: token})
	        dispatch(fetchOrders(token));
	    }

		const id = await AsyncStorage.getItem('id');
		dispatch({type: 'FETCH_ID', id: id}); // User ID
		dispatch({type: 'CHANGE_ID', id: id}); // Login ID

		const passwd = await AsyncStorage.getItem('passwd');
		dispatch({type: 'CHANGE_PASSWD', passwd: passwd}); // Login Passwd

		const name = await AsyncStorage.getItem('name');
		dispatch({type: 'FETCH_ID', name: name}); // User ID
	      
	}

	componentWillMount() {
    	this._checkToken();
    } 

	render() {
		// console.log('teste');
		const { token } = this.props.user;
	    if(token){
	      Navigator = AppNavigator;
	      // handleSocket(this.props.user.token);
	    }

		return (
			<Navigator />
		);
	}
}


const mapStateProps = state => {
  return {
    login: state.login,
    user: state.user,
  }
}

export default connect(
  mapStateProps,
  null
)(App)