import React from "react";
// import { Link } from "react-router-dom"
import "./Footer.css";
import logo from "../Header/351046179_6398133100232437_8474283944489690617_n (1).png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="logo-footer col-md-8 mt-md-0 mt-3">
              <img src={logo} />
              <h5 className="text-uppercase">Vietnam' History</h5>
              <p>
                Let's learn about the country and people of Vietnam through the
                nation's heroic history, long-standing customs and culture.
              </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-4 mb-md-0 mb-3">
              <h5 className="text-uppercase">Menu</h5>
              <ul className="list-unstyled">
                <li className="footer">
                  <Link className="menu-footer" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="footer">
                  <Link className="menu-footer" to={"/events"}>
                    Event
                  </Link>
                </li>
                <li className="footer">
                  <Link className="menu-footer" to={"/posts"}>
                    Post
                  </Link>
                </li>
                <li className="footer">
                  <Link className="menu-footer" to={"/grade"}>
                    Grade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2023 Copyright:
          <a className="menu-footer" href="/">
            {" "}
            VietEra-Team
          </a>
        </div>
      </div>
    </>
  );
};
export default Footer;
