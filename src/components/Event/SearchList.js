import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { List, Card } from "antd";
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
  const { Meta } = Card;
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
              // <Card hoverable style={{ margin: "20px" }}>
              //   <List.Item
              //     key={event.eventID}
              //     extra={
              //       <img
              //         width={272}
              //         height={210}
              //         alt="logo"
              //         src={event.image}
              //       />
              //     }
              //   >
              //     <List.Item.Meta
              //       title={
              //         <Link to={`/events/eventDetail/${event.eventID}`}>
              //           {event.eventName}
              //         </Link>
              //       } // Wrap the event name in the Link com  nent with the event ID in the URL
              //       description={event.timeline}
              //     />
              //   </List.Item>
              // </Card>
              <Link
                to={`/events/eventDetail/${event.eventID}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  key={event.eventID}
                  hoverable
                  style={{ maxWidth: 500, margin: 10, height: 350 }}
                  cover={
                    <img width={272} height={250} alt="" src={event.image} />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description={event.timeline}
                  />
                </Card>
              </Link>
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
