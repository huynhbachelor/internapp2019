import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import search from '../../../api/search';

class SearchScreen extends Component {

    state = {
        Search: '',
    }

    searchUser = () => {
        search(this.state.Search)
        .then(res => {
            if (res.user !== 'KHONG_TIM_THAY') {
                this.props.navigation.navigate('ResultOverlay', {
                    user: res.user
                });
            } else {
                this.props.navigation.navigate('ErrorOverlay', {
                    ERROR: 1
                });
            }
        })
        .catch(e => {
            alert('Lỗi chưa xác định!');
        });
    }

    updateSearch = Search => {
        this.setState({ Search });
    };

    gotoResult = () => {
        if (this.state.Search === '') {
            this.props.navigation.navigate('ErrorOverlay', {
                ERROR: 0
            });
        } else {
            this.searchUser();
        }
    }

    render() {
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
                    <SearchBar
                        placeholder="Nhập tên đăng nhập"
                        containerStyle={{
                            height: 40,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onChangeText={this.updateSearch}
                        value={this.state.Search}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1E425E',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={this.gotoResult}
                >
                    <Text
                        style={{ color: '#fff' }}
                    >Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchScreen;
