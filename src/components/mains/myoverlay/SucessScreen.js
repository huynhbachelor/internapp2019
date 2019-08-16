import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';


class SucessScreen extends Component {

    render() {
        const re = this.props.navigation.getParam('SUCESS', '');
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        height: 150,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#111F2A'
                    }}
                >
                    <Text
                        style={{
                            color: '#fff'
                        }}
                    >
                    {
                        (re === 1) ? 
                        'Thêm thành công' :
                        (re === 2) ? 
                        'Hai người đã trở thành bạn bè' :
                        'Thêm thất bại'
                    }
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1E425E',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 1
                    }}
                    onPress={() => this.props.navigation.navigate('HomeOverlay')}
                >
                    <Text
                        style={{ color: '#fff' }}
                    >
                        {
                        (re === 1) ? 
                        'Tiếp tục' : 
                        'Thử lại'
                    }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SucessScreen;
