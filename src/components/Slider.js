import React from "react";
import Carousel from 'react-bootstrap/Carousel';
// export default class Slider extends Component{
    function UncontrolledExample() {
        
        return (
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://special.vietnamplus.vn/wp-content/uploads/2021/03/ttxvn0405di-1588579648-32.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%205/Ng%C3%A0y%204/Dien%20Bien%20Phu/299299.jpg"
                alt="Second slide"
              />
      
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tuyensinh24h.org/wp-content/uploads/QTRI-BIA.jpg"
                alt="Third slide"
              />
      
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );
    }
      
      export default UncontrolledExample;
// }