import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class EmptyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Nothing To Show </Text>
      </View>
    );
  }
}
