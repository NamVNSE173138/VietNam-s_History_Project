import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deletePost = async (id) => {
    await fetch(
      `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${id}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.status === 200) {
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  return (
    <Box m="20px">
      <Header title="POST" subtitle="Managing Posts" />
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Posts"
          />
        </InputGroup>
      </Form>
      <Box>
        <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Like</th>
              <th>Report</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts
              .filter((post) => {
                return search.toLowerCase() === ""
                  ? post
                  : post.authorID.toLowerCase().includes(search);
              })
              .map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.authorID}</td>
                  <td>{post.like}</td>
                  <td>{post.isReported}</td>
                  <td>{post.description}</td>
                  <td>{post.createAt}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                    <button className="btn btn-outline-info">Detail</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Posts;
