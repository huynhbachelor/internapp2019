import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ToastAndroid,
    PermissionsAndroid,
    Platform,
    Alert,
    Dimensions
} from 'react-native';
import MapView, { Marker, Polyline, ProviderPropType } from 'react-native-maps';
import { Icon, Avatar, Overlay } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import firebaseApp, { writeData } from '../../firebase';
import OverlayScreen from './myoverlay/OverlayScreen';
import getListDirection from '../../api/getListDirection';
import changeStatus from '../../api/changeStatus';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class HomeScreen extends Component {

    state = {
        isVisible: false,
        myCurpos: {
            latitude: 10.8393125,
            longitude: 106.7736884,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        frCurpos: {
            latitude: 10.8393125,
            longitude: 106.7736884,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        coordinates: [],
    }

    componentDidMount() {
        this.getLocation();
        this.getLocationUpdates();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.friend !== this.props.friend) {
            if (prevProps.friend.Userfriend !== '') {
                firebaseApp.database().ref(prevProps.friend.Userfriend).off();
            }
            this.getLocationFriend(this.props.friend.Userfriend);
        }
        if (prevProps.setting !== this.props.setting) {
            if (prevProps.setting.isLocation !== this.props.setting.isLocation) {
                if (this.props.setting.isLocation) {
                    changeStatus(this.props.user.token,
                        this.props.setting.isUpdateLocation);
                } else {
                    changeStatus(this.props.user.token, 'NONE');
                }
            } else {
               changeStatus(this.props.user.token,
                    this.props.setting.isUpdateLocation);
            }
        }
    }

    getLocationFriend = async (user) => {
        firebaseApp.database().ref(user).on('value', (snapshot) => {
            if (snapshot.child('where').val() !== null) {
                if (this.props.friend.status) {
                    this.setState({
                        frCurpos: {
                            ...this.state.frCurpos,
                            latitude: snapshot.child('where').val().latitude,
                            longitude: snapshot.child('where').val().longitude
                        },
                    });
                    this.getDirection();
                }
            }
        });
    }

    getDirection = () => {
        getListDirection(this.state.myCurpos, this.state.frCurpos)
            .then(res => {
                if (res !== null) {
                    const items = [];
                    items.push({
                        latitude: this.state.myCurpos.latitude,
                        longitude: this.state.myCurpos.longitude
                    });
                    res.map((e) => {
                        items.push({
                            latitude: e[1], longitude: e[0]
                        });
                    });
                    items.push({
                        latitude: this.state.frCurpos.latitude,
                        longitude: this.state.frCurpos.longitude
                    });
                    this.setState({
                        coordinates: items
                    });
                }
            });
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        Geolocation.getCurrentPosition(
            (position) => {
                this.geoSuccess(position);
            },
            (err) => {
                this.geoFailure(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
            }
        );
    }

    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.watchId = Geolocation.watchPosition(
            (position) => {
                this.geoSuccess(position);

            },
            (err) => {
                this.geoFailure(err);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 5,
                interval: 5000,
                fastestInterval: 2000
            }
        );
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
        }
    }

    watchId = null;

    geoSuccess = (position) => {
        this.setState({
            myCurpos: {
                ...this.state.myCurpos,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        });
       
        this.getDirection();
    
        if (this.props.setting.isUpdateLocation) {
            writeData(this.props.user.Username,
                position.coords.latitude,
                position.coords.longitude);
        }
    }

    geoFailure = (err) => {
        Alert.alert(
            'Thông báo',
            'Lỗi! ' + err,
            [
                {
                    text: 'OK',
                }
            ],
            { cancelable: false }
        );
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    personAdd = () => {
        this.setState({
            isVisible: true,
        });
    }

    markerFriend = () => {
        if (this.props.friend.status !== 'NONE') {
            return (
                <Marker
                    coordinate={this.state.frCurpos}
                    anchor={{ x: 0.5, y: 0.5 }}
                    title={this.props.friend.subtitle}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: this.props.friend.Avatar_url,
                        }}
                    />
                </Marker>
            );
        } 
        return null;
    };

    directionShow = () => {
        if (this.props.friend.status !== 'NONE') {
            return (
                <Polyline
                    coordinates={this.state.coordinates}
                    strokeColor="#238C23"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={6}
                />
            );
        }
    };

    render() {
        const {
            container,
            header,
            textTitle,
            mapContainer,
            map,
            overlayStyle,
        } = styles;

        return (
            <View style={container}>
                <View style={header}>
                    <Icon
                        name='menu'
                        containerStyle={{ marginLeft: 5 }}
                        color='#fff'
                        onPress={this.openDrawer}
                    />
                    <Text
                        style={textTitle}
                    >Trang chủ</Text>
                    <Icon
                        name='person-add'
                        containerStyle={{ marginRight: 5 }}
                        color='#fff'
                        onPress={this.personAdd}
                    />
                </View>
                <View style={mapContainer}>
                    <MapView
                        provider={this.props.provider}
                        style={map}
                        initialRegion={this.state.myCurpos}
                        region={this.state.myCurpos}
                        loadingEnabled
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                    >
                        <Marker
                            coordinate={this.state.myCurpos}
                            anchor={{ x: 0.5, y: 0.5 }}
                            title='Tôi'
                        >
                            <Avatar
                                rounded
                                source={{
                                    uri: this.props.user.Avatar_url,
                                }}
                            />
                        </Marker>
                        {this.markerFriend()}
                        {this.directionShow()}
                    </MapView>

                    <Overlay
                        isVisible={this.state.isVisible}
                        windowBackgroundColor="rgba(255, 255, 255, .5)"
                        overlayBackgroundColor="#122839"
                        width="80%"
                        height="auto"
                        onBackdropPress={() => this.setState({ isVisible: false })}
                    >
                        <View style={overlayStyle}>
                            <View
                                style={{
                                    height: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#111F2A',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        name='person-add'
                                        size={28}
                                        color='#fff'
                                    />
                                    <Text style={{ color: '#fff' }}>Thêm bạn</Text>
                                </View>
                                <Icon
                                    name='clear'
                                    size={28}
                                    color='#fff'
                                    onPress={() => this.setState({ isVisible: false })}
                                />
                            </View>
                            <View style={{ height: 190 }}>
                                <OverlayScreen />
                            </View>
                        </View>
                    </Overlay>
                </View>
            </View>
        );
    }
}

HomeScreen.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#156AAB',
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlayStyle: {
        height: 'auto'
    }
});


export default HomeScreen;
