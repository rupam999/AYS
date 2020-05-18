import React, { Component } from 'react';
import {View, Dimensions, StyleSheet, ScrollView, Alert} from 'react-native';
import { 
    Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Separator
} from 'native-base';
import CustomIcon from 'react-native-vector-icons/Feather';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserHomeScreenHeader from '../headers/PostScreenHeader';
export default class EditProfile extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        auth()
          .onAuthStateChanged( user => {
            if(user){
                // console.log(user)
            } else{
                this.props.nav.navigate('Intro')
            }
          });
    }

    LogoutProcess(){
        Alert.alert(
            'Confirm', 
            'Are you sure want to logout ?', 
            [
                {
                    text: 'Yes',
                    onPress: () => auth().signOut()
                },
                {
                    text: 'No',
                    // onPress: () => console.log('No')
                },
            ],
            {cancelable: false}
        )
    }

    render() {
        const Nav = this.props.nav;
        return (
            <Container>
                <UserHomeScreenHeader iconName={'arrow-left'} headerName='&nbsp;  Settings' nav={this.props.nav} />
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    >
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="person" />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={ () => Nav.navigate('ProfileHome') }>
                                <Text>My Profile</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon name='account-edit' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={ () => Nav.navigate('UserDetailsEdit') }>
                                <Text>Edit Profile</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.SeperatorText}>POST</Text>
                    </Separator>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='pencil-circle' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={ () => Nav.navigate('Post') }>
                                <Text>Add a Post</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='fountain-pen-tip' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={ () => Nav.navigate('UserChat') }>
                                <Text>My Post</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='account-multiple-check' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Approved By Me</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.SeperatorText}>RESPONSES</Text>
                    </Separator>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='account-check' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={ () => Nav.navigate('MyTask') }>
                                <Text>My Task</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.SeperatorText}>HELP & SETTINGS</Text>
                    </Separator>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='shield-lock' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Terms & policies</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#28D8A1" }}>
                                <GoogleIcon active name='bug' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Report a problem</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <CustomIcon active name='log-out' size={20} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback  onPress={ this.LogoutProcess.bind(this) }>
                                <Text>Logout</Text>
                            </TouchableWithoutFeedback>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    SeperatorText: {
        fontSize: 14,
        color: '#000'
    },
});