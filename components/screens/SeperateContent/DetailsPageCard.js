import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Share 
} from 'react-native';
import { 
    Card, CardItem, Container, Left, Right, Body 
} from 'native-base';
import GoogleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class DetailsPageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { userid, need, why, city, country, zipCode } = this.props.data;
    return (
        <View>
            <Card style={{ shadowOffset: 0, elevation: 0, shadowOpacity: 0, borderWidth: 0, borderColor: '#fff'}}>
                <CardItem cardBody>
                    <Container style={ styles.MainCardContentStyle }>
                        <Text style={ styles.MainHeadingStyle }>{need}</Text>
                    </Container>
                </CardItem>
            </Card>
            <View style={{ paddingHorizontal: '3%', marginVertical: '2%' }}>
                <Text style={styles.ReasonText}><Text style={{ fontWeight: '700' }}>I Need Because : </Text>{why}</Text>
                <Text>{city} : {zipCode} : {country}</Text>
            </View>
        </View>
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
    ReasonText: {
        fontSize: 15,
    },
});