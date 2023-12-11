import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",

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
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64
            })
            console.log("base 64", this.state.avatar);
        }

    }

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errorCode === 0) {
            toast.success("add new success")
        } else {
            toast.error("add new fail")

        }
    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className="ms-title">Manage specialty</div>

                    <div className="all-specialty row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Tên chuyên khoa</label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, "name")} />
                        </div>
                        <div className="col-sm-4 form-group">
                            <label htmlFor="">Ảnh chuyên khoa</label>
                            <input className='form-control' type='file'
                                onChange={(e) => this.handleOnchangeImg(e)}
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
                    <div className="col-12">
                        <button className='btn btn-primary' onClick={() => this.handleSaveSpecialty()}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
