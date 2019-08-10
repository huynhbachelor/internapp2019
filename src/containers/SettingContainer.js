import React, { Component } from 'react';

import { connect } from 'react-redux';
import
{
    isSettingChange,
} from '../actions/SettingAction';
import SettingScreen from '../components/mains/SettingScreen';

class SettingContainer extends Component {

    render() {
        return (
            <SettingScreen 
                {...this.props} 
                mySetting={this.props.mySetting} 
                token={this.props.token}
            />
        );
    }
}

export default connect(
    state => {
        return {
            mySetting: state.SettingReducer.mySetting,
            token: state.ProfileReducer.profile.token,
        };
    },
    dispatch => {
        return {
            settingChange: (field, value) => dispatch(isSettingChange(field, value))
        };
    }

)(SettingContainer);
