import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Profile from "../../components/Profile/Profile";
import Error from "../Error";

const Information = () => {
  // Lấy thông tin người dùng từ Session Storage (nếu có)
  const isLogin = sessionStorage.getItem("session");

  return (
    <>
      {/* Kiểm tra xem người dùng đã đăng nhập hay chưa */}
      {!isLogin ? (
        // Nếu chưa đăng nhập, chuyển hướng tới trang Error
        <Error />
      ) : (
        // Nếu đã đăng nhập, hiển thị trang thông tin người dùng
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
