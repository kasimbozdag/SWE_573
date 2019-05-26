import React, { Component } from "react";
import {
  getQuiz,
  deactivateQuiz,
  activateQuiz,
  activateQuestion,
  deactivateQuestion,
  dropCourse,
  getAuthCourse,
  getMyQuestions,
  getMyLessons
} from "../redux/actions/global";
import { connect } from "react-redux";
import Moment from "moment";
import { API_URL } from "../redux/configureStore";
import { Link, Redirect } from "react-router-dom";
import { isTemplateElement } from "@babel/types";
class Quiz extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getQuiz(this.props.match.params.id)).then();
    this.props.dispatch(getMyQuestions(this.props.match.params.id)).then();
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
    if (username !== null && username === quiz.owner.username) {
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
          margin: 20
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

    if (!username || username !== quiz.owner.username) {
      return null;
    } else {
      let { questions } = this.props.global;

      let elements = questions.map((item, i) => (
        <div
          className="col-md-8"
          key={i}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 25,
            marginBottom: 20
          }}
        >
          <div style={{}}>
            <div className="row">
              <div
                key="edit"
                style={{
                  padding: 5
                }}
              >
                <Link
                  className="btn btn-primary btn-sm"
                  to={"/editquestion/" + item.id}
                >
                  Edit
                </Link>
              </div>
              {item.is_active ? (
                <div
                  key="deac"
                  style={{
                    padding: 5
                  }}
                >
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this._doDeactivateQ.bind(this, item.id)}
                  >
                    Deactivate
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    padding: 5
                  }}
                  key="ac"
                >
                  <button
                    className="btn btn-success btn-sm"
                    onClick={this._doActivateQ.bind(this, item.id)}
                  >
                    Activate
                  </button>
                </div>
              )}
            </div>
            <div className="font-weight-bold">
              <div>{item.description}</div>
              {item.choices.map((choice, k) => (
                <div key={"choice" + k} className="col-md-12">
                  <div className="row h-100 f-flex align-items-center">
                    <div key={"raido" + k} className="h-100 d-flex">
                      <input
                        type="radio"
                        name={"answer" + i + k}
                        value={k}
                        checked={choice.is_answer}
                        readOnly
                      />
                    </div>
                    <div key={"text" + k} className="col-md-10">
                      {choice.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ));

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
        <div className="d-flex ">
          <div className="offset-md-1 row w-100 ">{this.getLessons()}</div>
        </div>
      </React.Fragment>
    );
  }
  _doDeactivate = () => {
    this.props.dispatch(deactivateQuiz(this.props.match.params.id)).then();
  };
  _doActivate = () => {
    this.props
      .dispatch(activateQuiz(this.props.match.params.id))
      .then(res =>
        this.props.dispatch(getMyQuestions(this.props.match.params.id))
      );
  };
  _doDeactivateQ(id, e) {
    this.props
      .dispatch(deactivateQuestion(id))
      .then(res =>
        this.props.dispatch(getMyQuestions(this.props.match.params.id))
      );
  }
  _doActivateQ(id, e) {
    console.log(id);
    this.props
      .dispatch(activateQuestion(id))
      .then(res =>
        this.props.dispatch(getMyQuestions(this.props.match.params.id))
      );
  }
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Quiz);
