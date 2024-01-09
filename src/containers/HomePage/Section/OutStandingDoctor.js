import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './OutStandingDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();


    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]
        };
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <>


                <div className=' section-wrapper1 section-outstanding-doctor1'>
                    <div className='section-container1'>
                        <div className='opacity1'>
                            <div className="section-header1">

                                <p>Meet our team</p>
                                <h3><FormattedMessage id="homepage.out-standing-doctors" /></h3>
                            </div>

                            <div className="section-body1">
                                <Slider {...settings}>
                                    {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                        return (
                                            <div key={index}>
                                                <div className='section-customize1' key={index} onClick={() => this.handleViewDetailDoctor(item)} >
                                                    <div className="outer-bg1">
                                                        <div className='bg-image1 section-outstanding-doctor1'
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="outer-text text-center">
                                                        <div className='custom-text1'>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}

                                </Slider>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
