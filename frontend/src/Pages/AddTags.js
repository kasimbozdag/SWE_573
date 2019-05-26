import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getWikitags, addWikitags } from "../redux/actions/global";

class AddTags extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      tags: [],
      keyword: "",
      selectedTags: []
    };

    this.state = this.initialState;
  }

  handleChange = event => {
    const { name, value, checked } = event.target;
    if (name === "checkbox") {
      if (checked) {
        this.state.selectedTags.push(value);
      } else {
        const selectedTags = this.state.selectedTags.filter(
          item => item !== value
        );
        this.setState({ selectedTags: selectedTags });
      }
      console.log(name, value, checked);
    }

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
    let { keyword, tags, selectedTags } = this.state;
    console.log(selectedTags);

    return (
      <React.Fragment>
        <div className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div
              className="col-md-6 offset-md-3"
              style={{ background: "white", padding: 20, borderRadius: 25 }}
            >
              <h1 className="text-center">Get wiki tags</h1>

              <form className="form">
                {error}

                <div className="col-md-12">
                  <div
                    className="row"
                    style={{
                      paddingBottom: 20
                    }}
                  >
                    <div className="col-md-10">
                      <input
                        className="form-control "
                        type="text"
                        name="keyword"
                        placeholder="keyword"
                        value={keyword}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn-primary btn"
                        onClick={this._doGetTags}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                {tags.length ? (
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <td />
                          <td>Label</td>
                          <td>Describtion</td>
                        </tr>
                      </thead>
                      <tbody>
                        {tags.map((item, i) => (
                          <tr key={"row" + i}>
                            <td className="h-100 f-flex align-items-cente">
                              <input
                                type="checkbox"
                                name="checkbox"
                                value={i}
                                onChange={this.handleChange}
                              />
                            </td>
                            <td>{item.label}</td>
                            <td>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
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

  _doCreate = () => {
    let { tags, selectedTags } = this.state;
    let { id, type } = this.props.match.params;
    let data = [];
    selectedTags.map(item => {
      let tag = {
        url: tags[item].concepturi,
        label: tags[item].label,
        description: tags[item].description
      };
      data.push(tag);
    });
    console.log(data);
    this.props.dispatch(addWikitags({ data, id, type })).then(() => {
      let url = "/" + type + "/" + id;
      this.props.history.push(url);
    });
  };
  _doGetTags = () => {
    let { keyword } = this.state;

    this.props.dispatch(getWikitags(keyword)).then(() => {
      let tags = this.props.global.wikitags;
      this.setState({
        tags: tags
      });
    });
  };
}

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  null
)(AddTags);
