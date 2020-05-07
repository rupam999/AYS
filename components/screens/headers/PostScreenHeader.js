import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, StatusBar
} from 'react-native';
import {
    Header, Left, Body, Title, Right, Button
} from 'native-base';
import CustomIcon from 'react-native-vector-icons/Feather';

export default class PostScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {iconName, headerName, nav} = this.props;
    return (
        <>
            <Header transparent style={ styles.MainHead }>
                <Left>
                    <Button transparent onPress={ () => nav.goBack() }>
                        <CustomIcon name={iconName} color={'#000'} size={25} />
                    </Button>
                </Left>
                <Body>
                    <Button transparent style={ styles.TitleStyle }>
                        <Title style={{ color: '#000' }}>{headerName}</Title>
                    </Button>
                </Body>
                <Right></Right>
            </Header>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        </>
    );
  }
}

const styles = StyleSheet.create({
    MainHead: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    TitleStyle: {
        position: 'relative', 
        left: '70%',
    },
});