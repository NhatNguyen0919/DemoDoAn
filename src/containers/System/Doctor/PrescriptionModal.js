import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './PrescriptionModal.scss';
import { toast } from 'react-toastify';
import {
    Modal, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

class PrescriptionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''

        }
    }

    async componentDidMount() {
        let email = this.props.dataModal.email;
        if (this.props.dataModal) {
            this.setState({
                email: email
            })
        }
    }


    async componentDidUpdate(prevProps, prevStates) {
        if (prevProps.dataModal !== this.props.dataModal) {
            let email = this.props.dataModal.email;
            this.setState({
                email: email
            })
        }

    }

    handleOnchange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
            console.log("base 64", this.state.avatar);
        }

    }

    sendRequest = () => {
        this.props.sendRequest(this.state)
    }



    render() {
        let { isOpen,  isClose, } = this.props;
        let { email } = this.state;

        return (
            <>
                <Modal
                    isOpen={isOpen}
                    className={'booking-modal-container'}
                    size="md"
                    centered>

                    <div className="booking-modal-header">
                        <span className='left'> Hóa đơn khám bệnh</span>
                        <span className='right'
                            onClick={isClose}
                        ><i><FaTimes /></i></span>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label htmlFor="">Email </label>
                                <input className='form-control' type="email" value={email}
                                    onChange={(e) => this.handleOnchange(e)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="">Chọn hóa đơn</label>
                                <input className='form-control' style={{ overflow: "hidden" }} type="file"
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.sendRequest()}>Send</Button>{' '}
                        <Button color="secondary" onClick={isClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
