import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeScreen from '../components/mains/HomeScreen';

class HomeContainer extends Component {

    render() {
        return (
            <HomeScreen
                {...this.props}
                setting={this.props.setting}
                user={this.props.user}
                friend={this.props.friend}
            />
        );
    }
}

export default connect(
    state => {
        return {
            user: state.ProfileReducer.profile,
            setting: state.SettingReducer.mySetting,
            friend: state.ProfileReducer.friend,
        };
    }
)(HomeContainer);
