import React, { Component } from 'react';
import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import { 
    Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Separator
} from 'native-base';
import CustomIcon from 'react-native-vector-icons/Feather';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserHomeScreenHeader from '../headers/PostScreenHeader';
export default class EditProfile extends Component {
  render() {
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
                        <Text>My Profile</Text>
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
                        <Text>Edit Profile</Text>
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
                            <GoogleIcon active name='fountain-pen-tip' size={20} color='#fff' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>My Post</Text>
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
                        <Text>Approved Me</Text>
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
                        <Text>Logout</Text>
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