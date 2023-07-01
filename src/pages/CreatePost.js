import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewPost from "../components/Post/CreatePost";

const CreatePost = () => {
  return (
    <>
      <Header />
      <NewPost />
      <Footer />
    </>
  );
};

export default CreatePost;