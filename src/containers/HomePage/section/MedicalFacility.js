import React, { Component } from 'react';
import {connect} from 'react-redux';
import './MedicalFacility.scss';
import {FormattedMessage} from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Chuyen khoa</span>
                        <button className="btn-section">Xem them</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Xương khớp6</div>
                            </div>
                        </Slider>
                    </div>
                    
                </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)