import React, { Component } from 'react';

import { connect } from 'react-redux';
import { profileChange, imgChange } from '../actions/ProfileAction';
import ProfileScreen from '../components/mains/ProfileScreen';

class ProfileContainer extends Component {

    render() {
        return (
            <ProfileScreen
                {...this.props}
                profile={this.props.profile}
                updateProfile={this.props.changeProfile}
                updateImg={this.props.changeImg}
            />
        );
    }
}

export default connect(
    state => {
        return {
            profile: state.ProfileReducer.profile,
        };
    },
    dispatch => {
        return {
            changeProfile: (res) => dispatch(profileChange(res)),
            changeImg: (img) => dispatch(imgChange(img)),
        };
    }

)(ProfileContainer);
