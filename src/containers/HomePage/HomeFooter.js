import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";





class HomeFooter extends Component {

    render() {

        return (
            <>

                <div className="home-footer">
                    <div className="footer-mid">
                        <div className="footer-mid-wrap">
                            <div className="footer-infor">
                                <div className="footer-icon">
                                    <span>
                                        <i><FaLocationArrow /></i>
                                    </span>
                                </div>
                                <div className="footer-description">
                                    <p className='first-des'>Our Address</p>
                                    <p className='second-des'>Ho Chi Minh City</p>
                                </div>
                            </div>
                            <div className="footer-infor" style={{ borderLeft: "2px solid", borderLeftColor: "rgb(228 235 236)", paddingLeft: "70px" }}>
                                <div className="footer-icon">
                                    <span>
                                        <i><FaPhone /></i>
                                    </span>
                                </div>
                                <div className="footer-description">
                                    <p className='first-des'>Call us</p>
                                    <p className='second-des'>0123456789</p>
                                </div>
                            </div>
                            <div className="footer-infor" style={{ borderLeft: "2px solid", borderLeftColor: "rgb(228 235 236)", paddingLeft: "70px" }}>
                                <div className="footer-icon">
                                    <span>
                                        <i><IoMdMail /></i>
                                    </span>
                                </div>
                                <div className="footer-description">
                                    <p className='first-des'>Our Mail</p>
                                    <p className='second-des'>nhatnha20@uef.edu.vn</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="footer-bot">
                        <div className="footer-bot-container">
                            <div className="left">
                                <p>© Website <a href="">2023</a>  | All Rights Reserved</p>
                            </div>
                            <div className="right">
                                <ul>
                                    <li>Privacy</li>
                                    <li style={{ borderLeft: "2px solid", borderLeftColor: "#999b9f", paddingLeft: "5px" }}>Terms</li>
                                    <li style={{ borderLeft: "2px solid", borderLeftColor: "#999b9f", paddingLeft: "5px" }}>Sitemap</li>
                                    <li style={{ borderLeft: "2px solid", borderLeftColor: "#999b9f", paddingLeft: "5px" }}>Help</li>
                                </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
