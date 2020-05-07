import * as React from 'react';
import { 
  Button, View, StyleSheet, SafeAreaView
} from 'react-native';
import {
  Container, Text
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from 'react-native-vector-icons/Feather';
// Imported Screen
import MainIntroScreen from './components/MainIntroScreen';
import LoginScreenContent from './components/LoginScreenContent';
import CreateAccount from './components/CreateAccount';
import PostDetailsPage from './components/screens/PostDetailsPage';
// Logged In user Screen
import UserDataChecking from './components/screens/UserDataChecking';
import HomePageUser from './components/screens/HomePageUser';
import UserAccountPage from './components/screens/UserAccountPage';
import UserPostScreen from './components/screens/UserPostScreen';
import MyPostScreen from './components/screens/MyPostScreen';
import Notifications from './components/screens/Notification';
import ApprovedScreen from './components/screens/ApprovedScreen';
import TaskPage from './components/screens/MyTask';
// Logged In User Screen Hader
import PostScreenHeader from './components/screens/headers/PostScreenHeader';

function IntroScreen({ navigation }) {
  return (
    <Container>
      <MainIntroScreen nav={ navigation } />
    </Container>
  );
}

function LoginScreen({ navigation }) {
  return (
    <Container>
      <LoginScreenContent nav={ navigation } />
    </Container>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <Container>
      <CreateAccount nav={navigation} />
    </Container>
  );
}

function UserDataCheckingScreen({ navigation }){
  return(
    <Container>
      <UserDataChecking nav={navigation} />
    </Container>
  );
}

// After Login 

function MyTaskScreen({navigation}){
  return(
    <Container>
      <TaskPage nav={navigation} />
    </Container>
  );
}

function ApprovedPageScreen({ route, navigation }){
  return(
    <Container>
      <ApprovedScreen nav={navigation} myData={route.params.myData} />
    </Container>
  )
}

function PostDetailsPageScreen({ route, navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PostDetailsPage nav={navigation} myData={route.params.myData} />
    </View>
  );
}

function HomeScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {route.params ?
      <HomePageUser nav={navigation} ToastValue={route.params.CHECKING_DATA} />
      :
      <HomePageUser nav={navigation} />
      }
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <Container>
      <Notifications nav={navigation} />
    </Container>
  );
}

function UserAccountScreen({ navigation }){
  return(
    <Container>
      <UserAccountPage nav={navigation} />
    </Container>
  );
}

function UserChatScreen({ navigation }){
  return(
    <Container>
      <MyPostScreen nav={navigation} />
    </Container>
  );
}

function PostScreen({ navigation, route}){
  if(route.state && route.state.index > 0){
    navigation.setOptions({ tabBarVisible: true })
  } else{
    navigation.setOptions({ tabBarVisible: false })
  }
  return(
    <Container>
      <PostScreenHeader iconName={'x'} headerName='Add a Post' nav={navigation} />
      <UserPostScreen nav={navigation} />
    </Container>
  );
}

const BottomTabs = createBottomTabNavigator();

function MainPageScreen({ navigation }) {
  return (
    <BottomTabs.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home'; //2nd outline
                iconSize = 23
            } else if (route.name === 'UserChat') {
              iconName = focused ? 'activity' : 'activity';
              iconSize = 23
            } else if (route.name === 'Post') {
              iconName = focused ? 'plus-circle' : 'plus-circle';
              iconSize = 44
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell';
              iconSize = 23
            } else if (route.name === 'UserAccount') {
              iconName = focused ? 'user' : 'user';
              iconSize = 23
            }
            return <CustomIcon name={iconName} size={iconSize} color={color} />;
          },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#28D8A1',
        inactiveTintColor: '#000',
        animationEnabled: true,
      }}
      >
      <BottomTabs.Screen 
        name="Home"
        component={HomeScreen} 
      />
      <BottomTabs.Screen 
        name="UserChat"
        component={UserChatScreen} 
      />
      <BottomTabs.Screen 
        name="Post"
        component={PostScreen}
      />
      <BottomTabs.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
      />
      <BottomTabs.Screen 
        name="UserAccount"
        component={UserAccountScreen} 
      />
    </BottomTabs.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserDataChecking" component={UserDataCheckingScreen} />
      <Stack.Screen name="MainPage" component={MainPageScreen} />
      <Stack.Screen name="PostDetailsPage" component={PostDetailsPageScreen} />
      <Stack.Screen name="ApprovedPage" component={ApprovedPageScreen} />
      <Stack.Screen name="MyTask" component={MyTaskScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});