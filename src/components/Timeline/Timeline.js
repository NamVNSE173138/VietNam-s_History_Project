import React from "react";
import { Timeline } from "antd";
import "./Timeline.css";

const EventTimeline = () => {
  const events = [
    { id: 1, title: "Event 1", date: "2023-01-01" },
    { id: 2, title: "Event 2", date: "" },
    { id: 3, title: "Event 3", date: "2023-03-01" },
    { id: 4, title: "Event 4", date: "2023-04-01" },
    { id: 5, title: "Event 5", date: "2023-05-01" },
    { id: 6, title: "Event 6", date: "2023-06-01" },
    { id: 7, title: "Event 7", date: "2023-07-01" },
    { id: 8, title: "Event 8", date: "2023-08-01" },
    { id: 9, title: "Event 9", date: "2023-09-01" },
    { id: 10, title: "Event 10", date: "2023-10-01" },
    { id: 11, title: "Event 11", date: "2023-11-01" },
    { id: 12, title: "Event 12", date: "2023-12-01" },
    { id: 13, title: "Event 13", date: "2024-01-01" },
    { id: 14, title: "Event 14", date: "2024-02-01" },
    { id: 15, title: "Event 15", date: "2024-03-01" },
    { id: 16, title: "Event 16", date: "2024-04-01" },
    { id: 17, title: "Event 17", date: "2024-05-01" },
    { id: 18, title: "Event 18", date: "2024-06-01" },
    { id: 19, title: "Event 19", date: "2024-07-01" },
    { id: 20, title: "Event 20", date: "2024-08-01" },
  ];

  return (
    <div
      className="timeline-body"
      style={{ height: "400px", overflowY: "auto", width: "300px" }}
    >
      <Timeline mode="left">
        {events.map((event) => (
          <Timeline.Item key={event.id} label={event.date}>
            {event.title}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default EventTimeline;
