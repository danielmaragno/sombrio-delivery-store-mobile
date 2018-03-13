import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';;
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Header, FormLabel, FormInput, Button, Avatar, Card } from 'react-native-elements';
import { colorsTable, headerStyle, headerTitleStyle, viewStyle } from '../colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { changeId, changePasswd, execLogin, clearPasswdField } from '../actions/loginActions';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    // this.props.navigation.setOnNavigatorEvent(this._checkAyncStorageToken.bind(this));
  }

  static navigationOptions = {
    // title: 'Sombrio Delivery',
    // headerStyle: headerStyle,
    // headerTitleStyle: headerTitleStyle,
    header: null
  }

  async _checkAyncStorageToken() {
    const token = await AsyncStorage.getItem('token');
    if(token){
      this.props.navigation.navigate('Home');
    }
  }

  execLogin() {
  	const info = {
  		scope: 'pos',
  		id: this.props.login.id,
  		passwd: this.props.login.passwd
  	}
  	this.props.dispatch(execLogin(info));
  }

  changeId(id) {
  	this.props.dispatch(changeId(id))
  }

  changePasswd(passwd) {
  	this.props.dispatch(changePasswd(passwd))	
  }

  showAlert() {
  	const errorAlert = Alert.alert(
		'Erro',
		'Email ou Senha incorretos. Por favor, repita a operação.'
  	)
  	this.props.dispatch(clearPasswdField())
  }

  async _checkToken() {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
  }

  // goToPasswdRecovery() {
  //   this.props.navigation.navigate('PasswdRecovery');
  // }

  componentDidUpdate(nextProps){
    if(this.props.login.errorFlag){
      this.showAlert();
    }
  } 


  render() {
    // this._checkAyncStorageToken();
  	
    return (

      
    	<View style={viewStyle}>
    		
        <Header
          outerContainerStyles={headerStyle}
          leftComponent={{}}
          centerComponent={<Text style={{color: '#fff', fontSize: 16}}>{`Smart City Delivery`}</Text>}
          rightComponents={{}}
        />
        
    		<ScrollView>
          <View style={{marginBottom: 10}}>

        		<Card title="Entrar"> 
    	    		
              <KeyboardAwareScrollView>
                <FormLabel>Login</FormLabel>
      	    		<FormInput 
      					value={this.props.login.id}
      					onChangeText={(id) => this.changeId(id)}
      	    			keyboardType='email-address'
      	    			autoCapitalize='none'
      	    		/> 
      	    		<FormLabel>Senha</FormLabel>
      	    		<FormInput 
      					value={this.props.login.passwd}
      					onChangeText={(passwd) => this.changePasswd(passwd)} 
      	    			secureTextEntry={true}
      	    			autoCapitalize='none'
      	    		/> 
              </KeyboardAwareScrollView>

    	     		<Button
    	     			onPress={this.execLogin.bind(this)}
    	     			backgroundColor={colorsTable.primary}
    	     			raised
    	     			title='ENTRAR'
    	     			loading={this.props.login.isLoading}
    	     		/>
              
              {/*
              <View style={{marginTop: 18, flex:1, alignItems: 'center'}}>
                <TouchableOpacity onPress={this.goToPasswdRecovery.bind(this)}>
                  <Text style={{color: "#2980b9"}}>
                    Esqueci a Senha
                  </Text>
                </TouchableOpacity>
              </View>
              */}


        		</Card>

    			</View>
        </ScrollView>

     	</View>
    );
  }
}

const mapStateProps = state => {
	return {
		login: state.login,
    user: state.user
	}
}

export default connect(
	mapStateProps,
	null
)(Login)