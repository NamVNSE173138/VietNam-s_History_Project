import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Slider.css";
import img3 from "../Slider/z4424869346053_159e3b29a58877da799285fb13caf039.jpg";
// export default class Slider extends Component{
const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="First slide" />
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%205/Ng%C3%A0y%204/Dien%20Bien%20Phu/299299.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1447727214830-cbcbf097b52c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80"
          alt="Third slide"
          // style={{height : "561px"}}
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
          {/* <p> */}
          {/* Praesent commodo cursus magna, vel scelerisque nisl consectetur. */}
          {/* </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
// }
