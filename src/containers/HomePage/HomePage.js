import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome';
import Specialty from './section/Specialty';
import MedicalFacility from './section/MedicalFacility';
import OutStandingDoctor from './section/OutStandingDoctor';
import HandBook from './section/HandBook';
import About from './section/About';
import HomeFooter from '../HomePage/HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            
            <div> 
                <HeaderHome isShowBanner={true}/>
                <Specialty settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutStandingDoctor settings={settings}/>
                <HandBook settings={settings}/>
                <About/>
                <HomeFooter/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLogged
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)