import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, StatusBar, Dimensions, FlatList, ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { 
  Container, Toast, Root
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
// Seperate Screens
import UserHomeScreenHeader from './headers/UserHomeScreenHeader';
import MainCard from './SeperateContent/MainPageCard';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class HomePageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      uid: undefined,
      email: undefined,
      displayName: undefined,
      phone: undefined,
      userArr: [],
      showToast: false,
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
        } else{
          this.props.nav.navigate('Intro')
        }
      });
    this.unsubscribe = firestore().collection('Users').onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { userid, need, why, city, country, zipCode, totalParticipent, assignTo } = res.data();
      if(assignTo === null){
        userArr.push({
          postid: res.id,
          uid: userid,
          need,
          why,
          zipCode,
          country,
          city,
          totalParticipent,
          assignTo
        });
      }
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  logoutFunction(nav){
    auth()
      .signOut()
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <Root>
      <Container style={ styles.MainBody }>
        <>
          <StatusBar backgroundColor="#fff" barStyle='dark-content' />
            <UserHomeScreenHeader nav={this.props.nav} title={'Discover'} />
            <View style={ styles.MainContent }> 
              {/* <Text></Text>
              <Text> {this.state.uid}</Text>
              <Text> {this.state.displayName}</Text>
              <Text> {this.state.email}</Text>
              <Text> {this.state.phone}</Text>
              <Text></Text> */}
              <Text style={styles.TextStyle}>
                {this.props.ToastValue === 1 ? 
                  Toast.show({
                    type: 'success',
                    text: 'Successfully added the Post!',
                    buttonText: ' ',
                  })
                : null}
                {this.props.ToastValue === 2 ? 
                  Toast.show({
                    type: 'success',
                    text: 'You have applied successfully!',
                    buttonText: ' ',
                  })
                : null}
              </Text>
              {/* <Button onPress={ () => this.logoutFunction(this.props.nav) }>
                  <Text>Logout</Text>
              </Button> */}
              <FlatList 
                data={this.state.userArr}
                showsVerticalScrollIndicator={false}
                renderItem={ ({item: myData}) => {
                  return(
                    <MainCard data={myData} nav={this.props.nav} />
                  );
                } }
                keyExtractor={ (item, index) => index.toString() }
              />
            </View>
        </>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  MainBody: {
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  MainContent: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});