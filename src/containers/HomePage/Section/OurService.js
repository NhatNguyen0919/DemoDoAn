import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OurService.scss';
import { LANGUAGES } from "../../../utils"
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
                        <span>What We do</span>
                        <h3>Our Services</h3>
                        <span>Work Process</span>
                    </div>
                    <div className="service-process-container">
                        <div className="row service-process-wrap">

                            <div className="col-lg-4 col-md-6">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><BsFillSearchHeartFill /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            Search Best Online
                                            Professional
                                        </h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable.</p>
                                        <span className='steps'>Step 1</span>
                                        <span className='pulsive-dots'></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><AiFillSchedule /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            Get Instant
                                            Appointment
                                        </h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable.</p>
                                        <span className='steps'>Step 2</span>
                                        <span className='pulsive-dots'></span>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className='service-process-info'>
                                    <div className='service-process-header'>
                                        <span>
                                            <i><VscFeedback /></i>
                                        </span>
                                    </div>
                                    <div className='service-process-description'>
                                        <h4>
                                            Leave Your
                                            <br />
                                            Feedback
                                        </h4>
                                        <p>It is a long established fact that a reader will be distracted by the readable.</p>
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
