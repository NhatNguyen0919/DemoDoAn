import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { getDetailInfoDoctors, getExtraInforDoctorById, postVerifyBooking, getDayBooking } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './VerifyEmail.scss';
import { FaCircleCheck } from "react-icons/fa6";
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Modal, ModalBody } from 'reactstrap';



class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errorCode: 0,
            extraInfor: '',
            doctorInfor: '',
            dayBooking: ''
        }
    }

    async componentDidMount() {
        const location = this.props.location
        if (location && location.search) {
            const urlParams = new URLSearchParams(location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctor-id');
            let res = await postVerifyBooking({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errorCode === 0) {
                this.setState({
                    statusVerify: true,
                    errorCode: res.errorCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errorCode: res && res.errorCode ? res.errorCode : -1
                })

            }
            if (doctorId) {
                let res = await getExtraInforDoctorById(doctorId);
                if (res && res.errorCode === 0) {
                    this.setState({
                        extraInfor: res.data
                    })

                }
                let resDoctorId = await getDetailInfoDoctors(doctorId);
                if (resDoctorId && resDoctorId.errorCode === 0) {
                    this.setState({
                        doctorInfor: resDoctorId.data
                    })
                }
                let resDayBooking = await getDayBooking(token);
                if (resDayBooking && resDayBooking.errorCode === 0) {
                    this.setState({
                        dayBooking: resDayBooking.data
                    })
                }
            }

        }



    }



    async componentDidUpdate(prevProps, prevStates) {


    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    renderTime = (dayBooking) => {
        let { language } = this.props;



        if (dayBooking && !_.isEmpty(dayBooking)) {

            let date = language === LANGUAGES.VI ?
                moment.unix(+dayBooking.dayBooking / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dayBooking.dayBooking / 1000).locale('en').format('ddd - MM/DD/YYYY')

            let time = language === LANGUAGES.VI ?
                dayBooking.timeTypeData2.valueVi :
                dayBooking.timeTypeData2.valueEn

            return (
                <>
                    <div> Thời gian : {time} - {this.capitalizeFirstLetter(date)}</div>
                </>
            )
        }
        return <></>
    }

    handleOnClick = () => {
        toast('🦄 Đặt lịch của bạn đã được xác nhận. Cảm ơn bạn đã chọn dịch vụ của chúng tôi!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    render() {
        let { statusVerify, errorCode, dayBooking, doctorInfor } = this.state;
        console.log("hoidanit check state",this.state);
        return (
            <>
                <HomeHeader />
                <div className="verify-container">
                    {statusVerify === false ?
                        <div>
                            Loading <data styleName=""></data>
                        </div>
                        :
                        <div className='verify-wrapper'>
                            <div className='verify-wrap-success'>

                                {+errorCode === 0 ?

                                    <div className="left">
                                        <div className="left-header"> <h3><i><FaCircleCheck /></i> Booking Confirmed</h3></div>
                                        <div className="left-body">
                                            <p className='title-detail'>
                                                Thông tin chi tiết đặt lịch:
                                            </p>
                                            <div className="detail-infor">
                                                { }
                                                {this.renderTime(dayBooking)}
                                                Bác sĩ : {doctorInfor.lastName} {doctorInfor.firstName}
                                            </div>

                                        </div>
                                        <div className="left-footer">
                                            <button className='btn btn-secondary' onClick={() => this.handleOnClick()}>Confirm</button>
                                        </div></div>


                                    : <div className="left">
                                        <div className="left-header"> <h3><i><FaCircleCheck /></i> Lịch hẹn không tồn tại hoặc đã được xác nhận</h3></div>
                                        <div className="left-body">
                                            <p className='title-detail'>
                                                Xin lỗi vì sự bất tiện này, quý khách vui lòng kiểm tra lại thông tin lịch hẹn.
                                            </p>
                                            <div className="detail-infor">
                                                Chúng tôi rất mong được phục vụ quý khách !
                                            </div>

                                        </div>
                                        <div className="left-footer">
                                        </div></div>

                                }


                            </div>

                            <div className="right"></div>
                        </div>


                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
