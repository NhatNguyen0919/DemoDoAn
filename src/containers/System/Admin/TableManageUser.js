import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AiFillEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import { IoCloseSharp } from "react-icons/io5";



import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Modal, ModalBody } from 'reactstrap';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class TableManageUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();

    }

    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    handleDelete(users) {
        this.props.deleteUsersRedux(users.id);
    }

    handleEditUser(users) {
        this.props.handleEditUserFromParent(users);
    }

    render() {
        let arrUsers = this.state.usersRedux;
        let { handleOpenModal } = this.props
        console.log("check arrUsers :", arrUsers);
        return (
            <>
                <Modal
                    isOpen={this.props.isOpenModal}
                    // toggle={() => this.toggle()}
                    className={'className'}
                    size='fullscreen'
                    centered
                >

                    <ModalBody>
                        <div className='closeBtn'>
                            <i onClick={handleOpenModal}><IoCloseSharp /></i>
                        </div>
                        <div className="table-manage-container">
                            <div className="table-body">
                                <div className='user-redux-title'>Manage User</div>

                                <table className='table table-striped table-hover' id='TableManageUser'>
                                    <thead>
                                        <tr>
                                            <th className="thead-id" >#</th>
                                            <th className="thead-mail">MAIL</th>
                                            <th className="thead">FIRST NAME</th>
                                            <th className="thead">POSITION</th>
                                            <th className="thead">PHONE NUMBER</th>
                                            <th className="thead">ACTION</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrUsers && arrUsers.length > 0
                                            && arrUsers.map((item, index) => {
                                                let imageBase64 = '';
                                                if (item.image) {
                                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                                }
                                                return (

                                                    <tr key={index} >
                                                        <th>{index + 1}</th>
                                                        <td className='td-email'><img className='td-img' src={imageBase64 ? imageBase64 : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} alt="" />{item.email}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.positionId}</td>
                                                        <td>{item.phoneNumber}</td>

                                                        <td className='action-crud'>
                                                            <button className='mx-2'
                                                                onClick={() => { this.handleEditUser(item) }}
                                                                
                                                            >
                                                                Edit
                                                                <i>
                                                                    <AiFillEdit />
                                                                </i>
                                                            </button>

                                                            <button className='mx-2' onClick={() => { this.handleDelete(item) }}>
                                                                Delete
                                                                <i>
                                                                    <AiOutlineDelete />
                                                                </i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>


            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUsersRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
