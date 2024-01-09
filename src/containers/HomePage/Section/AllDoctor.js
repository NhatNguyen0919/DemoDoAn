import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import "./Alldoctor.scss";
import * as actions from '../../../store/actions';
import { getAllDetailInfoDoctors } from '../../../services/userService';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";



class AllDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            doctorInfor: '',
            isHeart: false,
            currentPage: 1,
            postsPerPage: 2,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
        let res = await getAllDetailInfoDoctors();
        if (res && res.errorCode === 0) {
            this.setState({
                doctorInfor: res.data
            })
        }
    }



    async componentDidUpdate(prevProps, prevStates) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    handleHeart = () => {
        toast.info('❤ Thank you!')
    }

    handlePageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id),
        });
    }





    render() {

        let { arrDoctors, doctorInfor, currentPage, postsPerPage } = this.state;
        let { language } = this.props;
        console.log("chek state", this.state);

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPost = arrDoctors.slice(indexOfFirstPost, indexOfLastPost);

        const arrRender = currentPost.map((item, index) => {
            let imageBase64 = '';
            if (item.image) {
                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
            }
            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
            let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
            return (
                <div key={index}>
                    <div className="single-doctor" key={index}>
                        <div className="left">
                            <div className="col-md-12">
                                <img src={imageBase64} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>{language === LANGUAGES.VI ? nameVi : nameEn}</h4>
                            {doctorInfor && doctorInfor.length > 0 && doctorInfor.map((content, num) => {
                                const specialtyName = content.Doctor_Infor?.specialtyTypeData?.name || "Unknown Specialty";
                                const provinceNameVi = content.Doctor_Infor?.provinceTypeData?.valueVi || "Unknown Specialty"
                                const provinceNameEn = content.Doctor_Infor?.provinceTypeData?.valueEn || "Unknown Specialty"

                                if (item.id === content.id) {
                                    console.log("check markdown :", content.Markdown)
                                    if (content.Markdown) {
                                        return (
                                            <div key={index}>
                                                <div key={num}><FormattedMessage id="homeheader.speciality" /> : {specialtyName}</div>
                                                <div className='location'><i><FaLocationDot /></i> {language === LANGUAGES.VI ? provinceNameVi : provinceNameEn}</div>
                                                <p>{content.Markdown.description}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={index}>
                                                <div key={num}><FormattedMessage id="homeheader.speciality" /></div>
                                                <div ><FormattedMessage id="homeheader.speciality" /></div>
                                                <p>Fail to compile</p>
                                            </div>

                                        )
                                    }


                                }
                            })}
                            <div className="wrap-button">
                                <button onClick={() => this.handleViewDetailDoctor(item)}>
                                    <FormattedMessage id="homepage.more-info" />
                                </button>
                                <button onClick={() => this.handleHeart()}>

                                    <i><FaHeart ></FaHeart></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )

        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrDoctors.length / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number, index) => {
            return (
                <li
                    key={index}
                    id={number}
                    onClick={(e) => this.handlePageClick(e)}
                    className={number === currentPage ? "active" : ""}
                >
                    {number}
                </li>
            );
        });

        return (
            <>

                <HomeHeader />
                <div className="all-doctor-body">
                    <div className="all-doctor-title">
                        <h2>Doctor List</h2>
                        <Breadcrumbs aria-label="breadcrumb" className='bread-scrumb'>
                            <Link to="/home">
                                <FormattedMessage id="homeheader.home" />
                            </Link>


                            <Typography color="text.primary"><FormattedMessage id="homeheader.doctors" /></Typography>
                        </Breadcrumbs>
                    </div>
                    <div className="all-doctor-container">
                        <div className="row">
                            <div className="col-lg-4">

                            </div>

                            <div className="col-lg-8 content-doctor-wrap">
                                <ul>
                                    {arrRender}
                                </ul>

                            </div>
                            <div className='page-item-li'>
                                <ul id="page-numbers" >
                                    {renderPageNumbers}
                                </ul>

                            </div>

                        </div>

                    </div>
                    <HomeFooter />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);