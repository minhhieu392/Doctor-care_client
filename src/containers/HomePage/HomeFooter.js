import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Slider from 'react-slick';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2022 Acira392. More information, pls visit my youtube channel. <a target="blank" href="#"> &#8594; CLick here &#8592; </a></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLogged,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);