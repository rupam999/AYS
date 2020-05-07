import React, { Component } from 'react';
import { 
    View, Text, SafeAreaView, Dimensions, StyleSheet 
} from 'react-native';
import Star from '../SeperateContent/Start';
import CustomIcon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('screen');
const bgColor = ['#87BF60', '#BF6860', '#6085BF', '#00BAA0'];

function getBgColor() {
  let index = Math.floor(Math.random() * 4);
  return bgColor[index];
}

function getFirstLetter(name){
    return name[0];
}

export default class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{ marginTop: '5%' }}>
            <View style={styles.GearBtn}>
                <CustomIcon 
                    name={'settings'} 
                    size={28} 
                    color={'#000'} 
                    onPress={ () => this.props.nav.navigate('EditProfile') }
                />
            </View>
            <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={[styles.ProfilePicArea, {backgroundColor: getBgColor()}]}>
                    <Text style={styles.ProfileName}>{ getFirstLetter(this.props.name ? this.props.name : 'ABC') }</Text>
                </View>
            </View>
            <View style={{marginBottom: '1.5%'}}>
                <Star />
            </View>
            <View style={{marginTop: '5%'}}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{paddingRight: '10%'}}>
                        <Text style={{textAlign: 'center'}}>200</Text>
                        <Text>Total Leads</Text>
                    </View>
                    <View style={{paddingRight: '13%'}}>
                        <Text style={{textAlign: 'center'}}>10</Text>
                        <Text>Person</Text>
                    </View>
                    <View>
                        <Text style={{textAlign: 'center'}}>3</Text>
                        <Text>5 Star</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    ProfileName: {
        fontSize: 50,
        color: '#fff',
    },
    GearBtn: {
        alignSelf: 'flex-end',
        padding: 20,
    },
    ProfilePicArea: {
        marginTop: '2.5%',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});