import { List, Form, Input } from "antd";
import axios from "axios";
import "./dynasty.css";
import { SearchOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllDynasty = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDataSource = timelineData.filter((dynasty) =>
    dynasty.dysnatyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="all-event" style={{ marginTop: "100px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: "1025px" }}
          placeholder="Tìm kiếm triều đại"
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
        renderItem={(dynasty) => (
          <Link
            to={`/dynasty/dynastyDetail/${dynasty.dysnatyID}`}
            style={{ textDecoration: "none" }}
          >
            <List.Item key={dynasty.dysnatyID}>
              <List.Item.Meta
                title={dynasty.dysnatyName}
                description={`${dynasty.timeFrom} - ${dynasty.timeTo}`}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default AllDynasty;
