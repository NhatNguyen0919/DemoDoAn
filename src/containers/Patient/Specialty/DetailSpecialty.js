import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialty, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            doctorSpecialty: {},
            listProvince: [],
            isLoading: true,
            isShow: false,



        }
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailSpecialty({
                id: id,
                location: "ALL"
            });

            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errorCode === 0 && resProvince && resProvince.errorCode === 0) {
                let data = res.doctorSpecialty;
                let arrDoctorId = [];
                if (data && data.length > 0) {
                    data.map((item) => {
                        arrDoctorId.push(item.doctorId)
                    })
                }

                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Tất cả"
                    })
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailSpecialty: res.data,
                    doctorSpecialty: res.doctorSpecialty,
                    listProvince: dataProvince ? dataProvince : []
                })
            }

        }

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 2000);
    }



    async componentDidUpdate(prevProps, prevStates) {


    }

    componentWillUnmount() {
        this._isMounted = false;

    }


    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = e.target.value;

            let res = await getAllDetailSpecialty({
                id: id,
                location: location
            });

            if (res && res.errorCode === 0) {
                let data = res.doctorSpecialty;
                let arrDoctorId = [];
                if (data && data.length > 0) {
                    data.map((item) => {
                        arrDoctorId.push(item.doctorId)
                    })
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailSpecialty: res.data,
                    doctorSpecialty: res.doctorSpecialty,
                })
            }
        }

    }

    isShowDes = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }


    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, isLoading, isShow } = this.state;
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

                                    <Typography color="text.primary">Chuyên khoa</Typography>
                                </Breadcrumbs>
                                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                    &&
                                    <div dangerouslySetInnerHTML={{
                                        __html: dataDetailSpecialty.descriptionHTML
                                    }}>

                                    </div>

                                }

                            </div>
                            :
                            <div className="specialty-description-body" >
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/home">
                                        Home
                                    </Link>

                                    <Typography color="text.primary">Chuyên khoa</Typography>
                                </Breadcrumbs>
                                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                    &&
                                    <div dangerouslySetInnerHTML={{
                                        __html: dataDetailSpecialty.descriptionHTML
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

                    <div className="search-doctor-sp">
                        <select onChange={(e) => this.handleOnChangeSelect(e)} className='search-select'>
                            {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <option value={item.keyMap} >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    </React.Fragment>
                                )
                            })}
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
