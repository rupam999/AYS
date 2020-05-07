import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, StatusBar, Dimensions, Image
} from 'react-native';
import {
    Header, Left, Right, Button, Body, Title, Icon
} from 'native-base';
// import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class UserHomeScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <>
            <Header style={ styles.MainHeader } transparent>
            <StatusBar backgroundColor="#fff" barStyle='dark-content' />
                <Left>
                    <Title style={ styles.TitleStyle }>{this.props.title}</Title>
                </Left>
                <Body>
                </Body>
                <Right>
                    <Button 
                        transparent
                        onPress={ () => this.props.nav.navigate('MyTask') }
                        >
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9BgdRJCYGCJnfXDvDqMUU5zYv44LtbzzfiQIY-i_4oxi6AVkaA&s' }}
                            style={{ width: 33, height: 33, borderRadius: 17.5}}
                            width={50}
                        />

                    </Button>
                </Right>
            </Header>
        </>
    );
  }
}

const styles = StyleSheet.create({
    MainHeader: {
        backgroundColor: '#fff',
        color: '#000',
        borderBottomWidth: 0,
        paddingLeft: '7%',
        paddingRight: '5%',
        marginBottom: 0,
    },
    TitleStyle: {
        color: '#000',
        textAlign: 'left',
        width: width*.50,
        fontSize: 27,
        fontWeight: '700',
        letterSpacing: 0.5,
        position: 'relative',
        top: '-3.8%'
    },
});