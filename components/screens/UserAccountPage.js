import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileHome from './SeperateContent/ProfileHome';
import EditProfile from './SeperateContent/EditProfile';
import { Container } from 'native-base';

const SellerProfileStack = createStackNavigator();

function ProfileHomeScreen({navigation}){
  return(
    <Container>
      <ProfileHome nav={navigation} />
    </Container>
  );
}

function EditProfileScreen({navigation}){
  return(
    <Container>
      <EditProfile nav={navigation} />
    </Container>
  );
}

class UserAccountPage extends React.Component{
  render(){
    return(
      <SellerProfileStack.Navigator 
        initialRouteName="ProfileHome" 
        screenOptions={{ headerShown: false }}
        >
        <SellerProfileStack.Screen name="ProfileHome" component={ProfileHomeScreen} />
        <SellerProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      </SellerProfileStack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ProfilePicArea: {
    width: '10%',
    height: '10%',
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
  },
});

export default UserAccountPage;