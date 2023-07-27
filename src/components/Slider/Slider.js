import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "antd";
import "./Slider.css";
import img1 from "./z4424869346053_159e3b29a58877da799285fb13caf039.jpg";
import img2 from "./df21bc4aa410e3ccc8c41f14a9afdd4d.jpg";
import { Link } from "react-router-dom";
// export default class Slider extends Component{
const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />
        <div className="carouselCaption">
          <h3>Văn minh Văn Lang - Âu Lạc</h3>
          <p className="shadow-text">
            {" "}
            là một văn minh cổ đại của dân tộc Việt Nam, tồn tại từ khoảng thế
            kỷ 7 TCN đến thế kỷ 3 TCN
          </p>
          <Link to={"./events/eventDetail/76"}>
            <Button className="carousel-btn" type="primary" size="large">
              XEM THÊM
            </Button>
          </Link>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%205/Ng%C3%A0y%204/Dien%20Bien%20Phu/299299.jpg"
          alt="Second slide"
        />

        <div className="carouselCaption">
          <h3>Chiến thắng Điện Biên Phủ</h3>
          <p className="shadow-text">(13 tháng 3 - 7 tháng 5 năm 1954)</p>
          <Link to={"./events/eventDetail/20"}>
            <Button className="carousel-btn" type="primary" size="large">
              XEM THÊM
            </Button>
          </Link>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Third slide"
          // style={{height : "561px"}}
        />

        <div className="carouselCaption">
          <h3>Khởi nghĩa Hai Bà Trưng</h3>
          <p className="shadow-text">(Năm 40 - 43 sau CN)</p>
          <Link to={"./events/eventDetail/43"}>
            <Button className="carousel-btn" type="primary" size="large">
              XEM THÊM
            </Button>
          </Link>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
// }
