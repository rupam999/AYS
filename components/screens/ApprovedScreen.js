import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Image 
} from 'react-native';
import { 
  Container, Card, Icon, Content, Right, CardItem, Body, Left, Button 
} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from './headers/PostScreenHeader';

const {width, height} = Dimensions.get('screen');

export default class ApprovedScreen extends Component {
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
          this.unsubscribe = firestore().collection('Paticipate').where('postid', '==', this.props.myData.postid.toString()).onSnapshot(this.getCollection);
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
        const { userid, postid, comment } = res.data();
        // console.log('nkkjk',res.data());
        userArr.push({
            postid: res.id,
            uid: userid,
            comment
        });
      } else{
        userArr.push({
            postid: 0,
            uid: null,
            comment: null
        });
      }
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  assignTaskToPeople(userId, postId){
    console.log(userId, postId)
    firestore()
      .collection('Users')
      .doc(postId)
      .update({
        assignTo: userId,
      })
      .then(() => {
        // nav.navigate('Home', { CHECKING_DATA: 2 })
        alert('Successfully assign the task...')
      })
      .catch((error) => alert(error));
  }

  render() {
    const { userid, need, why, city, country, zipCode, postid, assignTo } = this.props.myData;
    return (
      <Container>
        <ScreenHeader nav={this.props.nav} iconName='x' headerName='Post Details' />
        {/* {console.log(this.state.userArr.length)} */}
        {/* <Text>Task : {need}</Text> */}
        {assignTo === null ? 
        <>
        {this.state.userArr.length !== 0 ?
        <FlatList 
          data={this.state.userArr}
          style={{ marginTop: '2%' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: interstedPeople }) => {
            return(
              <View style={styles.FlatListStyle}>
                <View>
                  <Card style={styles.MainCard}>
                    <CardItem>
                      <Icon active name='person' color='#28D8A1' />
                      <Body>
                        <Text numberOfLines={1} style={{ fontWeight: '700' }}>Anonymous</Text>
                        {interstedPeople.comment ? <Text numberOfLines={2}>{interstedPeople.comment}</Text> : <Text numberOfLines={2}>The Person didn't post any Comment</Text>}
                      </Body>
                      <Right>
                      {console.log(interstedPeople)}
                        <Button 
                            small 
                            iconRight 
                            style={styles.smallBtn}
                            onPress={ () => this.assignTaskToPeople(interstedPeople.uid, postid) }
                            >
                            <Text style={{ color: '#fff' }}>Assign&nbsp;</Text>
                            <GoogleIcon name='account-question' size={16} color='#fff' />
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                </View>
              </View>
              // console.log(myPostedData)
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        :
          <View style={styles.noInterestedPeople}>
            <GoogleIcon name='account-multiple-outline' size={30} color='#28D8A1' />
            <Text>Sorry! No request found...</Text>
          </View>
        }
        </>
        :
          <View style={styles.AlreadyAssigned}>
            <Image 
              source={{ uri: 'https://clip.cookdiary.net/sites/default/files/wallpaper/green-tick-clipart/281670/green-tick-clipart-big-green-281670-2390745.png' }} 
              style={{width: 70, height: 70}}
            />
            <Text style={{ marginTop: '2%' }}>You have already assigned this task</Text>
          </View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    AlreadyAssigned: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
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
    smallBtn: {
        backgroundColor: '#28D8A1',
        paddingHorizontal: 10,
        shadowColor: "#28D8A1",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.44,
        shadowRadius: 5,
        elevation: 5,
    },
    noInterestedPeople: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});