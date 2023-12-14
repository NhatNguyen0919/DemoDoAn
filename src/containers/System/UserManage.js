import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUSerService, editUserService } from '../../services/userService';
import { TypeAnimation } from 'react-type-animation';

import { emitter } from '../../utils/emitter';
import './UserManage.scss';

class UserManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModel: false,
            isOpenModelEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModel: true
        })
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModel: !this.state.isOpenModel
        })
    }

    toggleEditUserModel = () => {
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errorCode !== 0) {
                alert(respone.errorMessage);
            }
            else {
                await this.getAllUsers();
                this.setState({
                    isOpenModel: false
                })
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        console.log("user:", user);
        try {
            let res = await deleteUSerService(user.id)
            if (res && res.errorCode === 0) {
                await this.getAllUsers();
            } else {
                alert(res.errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    editUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res.errorCode === 0) {
                this.setState({
                    isOpenModelEditUser: false,
                })

                this.getAllUsers();
            } else {
                alert(res.errorCode);
            }
        } catch (error) {
            console.log(error);
        }
    }





    render() {

        const arrUsers = this.state.arrUsers
        return (
            <>
                <div className="admin-contain">
                    <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
                        <div class="hero-container" data-aos="fade-in">
                            <h1>Welcome</h1>
                            <p><span className="typed" >
                                <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed once, initially
                                        'Admin',
                                        1000,
                                        'Doctors',
                                        1000,
                                        'We provide exceptional healthcare',
                                        1000,
                                    ]}
                                    speed={50}
                                    style={{ fontSize: '26px' }}
                                    repeat={Infinity}
                                />
                            </span></p>

                        </div>
                    </section>
                </div>
            </>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
