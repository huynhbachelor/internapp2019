import React, { Component } from 'react';

import { connect } from 'react-redux';
import isLoadSetting,
{ 
    isSettingChange,
} from '../actions/SettingAction';
import SettingScreen from '../components/mains/SettingScreen';

class SettingContainer extends Component {

    render() {
        return (
            <SettingScreen mySetting={this.props.mySetting} {...this.props} />
        );
    }
}

export default connect(
    state => {
        return {
            mySetting: state.SettingReducer.mySetting,
        };
    },
    dispatch => {
        return {
            updateSetting: (res) => dispatch(isLoadSetting(res)),
            settingChange: (field, value) => dispatch(isSettingChange(field, value)),
        };
    }

)(SettingContainer);
