import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Share 
} from 'react-native';
import { 
    Card, CardItem, Container, Left, Right, Body 
} from 'native-base';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class MainPageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async sharePost(userPostedData){
    Share.share({
      message: `I need ${userPostedData.need} in ${userPostedData.city} : ${userPostedData.zipCode} \n\n
      If you thin you can help me then contact me through AYS Mobile App
      `,
      title: userPostedData.need
    },  {
      // Android only:
      dialogTitle: userPostedData.need,
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToWeibo',
        'com.apple.UIKit.activity.Print',
        'com.apple.UIKit.activity.CopyToPasteboard',
        'com.apple.UIKit.activity.AssignToContact',
        'com.apple.UIKit.activity.SaveToCameraRoll',
        'com.apple.UIKit.activity.AddToReadingList',
        'com.apple.UIKit.activity.PostToFlickr',
        'com.apple.UIKit.activity.PostToVimeo',
        'com.apple.UIKit.activity.PostToTencentWeibo',
        'com.apple.UIKit.activity.AirDrop',
        'com.apple.UIKit.activity.OpenInIBooks',
        'com.apple.UIKit.activity.MarkupAsPDF',
        'com.apple.reminders.RemindersEditorExtension',
        'com.apple.mobilenotes.SharingExtension',
        'com.apple.mobileslideshow.StreamShareService',
        'com.linkedin.LinkedIn.ShareExtension',
        'pinterest.ShareExtension',
        'com.google.GooglePlus.ShareExtension',
        'com.tumblr.tumblr.Share-With-Tumblr',
        'net.whatsapp.WhatsApp.ShareExtension'
      ]
    }) .then(({action, activityType}) => {
        if(action === Share.sharedAction)
          console.log('Share was successful');
        else
          console.log('Share was dismissed');
    });
  }

  openNewScreen(nav, myData){
    nav.navigate('PostDetailsPage', {myData: myData})
  }

  render() {
    const { userid, need, why, city, country, zipCode } = this.props.data;
    return (
        <Card style={{ shadowOffset: 0, elevation: 0, shadowOpacity: 0, borderWidth: 0, borderColor: '#fff'}}>
            <TouchableWithoutFeedback 
                onLongPress={ () => alert(myData.why) }
                onPress={ () => this.openNewScreen(this.props.nav, this.props.data) }
                >
                <CardItem cardBody>
                    <Container style={ styles.MainCardContentStyle }>
                        <Text style={ styles.MainHeadingStyle }>{need}</Text>
                        <View style={{  }}> 
                            <Text style={ styles.LocationTextStyle }>{city} : {zipCode}</Text>
                        </View>
                    </Container>
                </CardItem>
            </TouchableWithoutFeedback>
            <CardItem>
                <Left style={{ width: '200%' }}>
                    <><GoogleIcon name={'heart-outline'} size={25} color={'#707070'} /><Text style={ styles.userLikeText }>200</Text></>
                </Left>
                <Body></Body>
                <Right>
                    <GoogleIcon name={'share-outline'} size={28} color={'#707070'} onPress={ () => this.sharePost(this.props.data) } />
                </Right>
            </CardItem>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    MainCardContentStyle: {
        height: 200, 
        width: null, 
        flex: 1, 
        borderRadius: 20,
        backgroundColor: '#D1C8C4',
        justifyContent: 'center',
        paddingLeft: '2%',
        paddingRight: '2%'
    },
      MainHeadingStyle: {
        textAlign: 'center',
        fontSize: 20,
    },
    LocationTextStyle: {
        fontSize: 11,
        textAlign: 'left',
        position: 'relative',
        top: '37%',
        left: '4%'
    },
    userLikeText: {
        fontSize: 14,
        paddingLeft: '1%',
        position: 'relative',
        top: '-0.8%'
    },
});