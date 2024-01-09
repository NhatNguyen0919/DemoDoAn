import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import { FaArrowRightLong } from "react-icons/fa6";
import { withRouter } from 'react-router';



class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []

        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errorCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`detail-clinic/${clinic.id}`)
        }
    }



    render() {
        let { dataClinic } = this.state;
        return (
            <>
                <div>
                    <div className='clinic-wrapper section-medical'>
                        <div className='section-container'>
                            <div className="section-header">
                                <h3><FormattedMessage id="menu.admin.clinic" /></h3>
                                <button><FormattedMessage id="homepage.more-info" /></button>
                            </div>

                            <div className="section-body">
                                <Slider {...this.props.settings}>
                                    {dataClinic && dataClinic.length > 0 &&
                                        dataClinic.map((item, index) => {
                                            return (
                                                <div className='section-customize' key={index}
                                                    onClick={() => this.handleViewDetailClinic(item)}
                                                >
                                                    <div className='bg-image section-medical'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
