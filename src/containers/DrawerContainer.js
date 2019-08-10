import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import CustomDrawer from '../components/mains/CustomDrawer';
import friendChange from '../actions/FriendAction';

class DrawerContainer extends Component {

    render() {
        return (
            <CustomDrawer profile={this.props.profile} {...this.props} />
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
            onchangeFriend: (user, st, sub, ava) => dispatch(friendChange(user, st, sub, ava)),
        };
    }
)(withNavigation(DrawerContainer));
