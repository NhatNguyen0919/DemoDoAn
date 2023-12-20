import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './Support.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';

class Support extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevStates) {


    }


    render() {
        return (
            <>
                <HomeHeader />
                <div className="support-container">
                    <div className="support-title">
                        <h2>Make a Request</h2>
                    </div>
                    <div className="request-container">
                        <div className="request-body">
                            <form action="">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Full Name" name="name" required="" value="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Email Address" name="email" required="" value="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Phone Number" name="name" required="" value="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Subject" name="name" required="" value="" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea rows="10" placeholder="Enter Message" name="message" required=""></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button type="submit">Submit Request</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Support);
