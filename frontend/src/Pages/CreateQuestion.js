import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  createQuestion,
  getQuestion,
  editQuestion
} from "../redux/actions/global";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      choices: [],
      question: "",
      title: "Create"
    };

    this.state = this.initialState;
  }
  componentDidMount() {
    let { path, params } = this.props.match;
    if (path === "/editquestion/:id") {
      this.props.dispatch(getQuestion(params.id)).then(() => {
        let { question } = this.props.global;
        let id = params.id;

        if (question !== null && question.id == id) {
          this.setState({
            ["question"]: question.description,
            ["title"]: "Edit"
          });

          question.choices.map((item, i) => {
            this.state.choices.push({
              ["text"]: item.description,
              is_answer: false,
              id: item.id
            });
            this.setState({
              [i]: item.description
            });
            if (item.is_answer) {
              let { choices } = this.state;
              choices[i] = { ...choices[i], is_answer: true };
              this.setState({
                ["is_answer"]: i,
                choices: choices
              });
            }
          });
        }
      });
    }
  }
  handleChange = event => {
    const { name, value } = event.target;
    let { choices } = this.state;
    if (name === "is_answer") {
      choices.map((item, i) => {
        choices[i] = { ...choices[i], is_answer: false };
      });
      choices[value] = { ...choices[value], is_answer: true };
    } else choices[name] = { ...choices[name], text: value };
    this.setState({
      choices: choices,
      [name]: value
    });
  };
  handleFileUpload = event => {
    const file = event.target.files[0];
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      ["file"]: file
    });
  };
  render() {
    const { global } = this.props;

    if (global.questionCreated) {
      let id = global.payload.quiz;
      let url = "/quiz/" + id;
      return <Redirect to={url} />;
    }
    let error = null;
    let error_text = "";
    if (global.questionCreatedFailed) {
      let detail = global.payload.detail;

      for (var key in detail) {
        console.log(detail[key][0]);
        error_text += detail[key][0] + "\n";
      }
      error = <div className="text-danger">{error_text}</div>;
    }
    let { choices, question, title } = this.state;
    console.log(choices);
    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-6 offset-md-3"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <h1 className="text-center">{title} Question</h1>

              <form className="form">
                {error}

                <div className="col-md-10">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={this.onAddItem}
                  >
                    <i className="fa fa-plus " /> Choice
                  </button>
                  <input
                    className="form-control "
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={question}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                {choices.map((item, i) => (
                  <div key={"choice" + i} className="col-md-12">
                    <div className="row h-100 f-flex align-items-center">
                      <div key={"text" + i} className="col-md-10">
                        <input
                          className="form-control "
                          type="text"
                          name={i}
                          placeholder="Choice"
                          value={item["text"]}
                          onChange={this.handleChange}
                          style={{ marginTop: "10px", marginBottom: "15px" }}
                        />
                      </div>
                      <div key={"raido" + i} className="col-md-2 h-100 d-flex">
                        <input
                          type="radio"
                          name="is_answer"
                          value={i}
                          checked={item.is_answer}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-md-10">
                  <button
                    type="button"
                    className="btn-primary btn col-md-12"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                    onClick={this._doCreate}
                  >
                    Submit
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

  onChangeValue = event => {
    this.setState({ [event.target.key]: event.target.value });
  };

  onAddItem = () => {
    let { choices } = this.state.choices.push({
      ["text"]: "",
      is_answer: false
    });
    this.setState({
      value: ""
    });
    //console.log(this.state.choices);
  };

  _doCreate = () => {
    let id = this.props.match.params.id;
    let { path, params } = this.props.match;
    let { choices, question } = this.state;

    if (path === "/editquestion/:id")
      this.props.dispatch(editQuestion({ choices, question, id }));
    else this.props.dispatch(createQuestion({ choices, question, id }));
  };
}

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  null
)(CreateQuestion);
