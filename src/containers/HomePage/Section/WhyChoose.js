import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WhyChoose.scss';
import { FormattedMessage } from 'react-intl';
import { FaBriefcaseMedical } from "react-icons/fa6";
import doctors from "../../../assets/images/medical-discussion-with-colleague.jpg"
import doctors2 from "../../../assets/images/elderly-female-smiling-with-doctor-visiting-senior-patient-woman-hospital-ward.jpg";
import Counter from './Counter';




class Specialty extends Component {

    render() {
        return (
            <div>
                <div className="linear-img">
                    <div className="opacity">
                        <div className="wrapper-content-2">
                            <div className="row-content">
                                <div className="content-left">
                                    <div className="section-tit">
                                        <h3 className='tit-text'><FormattedMessage id="banner.why" /></h3>
                                        <div className="explain">
                                            <p><FormattedMessage id="banner.reason" /></p>
                                            <ul>
                                                <li><i><FaBriefcaseMedical></FaBriefcaseMedical></i><FormattedMessage id="banner.quality" />
                                                    <p>"<FormattedMessage id="banner.quality-rs" />"</p>
                                                </li>
                                                <li><i><FaBriefcaseMedical></FaBriefcaseMedical></i><FormattedMessage id="banner.quality-doctor" />
                                                    <p>"<FormattedMessage id="banner.quality-doctor-rs" />"</p></li>
                                                <li><i><FaBriefcaseMedical></FaBriefcaseMedical></i><FormattedMessage id="banner.feedback-doctor" />
                                                    <p>"<FormattedMessage id="banner.feedback-rs" />"</p></li>
                                                <li><i><FaBriefcaseMedical></FaBriefcaseMedical></i><FormattedMessage id="banner.support-cus" />
                                                    <p>"<FormattedMessage id="banner.support-rs" />"</p></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="content-right">
                                    <div className='wrap-img-sect'>
                                        <div className='pic-1'>
                                        </div>
                                        <div className='pic-2'>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <Counter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
