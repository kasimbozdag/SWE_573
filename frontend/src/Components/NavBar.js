import React, { Component } from "react";
import Logo from "../Static/Logo.jpg";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logOut } from "../redux/actions/auth";
class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  _doLogOut = () => {
    this.props.dispatch(logOut());
  };
  render() {
    const { username } = this.props.auth;
    let right = (
      <Link className="text-light" to="/login">
        Login
      </Link>
    );
    let myC = null;
    let myE = null;
    if (username) {
      right = (
        <button className="btn btn-link text-light" onClick={this._doLogOut}>
          Log Out
        </button>
      );
      myC = (
        <li className="nav-item active">
          <Link className="nav-link " to="/mycourses">
            My Courses
          </Link>
        </li>
      );
      myE = (
        <li className="nav-item active">
          <Link className="nav-link " to="/EnrolledCourses">
            Enrolled Courses
          </Link>
        </li>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <img src={Logo} alt="Smiley face" height="42" width="42" />

        <Link className="navbar-brand" to="/">
          KnowledgeBs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>
            {myC}
            {myE}
            {username ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/create_course">
                  Create new Course
                </Link>
              </li>
            ) : null}
          </ul>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          {right}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(NavBar);
