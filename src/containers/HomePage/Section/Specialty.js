import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';


class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("check res:", res);
        if (res && res.errorCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }



    async componentDidUpdate(prevProps, prevStates) {


    }


    render() {
        let { dataSpecialty } = this.state;
        return (
            <div>
                <div className='section-wrapper section-specialty'>
                    <div className='section-container'>
                        <div className="section-header">
                            <h3>Chuyên khoa phổ biến</h3>
                            <button>Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-customize' key={index}>
                                                <div className='bg-image section-specialty'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <div className='custom-text'>{item.name} </div>
                                            </div>
                                        )
                                    })
                                }

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
