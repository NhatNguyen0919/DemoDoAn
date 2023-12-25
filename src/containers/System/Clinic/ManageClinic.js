import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import "./ManageClinic.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            address: ""

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevStates) {


    }

    handleOnchangeInput = (e, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = e.target.value
        this.setState({
            ...stateCoppy
        })
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

    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errorCode === 0) {
            toast.success("add new success")
            this.setState({
                name: "",
                address: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            })
        } else {
            toast.error("add new fail")

        }

    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className="manage-specialty-wrapper">


                        <div className="ms-title">Clinic specialty</div>

                        <div className="all-specialty row">
                            <div className="col-6 my-5 form-group">
                                <label htmlFor="">Tên phòng khám</label>
                                <input className='form-control' type='text' value={this.state.name}
                                    onChange={(e) => this.handleOnchangeInput(e, "name")} />
                            </div>
                            <div className="col-sm-4  my-5 form-group">
                                <label htmlFor="">Ảnh phòng khám</label>
                                <input className='form-control' type='file'
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                />
                            </div>
                            <div className="col-6 my-3 form-group">
                                <label htmlFor="">Địa chỉ phòng khám</label>
                                <input className='form-control' type='text' value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, "address")} />
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
                            <button className='btn btn-secondary' onClick={() => this.handleSaveClinic()}>Save</button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
