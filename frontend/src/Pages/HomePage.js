import React, { Component } from "react";
import { getCourses } from "../redux/actions/global";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getCourses()).then();
  }
  create_courses() {
    let { courses } = this.props.global;

    let elements = [];

    for (let i = 0; i < courses.length; i++) {
      let content = courses[i].description;
      let course_link = "/course/" + courses[i].id;
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
              <h4>{courses[i].title}</h4>
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
                  <td>{courses[i].enrolled}</td>
                </tr>
                <tr>
                  <td>Lessons</td>
                  <td>{courses[i].lessons}</td>
                </tr>
                <tr>
                  <td>Quizzes</td>
                  <td>{courses[i].quizzes}</td>
                </tr>
                <tr>
                  <td>Created By</td>
                  <td>{courses[i].owner.username}</td>
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
)(HomePage);
