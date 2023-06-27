import { List } from "antd";
import axios from "axios";
import "./Event.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="all-event">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item
            key={event.eventID}
            extra={<img width={272} alt="logo" src={event.image} />}
          >
            <List.Item.Meta
              title={
                <Link to={`/events/eventDetail/${event.eventID}`}>
                  {event.eventName}
                </Link>
              } // Wrap the event name in the Link component with the event ID in the URL
              description={event.timeline}
            />
          </List.Item>
        )}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
      />
    </div>
  );
};

export default AllEvent;
