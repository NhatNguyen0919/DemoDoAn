import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiFillCaretDown } from "react-icons/ai";
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import './Header.scss';
import { LANGUAGES, USER_ROLES } from "../../utils";
import { adminMenu, doctorMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { FaUserTie } from "react-icons/fa";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLES.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLES.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, userInfo } = this.props;
        let role = userInfo.roleId;


        return (
            <>
                <div className="header-container">
                    {/* thanh navigator */}

                    <div className='menu-language'>
                        <div className='admin-contain'>
                            <span>
                                <h4>{role === USER_ROLES.DOCTOR ? "Bác sĩ" : "Admin"}</h4>
                                <div className='admin-icon'>
                                    <i><FaUserTie /></i>
                                </div>
                            </span>
                            <div></div>
                        </div>
                        <span className='welcome'><FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName + " " + userInfo.lastName : ""} </span>
                        <span className='language-choosed'>Languages <AiFillCaretDown />
                            <ul className='dropdown'>
                                <li className={this.props.language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}><span>VN</span></li>
                                <li className={this.props.language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}><span>EN</span></li>
                            </ul>
                        </span>



                    </div>

                    <div className="header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        Sign Out <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);