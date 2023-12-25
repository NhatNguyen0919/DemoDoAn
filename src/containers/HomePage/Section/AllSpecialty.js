import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import "./AllSpecialty.scss";
import * as actions from '../../../store/actions';
import { getAllSpecialty } from '../../../services/userService';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';



class AllSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
            isHeart: false,
            currentPage: 1,
            postsPerPage: 2,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
        let res = await getAllSpecialty();
        if (res && res.errorCode === 0) {
            this.setState({
                arrSpecialty: res.data
            })
        }
    }



    async componentDidUpdate(prevProps, prevStates) {

    }

    handleViewDetailDoctor = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`)
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

        let { arrSpecialty, currentPage, postsPerPage } = this.state;
        let { language } = this.props;
        console.log("chek state", this.state);

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPost = arrSpecialty.slice(indexOfFirstPost, indexOfLastPost);

        const arrRender = currentPost.map((item, index) => {
            let imageBase64 = item.image;


            return (
                <>
                    <div className="single-specialty" key={index}>
                        <div className="left">
                            <div className="col-md-12">
                                <img src={imageBase64} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <h4></h4>
                            {arrSpecialty && arrSpecialty.length > 0 && arrSpecialty.map((content, num) => {

                                if (item.id === content.id) {

                                    return (
                                        <>
                                            <div key={num}><h3> {item.name}</h3></div>
                                        </>
                                    )



                                }
                            })}
                            <div className="wrap-button">
                                <button onClick={() => this.handleViewDetailDoctor(item)}>
                                    View More
                                </button>
                                <button onClick={() => this.handleHeart()}>

                                    <i><FaHeart ></FaHeart></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            )

        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrSpecialty.length / postsPerPage); i++) {
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
                        <h2>Specialty List</h2>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/home">
                                Home
                            </Link>


                            <Typography color="text.primary">Chuyên khoa</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className="all-specialty-container">
                        <div className="row">
                            <div className="col-lg-4">

                            </div>

                            <div className="col-lg-8">
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);