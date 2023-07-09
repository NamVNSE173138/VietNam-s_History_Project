import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Profile from "../../components/Profile/Profile";
import Error from "../Error";
const isLogin = sessionStorage.getItem("session");

const Information = () => {
  return (
    <>
      {!isLogin ? (
        <Error />
      ) : (
        <>
          <Header />
          <Profile />
          <Footer />
        </>
      )}
    </>
  );
};

export default Information;
