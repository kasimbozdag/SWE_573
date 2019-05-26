import React, { Component } from "react";
import { getEnrolledCourses } from "../redux/actions/global";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class EnrolledCourses extends Component {
  componentDidMount() {
    this.props.dispatch(getEnrolledCourses()).then();
  }
  create_courses() {
    let { enrolledCourses } = this.props.global;
    if (!enrolledCourses || enrolledCourses.length === 0) return null;
    let elements = [];

    for (let i = 0; i < enrolledCourses.length; i++) {
      let content = enrolledCourses[i].course.description;
      let course = enrolledCourses[i].course;

      let course_link = "/course/" + course.id;
      let element = (
        <div
          className="col-md-3"
          key={i}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 25,
            margin: 20,
            height: 800
          }}
        >
          <div className="text-center font-weight-bold">
            <Link className="nav-link " to={course_link}>
              <h4>{course.title}</h4>
            </Link>
          </div>
          <div
            className="text-center"
            style={{
              height: 300,
              margin: 10
            }}
          >
            <img
              className="img-fluid rounded"
              src={content.file}
              style={{
                height: 300
              }}
            />
          </div>
          <div
            className="text-center"
            style={{
              height: 200,
              overflow: "hidden"
            }}
          >
            {content.text}
          </div>
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Enrolled</td>
                  <td>{course.enrolled}</td>
                </tr>
                <tr>
                  <td>Lessons</td>
                  <td>{course.lessons}</td>
                </tr>
                <tr>
                  <td>Quizzes</td>
                  <td>{course.quizzes}</td>
                </tr>
                <tr>
                  <td>Created By</td>
                  <td>{course.owner.username}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

      elements.push(element);
    }

    return elements;
  }
  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <div className="offset-md-1 row w-100 ">{this.create_courses()}</div>
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
)(EnrolledCourses);
