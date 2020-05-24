import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Button, Item, Input } from 'native-base';
import ScreenHeader from './headers/PostScreenHeader';
import DetailsPageCard from './SeperateContent/DetailsPageCard';
import CustomIcon from 'react-native-vector-icons/Feather';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('screen');
let checkData = 1;

function checkUserAleadyParticipatedOrNot(userDetails, postid, userId){
  userDetails.forEach((id) => {
      if((id.postid === postid) && (id.uid === userId)){
        // console.log('TRUE')
        checkData = 0;
        return checkData;
      }
  });
  return checkData;
}

export default class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uid: null,
        comment: null,
        userArr: [],
        returnResult: null,
    };
  }

  componentDidMount(){
    auth()
      .onAuthStateChanged( user => {
        if(user) {
          this.setState({
            uid: user['uid'],
          });
          this.unsubscribe = firestore().collection('Paticipate').onSnapshot(this.getCollection);
        } else {
          this.setState({
            uid: 0,
          });
        }
      });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    // console.log(querySnapshot.size)
      querySnapshot.forEach((res) => {
      const { userid, postid } = res.data();
    // console.log('data 1')
      userArr.push({
        commentid: res.id,
        uid: userid,
        postid: postid
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  processPaticipate(comment, postid, nav){
    firestore()
      .collection('Paticipate')
      .add({
        userid: comment.uid,
        postid: postid,
        comment: comment.comment,
      })
      .then(() => {
        nav.navigate('Home', { CHECKING_DATA: 2 })
      })
      .catch((error) => alert(error));
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      );
    }

    return (
      <Container style={styles.MainContainer}>
          <ScreenHeader iconName={'x'} headerName='Details' nav={this.props.nav} />
          <View style={styles.MainBodyArea}>
            <DetailsPageCard nav={this.props.nav} data={this.props.myData} />
            {/* {console.log(this.state.userArr)} */}
          </View>
          <View style={styles.NumberOfUserInfo}>
            <View style={styles.NumberInformation}>
                <Text>
                    <CustomIcon name='user' size={16} color='#000' />
                    &nbsp; 200 People interested in this event
                </Text>
            </View>
          </View>
          {console.log(checkUserAleadyParticipatedOrNot(this.state.userArr, this.props.myData.postid, this.state.uid)) }
          <View style={styles.MainBodyArea}>
            <Item style={ styles.FormContent }>
                <Input 
                    placeholder='Comments (Optionals)'
                    keyboardType= 'default'
                    onChangeText={ (msg) => this.setState({ comment: msg }) }
                />
            </Item>
            <Text></Text>
            <Button 
                style={styles.btn} 
                onPress={() => this.processPaticipate(this.state, this.props.myData.postid, this.props.nav)}
                >
                <Text style={styles.btnText}>Participate</Text>
            </Button>
          </View>
          {/* :  */}
            <View style={styles.NumberOfUserInfo}>
                <View style={styles.NumberInformation}>
                    {/* <Text>
                        <GoogleIcon name='check-bold' size={17} color='#000' />
                        &nbsp; You have already applied for this
                    </Text> */}
                </View>
            </View>
          {/* } */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    preloader: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    MainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      width,
    },
    MainBodyArea: {
        marginHorizontal: '5%',
        marginVertical: '4%',
    },
    NumberOfUserInfo: {
        // borderBottomColor: '#28D8A1',
        // borderBottomWidth: 1,
        // borderTopColor: '#28D8A1',
        // borderTopWidth: 1,
    },
    NumberInformation: {
        paddingHorizontal: '5%',
        paddingVertical: '2.5%'
    },
    btn: { 
        backgroundColor: '#28D8A1', 
        width: width*.92, 
        borderRadius: 10,
        height: '23.5%',
        marginTop: '3.5%',
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
        paddingLeft: '35%',
      },
});