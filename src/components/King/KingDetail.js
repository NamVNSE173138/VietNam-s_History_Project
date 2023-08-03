import axios from "axios";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
// import "./Charactor.css";

const DynastyDetail = () => {
  const [loading, setLoading] = useState(true);
  const [king, setKing] = useState({});
  const { kingID } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/king/kingDetail/${kingID}`)
      .then((response) => {
        setLoading(false);
        setKing(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [kingID]);
  if (loading) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="dynasty-container">
      <Row>
        <Col span={16}>
          <div className="character-list">
            <p className="dynasty-title">{king[0].kingName}</p>
            <i style={{ fontSize: "15px" }}>
              {king[0].rulingFrom} - {king[0].rulingTo}
            </i>
            <p className="dynasty-description">{king[0].description}</p>
          </div>
        </Col>
        <Col span={6}>
          <img className="character-image" alt="" src={king[0].img} />
        </Col>
      </Row>
    </div>
  );
};

export default DynastyDetail;
