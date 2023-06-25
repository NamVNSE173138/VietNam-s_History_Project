import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "antd";
import "./Slider.css";
import img3 from "../Slider/z4424869346053_159e3b29a58877da799285fb13caf039.jpg";
import { Link } from "react-router-dom";
// export default class Slider extends Component{
const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="First slide" />
        <div className="carouselCaption">
          <h3>Trống đồng Đông Sơn</h3>
          <p className="shadow-text">
            {" "}
            là một loại trống đồng tiêu biểu cho Văn hóa Đông Sơn (thế kỷ 7 TCN
            - thế kỷ 6 CN ) của người Việt cổ.
          </p>
          <Link>
            <Button className="carousel-btn" type="primary" size="large">
              SEE MORE
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
          <Link>
            <Button className="carousel-btn" type="primary" size="large">
              SEE MORE
            </Button>
          </Link>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/354485567_578472684460626_6856032707604160166_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=_8kF1Ql028wAX_DWAv7&_nc_ht=scontent.fsgn2-6.fna&oh=03_AdQIryVN7hj-qDXhv3ineGddvbitygCY3X7HSZRcXIOQiw&oe=64B3952A"
          alt="Third slide"
          // style={{height : "561px"}}
        />

        <div className="carouselCaption">
          <h3>Khởi nghĩa Hai Bà Trưng</h3>
          <p className="shadow-text">(Năm 40 - 43 sau CN)</p>
          <Link>
            <Button className="carousel-btn" type="primary" size="large">
              SEE MORE
            </Button>
          </Link>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
// }
