import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, StatusBar, Dimensions, ActivityIndicator
} from 'react-native';
import {
  Container, Form, Item, Input, Button, Picker
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        // country: null,
        email: null,
        conPass: null,
        password :null,
        passwordCheckError: false,
        showLoading: false,
        emailPresent: false,
        invalidEmail: false,
        emptyField: false,
        weakPassword: false,
    };
  }

  // onValueChange(value) {
  //   this.setState({
  //     country: value
  //   });
  // }

  signUpFunction(data, nav){
    if(data.email && data.password){
      this.setState({ emptyField: false });
      if(data.password === data.conPass){
        this.setState({ showLoading: true });
        auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then( userCredentials => {
            return userCredentials.user.updateProfile({
              displayName: data.name,
              // phoneNumber: data.number //Not working
            })
          })
          .then(() => nav.navigate('UserDataChecking'))
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              // alert('That email address is already in use!');
              this.setState({ emailPresent: true });
            } else if (error.code === 'auth/invalid-email') {
              // alert('That email address is invalid!');
              this.setState({ invalidEmail: true });
            } else if (error.code === 'auth/weak-password') {
              // alert('weak password');
              this.setState({ weakPassword: true });
            } else
              alert(error);
          });
      } else {
        this.setState({ passwordCheckError: true });
      }
    } else{ 
      this.setState({ emptyField: true });
    }
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
            <Text>For Volunteer</Text>
            {this.state.passwordCheckError ? <Text style={styles.ErrorText}>Password and Confirm Password does not match</Text> : null}
            {this.state.invalidEmail ? <Text style={styles.ErrorText}>Invalid E-mail Id</Text> : null}
            {this.state.emailPresent ? <Text style={styles.ErrorText}>A account exists with this E-mail id</Text> : null}
            {this.state.emptyField ? <Text style={styles.ErrorText}>Please fill all the fields</Text> : null}
            {this.state.weakPassword ? <Text style={styles.ErrorText}>Password should be atleast 6 Characters</Text> : null}
            <Text></Text>
            <View style={ styles.FormArea }>
            <>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Your Full Name'
                    autoFocus={false}
                    keyboardType='default'
                    onChangeText={ (fullname) => {this.setState({ name: fullname });} }
                  />
                </Item>
                {/* <Item style={ styles.FormContent }>
                <Picker
                    mode="dropdown"
                    iosHeader="Select your Country"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={ this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="Select your Country" value="" />
                    <Picker.Item label="India" value="india" />
                    <Picker.Item label="Japan" value="japan" />
                    <Picker.Item label="United States of America" value="usa" />
                    <Picker.Item label="United Kingdom" value="uk" />
                </Picker>
                </Item> */}
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Your E-mail'
                    keyboardType='email-address'
                    onChangeText={ (emailid) => {this.setState({ email: emailid });} }
                  />
                </Item>
                <Item  style={ styles.FormContent }>
                  {/* <Icon name='menu' /> */}
                  <Input 
                    placeholder='Your Password' 
                    secureTextEntry={true}
                    onChangeText={ (pass) => {this.setState({ password: pass });} }
                  />
                </Item>
                <Item>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    onChangeText={ (confirmPass) => {this.setState({ conPass: confirmPass });} }
                    returnKeyType='done'
                  />
                </Item>
                <Button style={ styles.btn } onPress={ this.signUpFunction.bind(this, this.state, this.props.nav) }>
                  <Text style={ styles.btnText }>CREATE AN ACCOUNT</Text>
                </Button>
                <Text style={ styles.accountText }>Already have an Account? <Text style={ styles.LoginText } onPress={ () => { this.props.nav.navigate('Login') } }>Login Now</Text></Text>
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
    marginTop: '10%',
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
  ErrorText: {
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '13.5%',
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
    paddingLeft: '25%',
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