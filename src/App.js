// import logo from './logo.svg';
import './App.css';
// import BasicMap from './components/BasicMap/BasicMap';
// // import Map from './components/Map';
// import Navigation from './components/Navigation';
// import Slider from './components/Slider'
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Timeline from './components/Timeline';
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Events from './pages/Events';
import Posts from './pages/Posts';
import Grade from './pages/Grade';
function App() {
  return (
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/events'  element={<Events />} />
        <Route path='/posts'  element={<Posts />} />
        <Route path='/Grade'  element={<Grade/>} />
        {/* <Route path='/events'  element={<Events />} /> */}
      </Routes>
  );
}

export default App;
