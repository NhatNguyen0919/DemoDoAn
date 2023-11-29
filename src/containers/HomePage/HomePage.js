import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
import Handbook from './Section/Handbook.js';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import DownLoad from './Section/DownLoad';
import WhyChoose from './Section/WhyChoose.js';


class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };

        return (
            <>
                <HomeHeader isShowBanner={true} />
                <WhyChoose />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor  />
                <Handbook />
                <About />
                <DownLoad />
                <HomeFooter />


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
