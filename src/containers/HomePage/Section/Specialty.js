import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { AiOutlineArrowRight } from "react-icons/ai";



class Specialty extends Component {


    render() {

        return (
            <div>
                <div className='section-wrapper section-specialty'>
                    <div className='section-container'>
                        <div className="section-header">
                            <h3>Chuyên khoa phổ biến</h3>
                            <button><FormattedMessage id="homepage.more-info" /></button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className='section-customize '>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>
                                        <h5>Da liễu</h5>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit.</p>
                                        <a href=""><FormattedMessage id="homepage.more-info" />
                                            <i><AiOutlineArrowRight />
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
