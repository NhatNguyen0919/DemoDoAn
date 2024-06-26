import React, { Component, Suspense } from 'react';
import './Counter.scss';
import VisibilitySensor from 'react-visibility-sensor';
import _throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import './WhyChoose.scss';
import CountUp from 'react-countup';
import { FormattedMessage } from 'react-intl';





class Specialty extends Component {

    render() {
        return (
            <div className="contain">
                <div className='row counter-container'>
                    <Suspense fallback={<div>Loading...</div>}>

                        <div className='col-lg-3 col-md-4 col-sm-6 counter-div' style={{ textAlign: "center" }}>
                            <span className='counter-span'>
                                <h1>
                                    <CountUp
                                        end={1000}
                                        duration={5}
                                        delay={0}
                                    >
                                        {({ countUpRef, start }) => (
                                            <VisibilitySensor onChange={_throttle(start, 500)} delayedCall>
                                                <span ref={countUpRef} />
                                            </VisibilitySensor>
                                        )}
                                    </CountUp>

                                </h1>
                                <span className="plus">+</span>
                            </span>
                            <p className="text-white" style={{ fontWeight: "Bold" }}><FormattedMessage id="counter.customer" /></p>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 counter-div' style={{ textAlign: "center" }}>
                            <span className='counter-span'>
                                <h1>
                                    <CountUp
                                        end={500}
                                        duration={5}
                                        delay={0}
                                    >
                                        {({ countUpRef, start }) => (
                                            <VisibilitySensor onChange={_throttle(start, 500)} delayedCall>
                                                <span ref={countUpRef} />
                                            </VisibilitySensor>
                                        )}
                                    </CountUp>
                                </h1>
                                <span className="plus">+</span>
                            </span>
                            <p className="text-white" style={{ fontWeight: "Bold" }}><FormattedMessage id="counter.project" /></p>
                        </div><div className='col-lg-3 col-md-4 col-sm-6 counter-div' style={{ textAlign: "center" }}>
                            <span className='counter-span'>
                                <h1>
                                    <CountUp

                                        end={678}
                                        duration={5}
                                        delay={0}
                                    >
                                        {({ countUpRef, start }) => (
                                            <VisibilitySensor onChange={_throttle(start, 500)} delayedCall>
                                                <span ref={countUpRef} />
                                            </VisibilitySensor>
                                        )}
                                    </CountUp>
                                </h1>
                                <span className="plus">+</span>
                            </span>
                            <p className="text-white" style={{ fontWeight: "Bold" }}><FormattedMessage id="counter.customer-work" /></p>
                        </div>
                    </Suspense>
                </div>
            </div>

        )
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
