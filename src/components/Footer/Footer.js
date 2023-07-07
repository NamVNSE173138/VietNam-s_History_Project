import React from "react";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import "./Footer.css";
import logo from "../Header/351046179_6398133100232437_8474283944489690617_n (1).png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="logo-footer col-md-6 mt-md-0 mt-3">
              <img src={logo} />
              <h4>Vietnam' History</h4>
              <i style={{ fontSize: "24px", fontFamily: "Fasthand" }}>
                Khám phá quá khứ. Hiểu hiện tại. Hướng tới tương lai.
              </i>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h4 style={{ fontWeight: "Fasthand" }}>VietEra</h4>
              <ul className="list-unstyled">
                <li className="footer">
                  <Link className="menu-footer" to={"/"}>
                    Trang chủ
                  </Link>
                </li>
                <li className="footer">
                  <Link className="menu-footer" to={"/events"}>
                    Sự kiện
                  </Link>
                </li>

                <li className="footer">
                  <Link className="menu-footer" to={"/grade"}>
                    Lớp
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5>Liên hệ</h5>
              <ul className="list-unstyled">
                <li className="footer">
                  <Link
                    className="contact-footer"
                    to={"https://goo.gl/maps/ZcskJxPMTMEQZrvv7"}
                  >
                    <HomeOutlined style={{ marginRight: "5px" }} />
                    Đại học FPT - Tp.Hồ Chí Minh
                  </Link>
                </li>
                <li className="footer">
                  <Link className="contact-footer" to={""}>
                    <MailOutlined style={{ marginRight: "5px" }} />{" "}
                    vietera_project@gmail.com
                  </Link>
                </li>
                <li className="footer">
                  <Link className="contact-footer" to={""}>
                    <PhoneOutlined style={{ marginRight: "5px" }} /> 0987654321
                  </Link>
                </li>
                <li className="footer">
                  <Link
                    className="contact-footer"
                    to={
                      "https://github.com/NamVNSE173138/VietNam-s_History_Project"
                    }
                  >
                    <GithubOutlined style={{ marginRight: "5px" }} /> Vietnam's
                    History Project
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2023 Copyright:
          <a className="end-footer" href="/">
            {" "}
            VietEra-Team
          </a>
        </div>
      </div>
    </>
  );
};
export default Footer;
