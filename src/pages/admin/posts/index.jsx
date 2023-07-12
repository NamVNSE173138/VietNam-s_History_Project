import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // New state to store the selected post

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showPostDetails = (post) => {
    setSelectedPost(post);
    setShow(true);
  };

  // Logic for pagination
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const displayedPosts = posts
    .filter((post) => {
      return (
        search.toLowerCase() === "" ||
        post.authorID.toLowerCase().includes(search)
      );
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  // Calculate the total number of pages
  const totalPages = Math.ceil(posts.length / pageSize);

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
            {displayedPosts.map((post) => (
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
                  <button
                    onClick={() => showPostDetails(post)} // Pass the post object as an argument
                    className="btn btn-outline-info"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal */}
        <Modal show={show} onHide={() => setShow(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Post Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPost && (
              <div>
                <p>ID: {selectedPost.id}</p>
                <p>Author: {selectedPost.authorID}</p>
                <p>Create at: {selectedPost.createAt}</p>
                <p>Description: {selectedPost.description}</p>

                {/* Display additional post details here */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from(Array(totalPages).keys()).map((page) => (
              <li
                key={page}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Box>
    </Box>
  );
};

export default Posts;
