import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MainHeader from './headers/UserHomeScreenHeader';

const {width, height} = Dimensions.get('screen');

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      userArr: [],
    };
  }

  componentDidMount(){
    auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ userid: user['uid'] });
        console.log(this.state.userid)
        // this.unsubscribe = firestore().collection('Paticipate').where('', '==', this.state.userid).onSnapshot(this.getCollection);
      } else{ 
        this.props.nav.navigate('Intro');
      }
    });
  }

  componentWillUnmount(){
    // this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    let userArr = [];
    querySnapshot.forEach(element => {
      // userArr.push({

      // });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <MainHeader nav={this.props.nav} title='Notifications' />
        <Text>This is a dummy Text</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    width,
    backgroundColor: '#fff',
  },
});