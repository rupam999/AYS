import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Card } from 'native-base';
import CustomIcon from 'react-native-vector-icons/Feather';
// import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');

export default class CustomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { userid, need, why, city, country, zipCode } = this.props.data;

    return (
        <Card style={[styles.MainCard, {backgroundColor: this.props.color}]}>
            <View style={styles.CardContentStyle}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomIcon name='user' size={40} color='#fff' />
                <Text style={{color: '#000', textAlign: 'center'}}>Interest: 220</Text>
            </View>
            <View style={styles.textContainer}>
                <Text 
                    numberOfLines={1} 
                    style={{color: '#000'}} >
                    {need}
                </Text>
                <Text
                    numberOfLines={2}
                    style={{color: '#000'}}>
                    {why}
                </Text>
            </View>
            </View>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    MainCard: {
        marginTop: '4%',
        paddingVertical: '3.5%',
        paddingHorizontal: 0,
    },
    CardContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        paddingHorizontal: 10,
        width: width * 0.5,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    userCount: {
        color: '#fff',
    },
});