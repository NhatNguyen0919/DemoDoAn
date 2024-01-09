import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';

class About extends Component {

    render() {

        return (
            <>
                <div className="section-wrapper section-about">
                    <div className="section-about-header ">
                        <h2>Truyền thông nói về CareMed</h2>
                    </div>

                    <div className="section-about-content">
                        <div className="left-content">
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/Pp-VWbNhi_k"
                                title="CareMed"
                                frameBorder="0" allow="accelerometer; autoplay; 
                            clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                             web-share" allowFullScreen></iframe>
                        </div>

                        <div className="right-content">
                            <div className="right-wrap">
                                <div className="row">
                                    <div className='col-lg-6 col-md-6 '>
                                        <div className='right-item'>
                                            <img src="https://slidesigma.nyc/templatemonster/react/medtab/assets/img/home-1/150x100.png" alt="" />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 '>
                                        <div className='right-item'>
                                            <img src="https://slidesigma.nyc/templatemonster/react/medtab/assets/img/home-1/150x100-0.png" alt="" />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 '>
                                        <div className='right-item'>
                                            <img src="https://slidesigma.nyc/templatemonster/react/medtab/assets/img/home-1/150x100-1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 '>
                                        <div className='right-item'>
                                            <img src="https://slidesigma.nyc/templatemonster/react/medtab/assets/img/home-1/150x100-2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
