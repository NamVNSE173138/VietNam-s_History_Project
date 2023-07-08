import React, { useState } from "react";
import logo from "../Header/351046179_6398133100232437_8474283944489690617_n (1).png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const isLogin = sessionStorage.getItem("session");

  const linkStyles = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "white",
    fontSize: "15px",
    fontFamily: "Open Sans",
  };

  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <>
      <nav className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link
            to={"/"}
            style={linkStyles}
            onClick={() => window.scrollTo(0, 0)}
          >
            <li className="header">TRANG CHỦ</li>
          </Link>
          <Link
            to={"/events"}
            style={linkStyles}
            onClick={() => window.scrollTo(0, 0)}
          >
            <li className="header">SỰ KIỆN</li>
          </Link>

          <Link
            to={"/grade"}
            style={linkStyles}
            onClick={() => window.scrollTo(0, 0)}
          >
            <li className="header">LỚP</li>
          </Link>
          {!isLogin ? (
            <>
              <Link
                to={"/login"}
                style={linkStyles}
                onClick={() => window.scrollTo(0, 0)}
              >
                <li className="header">ĐĂNG NHẬP</li>
              </Link>
              <Link
                to={"/signup"}
                style={linkStyles}
                onClick={() => window.scrollTo(0, 0)}
              >
                <li className="header">ĐĂNG KÝ</li>
              </Link>
            </>
          ) : (
            <>
              <li className="header" style={linkStyles} onClick={handleLogout}>
                ĐĂNG XUẤT
              </li>
              <Link to={"/profile"} style={linkStyles}>
                <li className="header">
                  <UserOutlined size="large" />
                  TRANG CÁ NHÂN
                </li>
              </Link>
            </>
          )}
        </ul>
        <button className="menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </nav>
    </>
  );
};

export default Header;
