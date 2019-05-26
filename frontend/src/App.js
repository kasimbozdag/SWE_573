import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import MyCourses from "./Pages/MyCourses";
import Course from "./Pages/Course";
import EnrolledCourses from "./Pages/EnrolledCourses";
import CreateCourse from "./Pages/CreateCourse";
import EditCourse from "./Pages/EditCourse";
import CreateLesson from "./Pages/CreateLesson";
import Lesson from "./Pages/Lesson";
import EditLesson from "./Pages/EditLesson";
import CreateContent from "./Pages/CreateContent";
import EditContent from "./Pages/EditContent";
import Quiz from "./Pages/Quiz";
import CreateQuestion from "./Pages/CreateQuestion";
import NavBar from "./Components/NavBar";
import Question from "./Pages/Question";
import CreateChoice from "./Pages/CreateChoice";
import AddTags from "./Pages/AddTags";
import QuizStudent from "./Pages/QuizStudent";
import Footer from "./Components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/myCourses" component={MyCourses} />
          <Route exact path="/course/:id" component={Course} />
          <Route exact path="/EnrolledCourses" component={EnrolledCourses} />
          <Route exact path="/create_course" component={CreateCourse} />
          <Route exact path="/course_edit/:id" component={EditCourse} />
          <Route exact path="/createlesson/:id" component={CreateLesson} />
          <Route exact path="/lesson/:id" component={Lesson} />
          <Route exact path="/lesson_edit/:id" component={EditLesson} />
          <Route exact path="/createcontent/:id" component={CreateContent} />
          <Route exact path="/content_edit/:id" component={EditContent} />
          <Route exact path="/quiz/:id" component={Quiz} />
          <Route exact path="/createquestion/:id" component={CreateQuestion} />
          <Route exact path="/editquestion/:id" component={CreateQuestion} />
          <Route exact path="/question/:id" component={Question} />
          <Route exact path="/createchoice/:id" component={CreateChoice} />
          <Route exact path="/addtags/:type/:id" component={AddTags} />
          <Route exact path="/Student_quiz/:id" component={QuizStudent} />
        </Switch>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(App);
