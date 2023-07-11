import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LinkCv = () => {
  const [search, setSearch] = useState("");
  const [linkCv, setLinkCv] = useState([]);

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const response = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userId}/request`
        );
        setLinkCv(response.data);
        console.log(setLinkCv(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

//   const deletePost = async (id) => {
//     await fetch(
//       `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${id}`,
//       {
//         method: "DELETE",
//       }
//     ).then((response) => {
//       if (response.status === 200) {
//         setPosts(
//           posts.filter((post) => {
//             return post.id !== id;
//           })
//         );
//       } else {
//         return;
//       }
//     });
//   };

  return (
    <Box m="20px">
      <Header title="CV" subtitle="Managing CV" />
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
              <th>User ID</th>
              <th>Link CV</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {linkCv
              .filter((linkCv) => {
                return search.toLowerCase() === ""
                  ? linkCv
                  : linkCv.authorID.toLowerCase().includes(search);
              })
              .map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.userId}</td>
                  <td>{request.cv}</td>
                  <td className="d-flex justify-content-around">
                    <button className="btn btn-outline-success">Accept</button>
                    <button
                    //   onClick={() => deletePost(post.id)}
                      className="btn btn-outline-danger"
                    >
                      Denied
                    </button>  
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default LinkCv;
