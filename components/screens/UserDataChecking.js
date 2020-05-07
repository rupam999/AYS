import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import auth from '@react-native-firebase/auth';

export default class UserDataChecking extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    auth()
      .onAuthStateChanged( user => {
        if(user){
          this.props.nav.navigate('MainPage')
        }
        else{
          this.props.nav.navigate('Intro')
        }
      });
  }

  render() {
    if(this.state.isLoading){
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      );
    }

    return(
      <Container>
        <Text>{ null }</Text>
      </Container>
    );
  }
}
