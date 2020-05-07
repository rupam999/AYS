import React, { Component } from 'react';
import { 
    View, StyleSheet, Dimensions, StatusBar, Image, 
} from 'react-native';
import {
    Text, Container, Button
} from 'native-base';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class MainIntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <Container style={ styles.FullBody }>
                <Container style={ styles.MainContent }>
                    <Image
                        source={require('../assets/Images/Intro.png')}
                        style={ styles.IntroImage }
                    />
                    <Text></Text>
                    <Text style={ styles.MainHeading }>FACI<Text style={ styles.ColorHeading }>O</Text></Text>
                    <Text style={{ marginTop: '5%', textAlign: 'center' }}>
                        Hi User! Want to do something for the community, then join with us.
                    </Text>
                    <Button style={ styles.btn } onPress={ () => { this.props.nav.navigate('Register') } }>
                        <Text style={ styles.btnText }>Create An Account</Text>
                    </Button>
                    <Text style={ styles.accountText }>Already have an Account? <Text style={ styles.LoginText } onPress={ () => { this.props.nav.navigate('Login') } }>Login Now</Text></Text>
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
        paddingLeft: '4.5%',
        paddingRight: '4.5%',
    },
    MainContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    IntroImage: {
        width: 220,
        height: 172
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
    btn: { 
        backgroundColor: '#28D8A1', 
        width: width*.85, 
        borderRadius: 10,
        height: '8%',
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
        paddingLeft: '26%',
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