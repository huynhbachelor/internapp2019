import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import CustomDrawer from '../components/mains/CustomDrawer';

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
    }
)(withNavigation(DrawerContainer));
