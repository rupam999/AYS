import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import MainHeader from './headers/UserHomeScreenHeader';

const {width, height} = Dimensions.get('screen');

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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