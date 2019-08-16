import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import CustomDrawer from '../components/mains/CustomDrawer';
import friendChange from '../actions/FriendAction';

class DrawerContainer extends Component {

    render() {
        return (
            <CustomDrawer 
                {...this.props}
                profile={this.props.profile}
                friend={this.props.friend}
            />
        );
    }
}

export default connect(
    state => {
        return {
            profile: state.ProfileReducer.profile,
            friend: state.ProfileReducer.friend,
        };
    },
    dispatch => {
        return {
            onchangeFriend: (user, st, sub, ava) => dispatch(friendChange(user, st, sub, ava)),
        };
    }
)(withNavigation(DrawerContainer));
