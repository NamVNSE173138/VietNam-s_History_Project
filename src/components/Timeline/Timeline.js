import React, { useEffect, useState } from "react";
import axios from "axios";
import { Timeline } from "antd";
import "./Timeline.css";

const EventTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  // const events = [
  //   { id: 1, title: "Event 1", date: "2023-01-01" },
  //   { id: 2, title: "Event 2", date: "2023-03-01" },
  //   { id: 3, title: "Event 3", date: "2023-03-01" },
  //   { id: 4, title: "Event 4", date: "2023-04-01" },
  //   { id: 5, title: "Event 5", date: "2023-05-01" },
  //   { id: 6, title: "Event 6", date: "2023-06-01" },
  //   { id: 7, title: "Event 7", date: "2023-07-01" },
  //   { id: 8, title: "Event 8", date: "2023-08-01" },
  //   { id: 9, title: "Event 9", date: "2023-09-01" },
  //   { id: 10, title: "Event 10", date: "2023-10-01" },
  //   { id: 11, title: "Event 11", date: "2023-11-01" },
  //   { id: 12, title: "Event 12", date: "2023-12-01" },
  //   { id: 13, title: "Event 13", date: "2024-01-01" },
  //   { id: 14, title: "Event 14", date: "2024-02-01" },
  //   { id: 15, title: "Event 15", date: "2024-03-01" },
  //   { id: 16, title: "Event 16", date: "2024-04-01" },
  //   { id: 17, title: "Event 17", date: "2024-05-01" },
  //   { id: 18, title: "Event 18", date: "2024-06-01" },
  //   { id: 19, title: "Event 19", date: "2024-07-01" },
  //   { id: 20, title: "Event 20", date: "2024-08-01" },
  // ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
        );
        setTimelineData(response.data);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="timeline-body"
      style={{ height: "700px", overflowY: "auto", width: "600px" }}
    >
      <Timeline mode="left">
        {timelineData.map((event) => (
          <Timeline.Item key={event.timeline} label="">
            {event.eventName}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
  // ---------------------------------------------------------------------------
  // return (
  //   <div>
  //     <h1>UL timeline cards</h1>
  //     <ul>
  //       <li style={{ '--accent-color': '#41516C' }}>
  //         <div class="date">2002</div>
  //         <div class="title">Title 1</div>
  //         <div class="descr">
  //           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
  //           itaque hic quibusdam fugiat est numquam harum, accusamus suscipit
  //           consequatur laboriosam!
  //         </div>
  //       </li>
  //       <li style={{ '--accent-color': '#FBCA3E' }}>
  //         <div class="date">2007</div>
  //         <div class="title">Title 2</div>
  //         <div class="descr">
  //           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
  //           adipisci nobis nostrum vero nihil veniam.
  //         </div>
  //       </li>
  //       <li style={{ '--accent-color': '#E24A68' }}>
  //         <div class="date">2012</div>
  //         <div class="title">Title 3</div>
  //         <div class="descr">
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minima
  //           consequuntur soluta placeat iure totam commodi repellendus ea
  //           delectus, libero fugit quod reprehenderit, sequi quo, et dolorum
  //           saepe nulla hic.
  //         </div>
  //       </li>
  //       <li style={{ '--accent-color': '#1B5F8C' }}>
  //         <div class="date">2017</div>
  //         <div class="title">Title 4</div>
  //         <div class="descr">
  //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
  //           cumque.
  //         </div>
  //       </li>
  //       <li style={{ '--accent-color': '#4CADAD' }}>
  //         <div class="date">2022</div>
  //         <div class="title">Title 5</div>
  //         <div class="descr">
  //           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, non.
  //         </div>
  //       </li>
  //     </ul>
  //   </div>
  // );

  // -------------------------------------------------------------------------------
  // const [timelineData, setTimelineData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event');
  //       setTimelineData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching timeline data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   <div className="timeline-body"
  //          style={{ height: "700px", overflowY: "auto", width: "100%" }}>
  //     <h1>UL timeline cards</h1>
  //     <ul>
  //       {timelineData.map((event) => (
  //         <li key={event.id}> {/*>style={{ '--accent-color': event.accentColor }}>*/}
  //           <div className="date text-dark">{event.timeline}</div>
  //           <div className="title">{event.eventName}</div>
  //           <div className="descr">{event.dysnaty}</div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};
export default EventTimeline;
