import { request, request_get } from '../http_config';
import { AsyncStorage } from 'react-native';
import RNRestart from 'react-native-restart';

export function changeId(id) {
	return {
		type: 'CHANGE_ID',
		payload: { id: id }
	}
}

export function changePasswd(passwd) {
	return {
		type: 'CHANGE_PASSWD',
		payload: { passwd: passwd }
	}
}

export function execLogin(info) {
	AsyncStorage.setItem("id", info.id);
	AsyncStorage.setItem("passwd", info.passwd);

	return (dispatch) => {
		dispatch({type: "EXEC_LOGIN"})
		
		request('/auth/login', 'POST', {info: info})
		.then(response => response.json())
		.then((response) => {
			
			// Set token and Item in permanent Storage.
			AsyncStorage.setItem("token", response.token);
			AsyncStorage.setItem("name", response.name);

			dispatch({type: 'EXEC_LOGIN_FULFILLED'});

			RNRestart.Restart();
			

		})
		.catch((error) => {
			console.log(error);
			dispatch({type: 'EXEC_LOGIN_REJECTED'})
		})
	} 
}

export function logout(token, player_id) {
	return (dispatch) => {
		request_get('/auth/logout?player_id='+player_id, token)
		
		.then((response) => {
			
			AsyncStorage.removeItem('token');
			
			if(response.status === 200){
				RNRestart.Restart();
			}
			else{
				console.log(response);
			}
		})
		
		.catch((error) => {
			AsyncStorage.removeItem('token');
			RNRestart.Restart();
			console.log(error);
		})
	}
}

export function execPasswdRecovery(id) {
	return (dispatch) => {
		dispatch({type: "SET_PASSWD_RECOVERY_IS_LOADING", isLoading: true});

		request_get('/auth/recovery-passwd?id='+id)

		.then((response) => {
			
			dispatch({type: "SET_PASSWD_RECOVERY_IS_LOADING", isLoading: false});
			dispatch({type: "SET_PASSWD_RECOVERY_RESPONSE_FLAG", responseFlag: response.status});
			
		})

		.catch()
	}
}

export function setFlagErrorFalse() {
	return {
		type: 'LOGIN_FLAG_ERROR_FALSE'
	}
}

export function clearPasswdField() {
	return {
		type: 'LOGIN_CLEAR_PASSWD_FIELD'
	}
}