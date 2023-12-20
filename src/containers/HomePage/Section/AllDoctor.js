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
        console.log("check doctor:", this.state);
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
                <>
                    <div className="single-doctor" key={index}>
                        <div className="left">
                            <div className="col-md-12">
                                <img src={imageBase64} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>{language === LANGUAGES.VI ? nameVi : nameEn}</h4>
                            {doctorInfor && doctorInfor.length > 0 && doctorInfor.map((content, num) => {
                                if (item.id === content.id) {
                                    console.log("check markdown :", content.Markdown)
                                    if (content.Markdown) {
                                        return (
                                            <>
                                                <div key={num}>Chuyên khoa</div>
                                                <p>{content.Markdown.description}</p>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <div key={num}>Chuyên khoa</div>
                                                <p>Fail to compile</p>
                                            </>
                                        )
                                    }


                                }
                            })}
                            <button onClick={() => this.handleViewDetailDoctor(item)}>
                                View More
                            </button>
                            <button onClick={() => this.handleHeart()}>

                                <i><FaHeart ></FaHeart></i>
                            </button>
                        </div>
                    </div>
                </>
            )

        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrDoctors.length / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
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
                    </div>
                    <div className="all-doctor-container">
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);