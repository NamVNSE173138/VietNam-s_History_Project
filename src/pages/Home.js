import React from "react";
import Header from "../components/Header/Header";
import Slider from "../components/Slider/Slider";
import Timeline from "../components/Timeline/Timeline";
import BasicMap from "../components/BasicMap/BasicMap";
import Footer from "../components/Footer/Footer";
import PopEvent from "../components/Popular Event/PopularEvent";
import { Col, Row } from "antd";

const Home = () => {
  return (
    <>
      <Header />
      <Slider />
      <Row>
        <Col span={12}>
          <Timeline />
        </Col>
        <Col span={12}>
          <BasicMap />
        </Col>
      </Row>

      <PopEvent />

      <Footer />
    </>
  );
};

export default Home;
