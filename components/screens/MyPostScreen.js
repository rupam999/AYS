import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Container, Card, Icon, Content, Right, CardItem, Body, Left } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MainHeader from './headers/UserHomeScreenHeader';
import CustomIcon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('screen');

export default class MyPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      uid: null,
      email: null,
      displayName: null,
      phone: null,
      userArr: [],
    };
  }

  componentDidMount(){
    auth()
      .onAuthStateChanged( user => {
        if(user){
          // data = auth().currentUser
          this.setState({
            uid: user['uid'],
            displayName: user['displayName'],
            email: user['email'],
            phone: user['phoneNumber']
          });
          this.unsubscribe = firestore().collection('Users').where('userid', '==', this.state.uid.toString()).onSnapshot(this.getCollection);
        } else{
          this.props.nav.navigate('Intro')
        }
      });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      if(res.data().userid){
        const { userid, need, why, city, country, zipCode, assignTo } = res.data();
        // console.log('nkkjk',res.data());
        userArr.push({
            postid: res.id,
            uid: userid,
            need,
            why,
            zipCode,
            country,
            city,
            assignTo
        });
      } else{
        userArr.push({
            postid: 0,
            uid: null,
            need: null,
            why: null,
            zipCode: null,
            country: null,
            city: null,
            assignTo: null,
        });
      }
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  render() {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <MainHeader nav={this.props.nav} title='My Posts' />
        {/* {console.log(this.state.userArr)} */}
        <FlatList 
          data={this.state.userArr}
          style={{ marginTop: '2%' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: myPostedData }) => {
            return(
              <View style={styles.FlatListStyle}>
                <TouchableWithoutFeedback
                  onPress={ () => this.props.nav.navigate('ApprovedPage', {myData: myPostedData}) }
                  >
                  <Card  style={styles.MainCard}>
                    <CardItem>
                      <Body>
                        <Text numberOfLines={2}>
                          {myPostedData.need}&nbsp;
                          {myPostedData.assignTo !== null ? <CustomIcon name='check' size={16} color='#28D8A1' /> : null}
                        </Text>
                      </Body>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableWithoutFeedback>
              </View>
              // console.log(myPostedData)
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    width,
    backgroundColor: '#fff',
  },
  FlatListStyle: {
    paddingHorizontal: '4%'
  },
  MainCard: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.4,
    marginBottom: '1.5%'
  },
});