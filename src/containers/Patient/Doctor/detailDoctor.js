import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
import { getDetailInfoDoctors } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtra from './DoctorExtra';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: [],
            currenDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currenDoctorId: id,
            })
            let res = await getDetailInfoDoctors(id);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorInfor: res.data
                })
            }

        }
    }

    componentDidUpdate(prevProps, prevStates) {


    }



    render() {
        let { language } = this.props;
        let doctorInforImg = this.state.doctorInfor.image;
        let doctorInfor = this.state.doctorInfor;
        let nameEn = '', nameVi = ''
        if (doctorInfor && doctorInfor.positionData) {
            nameVi = `${doctorInfor.positionData.valueVi}, ${doctorInfor.lastName} ${doctorInfor.firstName}`;
            nameEn = `${doctorInfor.positionData.valueEn}, ${doctorInfor.lastName} ${doctorInfor.firstName}`;
        }
        return (
            <>

                <HomeHeader isShowBanner={false}></HomeHeader>
                <div className="doctor-detail-container">
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                        >
                            <div className='image-doctor' style={{ backgroundImage: `url(${doctorInfor && doctorInforImg ? doctorInforImg : ''})` }}> </div>
                        </div>
                        <div className='content-right'>
                            <div className="content-right-container">
                                <div className='up'>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className='down'>
                                    {
                                        doctorInfor &&
                                        doctorInfor.Markdown
                                        && doctorInfor.Markdown.description
                                        && <span>
                                            {doctorInfor.Markdown.description}
                                        </span>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorId=
                                {
                                    this.state.currenDoctorId
                                }
                            >

                            </DoctorSchedule>
                        </div>
                        <div className='content-right'>
                            <DoctorExtra
                                doctorId=
                                {
                                    this.state.currenDoctorId
                                }
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {doctorInfor &&
                            doctorInfor.Markdown
                            && doctorInfor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{
                                __html: doctorInfor.Markdown.contentHTML
                            }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                    <div className='doctor-detail-footer'>
                        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
