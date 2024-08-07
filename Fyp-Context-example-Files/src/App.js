import React, {useState} from "react"
import {Routes, Route, Link } from "react-router-dom";
import "./firebase.mjs"

import Styl from "./Styl.js"
import NavBar from "./components/Navbar.js"
import MainContent from "./components/Maincontent.js"
import Footer from "./components/Footer.js"
import Certificate from "./components/Certificate.js"
import Quiz from "./components/Quiz.js"
import Login from "./pages/Login.jsx"
import Allcourses from "./pages/Allcourses.js"
import Signup from "./pages/Signup.js"
import Coursedetail from "./pages/Coursedetail.js"
import CodeEditor from "./pages/CodeEditor.js"
import Profile from "./pages/Profile.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import AboutUs from "./pages/AboutUs.js";
import LearningPath from "./pages/LearningPath.js";
import PrivateRoute from "./components/PrivateRoute.js";
import TeacherCourses from "./pages/teacher/TeacherCourses.js";
import CreateCourse from "./pages/teacher/CreateCourse.js";
import { CourseSection } from "./pages/CourseSection.js";
import  VideoSection  from "./pages/StudentMaterial/VideoSection.js";
import MaterialPanel from "./pages/StudentMaterial/MaterialPanel.js";
import QuizSection from "./pages/QuizSection.js";
import Recommendation from './components/Recommendation.js'
// import DisForums from "./pages/DisForums.jsx";
import DisForums from "./pages/Discussion-Forums/DisForums.jsx";
// import MaterialsScreen from "./pages/teacher/MaterialsScreen.jsx";
import MaterialsScreen from "./pages/teacher/MaterialScreen/MaterialsScreen.jsx";
import GradesScreen from "./pages/teacher/GradesScreen.js";
import QuizScore from "./pages/DisplayQuizScore.js"
import CourseHome from "./pages/teacher/CourseHome.js";
import CourseInfo from "./pages/teacher/CourseInfo.js";
import QuizCreate from "./pages/teacher/QuizCreate.js";
import QuizCreate2 from "./pages/teacher/QuizCreate2.js";
import QuizDetails from "./pages/teacher/QuizDetail.js";
import StudentQuiz from "./pages/StudentQuiz.js";
import AboutCourse from "./pages/AboutCourse.jsx";
import Home from "./pages/Home.js";
import EnrolledStudents from "./pages/teacher/EnrolledStudents.js"
import Verification from "./pages/Verification.js"

function App() {
  const isLoggedIn = true;

  return (
    <>
     <NavBar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allcourses" element={<Allcourses />} />
        <Route path="/coursedetail" element={<Coursedetail />} />
        <Route path="/coursesection/:id" element={<CourseSection />} />
        <Route path="/videosection/:id" element={<VideoSection />} />
        <Route path="/materialpanel/:id/module/:weekNumber/:moduleNumber" element={<MaterialPanel />} />
        <Route path="/quizsection/:id/:topic" element={<QuizSection />} />
        <Route path="/quizscore/:id" element={<QuizScore />} />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/code" element={<CodeEditor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/verification" element={<Verification />} />
        {/* <Route path="/discussionforums/:id/module/:weekNumber/:moduleNumber" element={<DisForums />} /> */}
        <Route path="/discussionforums/:id" element={<DisForums />} />
        <Route path="/discussionforums/:id/module/:weekNumber/:moduleNumber" element={<DisForums />} />
        <Route path="/learningpath" element={<LearningPath />} />
        <Route path="/studentquiz/:id" element={<StudentQuiz />} />
        <Route path="/aboutcourse/:id" element={<AboutCourse />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/teacher" element={<PrivateRoute />} >
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path='/teacher/createcourse' element={<CreateCourse />} />
          <Route path='/teacher/coursehome/:id' element={<CourseHome />} />
          <Route path='/teacher/quizcreate/:id' element={<QuizCreate />} />
          <Route path='/teacher/materials/:id' element={<MaterialsScreen />} />
          <Route path='/teacher/grades/:id' element={<GradesScreen />} />
          <Route path='/teacher/courseinfo/:id' element={<CourseInfo />} />
          <Route path='/teacher/quizcreate2/:id' element={<QuizCreate2 />} />
          <Route path='/teacher/quizdetails/:id/:quizId' element={<QuizDetails />} />
          <Route path='/teacher/enrolledstudents/:id' element={<EnrolledStudents />} />
        </Route>
        <Route path="/recommendation" element={<Recommendation />} />
        {/* <Styl />*/}
      </Routes>
      <Footer />
    </>
  )
}

export default App