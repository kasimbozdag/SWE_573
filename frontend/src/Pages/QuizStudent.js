import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import {
  getQuestions,
  getQuiz,
  createQuizRelation,
  getQuizRelations,
  getQuizRelation,
  createQuestionRelation
} from "../redux/actions/global";
class QuizStudent extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      index: 0,
      question: null,
      questions: [],
      answer: null,
      quizRelation: null
    };

    this.state = this.initialState;
  }
  componentDidMount() {
    this.props.dispatch(getQuiz(this.props.match.params.id)).then();
    this.props.dispatch(getQuestions(this.props.match.params.id)).then(() => {
      let { questions } = this.props.global;
      this.setState({ questions: questions });
    });
    this.props
      .dispatch(getQuizRelations(this.props.match.params.id))
      .then(() => {
        let { quizRelations } = this.props.global;
        this.setState({ quizRelations: quizRelations });
      });
  }
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      answer: value
    });
  };
  render() {
    let { quiz, quizRelations } = this.props.global;
    let { questions, question, quizRelation, index, answer } = this.state;
    console.log(this.state);
    return (
      <div className="d-flex align-items-center">
        {quiz ? (
          <div
            className="offset-md-1 row w-100 "
            style={{
              marginTop: 20
            }}
          >
            <div
              className="col-md-4"
              style={{
                background: "white",
                padding: 20,
                borderRadius: 25,

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
            <div className="col-md-2 text-center">
              {quizRelation ? (
                <div>
                  <h1
                    className="text-info"
                    style={{
                      fontSize: 64
                    }}
                  >
                    {index + 1}/{quiz.questions}
                  </h1>
                  <div
                    className="w-100 d-flex justify-content-around"
                    style={{
                      fontSize: 48
                    }}
                  >
                    <h1 className="text-success">{quizRelation.right}</h1>
                    <h1 className="text-danger">{quizRelation.wrong}</h1>
                  </div>
                </div>
              ) : (
                <button className="btn btn-info" onClick={this._startQuiz}>
                  Start Quiz
                </button>
              )}
            </div>
            <div
              className="col-md-4"
              style={{
                background: "white",
                padding: 20,
                borderRadius: 25
              }}
            >
              <div className="text-center font-weight-bold">
                <h4>Previous Quiz Attempt</h4>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <td>Attempt No</td>
                    <td>Date</td>
                    <td>Right</td>
                    <td>Wrong</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {quizRelations.map((item, i) => (
                    <tr key={"quizRelation" + i}>
                      <td>{i + 1}</td>
                      <td>{Moment(item.created_at).format("DD/MM/Y hh:mm")}</td>
                      <td>{item.right}</td>
                      <td>{item.wrong}</td>
                      <td className="text-center">
                        {quizRelation && quizRelation.id === item.id ? (
                          <div className="text-success">Current</div>
                        ) : item.completed ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={this._continueQuiz.bind(this, item.id)}
                          >
                            See the Quiz
                          </button>
                        ) : (
                          <button
                            className="btn btn-info btn-sm"
                            onClick={this._continueQuiz.bind(this, item.id)}
                          >
                            Continue Quiz
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {question ? (
              <div
                className="col-md-10 row"
                style={{
                  marginTop: 20
                }}
              >
                <div className="col-md-2 h-100 d-flex align-items-center">
                  {index ? (
                    <button
                      className="w-100 btn btn-primary"
                      onClick={this._preQ}
                    >
                      Previous
                    </button>
                  ) : null}
                </div>
                <div
                  className="col-md-8"
                  style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 25
                  }}
                >
                  <div style={{}}>
                    <div className="row" />
                    <div className="font-weight-bold">
                      <div>{question.description}</div>
                      {question.choices.map((choice, k) => (
                        <div key={"choice" + k} className="col-md-12">
                          {!quizRelation.answers[question.id] ? (
                            <div className="row h-100 f-flex align-items-center">
                              <div key={"raido" + k} className="h-100 d-flex">
                                <input
                                  type="radio"
                                  name={"answer" + question.id}
                                  value={choice.id}
                                  onChange={this.handleChange}
                                  checked={answer == choice.id}
                                />
                              </div>
                              <div key={"text" + k} className="col-md-10">
                                {choice.description}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="row h-100 f-flex align-items-center"
                              style={{
                                backgroundColor: choice.is_answer
                                  ? "green"
                                  : quizRelation.answers[question.id] ==
                                    choice.id
                                  ? "red"
                                  : "white"
                              }}
                            >
                              {console.log(choice.id, question.answer)}
                              <div key={"raido" + k} className="h-100 d-flex">
                                <input
                                  type="radio"
                                  name={"answer" + question.id}
                                  value={choice.id}
                                  onChange={this.handleChange}
                                  checked={
                                    quizRelation.answers[question.id] ==
                                    choice.id
                                  }
                                />
                              </div>
                              <div key={"text" + k} className="col-md-10">
                                {choice.description}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-2 h-100 d-flex align-items-center">
                  {index < questions.length - 1 ? (
                    <button
                      className="w-100 btn btn-primary"
                      onClick={this._nextQ}
                    >
                      Next
                    </button>
                  ) : quizRelation.completed ? null : (
                    <button
                      className="w-100 btn btn-success"
                      onClick={this._finishQ}
                    >
                      Finish
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
  _startQuiz = () => {
    let id = this.props.match.params.id;
    this.props.dispatch(createQuizRelation(id)).then(() => {
      let { questions } = this.state;
      let { quizRelation } = this.props.global;
      this.setState({
        question: questions[0],
        index: 0,
        quizRelation: quizRelation
      });
    });
  };
  _continueQuiz(id, e) {
    this.props.dispatch(getQuizRelation(id)).then(() => {
      let { questions } = this.state;
      let { quizRelation } = this.props.global;
      this.setState({
        question: questions[0],
        index: 0,
        quizRelation: quizRelation
      });
    });
  }
  _nextQ = () => {
    let { questions, index, question, answer, quizRelation } = this.state;

    let quiz = quizRelation.id;
    let id = question.id;
    console.log(quizRelation.answers[id], id);
    if (!quizRelation.answers[id] && answer)
      this.props
        .dispatch(createQuestionRelation({ quiz, answer }, id))
        .then(() => {
          let { quizRelation } = this.props.global;
          this.setState({
            quizRelation: quizRelation
          });
        });
    else
      this.setState({
        question: questions[index + 1],
        index: index + 1,
        answer: null
      });
  };
  _finishQ = () => {
    let { questions, index, question, answer, quizRelation } = this.state;

    let quiz = quizRelation.id;
    let id = question.id;
    console.log(quizRelation.answers[id], id);
    if (!quizRelation.answers[id] && answer)
      this.props
        .dispatch(createQuestionRelation({ quiz, answer }, id))
        .then(() => {
          let { quizRelation } = this.props.global;
          this.setState({
            quizRelation: quizRelation
          });
        });
  };
  _preQ = () => {
    let { questions, index } = this.state;
    this.setState({
      question: questions[index - 1],
      index: index - 1,
      answer: null
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
)(QuizStudent);
