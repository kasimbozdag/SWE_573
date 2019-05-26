import React, { Component } from "react";
import {
  getLesson,
  deactivateLesson,
  activateLesson,
  getContents,
  getMyContents,
  next,
  pre,
  createQuiz
} from "../redux/actions/global";
import { connect } from "react-redux";
import Moment from "moment";
import { API_URL } from "../redux/configureStore";
import { Link, Redirect } from "react-router-dom";
class Lesson extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      index: 0
    };

    this.state = this.initialState;
  }
  componentDidMount() {
    this.props.dispatch(getLesson(this.props.match.params.id)).then();
    if (this.props.auth.token) {
      this.props.dispatch(getContents(this.props.match.params.id)).then();
      this.props.dispatch(getMyContents(this.props.match.params.id)).then();
    } else {
      this.props.dispatch(getLesson(this.props.match.params.id)).then();
    }
  }
  get_lesson() {
    console.log(this.props.global);
    let { lesson } = this.props.global;

    if (lesson === null) return null;
    let i = this.props.match.params.id;

    let content = lesson.description;
    let img_url = API_URL + content.file;
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
              <h4>{lesson.title}</h4>
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
                  <td>Contents</td>
                  <td>{lesson.contents}</td>
                </tr>
                <tr>
                  <td>Place</td>
                  <td>{lesson.place}</td>
                </tr>
                <tr>
                  <td>Created By</td>
                  <td>{lesson.owner.username}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{Moment(lesson.created_at).format("DD/MM/Y hh:mm")}</td>
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
    let { lesson } = this.props.global;
    let { user, username } = this.props.auth;
    if (lesson === null) return null;
    let edit_url = "/lesson_edit/" + lesson.id;
    let elements = [];
    if (username !== null && lesson.owner.username === username) {
      console.log("lesson is active" + lesson.is_active);
      let element = null;
      if (lesson.is_active) {
        element = (
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
        element = (
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
      if (lesson.prerequisite !== null) {
        element = (
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
        element = (
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
      let add_content_url = "/createcontent/" + lesson.id;
      element = (
        <div
          key="addContent"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={add_content_url}>
            Add Content
          </Link>
        </div>
      );
      elements.push(element);

      if (!lesson.quiz) {
        let element = (
          <div
            key="quiz"
            style={{
              padding: 10
            }}
          >
            <button className="btn btn-primary " onClick={this._createQuiz}>
              Create Quiz
            </button>
          </div>
        );
        elements.push(element);
      } else {
        let quiz_url = "/quiz/" + lesson.quiz;
        let element = (
          <div
            key="quiz"
            style={{
              padding: 10
            }}
          >
            <Link className="btn btn-primary " to={quiz_url}>
              Quiz
            </Link>
          </div>
        );
        elements.push(element);
      }
    } else if (username && lesson.quiz) {
      let quiz_url = "/Student_quiz/" + lesson.quiz;
      let element = (
        <div
          key="quiz"
          style={{
            padding: 10
          }}
        >
          <Link className="btn btn-primary " to={quiz_url}>
            Quiz
          </Link>
        </div>
      );
      elements.push(element);
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
          <h3>You have to be LOGGED IN in order to see content</h3>
        </div>
      );
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
    let { lesson } = this.props.global;
    let { username } = this.props.auth;
    let id = this.props.match.params.id;

    if (lesson === null || lesson.id != id) return null;
    console.log(lesson.owner.username, username);
    if (!username) {
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
          <h3>You have to be Login to see contents</h3>
        </div>
      );
    } else if (lesson.owner.username === username) {
      let { contents } = this.props.global;
      console.log(contents);
      let elements = [];

      for (let i = 0; i < contents.length; i++) {
        let content = contents[i].content;

        let lesson_link = "/content/" + contents[i].id;
        let content_link = "/content_edit/" + contents[i].id;
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
                <h4>{content.sub_title}</h4>
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
                    <td>{contents[i].place}</td>
                  </tr>
                </tbody>
              </table>
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
            marginLeft: 20,
            borderRadius: 25
          }}
        >
          <div
            style={{
              margin: 10
            }}
          >
            <div className="row">
              <div className="text-center col-md-3">
                <img
                  className="img-fluid rounded"
                  src={img_url}
                  style={{
                    height: 380
                  }}
                />
              </div>
              <div className="col-md-9">
                <div
                  className="text-center font-weight-bold"
                  style={{
                    height: 30,
                    overflow: "hidden"
                  }}
                >
                  <h4>{content.sub_title}</h4>
                </div>
                <div
                  className="text-center"
                  style={{
                    height: 380,
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
    this.props.dispatch(deactivateLesson(this.props.match.params.id)).then();
  };
  _doActivate = () => {
    this.props.dispatch(activateLesson(this.props.match.params.id)).then();
  };
  _doNext = () => {
    this.props.dispatch(next());
  };
  _doPrevious = () => {
    this.props.dispatch(pre());
  };
  _createQuiz = () => {
    this.props.dispatch(createQuiz(this.props.match.params.id)).then(() => {
      let { id } = this.props.global.payload;
      let url = "/quiz/" + id;
      this.props.history.push(url);
    });
  };
}

const mapStateToProps = state => ({
  global: state.global,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Lesson);
