import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty, getAllDetailSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTION } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            listSpecialty: [],
            selectedSpecialty: '',
            hasOldData: false,
            specialtyId: "",



        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getRequireDoctorInfor()
    }



    async componentDidUpdate(prevProps, prevStates) {
        if (prevProps.allRequireData !== this.props.allRequireData) {
            let { specialtyRes } = this.props.allRequireData

            let dataSelectSpecialty = this.buildDataInputSelect(specialtyRes, 'SPECIALTY')

            this.setState({
                listSpecialty: dataSelectSpecialty,
            })
        }

        if (prevStates.selectedSpecialty !== this.state.selectedSpecialty) {
            let { selectedSpecialty } = this.state;
            let name = selectedSpecialty.name;
            let id = selectedSpecialty.id;
            let image = selectedSpecialty.image.data;
            let descriptionMarkdown = selectedSpecialty.descriptionMarkdown;
            let imageBase64 = ''
            if (image) {
                imageBase64 = new Buffer(image, 'base64').toString('binary');
            }
            this.setState({
                name: name,
                descriptionMarkdown: descriptionMarkdown,
                specialtyId: id,
                hasOldData: true,
                imageBase64: imageBase64
            })

        }


    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {


            if (type === 'SPECIALTY') {
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

    // handleChangeSelect = async (selectedOption) => {
    //     this.setState({ selectedOption })
    //     let { listSpecialty } = this.state
    //     console.log("check selection", this.state);

    //     let res = await getAllDetailSpecialty(selectedOption.value)
    //     if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
    //         let markdown = res.data.Markdown;
    //         let name = res.data.name
    //         let specialtyId = '', selectedSpecialty = ''

    //         this.setState({
    //             name: name,
    //             imageBase64: "",
    //             descriptionMarkdown: markdown,
    //             selectedSpecialty: '',

    //         })

    //     }
    //     else {
    //         this.setState({
    //             contentHTML: '',
    //             contentMarkdown: '',
    //             description: '',
    //             hasOldData: false,
    //             addressClinic: '',
    //             nameClinic: '',
    //             note: ''
    //         })
    //     }

    // };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let coppyState = { ...this.state };
        let { listSpecialty } = this.state
        console.log("check", this.state);

        coppyState[stateName] = selectedOption;
        let res = await getAllDetailSpecialty({
            id: selectedOption.value, location: "ALL"
        });
        if (res && res.errorCode === 0 && res.data && res.data.descriptionMarkdown) {
            let selectedSpecialty = "";
            selectedSpecialty = res.data;
            this.setState({
                selectedSpecialty: selectedSpecialty,


            })

        }
    }




    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // const objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64
            })
            console.log("base 64", this.state.avatar);
        }

    }

    handleOnchangeInput = (e, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = e.target.value
        this.setState({
            ...stateCoppy
        })
    }

    handleSaveSpecialty = async () => {
        let { hasOldData } = this.state;
        console.log("check selection", this.state);

        let res = await createNewSpecialty(this.state);
        if (res && res.errorCode === 0) {
            toast.success("add new success")
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                specialtyId: "",
                action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            })

        } else {
            toast.error("add new fail")

        }
    }


    render() {
        let { listSpecialty, name, imageBase64 } = this.state;
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className="manage-specialty-wrapper">


                        <div className="ms-title">Manage specialty</div>

                        <div className="all-specialty row">
                            <div className="col-4 my-3 form-group">
                                <label htmlFor="">Tên chuyên khoa</label>
                                <input className='form-control' type='text' value={this.state.name}
                                    onChange={(e) => this.handleOnchangeInput(e, "name")} />
                            </div>

                            <div className="col-sm-4  my-3 form-group">
                                <label htmlFor="">Ảnh chuyên khoa</label>
                                <input className='form-control' type='file'
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                />
                            </div>

                            <div className="col-4 my-3 form-group">
                                <label htmlFor="">Chọn chuyên khoa</label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={listSpecialty}
                                    placeholder={name}
                                />
                            </div>

                            <div className="col-12 my-3 ">
                                <label htmlFor="">Hình ảnh chuyên khoa</label>
                                <div className='bg-image section-specialty'
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                />
                            </div>

                        </div>
                        <div className="col-12 ">
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 mt-5">
                            <button className='btn btn-secondary' onClick={() => this.handleSaveSpecialty()}>Save</button>
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
