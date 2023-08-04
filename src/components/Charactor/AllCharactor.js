import { List, Form, Input } from "antd";
import axios from "axios";
import "./Charactor.css";
import { SearchOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllDynasty = () => {
  const [charactor, setCharactor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charactor")
      .then((response) => {
        setLoading(false);
        setCharactor(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDataSource = charactor.filter((charactor) =>
    charactor.characterName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="all-event" style={{ marginTop: "100px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: "1025px" }}
          placeholder="Tìm kiếm nhân vật lịch sử"
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
        renderItem={(charactor) => (
          <Link
            to={`/dynasty/charactor/${charactor.charactorID}`}
            style={{ textDecoration: "none" }}
          >
            <List.Item key={charactor.charactorID}>
              <List.Item.Meta
                title={charactor.characterName}
                // description={`${charactor.timeFrom} - ${charactor.timeTo}`}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default AllDynasty;
