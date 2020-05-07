import React from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, Image} from 'react-native';

const {height, width} = Dimensions.get('screen');
const FullStar = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const EmptyStar = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

function RatingStar() {
    <Text>hgjhgj</Text>
}

class Star extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultRating: 2,
            maxRating: 5,
        }
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <View style={styles.childView}>
                    <Image source={{ uri: FullStar }} style={{ width: 20, height: 20}} />
                    <Image source={{ uri: FullStar }} style={{ width: 20, height: 20}} />
                    <Image source={{ uri: FullStar }} style={{ width: 20, height: 20}} />
                    <Image source={{ uri: FullStar }} style={{ width: 20, height: 20}} />
                    <Image source={{ uri: EmptyStar }} style={{ width: 20, height: 20}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4%'
    },
      childView: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

export default Star;