import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Linking, Platform, Alert } from 'react-native';
import { Container, Card, Button } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomIcon from 'react-native-vector-icons/Feather';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from './headers/PostScreenHeader';

export default class MyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        uid: undefined,
        email: undefined,
        displayName: undefined,
        phone: undefined,
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
          this.unsubscribe = firestore().collection('Users').where('assignTo', '==', this.state.uid.toString()).onSnapshot(this.getCollection);
        //   console.log('userid',this.state.uid)
        } else{
          this.props.nav.navigate('Intro')
        }
      });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  MakeCall(phoneNumber){
    let numberString = '';
    if(phoneNumber){
        if(Platform.OS === 'ios'){
            numberString = `telprompt:${phoneNumber}`;
        } else {
            numberString = `tel:${phoneNumber}`;
        }
        Linking.openURL(numberString);
    } else {
        Alert.alert('Sorry! Phone Number is not available...')
    }
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { userid, need, why, city, country, zipCode, totalParticipent, assignTo, mobile} = res.data();
      if(assignTo !== null){
        userArr.push({
          postid: res.id,
          uid: userid,
          need,
          why,
          zipCode,
          country,
          city,
          totalParticipent,
          assignTo,
          mobile,
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
        <Container>
            <ScreenHeader nav={this.props.nav} iconName='arrow-left' headerName='Assigned To Me' />
            {this.state.userArr.length !== 0 ?
            <>
            <View style={styles.MainBody}>
            <FlatList 
                data={this.state.userArr}
                showsVerticalScrollIndicator={false}
                renderItem={ ({ item: myTaskData }) => {
                    return(
                        <Card style={styles.MainCard}>
                            <View style={styles.MainContainer}>
                                <View style={{ width: '80%' }}>
                                    <Text><Text>Task </Text> : {myTaskData.need}</Text>
                                    <Text><Text>E-mail : </Text>rupamchakraborty999@gmail.com</Text>
                                    <Text><Text>Phone Number : </Text>{myTaskData.mobile ? myTaskData.mobile : <Text>1234567890</Text>}</Text>
                                    <Text><Text>Location : </Text>{myTaskData.city} - {myTaskData.zipCode}</Text>
                                </View>
                                <View style={[styles.RightBtn, { width: '20%' }]}>
                                    <Button style={styles.btn} onPress={ () => this.MakeCall(1234567890) }>
                                        <Text style={{ textAlign: 'center', marginLeft: '25%' }}>
                                            <CustomIcon name='phone' size={25} color='#fff' />
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        </Card>
                    );
                }}
                keyExtractor={ (item, index) => index.toString() }
            />
            </View>
            </>
            :
            <View style={styles.noInterestedPeople}>
              <GoogleIcon name='account-multiple-outline' size={30} color='#28D8A1' />
              <Text>Sorry! You don't have any work...</Text>
            </View>
            }
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    MainBody: {
        paddingHorizontal: '4%',
        marginVertical: '3%'
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
        paddingBottom: '2.5%'
    },
    MainContainer: {
        flexDirection: 'row',
    },
    RightBtn: {
        justifyContent: 'center'
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#28D8A1',
    },
    noInterestedPeople: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});