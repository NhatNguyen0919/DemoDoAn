import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInfoDoctors } from '../../../services/userService';
import { CRUD_ACTION } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);





class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // Save markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            listDoctor: [],
            hasOldData: false,

            // Save doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getRequireDoctorInfor()
    }

    componentDidUpdate(prevProps, prevStates) {

        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.allRequireData !== this.props.allRequireData) {
            let { paymentRes, priceRes, provinceRes, specialtyRes, clinicRes } = this.props.allRequireData
            let dataSelectPrice = this.buildDataInputSelect(priceRes, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(paymentRes, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(provinceRes, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(specialtyRes, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(clinicRes, 'CLINIC')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { paymentRes, priceRes, provinceRes } = this.props.allRequireData
            let dataSelectPrice = this.buildDataInputSelect(priceRes, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(paymentRes, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(provinceRes, 'PROVINCE')
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    return result.push(object);

                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} $`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    return result.push(object);

                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    return result.push(object);

                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    return result.push(object);

                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    return result.push(object);

                })

            }
        }

        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state


        let res = await getDetailInfoDoctors(selectedOption.value)
        if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '',
                note = '', paymentId = '', priceId = '',
                provinceId = '', selectedPayment = '', selectedPrice = '',
                selectedProvince = '', specialtyId = '', selectedSpecialty = '',
                clinicId = '', selectedClinic = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId
                })


            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            })

        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedClinic: ''
            })
        }

    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let coppyState = { ...this.state };
        coppyState[stateName] = selectedOption;
        this.setState({
            ...coppyState
        })
        console.log('hoi dan it check select onchange :', selectedOption, name);
    }

    handleOnChangeText = (e, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = e.target.value
        this.setState({
            ...coppyState
        })
    }

    render() {
        let { listSpecialty, listClinic } = this.state;

        return (
            <div className='manage-doctor-container'>
                <div className="manage-doctor-wrapper">
                    <div className='manage-doctor-title'>
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className='more-info'>
                        <div className="content-left form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                            />
                        </div>
                        <div className='content-right'>
                            <label htmlFor=""><FormattedMessage id="admin.manage-doctor.intro-infor" /></label>
                            <textarea className='form-control'
                                cols="30"
                                onChange={(e) => this.handleOnChangeText(e, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="extra-infor ">
                        <div className="row mb-4">
                            <div className="col-4 form-group ">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.price" /></label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPrice}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                    name='selectedPrice'
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.payment" /> </label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPayment}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                    name='selectedPayment'
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.province" /></label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listProvince}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                    name='selectedProvince'
                                />
                            </div>


                        </div>
                        <div className="row mb-4">
                            <div className="col-4 form-group my-3 ">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                                <input className='form-control' type="text"
                                    onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                                    value={this.state.nameClinic}
                                />
                            </div>
                            <div className="col-4 form-group my-3">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.addressClinic" /> </label>
                                <input className='form-control' type="text"
                                    onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                                    value={this.state.addressClinic}
                                />
                            </div>
                            <div className="col-4 form-group my-3">
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.note" /></label>
                                <input className='form-control' type="text"
                                    onChange={(e) => this.handleOnChangeText(e, 'note')}
                                    value={this.state.note}
                                />
                            </div>
                            <div className='col-4 form-group my-3'>
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={listSpecialty}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                                    name='selectedSpecialty'
                                />
                            </div>
                            <div className='col-4 form-group my-3'>
                                <label htmlFor=""><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={listClinic}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                                    name='selectedClinic'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button onClick={() => this.handleSaveContentMarkdown()}
                        className={this.state.hasOldData === false ? "btn btn-secondary my-3" : "btn btn-dark my-3"}
                    >{this.state.hasOldData === false ?
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span> :
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        } </button>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allRequireData: state.admin.allRequireData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
