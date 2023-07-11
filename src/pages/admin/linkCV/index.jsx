import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import { Table, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LinkCv = () => {
  const [search, setSearch] = useState("");
  const [linkCv, setLinkCv] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user"
        );

        if (userResponse.data.length > 0) {
          const user = userResponse.data[0];
          setUserId(user.id);

          const requestResponse = await axios.get(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${user.id}/request`
          );
          setLinkCv(requestResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
      }
    };

    fetchData();
  }, []);

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
        {error ? (
          <p>{error}</p>
        ) : (
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
                .filter((request) => {
                  return (
                    search.toLowerCase() === "" ||
                    request.id
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    request.userId
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );
                })
                .map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.userId}</td>
                    <td>{request.cv}</td>
                    <td className="d-flex justify-content-around">
                      <button className="btn btn-outline-success">
                        Accept
                      </button>
                      <button className="btn btn-outline-danger">Denied</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default LinkCv;
