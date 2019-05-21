import React, { Component } from "react";
import {
  getQuestion,
  deactivateQuestion,
  activateQuestion,
  getChoices,
  getMyContents,
  next,
  pre,
  createQuiz
} from "../redux/actions/global";
import { connect } from "react-redux";
import Moment from "moment";
import { API_URL } from "../redux/configureStore";
import { Link, Redirect } from "react-router-dom";
class Question extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      index: 0
    };

    this.state = this.initialState;
  }
  componentDidMount() {
    this.props.dispatch(getQuestion(this.props.match.params.id)).then();
    if (this.props.auth.token) {
      this.props.dispatch(getChoices(this.props.match.params.id)).then();
    } else {
      this.props.dispatch(getQuestion(this.props.match.params.id)).then();
    }
  }
  get_lesson() {
    let { question, choices } = this.props.global;

    if (question === null) return null;
    let i = this.props.match.params.id;

    let content = question.description;
    let img_url = API_URL + content.file;
    let element = (
      <div
        className="col-md-9"
        key={i}
        style={{
          background: "white",
          padding: 20,
          borderRadius: 25,
          margin: 20
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
              <h4>{content.sub_title}</h4>
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
                  <td>Choices</td>
                  <td>{choices.length}</td>
                </tr>
                <tr>
                  <td>Tried</td>
                  <td>{question.answers.total}</td>
                </tr>
                <tr>
                  <td>Correct</td>
                  <td>{question.answers.right}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{Moment(question.created_at).format("DD/MM/Y hh:mm")}</td>
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
    let { question } = this.props.global;
    let { user, username } = this.props.auth;
    if (question === null) return null;
    let edit_url = "/question_edit/" + question.id;
    let elements = [];
    if (username !== null) {
      let element = null;
      if (question.is_active) {
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

      element = (
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
      let add_content_url = "/createchoice/" + question.id;
      element = (
        <div
          key="addContent"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={add_content_url}>
            Add Choice
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
        className="text-center"
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
  getContents() {
    let { question } = this.props.global;
    let { username } = this.props.auth;
    let id = this.props.match.params.id;

    if (question === null || question.id != id) return null;

    if (!username) {
      return null;
    } else if (username) {
      let { choices } = this.props.global;

      let elements = [];
      let contents = choices;
      for (let i = 0; i < contents.length; i++) {
        let content = contents[i].description;

        let lesson_link = "/content/" + contents[i].id;
        let content_link = "/content_edit/" + contents[i].id;
        let element = (
          <div
            className="col-md-9"
            key={i}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 25,
              margin: 20,
              maxHeight: 400
            }}
          >
            <div className="text-center font-weight-bold">
              <h4>{content.sub_title}</h4>
            </div>
            <div
              className="text-center"
              style={{
                maxHeight: 300,
                margin: 10
              }}
            >
              <img
                className="img-fluid rounded"
                src={content.file}
                style={{
                  maxHeight: 300
                }}
              />
            </div>
            <div
              className="text-center"
              style={{
                maxHeight: 200,
                overflow: "hidden"
              }}
            >
              {content.text}
            </div>

            <div className="text-center">
              <Link className="btn btn-primary" to={content_link}>
                Edit
              </Link>
            </div>
          </div>
        );

        elements.push(element);
      }

      return elements;
    } else {
      let { content, contents, index } = this.props.global;

      if (contents.length === 0) return null;
      if (content === null) content = contents[index];
      let i = this.props.match.params.id;

      content = content.content;
      let img_url = content.file;
      let next = null;
      if (index + 1 < contents.length)
        next = (
          <button className="btn btn-primary" onClick={this._doNext}>
            Next
          </button>
        );
      let pre = null;
      if (index > 0)
        pre = (
          <button className="btn btn-primary" onClick={this._doPrevious}>
            Previous
          </button>
        );
      let element = (
        <div
          className="col-md-9"
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
                <h4>{content.sub_title}</h4>
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
              <div className="row">
                <div className="col-md-6">{pre}</div>
                <div className="col-md-2">{next}</div>
              </div>
            </div>
          </div>
        </div>
      );

      return element;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <div className="offset-md-1 row w-100 ">
            {this.get_lesson()}
            {this.get_actions()}
            {this.getContents()}
          </div>
        </div>
      </React.Fragment>
    );
  }
  _doDeactivate = () => {
    this.props.dispatch(deactivateQuestion(this.props.match.params.id)).then();
  };
  _doActivate = () => {
    this.props.dispatch(activateQuestion(this.props.match.params.id)).then();
  };
  _doNext = () => {
    this.props.dispatch(next());
  };
  _doPrevious = () => {
    this.props.dispatch(pre());
  };
  _createQuiz = () => {
    this.props.dispatch(createQuiz(this.props.match.params.id)).then();
  };
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Question);
