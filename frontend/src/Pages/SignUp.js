import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signup } from "../redux/actions/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: ""
    };

    this.state = this.initialState;
  }
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  render() {
    const { auth } = this.props;
    console.log("RENDER AUTH => ", auth);
    if (auth.signUpCompleted) {
      return <Redirect to="/login" />;
    }
    let error = null;
    let error_text = "";
    if (auth.signUpFailed) {
      let detail = auth.payload.detail;

      for (var key in detail) {
        console.log(detail[key][0]);
        error_text += detail[key][0] + "\n";
      }
      error = <div className="text-danger">{error_text}</div>;
    }
    let { username, password, email, first_name, last_name } = this.state;
    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-4 offset-md-4"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <h1 className="text-center">Sign Up</h1>

              <form className="form">
                {error}
                <div className="col-md-12">
                  <input
                    className="form-control "
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control "
                    type="text"
                    name="first_name"
                    placeholder="Name"
                    value={first_name}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control "
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control "
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <Link to="/login">Login</Link>
                </div>
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn-primary btn col-md-12"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                    onClick={this._doSignUp}
                  >
                    Submit
                  </button>
                  <div className="clearfix" />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  _doSignUp = () => {
    let { username, password, email, first_name, last_name } = this.state;
    this.props
      .signup(username, password, email, first_name, last_name)
      .then(() => <Redirect to="/login" />);
  };
}

const mapStateToProps = state => ({
  auth: state.auth
});

function bindAction(dispatch) {
  return {
    signup: (username, password, email, first_name, last_name) =>
      dispatch(signup({ username, password, email, first_name, last_name }))
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SignUp);
