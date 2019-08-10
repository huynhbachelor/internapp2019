import React, { Component } from 'react';

import { connect } from 'react-redux';
import profileChange from '../actions/ProfileAction';
import AuthLoadingScreen from '../components/authencations/AuthLoadingScreen';
import isLoadSetting from '../actions/SettingAction';

class AuthContainer extends Component {

    render() {
        return (
            <AuthLoadingScreen
                {...this.props}
            />
        );
    }
}

export default connect(
    null,
    dispatch => {
        return {
            updateSetting: (res) => dispatch(isLoadSetting(res)),
            changeProfile: (res) => dispatch(profileChange(res)),
        };
    }

)(AuthContainer);
