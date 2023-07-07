import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function SearchList() {
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
    <div className="SearchList">
      <Container>
        <h1 className="text-center mt-4">Sự kiện</h1>
        <Form>
          <InputGroup prefix={<SearchOutlined />} className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm sự kiện"
            />
          </InputGroup>
        </Form>
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
            dataSource={events.filter((event) =>
              event.eventName.toLowerCase().includes(search.toLowerCase())
            )}
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
                  } // Wrap the event name in the Link com  nent with the event ID in the URL
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
      </Container>
    </div>
  );
}

export default SearchList;
