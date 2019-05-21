import React, { Component } from "react";
import {
  getQuiz,
  deactivateQuiz,
  activateQuiz,
  enrollCourse,
  dropCourse,
  getAuthCourse,
  getQuestions,
  getMyLessons
} from "../redux/actions/global";
import { connect } from "react-redux";
import Moment from "moment";
import { API_URL } from "../redux/configureStore";
import { Link, Redirect } from "react-router-dom";
class Quiz extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getQuiz(this.props.match.params.id)).then();
    this.props.dispatch(getQuestions(this.props.match.params.id)).then();
    if (this.props.auth.token) {
      this.props.dispatch(getMyLessons(this.props.match.params.id)).then();
    }
  }
  create_courses() {
    let { quiz } = this.props.global;

    if (quiz === null) return null;
    let i = this.props.match.params.id;

    let element = (
      <div
        className="col-md-4"
        key={i}
        style={{
          background: "white",
          padding: 20,
          borderRadius: 25,
          margin: 20,
          height: 240
        }}
      >
        <div className="text-center font-weight-bold">
          <h4>{quiz.lesson} Quiz</h4>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <td>Questions</td>
              <td>{quiz.questions}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{Moment(quiz.created_at).format("DD/MM/Y hh:mm")}</td>
            </tr>
            <tr>
              <td>Prerequisite</td>
              <td>{quiz.prerequisite}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return element;
  }
  get_actions() {
    let { quiz } = this.props.global;
    let { user, username } = this.props.auth;
    if (quiz === null) return null;

    let elements = [];
    let element = null;
    if (username !== null) {
      console.log("quiz is active" + quiz.is_active);
      if (quiz.is_active) {
        let element = (
          <div
            key="deac1"
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

      elements.push(element);
      let add_lesson_url = "/createquestion/" + quiz.id;
      element = (
        <div
          key="addLesson"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={add_lesson_url}>
            Add Question
          </Link>
        </div>
      );
      elements.push(element);
    }

    if (username === null) {
      return null;
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
    let { quiz } = this.props.global;
    let { username } = this.props.auth;
    let id = this.props.match.params.id;

    if (quiz === null || quiz.id != id) return null;

    if (!username) {
      return null;
    } else {
      let { questions } = this.props.global;

      let elements = [];

      for (let i = 0; i < questions.length; i++) {
        let content = questions[i].description;
        let lesson = questions[i];

        let lesson_link = "/question/" + questions[i].id;
        let f = null;
        if (content.file)
          f = (
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
          );
        let element = (
          <div
            className="col-md-3"
            key={i}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 25,
              margin: 20,
              height: 400
            }}
          >
            <div className="text-center font-weight-bold">
              <Link className="nav-link " to={lesson_link}>
                <h4>{content.sub_title}</h4>
                {f}
                <div
                  className="text-center"
                  style={{
                    height: 200,
                    overflow: "hidden"
                  }}
                >
                  {content.text}
                </div>
                {f}
              </Link>
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
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="offset-md-1 row w-100 ">{this.getLessons()}</div>
        </div>
      </React.Fragment>
    );
  }
  _doDeactivate = () => {
    this.props.dispatch(deactivateQuiz(this.props.match.params.id)).then();
  };
  _doActivate = () => {
    this.props.dispatch(activateQuiz(this.props.match.params.id)).then();
  };
  _doEnroll = () => {
    //this.props.dispatch(enrollQuiz(this.props.match.params.id)).then();
  };
  _doDrop = id => {
    /*this.props
      .dispatch(
        dropQuiz(this.props.global.course.enroll, this.props.match.params.id)
      )
      .then();*/
  };
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Quiz);
