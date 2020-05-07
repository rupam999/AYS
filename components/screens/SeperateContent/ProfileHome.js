import React, { Component } from 'react';
import { 
    View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ProfilePic from './ProfilePic';
import CustomCard from './CustomCard';
import EmptyCard from './EmptyCard';

const {width, height} = Dimensions.get('screen');
const colors = ['#CAD3C8', '#D1C8C4', '#f7f1e3', '#aaa69d', '#dcdde1'];

function MakeRandomColor(){
    let index = Math.floor(Math.random() * 5);
    return colors[index];
}

export default class ProfileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        uid: undefined,
        email: undefined,
        displayName: undefined,
        phone: undefined,
        // userArr: [],
        // showToast: false,
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
          // this.unsubscribe = firestore().collection('Users').where('userid', '==', this.state.uid.toString()).onSnapshot(this.getCollection);
        } else{
          this.props.nav.navigate('Intro')
        }
      });
  }

  // componentWillUnmount(){
  //   this.unsubscribe();
  // }

  // getCollection = (querySnapshot) => {
  //   const userArr = [];
  //   querySnapshot.forEach((res) => {
  //     if(res.data().userid){
  //       const { userid, need, why, city, country, zipCode } = res.data();
  //       // console.log('nkkjk',res.data());
  //       userArr.push({
  //           postid: res.id,
  //           uid: userid,
  //           need,
  //           why,
  //           zipCode,
  //           country,
  //           city
  //       });
  //     } else{
  //       userArr.push({
  //           postid: 0,
  //           uid: null,
  //           need: null,
  //           why: null,
  //           zipCode: null,
  //           country: null,
  //           city: null,
  //       });
  //     }
  //   });
  //   this.setState({
  //     userArr,
  //     isLoading: false,
  //  });
  // }

  // logoutFunction(nav){
  //   auth()
  //     .signOut()
  // }

  render() {
    return (
        <SafeAreaView  style={styles.MainContainer}>
            <ProfilePic name={this.state.displayName} nav={this.props.nav} />
            <View style={styles.RecentActivity}>
                {/* <Text style={styles.RecentActivityText}>Recent Activities</Text>
                <FlatList 
                    data={this.state.userArr}
                    renderItem={ ({item: UserPost}) => {
                        return(
                            <>
                                {UserPost.postid !== 0 ? <CustomCard data={UserPost} color={MakeRandomColor()} /> : <EmptyCard /> }
                            </>
                        );
                    }}
                    keyExtractor={ (item, index) => index.toString() }
                /> */}
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    RecentActivity: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '8%',
    },
    RecentActivityText: {
        marginBottom: '0%'
    },
});