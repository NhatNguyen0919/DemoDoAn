import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialty, getAllCodeService, getAllDetailClinic } from '../../../services/userService';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            doctorSpecialty: {},
            isLoading: true,
            isShow: false,


        }
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinic({
                id: id,
            });


            if (res && res.errorCode === 0) {
                let data = res.doctorClinic;
                let arrDoctorId = [];
                if (data && data.length > 0) {
                    data.map((item) => {
                        arrDoctorId.push(item.doctorId)
                    })
                }



                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailClinic: res.data,

                })
            }

        }

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000);
    }



    async componentDidUpdate(prevProps, prevStates) {


    }

    componentWillUnmount() {
        this._isMounted = false;

    }


    isShowDes = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }


    render() {
        let { arrDoctorId, dataDetailClinic, isLoading, isShow } = this.state;
        console.log("check clinic sate", this.state);
        let { language } = this.props;
        if (isLoading) {
            return (
                <>
                    <HomeHeader />
                    <div className="folder-container">
                        <div className="container">
                            <div className="folder">
                                <div className="top"></div>
                                <div className="bottom"></div>
                            </div>
                            <div className="title">getting files ready...</div>
                        </div>
                    </div>
                    <HomeFooter />

                </>
            )
        }

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className='specialty-description'>
                        {isShow === false ?
                            <div className="specialty-description-body" style={{ overflow: " hidden", height: "200px" }}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/home">
                                        Home
                                    </Link>
                                    <Link to="/Allspecialty">
                                        Phòng khám
                                    </Link>

                                    <Typography color="text.primary">{dataDetailClinic && !_.isEmpty(dataDetailClinic) && dataDetailClinic.name}</Typography>
                                </Breadcrumbs>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                    &&
                                    <>
                                        <div>{dataDetailClinic.name}</div>
                                        <div dangerouslySetInnerHTML={{
                                            __html: dataDetailClinic.descriptionHTML
                                        }}>
                                        </div>

                                    </>

                                }

                            </div>
                            :
                            <div className="specialty-description-body" >
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/home">
                                        Home
                                    </Link>

                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="#"
                                    >
                                        Phòng khám
                                    </Link>

                                    <Typography color="text.primary">{dataDetailClinic && !_.isEmpty(dataDetailClinic) && dataDetailClinic.name}</Typography>
                                </Breadcrumbs>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                    &&
                                    <div dangerouslySetInnerHTML={{
                                        __html: dataDetailClinic.descriptionHTML
                                    }}>

                                    </div>
                                }

                            </div>}
                        <div className='hide-infor'>
                            <span onClick={() => { this.isShowDes() }}>
                                {isShow === false ? "Xem Thêm" : "Ẩn bớt"}
                            </span>
                        </div>

                    </div>


                    {
                        arrDoctorId
                        && arrDoctorId.length > 0
                        && arrDoctorId.map((item, index) => {
                            return (

                                <div className='each-doctor' key={index}>
                                    <div className="left">
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowProfile={true}
                                                isShowLinkDetails={true}
                                                isShowPrice={false}
                                            />

                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item}
                                            ></DoctorSchedule>
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtra
                                                doctorId={item}
                                            />

                                        </div>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>
                <HomeFooter />


            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
