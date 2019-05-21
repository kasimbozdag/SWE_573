import React, { Component } from "react";
import { getMyCourses } from "../redux/actions/global";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class MyCourses extends Component {
  componentDidMount() {
    this.props.dispatch(getMyCourses()).then();
  }
  create_courses() {
    let { myCourses } = this.props.global;
    console.log("my Courses");
    console.log(this.props);
    let elements = [];

    for (let i = 0; i < myCourses.length; i++) {
      let content = myCourses[i].description;
      let course_link = "/course/" + myCourses[i].id;
      let element = (
        <tr>
          <td>
            <div className="text-center font-weight-bold">
              <Link className="nav-link " to={course_link}>
                <h4>{myCourses[i].title}</h4>
              </Link>
            </div>
          </td>
        </tr>
      );

      elements.push(element);
    }

    return elements;
  }
  render() {
    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-4 offset-md-4"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <table
                className="table"
                style={{ background: "white", padding: 20, borderRadius: 25 }}
              >
                <tbody>{this.create_courses()}</tbody>
              </table>
              <div className="text-center">
                <Link className="btn btn-success" to="/create_course">
                  Create new Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  null
)(MyCourses);
