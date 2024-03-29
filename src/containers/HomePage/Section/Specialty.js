import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';



class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("check res:", res);
        if (res && res.errorCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }



    async componentDidUpdate(prevProps, prevStates) {


    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`detail-specialty/${item.id}`)
        }
    }

    handleViewAll = (item) => {
        if (this.props.history) {
            this.props.history.push(`/Allspecialty"`)
        }
    }





    render() {
        let { dataSpecialty } = this.state;
        let { settings } = this.props;
        return (
            <div>
                <div className='specialty-wrapper '>
                    <div className='section-container'>
                        <div className="section-header">
                            <h3><FormattedMessage id="homeheader.speciality" /></h3>
                            <Link to="/Allspecialty" >
                                <button className='more-info'>
                                    <b><FormattedMessage id="homepage.more-info" /></b>
                                </button>
                            </Link>

                        </div>

                        <div className="section-body">
                            <div className="row section-wrap">
                                <Slider {...settings}>
                                    {dataSpecialty && dataSpecialty.length > 0 &&
                                        dataSpecialty.map((item, index) => {
                                            return (
                                                <div className='section-customize' key={index}
                                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                                >
                                                    <div className='bg-image section-specialty'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    />
                                                    <div className='custom-text'>
                                                        <h4>{item.name}</h4>
                                                        <div className='readmore'><FormattedMessage id="homepage.more-info" /> <i><FaArrowRightLong /></i> </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                </Slider>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
