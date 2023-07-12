import { Col, Row, Button } from "antd";
import "./Profile.css";
import ChangePass from "./ChangePass";
import ToMentor from "./UpToMentor";
import { useState, useEffect } from "react";

const storedSession = JSON.parse(sessionStorage.getItem("session"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setIsOpenn] = useState(false);

  useEffect(() => {
    // Simulating a delay of 2 seconds
    const delay = 2000;

    // Set the loading state to true initially
    setIsLoading(true);

    // After the given delay, set the loading state to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenn = () => {
    setIsOpenn(true);
  };

  const handleClosen = () => {
    setIsOpenn(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="spin-container">
          <div className="spin"></div>
        </div>
      ) : (
        <div className="profile" style={{ height: "760px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "50px",
              paddingBottom: "20px",
            }}
          >
            Trang cá nhân
          </h2>
          <Row style={{ height: "254px" }}>
            <Col span={12}>
              <div className="">
                <img
                  src="https://images.unsplash.com/photo-1585591424436-a55926755d91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="..."
                  style={{
                    height: "300px",
                    position: "absolute",
                    right: "50px",
                    borderRadius: "10px",
                    boxShadow: "-1px 1px 62px -18px rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <div>
                  <h3 className="h2 text-black mb-0">
                    Tên người dùng: {storedSession.username}
                  </h3>
                </div>
                <ul className="list-unstyled mb-1-9">
                  <li
                    className=" h4 mb-2 mb-xl-3 display-28"
                    style={{ fontFamily: "Archivo Narrow" }}
                  >
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Chức vụ:
                    </span>{" "}
                    {storedSession.role}
                  </li>
                  <li
                    className=" h4 mb-2 mb-xl-3 display-28"
                    style={{ fontFamily: "Archivo Narrow" }}
                  >
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      ID:
                    </span>{" "}
                    {storedSession.id}
                  </li>
                  <li
                    className="h4 mb-2 mb-xl-3 display-28"
                    style={{ fontFamily: "Archivo Narrow" }}
                  >
                    <div>
                      {!isOpen && (
                        <Button onClick={handleOpen} size="large">
                          Đổi mật khẩu
                        </Button>
                      )}
                      {isOpen && storedSession.role === "Mentor" && (
                        <div>
                          <Button onClick={handleClose} size="large">
                            Hủy
                          </Button>
                          <ChangePass />
                        </div>
                      )}
                    </div>
                  </li>
                  {!isOpenn && storedSession.role !== "Mentor" && (
                    <li
                      className="h4 mb-2 mb-xl-3 display-28"
                      style={{ fontFamily: "Archivo Narrow" }}
                    >
                      <div>
                        <Button onClick={handleOpenn} size="large">
                          Đăng ký làm Mentor
                        </Button>
                      </div>
                    </li>
                  )}
                  {isOpenn && (
                    <li
                      className="h4 mb-2 mb-xl-3 display-28"
                      style={{ fontFamily: "Archivo Narrow" }}
                    >
                      <div>
                        <Button onClick={handleClosen} size="large">
                          Hủy
                        </Button>
                        <ToMentor />
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default App;
