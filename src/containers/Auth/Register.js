// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
// import './Register.scss';
// import { GrFacebook, GrInstagram, GrGithub, GrGoogle } from "react-icons/gr";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { handleLogin } from '../../services/userService';
// import { withRouter } from 'react-router';
// import { FormattedMessage } from 'react-intl';


// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             isShowPass: false,
//             errMsg: ''
//         }
//     }

//     handleOnChangeUserName = (event) => {
//         this.setState({
//             username: event.target.value
//         })
//     }

//     handleOnChangePassword = (event) => {
//         this.setState({
//             password: event.target.value
//         })
//     }


//     returnRegister = () => {
//         this.props.history.push('/register');

//     }


//     handleOnSubmit = async () => {
//         this.setState({
//             errMsg: ''
//         })
//         try {
//             let data = await handleLogin(this.state.username, this.state.password)
//             console.log(data);

//             if (data && data.errorCode !== 0) {
//                 this.setState({
//                     errMsg: data.message
//                 })
//             }
//             if (data && data.errorCode === 0) {
//                 // todo
//                 this.props.userLoginSuccess(data.user)
//                 console.log('login success');
//             }
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.data) {
//                     this.setState({
//                         errMsg: error.response.data.message,
//                     })
//                 }
//             }
//         }
//     }


//     returnLogin = () => {
//         this.props.history.push('/login');

//     }


//     handleShowHidePass = () => {
//         this.setState({
//             isShowPass: !this.state.isShowPass
//         })
//     }

//     render() {

//         return (

//             <div>
//                 <div className="login-background">
//                     <div className="login-container">
//                         <div className="login-content row"  >
//                             <div className='md-5 mt-md-4 '>
//                                 <div className='fw-bold mb-2 text-uppercase login-text'>Register</div>
//                                 <div className="text-desc text-white-50 mb-5 text-center">Please enter your login and password!</div>
//                                 <div class="row">
//                                     <div class="col-md-6 mb-4">
//                                         <div class="form-outline">
//                                             <label class="form-label text-uppercase text-white" for="form3Example1">First name</label>
//                                             <input type="text" id="form3Example1" class="form-control form-control-lg" placeholder='Your First name' />
//                                         </div>
//                                     </div>
//                                     <div class="col-md-6 mb-4">
//                                         <div class="form-outline">
//                                             <label class="form-label text-uppercase text-white" for="form3Example2">Last name</label>
//                                             <input type="text" id="form3Example2" class="form-control form-control-lg" placeholder='Your Last name' />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="fw-bold mb-2 text-uppercase login-input">
//                                     <label htmlFor="" className="form-label">UserName :</label>
//                                     <input type="text" value={this.state.username}
//                                         onChange={(event) => this.handleOnChangeUserName(event)}
//                                         className='form-control form-control-lg' placeholder='Enter your Username/Email' />
//                                 </div>
//                                 <div className="fw-bold mb-2 text-uppercase login-input">
//                                     <label htmlFor="" className="form-label">Password :</label>
//                                     <div className='custom-input-pass'>
//                                         <input type={this.state.isShowPass ? 'text' : 'password'}
//                                             value={this.state.password}
//                                             onChange={(event) => this.handleOnChangePassword(event)}
//                                             className='form-control  form-control-lg' placeholder='Enter your password' />
//                                         <span
//                                             onClick={() => { this.handleShowHidePass() }}
//                                         >
//                                             {
//                                                 this.state.isShowPass ? <i><AiFillEyeInvisible /></i>
//                                                     : <i><AiFillEye /></i>
//                                             }

//                                         </span>
//                                     </div>

//                                 </div>
//                             </div>

//                             <div className='col-12' style={{ color: 'red' }}>
//                                 {this.state.errMsg}
//                             </div>
//                             <div className="col-12 btn-login-sign">
//                                 <button className='btn-login' onClick={() => this.handleOnSubmit()}>Sign up</button>
//                             </div>

//                             <div className="col-12 text-center">
//                                 <small className='text-other-login' style={{ color: 'white' }}>Or sign up with:</small>
//                             </div>
//                             <div className='col-12 social-login'>
//                                 <i className='fbook'><GrFacebook></GrFacebook></i>
//                                 <i className='insta'><GrInstagram></GrInstagram></i>
//                                 <i className='google'><GrGoogle></GrGoogle></i>
//                                 <i className='github'><GrGithub></GrGithub></i>
//                             </div>
//                             <div className="col-12 text-center sign-up">Already have Account ? <a onClick={() => this.returnLogin()} href="" style={{ color: 'white', opacity: "0.6" }}>Sign in</a></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         language: state.app.language
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         navigate: (path) => dispatch(push(path)),
//         // userLoginFail: () => dispatch(actions.adminLoginFail()),
//         userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
