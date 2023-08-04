import { List, Form, Input } from "antd"; // Update the import path

import axios from "axios";
import "./King.css";
import { SearchOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllKing = () => {
  const [king, setKing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/king")
      .then((response) => {
        setLoading(false);
        setKing(response.data); // Store the fetched data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDataSource = king.filter((king) =>
    king.kingName.toLowerCase().includes(searchQuery.toLowerCase())
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
        renderItem={(king) => (
          <Link
            to={`/dynasty/king/${king.kingID}`}
            style={{ textDecoration: "none" }}
          >
            <List.Item key={king.kingID}>
              <List.Item.Meta
                title={king.kingName}
                description={`${king.rulingFrom} - ${king.rulingTo}`}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

export default AllKing;
