import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeScreen from '../components/mains/HomeScreen';

class HomeContainer extends Component {

    render() {
        return (
            <HomeScreen
                {...this.props}
                setting={this.props.setting}
                profile={this.props.profile}
            />
        );
    }
}

export default connect(
    state => {
        return {
            profile: state.ProfileReducer.profile,
        };
    }
)(HomeContainer);
