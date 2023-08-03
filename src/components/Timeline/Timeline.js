import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timeline.css";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const EventTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint on the server
    axios
      .get("http://localhost:5000/api/dynasty")
      .then((response) => {
        setLoading(false);
        setTimelineData(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className="timeline-body"
      style={{ height: "700px", overflowY: "auto", width: "600px" }}
    >
      {loading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="custom-timeline">
          {timelineData.map((dynasty) => (
            <Link
              style={{ color: "unset", textDecoration: "none" }}
              to={`/dynasty/dynastyDetail/${dynasty.dysnatyID}`}
              key={dynasty.dysnatyID}
            >
              <div key={dynasty.dysnatyID} className="custom-timeline-item">
                <div className="timeline-label">{dynasty.dysnatyName}</div>
                <div className="timeline-content">
                  {dynasty.timeFrom} - {dynasty.timeTo}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventTimeline;
