import React, {Component} from 'react';
import "../assets/scss/auth.scss";
import logo from "../assets/img/logo.png";
import Form from "react-bootstrap/esm/Form";
import {Button} from "react-bootstrap";
import {FiArrowLeft} from "react-icons/fi";
import {connect} from "react-redux";
import {userLogin} from "../redux";
import {Link, Redirect} from "react-router-dom";
import {userIsLoggedIn} from "../auth/authUtils";
import {toast} from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        email:'user@gmail.com',
        password:'123456'
      },
      isForgetPassword: false,
      login_id: '',
      password: '',
      isVerifiedCode: false,
      isLoading: false,
      isSentOnce: false
    }
  }

  handleForgetPassword = () => {
    this.setState({isForgetPassword: true})
  };

  handleBackToLogin = () => {
    this.setState({isForgetPassword: false})
  };

  handleLogin = (e) => {
    e.preventDefault();

    const data = {
      login_id: this.state.login_id,
      password: this.state.password,
      device_id: "",
      device_token: btoa(Math.random() + navigator.userAgent + Date()),
      os: navigator.platform
    }

    this.props.login(data, () => {
      this.setState({login_id: '', password: ''})
      window.location.reload()
    })
  }

  handleInputOnChange = (e) => {
    const userData = {...this.state.userData}
    userData[e.target.name] = e.target.value
    this.setState({userData}, () => {
      console.log(this.state.userData);
    });
  }

  handlePostLogin = (e) => {
    console.log(88)
    e.preventDefault();
    const loginData = {
      ...this.state.loginData,
    }
    this.setState({loginData: loginData}, () => {
    })
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({isFormValidated: true})
    } else {
      this.setState({isSubmitting: true}, () => {
        const userData = {...this.state.userData}
        this.props.userLogin(userData, (isTrue) => {
          if (isTrue) {
            window.location.reload()
          } else {
            toast.error("Sorry! credential does not match.");
          }
        })
      })
    }
  };


  render() {
    if (userIsLoggedIn())
      return (<Redirect to={{pathname: '/'}}/>);

    return (
      <div className="auth-wrap">
        <div className="auth-container">
          <div className="auth-header">
            {!this.state.isForgetPassword ?
              <>
                <h4 className="auth-title">Login</h4>
                <p>to continue</p>
              </> :
              <>
                <h4 className="auth-title">Reset Password</h4>
                <p>Enter your registered email address</p>
              </>
            }
          </div>

          <div className="auth-body">
            {!this.state.isForgetPassword ?
              <>
                <Form
                  noValidate
                  validated={this.state.isFormValidated}
                  onSubmit={this.handlePostLogin}>
                  <Form.Group controlId="loginForm.email">
                    <Form.Label className="sr-only">Email</Form.Label>
                    <Form.Control type="email"
                                  required
                                  name={`email`}
                                  defaultValue={`user@gmail.com`}
                                  onChange={this.handleInputOnChange}
                                  placeholder="Email address"/>
                  </Form.Group>
                  <Form.Group controlId="loginForm.password">
                    <Form.Label className="sr-only">Password</Form.Label>
                    <Form.Control
                                  name={`password`}
                                  onChange={this.handleInputOnChange}
                                  defaultValue={`123456`}
                                  type={`password`}
                                  required placeholder="Password"/>
                  </Form.Group>
                  <Button variant="primary"
                          type={`submit`}
                          disabled={this.props.isSubmitting}
                          block>{this.props.isSubmitting ? 'Logging...' : 'login'}</Button>
                </Form>
              </>
              :
              <>
                <Form.Group controlId="loginForm.email">
                  <Form.Label className="sr-only">Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your registered email address"/>
                </Form.Group>
                <Button variant="primary" block>Reset Password</Button>
                <Button variant="link"
                        block><FiArrowLeft/> Back to Login</Button>

                <Button
                  type={`submit`}
                  variant="link"
                  disabled={this.state.isSubmitting}
                >{this.state.isSubmitting ? 'Submitting...' : 'Submit'}</Button>
              </>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isSubmitting: state.auth.isSubmitting,
    errMsg: state.auth.errMsg
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (data, cb) => dispatch(userLogin(data, cb)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);