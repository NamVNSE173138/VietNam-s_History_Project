import React from "react";
import Header from "../components/Header/Header";
// import { Slider, Timeline } from 'antd'
import Slider from "../components/Slider/Slider";
import Timeline from "../components/Timeline/Timeline";
import BasicMap from "../components/BasicMap/BasicMap";
import Footer from "../components/Footer/Footer";
import NewPost from "../components/New Posts/NewPost";
import PopEvent from "../components/Popular Event/PopularEvent";

const Home = () => {
  return (
    <>
      <Header />
      <Slider />
      <Timeline />
      <BasicMap />
      {/* <PopEvent /> */}
      {/* <NewPost /> */}
      <Footer />
    </>
  );
};

export default Home;
