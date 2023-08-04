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
import AllEvent from "./pages/Event/AllEvent";
import Profile from "./pages/Profile/Profile";
import SearchList from "./pages/Event/Search";
import CreatePost from "./pages/CreatePost";
//admin
import Admin from "./pages/admin/dashboard/Dashboard";
import AdEvent from "./pages/admin/events/Event";
import AdUser from "./pages/admin/user/User";
import AdPost from "./pages/admin/posts/Post";
import AdLinkCv from "./pages/admin/linkCV/CV";
import AdReportCmt from "./pages/admin/reportComment/ReportCmt";
import AllDynasty from "./pages/dynasty/AllDynasty";
import AllCharactor from "./pages/Charactor/AllCharactor";
import DynastyDetail from "./pages/dynasty/DynastyDetail";
import CharactorDetail from "./pages/Charactor/CharactorDetail";
import KingsDetail from "./pages/King/KingDetail";
import AllKings from "./pages/King/AllKing";

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
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/searchList" element={<SearchList />} />
      <Route path="/dynasty" element={<AllDynasty />} />
      <Route path="/charactor" element={<AllCharactor />} />
      <Route path="/king" element={<AllKings />} />
      <Route
        path="/dynasty/dynastyDetail/:dysnatyID"
        element={<DynastyDetail />}
      />
      <Route
        path="/dynasty/charactor/:charactorID"
        element={<CharactorDetail />}
      />
      <Route path="/dynasty/king/:kingID" element={<KingsDetail />} />
      {/* admin */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/events" element={<AdEvent />} />
      <Route path="/admin/user" element={<AdUser />} />
      <Route path="/admin/post" element={<AdPost />} />
      <Route path="/admin/linkCV" element={<AdLinkCv />} />
      <Route path="/admin/reportComment" element={<AdReportCmt />} />
    </Routes>
  );
}

export default App;
