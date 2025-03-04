import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, StatusBar, Dimensions, ActivityIndicator
} from 'react-native';
import {
    Container, Form, Item, Input, Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class LoginScreenContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      showLoading: false,
    };
  }

  loginFunction(data, nav){
    this.setState({ showLoading: true });
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => nav.navigate('UserDataChecking'))
      .catch( (error) => alert(error))
  }

  render() {
    if(this.state.showLoading){
      return(
        <View style={styles.loadScreen}>
          <ActivityIndicator size={40} color='28D8A1' />
          <Text>Taking you to a secure connection...</Text>
        </View>
      );
    }
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Container style={ styles.FullBody }>
          <Container style={ styles.MainContainer }>
            <Text style={ styles.MainHeading }>FACI<Text style={ styles.ColorHeading }>O</Text></Text>
            <Text></Text>
            <View style={ styles.FormArea }>
              <>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="envelope" size={25} color='#28D8A1' /> */}
                  <Input 
                    placeholder='Your E-mail'
                    keyboardType= 'email-address'
                    onChangeText={ (email) => this.setState({ email: email }) }
                  />
                </Item>
                <Item>
                  {/* <Icon name='menu' /> */}
                  <Input 
                    placeholder='Your Password'
                    secureTextEntry={true}
                    keyboardType='default'
                    onChangeText={ (pass) => this.setState({ password: pass }) }
                  />
                </Item>
                <Button style={ styles.btn } onPress={ this.loginFunction.bind(this, this.state, this.props.nav) }>
                  <Text style={ styles.btnText }>Login</Text>
                </Button>
                <Text style={ styles.accountText }>Don't have an Account? <Text style={ styles.LoginText } onPress={ () => { this.props.nav.navigate('Register') } }>Sign up Now</Text></Text>
              </>
            </View>
          </Container>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loadScreen: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FullBody: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5.5%',
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  MainHeading: {
    color: '#000',
    fontSize: 44,
    letterSpacing: 2.5,
  },
  ColorHeading: {
    fontSize: 44,
    color: '#28D8A1'
  },
  FormArea: {
    width: width,
    paddingLeft: '5%',
    paddingRight: '5.5%',
  },
  FormContent: {
    marginBottom: '1.5%',
  },
  btn: { 
    backgroundColor: '#28D8A1', 
    width: width*.92, 
    borderRadius: 10,
    height: '18%',
    marginTop: '10%',
    shadowColor: "#28D8A1",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
    paddingLeft: '42.5%',
  },
  accountText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
  },
  LoginText: {
    color: '#28D8A1',
    fontSize: 16,
  },
});