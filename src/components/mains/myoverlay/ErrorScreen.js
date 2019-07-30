import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';


class ErrorScreen extends Component {

    render() {
        const re = this.props.navigation.getParam('ERROR', '');
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
                        'Người dùng không tồn tại!' :
                        'Khung tìm không được để trống!'
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
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text
                        style={{ color: '#fff' }}
                    >Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ErrorScreen;
