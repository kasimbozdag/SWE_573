import React, { Component } from "react";
import {
  getCourse,
  deactivateCourse,
  activateCourse,
  enrollCourse,
  dropCourse,
  getAuthCourse,
  getLessons,
  getMyLessons
} from "../redux/actions/global";
import { connect } from "react-redux";
import Moment from "moment";
import { API_URL } from "../redux/configureStore";
import { Link, Redirect } from "react-router-dom";
class Course extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.auth.token) {
      this.props.dispatch(getAuthCourse(this.props.match.params.id)).then();
      this.props.dispatch(getLessons(this.props.match.params.id)).then();
      this.props.dispatch(getMyLessons(this.props.match.params.id)).then();
    } else {
      this.props.dispatch(getCourse(this.props.match.params.id)).then();
    }
  }
  create_courses() {
    let { course } = this.props.global;

    if (course === null) return null;
    let i = this.props.match.params.id;

    let content = course.description;
    let img_url = API_URL + content.file;
    let element = (
      <div
        className="col-md-10"
        key={i}
        style={{
          background: "white",
          padding: 20,
          borderRadius: 25,
          margin: 20,
          height: 440
        }}
      >
        <div className="row">
          <div
            className="text-center col-md-3"
            style={{
              height: 400,
              padding: 10
            }}
          >
            <img
              className="img-fluid rounded"
              src={img_url}
              style={{
                height: 380
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="text-center font-weight-bold">
              <h4>{course.title}</h4>
            </div>
            <div
              className="text-center"
              style={{
                height: 400,
                overflow: "hidden"
              }}
            >
              {content.text}
            </div>
          </div>
          <div className="col-md-3">
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
                <tr>
                  <td>Number of Visits</td>
                  <td>{course.number_of_visits}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{Moment(course.created_at).format("DD/MM/Y hh:mm")}</td>
                </tr>
                <tr>
                  <td>Prerequisite</td>
                  <td>{course.prerequisite}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return element;
  }
  get_actions() {
    let { course } = this.props.global;
    let { user, username } = this.props.auth;
    if (course === null) return null;
    let edit_url = "/course_edit/" + course.id;
    let elements = [];
    if (username !== null && course.owner.username === username) {
      console.log("course is active" + course.is_active);
      if (course.is_active) {
        let element = (
          <div
            key="deac"
            style={{
              padding: 10
            }}
          >
            <button className="btn btn-danger" onClick={this._doDeactivate}>
              Deactivate
            </button>
          </div>
        );
        elements.push(element);
      } else {
        let element = (
          <div
            style={{
              padding: 10
            }}
            key="ac"
          >
            <button className="btn btn-success" onClick={this._doActivate}>
              Activate
            </button>
          </div>
        );
        elements.push(element);
      }
      if (course.prerequisite !== null) {
        let element = (
          <div
            key="pre"
            style={{
              padding: 10
            }}
          >
            <button className="btn btn-danger">Lift the Prerequisite</button>
          </div>
        );
        elements.push(element);
      } else {
        let element = (
          <div
            key="depre"
            style={{
              padding: 10
            }}
          >
            <button className="btn btn-success">Add Prerequisite</button>
          </div>
        );
        elements.push(element);
      }
      let element = (
        <div
          key="edit"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={edit_url}>
            Edit
          </Link>
        </div>
      );
      elements.push(element);
      let add_lesson_url = "/createlesson/" + course.id;
      element = (
        <div
          key="addLesson"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={add_lesson_url}>
            Add Lesson
          </Link>
        </div>
      );
      elements.push(element);
    }
    if (username !== null && course.owner.username !== username) {
      if (course.enroll) {
        let element = (
          <div
            key="drop"
            style={{
              padding: 10
            }}
          >
            <button className="btn btn-danger" onClick={this._doDrop}>
              Drop
            </button>
          </div>
        );
        elements.push(element);
      } else {
        let element = (
          <div
            style={{
              padding: 10
            }}
            key="en"
          >
            <button className="btn btn-success" onClick={this._doEnroll}>
              Enroll
            </button>
          </div>
        );
        elements.push(element);
      }
    }
    if (username === null) {
      return (
        <div
          className="col-md-10 text-center"
          key="1"
          style={{
            background: "white",
            padding: 20,
            borderRadius: 25,
            margin: 20
          }}
        >
          <h3>You have to be LOGGED IN in order to enroll</h3>
        </div>
      );
    }
    return (
      <div
        className=""
        key="1"
        style={{
          padding: 20,
          borderRadius: 25,
          margin: 20,
          height: 440
        }}
      >
        {elements}
      </div>
    );
  }
  getLessons() {
    let { course } = this.props.global;
    let { username } = this.props.auth;
    let id = this.props.match.params.id;

    if (course === null || course.id != id) return null;
    console.log(course.owner.username, username);
    if (!course.enroll && course.owner.username !== username) {
      return (
        <div
          className="col-md-10 text-center"
          key="1"
          style={{
            background: "white",
            padding: 20,
            borderRadius: 25,
            margin: 20
          }}
        >
          <h3>You have to be ENROLLED to see lessons</h3>
        </div>
      );
    } else {
      let { lessons } = this.props.global;
      console.log(lessons);
      let elements = [];

      for (let i = 0; i < lessons.length; i++) {
        let content = lessons[i].description;
        let lesson = lessons[i];

        let lesson_link = "/lesson/" + lessons[i].id;
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
              <Link className="nav-link " to={lesson_link}>
                <h4>{lessons[i].title}</h4>
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
                    <td>Place</td>
                    <td>{lessons[i].place}</td>
                  </tr>
                  <tr>
                    <td>Contents</td>
                    <td>{lessons[i].contents}</td>
                  </tr>
                  <tr>
                    <td>Created By</td>
                    <td>{lessons[i].owner.username}</td>
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
  }
  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <div className="offset-md-1 row w-100 ">
            {this.create_courses()}
            {this.get_actions()}
            {this.getLessons()}
          </div>
        </div>
      </React.Fragment>
    );
  }
  _doDeactivate = () => {
    this.props.dispatch(deactivateCourse(this.props.match.params.id)).then();
  };
  _doActivate = () => {
    this.props.dispatch(activateCourse(this.props.match.params.id)).then();
  };
  _doEnroll = () => {
    this.props.dispatch(enrollCourse(this.props.match.params.id)).then();
  };
  _doDrop = id => {
    this.props
      .dispatch(
        dropCourse(this.props.global.course.enroll, this.props.match.params.id)
      )
      .then();
  };
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Course);
