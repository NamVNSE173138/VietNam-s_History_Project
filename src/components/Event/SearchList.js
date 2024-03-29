import { List, Form, Input } from "antd"; // Update the import path

import axios from "axios";
import "./Event.css";
import { SearchOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllEvent = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event")
      .then((response) => {
        setLoading(false);
        setEvent(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDataSource = event.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="all-event" style={{ marginTop: "100px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: "1025px" }}
          placeholder="Tìm kiếm vị vua"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 6,
        }}
        dataSource={filteredDataSource}
        loading={loading}
        renderItem={(event) => (
          <Link
            to={`/events/eventDetail/${event.eventID}`}
            style={{ textDecoration: "none" }}
          >
            <List.Item key={event.eventID}>
              <List.Item.Meta
                title={event.eventName}
                description={`${event.eventFrom} - ${event.eventTo}`}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default AllEvent;
