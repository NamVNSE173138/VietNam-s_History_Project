import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Event/Events";
import EventDetail from "./pages/Event/EventsDetail";
import Posts from "./pages/Posts";
import Grades from "./pages/Grades";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";
import Timeline from "./pages/Timeline";
import AllEvent from "./pages/Event/AllEvent";
import Profile from "./pages/Profile/Profile";
import ChangePassUser from "./pages/Profile/ChangePass";
import UpToMentor from "./pages/Profile/UpToMentor";
import SearchList from "./pages/Event/Search";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/eventDetail/:eventID" element={<EventDetail />} />
      <Route path="/events/allEvents" element={<AllEvent />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/createPost" element={<CreatePost />} />
      <Route path="/Grade" element={<Grades />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPass />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changePassUser" element={<ChangePassUser />} />
      <Route path="/upToMentor" element={<UpToMentor />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/searchList" element={<SearchList />} />
    </Routes>
  );
}

export default App;
