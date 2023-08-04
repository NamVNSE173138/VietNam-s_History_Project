import axios from "axios";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
import "./Event.css";

const DynastyDetail = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const { eventID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/event/${eventID}`)
      .then((response) => {
        setLoading(false);
        setEvent(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventID]);
  if (loading) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="dynasty-container">
      <div className="character-list">
        <p className="dynasty-title">{event[0].eventName}</p>
        <p className="dynasty-description">{event[0].description}</p>
      </div>
    </div>
  );
};

export default DynastyDetail;
