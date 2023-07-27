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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
        );
        setTimelineData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching timeline data");
        setLoading(false);
      }
    };

    fetchData();
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
          {timelineData.map((event) => (
            <Link
              style={{ color: "unset", textDecoration: "none" }}
              to={`/events/eventDetail/${event.eventID}`}
              key={event.eventID}
            >
              <div key={event.eventID} className="custom-timeline-item">
                <div className="timeline-label">{event.timeline}</div>
                <div className="timeline-content">{event.eventName}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventTimeline;
