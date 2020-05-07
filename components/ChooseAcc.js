import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, StatusBar, Dimensions
} from 'react-native';
import {
    Container, Form, Item, Icon, Input, Button
} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class RegisterScreenContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Container style={ styles.FullBody }>
          <Container style={ styles.MainContainer }>
            <View style={ styles.TextArea }>
              <Text style={ styles.BigText }>Choose Your Account</Text>
              <Text style={{ textAlign: 'center' }}>Deepends on your needs choose your account</Text>
              <Text></Text>
            </View>
            <View style={ styles.MainCategory }>
              <Grid>
                <Row>
                  <Col>
                    <View style={ styles.LeftPart }>
                      <TouchableWithoutFeedback 
                        style={ styles.ContentArea }
                        onPress={ () => this.props.nav.navigate('VolunteerAccount') }
                        >
                        <Text>I Want to Volunteer</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </Col>
                  <Col>
                    <View style={ styles.RightPart }>
                      <TouchableWithoutFeedback 
                        style={ styles.ContentArea }
                        onPress={ () => this.props.nav.navigate('NeedAccount') }
                        >
                        <Text>I Want to Post</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </Col>
                </Row>
              </Grid>
            </View>
          </Container>
          {/* <Container style={{ marginTop: '37%' }}>
            <Text><Text style={{ fontWeight: '700' }}>NOTE </Text>: If you want to volunteer for some work then choose <Text style={{ fontWeight: '700' }}>1st option</Text>. And if you want to post some work then choose the <Text style={{ fontWeight: '700' }}>2nd option</Text>.</Text>
          </Container> */}
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
    marginTop: '25%',
  },
  BigText: {
    fontSize: 30,
    color: '#353E5A',
    textAlign: 'center',
  },
  MainCategory: {
    marginTop: '10%',
    justifyContent: 'center',
  },
  LeftPart: {
    width: '98%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#28D8A1',
  },
  RightPart: {
    width: '98%',
    height: 200,
    borderRadius: 10,
    marginLeft: '3%',
    backgroundColor: '#959DFF'
  },
  ContentArea: {
    width: '98%',
    height: 200,
  },
});