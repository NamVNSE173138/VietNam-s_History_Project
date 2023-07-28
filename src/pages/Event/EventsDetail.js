import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { EventDetail, CreatePost } from "../../components/Event/EventDetail";

const EventsDetail = () => {
  return (
    <>
      <Header />
      <EventDetail />
      <Footer />
    </>
  );
};

export default EventsDetail;
