import React, { useState } from "react";
// import SweetPagination from "sweetpagination";
// import "/";
import { Col, Row} from 'antd';


function Items() {
  const [currentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  const items = [1,2];
  return (
    <div>
        
        <>
        <h3>hiashdads</h3>
      {currentPageData.map((item) => (
        <div className="post-container">
        {/* <h3>huhi</h3> */}
                  <Row>
                  <Col span={12}>
                  <div className="post">
                      <div class="post-info">
                        <img src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" alt="" className="post-author-avatar"/>
                          <h4 className="post-author-name">Author's name</h4>
                          <p className="time">May 21st, 08:50 AM</p>
                      </div>
                      <div className="post-content">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad delectus ullam dolorum. Aut sint ipsum, voluptatum accusamus vitae beatae nihil tempora, error, nisi sapiente ducimus nesciunt quasi eveniet dicta.</p>
                      </div>
                        <div className="post-action">
                            <button className="comment-button">Comment</button>
                            <button className="report-button">Report</button>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                  <div className="post">
                      <div class="post-info">
                        <img src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" alt="" className="post-author-avatar"/>
                          <h4 className="post-author-name">Author's name</h4>
                          <p className="time">May 21st, 08:50 AM</p>
                      </div>
                      <div className="post-content">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad delectus ullam dolorum. Aut sint ipsum, voluptatum accusamus vitae beatae nihil tempora, error, nisi sapiente ducimus nesciunt quasi eveniet dicta.</p>
                      </div>
                        <div className="post-action">
                            <button className="comment-button">Comment</button>
                            <button className="report-button">Report</button>
                      </div>
                    </div>
                  </Col>
                  </Row>
                  
              {/* <Col span={12}>col-12</Col> */}
                    
                  </div>
          ))}
        </>
        

      {/* <SweetPagination
        currentPageData={setCurrentPageData}
        dataPerPage={10}
        getData={items}
        navigation={true}
      /> */}
    </div>
  );
}

export default Items;