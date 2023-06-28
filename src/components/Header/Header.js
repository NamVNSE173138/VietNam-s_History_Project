import React, { useState } from "react";
import logo from "../Header/351046179_6398133100232437_8474283944489690617_n (1).png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const Header = () => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const [Mobile, setMobile] = useState(false);
  const isLogin = localStorage.getItem("userName");

  console.log(isLogin);

  const linkStyles = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "white",
    fontSize: "15px",
    fontFamily: "Open Sans",
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `searchList`;
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("password");
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
          <Link to={"/"} style={linkStyles}>
            <li className="header">HOME</li>
          </Link>
          <Link to={"/events"} style={linkStyles}>
            <li className="header">EVENT</li>
          </Link>
          <Link to={"/posts"} style={linkStyles}>
            <li className="header">POST</li>
          </Link>
          <Link to={"/grade"} style={linkStyles}>
            <li className="header">GRADE</li>
          </Link>
          {!isLogin ? (
            <>
              <Link to={"/login"} style={linkStyles}>
                <li className="header">LOGIN</li>
              </Link>
              <Link to={"/signup"} style={linkStyles}>
                <li className="header">SIGN UP</li>
              </Link>
            </>
          ) : (
            <>
              <li className="header" style={linkStyles} onClick={handleLogout}>
                LOGOUT
              </li>
              <Link to={"/profile"} style={linkStyles}>
                <li className="header">PROFILE</li>
              </Link>
            </>
          )}

          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={routeChange}
          />
        </ul>
        <button className="menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </nav>
    </>
  );
};

export default Header;
