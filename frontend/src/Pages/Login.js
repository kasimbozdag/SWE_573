import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../redux/actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: "",
      password: ""
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

    let { username, password } = this.state;
    let error = null;
    if (auth.loginCompleted) {
      return <Redirect to="/" />;
    }
    if (auth.loginFailed) {
      error = (
        <div className="text-danger">
          {auth.payload.detail.non_field_errors[0]}
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-4 offset-md-4"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <h1 className="text-center">Login</h1>

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
                  <Link to="/signup">Sign Up</Link>
                </div>
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn-primary btn col-md-12"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                    onClick={this._doLogin}
                  >
                    Login
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
  _doLogin = () => {
    let { username, password } = this.state;
    this.props.login(username, password).then(() => <Redirect to="/" />);
    console.log(this.props);
  };
}

const mapStateToProps = state => ({
  auth: state.auth
});

function bindAction(dispatch) {
  return {
    login: (username, password) => dispatch(login({ username, password }))
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(Login);
