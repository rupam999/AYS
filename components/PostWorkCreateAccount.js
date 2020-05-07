import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, StatusBar, Dimensions
} from 'react-native';
import {
    Container, Form, Item, Input, Button, Picker
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class PostWorkCreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      country: undefined,
      email: undefined,
      number: undefined,
      password :undefined,
    };
  }

  onValueChange(value) {
    this.setState({
      country: value
    });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Container style={ styles.FullBody }>
          <Container style={ styles.MainContainer }>
            <Text style={ styles.MainHeading }>FACI<Text style={ styles.ColorHeading }>O</Text></Text>
            <Text>If You Need Something</Text>
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
                <Item style={ styles.FormContent }>
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
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Your E-mail'
                    keyboardType='email-address'
                    onChangeText={ (emailid) => {this.setState({ email: emailid });} }
                  />
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Phone Number'
                    keyboardType='number-pad'
                    onChangeText={ (phone) => {this.setState({ number: phone });} }
                  />
                </Item>
                <Item>
                  {/* <Icon name='menu' /> */}
                  <Input 
                    placeholder='Your Password' 
                    secureTextEntry={true}
                    onChangeText={ (pass) => {this.setState({ password: pass });} }
                    returnKeyType='done'
                  />
                </Item>
                <Button style={ styles.btn } onPress={ () => alert(`Name : ${this.state.name} Password: ${this.state.password} Email: ${this.state.email} Country: ${this.state.country} Phone: ${this.state.number} Type: ${this.state.type}`) }>
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
    height: '11%',
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