import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Dimensions
} from 'react-native';
import {
  Container, Form, Item, Input, Button, Picker, Textarea, Icon,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class UserPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      uid: null,
      zip: null,
      location: null,
      myNeed: null,
      whyNeed: null,
      showToast: false,
      mobile: null,
      error: false,
    };
  }

  componentDidMount(){
    auth()
      .onAuthStateChanged( user => {
        if(user){
          // data = auth().currentUser
          this.setState({
            uid: user['uid'],
          });
        } else{
          this.props.nav.navigate('Intro')
        }
      });
  }

  onValueChange(value) {
    this.setState({
      country: value
    });
  }

  postInformation(postDataInfo, nav){
    if(postDataInfo.country !== null && postDataInfo.location !== null && postDataInfo.zip !== null && postDataInfo.myNeed !== null && postDataInfo.whyNeed !== null && postDataInfo.mobile !== null && postDataInfo.email !== null){
    firestore()
      .collection('Users')
      .add({
        userid: this.state.uid,
        country: postDataInfo.country,
        city: postDataInfo.location,
        zipCode: postDataInfo.zip,
        need: postDataInfo.myNeed,
        why: postDataInfo.whyNeed,
        totalParticipent: 0,
        mobile: postDataInfo.mobile,
        email: postDataInfo.email,
        assignTo: null,
      })
      .then(() => {
        nav.navigate('Home', { CHECKING_DATA: 1 })
      })
      .catch((error) => alert(error));
    } else{
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <Container style={ styles.FullBody }>
        <Container style={ styles.MainContainer }>
            <View style={ styles.FormArea }>
            <>
              {this.state.error ? <Text style={styles.errorText}>Please fill all the fields</Text> : null}
                <Item style={ styles.FormContent }>
                <Picker
                    mode="dropdown"
                    iosHeader="Select your Country"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.country}
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
                    placeholder='Email id'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={ (email) => this.setState({ email: email }) }
                  />
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='City (E.g. Bangalore)'
                    keyboardType='default'
                    onChangeText={ (location) => this.setState({ location: location }) }
                  />
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Area Zip Code'
                    keyboardType='default'
                    value={this.state.myZipCode}
                    onChangeText={ (myZipCode) => this.setState({ zip: myZipCode }) }
                  />
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='Phone Number'
                    keyboardType='number'
                    value={this.state.mobile}
                    onChangeText={ (mobile) => this.setState({ mobile: mobile }) }
                  />
                </Item>
                <Item style={ styles.FormContent }>
                  {/* <Icon name="reply-all" size={50} /> */}
                  <Input 
                    placeholder='I Need (E.g. Safty kit)'
                    keyboardType='default'
                    onChangeText={ (myNeed) => this.setState({ myNeed: myNeed }) }
                  />
                </Item>
                <Textarea 
                  rowSpan={3} 
                  bordered 
                  placeholder="I need this because..." 
                  style={ styles.TextAreaStyle } 
                  onChangeText={ (whyNeed) => this.setState({ whyNeed: whyNeed }) }
                />
                {/* <Text></Text>
                <Text>@ Add Image</Text> */}
                <Button style={ styles.btn } onPress={ () => this.postInformation(this.state, this.props.nav) }>
                  <Text style={ styles.btnText }>POST</Text>
                </Button>
              </>
            </View>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center'
  },
  FullBody: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5.5%',
  },
  MainContainer: {
    alignItems: 'center',
    marginTop: '1%',
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
    height: '10%',
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
    paddingLeft: '45%',
  },
  TextAreaStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 18,
  },
});