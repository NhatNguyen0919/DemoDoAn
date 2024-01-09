import React, { Component } from 'react';
import './OurService.scss';
import { FormattedMessage } from 'react-intl';
import { BsFillSearchHeartFill } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { AiFillSchedule } from "react-icons/ai";



class OurService extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {

    }


    render() {

        return (
            <>
                <div className='service-container'>
                    <div className='service-section'>
                        <span><FormattedMessage id="step.we-do" /></span>
                        <h3>
                            <FormattedMessage id="step.our-services" />
                        </h3>
                        <span><FormattedMessage id="step.process" /></span>
                    </div>
                    <div className="service-process-container">
                        <div className="row service-process-wrap">

                            <div className="col-lg-4 col-md-6 service-div">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><BsFillSearchHeartFill /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            <FormattedMessage id="step.searchdoctor" />
                                        </h4>
                                        <p><FormattedMessage id="step.reason-seacth" /></p>
                                        <span className='steps'>Step 1</span>
                                        <span className='pulsive-dots'></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 service-div">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><AiFillSchedule /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            <FormattedMessage id="step.appointments" />
                                        </h4>
                                        <p><FormattedMessage id="step.reason-appointment" /></p>
                                        <span className='steps'>Step 2</span>
                                        <span className='pulsive-dots'></span>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4 col-md-6 service-div">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><VscFeedback /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            <FormattedMessage id="step.your-feedback" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="step.reason-feedback" />
                                        </p>
                                        <span className='steps'>Step 3</span>
                                        <span className='pulsive-dots'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='line'></div>

                        </div>
                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default (OurService);
