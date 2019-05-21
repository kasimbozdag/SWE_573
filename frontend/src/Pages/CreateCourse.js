import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { createCourse } from "../redux/actions/global";

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      file: "",
      title: "",
      text: "",
      filename: ""
    };

    this.state = this.initialState;
  }
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
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
    console.log("RENDER AUTH => ", global);
    if (global.courseCreated) {
      let id = global.payload.id;
      let url = "/course/" + id;
      return <Redirect to={url} />;
    }
    let error = null;
    let error_text = "";
    if (global.courseCreatedFailed) {
      let detail = global.payload.detail;

      for (var key in detail) {
        console.log(detail[key][0]);
        error_text += detail[key][0] + "\n";
      }
      error = <div className="text-danger">{error_text}</div>;
    }
    let { file, title, text, filename } = this.state;
    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-4 offset-md-4"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <h1 className="text-center">Create Course</h1>

              <form className="form">
                {error}
                <div className="col-md-12">
                  <input
                    className="form-control "
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    rows="6"
                    cols="50"
                    className="form-control "
                    type="text"
                    name="text"
                    placeholder="Description"
                    value={text}
                    onChange={this.handleChange}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  />
                </div>
                <div className="col-md-12">
                  <div className="custom-file">
                    <input
                      id="customFile"
                      className="custom-file-input"
                      type="file"
                      name="filename"
                      placeholder="File"
                      value={filename}
                      onChange={this.handleFileUpload}
                      style={{ marginTop: "10px", marginBottom: "15px" }}
                    />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                </div>

                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn-primary btn col-md-12"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                    onClick={this._doCreateCourse}
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
  _doCreateCourse = () => {
    let { file, title, text } = this.state;
    this.props
      .createCourse(file, title, text)
      .then(() => <Redirect to="/myCourses" />);
  };
}

const mapStateToProps = state => ({
  global: state.global
});

function bindAction(dispatch) {
  return {
    createCourse: (file, title, text) =>
      dispatch(createCourse({ file, title, text }))
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(CreateCourse);
