import axios from "axios";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
import "./Charactor.css";

const DynastyDetail = () => {
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState({});
  const { charactorID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/charactor/${charactorID}`)
      .then((response) => {
        setLoading(false);
        setCharacter(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [charactorID]);
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
            <p className="dynasty-title">{character[0].characterName}</p>
            <p className="dynasty-description">{character[0].description}</p>
          </div>
        </Col>
        <Col span={6}>
          <img className="character-image" alt="" src={character[0].img} />
        </Col>
      </Row>
    </div>
  );
};

export default DynastyDetail;
