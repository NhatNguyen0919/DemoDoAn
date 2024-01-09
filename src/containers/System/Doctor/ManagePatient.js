import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import _ from 'lodash';
import { Table } from 'reactstrap';
import { getAllPatient, sendPrescription } from '../../../services/userService';
import moment from 'moment';
import PrescriptionModal from './PrescriptionModal';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpen: false,
            dataModal: {},
            patientName: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllPatient({
            doctorId: user.id,
            date: formattedDate
        });

        if (res && res.errorCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    async componentDidUpdate(prevProps, prevStates) {

    }

    handleOnChangeDatePicker = (date) => {
        console.log("check state", this.state);
        this.setState({
            currentDate: date
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        console.log("");

        this.setState({
            isOpen: true,
            dataModal: data
        })

    }

    isClose = () => {
        this.setState({
            isOpen: false,
            dataModal: {}
        })
    }

    sendRequest = async (data) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await sendPrescription({
            ...data,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        })
        if (res && res.errorCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send success !");
            this.isClose();
            await this.getDataPatient();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error("Send fail !");
            console.log("Error :", res);
        }

    }

    render() {
        console.log("check prrops", this.state);
        let { dataPatient, isOpen, dataModal, currentDate } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className="manage-patient-wrapper">
                            <div className="m-s-title">
                                Quản lý bệnh nhân
                            </div>
                            <div className="manage-patient-body">
                                <div className="row">
                                    <div className="col-4 form-group">
                                        <label htmlFor=""><FormattedMessage id="manage-schedule.choose-day" /></label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className="form-control"
                                            value={this.state.currentDate[0]}
                                        />
                                    </div>
                                    <div className="col-12 table-manage-patient mt-3">

                                        <Table striped bordered hover size="lg" >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Thời gian</th>
                                                    <th>Họ và tên</th>
                                                    <th>Giới tính </th>
                                                    <th>Địa chỉ</th>
                                                    <th>Triệu chứng</th>
                                                    <th className='action-th'>Action</th>
                                                </tr>
                                            </thead>
                                            {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeData2.valueVi : item.timeTypeData2.valueEn;

                                                let gender = language === LANGUAGES.VI
                                                    ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tbody key={index} >
                                                        <tr >
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{gender}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{item.patientData.reason}</td>
                                                            <td className='action-th'>
                                                                <button className='btn-confirm btn btn-success m-1' onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                                : <div className='no-data-container'>
                                                    <div className='no-data-body'>
                                                        <div className='no-data-wrap'>
                                                            <h3>Oops !</h3>
                                                            <p>No Data available</p>
                                                            <small>Please try again</small>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PrescriptionModal
                        isOpen={isOpen}
                        dataModal={dataModal}
                        isClose={this.isClose}
                        sendRequest={this.sendRequest}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
