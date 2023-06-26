// import logo from './logo.svg';
import "./App.css";
// import BasicMap from './components/BasicMap/BasicMap';
// // import Map from './components/Map';
// import Navigation from './components/Navigation';
// import Slider from './components/Slider'
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Timeline from './components/Timeline';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Event/Events";
import EventDetail from "./pages/Event/EventsDetail";
// import AllEvents from './pages/Event/AllEvent'
import Posts from "./pages/Posts";
// import Grade from './pages/Grade';
import Grades from "./pages/Grades";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";
import Timeline from "./pages/Timeline";
import AllEvent from "./pages/Event/AllEvent";
import Profile from "./pages/Profile";
import SearchList from "./pages/Event/Search";
import CreatePost from "./pages/CreatePost";
// import Sign-In from './pages/Sign-in';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/eventDetail" element={<EventDetail />} />
      <Route path="/events/allEvents" element={<AllEvent />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/events/createPost" element={<CreatePost />} />
      <Route path="/Grade" element={<Grades />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPass />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/searchList" element={<SearchList />} />
    </Routes>
  );
}

export default App;
