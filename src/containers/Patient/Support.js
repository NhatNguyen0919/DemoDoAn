import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './Support.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import emailjs from '@emailjs/browser';

class Support extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myRef: React.createRef()
        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevStates) {


    }




    render() {
        const form = this.state.myRef;
        const sendEmail = (e) => {
            e.preventDefault();

            emailjs.sendForm('service_svwd2a1', 'template_cg0q5uo', form.current, 'Axv2S_VW_SQsW9dE5')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        };
        return (
            <>
                <HomeHeader />
                <div className="support-container">
                    <div className="request-container">
                        <div className="request-body">
                        <div className="support-title">
                            <h2>Make a Request</h2>
                        </div>
                            <form action="" ref={form} onSubmit={sendEmail}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Full Name" name="user_name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="email" placeholder="Email Address" name="user_email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Phone Number" name="name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Subject" name="name" />
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
