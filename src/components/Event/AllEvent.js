import { List } from "antd";
import axios from "axios";
import "./Event.css";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Search from "antd/es/transfer/search";
// import SearchList from "../Event/SearchList";

const AllEvent = () => {

  const [search, setSearch] = useState("");
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
      <Form>
      <h1 className="text-center mt-4">Event List</h1>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Event"
            />
          </InputGroup>
        </Form>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={events.filter((event) => {
          return search.toLowerCase() === ""
            ? event
            : event.eventName.toLowerCase().includes(search);
        })}
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
