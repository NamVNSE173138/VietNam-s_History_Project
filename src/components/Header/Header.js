import React, { useState } from "react";
import logo from "../Header/351046179_6398133100232437_8474283944489690617_n (1).png";
import { Link } from "react-router-dom";
import "./Header.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
const Header = () => {
  const [Mobile, setMobile] = useState(false);
  return (
    <>
      <nav className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} />
          </Link>
        </div>

        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <li className="header">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="header">
            <Link to={"/events"}>EVENT</Link>
          </li>
          <li className="header">
            <Link to={"/posts"}>POST</Link>
          </li>
          <li className="header">
            <Link to={"/grade"}>GRADE</Link>
          </li>
          <li className="header">
            <Link to={"/login"}>LOGIN</Link>
          </li>
          <li className="header">
            <Link to={"/signup"}>SIGN UP</Link>
          </li>
        </ul>
        <button className="menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </nav>
    </>
  );
};
export default Header;
